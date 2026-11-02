import type { SubscriptionStatusResponse } from "@/app/api/__generated__/models/subscriptionStatusResponse";
import type { SubscriptionTierRequest } from "@/app/api/__generated__/models/subscriptionTierRequest";
import type { TrialOfferResponse } from "@/app/api/__generated__/models/trialOfferResponse";
import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import {
  formatPlanAmount,
  formatWholeMoney,
  trialPlanLabels,
} from "@/components/organisms/TrialCard/helpers";

import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import { getCheckoutReturnURLs } from "../helpers";

type PlanTier = TrialOfferResponse["tier"];

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

// Team (BUSINESS) is contact-sales, so it is never offered as a self-serve
// step up from a trial.
const SELF_SERVE_TIERS: readonly PlanTier[] = ["PRO", "MAX"];

export interface PlanChoiceDetails {
  tier: PlanTier;
  label: string;
  amount: string;
  cadence: "month" | "year";
  description: string;
}

export function getCancelPendingOffer(trial: TrialStatusResponse | undefined) {
  if (!trial?.offer || !trial.active || trial.converted) return null;
  return trial.cancel_at_period_end ? trial.offer : null;
}

export function getOwnPlanChoice(
  offer: TrialOfferResponse,
  t: Translate = english,
): PlanChoiceDetails {
  return {
    tier: offer.tier,
    label: trialPlanLabels[offer.tier],
    amount: formatPlanAmount(offer),
    cadence: getCadence(offer),
    description: t("billing2.trialChoices.ownDescription"),
  };
}

export function getUpgradePlanChoice(
  offer: TrialOfferResponse,
  subscription: SubscriptionStatusResponse,
  t: Translate = english,
): PlanChoiceDetails | null {
  const tier = getNextSelfServeTier(offer.tier);
  if (!tier) return null;
  const costs =
    offer.billing_cycle === "yearly"
      ? subscription.tier_costs_yearly
      : subscription.tier_costs;
  const cents = costs?.[tier];
  // The backend sends 0 when the price is unknown or has no such cycle.
  if (!cents) return null;
  return {
    tier,
    label: trialPlanLabels[tier],
    amount: formatWholeMoney(cents / 100, "usd"),
    cadence: getCadence(offer),
    description: describeUpgrade(
      offer.tier,
      tier,
      subscription.tier_multipliers,
      t,
    ),
  };
}

export function formatChoicePrice(
  plan: PlanChoiceDetails,
  t: Translate = english,
) {
  return `${plan.amount} / ${
    plan.cadence === "year"
      ? t("billing2.offer.perYear")
      : t("billing2.offer.perMonth")
  }`;
}

export function findPlanChoice(
  plans: (PlanChoiceDetails | null)[],
  tier: PlanChoiceDetails["tier"],
) {
  return plans.find((plan) => plan?.tier === tier) ?? null;
}

// The plan only counts as started once the server reports it: a charge the
// reconcile hasn't recorded yet still reads as the trial.
export function describePlanResult(
  plan: PlanChoiceDetails,
  tier: SubscriptionStatusResponse["tier"] | undefined,
  t: Translate = english,
) {
  if (tier === plan.tier)
    return {
      title: t("billing2.trialChoices.onPlan", { name: plan.label }),
      description: t("billing2.trialChoices.planStartsToday"),
    };
  return {
    title: t("billing2.trialChoices.paymentReceived"),
    description: t("billing2.trialChoices.settingUp"),
  };
}

export function buildPlanRequest(
  plan: PlanChoiceDetails,
  cycle: TrialOfferResponse["billing_cycle"],
): SubscriptionTierRequest {
  const { successURL, cancelURL } = getCheckoutReturnURLs({
    tier: plan.tier,
    cycle,
  });
  return {
    tier: plan.tier,
    billing_cycle: cycle,
    success_url: successURL,
    cancel_url: cancelURL,
    surface: "billing",
  };
}

function getNextSelfServeTier(tier: PlanTier) {
  const index = SELF_SERVE_TIERS.indexOf(tier);
  if (index === -1) return null;
  return SELF_SERVE_TIERS[index + 1] ?? null;
}

function describeUpgrade(
  own: PlanTier,
  upgrade: PlanTier,
  multipliers: Record<string, number> | undefined,
  t: Translate,
) {
  const ownLabel = trialPlanLabels[own];
  const ratio = (multipliers?.[upgrade] ?? 0) / (multipliers?.[own] ?? 0);
  if (!Number.isFinite(ratio) || ratio <= 1)
    return t("billing2.trialChoices.moreUsage", { name: ownLabel });
  const multiple = String(Math.round(ratio * 10) / 10);
  return t("billing2.trialChoices.multipleUsage", {
    multiple,
    name: ownLabel,
  });
}

function getCadence(offer: TrialOfferResponse) {
  return offer.billing_cycle === "yearly" ? "year" : "month";
}
