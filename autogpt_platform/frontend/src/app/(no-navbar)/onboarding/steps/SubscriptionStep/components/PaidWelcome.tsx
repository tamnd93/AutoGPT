import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import { SquareLock02Icon } from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { getPaidMilestones } from "./paidMilestones";
import { ReadyLine } from "./ReadyLine";
import { Timeline } from "./Timeline";
import type { ReadyExpert } from "./useReadyExperts";
import { WelcomeShell } from "./WelcomeShell";

interface Props {
  experts: ReadyExpert[];
  price: string;
  cadence: "month" | "year";
  isProcessing: boolean;
  isBlocked: boolean;
  onContinue: () => void;
  notice?: ReactNode;
}

export function PaidWelcome({
  experts,
  price,
  cadence,
  isProcessing,
  isBlocked,
  onContinue,
  notice,
}: Props) {
  const t = useT();
  const locale = useLocale();

  return (
    <WelcomeShell art="hello">
      <header className="flex flex-col items-start gap-3">
        <ReadyLine experts={experts} />
        <Text variant="h3" as="h1" id="welcome-title" className="text-balance">
          {t("onboarding2.paid.title")}
        </Text>
        <Text variant="large" tone="secondary" className="text-pretty">
          {t("onboarding2.paid.body")}
        </Text>
      </header>

      {notice}

      <Timeline
        label={t("onboarding2.paid.planLabel")}
        milestones={getPaidMilestones({ price, cadence, t, locale })}
      />

      <div className="mt-auto flex flex-col gap-3">
        <Button
          variant="primary"
          size="large"
          onClick={onContinue}
          loading={isProcessing}
          disabled={isProcessing || isBlocked}
          className="h-12 w-full text-base"
        >
          {t("onboarding2.paid.checkout")}
        </Button>
        <Text variant="small" tone="muted" className="text-balance text-center">
          <Icon
            icon={SquareLock02Icon}
            size={13}
            className="mr-1 inline-block -translate-y-px align-middle"
          />
          {t("onboarding2.paid.secure")}
        </Text>
      </div>
    </WelcomeShell>
  );
}
