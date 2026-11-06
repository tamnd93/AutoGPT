import type { AIConnectionOffer } from "@/app/api/__generated__/models/aIConnectionOffer";
import type { SetDefaultTransportRequest } from "@/app/api/__generated__/models/setDefaultTransportRequest";
import type { SetDefaultTransportRequestAuthProvider } from "@/app/api/__generated__/models/setDefaultTransportRequestAuthProvider";
import type { Locale } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

export function isProviderLinked(
  offers: AIConnectionOffer[] | undefined,
  authProvider: string,
): boolean {
  return (offers ?? []).some(
    (offer) =>
      offer.auth_provider === authProvider && Boolean(offer.credential_id),
  );
}

// A scope the map does not know keeps the server's own name.
const MICROSOFT_SCOPE_KEYS: Record<string, MessageKey> = {
  "User.Read": "aiConnections1.microsoft.scope.basicProfile",
  "Sites.Read.All": "aiConnections1.microsoft.scope.sharePoint",
  "Mail.Read": "aiConnections1.microsoft.scope.mail",
  "People.Read.All": "aiConnections1.microsoft.scope.people",
  "OnlineMeetingTranscript.Read.All":
    "aiConnections1.microsoft.scope.meetingTranscripts",
  "Chat.Read": "aiConnections1.microsoft.scope.teamsChats",
  "ChannelMessage.Read.All": "aiConnections1.microsoft.scope.channelMessages",
  "ExternalItem.Read.All": "aiConnections1.microsoft.scope.externalSearch",
  offline_access: "aiConnections1.microsoft.scope.stayConnected",
  openid: "aiConnections1.microsoft.scope.signInIdentity",
  profile: "aiConnections1.microsoft.scope.basicProfile",
  email: "aiConnections1.microsoft.scope.email",
};

export function microsoftAccessLabels(
  scopes: string[] | null | undefined,
  locale?: Locale,
): string[] {
  return Array.from(
    new Set(
      (scopes ?? []).map((scope) => {
        const key = MICROSOFT_SCOPE_KEYS[scope];
        return key ? getMessage(locale ?? "en", key) : scope;
      }),
    ),
  );
}

/**
 * The route to send when making a connection the default.
 *
 * The offer describes a connection; the default is set on the transport that
 * runs it, which is keyed by provider and credential. ``offer_id`` is built
 * server-side as ``{auth_provider}:{credential_id or "deployment"}``, so the
 * provider is recoverable from it without the client deciding anything.
 */
export function routeOf(offer: AIConnectionOffer): SetDefaultTransportRequest {
  return {
    auth_provider: offer.offer_id.split(
      ":",
    )[0] as SetDefaultTransportRequestAuthProvider,
    credential_id: offer.credential_id ?? null,
  };
}

/**
 * Whether this connection can be chosen as the default.
 *
 * A locked offer is listed so the user can see it exists and what unlocks it,
 * but it cannot be routed to, so it cannot be a default either.
 */
export function isSelectable(offer: AIConnectionOffer): boolean {
  return (
    offer.selectable &&
    (offer.auth_method === "deployment" || offer.credential_id !== null)
  );
}

/**
 * Every connection worth showing, selectable or not.
 *
 * A locked one earns its place by explaining an absence the user would
 * otherwise have to guess at.
 */
export function visibleOffers(
  offers: AIConnectionOffer[] | undefined,
): AIConnectionOffer[] {
  return (offers ?? []).filter(
    (offer) => isSelectable(offer) || Boolean(offer.lock_reason),
  );
}

