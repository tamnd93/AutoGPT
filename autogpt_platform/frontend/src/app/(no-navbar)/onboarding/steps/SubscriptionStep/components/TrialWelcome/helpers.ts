import type { TrialOfferResponse } from "@/app/api/__generated__/models/trialOfferResponse";
import { formatPlanAmount } from "@/components/organisms/TrialCard/helpers";
import type { Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import {
  Calendar03Icon,
  Mail01Icon,
  SquareUnlock02Icon,
} from "@hugeicons/core-free-icons";
import type { Milestone } from "../Timeline";

const DAY_MS = 24 * 60 * 60 * 1000;

type Language = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Language = (key, values) => getMessage("en", key, values);

// Stripe sends `customer.subscription.trial_will_end` three days before the
// trial ends, and the trial reminder email goes out on it.
export const REMINDER_DAYS_BEFORE_CHARGE = 3;

export function getTrialMilestones(
  offer: TrialOfferResponse,
  now = new Date(),
  t: Language = english,
  locale: Locale = "en",
): Milestone[] {
  const chargeDate = new Date(now.getTime() + offer.duration_days * DAY_MS);
  const reminderDate = new Date(
    chargeDate.getTime() - REMINDER_DAYS_BEFORE_CHARGE * DAY_MS,
  );
  // A trial this short gets its reminder as soon as it starts.
  const remindsToday = reminderDate <= now;
  // Stripe charges at the exact moment the trial ends, so the safe date to
  // promise is the day before. Step back a calendar day, not 24 hours, so a
  // daylight-saving change can't land it on the charge day itself.
  const lastFreeDay = new Date(chargeDate);
  lastFreeDay.setDate(lastFreeDay.getDate() - 1);
  const amount = formatPlanAmount(offer);
  const today = t("onboarding2.milestone.today");
  return [
    {
      key: "today",
      icon: SquareUnlock02Icon,
      when: today,
      title: t("onboarding2.trial.today.title"),
      detail: t("onboarding2.trial.today.detail"),
    },
    {
      key: "reminder",
      icon: Mail01Icon,
      when: remindsToday ? today : formatDay(reminderDate, locale),
      date: remindsToday ? undefined : reminderDate,
      title: t("onboarding2.trial.reminder.title"),
      detail: remindsToday
        ? t("onboarding2.trial.reminder.detailToday")
        : t("onboarding2.trial.reminder.detailDays", {
            days: REMINDER_DAYS_BEFORE_CHARGE,
          }),
    },
    {
      key: "charge",
      icon: Calendar03Icon,
      when: formatDay(chargeDate, locale),
      date: chargeDate,
      title: t("onboarding2.trial.charge.title", { amount }),
      detail: t("onboarding2.trial.charge.detail", {
        price: formatCadencePrice(offer, t),
        date: formatDay(lastFreeDay, locale),
      }),
    },
  ];
}

export function formatCadencePrice(
  offer: TrialOfferResponse,
  t: Language = english,
) {
  const cadence = t(
    offer.billing_cycle === "yearly"
      ? "onboarding2.billing.year"
      : "onboarding2.billing.month",
  );
  return t("onboarding2.trial.cadence", {
    amount: formatPlanAmount(offer),
    cadence,
  });
}

export function formatDay(date: Date, locale: Locale = "en") {
  return date.toLocaleDateString(locale === "vi" ? "vi-VN" : undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// The Experts named beside Otto; the rest are counted, to match the avatars.
export const MAX_NAMED_EXPERTS = 3;

export function formatReadyLine(
  names: string[],
  t: Language = english,
  locale: Locale = "en",
) {
  const named = names.slice(0, MAX_NAMED_EXPERTS);
  const others = names.length - named.length;
  const everyone = [
    "Otto",
    ...named,
    ...(others > 0 ? [t("onboarding2.readyLine.more", { count: others })] : []),
  ];
  const list = new Intl.ListFormat(locale === "vi" ? "vi" : "en", {
    style: "long",
    type: "conjunction",
  }).format(everyone);
  return t(
    everyone.length === 1
      ? "onboarding2.readyLine.one"
      : "onboarding2.readyLine.other",
    { list },
  );
}
