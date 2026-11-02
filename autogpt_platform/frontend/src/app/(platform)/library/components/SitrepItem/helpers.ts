import { SitrepItemData } from "../../types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export function buildAutoPilotPrompt(
  item: SitrepItemData,
  locale: Locale = DEFAULT_LOCALE,
): string {
  // Embed the exact library agent ID and steer the assistant to resolve it by
  // ID via find_library_agent's agent_id (direct lookup) instead of a fuzzy
  // name search.
  const idHint = getMessage(locale, "library5.prompt.idHint", {
    id: item.agentID,
  });
  const name = item.agentName;
  switch (item.priority) {
    case "error":
      return (
        getMessage(locale, "library5.prompt.error", {
          name,
          message: item.message,
        }) + idHint
      );
    case "running":
      return getMessage(locale, "library5.prompt.running", { name }) + idHint;
    case "stale":
      return getMessage(locale, "library5.prompt.stale", { name }) + idHint;
    case "warning":
      return (
        getMessage(locale, "library5.prompt.warning", {
          name,
          message: item.message,
        }) + idHint
      );
    case "success":
      return getMessage(locale, "library5.prompt.success", { name }) + idHint;
    case "listening":
      return getMessage(locale, "library5.prompt.listening", { name }) + idHint;
    case "scheduled":
      return getMessage(locale, "library5.prompt.scheduled", { name }) + idHint;
    case "idle":
      return getMessage(locale, "library5.prompt.idle", { name }) + idHint;
  }
}
