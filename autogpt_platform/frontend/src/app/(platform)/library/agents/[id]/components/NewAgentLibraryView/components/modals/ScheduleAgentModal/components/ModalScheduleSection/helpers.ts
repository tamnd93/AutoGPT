import { z } from "zod";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;

export function scheduleFormSchemaFactory(locale: Locale = DEFAULT_LOCALE) {
  return z.object({
    scheduleName: z
      .string()
      .trim()
      .min(1, getMessage(locale, "library1.schedule.nameRequired")),
    time: z
      .string()
      .trim()
      .regex(timeRegex, getMessage(locale, "library1.schedule.timeFormat"))
      .optional(),
  });
}

export type ScheduleFormValues = z.infer<
  ReturnType<typeof scheduleFormSchemaFactory>
>;

export function validateSchedule(
  values: Partial<ScheduleFormValues>,
  locale: Locale = DEFAULT_LOCALE,
): Partial<Record<keyof ScheduleFormValues, string>> {
  const result = scheduleFormSchemaFactory(locale).safeParse({
    scheduleName: values.scheduleName ?? "",
    ...(values.time !== undefined ? { time: values.time } : {}),
  });

  if (result.success) return {};

  const fieldErrors: Partial<Record<keyof ScheduleFormValues, string>> = {};
  for (const issue of result.error.issues) {
    const path = issue.path[0] as keyof ScheduleFormValues | undefined;
    if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
  }
  return fieldErrors;
}
