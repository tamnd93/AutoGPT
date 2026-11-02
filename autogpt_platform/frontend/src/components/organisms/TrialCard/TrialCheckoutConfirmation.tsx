"use client";

import { Text } from "@/components/atoms/Text/Text";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useTrialCheckoutReturn } from "@/services/trials/useTrialCheckoutReturn";
import { useT } from "@/lib/i18n";

export function TrialCheckoutConfirmation() {
  const t = useT();
  const confirmation = useTrialCheckoutReturn();
  if (confirmation.error)
    return (
      <ErrorCard
        context={t("billing3.checkout.errorContext")}
        responseError={{ message: confirmation.error }}
        onRetry={confirmation.retry}
      />
    );
  if (!confirmation.ready)
    return (
      <Text variant="body" role="status">
                {t("billing3.checkout.confirming")}
      </Text>
    );
  return null;
}
