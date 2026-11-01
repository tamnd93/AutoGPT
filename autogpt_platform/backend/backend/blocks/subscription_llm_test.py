from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock

import anthropic
import httpx
import pytest
from pydantic import SecretStr

from backend.blocks.subscription_llm import (
    SubscriptionStepError,
    SubscriptionTextGeneratorBlock,
)
from backend.copilot.byok_endpoint import ByokEndpoint
from backend.data.model import APIKeyCredentials

_GATEWAY = "https://gateway.example/anthropic"


def _credential() -> APIKeyCredentials:
    return APIKeyCredentials(
        id="cred-1",
        provider="opencode",
        api_key=SecretStr("oc_sk_test"),
        title="OpenCode",
        expires_at=None,
    )


def _endpoint() -> ByokEndpoint:
    return ByokEndpoint(
        base_url=_GATEWAY,
        standard_model="standard-model",
        advanced_model="advanced-model",
        session_header="x-test-session",
    )


def _client(text: str = " hello ") -> MagicMock:
    client = MagicMock()
    client.messages.create = AsyncMock(
        return_value=SimpleNamespace(content=[SimpleNamespace(type="text", text=text)])
    )
    client.close = AsyncMock()
    return client


@pytest.fixture
def block() -> SubscriptionTextGeneratorBlock:
    return SubscriptionTextGeneratorBlock()


@pytest.fixture
def wired(mocker, block):
    """A user whose default connection is a subscription, with a mock client."""
    mocker.patch(
        "backend.blocks.subscription_llm.resolve_default_chat_route",
        new=AsyncMock(return_value=("opencode", "cred-1")),
    )
    mocker.patch(
        "backend.blocks.subscription_llm.byok_endpoint", return_value=_endpoint()
    )
    mocker.patch(
        "backend.blocks.subscription_llm._credentials.get",
        new=AsyncMock(return_value=_credential()),
    )
    client = _client()
    client_cls = mocker.patch(
        "backend.blocks.subscription_llm.anthropic.AsyncAnthropic", return_value=client
    )
    return block, client, client_cls


async def test_generates_with_the_connected_subscription(wired):
    block, client, client_cls = wired

    answer = await block.generate(
        "user-1", prompt="hi", sys_prompt="", tier="standard", max_tokens=100
    )

    assert answer == "hello"
    client_kwargs = client_cls.call_args.kwargs
    assert client_kwargs["auth_token"] == "oc_sk_test"
    assert client_kwargs["base_url"] == _GATEWAY
    session = client_kwargs["default_headers"]["x-test-session"]
    assert session.startswith("ses_")
    request = client.messages.create.call_args.kwargs
    assert request["model"] == "standard-model"
    assert request["max_tokens"] == 100
    assert request["messages"] == [{"role": "user", "content": "hi"}]
    assert "system" not in request
    client.close.assert_awaited_once()


async def test_prompt_values_are_filled_in(wired):
    block, client, _ = wired

    await block.generate(
        "user-1",
        prompt="Summarize {{text}}",
        prompt_values={"text": "the report"},
        sys_prompt="",
        tier="standard",
        max_tokens=10,
    )

    request = client.messages.create.call_args.kwargs
    assert request["messages"] == [{"role": "user", "content": "Summarize the report"}]


async def test_advanced_tier_uses_the_premium_model(wired):
    block, client, _ = wired

    await block.generate(
        "user-1", prompt="hi", sys_prompt="be brief", tier="advanced", max_tokens=10
    )

    request = client.messages.create.call_args.kwargs
    assert request["model"] == "advanced-model"
    assert request["system"] == "be brief"


async def test_no_subscription_asks_the_user_to_connect_one(block, mocker):
    mocker.patch(
        "backend.blocks.subscription_llm.resolve_default_chat_route",
        new=AsyncMock(return_value=("platform", None)),
    )

    with pytest.raises(SubscriptionStepError, match="AI subscriptions"):
        await block.generate(
            "user-1", prompt="hi", sys_prompt="", tier="standard", max_tokens=10
        )


async def test_a_connection_that_cannot_run_steps_says_so(block, mocker):
    mocker.patch(
        "backend.blocks.subscription_llm.resolve_default_chat_route",
        new=AsyncMock(return_value=("codex", "cred-2")),
    )
    mocker.patch("backend.blocks.subscription_llm.byok_endpoint", return_value=None)

    with pytest.raises(SubscriptionStepError, match="cannot run AI steps"):
        await block.generate(
            "user-1", prompt="hi", sys_prompt="", tier="standard", max_tokens=10
        )


async def test_a_rejected_call_does_not_leak_the_key(wired):
    block, client, _ = wired
    client.messages.create.side_effect = anthropic.APIError(
        "rejected oc_sk_test",
        request=httpx.Request("POST", _GATEWAY),
        body=None,
    )

    with pytest.raises(SubscriptionStepError) as raised:
        await block.generate(
            "user-1", prompt="hi", sys_prompt="", tier="standard", max_tokens=10
        )
    assert "oc_sk_test" not in str(raised.value)


async def test_run_yields_the_answer(block, mocker):
    mocker.patch.object(block, "generate", new=AsyncMock(return_value="the answer"))

    outputs = [
        output
        async for output in block.run(
            block.Input(prompt="hi"),
            execution_context=SimpleNamespace(user_id="user-1"),
        )
    ]

    assert outputs == [("response", "the answer")]


async def test_run_reports_a_step_error_instead_of_raising(block, mocker):
    mocker.patch.object(
        block,
        "generate",
        new=AsyncMock(side_effect=SubscriptionStepError("no subscription")),
    )

    outputs = [
        output
        async for output in block.run(
            block.Input(prompt="hi"),
            execution_context=SimpleNamespace(user_id="user-1"),
        )
    ]

    assert outputs == [("error", "no subscription")]
