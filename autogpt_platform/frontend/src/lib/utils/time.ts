import type { Locale } from "../i18n/locale";
import { getMessage } from "../i18n/translate";

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

export function formatTimeAgo(dateStr: string, locale: Locale = "en"): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / MILLISECONDS_PER_MINUTE);

  if (diffMins < 1) return getMessage(locale, "format.justNow");
  if (diffMins < SECONDS_PER_MINUTE) {
    return getMessage(locale, "format.minutesAgo", { count: diffMins });
  }
  const diffHours = Math.floor(diffMins / MINUTES_PER_HOUR);
  if (diffHours < HOURS_PER_DAY) {
    return getMessage(locale, "format.hoursAgo", { count: diffHours });
  }
  const diffDays = Math.floor(diffHours / HOURS_PER_DAY);
  return getMessage(locale, "format.daysAgo", { count: diffDays });
}

export function formatDate(date: Date, locale: Locale = "en") {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
