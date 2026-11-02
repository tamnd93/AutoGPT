import { safeHumanizeCronExpression } from "@/lib/cron-expression-utils";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

// The humanizer falls back to "Scheduled" or "Cron Expression: …", neither of
// which reads after "Runs".
export function getCadenceLabel(cron: string, locale: Locale = DEFAULT_LOCALE) {
  const phrase = safeHumanizeCronExpression(cron);
  if (!/^(Every|On day)\b/.test(phrase))
    return getMessage(locale, "marketplace2.expert.cadenceSchedule");
  return getMessage(locale, "marketplace2.expert.cadenceRuns", {
    phrase: `${phrase.charAt(0).toLowerCase()}${phrase.slice(1)}`,
  });
}
