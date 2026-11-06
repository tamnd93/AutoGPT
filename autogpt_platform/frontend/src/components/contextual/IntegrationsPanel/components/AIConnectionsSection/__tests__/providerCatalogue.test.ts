import { describe, expect, it } from "vitest";

import type { AIConnectionOffer } from "@/app/api/__generated__/models/aIConnectionOffer";
import type { AIProviderDefinition } from "@/app/api/__generated__/models/aIProviderDefinition";
import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";

import {
  getProviderDescription,
  isCatalogProviderLinked,
  LEGACY_PROVIDER_CATALOG,
  normalizeProviderCatalog,
} from "../providerCatalogue";

describe("providerCatalogue", () => {
  it("falls back to the five legacy providers when providers is undefined or null", () => {
    const fromUndefined = normalizeProviderCatalog(undefined);
    const fromNull = normalizeProviderCatalog(null);

    expect(fromUndefined.map((p) => p.id)).toEqual([
      "codex",
      "microsoft_365_copilot",
      "opencode",
      "xai",
      "github_copilot",
    ]);
    expect(fromNull).toEqual(fromUndefined);
    expect(LEGACY_PROVIDER_CATALOG).toHaveLength(5);
  });

  it("respects an explicit empty array without restoring the fallback", () => {
    expect(normalizeProviderCatalog([])).toEqual([]);
  });

  it("preserves backend ordering and drops entries missing id/display_name or with duplicate ids", () => {
    const input: AIProviderDefinition[] = [
      {
        id: "github_copilot",
        display_name: "GitHub Copilot",
        logo_src: "/integrations/github.png",
        description: { en: "GitHub coming soon." },
        status: "coming-soon",
        connect_method: null,
        credential_provider: null,
      },
      {
        id: "   ",
        display_name: "Blank ID",
        description: { en: "Ignored" },
        status: "available",
        connect_method: "oauth",
        credential_provider: "blank",
      },
      {
        id: "no_name",
        display_name: "   ",
        description: { en: "Ignored" },
        status: "available",
        connect_method: "oauth",
        credential_provider: "no_name",
      },
      {
        id: "custom_oauth",
        display_name: "Claude Max",
        logo_src: "/integrations/anthropic.png",
        description: {
          en: "Connect Claude subscription.",
          vi: "Kết nối gói Claude.",
        },
        status: "available",
        connect_method: "oauth",
        credential_provider: "anthropic_oauth",
      },
      {
        id: "custom_oauth",
        display_name: "Duplicate Claude",
        description: { en: "Duplicate" },
        status: "available",
        connect_method: "oauth",
        credential_provider: "dup",
      },
    ];

    const result = normalizeProviderCatalog(input);
    expect(result.map((p) => p.id)).toEqual(["github_copilot", "custom_oauth"]);
    expect(result[1].display_name).toBe("Claude Max");
    expect(result[1].status).toBe("available");
    expect(result[1].connect_method).toBe("oauth");
    expect(result[1].credential_provider).toBe("anthropic_oauth");
  });

  it("allowlists relative /integrations/ non-SVG logos and strips invalid paths", () => {
    const input: AIProviderDefinition[] = [
      {
        id: "valid_logo",
        display_name: "Valid",
        logo_src: "/integrations/openai.png",
        description: { en: "Valid logo" },
        status: "coming-soon",
      },
      {
        id: "external_logo",
        display_name: "External",
        logo_src: "https://evil.example.com/logo.png",
        description: { en: "External" },
        status: "coming-soon",
      },
      {
        id: "traversal_logo",
        display_name: "Traversal",
        logo_src: "/integrations/../secret.png",
        description: { en: "Traversal" },
        status: "coming-soon",
      },
      {
        id: "svg_logo",
        display_name: "SVG",
        logo_src: "/integrations/vector.svg",
        description: { en: "SVG" },
        status: "coming-soon",
      },
    ];

    const result = normalizeProviderCatalog(input);
    expect(result.find((p) => p.id === "valid_logo")?.logo_src).toBe(
      "/integrations/openai.png",
    );
    expect(result.find((p) => p.id === "external_logo")?.logo_src).toBeNull();
    expect(result.find((p) => p.id === "traversal_logo")?.logo_src).toBeNull();
    expect(result.find((p) => p.id === "svg_logo")?.logo_src).toBeNull();
  });

  it("downgrades unknown status or unknown connect_method to unsupported with null connect_method", () => {
    const input: AIProviderDefinition[] = [
      {
        id: "future_method",
        display_name: "Future Auth",
        description: { en: "Requires WebAuthn" },
        status: "available",
        connect_method: "webauthn_passkey",
        credential_provider: "future",
      },
      {
        id: "future_status",
        display_name: "Beta Status",
        description: { en: "Waitlist" },
        status: "waitlist",
        connect_method: "oauth",
        credential_provider: "beta",
      },
      {
        id: "missing_cred_provider",
        display_name: "Missing Cred",
        description: { en: "Missing credential_provider" },
        status: "available",
        connect_method: "oauth",
        credential_provider: null,
      },
    ];

    const result = normalizeProviderCatalog(input);
    expect(result).toHaveLength(3);
    for (const item of result) {
      expect(item.status).toBe("unsupported");
      expect(item.connect_method).toBeNull();
    }
  });

  it("selects localized description with English fallback", () => {
    const provider: AIProviderDefinition = {
      id: "codex",
      display_name: "ChatGPT",
      description: {
        en: "English description",
        vi: "Mô tả tiếng Việt",
      },
      status: "available",
      connect_method: "oauth",
      credential_provider: "openai",
    };

    expect(getProviderDescription(provider, "vi")).toBe("Mô tả tiếng Việt");
    expect(getProviderDescription(provider, "en")).toBe("English description");
    expect(
      getProviderDescription(
        {
          ...provider,
          description: { en: "Only English" },
        },
        "vi",
      ),
    ).toBe("Only English");
  });

  it("determines whether a catalog provider is linked from offers or credentials", () => {
    const [codex, microsoft] = normalizeProviderCatalog(undefined);
    const linkedOffer = {
      offer_id: "codex:cred-1",
      auth_provider: "codex",
      credential_id: "cred-1",
    } as AIConnectionOffer;
    const lockedOffer = {
      offer_id: "codex:locked",
      auth_provider: "codex",
      credential_id: null,
    } as AIConnectionOffer;
    const creds: CredentialsMetaResponse[] = [
      {
        id: "cred-ms",
        provider: "microsoft",
        type: "oauth2",
        title: "MS",
        scopes: [],
        username: null,
      },
    ];

    expect(isCatalogProviderLinked(codex, [linkedOffer], [])).toBe(true);
    expect(isCatalogProviderLinked(codex, [lockedOffer], [])).toBe(false);
    expect(isCatalogProviderLinked(microsoft, [], creds)).toBe(false);
    expect(
      isCatalogProviderLinked(
        microsoft,
        [
          {
            offer_id: "microsoft_365_copilot:cred-ms",
            auth_provider: "microsoft_365_copilot",
            credential_id: "cred-ms",
          } as AIConnectionOffer,
        ],
        creds,
      ),
    ).toBe(true);
  });
});
