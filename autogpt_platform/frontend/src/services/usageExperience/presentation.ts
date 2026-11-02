import { formatTierLabel } from "@/app/(platform)/copilot/components/usageHelpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import {
  formatResumeTime,
  formatTrialDate,
  formatTrialStartDescription,
  type UsageExperience,
} from "./helpers";
import { formatPaymentDue } from "./payment";

export function usagePresentation(
  experience: UsageExperience,
  usageMultiplier?: number,
  locale: Locale = DEFAULT_LOCALE,
) {
  const { tier, window, isTopTier, isActiveTrial } = experience;
  if (experience.inactiveTrialStatus) {
    const canceled = experience.inactiveTrialStatus === "canceled";
    const payment = experience.inactiveTrialStatus === "payment_failed";
    const title = payment
      ? getMessage(locale, "billing4.pres.paymentFailedTitle")
      : canceled
        ? getMessage(locale, "billing4.pres.trialCanceledTitle")
        : getMessage(locale, "billing4.pres.trialEndedTitle");
    return {
      eyebrow: payment
        ? getMessage(locale, "billing4.pres.paymentEyebrow")
        : canceled
          ? getMessage(locale, "billing4.pres.canceledEyebrow")
          : getMessage(locale, "billing4.pres.endedEyebrow"),
      title,
      noticeTitle: title,
      description: payment
        ? (formatPaymentDue(experience.payment)?.description ??
          getMessage(locale, "billing4.pres.paymentDescription"))
        : canceled
          ? getMessage(locale, "billing4.pres.canceledDescription")
          : getMessage(locale, "billing4.pres.endedDescription"),
      supportLabel: getMessage(locale, "billing4.pres.contactSupport"),
      secondary: getMessage(locale, "billing4.pres.backToWork"),
      trialSpent: false,
    };
  }
  const trialSpent = isActiveTrial && window === "trial";
  const windowLabel =
    window === "weekly"
      ? getMessage(locale, "billing4.pres.weekly")
      : getMessage(locale, "billing4.pres.daily");
  const trialDate = formatTrialDate(experience.trialEndsAt);
  const resumeTime = formatResumeTime(experience.resetsAt, locale);
  const resume = resumeTime
    ? getMessage(locale, "billing4.pres.continueAt", { time: resumeTime })
    : getMessage(locale, "billing4.pres.continueRefresh");
  const title = trialSpent
    ? getMessage(locale, "billing4.pres.trialSpentTitle")
    : isTopTier
      ? resume
      : window === "weekly"
        ? getMessage(locale, "billing4.pres.weekLimit")
        : getMessage(locale, "billing4.pres.dayLimit");
  const planLabel =
    formatTierLabel(tier) ?? getMessage(locale, "billing4.pres.yourPlan");
  const eyebrowStatus = trialSpent
    ? getMessage(locale, "billing4.pres.trialUsed")
    : getMessage(locale, "billing4.pres.usageReached", {
        window: windowLabel.toLowerCase(),
      });
  return {
    eyebrow: getMessage(locale, "billing4.pres.eyebrow", {
      plan: planLabel,
      status: eyebrowStatus,
    }),
    title,
    noticeTitle: title,
    description: trialSpent
      ? experience.freshProUsage
        ? formatTrialStartDescription(experience.trialEndsAt, locale)
        : getMessage(locale, "billing4.pres.nextPlan")
      : isTopTier
        ? getMessage(locale, "billing4.pres.saved")
        : !experience.resetsAt
          ? getMessage(locale, "billing4.pres.choosePlanSaved")
          : tier === "PRO"
            ? getMessage(locale, "billing4.pres.proUpgrade", {
                resume,
                usage: usageMultiplier
                  ? getMessage(locale, "billing4.pres.timesUsage", {
                      multiplier: usageMultiplier,
                    })
                  : getMessage(locale, "billing4.pres.moreUsage"),
              })
            : tier === "BASIC"
              ? getMessage(locale, "billing4.pres.basicUpgrade", { resume })
              : getMessage(locale, "billing4.pres.startPro", { resume }),
    supportLabel:
      tier === "ENTERPRISE"
        ? getMessage(locale, "billing4.pres.contactAccountTeam")
        : tier === "BUSINESS"
          ? getMessage(locale, "billing4.pres.contactSupport")
          : getMessage(locale, "billing4.pres.contactUs"),
    secondary: trialSpent
      ? experience.freshProUsage && trialDate
        ? getMessage(locale, "billing4.pres.waitUntil", { date: trialDate })
        : getMessage(locale, "billing4.pres.backToWork")
      : experience.resetsAt
        ? getMessage(locale, "billing4.pres.waitForReset")
        : getMessage(locale, "billing4.pres.backToWork"),
    trialSpent,
  };
}
