import type { Expert } from "@/app/api/__generated__/models/expert";
import { formatDistanceToNow } from "date-fns";
import { vi as dateFnsVi } from "date-fns/locale";
import type { Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

export const RECENT_FACTS_LIMIT = 6;

export const AUTOPILOT_SCOPE = "autopilot";

export const MEMORY_CHAT_PROMPTS = {
  summary: "Give me a summary of everything you know about me",
  forget:
    "I'd like you to forget something from your memory. Ask me what to " +
    "forget, search your memory for matching facts, show me what you find, " +
    "and only delete after I confirm.",
} as const;

export type MemoryChatSeed = keyof typeof MEMORY_CHAT_PROMPTS;

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

export function getActiveExperts(experts: Expert[] | undefined) {
  return (experts ?? []).filter((expert) => !expert.is_archived);
}

export function getScopeName(
  scopeExpertID: string | null,
  experts: Expert[] | undefined,
  t: Translate = english,
) {
  if (!scopeExpertID) return "Otto";
  const expert = experts?.find((e) => e.id === scopeExpertID);
  return expert?.name ?? t("settingsRest3.scope.fallback");
}

/** Panel identity for a learning record: the Expert, or the personal scope. */
export function learningSheetScope(
  expertId: string | null,
  experts: Expert[] | undefined,
) {
  const expert = expertId
    ? experts?.find((candidate) => candidate.id === expertId)
    : undefined;
  return {
    expertId: expert ? expert.id : null,
    name: expert ? expert.name : "Otto",
    avatarUrl: expert ? expert.avatar_url : null,
    color: expert ? expert.color : null,
  };
}

export function formatWhen(
  createdAt: string | null | undefined,
  locale: Locale = "en",
) {
  if (!createdAt) return "";
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) return "";
  return formatDistanceToNow(parsed, {
    addSuffix: true,
    locale: locale === "vi" ? dateFnsVi : undefined,
  });
}

/** The Soul drawer links here with ?expert=<id>. An id the caller no longer
 *  owns is left to the page's active-expert fallback rather than checked here. */
export function readExpertScopeFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("expert") || null;
}
