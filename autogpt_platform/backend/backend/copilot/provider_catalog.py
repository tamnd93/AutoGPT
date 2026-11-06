"""Dynamic AI provider catalogue definitions and configuration."""

from pydantic import BaseModel, Field, field_validator, model_validator

ALLOWED_LOCALES = {"en", "vi"}
ALLOWED_STATUSES = {"available", "coming-soon"}
ALLOWED_CONNECT_METHODS = {"oauth", "device_code", "opencode_key"}


class AIProviderDefinition(BaseModel):
    id: str = Field(..., description="Stable unique identifier for the provider")
    display_name: str = Field(..., description="Untranslated brand name")
    logo_src: str | None = Field(
        default=None,
        description="Allowlisted relative logo path starting with /integrations/",
    )
    description: dict[str, str] = Field(
        ...,
        description="Localized descriptions; 'en' is mandatory, 'vi' is optional",
    )
    status: str = Field(
        ...,
        description="Provider availability status ('available' or 'coming-soon')",
    )
    connect_method: str | None = Field(
        default=None,
        description="Frontend connect adapter method ('oauth', 'device_code', 'opencode_key', or None)",
    )
    credential_provider: str | None = Field(
        default=None,
        description="Key identifying the provider in the credential store",
    )

    @field_validator("id")
    @classmethod
    def validate_id(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Provider id cannot be empty")
        return v

    @field_validator("display_name")
    @classmethod
    def validate_display_name(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("display_name cannot be empty")
        return v

    @field_validator("logo_src")
    @classmethod
    def validate_logo_src(cls, v: str | None) -> str | None:
        if v is None:
            return None
        v = v.strip()
        if not v.startswith("/integrations/"):
            raise ValueError(f"logo_src must start with '/integrations/', got: {v}")
        if ".." in v or "\\" in v:
            raise ValueError(f"logo_src cannot contain path traversal characters: {v}")
        return v

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: dict[str, str]) -> dict[str, str]:
        if not isinstance(v, dict) or "en" not in v or not v["en"].strip():
            raise ValueError("description must contain a non-empty 'en' key")
        for loc, text in v.items():
            if loc not in ALLOWED_LOCALES:
                raise ValueError(
                    f"Unsupported locale '{loc}' in description. Allowed: {ALLOWED_LOCALES}"
                )
            if not text.strip():
                raise ValueError(f"description for locale '{loc}' cannot be empty")
        return v

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        if v not in ALLOWED_STATUSES:
            raise ValueError(f"status must be one of {ALLOWED_STATUSES}, got: {v}")
        return v

    @model_validator(mode="after")
    def validate_status_and_actions(self) -> "AIProviderDefinition":
        if self.status == "coming-soon":
            if self.connect_method is not None:
                raise ValueError("coming-soon provider must have connect_method=None")
            if self.credential_provider is not None:
                raise ValueError(
                    "coming-soon provider must have credential_provider=None"
                )
        elif self.status == "available":
            if self.connect_method not in ALLOWED_CONNECT_METHODS:
                raise ValueError(
                    f"available provider must have connect_method in {ALLOWED_CONNECT_METHODS}, got: {self.connect_method}"
                )
            if not self.credential_provider or not self.credential_provider.strip():
                raise ValueError("available provider must specify credential_provider")
        return self


def get_provider_catalog() -> list[AIProviderDefinition]:
    """Return the authoritative list of AI provider definitions in exact display order."""
    return [
        AIProviderDefinition(
            id="codex",
            display_name="ChatGPT",
            logo_src="/integrations/openai.png",
            description={
                "en": "Connect your ChatGPT subscription to chat with models included in your plan.",
                "vi": "Kết nối gói đăng ký ChatGPT của bạn để trò chuyện với các mô hình có trong gói.",
            },
            status="available",
            connect_method="oauth",
            credential_provider="openai",
        ),
        AIProviderDefinition(
            id="microsoft_365_copilot",
            display_name="Microsoft 365 Copilot",
            logo_src="/integrations/microsoft.webp",
            description={
                "en": "Connect your Microsoft 365 Copilot subscription using device authentication.",
                "vi": "Kết nối gói đăng ký Microsoft 365 Copilot của bạn bằng xác thực thiết bị.",
            },
            status="available",
            connect_method="device_code",
            credential_provider="microsoft",
        ),
        AIProviderDefinition(
            id="opencode",
            display_name="OpenCode",
            logo_src=None,
            description={
                "en": "Connect with your OpenCode API key to run on your OpenCode plan.",
                "vi": "Kết nối bằng khoá API OpenCode để chạy trên gói OpenCode của bạn.",
            },
            status="available",
            connect_method="opencode_key",
            credential_provider="opencode",
        ),
        AIProviderDefinition(
            id="xai",
            display_name="Grok",
            logo_src="/integrations/xai.webp",
            description={
                "en": "Grok by xAI integration coming soon.",
                "vi": "Tích hợp Grok của xAI sắp ra mắt.",
            },
            status="coming-soon",
            connect_method=None,
            credential_provider=None,
        ),
        AIProviderDefinition(
            id="github_copilot",
            display_name="GitHub Copilot",
            logo_src="/integrations/github.png",
            description={
                "en": "GitHub Copilot integration coming soon.",
                "vi": "Tích hợp GitHub Copilot sắp ra mắt.",
            },
            status="coming-soon",
            connect_method=None,
            credential_provider=None,
        ),
    ]
