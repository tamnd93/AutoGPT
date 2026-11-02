"use client";

import {
  getFeaturedUsagePercent,
  getUsageStatus,
} from "@/services/usageExperience/helpers";
import { useUsageExperience } from "@/services/usageExperience/useUsageExperience";
import { useLocale, useT } from "@/lib/i18n";
import { formatRelativeReset, formatShortDate } from "../../../helpers";

export interface UsageWindowView {
  label: string;
  percent: number;
  prefix: string;
  value: string;
}

export function useAutopilotUsageCard() {
  const t = useT();
  const locale = useLocale();
  const { experience, usage, trial, isLoading, isError, retry } =
    useUsageExperience();
  const today: UsageWindowView | null = usage?.daily
    ? {
        label: t("billing1.apUsage.today"),
        percent: usage.daily.percent_used,
        ...formatRelativeReset(usage.daily.resets_at, locale),
      }
    : null;
  const week: UsageWindowView | null = usage?.weekly
    ? {
        label: t("billing1.apUsage.thisWeek"),
        percent: usage.weekly.percent_used,
        ...formatRelativeReset(usage.weekly.resets_at, locale),
      }
    : null;
  const showTrialWindow =
    experience.isLifetimeTrial ||
    (experience.isActiveTrial && experience.window === "trial");
  const trialWindow: UsageWindowView | null =
    showTrialWindow && experience.trialPercent != null
      ? {
          label: t("billing1.apUsage.trialUsage"),
          percent: experience.trialPercent,
          prefix: t("billing1.apUsage.trialEnds"),
          value: formatShortDate(trial?.ends_at, locale),
        }
      : null;
  const featured = showTrialWindow
    ? trialWindow
    : experience.window === "weekly" || !today
      ? week
      : today;
  const secondary = showTrialWindow ? null : featured === week ? today : week;
  const statusKey =
    USAGE_STATUS_KEYS[
      getUsageStatus(getFeaturedUsagePercent(experience, usage))
    ];
  const status = { ...statusKey, label: t(statusKey.labelKey) };
  return {
    status,
    featured,
    secondary,
    today,
    week,
    isLoading,
    isError,
    retry,
    isTrial: experience.isActiveTrial,
    lifetime: experience.isLifetimeTrial,
    blocked: experience.blocked,
    inactive: experience.tier === "NO_TIER",
    hasUsage: Boolean(featured || secondary),
    unlimited: Boolean(
      usage &&
        !experience.isActiveTrial &&
        usage.daily === null &&
        usage.weekly === null,
    ),
  };
}

const USAGE_STATUS_KEYS = {
  reached: {
    labelKey: "billing1.apUsage.reached",
    className: "text-orange-700",
  },
  low: {
    labelKey: "billing1.apUsage.low",
    className: "text-warning-foreground",
  },
  plenty: {
    labelKey: "billing1.apUsage.plenty",
    className: "text-foreground-tertiary",
  },
} as const;
