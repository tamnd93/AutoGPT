"use client";

import { BillingPlanOffer } from "./BillingPlanOffer";
import { SupportOffer } from "./SupportOffer";
import { useProActivation } from "@/services/pro-activation/useProActivation";
import { useUsageExperience } from "@/services/usageExperience/useUsageExperience";
import {
  formatOfferPrice,
  formatTrialStartDescription,
  formatTrialStartTitle,
  getFeaturedUsagePercent,
  getUsageStatus,
} from "@/services/usageExperience/helpers";
import { useLocale, useT } from "@/lib/i18n";
import { formatCents } from "../../helpers";
import {
  ENTERPRISE_CONTACT_URL,
  TEAM_UPGRADE_URL,
  useYourPlanCard,
} from "./YourPlanCard/useYourPlanCard";

interface Props {
  controller?: ReturnType<typeof useYourPlanCard>;
}

export function BillingOffer({ controller }: Props) {
  const t = useT();
  const locale = useLocale();
  const { experience, trial, subscription, usage } = useUsageExperience();
  const activation = useProActivation();
  const isTrial = experience.isActiveTrial;
  const target = isTrial
    ? trial?.offer?.tier === "PRO"
      ? "Pro"
      : null
    : controller?.plan?.nextTierLabel;
  const canUpgrade = isTrial
    ? target === "Pro"
    : controller?.canUpgrade && !controller.plan?.nextTierIsTeamLink;
  if (activation.isReady && experience.tier === "PRO")
    return (
      <SupportOffer
        eyebrow={t("billing2.offer.proEyebrow")}
        title={t("billing2.offer.proTitle")}
        description={t("billing2.offer.proBody")}
        label={t("billing2.offer.backToWork")}
        href="/copilot"
        ready
      />
    );
  if (!canUpgrade || !target)
    return (
      <SupportOffer
        eyebrow={t("billing2.offer.planEyebrow")}
        title={t("billing2.offer.capacityTitle")}
        description={
          experience.tier === "ENTERPRISE"
            ? t("billing2.offer.capacityEnterprise")
            : t("billing2.offer.capacityDefault")
        }
        label={
          experience.tier === "ENTERPRISE"
            ? t("billing2.offer.contactAccountTeam")
            : t("billing2.offer.contactUs")
        }
        href={
          experience.tier === "MAX" ? TEAM_UPGRADE_URL : ENTERPRISE_CONTACT_URL
        }
      />
    );
  const price =
    isTrial && trial?.offer
      ? `${formatOfferPrice(trial.offer.unit_amount, trial.offer.currency)} / ${
          trial.offer.billing_cycle === "yearly"
            ? t("billing2.offer.perYear")
            : t("billing2.offer.perMonth")
        }`
      : controller?.offerPriceCents !== undefined
        ? `${formatCents(controller.offerPriceCents)} / ${
            controller.plan?.billingCycle === "yearly"
              ? t("billing2.offer.perYear")
              : t("billing2.offer.perMonth")
          }`
        : null;
  const multipliers = subscription?.tier_multipliers;
  const multiplier =
    multipliers?.MAX && multipliers?.PRO
      ? Math.round((multipliers.MAX / multipliers.PRO) * 10) / 10
      : null;
  const benefits = isTrial
    ? [t("billing2.offer.trialBenefit1"), t("billing2.offer.trialBenefit2")]
    : target === "Max"
      ? [
          multiplier
            ? `${multiplier}× the usage of Pro`
            : t("billing2.offer.maxBenefit1"),
          t("billing2.offer.maxBenefit2"),
        ]
      : [t("billing2.offer.proBenefit1"), t("billing2.offer.proBenefit2")];
  const quiet =
    isTrial &&
    getUsageStatus(getFeaturedUsagePercent(experience, usage)) === "plenty";
  const title = quiet
    ? formatTrialStartTitle(experience.trialEndsAt, locale)
    : isTrial
      ? t("billing2.offer.startProNow")
      : t(
          experience.tier === "NO_TIER"
            ? "billing2.offer.startTier"
            : "billing2.offer.upgradeToTier",
          { tier: target },
        );
  return (
    <BillingPlanOffer
      target={target}
      title={title}
      quiet={quiet}
      description={
        isTrial && experience.freshProUsage
          ? quiet
            ? t("billing2.offer.trialQuietBody")
            : formatTrialStartDescription(experience.trialEndsAt, locale)
          : undefined
      }
      price={price}
      benefits={benefits}
      actionLabel={
        quiet
          ? t("billing2.offer.startProNow")
          : isTrial && price
            ? t("billing2.offer.actionWithPrice", {
                title,
                price: price.split(" / ")[0],
              })
            : title
      }
      onAction={
        isTrial
          ? () => activation.start("/settings/billing")
          : controller?.onUpgrade
      }
      disabled={
        isTrial
          ? activation.isBusy
          : controller?.isUpdatingTier || controller?.isRedirecting
      }
      caption={
        isTrial
          ? t("billing2.offer.trialCaption")
          : target === "Max"
            ? t("billing2.offer.maxCaption")
            : t("billing2.offer.defaultCaption")
      }
    />
  );
}
