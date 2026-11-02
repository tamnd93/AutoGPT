import type { Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import {
  Calendar03Icon,
  Settings02Icon,
  SquareUnlock02Icon,
} from "@hugeicons/core-free-icons";
import type { Milestone } from "./Timeline";
import { formatDay } from "./TrialWelcome/helpers";

type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

interface Args {
  price: string;
  cadence: "month" | "year";
  now?: Date;
  t?: Translate;
  locale?: Locale;
}

export function getPaidMilestones({
  price,
  cadence,
  now = new Date(),
  t = english,
  locale = "en",
}: Args): Milestone[] {
  const renews = getRenewalDate(now, cadence);
  const cadenceWord = t(
    cadence === "year"
      ? "onboarding2.billing.year"
      : "onboarding2.billing.month",
  );
  return [
    {
      key: "today",
      icon: SquareUnlock02Icon,
      when: t("onboarding2.milestone.today"),
      title: t("onboarding2.paid.today.title", { price }),
      detail: t("onboarding2.paid.today.detail"),
    },
    {
      key: "renew",
      icon: Calendar03Icon,
      when: formatDay(renews, locale),
      date: renews,
      title: t("onboarding2.paid.renew.title"),
      detail: t("onboarding2.paid.renew.detail", {
        price,
        cadence: cadenceWord,
      }),
    },
    {
      key: "cancel",
      icon: Settings02Icon,
      when: t("onboarding2.milestone.anyTime"),
      title: t("onboarding2.paid.cancel.title"),
      detail: t("onboarding2.paid.cancel.detail"),
    },
  ];
}

// Stripe renews on the same day of the next period, or on its last day when
// that month is shorter (31 Jan renews on 28 Feb, 29 Feb on 28 Feb).
export function getRenewalDate(now: Date, cadence: "month" | "year") {
  const months = cadence === "year" ? 12 : 1;
  const target = new Date(now.getFullYear(), now.getMonth() + months, 1);
  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
  ).getDate();
  target.setDate(Math.min(now.getDate(), lastDay));
  target.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
  return target;
}
