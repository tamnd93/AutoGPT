"use client";

import React from "react";
import { Text } from "@/components/atoms/Text/Text";
import { MultiToggle } from "@/components/molecules/MultiToggle/MultiToggle";
import { useT } from "@/lib/i18n";

const WEEK_DAYS = [0, 1, 2, 3, 4, 5, 6] as const;
const WEEK_DAY_KEYS = [
  "library1.weekly.sun",
  "library1.weekly.mon",
  "library1.weekly.tue",
  "library1.weekly.wed",
  "library1.weekly.thu",
  "library1.weekly.fri",
  "library1.weekly.sat",
] as const;

export function WeeklyPicker({
  values,
  onChange,
}: {
  values: number[];
  onChange: (v: number[]) => void;
}) {
  const t = useT();
  const weekDays = WEEK_DAYS.map((value, index) => ({
    value,
    label: t(WEEK_DAY_KEYS[index]),
  }));

  function toggleAll() {
    if (values.length === weekDays.length) onChange([]);
    else onChange(weekDays.map((d) => d.value));
  }
  function setWeekdays() {
    onChange([1, 2, 3, 4, 5]);
  }
  function setWeekends() {
    onChange([0, 6]);
  }
  const items = weekDays.map((d) => ({
    value: String(d.value),
    label: d.label,
  }));
  const selectedValues = values.map((v) => String(v));

  return (
    <div className="mb-8 space-y-3">
      <Text variant="body-medium" as="span" className="text-foreground-base">
        {t("library1.weekly.repeatsOn")}
      </Text>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className="h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover"
          onClick={toggleAll}
        >
          {t("library1.weekly.selectAll")}
        </button>
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className="h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover"
          onClick={setWeekdays}
        >
          {t("library1.weekly.weekdays")}
        </button>
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className="h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover"
          onClick={setWeekends}
        >
          {t("library1.weekly.weekends")}
        </button>
      </div>
      <MultiToggle
        items={items}
        selectedValues={selectedValues}
        onChange={(sv) => onChange(sv.map((s) => parseInt(s)))}
        aria-label={t("library1.weekly.selectDaysAria")}
      />
    </div>
  );
}
