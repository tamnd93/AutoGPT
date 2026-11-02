import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import { formatTrialPrice } from "./helpers";
import { TrialTitle } from "./TrialTitle/TrialTitle";

interface Props {
  trial: TrialStatusResponse;
  isStarting: boolean;
  isBlocked: boolean;
  onStart: () => void;
}

export function TrialOffer({ trial, isStarting, isBlocked, onStart }: Props) {
  const t = useT();
  const locale = useLocale();
  const offer = trial.offer;
  if (!offer) return null;
  return (
    <div
      data-slot="trial-offer"
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8"
    >
      <div
        data-slot="trial-offer-details"
        className="flex min-w-0 flex-col gap-2"
      >
        <div
          data-slot="trial-offer-header"
          className="flex flex-wrap items-center gap-2"
        >
          <TrialTitle>
            
            days
          </TrialTitle>
          <span
            data-slot="trial-offer-pill"
            // TODO(tokens): no role for the purple-100 pill or its purple-700
            // text.
            className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-tiny font-medium leading-inherit text-purple-700"
          >
                        {t("billing3.trialOffer.noChargePill")}
          </span>
        </div>
        <Text variant="body" className="!text-foreground-emphasis">
          {t("billing3.trialOffer.bodyPrefix")}{" "}
          {formatTrialPrice(offer, locale)}, {t("billing3.trialOffer.bodySuffix")}
          
        </Text>
        <Text variant="small" tone="muted">
          {t("billing3.trialOffer.note")}
        </Text>
      </div>
      <Button
        variant="primary"
        size="large"
        onClick={onStart}
        loading={isStarting}
        disabled={isStarting || isBlocked}
        className="w-full shrink-0 md:w-auto md:min-w-[11rem]"
      >
                {t("billing3.trialOffer.start", { days: offer.duration_days })}
      </Button>
    </div>
  );
}
