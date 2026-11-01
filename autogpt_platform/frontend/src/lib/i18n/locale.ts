export type Locale = "en" | "vi";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "agpt_locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "vi";
}
