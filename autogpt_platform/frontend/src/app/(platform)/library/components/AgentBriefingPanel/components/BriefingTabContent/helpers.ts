import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import type { AgentStatusFilter } from "@/app/(platform)/library/types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export const MAX_VISIBLE = 6;

const TAB_STATUS_KEY: Record<string, string> = {
  listening: "library4.status.listening",
  scheduled: "library4.status.scheduled",
  idle: "library4.status.idle",
};

export function getAgentStatusLabel(
  tab: string,
  agent: LibraryAgent,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (tab === "scheduled" && agent.next_scheduled_run) {
    const diff = new Date(agent.next_scheduled_run).getTime() - Date.now();
    const minutes = Math.round(diff / 60_000);
    if (minutes <= 0) return getMessage(locale, "library4.status.soon");
    if (minutes < 60)
      return getMessage(locale, "library4.status.minutes", { minutes });
    const hours = Math.round(minutes / 60);
    if (hours < 24)
      return getMessage(locale, "library4.status.hours", { hours });
    const days = Math.round(hours / 24);
    return getMessage(locale, "library4.status.days", { days });
  }
  const key = TAB_STATUS_KEY[tab];
  return key ? getMessage(locale, key) : "";
}

const EMPTY_MESSAGE_KEY: Record<string, string> = {
  running: "library4.emptyMessage.running",
  attention: "library4.emptyMessage.attention",
  completed: "library4.emptyMessage.completed",
  listening: "library4.emptyMessage.listening",
  scheduled: "library4.emptyMessage.scheduled",
  idle: "library4.emptyMessage.idle",
};

export function getEmptyMessage(
  tab: AgentStatusFilter,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const key = EMPTY_MESSAGE_KEY[tab] ?? "library4.emptyMessage.other";
  return getMessage(locale, key);
}
