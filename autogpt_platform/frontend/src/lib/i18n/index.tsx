"use client";

import { createContext, useContext, type ReactNode } from "react";

import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./locale";
import { en, type MessageKey } from "./messages/en";
import { vi } from "./messages/vi";

export { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "./locale";
export type { Locale } from "./locale";
export type { MessageKey } from "./messages/en";

export function getMessage(locale: Locale, key: string): string {
  if (locale === "vi") {
    const translated = vi[key as MessageKey];
    if (translated) return translated;
  }
  return Object.prototype.hasOwnProperty.call(en, key)
    ? en[key as MessageKey]
    : key;
}

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useT() {
  const locale = useLocale();
  return (key: MessageKey) => getMessage(locale, key);
}

export function writeLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}
