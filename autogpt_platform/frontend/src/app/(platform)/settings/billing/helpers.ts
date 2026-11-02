import type { Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const SECTION_BASE_DELAY = 0.04;
const SECTION_STAGGER = 0.05;
const SECTION_DURATION = 0.32;
const ROW_DELAY_CHILDREN = 0.08;
const ROW_STAGGER = 0.035;
const ROW_DURATION = 0.28;

export function getSectionMotionProps(index: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return { initial: false as const };
  }
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: SECTION_DURATION,
      ease: EASE_OUT,
      delay: SECTION_BASE_DELAY + index * SECTION_STAGGER,
    },
  };
}

export const rowsContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: ROW_DELAY_CHILDREN,
      staggerChildren: ROW_STAGGER,
    },
  },
};

export const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ROW_DURATION, ease: EASE_OUT },
  },
};

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCents(cents: number): string {
  return CURRENCY_FORMATTER.format(cents / 100);
}

export function formatRelativeReset(
  target: Date | string | undefined | null,
  locale: Locale = "en",
): {
  prefix: string;
  value: string;
} {
  if (!target)
    return { prefix: getMessage(locale, "billing1.helpers.reset"), value: "—" };
  const date = target instanceof Date ? target : new Date(target);
  if (Number.isNaN(date.getTime()))
    return { prefix: getMessage(locale, "billing1.helpers.reset"), value: "—" };
  const diff = date.getTime() - Date.now();
  if (diff <= 0)
    return {
      prefix: getMessage(locale, "billing1.helpers.reset"),
      value: getMessage(locale, "billing1.helpers.soon"),
    };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return {
      prefix: getMessage(locale, "billing1.helpers.resetIn"),
      value: `${hours}h ${minutes}m`,
    };
  }
  return {
    prefix: getMessage(locale, "billing1.helpers.reset"),
    value: date.toLocaleString(locale === "vi" ? "vi-VN" : undefined, {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }),
  };
}

export function formatShortDate(
  value: Date | string | number | undefined | null,
  locale: Locale = "en",
): string {
  if (value === undefined || value === null || value === "") return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(locale === "vi" ? "vi-VN" : undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
