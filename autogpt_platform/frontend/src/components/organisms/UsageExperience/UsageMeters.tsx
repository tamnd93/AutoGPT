import { cn } from "@/lib/utils";
import { UsageMeter } from "./UsageMeter";
import { useT } from "@/lib/i18n";

interface Reading {
  percent_used: number;
}

interface Props {
  daily?: Reading | null;
  weekly?: Reading | null;
  /** A lifetime trial has one allowance instead of daily and weekly ones. */
  trialPercent?: number | null;
  className?: string;
}

export function UsageMeters({ daily, weekly, trialPercent, className }: Props) {
  const t = useT();
  const meters =
    trialPercent != null
      ? [
          {
            label: t("billing4.usageMeters.trialAllowance"),
            percent: trialPercent,
          },
        ]
      : [
          ...(daily
            ? [
                {
                  label: t("billing4.usageMeters.today"),
                  percent: daily.percent_used,
                },
              ]
            : []),
          ...(weekly
            ? [
                {
                  label: t("billing4.usageMeters.thisWeek"),
                  percent: weekly.percent_used,
                },
              ]
            : []),
        ];
  if (meters.length === 0) return null;
  return (
    <div
      data-slot="usage-meters"
      className={cn("grid gap-x-6 gap-y-3 sm:grid-cols-2", className)}
    >
      {meters.map((meter) => (
        <UsageMeter
          key={meter.label}
          label={meter.label}
          percent={meter.percent}
        />
      ))}
    </div>
  );
}
