"""Where a user-owned chat subscription serves model calls, as data.

The copilot chat reaches a BYOK subscription through the Claude Agent SDK's
environment (copilot.sdk.env); a workflow block has no SDK, so the same
endpoint is described here. One table: a new subscription provider is a
ChatConfig field plus a row, and no block learns a provider's name.
"""

from collections.abc import Callable
from dataclasses import dataclass

from backend.copilot.config import ChatConfig


@dataclass(frozen=True)
class ByokEndpoint:
    """An Anthropic-Messages-compatible endpoint billed to the user's plan."""

    base_url: str
    standard_model: str
    advanced_model: str
    # The gateway refuses an unrouted call, so a caller that is not the chat
    # SDK has to name a session of its own through this header.
    session_header: str | None = None


_ENDPOINTS: dict[str, Callable[[ChatConfig], ByokEndpoint]] = {
    "opencode": lambda config: ByokEndpoint(
        base_url=config.opencode_base_url,
        standard_model=config.opencode_standard_model,
        advanced_model=config.opencode_advanced_model,
        session_header="x-opencode-session",
    ),
}


def byok_endpoint(
    provider: str, config: ChatConfig | None = None
) -> ByokEndpoint | None:
    """The endpoint for *provider*, or None when it cannot serve a block."""
    factory = _ENDPOINTS.get(provider)
    return factory(config or ChatConfig()) if factory else None
