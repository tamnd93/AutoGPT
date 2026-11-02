import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export function aboutPlaceholderFor(
  name: string | null,
  locale: Locale = DEFAULT_LOCALE,
) {
  const trimmed = name?.trim();
  if (!trimmed) return getMessage(locale, "team1.about.placeholder");
  return getMessage(locale, "team1.about.placeholderNamed", { name: trimmed });
}
