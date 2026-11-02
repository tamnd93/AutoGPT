"use client";

import { WorkHistoryIcon } from "@hugeicons/core-free-icons";
import type { HomeDashboardResponse } from "@/app/api/__generated__/models/homeDashboardResponse";
import type { HomeRecentWorkGroup } from "@/app/api/__generated__/models/homeRecentWorkGroup";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { useTrackFunnelViewOnce } from "@/services/experts/use-track-funnel-view-once";
import { HomeTile } from "../HomeTile/HomeTile";
import { HomeTileEmpty } from "../HomeTileEmpty/HomeTileEmpty";
import { BriefingByline } from "./components/BriefingByline";
import { WorkGroup } from "./components/WorkGroup";
import { splitGroupsBySection } from "./helpers";

interface Props {
  dashboard: HomeDashboardResponse;
  className?: string;
}

/** One card for what the agents did this week: the team (each expert and
 *  Otto) first, then the workflows that ran on their own. */
export function RecentWork({ dashboard, className }: Props) {
  const t = useT();
  const { briefing } = dashboard;
  const groups = dashboard.recent_work?.groups ?? [];
  const { team, workflows } = splitGroupsBySection(groups);
  const completed = dashboard.recent_work?.completed_count ?? 0;
  const failed = dashboard.recent_work?.failed_count ?? 0;
  const isEmpty = groups.length === 0 && !briefing.narrative;

  // An exposure event: the briefing is an inline byline with no expand step,
  // so it counts as opened once its content actually renders.
  useTrackFunnelViewOnce("briefing_opened", Boolean(briefing.narrative));

  return (
    <HomeTile
      className={className}
      icon={WorkHistoryIcon}
      title={t("home2.recent.title")}
      meta={
        <>
          <Text
            variant="small"
            as="span"
            tone="muted"
            className="hidden sm:inline"
          >
            {t("home2.recent.thisWeek")}
          </Text>
          <span
            aria-hidden="true"
            className="hidden text-foreground-disabled sm:inline"
          >
            ·
          </span>
          <Text variant="small" as="span" tone="muted" className="tabular-nums">
            {t("home2.recent.completed", { count: completed })}
          </Text>
          {failed > 0 ? (
            <Text
              variant="small"
              as="span"
              // TODO(tokens): no exact role (text-rose-600 #E11D48)
              className="tabular-nums text-rose-600"
            >
              {t("home2.recent.failed", { count: failed })}
            </Text>
          ) : null}
        </>
      }
    >
      {isEmpty ? (
        <HomeTileEmpty
          title={t("home2.recent.emptyTitle")}
          description={t("home2.recent.emptyBody")}
        />
      ) : (
        <div className="divide-y divide-border-base">
          {briefing.narrative ? <BriefingByline briefing={briefing} /> : null}
          {[...team, ...workflows].map((group) => (
            <WorkGroup
              key={groupKey(group)}
              group={group}
              timezone={dashboard.timezone}
            />
          ))}
        </div>
      )}
    </HomeTile>
  );
}

function groupKey(group: HomeRecentWorkGroup) {
  return group.runs?.[0]?.id ?? group.items?.[0]?.id ?? group.actor.name;
}
