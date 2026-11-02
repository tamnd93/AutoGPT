import { ApiError } from "@/lib/autogpt-server-api/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

// "Every Monday at 09:00" reads "every Monday at 09:00" mid-sentence.
export function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

// Why the API won't touch this chat's cadence, read or change.
export function refusalText(
  error: unknown,
  locale: Locale = DEFAULT_LOCALE,
): string | null {
  if (!(error instanceof ApiError)) return null;
  if (error.status === 409)
    return getMessage(locale, "chatStates2.runLessOften.pausedFirst");
  if (error.status === 404)
    return getMessage(locale, "chatStates2.runLessOften.noLongerScheduled");
  return null;
}

// The refusals the API names; anything else is ours.
export function changeErrorText(
  error: unknown,
  locale: Locale = DEFAULT_LOCALE,
): string | null {
  if (error instanceof ApiError && error.status === 400)
    return getMessage(locale, "chatStates2.runLessOften.pickOption");
  return refusalText(error, locale);
}
