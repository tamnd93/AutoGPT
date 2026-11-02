"use client";

import {
  Alert01Icon,
  Calendar03Icon,
  ConferenceIcon,
  PauseIcon,
} from "@hugeicons/core-free-icons";
import type { TeamFilter } from "../../helpers";
import { useT } from "@/lib/i18n";
import { PillFilterMenu } from "../PillFilterMenu";

const OPTIONS = [
  { value: "all", labelKey: "team9.filter.all", icon: ConferenceIcon },
  { value: "scheduled", labelKey: "team9.filter.scheduled", icon: Calendar03Icon },
  { value: "needs-setup", labelKey: "team9.filter.needsSetup", icon: Alert01Icon },
  { value: "paused", labelKey: "team9.filter.paused", icon: PauseIcon },
] as const;

interface Props {
  value: TeamFilter;
  onChange: (next: TeamFilter) => void;
}

export function TeamFilterMenu({ value, onChange }: Props) {
  const t = useT();
  const options = OPTIONS.map((option) => ({
    ...option,
    label: t(option.labelKey),
  }));
  return (
    <PillFilterMenu
      label={t("team9.filter.label")}
      value={value}
      defaultValue="all"
      options={options}
      onChange={onChange}
    />
  );
}
