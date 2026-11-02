"use client";

import {
  ArrowRight02Icon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { formatOfferPrice } from "@/services/usageExperience/helpers";

interface Props {
  tier: "PRO" | "MAX";
  price?: number;
  currency?: string;
  cycle?: "monthly" | "yearly";
  usageMultiplier?: number;
  storageMultiplier?: number;
  freshUsage?: boolean;
  actionLabel?: string;
  onUpgrade: () => void;
  disabled?: boolean;
}

export function PlanOffer({
  tier,
  price,
  currency = "USD",
  cycle = "monthly",
  usageMultiplier,
  storageMultiplier,
  freshUsage = false,
  actionLabel,
  onUpgrade,
  disabled = false,
}: Props) {
  const t = useT();
  const name = tier === "PRO" ? "Pro" : "Max";
  const amount = formatOfferPrice(price, currency);
  const cycleWord =
    cycle === "yearly"
      ? t("billing4.planOffer.cycleYearly")
      : t("billing4.planOffer.cycleMonthly");
  const features =
    tier === "PRO"
      ? [
          t(
            freshUsage
              ? "billing4.planOffer.proFreshBenefit1"
              : "billing4.planOffer.proBenefit1",
          ),
          t(
            freshUsage
              ? "billing4.planOffer.proFreshBenefit2"
              : "billing4.planOffer.proBenefit2",
          ),
        ]
      : [
          usageMultiplier
            ? t("billing4.planOffer.timesUsage", { count: usageMultiplier })
            : t("billing4.planOffer.maxUsageFallback"),
          storageMultiplier
            ? t("billing4.planOffer.timesStorage", { count: storageMultiplier })
            : t("billing4.planOffer.maxStorageFallback"),
          t("billing4.planOffer.prioritySupport"),
        ];
  return (
    <section
      aria-label={t("billing4.planOffer.aria", { name })}
      data-slot="plan-offer"
      // TODO(tokens): no role for the purple-200 border or the purple-50 to
      // blue-50 gradient.
      className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-5 sm:p-6"
    >
      <div
        data-slot="plan-offer-header"
        className="mb-5 flex items-start justify-between gap-3"
      >
        <div
          data-slot="plan-offer-identity"
          className="flex min-w-0 items-center gap-3"
        >
          <span
            data-slot="plan-offer-icon"
            // TODO(tokens): no role for the purple-200 border or purple-600
            // icon.
            className="hidden size-10 shrink-0 items-center justify-center rounded-xl border border-purple-200 bg-surface text-purple-600 min-[360px]:flex"
          >
            <Icon icon={SparklesIcon} size={20} />
          </span>
          <div data-slot="plan-offer-heading">
            <Text variant="h4" className="!text-xl">
              {name}
            </Text>
            <Text variant="small" tone="muted">
              {t("billing4.planOffer.billed", { cycle: cycleWord })}
            </Text>
          </div>
        </div>
        {amount && (
          <div data-slot="plan-offer-price" className="shrink-0 text-right">
            <Text variant="h4" className="!text-2xl">
              {amount}
            </Text>
            <Text variant="small" tone="muted">
              {t(
                cycle === "yearly"
                  ? "billing4.planOffer.perYearTax"
                  : "billing4.planOffer.perMonthTax",
              )}
            </Text>
          </div>
        )}
      </div>
      <ul data-slot="plan-offer-features" className="mb-5 space-y-2.5">
        {features.map((feature) => (
          <li
            key={feature}
            data-slot="plan-offer-feature"
            className="flex gap-2.5 text-sm leading-5 text-foreground-body"
          >
            <Icon
              icon={Tick02Icon}
              size={16}
              // TODO(tokens): no role for the purple-600 icon; brand-hover is a
              // hover fill.
              className="mt-0.5 shrink-0 text-purple-600"
            />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className="w-full"
        onClick={onUpgrade}
        disabled={disabled}
        rightIcon={<Icon icon={ArrowRight02Icon} size={16} />}
      >
        {actionLabel ??
          (tier === "MAX"
            ? t("billing4.offer.upgradeMax")
            : freshUsage
              ? amount
                ? t("billing4.offer.startProNowAmount", { amount })
                : t("billing4.offer.startProNow")
              : t("billing4.offer.startPro"))}
      </Button>
      <Text variant="small" tone="muted" className="mt-3 text-center !text-xs">
        {freshUsage
          ? t("billing4.planOffer.footnoteFresh")
          : tier === "MAX"
            ? t("billing4.planOffer.footnoteMax")
            : t("billing4.planOffer.footnotePro")}
      </Text>
    </section>
  );
}
