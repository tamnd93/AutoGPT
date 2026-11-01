from backend.copilot.byok_endpoint import byok_endpoint
from backend.copilot.config import ChatConfig


def test_opencode_resolves_the_configured_endpoint():
    endpoint = byok_endpoint("opencode")

    assert endpoint is not None
    config = ChatConfig()
    assert endpoint.base_url == config.opencode_base_url
    assert endpoint.standard_model == config.opencode_standard_model
    assert endpoint.advanced_model == config.opencode_advanced_model
    assert endpoint.session_header == "x-opencode-session"


def test_providers_without_an_endpoint_are_unknown():
    assert byok_endpoint("platform") is None
    assert byok_endpoint("not-a-provider") is None
