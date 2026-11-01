"""One AI text step, run on the AI subscription the user connected in Settings.

A workflow step used to need its own provider API key even when the user's
chats already run on a subscription. This block asks the chat transport layer
which connection the user made default and calls that, so the workflow needs
no key of its own and the provider stays out of the surface.
"""

import logging
import uuid
from typing import Literal

import anthropic

from backend.blocks._base import (
    Block,
    BlockCategory,
    BlockEffect,
    BlockOutput,
    BlockSchemaInput,
    BlockSchemaOutput,
)
from backend.copilot.byok_endpoint import byok_endpoint
from backend.copilot.transports import resolve_default_chat_route
from backend.data.execution import ExecutionContext
from backend.data.model import APIKeyCredentials, SchemaField
from backend.integrations.creds_manager import IntegrationCredentialsManager
from backend.util.text import TextFormatter

logger = logging.getLogger(__name__)

_formatter = TextFormatter(autoescape=False)

_settings_hint = "Settings -> Integrations -> AI subscriptions"

_credentials = IntegrationCredentialsManager()


class SubscriptionStepError(Exception):
    """A user-facing reason the step cannot run; the message is shown to them."""


class SubscriptionTextGeneratorBlock(Block):
    """Generate text on the AI subscription the user connected in Settings."""

    class Input(BlockSchemaInput):
        prompt: str = SchemaField(
            description=(
                "The instruction for the model. Values from an earlier step "
                "can be filled in by name with double curly braces, e.g. "
                "{{text}}."
            ),
            placeholder="Summarize the following in three bullet points: {{text}}",
        )
        prompt_values: dict[str, str] = SchemaField(
            title="Prompt Values",
            default_factory=dict,
            description=(
                "Values used to fill in the prompt, e.g. the text from an "
                "earlier step under the name text."
            ),
        )
        sys_prompt: str = SchemaField(
            title="System Prompt",
            default="",
            description="Optional instruction that shapes the answer.",
            advanced=True,
        )
        tier: Literal["standard", "advanced"] = SchemaField(
            title="Quality",
            default="standard",
            description=(
                "Standard uses the everyday model of the subscription; "
                "advanced uses its premium model."
            ),
        )
        max_tokens: int = SchemaField(
            default=4096,
            ge=1,
            le=8192,
            description="Upper bound on the length of the answer.",
            advanced=True,
        )

    class Output(BlockSchemaOutput):
        response: str = SchemaField(description="The answer the model produced.")

    def __init__(self):
        super().__init__(
            id="ca856e8b-32bd-4592-9b61-3584f77b2d31",
            description=(
                "Generate text with the AI subscription connected in Settings -> "
                "Integrations. No API key is needed on this block, and the call "
                "is billed to that subscription, not to platform credits."
            ),
            display_name="AI Text Generator (your subscription)",
            categories={BlockCategory.AI},
            input_schema=SubscriptionTextGeneratorBlock.Input,
            output_schema=SubscriptionTextGeneratorBlock.Output,
            effect=BlockEffect.READ,
            test_input=[
                {"prompt": "Say hello.", "sys_prompt": "", "tier": "standard"},
                {
                    "prompt": "Say hello to {{name}}.",
                    "prompt_values": {"name": "Ada"},
                    "tier": "standard",
                },
            ],
            test_output=[
                ("response", "Hello!"),
                ("response", "Hello!"),
            ],
            test_mock={"generate": lambda *args, **kwargs: "Hello!"},
        )

    async def generate(
        self,
        user_id: str,
        *,
        prompt: str,
        sys_prompt: str,
        tier: str,
        max_tokens: int,
        prompt_values: dict[str, str] | None = None,
    ) -> str:
        """One call on the connection the user made default in Settings."""
        if prompt_values:
            prompt = await _formatter.format_string(prompt, prompt_values)
        provider, credential_id = await resolve_default_chat_route(user_id)
        if provider == "platform" or not credential_id:
            raise SubscriptionStepError(
                "This step runs on your AI subscription, but none is connected. "
                f"Add one in {_settings_hint}, then run it again."
            )
        endpoint = byok_endpoint(provider)
        if endpoint is None:
            raise SubscriptionStepError(
                f"The {provider} connection cannot run AI steps yet. Connect a "
                f"subscription that can, in {_settings_hint}."
            )
        credential = await _credentials.get(user_id, credential_id)
        if not isinstance(credential, APIKeyCredentials):
            raise SubscriptionStepError(
                f"The connection in {_settings_hint} cannot be used for this "
                "step. Disconnect it and connect it again."
            )

        model = (
            endpoint.advanced_model if tier == "advanced" else endpoint.standard_model
        )
        headers = (
            {endpoint.session_header: f"ses_{uuid.uuid4().hex}"}
            if endpoint.session_header
            else None
        )
        client = anthropic.AsyncAnthropic(
            auth_token=credential.api_key.get_secret_value(),
            base_url=endpoint.base_url,
            default_headers=headers,
        )
        try:
            message = await client.messages.create(
                model=model,
                max_tokens=max_tokens,
                messages=[{"role": "user", "content": prompt}],
                **({"system": sys_prompt} if sys_prompt.strip() else {}),
            )
        except anthropic.APIError as error:
            logger.warning("Subscription AI step failed: %s", error)
            raise SubscriptionStepError(
                "The AI subscription rejected the call. Check the connection in "
                f"{_settings_hint} and try again."
            ) from error
        finally:
            await client.close()

        answer = "".join(
            part.text for part in message.content if part.type == "text"
        ).strip()
        if not answer:
            raise SubscriptionStepError("The AI subscription returned no text.")
        return answer

    async def run(
        self,
        input_data: Input,
        *,
        execution_context: ExecutionContext,
        **kwargs,
    ) -> BlockOutput:
        try:
            answer = await self.generate(
                execution_context.user_id,
                prompt=input_data.prompt,
                sys_prompt=input_data.sys_prompt,
                tier=input_data.tier,
                max_tokens=input_data.max_tokens,
                prompt_values=input_data.prompt_values,
            )
        except SubscriptionStepError as error:
            yield "error", str(error)
            return
        yield "response", answer
