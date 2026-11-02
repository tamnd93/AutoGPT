import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Text } from "@/components/atoms/Text/Text";
import { CancelTrialDialog } from "./CancelTrialDialog";
import { formatTrialEnd, formatTrialPrice } from "./helpers";
import { TrialCancelPending } from "./TrialCancelPending";
import { useLocale, useT } from "@/lib/i18n";
import { TrialRejection } from "./TrialRejection";

interface Props {
  trial: TrialStatusResponse;
  isCanceling: boolean;
  onCancel: () => void;
  isResuming: boolean;
  onResume: () => void;
}

export function TrialStatus({
  trial,
  isCanceling,
  onCancel,
  isResuming,
  onResume,
}: Props) {
  const t = useT();
    const locale = useLocale();
  if (!trial.offer) return null;
  if (trial.status === "canceled" && trial.rejection_reason)
    return <TrialRejection reason={trial.rejection_reason} />;
  if (trial.active && trial.cancel_at_period_end)
    return (
      <TrialCancelPending
        trial={trial}
        offer={trial.offer}
        isResuming={isResuming}
        onResume={onResume}
      />
    );
  const end = formatTrialEnd(trial.ends_at, locale);
  return (
    <div
      data-slot="trial-status"
      className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3"
    >
      <div
        data-slot="trial-status-details"
        className="min-w-0 basis-full space-y-2 sm:flex-1 sm:basis-auto"
      >
        <div
          data-slot="trial-status-header"
          className="flex flex-wrap items-center gap-2.5"
        >
          <Text variant="large-semibold" as="h2">
            {trial.active
              ? t("billing3.trialStatus.titleActive")
              : t("billing3.trialStatus.titleEnded")}
          </Text>
          <Badge variant="info" size="small">
            {trial.status === "canceled"
              ? t("billing3.trialStatus.badgeCanceled")
              : trial.active
                ? t("billing3.trialStatus.badgeFreeTrial")
                : t("billing3.trialStatus.badgeEnded")}
          </Badge>
        </div>
        <Text
          variant="small"
          tone="secondary"
          className="max-w-[560px] leading-5"
        >
          {trial.status === "canceled"
            ? t("billing3.trialStatus.bodyCanceled")
            : trial.cancel_at_period_end
              ? t("billing3.trialStatus.bodyCanceling", { end })
              : trial.active
                ? t("billing3.trialStatus.bodyActive", {
                  end,
                  price: formatTrialPrice(trial.offer, locale),
                })
                : t("billing3.trialStatus.bodyEnded")}
        </Text>
        {trial.active && (
          <Text variant="small" tone="secondary" className="text-xs">
                        {t("billing3.trialStatus.cancelNote")}
          </Text>
        )}
      </div>
      {trial.active && !trial.cancel_at_period_end && (
        <CancelTrialDialog
          trial={trial}
          isCanceling={isCanceling}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
