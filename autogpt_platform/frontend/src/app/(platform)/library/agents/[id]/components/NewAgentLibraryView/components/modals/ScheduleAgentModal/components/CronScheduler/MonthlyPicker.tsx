"use client";

import React from "react";
import { Text } from "@/components/atoms/Text/Text";
import { MultiToggle } from "@/components/molecules/MultiToggle/MultiToggle";
import { useT } from "@/lib/i18n";

export function MonthlyPicker({
  values,
  onChange,
}: {
  values: number[];
  onChange: (v: number[]) => void;
}) {
  const t = useT();

  function allDays() {
    onChange(Array.from({ length: 31 }, (_, i) => i + 1));
  }
  function customize() {
    onChange([]);
  }
  const items = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));
  const selected = values.map((v) => String(v));

  return (
    <div className="mb-6 space-y-2">
      <Text variant="body-medium" as="span" className="text-foreground-base">
        {t("library1.monthly.daysOfMonth")}
      </Text>
      <div className="flex gap-2">
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className={`h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover`}
          onClick={allDays}
        >
          {t("library1.monthly.allDays")}
        </button>
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className={`h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover`}
          onClick={customize}
        >
          {t("library1.monthly.customize")}
        </button>
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className="h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover"
          onClick={() => onChange([15])}
        >
          {t("library1.monthly.fifteenth")}
        </button>
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className="h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover"
          onClick={() => onChange([31])}
        >
          {t("library1.monthly.lastDay")}
        </button>
      </div>

      {values.length < 31 && (
        <MultiToggle
          items={items}
          selectedValues={selected}
          onChange={(sv) => onChange(sv.map((s) => parseInt(s)))}
          aria-label={t("library1.monthly.selectDaysAria")}
        />
      )}
    </div>
  );
}
