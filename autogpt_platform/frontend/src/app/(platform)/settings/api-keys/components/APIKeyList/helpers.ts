import { formatDistanceToNow } from "date-fns";
import { vi as dateFnsVi } from "date-fns/locale";
import type { Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export function maskAPIKey(head: string, tail: string): string {
  return `${head}••••••••${tail}`;
}

export function formatLastUsed(
  lastUsedAt: Date | string | null | undefined,
  locale: Locale = "en",
): string {
  if (!lastUsedAt) return getMessage(locale, "settingsRest1.info.neverUsed");
  const relative = formatDistanceToNow(new Date(lastUsedAt), {
    addSuffix: true,
    locale: locale === "vi" ? dateFnsVi : undefined,
  });
  return getMessage(locale, "settingsRest1.list.used", { relative });
}
