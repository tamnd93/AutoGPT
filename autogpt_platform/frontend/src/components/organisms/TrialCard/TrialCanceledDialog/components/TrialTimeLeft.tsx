import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import { useLocale, useT } from "@/lib/i18n";
import {
  describeTrialTimeLeft,
  formatTrialDays,
  formatTrialEnd,
} from "../../helpers";

interface Props {
  endsAt: TrialStatusResponse["ends_at"];
}

export function TrialTimeLeft({ endsAt }: Props) {
  const t = useT();
  const locale = useLocale();
  if (!endsAt)
    return (
      <>
                {t("billing3.timeLeft.noEnd")}
        
      </>
    );
  const left = describeTrialTimeLeft(endsAt);
  if (left.kind === "ended")
    return <>{t("billing3.timeLeft.ended")}</>;
  if (left.kind !== "days")
    return (
      <>
                {t("billing3.timeLeft.until")}{" "}
        <strong data-slot="trial-time-left-end" className="font-semibold">
          {left.time} {t(left.kind === "today" ? "billing3.timeLeft.today" : "billing3.timeLeft.tomorrow")}
        </strong>
                {t("billing3.timeLeft.tail")}
      </>
    );
  return (
    <>
            {t("billing3.timeLeft.youStillHave")}{" "}
      <strong data-slot="trial-time-left-days" className="font-semibold">
                {formatTrialDays(left.days, locale)}
      </strong>{" "}
            {t("billing3.timeLeft.ofFullAccess")}{" "}
      <strong data-slot="trial-time-left-end" className="font-semibold">
                {formatTrialEnd(endsAt, locale)}
      </strong>
            {t("billing3.timeLeft.tail")}
    </>
  );
}
