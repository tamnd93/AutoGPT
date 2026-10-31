"""Providers declared without a block of their own."""

import backend.blocks._static_provider_configs  # noqa: F401  # registers them
from backend.integrations.providers import ProviderName
from backend.sdk.registry import AutoRegistry


def test_opencode_is_a_registered_provider() -> None:
    assert ProviderName.OPENCODE.value == "opencode"
    provider = AutoRegistry.get_provider("opencode")
    assert provider is not None
    assert provider.supported_auth_types == {"api_key"}
