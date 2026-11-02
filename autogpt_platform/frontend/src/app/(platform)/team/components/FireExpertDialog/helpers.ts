import { ExpertDetachPreview } from "@/app/api/__generated__/models/expertDetachPreview";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export interface PauseItem {
  id: string;
  name: string;
}

export function getPauseItems(
  preview: ExpertDetachPreview | null,
): PauseItem[] {
  if (!preview) return [];
  // Type-prefixed ids keep list keys unique even when a schedule and a trigger
  // happen to share the same display name.
  return [
    ...preview.schedule_names.map((name, index) => ({
      id: `schedule-${index}`,
      name,
    })),
    ...preview.trigger_names.map((name, index) => ({
      id: `trigger-${index}`,
      name,
    })),
  ];
}

export function getAutomationLine(
  count: number,
  locale: Locale = DEFAULT_LOCALE,
) {
  if (count === 0) return getMessage(locale, "team8.fire.automationNone");
  return getMessage(
    locale,
    count === 1 ? "team8.fire.automationOne" : "team8.fire.automationMany",
    { count },
  );
}

export function getFireSummary(
  preview: ExpertDetachPreview | null,
  locale: Locale = DEFAULT_LOCALE,
) {
  const items = getPauseItems(preview);
  return {
    items,
    automationLine: getAutomationLine(items.length, locale),
  };
}
