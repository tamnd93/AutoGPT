import {
  getGetV2ListChatConnectionsMockHandler,
  getGetV2ListChatConnectionsMockHandler200,
  getGetV2ListChatConnectionsResponseMock,
  getGetV2ListChatConnectionsResponseMock200,
} from "@/app/api/__generated__/endpoints/chat/chat.msw";
import type { AIConnectionOffer } from "@/app/api/__generated__/models/aIConnectionOffer";
import type { AIConnectionOffersResponse } from "@/app/api/__generated__/models/aIConnectionOffersResponse";
import type { AIProviderDefinition } from "@/app/api/__generated__/models/aIProviderDefinition";
import { describe, expect, expectTypeOf, it } from "vitest";

describe("AI Provider Catalogue API Contract", () => {
  describe("Type Definitions & Schema Adherence", () => {
    it("adheres to the AIConnectionOffersResponse schema contract", () => {
      expectTypeOf<AIConnectionOffersResponse>().toHaveProperty("offers");
      expectTypeOf<AIConnectionOffersResponse>().toHaveProperty("providers");
      expectTypeOf<AIConnectionOffersResponse["offers"]>().toEqualTypeOf<
        AIConnectionOffer[]
      >();
      expectTypeOf<AIConnectionOffersResponse["providers"]>().toEqualTypeOf<
        AIProviderDefinition[] | null | undefined
      >();
    });

    it("adheres to the AIProviderDefinition schema contract", () => {
      expectTypeOf<AIProviderDefinition>().toHaveProperty("id");
      expectTypeOf<AIProviderDefinition>().toHaveProperty("display_name");
      expectTypeOf<AIProviderDefinition>().toHaveProperty("status");
      expectTypeOf<AIProviderDefinition>().toHaveProperty("description");
      expectTypeOf<AIProviderDefinition>().toHaveProperty("logo_src");
      expectTypeOf<AIProviderDefinition>().toHaveProperty("connect_method");
      expectTypeOf<AIProviderDefinition>().toHaveProperty(
        "credential_provider",
      );

      expectTypeOf<AIProviderDefinition["id"]>().toBeString();
      expectTypeOf<AIProviderDefinition["display_name"]>().toBeString();
      expectTypeOf<AIProviderDefinition["status"]>().toBeString();
      expectTypeOf<AIProviderDefinition["logo_src"]>().toEqualTypeOf<
        string | null | undefined
      >();
      expectTypeOf<AIProviderDefinition["connect_method"]>().toEqualTypeOf<
        string | null | undefined
      >();
      expectTypeOf<AIProviderDefinition["credential_provider"]>().toEqualTypeOf<
        string | null | undefined
      >();
    });
  });

  describe("Standard Dynamic Response (Offers and Providers)", () => {
    it("correctly models a full dynamic provider catalogue response", () => {
      const sampleResponse: AIConnectionOffersResponse = {
        offers: [
          {
            offer_id: "test-offer-1",
            auth_provider: "codex",
            provider_family: "openai",
            display_name: "ChatGPT",
            auth_method: "oauth",
            credential_id: null,
            backed_by_label: "OpenAI",
            description: "Connect ChatGPT account",
            state: "available",
            selectable: true,
            is_default: false,
            tiers: [],
            limitations: [],
          },
        ],
        providers: [
          {
            id: "codex",
            display_name: "ChatGPT",
            logo_src: "/integrations/openai.png",
            description: {
              en: "Connect with your ChatGPT Plus or Pro subscription to use OpenAI models.",
              vi: "Kết nối gói ChatGPT Plus hoặc Pro để dùng mô hình OpenAI.",
            },
            status: "available",
            connect_method: "oauth",
            credential_provider: "openai",
          },
          {
            id: "microsoft_365_copilot",
            display_name: "Microsoft 365 Copilot",
            logo_src: "/integrations/microsoft.webp",
            description: {
              en: "Sign in with your Microsoft work or school account to use Copilot.",
              vi: "Đăng nhập bằng tài khoản Microsoft công việc hoặc trường học để dùng Copilot.",
            },
            status: "available",
            connect_method: "device_code",
            credential_provider: "microsoft",
          },
          {
            id: "opencode",
            display_name: "OpenCode",
            logo_src: null,
            description: {
              en: "Connect with an OpenCode API key for specialized code intelligence.",
              vi: "Kết nối bằng khóa API OpenCode cho tác vụ lập trình chuyên biệt.",
            },
            status: "available",
            connect_method: "opencode_key",
            credential_provider: "opencode",
          },
          {
            id: "xai",
            display_name: "Grok",
            logo_src: "/integrations/xai.webp",
            description: {
              en: "Upcoming support for xAI Grok models.",
              vi: "Sắp hỗ trợ các mô hình xAI Grok.",
            },
            status: "coming-soon",
            connect_method: null,
            credential_provider: null,
          },
          {
            id: "github_copilot",
            display_name: "GitHub Copilot",
            logo_src: "/integrations/github.png",
            description: {
              en: "Upcoming support for GitHub Copilot accounts.",
              vi: "Sắp hỗ trợ tài khoản GitHub Copilot.",
            },
            status: "coming-soon",
            connect_method: null,
            credential_provider: null,
          },
        ],
      };

      expect(sampleResponse.offers).toHaveLength(1);
      expect(sampleResponse.providers).toBeDefined();
      expect(sampleResponse.providers).toHaveLength(5);

      const codex = sampleResponse.providers![0];
      expect(codex.id).toBe("codex");
      expect(codex.display_name).toBe("ChatGPT");
      expect(codex.status).toBe("available");
      expect(codex.connect_method).toBe("oauth");
      expect(codex.credential_provider).toBe("openai");
      expect(codex.description.en).toContain("ChatGPT Plus or Pro");
      expect(codex.description.vi).toContain("ChatGPT Plus hoặc Pro");

      const grok = sampleResponse.providers![3];
      expect(grok.id).toBe("xai");
      expect(grok.display_name).toBe("Grok");
      expect(grok.status).toBe("coming-soon");
      expect(grok.connect_method).toBeNull();
      expect(grok.credential_provider).toBeNull();
    });
  });

  describe("Backward Compatibility (Legacy Responses)", () => {
    it("handles legacy responses where providers is omitted (undefined)", () => {
      const legacyOmitted: AIConnectionOffersResponse = {
        offers: [
          {
            offer_id: "legacy-1",
            auth_provider: "platform",
            provider_family: "autogpt",
            display_name: "AutoGPT Platform",
            auth_method: "none",
            credential_id: null,
            backed_by_label: "AutoGPT",
            description: "Default platform provider",
            state: "available",
            selectable: true,
            is_default: true,
            tiers: [],
            limitations: [],
          },
        ],
      };

      expect(legacyOmitted.offers).toHaveLength(1);
      expect(legacyOmitted.providers).toBeUndefined();
    });

    it("handles legacy responses where providers is explicitly null", () => {
      const legacyNull: AIConnectionOffersResponse = {
        offers: [],
        providers: null,
      };

      expect(legacyNull.offers).toHaveLength(0);
      expect(legacyNull.providers).toBeNull();
    });
  });

  describe("Empty Providers Array", () => {
    it("handles responses with an empty providers array", () => {
      const emptyProviders: AIConnectionOffersResponse = {
        offers: [],
        providers: [],
      };

      expect(emptyProviders.offers).toHaveLength(0);
      expect(emptyProviders.providers).toBeDefined();
      expect(Array.isArray(emptyProviders.providers)).toBe(true);
      expect(emptyProviders.providers).toHaveLength(0);
    });
  });

  describe("MSW Mock Generation", () => {
    it("generates valid response mocks via getGetV2ListChatConnectionsResponseMock", () => {
      const mockResponse = getGetV2ListChatConnectionsResponseMock();

      expect(mockResponse).toBeDefined();
      expect(Array.isArray(mockResponse.offers)).toBe(true);

      if (mockResponse.providers) {
        expect(Array.isArray(mockResponse.providers)).toBe(true);
        for (const provider of mockResponse.providers) {
          expect(typeof provider.id).toBe("string");
          expect(typeof provider.display_name).toBe("string");
          expect(typeof provider.status).toBe("string");
          expect(typeof provider.description).toBe("object");
        }
      }
    });

    it("allows overriding providers in getGetV2ListChatConnectionsResponseMock", () => {
      const customProvider: AIProviderDefinition = {
        id: "custom-test-provider",
        display_name: "Test Provider",
        logo_src: "/integrations/test.png",
        description: { en: "Test description" },
        status: "available",
        connect_method: "oauth",
        credential_provider: "custom",
      };

      const overriddenMock = getGetV2ListChatConnectionsResponseMock({
        providers: [customProvider],
      });

      expect(overriddenMock.providers).toBeDefined();
      expect(overriddenMock.providers).toHaveLength(1);
      expect(overriddenMock.providers![0].id).toBe("custom-test-provider");
      expect(overriddenMock.providers![0].display_name).toBe("Test Provider");
    });

    it("generates valid response mocks via getGetV2ListChatConnectionsResponseMock200", () => {
      const mock200 = getGetV2ListChatConnectionsResponseMock200();
      expect(mock200).toBeDefined();
      expect(Array.isArray(mock200.offers)).toBe(true);
    });

    it("instantiates MSW mock handlers without throwing", () => {
      const defaultHandler = getGetV2ListChatConnectionsMockHandler();
      expect(defaultHandler).toBeDefined();
      expect(defaultHandler.info.header).toContain("GET");

      const handler200 = getGetV2ListChatConnectionsMockHandler200();
      expect(handler200).toBeDefined();
      expect(handler200.info.header).toContain("GET");
    });
  });
});
