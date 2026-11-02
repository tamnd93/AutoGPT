import type { TrialOfferResponse } from "@/app/api/__generated__/models/trialOfferResponse";
import { Text } from "@/components/atoms/Text/Text";
import { formatTrialPrice } from "@/components/organisms/TrialCard/helpers";
import { formatPlanAmount } from "../../../helpers";
import { useT } from "@/lib/i18n";

interface Props {
  offer: TrialOfferResponse;
}

export function TrialDetails({ offer }: Props) {
  const t = useT();

  return (
    <div data-slot="trial-details" className="space-y-5">
      <Text variant="body" tone="secondary">
        {t("billing3.plans.trialDaysIntro", {
          days: offer.duration_days,
        })}
      </Text>
      <dl
        data-slot="trial-details-list"
        className="divide-y divide-border-base border-y border-border-base"
      >
        <div
          data-slot="trial-details-row"
          className="flex justify-between gap-4 py-4"
        >
          <Text as="dt" variant="body">
            {t("billing3.plans.today")}
          </Text>
          <Text as="dd" variant="lead-medium">
            {formatPlanAmount(0, offer.currency)}
          </Text>
        </div>
        <div
          data-slot="trial-details-row"
          className="flex justify-between gap-4 py-4"
        >
          <Text as="dt" variant="body">
            {t("billing3.plans.afterDays", {
              days: offer.duration_days,
            })}
          </Text>
          <Text as="dd" variant="lead-medium">
            {formatTrialPrice(offer)}
          </Text>
        </div>
      </dl>
      <Text variant="body" tone="secondary">
        {t("billing3.plans.trialChargeNote")}
      </Text>
      <Text variant="body" tone="secondary">
        {t("billing3.plans.trialLimitNote")}
      </Text>
    </div>
  );
}
