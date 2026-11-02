import { Expert } from "@/app/api/__generated__/models/expert";
import { ExpertActivity } from "@/app/api/__generated__/models/expertActivity";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { cn } from "@/lib/utils";
import { FireIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";
import { ExpertActivityGraph } from "./ExpertActivityGraph/ExpertActivityGraph";
import {
  getActivityStreak,
  getActivitySummary,
  getThreeMonthActivityDays,
  getYearActivityDays,
} from "./ExpertActivityGraph/helpers";

interface Props {
  expert: Expert;
  activity: ExpertActivity | null;
  isActivityLoading: boolean;
  isActivityError: boolean;
}

export function ExpertSummaryCard({
  expert,
  activity,
  isActivityLoading,
  isActivityError,
}: Props) {
  const t = useT();
  const activityDays = activity ? getYearActivityDays(activity.days) : null;
  const visibleActivityDays = activityDays
    ? getThreeMonthActivityDays(activityDays)
    : null;
  const summary = visibleActivityDays
    ? getActivitySummary(visibleActivityDays)
    : null;
  const streak = activityDays ? getActivityStreak(activityDays) : null;

  return (
    <aside
      aria-label={t("team6.summary.glanceAria", { name: expert.name })}
      className="flex flex-col gap-4 self-start"
    >
      <section
        aria-label={t("team6.summary.activityAria", { name: expert.name })}
        className="flex flex-col gap-2 rounded-2xl bg-surface p-4 smooth-shadow-ring-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <Text variant="body-md-medium" tone="primary">
            {t("team6.summary.activity")}
          </Text>
          {summary ? <ActivityStatus isActive={summary.isActive} /> : null}
        </div>
        {isActivityLoading ? (
          <Skeleton className="h-[5.25rem] w-full rounded-lg" />
        ) : isActivityError ? (
          <Text variant="small" tone="muted">
            {t("team6.summary.activityUnavailable")}
          </Text>
        ) : visibleActivityDays && summary ? (
          <>
            <ExpertActivityGraph
              days={visibleActivityDays}
              color={expert.color}
            />
            <Text variant="small" tone="muted">
              {summary.totalsLabel} · {summary.rangeLabel}
            </Text>
          </>
        ) : null}
      </section>

      <section
        aria-label={t("team6.summary.streakAria", {
          name: expert.name,
        })}
        className="flex flex-col rounded-2xl bg-surface p-4 smooth-shadow-ring-sm"
      >
        {isActivityLoading ? (
          <Skeleton className="h-16 w-full rounded-lg" />
        ) : isActivityError ? (
          <Text variant="small" tone="muted">
            {t("team6.summary.streakUnavailable")}
          </Text>
        ) : (
          <div className="flex items-center justify-center gap-3 text-center">
            <Icon
              icon={FireIcon}
              size={40}
              className="shrink-0 text-foreground-subtle"
            />
            <div className="min-w-0">
              <Text variant="h4" tone="primary" className="tabular-nums">
                {streak ?? 0}
              </Text>
              <Text variant="body-md" tone="muted">
                {t("team6.summary.dayStreak")}
              </Text>
            </div>
          </div>
        )}
      </section>
    </aside>
  );
}

interface ActivityStatusProps {
  isActive: boolean;
}

function ActivityStatus({ isActive }: ActivityStatusProps) {
  const t = useT();

  return (
    <span className="flex items-center gap-1.5">
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full",
          // TODO(tokens): no exact role: bg-emerald-500 #10B981; no fitting role for bg-zinc-300 #C5C5C9; #C5C5C9 is foreground-disabled (a text colour), border-strong (a border colour)
          isActive ? "bg-emerald-500" : "bg-zinc-300",
        )}
      />
      <Text variant="small" tone="muted">
        {isActive
          ? t("team6.summary.activeThisWeek")
          : t("team6.summary.quietLately")}
      </Text>
    </span>
  );
}
