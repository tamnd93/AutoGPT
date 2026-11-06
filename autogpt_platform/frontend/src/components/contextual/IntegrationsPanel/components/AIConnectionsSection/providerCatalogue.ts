import type { AIConnectionOffer } from "@/app/api/__generated__/models/aIConnectionOffer";
import type { AIProviderDefinition } from "@/app/api/__generated__/models/aIProviderDefinition";
import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";

export type NormalizedProviderStatus =
  | "available"
  | "coming-soon"
  | "unsupported";

export type NormalizedConnectMethod = "oauth" | "device_code" | "opencode_key";

export interface NormalizedProvider {
  id: string;
  display_name: string;
  logo_src: string | null;
  description: Record<string, string>;
  status: NormalizedProviderStatus;
  connect_method: NormalizedConnectMethod | null;
  credential_provider: string | null;
}

const ALLOWED_METHODS = new Set<NormalizedConnectMethod>([
  "oauth",
  "device_code",
  "opencode_key",
]);

export const LEGACY_PROVIDER_CATALOG: AIProviderDefinition[] = [
  {
    id: "codex",
    display_name: "ChatGPT",
    logo_src: "/integrations/openai.png",
    description: {
      en: "Connect your ChatGPT subscription to chat with models included in your plan.",
      vi: "Kết nối gói đăng ký ChatGPT của bạn để trò chuyện với các mô hình có trong gói.",
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
      en: "Connect your Microsoft 365 Copilot subscription using device authentication.",
      vi: "Kết nối gói đăng ký Microsoft 365 Copilot của bạn bằng xác thực thiết bị.",
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
      en: "Connect with your OpenCode API key to run on your OpenCode plan.",
      vi: "Kết nối bằng khoá API OpenCode để chạy trên gói OpenCode của bạn.",
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
      en: "Grok by xAI integration coming soon.",
      vi: "Tích hợp Grok của xAI sắp ra mắt.",
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
      en: "GitHub Copilot integration coming soon.",
      vi: "Tích hợp GitHub Copilot sắp ra mắt.",
    },
    status: "coming-soon",
    connect_method: null,
    credential_provider: null,
  },
];

function sanitizeLogoSrc(logoSrc?: string | null): string | null {
  if (!logoSrc) return null;
  const trimmed = logoSrc.trim();
  if (!trimmed.startsWith("/integrations/")) return null;
  if (trimmed.includes("..") || trimmed.includes("\\")) return null;
  if (trimmed.toLowerCase().endsWith(".svg")) return null;
  return trimmed;
}

export function normalizeProviderCatalog(
  providers?: AIProviderDefinition[] | null,
): NormalizedProvider[] {
  const source =
    providers === undefined || providers === null
      ? LEGACY_PROVIDER_CATALOG
      : providers;

  const seenIds = new Set<string>();
  const normalized: NormalizedProvider[] = [];

  for (const item of source) {
    if (
      !item ||
      typeof item.id !== "string" ||
      typeof item.display_name !== "string"
    ) {
      continue;
    }
    const id = item.id.trim();
    const displayName = item.display_name.trim();
    if (!id || !displayName || seenIds.has(id)) {
      continue;
    }
    seenIds.add(id);

    const rawMethod = item.connect_method?.trim() ?? null;
    const rawCredProvider = item.credential_provider?.trim() ?? null;
    const isKnownMethod =
      rawMethod !== null &&
      ALLOWED_METHODS.has(rawMethod as NormalizedConnectMethod);

    let status: NormalizedProviderStatus = "unsupported";
    let connectMethod: NormalizedConnectMethod | null = null;
    let credentialProvider: string | null = null;

    if (item.status === "coming-soon" && rawMethod === null) {
      status = "coming-soon";
    } else if (
      item.status === "available" &&
      isKnownMethod &&
      Boolean(rawCredProvider)
    ) {
      status = "available";
      connectMethod = rawMethod as NormalizedConnectMethod;
      credentialProvider = rawCredProvider;
    }

    normalized.push({
      id,
      display_name: displayName,
      logo_src: sanitizeLogoSrc(item.logo_src),
      description:
        item.description && typeof item.description === "object"
          ? item.description
          : {},
      status,
      connect_method: connectMethod,
      credential_provider: credentialProvider,
    });
  }

  return normalized;
}

export function getProviderDescription(
  provider: Pick<AIProviderDefinition, "description"> | NormalizedProvider,
  locale: string,
): string {
  const map = provider.description ?? {};
  const localized = map[locale];
  if (typeof localized === "string" && localized.trim().length > 0) {
    return localized;
  }
  const fallback = map.en;
  return typeof fallback === "string" ? fallback : "";
}

export function isCatalogProviderLinked(
  provider: Pick<NormalizedProvider, "id" | "credential_provider">,
  offers: AIConnectionOffer[] | undefined,
  credentials?: CredentialsMetaResponse[],
): boolean {
  const keys = new Set<string>([provider.id]);
  if (provider.credential_provider) {
    keys.add(provider.credential_provider);
  }
  const linkedInOffers = (offers ?? []).some(
    (offer) => Boolean(offer.credential_id) && keys.has(offer.auth_provider),
  );
  if (linkedInOffers) return true;
  if (!credentials || credentials.length === 0) return false;
  return (offers ?? []).some(
    (offer) =>
      Boolean(offer.credential_id) &&
      credentials.some(
        (cred) => cred.id === offer.credential_id && keys.has(cred.provider),
      ),
  );
}
