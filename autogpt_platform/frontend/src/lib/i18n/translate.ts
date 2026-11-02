import type { Locale } from "./locale";
import { en } from "./messages/en";
import { vi } from "./messages/vi";

export type MessageValues = Record<string, string | number>;

function lookup(locale: Locale, key: string): string {
  if (locale === "vi") {
    const translated = vi[key as keyof typeof vi];
    if (translated) return translated;
  }
  return Object.prototype.hasOwnProperty.call(en, key)
    ? en[key as keyof typeof en]
    : key;
}

export function getMessage(
  locale: Locale,
  key: string,
  values?: MessageValues,
): string {
  const template = lookup(locale, key);
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(values, name)
      ? String(values[name])
      : match,
  );
}
