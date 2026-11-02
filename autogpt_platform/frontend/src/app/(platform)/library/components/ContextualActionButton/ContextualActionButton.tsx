"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { AgentStatus } from "../../types";
import {
  ComputerVideoIcon,
  EyeIcon,
  ReloadIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT, type MessageKey } from "@/lib/i18n";

interface Props {
  status: AgentStatus;
  agentID: string;
  executionID?: string;
  className?: string;
}

export function ContextualActionButton({
  status,
  agentID,
  executionID,
  className,
}: Props) {
  const t = useT();
  const router = useRouter();

  const config = ACTION_CONFIG[status];
  if (!config) return null;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const params = new URLSearchParams();
    if (executionID) params.set("activeItem", executionID);
    const query = params.toString();
    router.push(`/library/agents/${agentID}${query ? `?${query}` : ""}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-body-sm font-medium leading-inherit text-foreground-secondary transition-colors hover:bg-surface-muted hover:text-foreground-emphasis",
        className,
      )}
    >
      <Icon icon={config.icon} size={12} className="shrink-0" />
      {t(config.labelKey)}
    </button>
  );
}

const ACTION_CONFIG: Record<
  AgentStatus,
  { labelKey: MessageKey; icon: IconSvgElement }
> = {
  error: { labelKey: "library4.action.viewError", icon: EyeIcon },
  listening: { labelKey: "library4.action.reconnect", icon: ReloadIcon },
  running: { labelKey: "library4.action.watchLive", icon: ComputerVideoIcon },
  idle: { labelKey: "library4.action.view", icon: EyeIcon },
  scheduled: { labelKey: "library4.action.view", icon: EyeIcon },
};
