"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useIsBillingEnabled } from "@/hooks/useIsBillingEnabled";
import { useT } from "@/lib/i18n";
import { toast as sonnerToast } from "sonner";

export const PAYWALL_TOAST_KEY = "copilot-send-paywall";
const BILLING_PATH = "/settings/billing";

interface DescriptionProps {
  recovery: string;
}

// Rendered inside the Toaster, so it can read whether this install bills at
// all. Without billing (most self-hosted installs) there is no plan to pick
// and /settings/billing is a 404, so it points at whoever runs the server.
export function PaywallToastDescription({ recovery }: DescriptionProps) {
  const t = useT();
  const isBillingEnabled = useIsBillingEnabled();
  return isBillingEnabled
    ? t("shared2.paywall.chooseOneRecovery", { recovery })
    : t("shared2.paywall.askAdminRecovery", { recovery });
}

export function PlanRequiredDescription() {
  const t = useT();
  const isBillingEnabled = useIsBillingEnabled();
  return isBillingEnabled
    ? t("shared2.paywall.chooseOne")
    : t("shared2.paywall.askAdmin");
}

export function PaywallToastAction() {
  const t = useT();
  const isBillingEnabled = useIsBillingEnabled();
  if (!isBillingEnabled) return null;
  return (
    <Button
      as="NextLink"
      href={BILLING_PATH}
      size="small"
      variant="secondary"
      onClick={() => sonnerToast.dismiss(PAYWALL_TOAST_KEY)}
    >
      {t("shared2.paywall.seePlans")}
    </Button>
  );
}
