import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import type { PlanDef } from "@/components/molecules/PlanCard/plans";
import { formatTrialPrice } from "@/components/organisms/TrialCard/helpers";
import { useT } from "@/lib/i18n";
import {
  getPlanPresentation,
  isTeamPlan,
  type SubscriptionPlansProps,
} from "../helpers";

interface Props extends SubscriptionPlansProps {
  plan: PlanDef;
  onTrialDetails: () => void;
}

export function OfferActions(props: Props) {
  const t = useT();
  const { trial, offer, action } = getPlanPresentation(props.plan, props);
  return (
    <div data-slot="offer-actions" className="mt-auto space-y-2">
      {trial ? (
        <Button
          type="button"
          variant="primary"
          size="small"
          className="w-full"
          loading={props.isStartingTrial}
          disabled={props.isStartingTrial || props.isUpdatingTier}
          onClick={props.onStartTrial}
        >
          {action}
        </Button>
      ) : (
        <PaidPlanAction {...props} />
      )}
      <div data-slot="offer-actions-details" className="min-h-10 text-center">
        {trial ? (
          <TrialActionDetails {...props} />
        ) : offer ? (
          <AlternativeTrial {...props} offer={offer} />
        ) : (
          <Text variant="small" tone="muted">
            {isTeamPlan(props.plan.key)
              ? t("billing3.plans.teamFit")
              : t("billing3.plans.manageBilling")}
          </Text>
        )}
      </div>
      {offer && props.trialError && (
        <p
          role="alert"
          data-slot="offer-actions-error"
          className="text-sm text-destructive"
        >
          {props.trialError}
        </p>
      )}
    </div>
  );
}

function PaidPlanAction({
  plan,
  isUpdatingTier,
  isStartingTrial,
  selectedPlan,
  onSelectPlan,
  inline = false,
  price,
}: Props & { inline?: boolean; price?: string | null }) {
  function handleSelect() {
    onSelectPlan(plan.key);
  }

  return (
    <Button
      type="button"
      variant={inline ? "link" : plan.highlighted ? "primary" : "secondary"}
      size="small"
      className={
        inline
          ? "h-auto min-w-0 p-0 text-xs text-foreground-tertiary"
          : "w-full"
      }
      loading={isUpdatingTier && selectedPlan === plan.key}
      disabled={isUpdatingTier || isStartingTrial}
      onClick={handleSelect}
    >
      {plan.cta}
      {price && ` · ${price}`}
    </Button>
  );
}

function TrialActionDetails(props: Props) {
  const t = useT();
  const { paidActionPrice } = getPlanPresentation(props.plan, props);
  return (
    <Text variant="small" tone="muted">
      {t("billing3.plans.cardRequired")}{" "}
      <Button
        type="button"
        variant="link"
        className="h-auto min-w-0 p-0 text-xs text-foreground-tertiary"
        onClick={props.onTrialDetails}
      >
        {t("billing3.plans.trialDetails")}
      </Button>
      {" · "}
      <PaidPlanAction {...props} inline price={paidActionPrice} />
    </Text>
  );
}

function AlternativeTrial({
  plan,
  offer,
  onBillingChange,
  isStartingTrial,
}: Props & {
  offer: NonNullable<SubscriptionPlansProps["trialOffer"]>;
}) {
  const t = useT();

  function handleSwitchCycle() {
    onBillingChange(offer.billing_cycle);
  }

  return (
    <div data-slot="alternative-trial">
      <Button
        type="button"
        variant="link"
        className="h-auto min-w-0 p-0 text-xs text-brand"
        disabled={isStartingTrial}
        onClick={handleSwitchCycle}
      >
        {t("billing3.plans.tryInstead", {
          plan: plan.name,
          days: offer.duration_days,
        })}
      </Button>
      <Text variant="small" tone="muted">
        {t("billing3.plans.renewsAt", {
          price: formatTrialPrice(offer),
        })}
      </Text>
    </div>
  );
}
