import type { MemoryUnderstanding } from "@/app/api/__generated__/models/memoryUnderstanding";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

export interface UnderstandingRow {
  label: string;
  values: string[];
}

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

const FIELDS: [keyof MemoryUnderstanding, MessageKey][] = [
  ["user_name", "settingsRest2.memory.field.name"],
  ["job_title", "settingsRest2.memory.field.jobTitle"],
  ["user_role", "settingsRest2.memory.field.role"],
  ["business_name", "settingsRest2.memory.field.business"],
  ["industry", "settingsRest2.memory.field.industry"],
  ["business_size", "settingsRest2.memory.field.teamSize"],
  ["key_workflows", "settingsRest2.memory.field.keyWorkflows"],
  ["daily_activities", "settingsRest2.memory.field.dailyWork"],
  ["pain_points", "settingsRest2.memory.field.painPoints"],
  ["bottlenecks", "settingsRest2.memory.field.bottlenecks"],
  ["manual_tasks", "settingsRest2.memory.field.manualTasks"],
  ["automation_goals", "settingsRest2.memory.field.goals"],
  ["current_software", "settingsRest2.memory.field.tools"],
  ["existing_automation", "settingsRest2.memory.field.existingAutomation"],
  ["additional_notes", "settingsRest2.memory.field.notes"],
];

export function getUnderstandingRows(
  understanding: MemoryUnderstanding | undefined,
  t: Translate = english,
): UnderstandingRow[] {
  if (!understanding) return [];
  return FIELDS.flatMap(([key, labelKey]) => {
    const values = toValues(understanding[key]);
    return values.length ? [{ label: t(labelKey), values }] : [];
  });
}

function toValues(value: MemoryUnderstanding[keyof MemoryUnderstanding]) {
  if (Array.isArray(value)) return value.filter((item) => item.trim());
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}
