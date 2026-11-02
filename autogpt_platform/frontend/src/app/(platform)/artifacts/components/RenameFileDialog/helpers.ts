import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export const MAX_FILE_NAME_LENGTH = 255;

export function validateFileName(
  name: string,
  locale: Locale = DEFAULT_LOCALE,
): string | null {
  if (name.length === 0) {
    return getMessage(locale, "artifacts3.rename.errorEmpty");
  }
  if (name.length > MAX_FILE_NAME_LENGTH) {
    return getMessage(locale, "artifacts3.rename.errorTooLong");
  }
  if (name === "." || name === "..") {
    return getMessage(locale, "artifacts3.rename.errorInvalid");
  }
  if (name.includes("/") || name.includes("\\")) {
    return getMessage(locale, "artifacts3.rename.errorSlashes");
  }
  return null;
}
