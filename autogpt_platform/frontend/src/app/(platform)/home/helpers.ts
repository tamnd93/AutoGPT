import type { HomeDashboardResponse } from "@/app/api/__generated__/models/homeDashboardResponse";
import type { Locale } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage, type MessageValues } from "@/lib/i18n/translate";

function translate(
  locale: Locale | undefined,
  key: MessageKey,
  values?: MessageValues,
) {
  return getMessage(locale ?? "en", key, values);
}

/** English keeps the Intl default, Vietnamese gets its own calendar words. */
export function intlLocale(locale: Locale | undefined) {
  return locale === "vi" ? "vi" : undefined;
}

export function getTimeOfDayGreeting(hour = new Date().getHours()) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function getHomeStatusLine(
  dashboard: HomeDashboardResponse,
  locale?: Locale,
): string {
  const attention = dashboard.attention.length;
  const active = dashboard.active_tasks.length;
  if (attention > 0 && active > 0) {
    const decisions =
      attention === 1
        ? translate(locale, "home2.status.decisionWaitingOne")
        : translate(locale, "home2.status.decisionsWaiting", {
            count: attention,
          });
    const workflows =
      active === 1
        ? translate(locale, "home2.status.workflowRunningOne")
        : translate(locale, "home2.status.workflowsRunning", { count: active });
    return `${decisions} · ${workflows}`;
  }
  if (attention > 0) {
    return attention === 1
      ? translate(locale, "home2.status.decisionNeedsOne")
      : translate(locale, "home2.status.decisionsNeed", { count: attention });
  }
  if (active > 0) {
    return active === 1
      ? translate(locale, "home2.status.allClearOne")
      : translate(locale, "home2.status.allClearMany", { count: active });
  }
  return translate(locale, "home2.status.nothing");
}

export function formatHeaderDate(
  value: Date,
  timeZone: string,
  locale?: string,
) {
  const date = new Date(value);
  const options = { timeZone };

  return {
    weekday: new Intl.DateTimeFormat(locale, {
      ...options,
      weekday: "long",
    }).format(date),
    calendarDate: new Intl.DateTimeFormat(locale, {
      ...options,
      month: "long",
      day: "numeric",
    }).format(date),
  };
}

export function formatDuration(totalSeconds: number): string {
  const totalMinutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

// Null rather than "$0.00 this week" so a brand-new or idle expert reads as
// having no spend line at all instead of an explicit zero.
export function formatWeeklySpend(
  cents: number | undefined,
  locale?: Locale,
): string | null {
  if (!cents || cents <= 0) return null;
  return translate(locale, "home2.week.spend", {
    amount: formatCurrency(cents),
  });
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
