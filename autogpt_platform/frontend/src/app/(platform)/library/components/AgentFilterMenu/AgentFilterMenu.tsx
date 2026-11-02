"use client";

import type { SelectOption } from "@/components/atoms/Select/Select";
import { Select } from "@/components/atoms/Select/Select";
import type { AgentStatusFilter, FleetSummary } from "../../types";
import { FunnelIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  value: AgentStatusFilter;
  onChange: (value: AgentStatusFilter) => void;
  summary: FleetSummary;
}

function buildOptions(
  summary: FleetSummary,
  t: ReturnType<typeof useT>,
): SelectOption[] {
  return [
    { value: "all", label: t("library4.filter.all") },
    {
      value: "running",
      label: t("library4.filter.running", { count: summary.running }),
    },
    {
      value: "attention",
      label: t("library4.filter.attention", { count: summary.error }),
    },
    {
      value: "listening",
      label: t("library4.filter.listening", { count: summary.listening }),
    },
    {
      value: "scheduled",
      label: t("library4.filter.scheduled", { count: summary.scheduled }),
    },
    {
      value: "idle",
      label: t("library4.filter.idle", { count: summary.idle }),
    },
    { value: "healthy", label: t("library4.filter.healthy") },
  ];
}

export function AgentFilterMenu({ value, onChange, summary }: Props) {
  const t = useT();
  function handleChange(val: string) {
    onChange(val as AgentStatusFilter);
  }

  const options = buildOptions(summary, t);

  return (
    <div className="flex items-center" data-testid="agent-filter-dropdown">
      <span className="hidden whitespace-nowrap text-sm text-foreground-tertiary sm:inline">
        {t("library4.filter.hint")}
      </span>
      <Icon icon={FunnelIcon} className="ml-1 h-4 w-4 sm:hidden" />
      <Select
        id="agent-status-filter"
        label={t("library4.filter.label")}
        hideLabel
        value={value}
        onValueChange={handleChange}
        options={options}
        size="small"
        className="ml-1 w-fit border-none !bg-transparent text-sm underline underline-offset-4 shadow-none"
        wrapperClassName="mb-0"
      />
    </div>
  );
}
