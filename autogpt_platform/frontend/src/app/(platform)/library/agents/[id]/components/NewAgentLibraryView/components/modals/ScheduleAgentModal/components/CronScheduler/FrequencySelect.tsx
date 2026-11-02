"use client";

import React from "react";
import { Select } from "@/components/atoms/Select/Select";
import { useT } from "@/lib/i18n";

type CronFrequency =
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "custom"
  | "every minute";

export function FrequencySelect({
  value,
  onChange,
  selectedMinute,
  onMinuteChange,
}: {
  value: CronFrequency;
  onChange: (v: CronFrequency) => void;
  selectedMinute: string;
  onMinuteChange: (v: string) => void;
}) {
  const t = useT();

  return (
    <>
      <Select
        id="repeat"
        label={t("library1.cron.repeats")}
        size="small"
        value={value}
        onValueChange={(v) => onChange(v as CronFrequency)}
        options={[
          { label: t("library1.cron.everyHour"), value: "hourly" },
          { label: t("library1.cron.daily"), value: "daily" },
          { label: t("library1.cron.weekly"), value: "weekly" },
          { label: t("library1.cron.monthly"), value: "monthly" },
          { label: t("library1.cron.yearly"), value: "yearly" },
          { label: t("library1.cron.custom"), value: "custom" },
        ]}
        className="max-w-80"
      />
      {value === "hourly" && (
        <Select
          id="at-minute"
          label={t("library1.cron.atMinute")}
          size="small"
          value={selectedMinute}
          onValueChange={(v) => onMinuteChange(v)}
          options={["0", "15", "30", "45"].map((m) => ({ label: m, value: m }))}
          className="max-w-32"
        />
      )}
    </>
  );
}
