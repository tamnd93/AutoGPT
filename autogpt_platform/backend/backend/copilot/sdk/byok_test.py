"""BYOK helpers the SDK transport uses for a user-owned subscription."""

from types import SimpleNamespace
from unittest.mock import MagicMock

from backend.copilot.config import ChatConfig
from backend.copilot.sdk.service import _sdk_serving_segment, opencode_sdk_model


def _lease(provider: str, credential_id: str = "cred-1") -> MagicMock:
    lease = MagicMock()
    lease.credentials = SimpleNamespace(provider=provider, id=credential_id)
    return lease


def test_opencode_model_follows_the_requested_tier() -> None:
    config = ChatConfig(
        opencode_standard_model="glm-5.3",
        opencode_advanced_model="gpt-6-luna",
    )

    assert opencode_sdk_model(None, config) == "glm-5.3"
    assert opencode_sdk_model("standard", config) == "glm-5.3"
    assert opencode_sdk_model("advanced", config) == "gpt-6-luna"


def test_opencode_turn_is_stamped_with_its_own_provider() -> None:
    segment = _sdk_serving_segment(_lease("opencode"))

    assert segment.auth_provider == "opencode"
    assert segment.credential_id == "cred-1"


def test_codex_keeps_its_own_segment() -> None:
    assert _sdk_serving_segment(_lease("codex")).auth_provider == "codex"


def test_no_lease_is_the_platform_segment() -> None:
    segment = _sdk_serving_segment(None)

    assert segment.auth_provider == "platform"
    assert segment.credential_id is None
