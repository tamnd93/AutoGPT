import {
  Clock01Icon,
  DollarSignIcon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import type { TrialOfferResponse } from "@/app/api/__generated__/models/trialOfferResponse";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import {
  describeTrialTimeLeft,
  formatPlanPrice,
  formatTrialEndDate,
  trialPlanLabels,
} from "../../helpers";

interface Props {
  offer: TrialOfferResponse;
  endsAt: Date | string | null | undefined;
}

export function WorthDoingPanel({ offer, endsAt }: Props) {
  const t = useT();
  const locale = useLocale();
  const planStart = describePlanStart(endsAt, locale);
  const resumeNote = planStart
    ? t("billing3.worthDoing.resumeNote", { date: planStart })
    : "";
  const rows = [
    {
      icon: Clock01Icon,
      title: t("billing3.worthDoing.row1Title"),
      body: t("billing3.worthDoing.row1Body"),
    },
    {
      icon: Note01Icon,
      title: t("billing3.worthDoing.row2Title"),
      body: t("billing3.worthDoing.row2Body"),
    },
    {
      icon: DollarSignIcon,
      title: t("billing3.worthDoing.row3Title"),
      body: t("billing3.worthDoing.row3Body", {
        plan: trialPlanLabels[offer.tier],
        price: formatPlanPrice(offer, locale),
        note: resumeNote,
      }),
    },
  ];

  return (
    <div
      data-slot="worth-doing-panel"
      className="rounded-xl border border-border-base bg-surface-muted px-4 pt-3"
    >
      <Text variant="eyebrow" as="h3">
                {t("billing3.worthDoing.title")}
      </Text>
      <ul
        data-slot="worth-doing-panel-list"
        className="divide-y divide-border-base"
      >
        {rows.map((row) => (
          <li
            key={row.title}
            data-slot="worth-doing-panel-item"
            className="flex gap-3 py-3"
          >
            <span
              data-slot="worth-doing-panel-icon"
              // TODO(tokens): no role for violet-100.
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-100"
            >
              <Icon icon={row.icon} size={14} className="text-accent-strong" />
            </span>
            <div
              data-slot="worth-doing-panel-content"
              className="flex min-w-0 flex-col gap-0.5"
            >
              <Text variant="body-medium" tone="primary">
                {row.title}
              </Text>
              <Text variant="small" tone="secondary">
                {row.body}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function describePlanStart(
  endsAt: Props["endsAt"],
  locale: Parameters<typeof formatTrialEndDate>[1],
) {
  if (!endsAt) return null;
  const left = describeTrialTimeLeft(endsAt, undefined, locale);
  if (left.kind === "ended") return null;
  return left.kind === "days" ? formatTrialEndDate(endsAt, locale) : left.kind;
}
