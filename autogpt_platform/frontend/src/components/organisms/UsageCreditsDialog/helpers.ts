import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export type ChatAllowance =
  | "unknown"
  | "no-plan"
  | "lifetime-trial"
  | "unlimited"
  | "daily"
  | "weekly"
  | "daily-weekly";

interface PlanState {
  tier: string | null;
  isActiveTrial: boolean;
  isLifetimeTrial: boolean;
}

interface UsageWindows {
  daily?: unknown | null;
  weekly?: unknown | null;
}

// Read the same way as the billing page's usage card, so the two never
// describe one plan differently.
export function getChatAllowance(
  plan: PlanState,
  usage: UsageWindows | undefined,
): ChatAllowance {
  if (!usage) return "unknown";
  if (plan.tier === "NO_TIER") return "no-plan";
  if (plan.isLifetimeTrial) return "lifetime-trial";
  if (usage.daily && usage.weekly) return "daily-weekly";
  if (usage.daily) return "daily";
  if (usage.weekly) return "weekly";
  if (plan.isActiveTrial) return "lifetime-trial";
  // A trial account whose trial status hasn't loaded, or failed to, is not
  // an uncapped plan: say nothing about its limits.
  return plan.tier === "TRIAL" ? "unknown" : "unlimited";
}

interface Args {
  paymentEnabled: boolean;
  allowance: ChatAllowance;
  isTrial: boolean;
}

export function getUsageCreditsAnswers(
  { paymentEnabled, allowance, isTrial }: Args,
  locale: Locale = DEFAULT_LOCALE,
) {
  return [
    {
      question: getMessage(locale, "billing4.usage.qChat"),
      answer: getMessage(locale, "billing4.usage.aChat", {
        allowance: describeAllowance(allowance, isTrial, locale),
      }),
    },
    {
      question: getMessage(locale, "billing4.usage.qCredits"),
      // An Otto (AutoPilot) step bills the allowance first and the credit
      // balance only once it is out: copilot/credit_billing.py.
      answer: getMessage(locale, "billing4.usage.aCredits", {
        more: paymentEnabled
          ? getMessage(locale, "billing4.usage.creditsMoreBuy")
          : getMessage(locale, "billing4.usage.creditsMoreEarn"),
      }),
    },
    // With payments off there is no checkout, upgrade or top-up to charge it.
    ...(paymentEnabled
      ? [
          {
            question: getMessage(locale, "billing4.usage.qCard"),
            // A failed renewal is paid from the balance when it covers the
            // invoice: subscription_payment_failure.py, pay_invoice_from_wallet.
            answer: getMessage(locale, "billing4.usage.aCard"),
          },
        ]
      : []),
    {
      question: getMessage(locale, "billing4.usage.qMore"),
      answer: [
        describeMoreChat(allowance, paymentEnabled, locale),
        paymentEnabled
          ? getMessage(locale, "billing4.usage.moreCreditsBuy")
          : getMessage(locale, "billing4.usage.moreCreditsEarn"),
      ]
        .filter(Boolean)
        .join(" "),
    },
  ];
}

function describeAllowance(
  allowance: ChatAllowance,
  isTrial: boolean,
  locale: Locale,
) {
  const owner = isTrial
    ? getMessage(locale, "billing4.usage.ownerTrial")
    : getMessage(locale, "billing4.usage.ownerPlan");
  switch (allowance) {
    case "no-plan":
      return getMessage(locale, "billing4.usage.allowancePlan");
    case "lifetime-trial":
      return getMessage(locale, "billing4.usage.allowanceTrial");
    case "unlimited":
      return getMessage(locale, "billing4.usage.allowanceUnlimited");
    case "daily-weekly":
      return getMessage(locale, "billing4.usage.allowanceDailyWeekly", {
        owner,
      });
    case "daily":
      return getMessage(locale, "billing4.usage.allowanceDaily", { owner });
    case "weekly":
      return getMessage(locale, "billing4.usage.allowanceWeekly", { owner });
    case "unknown":
      return getMessage(locale, "billing4.usage.allowanceUnknown");
  }
}

// Plans are bought and upgraded only with payments on, and an uncapped plan
// has no more to get.
function describeMoreChat(
  allowance: ChatAllowance,
  paymentEnabled: boolean,
  locale: Locale,
) {
  if (!paymentEnabled || allowance === "unlimited") return null;
  if (allowance === "no-plan") {
    return getMessage(locale, "billing4.usage.moreChatChoose");
  }
  return getMessage(locale, "billing4.usage.moreChatBigger");
}
