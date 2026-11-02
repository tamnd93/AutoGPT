import type { TrialOfferResponse } from "@/app/api/__generated__/models/trialOfferResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import { SquareLock02Icon } from "@hugeicons/core-free-icons";
import { ReadyLine } from "../ReadyLine";
import { Timeline } from "../Timeline";
import type { ReadyExpert } from "../useReadyExperts";
import { WelcomeShell } from "../WelcomeShell";
import { getTrialMilestones } from "./helpers";

interface Props {
  offer: TrialOfferResponse;
  experts: ReadyExpert[];
  isStarting: boolean;
  isBlocked: boolean;
  error: string | null;
  onStart: () => void;
}

export function TrialWelcome({
  offer,
  experts,
  isStarting,
  isBlocked,
  error,
  onStart,
}: Props) {
  const t = useT();
  const locale = useLocale();

  return (
    <WelcomeShell art="letter">
      <header className="flex flex-col items-start gap-3">
        <ReadyLine experts={experts} />
        <Text variant="h3" as="h1" id="welcome-title" className="text-balance">
          {t("onboarding2.trial.title", { days: offer.duration_days })}
        </Text>
        <Text variant="large" tone="secondary" className="text-pretty">
          {t("onboarding2.trial.body")}
        </Text>
      </header>

      <Timeline
        label={t("onboarding2.trial.planLabel")}
        milestones={getTrialMilestones(offer, new Date(), t, locale)}
      />

      <div className="mt-auto flex flex-col gap-3">
        <Button
          variant="primary"
          size="large"
          onClick={onStart}
          loading={isStarting}
          disabled={isStarting || isBlocked}
          className="h-12 w-full text-base"
        >
          {t("onboarding2.trial.start")}
        </Button>
        {error ? (
          <Text variant="body" role="alert" tone="danger">
            {error}
          </Text>
        ) : null}
        <Text variant="small" tone="muted" className="text-balance text-center">
          <Icon
            icon={SquareLock02Icon}
            size={13}
            className="mr-1 inline-block -translate-y-px align-middle"
          />
          {t("onboarding2.trial.stripeNote")}
        </Text>
      </div>
    </WelcomeShell>
  );
}
