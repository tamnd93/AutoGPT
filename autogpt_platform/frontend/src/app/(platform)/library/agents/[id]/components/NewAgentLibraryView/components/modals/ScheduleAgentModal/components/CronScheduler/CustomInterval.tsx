"use client";

import React from "react";
import { Input } from "@/components/atoms/Input/Input";
import { Select } from "@/components/atoms/Select/Select";
import { useT } from "@/lib/i18n";

export function CustomInterval({
  value,
  onChange,
}: {
  value: { value: number; unit: "minutes" | "hours" | "days" };
  onChange: (v: { value: number; unit: "minutes" | "hours" | "days" }) => void;
}) {
  const t = useT();

  return (
    <div className="flex items-end gap-3">
      <Input
        id="custom-interval-value"
        label={t("library1.cron.every")}
        type="number"
        min={1}
        value={value.value}
        onChange={(e) =>
          onChange({ ...value, value: parseInt(e.target.value || "1") })
        }
        className="max-w-24"
        size="small"
      />
      <Select
        id="custom-interval-unit"
        label={t("library1.cron.interval")}
        size="small"
        value={value.unit}
        onValueChange={(v) => onChange({ ...value, unit: v as any })}
        options={[
          { label: t("library1.cron.minutes"), value: "minutes" },
          { label: t("library1.cron.hours"), value: "hours" },
          { label: t("library1.cron.days"), value: "days" },
        ]}
        className="max-w-40"
      />
    </div>
  );
}
