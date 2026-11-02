import type { TrialOfferResponse } from "@/app/api/__generated__/models/trialOfferResponse";
import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import {
  formatPlanPrice,
  formatTrialEnd,
  formatTrialEndDate,
  trialPlanLabels,
} from "./helpers";
import { useLocale, useT } from "@/lib/i18n";
import { TrialTitle } from "./TrialTitle/TrialTitle";

interface Props {
  trial: TrialStatusResponse;
  offer: TrialOfferResponse;
  isResuming: boolean;
  onResume: () => void;
}

export function TrialCancelPending({
  trial,
  offer,
  isResuming,
  onResume,
}: Props) {
  const t = useT();
    const locale = useLocale();
  return (
    <div data-slot="trial-cancel-pending" className="flex flex-col gap-3">
      <div
        data-slot="trial-cancel-pending-header"
        className="flex flex-wrap items-center gap-2"
      >
        <TrialTitle>{t("billing3.trialStatus.titleActive")}</TrialTitle>
        <span
          data-slot="trial-cancel-pending-status"
          className="inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-2 py-0.5 text-xs text-foreground-body"
        >
          <span
            // TODO(tokens): no surface role for the zinc-400 status dot.
            aria-hidden
            data-slot="trial-cancel-pending-status-dot"
            className="size-1.5 rounded-full bg-zinc-400"
          />
                    {t("billing3.cancelPending.status")}
        </span>
      </div>
      <Text variant="body" className="!text-foreground-emphasis">
        {t("billing3.cancelPending.body")}{" "}
        <strong
          data-slot="trial-cancel-pending-end-date"
          className="font-semibold"
        >
          {formatTrialEnd(trial.ends_at, locale)}
        </strong>
        .
      </Text>
      {trial.ends_at ? (
        <Text variant="small" tone="muted">
          {t("billing3.cancelPending.resumeNote", {
            plan: trialPlanLabels[offer.tier],
            date: trial.ends_at ? formatTrialEndDate(trial.ends_at, locale) : "",
            price: formatPlanPrice(offer, locale),
          })}
          
          
        </Text>
      ) : null}
      <div data-slot="trial-cancel-pending-actions" className="mt-1">
        <Button
          variant="secondary"
          size="small"
          loading={isResuming}
          disabled={isResuming}
          onClick={onResume}
        >
                    {t("billing3.cancelPending.resume")}
        </Button>
      </div>
    </div>
  );
}
