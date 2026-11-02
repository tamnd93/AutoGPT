import { Calendar03Icon } from "@hugeicons/core-free-icons";
import type { HomeDashboardResponse } from "@/app/api/__generated__/models/homeDashboardResponse";
import { HomeSectionLabel } from "../HomeSectionLabel/HomeSectionLabel";
import { HomeTileEmpty } from "../HomeTileEmpty/HomeTileEmpty";
import { HomeTile } from "../HomeTile/HomeTile";
import { useT } from "@/lib/i18n";
import { ActiveRow } from "./components/ActiveRow";
import { UpcomingRow } from "./components/UpcomingRow";

interface Props {
  dashboard: HomeDashboardResponse;
  className?: string;
}

// The rail runs through the centre of each row's 36px marker, which sits
// 16px in from the tile edge.
const TIMELINE_CLASS =
  "relative before:absolute before:bottom-5 before:left-[33px] before:top-5 before:w-px before:bg-surface-active";

export function NowNext({ dashboard, className }: Props) {
  const t = useT();

  return (
    <HomeTile
      className={className}
      icon={Calendar03Icon}
      title={t("home2.nowNext.title")}
    >
      {dashboard.active_tasks.length > 0 ? (
        <div className="border-b border-separator pb-2">
          <HomeSectionLabel>{t("home2.nowNext.workingNow")}</HomeSectionLabel>
          <div className={TIMELINE_CLASS}>
            {dashboard.active_tasks.map((item) => (
              <ActiveRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="pb-2">
        <HomeSectionLabel>{t("home2.nowNext.comingUp")}</HomeSectionLabel>
        {dashboard.upcoming_tasks.length === 0 ? (
          <HomeTileEmpty
            title={t("home2.nowNext.emptyTitle")}
            description={t("home2.nowNext.emptyBody")}
            className="min-h-0 gap-4 py-6"
          />
        ) : (
          <div className={TIMELINE_CLASS}>
            {dashboard.upcoming_tasks.map((item) => (
              <UpcomingRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </HomeTile>
  );
}
