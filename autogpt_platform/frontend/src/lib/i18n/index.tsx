"use client";

import { createContext, useContext, type ReactNode } from "react";

import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./locale";
import type { MessageKey } from "./messages/en";
import { getMessage, type MessageValues } from "./translate";

export { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "./locale";
export type { Locale } from "./locale";
export type { MessageKey } from "./messages/en";
export { getMessage } from "./translate";
export type { MessageValues } from "./translate";

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
  return (key: MessageKey, values?: MessageValues) =>
    getMessage(locale, key, values);
}

export function writeLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}
