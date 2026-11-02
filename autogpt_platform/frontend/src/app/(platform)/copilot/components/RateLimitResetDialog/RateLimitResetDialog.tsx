"use client";

import { useReadEveryRender } from "@/hooks/useReadEveryRender";
import type { SubscriptionTier } from "@/app/api/__generated__/models/subscriptionTier";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { PaymentDueAction } from "@/components/organisms/UsageExperience/PaymentDueAction";
import { PlanOffer } from "@/components/organisms/UsageExperience/PlanOffer";
import { ProviderContinuation } from "@/components/organisms/UsageExperience/ProviderContinuation";
import { UsageMeter } from "@/components/organisms/UsageExperience/UsageMeter";
import {
  getUsageExperience,
  getUsageOfferAction,
  type UsageExperience,
} from "@/services/usageExperience/helpers";
import { formatPaymentDue } from "@/services/usageExperience/payment";
import { usagePresentation } from "@/services/usageExperience/presentation";
import {
  budgetOutTitle,
  budgetResetSentence,
  type ResetWait,
} from "@/services/usageExperience/budget";
import { useT } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { ResetWaitBox } from "./components/ResetWaitBox";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resetsAt?: string | Date | null;
  tier?: SubscriptionTier | null;
  experience?: UsageExperience;
  offer?: Omit<ComponentProps<typeof PlanOffer>, "onUpgrade">;
  onUpgrade?: () => void;
  unavailable?: boolean;
  checking?: boolean;
  failureWindow?: string;
  onRetry?: () => void;
  isBillingEnabled?: boolean;
  alternative?: { display_name: string } | null;
  onContinue?: () => void;
  isSwitching?: boolean;
  /** The reset a blocked chat can wait for, when it has one. */
  wait?: ResetWait | null;
  meters?: ComponentProps<typeof ResetWaitBox>["meters"];
  onSendAtReset?: () => void;
  isSchedulingAtReset?: boolean;
}

export function RateLimitResetDialog({
  isOpen,
  onClose,
  resetsAt,
  tier,
  experience,
  offer,
  onUpgrade,
  unavailable = false,
  checking = false,
  failureWindow,
  onRetry,
  isBillingEnabled = true,
  alternative,
  onContinue,
  isSwitching,
  wait = null,
  meters,
  onSendAtReset,
  isSchedulingAtReset,
}: Props) {
  const t = useT();
  const router = useRouter();
  const model =
    experience ??
    getUsageExperience({
      tier: tier ?? "BASIC",
      daily: {
        percent_used: 100,
        resets_at: resetsAt ? new Date(resetsAt).toISOString() : "",
      },
    });
  const copy = usagePresentation(model, offer?.usageMultiplier);
  // A top-tier plan has no upgrade to lead with, so waiting for the reset
  // leads instead.
  const waitTitle =
    wait && model.isTopTier ? budgetOutTitle(wait.window) : null;
  // Relative to the clock, so read on every render rather than cached.
  const resetSentence = useReadEveryRender(() =>
    wait ? budgetResetSentence(wait) : null,
  );
  const payment = formatPaymentDue(model.payment);
  const fallbackTitle =
    failureWindow === "trial"
      ? t("chatInput2.rateLimit.trialTitle")
      : failureWindow === "weekly"
        ? t("chatInput2.rateLimit.weeklyTitle")
        : failureWindow === "daily"
          ? t("chatInput2.rateLimit.dailyTitle")
          : t("chatInput2.rateLimit.unavailableTitle");
  function upgrade() {
    if (onUpgrade) onUpgrade();
    else {
      onClose();
      router.push("/settings/billing");
    }
  }
  return (
    <Dialog
      variant="compact"
      title={
        <div className="pr-6">
          <Text
            variant="small"
            className="mb-2 !text-xs !text-foreground-tertiary"
          >
            {checking
              ? t("chatInput2.rateLimit.checkingEyebrow")
              : unavailable
                ? t("chatInput2.rateLimit.unavailableEyebrow")
                : copy.eyebrow}
          </Text>
          <Text
            // TODO(tokens): SECRT-3152, no text token for !text-[26px]
            as="span"
            variant="h3"
            className="!text-[26px] !leading-8"
          >
            {checking
              ? t("chatInput2.rateLimit.checkingTitle")
              : unavailable
                ? fallbackTitle
                : (waitTitle ?? copy.title)}
          </Text>
        </div>
      }
      styling={{ maxWidth: "35rem", minWidth: "auto" }}
      controlled={{
        isOpen,
        set: (open) => {
          if (!open) onClose();
        },
      }}
    >
      <Dialog.Content>
        {checking ? (
          <Text
            variant="body"
            role="status"
            className="!text-sm !text-foreground-tertiary"
          >
            {t("chatInput2.rateLimit.refreshing")}
          </Text>
        ) : unavailable ? (
          <div className="space-y-5">
            <Text
              variant="body"
              className="!text-sm !leading-6 !text-foreground-tertiary"
            >
              {t("chatInput2.rateLimit.savedTryAgain")}
            </Text>
            <Button onClick={onRetry}>
              {t("chatInput2.rateLimit.tryAgain")}
            </Button>
          </div>
        ) : (
          <>
            <Text
              variant="body"
              className="mb-5 !text-sm !leading-6 !text-foreground-tertiary"
            >
              {waitTitle && wait ? resetSentence : copy.description}
            </Text>
            {copy.trialSpent && (
              <div className="mb-5">
                <UsageMeter
                  label={t("chatInput2.rateLimit.trialMeter")}
                  percent={model.trialPercent ?? 100}
                  detail={t("chatInput2.rateLimit.trialMeterDetail")}
                />
              </div>
            )}
            {wait && (
              <ResetWaitBox
                meters={meters}
                onSendAtReset={onSendAtReset}
                isScheduling={isSchedulingAtReset}
              />
            )}
            {isBillingEnabled && model.targetTier && (
              <PlanOffer
                tier={model.targetTier}
                {...offer}
                actionLabel={getUsageOfferAction(model, offer ?? {})}
                onUpgrade={upgrade}
              />
            )}
            {isBillingEnabled &&
              model.inactiveTrialStatus === "payment_failed" &&
              (payment ? (
                <PaymentDueAction
                  url={payment.url}
                  label={payment.actionLabel}
                />
              ) : (
                <Button className="w-full" onClick={upgrade}>
                  {t("chatInput2.rateLimit.reviewBilling")}
                </Button>
              ))}
            {isBillingEnabled && model.isTopTier && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-base p-4">
                <div>
                  <Text variant="small-medium">
                    {t("chatInput2.rateLimit.needCapacity")}
                  </Text>
                  <Text
                    variant="small"
                    className="mt-1 !text-foreground-tertiary"
                  >
                    {t("chatInput2.rateLimit.capacityHelp")}
                  </Text>
                </div>
                <Button
                  as="NextLink"
                  href="mailto:contact@agpt.co"
                  variant="secondary"
                  size="small"
                >
                  {copy.supportLabel}
                </Button>
              </div>
            )}
          </>
        )}
        {alternative && onContinue && (
          <ProviderContinuation
            name={alternative.display_name}
            onContinue={onContinue}
            isSwitching={isSwitching}
          />
        )}
        <Button variant="ghost" className="mt-3 w-full" onClick={onClose}>
          {checking || unavailable
            ? t("chatInput2.rateLimit.backToWork")
            : copy.secondary}
        </Button>
      </Dialog.Content>
    </Dialog>
  );
}