const OFFER_TEXT_KEYS: Record<string, MessageKey> = {
  "Your ChatGPT plan": "aiConnections1.offer.backedBy.chatgpt",
  "Gói ChatGPT của bạn": "aiConnections1.offer.backedBy.chatgpt",
  "Your Microsoft 365 Copilot plan": "aiConnections1.offer.backedBy.microsoft",
  "Gói Microsoft 365 Copilot của bạn":
    "aiConnections1.offer.backedBy.microsoft",
  "Your Microsoft Copilot plan": "aiConnections1.offer.backedBy.microsoftShort",
  "Gói Microsoft Copilot của bạn":
    "aiConnections1.offer.backedBy.microsoftShort",
  "Your OpenCode plan": "aiConnections1.offer.backedBy.opencode",
  "Gói OpenCode của bạn": "aiConnections1.offer.backedBy.opencode",
  "Your AutoGPT plan": "aiConnections1.offer.backedBy.autogpt",
  "Gói AutoGPT của bạn": "aiConnections1.offer.backedBy.autogpt",
  "This server's chat provider": "aiConnections1.offer.backedBy.server",
  "Nhà cung cấp trò chuyện của máy chủ này":
    "aiConnections1.offer.backedBy.server",

  "Run chats on a ChatGPT plan you already pay for, spending no AutoGPT credits.":
    "aiConnections1.offer.description.chatgptLocked",
  "Chạy cuộc trò chuyện trên gói ChatGPT bạn đã trả phí mà không tốn tín dụng AutoGPT.":
    "aiConnections1.offer.description.chatgptLocked",
  "New chats are backed by your ChatGPT plan, and spend no AutoGPT credits.":
    "aiConnections1.offer.description.chatgpt",
  "Các cuộc trò chuyện mới sử dụng gói ChatGPT của bạn và không tốn tín dụng AutoGPT.":
    "aiConnections1.offer.description.chatgpt",
  "New chats are backed by your work or school Microsoft 365 Copilot plan, and spend no AutoGPT credits.":
    "aiConnections1.offer.description.microsoft",
  "Các cuộc trò chuyện mới sử dụng gói Microsoft 365 Copilot công việc hoặc trường học của bạn và không tốn tín dụng AutoGPT.":
    "aiConnections1.offer.description.microsoft",
  "New chats are backed by your OpenCode subscription, and spend no AutoGPT credits.":
    "aiConnections1.offer.description.opencode",
  "Các cuộc trò chuyện mới sử dụng gói đăng ký OpenCode của bạn và không tốn tín dụng AutoGPT.":
    "aiConnections1.offer.description.opencode",
  "New chats are backed by your AutoGPT plan, and spend AutoGPT credits.":
    "aiConnections1.offer.description.autogpt",
  "Các cuộc trò chuyện mới sử dụng gói AutoGPT của bạn và tiêu dùng tín dụng AutoGPT.":
    "aiConnections1.offer.description.autogpt",
  "New chats are backed by the chat provider configured on this server.":
    "aiConnections1.offer.description.server",
  "Các cuộc trò chuyện mới sử dụng nhà cung cấp trò chuyện được cấu hình trên máy chủ này.":
    "aiConnections1.offer.description.server",

  "A Max plan or higher is required to use ChatGPT.":
    "aiConnections1.offer.lockReason.chatgptMinPlan",
  "Cần gói Max trở lên để sử dụng ChatGPT.":
    "aiConnections1.offer.lockReason.chatgptMinPlan",
  "A Max plan or higher is required for Advanced.":
    "aiConnections1.offer.lockReason.advancedMinPlan",
  "Cần gói Max trở lên để sử dụng mức Nâng cao.":
    "aiConnections1.offer.lockReason.advancedMinPlan",
  "Connect ChatGPT to use this subscription":
    "aiConnections1.offer.lockReason.connectChatgpt",
  "Kết nối ChatGPT để sử dụng gói đăng ký này":
    "aiConnections1.offer.lockReason.connectChatgpt",

  "The workflow builder's chat panel always runs on AutoGPT.":
    "aiConnections1.offer.limitation.builderRunsOnAutogpt",
  "Bảng trò chuyện trong trình dựng quy trình luôn chạy trên AutoGPT.":
    "aiConnections1.offer.limitation.builderRunsOnAutogpt",
  "Microsoft 365 Copilot returns text and does not run AutoGPT tools.":
    "aiConnections1.offer.limitation.microsoftNoTools",
  "Microsoft 365 Copilot chỉ trả về văn bản và không chạy công cụ AutoGPT.":
    "aiConnections1.offer.limitation.microsoftNoTools",
  "Local files are unsupported; use OneDrive or SharePoint links.":
    "aiConnections1.offer.limitation.microsoftNoLocalFiles",
  "Không hỗ trợ tệp cục bộ; hãy dùng liên kết OneDrive hoặc SharePoint.":
    "aiConnections1.offer.limitation.microsoftNoLocalFiles",
  "No chat provider is configured on this server yet.":
    "aiConnections1.offer.limitation.noServerProvider",
  "Máy chủ này chưa được cấu hình nhà cung cấp trò chuyện nào.":
    "aiConnections1.offer.limitation.noServerProvider",
};

const TIER_LABEL_KEYS: Record<string, MessageKey> = {
  Balanced: "chatInput1.picker.tierBalanced",
  "Cân bằng": "chatInput1.picker.tierBalanced",
  Advanced: "chatInput1.picker.tierAdvanced",
  "Nâng cao": "chatInput1.picker.tierAdvanced",
};

export function localizeOfferText(
  text: string | null | undefined,
  locale: Locale = "en",
): string {
  if (!text) return "";
  const key = OFFER_TEXT_KEYS[text];
  return key ? getMessage(locale, key) : text;
}

export function localizeTierLabel(
  label: string | null | undefined,
  locale: Locale = "en",
): string {
  if (!label) return "";
  const key = TIER_LABEL_KEYS[label];
  return key ? getMessage(locale, key) : label;
}

/**
 * "Balanced: Sonnet 5 · Advanced: Opus 5".
 *
 * Empty when the server named no models, so the row omits the line rather
 * than rendering half of one.
 */
export function tierSummary(
  offer: AIConnectionOffer,
  locale: Locale = "en",
): string {
  const named = offer.tiers
    .filter((tier) => tier.display_model)
    .map(
      (tier) =>
        `${localizeTierLabel(tier.label, locale)}: ${tier.display_model}`,
    );
  return named.join(" · ");
}
