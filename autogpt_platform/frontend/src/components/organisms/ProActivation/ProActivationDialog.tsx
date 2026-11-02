import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import type { useActivationController } from "@/services/pro-activation/useActivationController";
import { formatAmount } from "@/services/pro-activation/helpers";
import { ActivationTerms } from "./ActivationTerms";
import { ActivationStatus } from "./ActivationStatus";
import { ActivationPaymentMethod } from "./ActivationPaymentMethod";
import { billingCadence } from "@/services/pro-activation/reviewDetails";
import { useQuoteExpiry } from "@/services/pro-activation/useQuoteExpiry";
import { useT } from "@/lib/i18n";

interface Props {
  activation: ReturnType<typeof useActivationController>;
}

export function ProActivationDialog({ activation }: Props) {
  const t = useT();
  const {
    attempt,
    isOpen,
    setOpen,
    isBusy,
    isReady,
    hasFreshUsage,
    readyPlan,
    error,
    needsNewTerms,
    retryConsent,
    confirm,
    check,
    start,
  } = activation;
  const review = attempt?.status === "confirmation_required" && attempt.terms;
  const expiry = useQuoteExpiry(review ? review.expires_at : undefined);
  const refreshTerms = needsNewTerms || (expiry.expired && !retryConsent);
  const plan = (attempt?.terms?.plan ?? readyPlan) === "MAX" ? "Max" : "Pro";
  const title = isReady
    ? t("billing3.proActivation.titleActive", { plan })
    : review
      ? t("billing3.proActivation.titleStartToday", { plan })
      : attempt?.status === "not_applicable"
        ? t("billing3.proActivation.titlePlanChanged")
        : attempt?.status === "failed"
          ? t("billing3.proActivation.titlePaymentNotCompleted")
          : attempt?.status === "action_required" ||
              attempt?.status === "payment_required"
            ? t("billing3.proActivation.titleOneMoreStep", { plan })
            : t("billing3.proActivation.titleGettingReady", { plan });
  return (
    <Dialog
      variant="compact"
      controlled={{ isOpen, set: setOpen }}
      styling={{ maxWidth: "560px" }}
      title={
        <div
          data-slot="pro-activation-dialog-heading"
          className="space-y-2 pr-7"
        >
          <Text variant="small-medium" tone="muted">
            {review
              ? t("billing3.proActivation.paymentReview")
              : t("billing3.proActivation.autoGptPlan", { plan })}
          </Text>
          <span
            data-slot="pro-activation-dialog-title"
            // TODO(tokens): SECRT-3152, the 26px size, leading-[1.2] and
            // tracking-[-0.6px] have no role.
            className="block text-[26px] font-semibold leading-[1.2] tracking-[-0.6px] text-foreground-strong"
          >
            {title}
          </span>
        </div>
      }
    >
      <Dialog.Content>
        <div data-slot="pro-activation-dialog-body" className="space-y-5">
          {error && (
            <div
              role="alert"
              data-slot="pro-activation-dialog-error"
              className="rounded-large border border-warning-border bg-warning-surface p-4 text-sm text-foreground-body"
            >
              {error}
            </div>
          )}
          {review ? (
            <>
              <ActivationTerms terms={review} />
              <ActivationPaymentMethod />
              {expiry.expiringSoon && !retryConsent && (
                <Text variant="small" className="text-warning-foreground">
                  {t("billing3.proActivation.priceHeld")}
                </Text>
              )}
              {expiry.expired && !retryConsent && (
                <Text
                  variant="small"
                  className="text-warning-foreground"
                  role="status"
                >
                  {t("billing3.proActivation.quoteExpired")}
                </Text>
              )}
              <Button
                variant="primary"
                className="w-full"
                disabled={isBusy || refreshTerms}
                loading={isBusy}
                onClick={confirm}
              >
                {retryConsent
                  ? t("billing3.proActivation.retryConsent")
                  : t("billing3.proActivation.payAndStart", {
                      amount: formatAmount(review.amount_due, review.currency),
                      plan,
                    })}
              </Button>
              <Text variant="small" tone="muted" className="text-center">
                {t("billing3.proActivation.renewsUntil", {
                  cadence: billingCadence(review),
                })}
              </Text>
              {error && !needsNewTerms && retryConsent && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => check()}
                  disabled={isBusy}
                >
                  {t("billing3.proActivation.checkExisting")}
                </Button>
              )}
              {refreshTerms && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => start(attempt.return_to)}
                  disabled={isBusy}
                >
                  {t("billing3.proActivation.reviewCurrent")}
                </Button>
              )}
              <Button
                variant="link"
                className="w-full text-foreground-secondary"
                onClick={() => setOpen(false)}
              >
                {t("billing3.proActivation.notNow")}
              </Button>
            </>
          ) : attempt ? (
            <ActivationStatus
              attempt={attempt}
              isBusy={isBusy}
              isReady={isReady}
              hasFreshUsage={hasFreshUsage}
              plan={plan}
              check={check}
              close={() => setOpen(false)}
            />
          ) : (
            <Button
              variant="secondary"
              className="w-full"
              loading={isBusy}
              onClick={() => start()}
            >
              {isBusy
                ? t("billing3.proActivation.loadingUpgrade")
                : t("billing3.proActivation.tryAgain")}
            </Button>
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
