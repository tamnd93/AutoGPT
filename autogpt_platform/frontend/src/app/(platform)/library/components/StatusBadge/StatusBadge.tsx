"use client";

import { cn } from "@/lib/utils";
import type { AgentStatus } from "../../types";
import { useT, type MessageKey } from "@/lib/i18n";

const STATUS_CONFIG: Record<
  AgentStatus,
  { label: string; bg: string; text: string; pulse: boolean }
> = {
  running: {
    label: "library5.status.running",
    bg: "",
    text: "text-info-foreground",
    pulse: true,
  },
  error: {
    label: "library3.common.error",
    bg: "",
    text: "text-error",
    pulse: false,
  },
  listening: {
    label: "library5.status.listening",
    bg: "",
    text: "text-brand",
    pulse: true,
  },
  scheduled: {
    label: "library4.stats.scheduled",
    bg: "",
    text: "text-yellow-600",
    pulse: false,
  },
  idle: {
    label: "library4.stats.idle",
    bg: "",
    text: "text-foreground-tertiary",
    pulse: false,
  },
};

interface Props {
  status: AgentStatus;
  className?: string;
}

export function StatusBadge({ status, className }: Props) {
  const t = useT();
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          config.pulse && "animate-pulse",
          statusDotColor(status),
        )}
      />
      {t(config.label as MessageKey)}
    </span>
  );
}

function statusDotColor(status: AgentStatus): string {
  switch (status) {
    case "running":
      return "bg-info";
    case "error":
      return "bg-error";
    case "listening":
      return "bg-brand";
    case "scheduled":
      return "bg-yellow-500";
    case "idle":
      return "bg-zinc-400";
  }
}
