"""Tests for the dynamic AI provider catalogue definitions and validation."""

import pytest
from pydantic import ValidationError

from backend.copilot.provider_catalog import AIProviderDefinition, get_provider_catalog


def test_provider_catalog_returns_five_authoritative_providers():
    catalog = get_provider_catalog()
    assert len(catalog) == 5

    # Check exact order and properties
    expected_entries = [
        (
            "codex",
            "ChatGPT",
            "/integrations/openai.png",
            "available",
            "oauth",
            "openai",
        ),
        (
            "microsoft_365_copilot",
            "Microsoft 365 Copilot",
            "/integrations/microsoft.webp",
            "available",
            "device_code",
            "microsoft",
        ),
        (
            "opencode",
            "OpenCode",
            None,
            "available",
            "opencode_key",
            "opencode",
        ),
        (
            "xai",
            "Grok",
            "/integrations/xai.webp",
            "coming-soon",
            None,
            None,
        ),
        (
            "github_copilot",
            "GitHub Copilot",
            "/integrations/github.png",
            "coming-soon",
            None,
            None,
        ),
    ]

    for provider, (
        exp_id,
        exp_name,
        exp_logo,
        exp_status,
        exp_method,
        exp_cred,
    ) in zip(catalog, expected_entries, strict=True):
        assert provider.id == exp_id
        assert provider.display_name == exp_name
        assert provider.logo_src == exp_logo
        assert provider.status == exp_status
        assert provider.connect_method == exp_method
        assert provider.credential_provider == exp_cred
        assert "en" in provider.description and provider.description["en"].strip()
        assert "vi" in provider.description and provider.description["vi"].strip()


def test_provider_catalog_ids_are_unique():
    catalog = get_provider_catalog()
    ids = [p.id for p in catalog]
    assert len(ids) == len(set(ids))


def test_provider_catalog_descriptions_have_en_and_vi():
    catalog = get_provider_catalog()
    for provider in catalog:
        assert isinstance(provider.description, dict)
        assert "en" in provider.description
        assert "vi" in provider.description
        assert len(provider.description["en"].strip()) > 0
        assert len(provider.description["vi"].strip()) > 0


def test_provider_catalog_contains_no_sensitive_secrets():
    catalog = get_provider_catalog()
    for provider in catalog:
        dump = provider.model_dump()
        for key, value in dump.items():
            assert "secret" not in key.lower()
            assert "token" not in key.lower()
            assert "password" not in key.lower()
            if isinstance(value, str):
                assert not value.startswith("sk-")
                assert not value.startswith("Bearer ")


def test_provider_definition_valid_available():
    provider = AIProviderDefinition(
        id="test_provider",
        display_name="Test Provider",
        logo_src="/integrations/test.png",
        description={"en": "Test description", "vi": "Mô tả thử nghiệm"},
        status="available",
        connect_method="oauth",
        credential_provider="test_cred",
    )
    assert provider.id == "test_provider"
    assert provider.status == "available"
    assert provider.connect_method == "oauth"


def test_provider_definition_valid_coming_soon():
    provider = AIProviderDefinition(
        id="future_provider",
        display_name="Future Provider",
        logo_src=None,
        description={"en": "Coming soon"},
        status="coming-soon",
        connect_method=None,
        credential_provider=None,
    )
    assert provider.id == "future_provider"
    assert provider.status == "coming-soon"
    assert provider.connect_method is None
    assert provider.credential_provider is None


def test_provider_definition_empty_id_rejected():
    with pytest.raises(ValidationError, match="Provider id cannot be empty"):
        AIProviderDefinition(
            id="   ",
            display_name="Valid",
            description={"en": "Valid"},
            status="coming-soon",
        )


def test_provider_definition_empty_display_name_rejected():
    with pytest.raises(ValidationError, match="display_name cannot be empty"):
        AIProviderDefinition(
            id="valid_id",
            display_name="   ",
            description={"en": "Valid"},
            status="coming-soon",
        )


def test_provider_definition_invalid_logo_prefix_rejected():
    with pytest.raises(
        ValidationError, match="logo_src must start with '/integrations/'"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            logo_src="https://evil.com/phish.png",
            description={"en": "Valid"},
            status="coming-soon",
        )

    with pytest.raises(
        ValidationError, match="logo_src must start with '/integrations/'"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            logo_src="/static/test.png",
            description={"en": "Valid"},
            status="coming-soon",
        )


def test_provider_definition_logo_path_traversal_rejected():
    with pytest.raises(ValidationError, match="path traversal"):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            logo_src="/integrations/../etc/passwd",
            description={"en": "Valid"},
            status="coming-soon",
        )

    with pytest.raises(ValidationError, match="path traversal"):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            logo_src="/integrations/sub\\traversal.png",
            description={"en": "Valid"},
            status="coming-soon",
        )


def test_provider_definition_none_logo_allowed():
    provider = AIProviderDefinition(
        id="test_id",
        display_name="Test",
        logo_src=None,
        description={"en": "Valid"},
        status="coming-soon",
    )
    assert provider.logo_src is None


def test_provider_definition_description_missing_en_rejected():
    with pytest.raises(ValidationError, match="must contain a non-empty 'en' key"):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"vi": "Thiếu tiếng Anh"},
            status="coming-soon",
        )


def test_provider_definition_description_empty_en_rejected():
    with pytest.raises(ValidationError, match="must contain a non-empty 'en' key"):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "   "},
            status="coming-soon",
        )


def test_provider_definition_description_unsupported_locale_rejected():
    with pytest.raises(ValidationError, match="Unsupported locale 'fr'"):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid", "fr": "Invalide"},
            status="coming-soon",
        )


def test_provider_definition_description_empty_locale_value_rejected():
    with pytest.raises(
        ValidationError, match="description for locale 'vi' cannot be empty"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid", "vi": "   "},
            status="coming-soon",
        )


def test_provider_definition_invalid_status_rejected():
    with pytest.raises(ValidationError, match="status must be one of"):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid"},
            status="active",
        )


def test_provider_definition_coming_soon_cannot_have_connect_method():
    with pytest.raises(
        ValidationError, match="coming-soon provider must have connect_method=None"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid"},
            status="coming-soon",
            connect_method="oauth",
        )


def test_provider_definition_coming_soon_cannot_have_credential_provider():
    with pytest.raises(
        ValidationError, match="coming-soon provider must have credential_provider=None"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid"},
            status="coming-soon",
            credential_provider="openai",
        )


def test_provider_definition_available_requires_valid_connect_method():
    with pytest.raises(
        ValidationError, match="available provider must have connect_method in"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid"},
            status="available",
            connect_method="unsupported_method",
            credential_provider="test_cred",
        )

    with pytest.raises(
        ValidationError, match="available provider must have connect_method in"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid"},
            status="available",
            connect_method=None,
            credential_provider="test_cred",
        )


def test_provider_definition_available_requires_credential_provider():
    with pytest.raises(
        ValidationError, match="available provider must specify credential_provider"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid"},
            status="available",
            connect_method="oauth",
            credential_provider=None,
        )

    with pytest.raises(
        ValidationError, match="available provider must specify credential_provider"
    ):
        AIProviderDefinition(
            id="test_id",
            display_name="Test",
            description={"en": "Valid"},
            status="available",
            connect_method="oauth",
            credential_provider="   ",
        )
