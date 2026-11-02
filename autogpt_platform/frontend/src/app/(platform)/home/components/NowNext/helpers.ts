import type { Locale } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage, type MessageValues } from "@/lib/i18n/translate";
import { intlLocale } from "../../helpers";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function translate(
  locale: Locale | undefined,
  key: MessageKey,
  values?: MessageValues,
) {
  return getMessage(locale ?? "en", key, values);
}

export function formatUntil(
  nextRunTime: Date,
  now = new Date(),
  locale?: Locale,
) {
  const runAt = new Date(nextRunTime);
  const diffMs = runAt.getTime() - now.getTime();
  if (Number.isNaN(runAt.getTime())) return "";
  if (diffMs <= 60_000) return translate(locale, "home2.now.next");
  if (diffMs < DAY_MS) {
    const totalMinutes = Math.round(diffMs / 60_000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0)
      return translate(locale, "home2.now.inMinutes", { count: minutes });
    return minutes > 0
      ? translate(locale, "home2.now.inHoursMinutes", { hours, minutes })
      : translate(locale, "home2.now.inHours", { hours });
  }
  return runAt.toLocaleString(intlLocale(locale), {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatRunningFor(
  startedAt: Date | null | undefined,
  now = new Date(),
  locale?: Locale,
) {
  if (!startedAt) return null;
  const started = new Date(startedAt);
  if (Number.isNaN(started.valueOf())) return null;
  const totalMinutes = Math.floor((now.getTime() - started.getTime()) / 60_000);
  if (totalMinutes < 1) return translate(locale, "home2.run.forLessThanMinute");
  if (totalMinutes < 60)
    return translate(locale, "home2.run.forMinutes", { count: totalMinutes });
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0
    ? translate(locale, "home2.run.forHoursMinutes", { hours, minutes })
    : translate(locale, "home2.run.forHours", { hours });
}
