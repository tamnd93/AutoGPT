import { File01Icon, PlugIcon, RepeatIcon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { HomeBriefingOutcome } from "@/app/api/__generated__/models/homeBriefingOutcome";
import type { HomeRecentWorkGroup } from "@/app/api/__generated__/models/homeRecentWorkGroup";
import type { HomeRecentWorkItemCategory } from "@/app/api/__generated__/models/homeRecentWorkItemCategory";
import type { HomeWorkActorKind } from "@/app/api/__generated__/models/homeWorkActorKind";
import { AUTOPILOT_NAME } from "@/components/molecules/AutopilotAvatar/helpers";
import type { Locale } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage, type MessageValues } from "@/lib/i18n/translate";
import { intlLocale } from "../../helpers";

function translate(
  locale: Locale | undefined,
  key: MessageKey,
  values?: MessageValues,
) {
  return getMessage(locale ?? "en", key, values);
}

export function getWorkItemIcon(
  category: HomeRecentWorkItemCategory,
): IconSvgElement {
  if (category === "integration") return PlugIcon;
  if (category === "schedule") return RepeatIcon;
  return File01Icon;
}

// The team did the work on someone's behalf; a workflow ran on its own.
export function splitGroupsBySection(groups: HomeRecentWorkGroup[]) {
  return {
    team: groups.filter((group) => group.actor.kind !== "workflow"),
    workflows: groups.filter((group) => group.actor.kind === "workflow"),
  };
}

export function getRunTriggerLabel(
  trigger: HomeBriefingOutcome["trigger"],
  locale?: Locale,
): string {
  if (trigger === "schedule")
    return translate(locale, "home2.recent.triggerScheduled");
  if (trigger === "webhook")
    return translate(locale, "home2.recent.triggerWebhook");
  return translate(locale, "home2.recent.triggerManual");
}

type ActorChip = { label: string; className: string };

// The chip is the fastest way to tell the two halves of the card apart, so
// each kind gets its own colour and a matching glow.
const ACTOR_CHIPS: Record<
  HomeWorkActorKind,
  { labelKey: MessageKey | null; className: string }
> = {
  expert: {
    labelKey: "home2.recent.chipExpert",
    className:
      "border-blue-200 bg-info-surface text-blue-700 shadow-[0_0_8px_-1px_rgba(96,165,250,0.7)]",
  },
  workflow: {
    labelKey: "home2.recent.chipWorkflow",
    className:
      "border-yellow-200 bg-yellow-50 text-yellow-700 shadow-[0_0_8px_-1px_rgba(247,205,51,0.9)]",
  },
  autopilot: {
    labelKey: null,
    className: "border-border-base bg-surface text-foreground-tertiary",
  },
};

export function getActorChip(
  kind: HomeWorkActorKind,
  locale?: Locale,
): ActorChip {
  const chip = ACTOR_CHIPS[kind] ?? ACTOR_CHIPS.autopilot;
  return {
    label: chip.labelKey ? translate(locale, chip.labelKey) : AUTOPILOT_NAME,
    className: chip.className,
  };
}

// The feed spans a week, so the weekday is load-bearing: "Mon 10:45" vs
// three files all labelled "10:45".
export function formatWorkTime(
  value: Date | null | undefined,
  timeZone: string,
  locale?: Locale,
): string {
  if (!value) return translate(locale, "home2.recent.recently");
  return new Intl.DateTimeFormat(intlLocale(locale), {
    timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatGroupCounts(
  group: HomeRecentWorkGroup,
  locale?: Locale,
): string {
  return [
    countLabel(
      group.run_count ?? 0,
      locale,
      "home2.recent.countRunOne",
      "home2.recent.countRunMany",
    ),
    countLabel(
      group.file_count ?? 0,
      locale,
      "home2.recent.countFileOne",
      "home2.recent.countFileMany",
    ),
    countLabel(
      group.integration_count ?? 0,
      locale,
      "home2.recent.countActionOne",
      "home2.recent.countActionMany",
    ),
    countLabel(
      group.schedule_count ?? 0,
      locale,
      "home2.recent.countScheduleOne",
      "home2.recent.countScheduleMany",
    ),
  ]
    .filter(Boolean)
    .join(" · ");
}

function countLabel(
  count: number,
  locale: Locale | undefined,
  oneKey: MessageKey,
  manyKey: MessageKey,
): string | null {
  if (count === 0) return null;
  return translate(locale, count === 1 ? oneKey : manyKey, { count });
}
