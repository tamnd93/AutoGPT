import { Text } from "@/components/atoms/Text/Text";
import { budgetLowHint } from "@/services/usageExperience/budget";
import type { UsageSnapshot } from "@/services/usageExperience/useUsageExperience";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BudgetRing } from "./BudgetRing";
import { useTipMoment } from "@/app/(platform)/components/ContextualTips/useTipMoment";

interface Props {
  usage: UsageSnapshot;
  className?: string;
}

export function BudgetLowHint({ usage, className }: Props) {
  const t = useT();
  const { budget, experience } = usage;
  // The window running low, or nothing while the budget is fine.
  const lowWindow = budget.state === "low" ? budget.window : null;
  // Running low is the moment the allowance matters, if Otto never said so.
  useTipMoment("first-cost", lowWindow !== null);
  if (!lowWindow) return null;
  const trialPercent = experience.isLifetimeTrial
    ? experience.trialPercent
    : null;
  const percent =
    lowWindow === "trial"
      ? (trialPercent ?? budget.percentUsed)
      : budget.percentUsed;
  const windowLabel =
    lowWindow === "trial"
      ? t("chatInput3.window.trial")
      : lowWindow === "daily"
        ? t("chatInput3.window.today")
        : t("chatInput3.window.week");
  if (percent === null) return null;
  return (
    <div
      aria-label={t("chatInput3.budgetLowHint.aria")}
      className={cn(
        "mx-auto mt-2 flex w-full items-center gap-2 px-3 text-left",
        className,
      )}
    >
      <BudgetRing label={windowLabel} percent={percent} />
      <Text variant="small" className="!text-xs !text-foreground-tertiary">
        {budgetLowHint(lowWindow, percent)}
      </Text>
    </div>
  );
}
