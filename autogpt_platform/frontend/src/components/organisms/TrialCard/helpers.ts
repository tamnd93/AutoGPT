import type { TrialOfferResponse } from "@/app/api/__generated__/models/trialOfferResponse";
import type { Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";


export const trialPlanLabels: Record<TrialOfferResponse["tier"], string> = {
  BASIC: "Basic",
  PRO: "Pro",
  MAX: "Max",
  BUSINESS: "Team",
};

// "Subscribe now" lands on billing with this marker, which opens the trial
// plan's own confirmation there instead of leaving the person to find it.
export const SUBSCRIBE_NOW_PARAM = "subscribe";
export const SUBSCRIBE_NOW_VALUE = "trial-plan";
export const BILLING_PATH = "/settings/billing";

export function formatTrialPrice(
  offer: TrialOfferResponse,
  locale: Locale = "en",
) {
  const amount = currencyFormatter(offer.currency).format(
    getTrialChargeAmount(offer),
  );
  return `${amount} / ${cadenceLabel(offer, locale)}`;
}

// The cancel-pending screens drop the cents of a whole price ("$50 / month")
// and keep them otherwise ("$19.99 / month").
export function formatPlanPrice(
  offer: TrialOfferResponse,
  locale: Locale = "en",
) {
  return `${formatPlanAmount(offer)} / ${cadenceLabel(offer, locale)}`;
}

export function formatPlanAmount(offer: TrialOfferResponse) {
  return formatWholeMoney(getTrialChargeAmount(offer), offer.currency);
}

export function formatWholeMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    trailingZeroDisplay: "stripIfInteger",
  }).format(amount);
}

function cadenceLabel(offer: TrialOfferResponse, locale: Locale) {
  return getMessage(
    locale,
    offer.billing_cycle === "yearly"
      ? "billing3.trial.cadence.year"
      : "billing3.trial.cadence.month",
  );
}

// What Stripe charges per billing cycle once the trial ends, in major units.
// Zero-decimal currencies (JPY) carry no minor unit.
export function getTrialChargeAmount(offer: TrialOfferResponse) {
  const decimals =
    currencyFormatter(offer.currency).resolvedOptions().maximumFractionDigits ??
    2;
  return offer.unit_amount / 10 ** decimals;
}

function currencyFormatter(currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency });
}

export function formatTrialEnd(
  value: Date | string | null | undefined,
  locale: Locale = "en",
) {
  if (!value) return getMessage(locale, "billing3.trial.endFallback");
  return new Date(value).toLocaleString(locale === "vi" ? "vi-VN" : undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatTrialEndDate(
  value: Date | string,
  locale: Locale = "en",
) {
  return new Date(value).toLocaleDateString(
    locale === "vi" ? "vi-VN" : undefined,
    {
      month: "short",
      day: "numeric",
    },
  );
}

export function formatTrialEndTime(value: Date | string, locale: Locale = "en") {
  return new Date(value).toLocaleTimeString(
    locale === "vi" ? "vi-VN" : undefined,
    { timeStyle: "short" },
  );
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function getTrialDaysLeft(
  endsAt: Date | string | null | undefined,
  now = Date.now(),
) {
  if (!endsAt) return 0;
  return Math.max(0, Math.ceil((new Date(endsAt).getTime() - now) / DAY_MS));
}

export function formatTrialDays(days: number, locale: Locale = "en") {
  return getMessage(
    locale,
    days === 1 ? "billing3.trial.dayOne" : "billing3.trial.dayMany",
    { count: days },
  );
}

// Under a day the count would always read "1 day", so name the clock time,
// but only for today or tomorrow: a DST day can put an end under 24 hours
// away two dates out, and that keeps the dated form.
export function describeTrialTimeLeft(
  endsAt: Date | string,
  now = new Date(),
  locale: Locale = "en",
) {
  const end = new Date(endsAt);
  const left = end.getTime() - now.getTime();
  if (left <= 0) return { kind: "ended" as const };
  const day = left < DAY_MS ? getNearDay(end, now) : null;
  if (day) return { kind: day, time: formatTrialEndTime(end, locale) };
  return {
    kind: "days" as const,
    days: getTrialDaysLeft(end, now.getTime()),
  };
}

function getNearDay(end: Date, now: Date) {
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (end.toDateString() === now.toDateString()) return "today" as const;
  if (end.toDateString() === tomorrow.toDateString())
    return "tomorrow" as const;
  return null;
}
