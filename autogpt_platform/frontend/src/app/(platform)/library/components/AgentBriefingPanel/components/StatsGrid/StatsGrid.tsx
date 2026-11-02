"use client";

import { Text } from "@/components/atoms/Text/Text";
import { OverflowText } from "@/components/atoms/OverflowText/OverflowText";
import { Emoji } from "@/components/atoms/Emoji/Emoji";
import { cn } from "@/lib/utils";
import { formatCents } from "@/app/(platform)/copilot/components/usageHelpers";
import { useIsBillingEnabled } from "@/hooks/useIsBillingEnabled";
import type { FleetSummary, AgentStatusFilter } from "../../../../types";
import { useT, type MessageKey } from "@/lib/i18n";

interface Props {
  summary: FleetSummary;
  activeTab: AgentStatusFilter;
  onTabChange: (tab: AgentStatusFilter) => void;
}

const TILES: {
  labelKey: MessageKey;
  key: keyof FleetSummary;
  format?: (v: number) => string;
  filter: AgentStatusFilter;
  emoji: string;
  color: string;
}[] = [
  {
    labelKey: "library4.stats.spent",
    key: "monthlySpend",
    format: formatCents,
    filter: "all",
    emoji: "💵",
    color: "text-foreground-body",
  },
  {
    labelKey: "library4.stats.running",
    key: "running",
    filter: "running",
    emoji: "🚩",
    color: "text-info-foreground",
  },
  {
    labelKey: "library4.stats.completed",
    key: "completed",
    filter: "completed",
    emoji: "🗃️",
    color: "text-success",
  },
  {
    labelKey: "library4.stats.attention",
    key: "error",
    filter: "attention",
    emoji: "⚠️",
    color: "text-error",
  },
  {
    labelKey: "library4.stats.scheduled",
    key: "scheduled",
    filter: "scheduled",
    emoji: "📅",
    color: "text-yellow-600",
  },
  {
    labelKey: "library4.stats.idle",
    key: "idle",
    filter: "idle",
    emoji: "💤",
    color: "text-foreground-subtle",
  },
];

export function StatsGrid({ summary, activeTab, onTabChange }: Props) {
  const t = useT();
  const isBillingEnabled = useIsBillingEnabled();
  const tiles = isBillingEnabled
    ? TILES
    : TILES.filter((tile) => tile.key !== "monthlySpend");

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 min-[450px]:grid-cols-2 sm:grid-cols-3",
        isBillingEnabled ? "lg:grid-cols-6" : "lg:grid-cols-5",
      )}
    >
      {tiles.map((tile) => {
        const rawValue = summary[tile.key];
        const value = tile.format ? tile.format(rawValue) : rawValue;
        const isActive = activeTab === tile.filter;

        return (
          <button
            key={tile.labelKey}
            type="button"
            aria-pressed={isActive}
            // A second click goes back to the overview, which has no tile of
            // its own when billing is off.
            onClick={() => onTabChange(isActive ? "all" : tile.filter)}
            className={cn(
              "flex min-w-0 flex-col gap-1 rounded-medium border p-3 text-left shadow-md transition-all hover:shadow-lg",
              isActive
                ? "border-action-hover bg-surface-muted"
                : "border-separator bg-surface",
            )}
          >
            <div className="flex min-w-0 items-center gap-1.5">
              <Emoji text={tile.emoji} size={18} />
              <OverflowText
                value={t(tile.labelKey)}
                variant="body"
                className="text-foreground-emphasis"
              />
            </div>
            <Text variant="h4">{value}</Text>
          </button>
        );
      })}
    </div>
  );
}
