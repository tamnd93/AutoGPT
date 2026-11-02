import type { ActivationResponse } from "@/app/api/__generated__/models/activationResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Icon } from "@/components/atoms/Icon/Icon";
import {
  CheckmarkCircle02Icon,
  Loading03Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { invoiceURL } from "@/services/pro-activation/helpers";
import { useT } from "@/lib/i18n";

interface Props {
  attempt: ActivationResponse | null;
  isReady: boolean;
  hasFreshUsage: boolean;
  plan: "Pro" | "Max";
  isBusy: boolean;
  check: () => Promise<void>;
  close: () => void;
}

export function ActivationStatus({
  attempt,
  isReady,
  hasFreshUsage,
  plan,
  isBusy,
  check,
  close,
}: Props) {
  const t = useT();
  const url = invoiceURL(attempt?.hosted_invoice_url);
  const payment =
    attempt?.status === "payment_required" ||
    attempt?.status === "action_required";
  const failed = attempt?.status === "failed";
  const notApplicable = attempt?.status === "not_applicable";
  const needsSupport = ["recovery_required", "terms_changed"].includes(
    attempt?.error_code ?? "",
  );
  return (
    <div data-slot="activation-status" className="space-y-6">
      <div
        data-slot="activation-status-panel"
        className="rounded-xlarge border border-border-base bg-surface-muted p-5"
      >
        <Icon
          icon={
            isReady
              ? CheckmarkCircle02Icon
              : payment
                ? Shield01Icon
                : Loading03Icon
          }
          size={24}
          className={
            !isReady && !payment && !failed && !notApplicable
              ? // TODO(tokens): no role for violet-600 (accent-strong is
                // violet-700).
                "mb-4 animate-spin text-violet-600"
              : "mb-4 text-violet-600"
          }
        />
        <Text variant="body" className="text-foreground-body">
          {isReady
            ? hasFreshUsage
              ? t("billing3.activation.activeFresh", { plan })
              : t("billing3.activation.activeExisting", { plan })
            : notApplicable
              ? t("billing3.activation.notApplicable")
              : payment
                ? t("billing3.activation.paymentBody")
                : failed
                  ? t("billing3.activation.failedBody")
                  : needsSupport
                    ? t("billing3.activation.supportBody")
                    : t("billing3.activation.confirming", { plan })}
        </Text>
      </div>
      {notApplicable && (
        <Button
          as="NextLink"
          href="/settings/billing"
          variant="primary"
          className="w-full"
          onClick={close}
        >
          {t("billing3.activation.viewMyPlan")}
        </Button>
      )}
      {url && payment && (
        <Button
          as="NextLink"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="w-full"
        >
          {attempt?.status === "action_required"
            ? t("billing3.activation.verifyPayment")
            : t("billing3.activation.completePayment")}
        </Button>
      )}
      {needsSupport && (
        <Button
          as="NextLink"
          href="mailto:contact@agpt.co"
          variant="primary"
          className="w-full"
        >
          {t("billing3.activation.contactSupport")}
        </Button>
      )}
      <Button
        onClick={() => (isReady || failed || notApplicable ? close() : check())}
        disabled={isBusy}
        loading={isBusy}
        variant={isReady ? "primary" : "secondary"}
        className="w-full"
      >
        {isReady
          ? t("billing3.activation.continueWhereLeft")
          : failed || notApplicable
            ? t("billing3.activation.backToWork")
            : t("billing3.activation.checkStatus")}
      </Button>
    </div>
  );
}
