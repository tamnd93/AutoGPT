"use client";

import React from "react";
import { Text } from "@/components/atoms/Text/Text";
import { MultiToggle } from "@/components/molecules/MultiToggle/MultiToggle";
import { useT } from "@/lib/i18n";

export function YearlyPicker({
  values,
  onChange,
}: {
  values: number[];
  onChange: (v: number[]) => void;
}) {
  const t = useT();
  const months = [
    t("library1.yearly.jan"),
    t("library1.yearly.feb"),
    t("library1.yearly.mar"),
    t("library1.yearly.apr"),
    t("library1.yearly.may"),
    t("library1.yearly.jun"),
    t("library1.yearly.jul"),
    t("library1.yearly.aug"),
    t("library1.yearly.sep"),
    t("library1.yearly.oct"),
    t("library1.yearly.nov"),
    t("library1.yearly.dec"),
  ].map((label, index) => ({ label, value: index + 1 }));

  function toggleAll() {
    if (values.length === months.length) onChange([]);
    else onChange(months.map((m) => m.value));
  }
  const items = months.map((m) => ({ value: String(m.value), label: m.label }));
  const selected = values.map((v) => String(v));

  return (
    <div className="mb-6 space-y-2">
      <Text variant="body-medium" as="span" className="text-foreground-base">
        {t("library1.yearly.months")}
      </Text>
      <div className="flex gap-2">
        <button
          type="button"
          // TODO(tokens): no fitting role for border-zinc-700 #505057; #505057 is foreground-body, a text colour
          className="h-[2.25rem] rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium leading-4 text-foreground-base hover:bg-surface-hover"
          onClick={toggleAll}
        >
          {values.length === months.length
            ? t("library1.yearly.deselectAll")
            : t("library1.yearly.selectAll")}
        </button>
      </div>
      <MultiToggle
        items={items}
        selectedValues={selected}
        onChange={(sv) => onChange(sv.map((s) => parseInt(s)))}
        aria-label={t("library1.yearly.selectMonthsAria")}
      />
    </div>
  );
}
