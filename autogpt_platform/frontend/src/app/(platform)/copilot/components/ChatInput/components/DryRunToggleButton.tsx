"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipPortal,
} from "@/components/atoms/Tooltip/BaseTooltip";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { FlaskConicalIcon } from "@hugeicons/core-free-icons";

// This button is only rendered on NEW chats (no active session).
// Once a session exists, it is hidden — the session's dry_run flag is
// locked and surfaced via the banner in CopilotPage.tsx instead.

interface Props {
  isDryRun: boolean;
  onToggle: () => void;
}

export function DryRunToggleButton({ isDryRun, onToggle }: Props) {
  const t = useT();
  const tooltip = isDryRun
    ? t("chatInput1.dryRun.onTooltip")
    : t("chatInput1.dryRun.offTooltip");
  const ariaLabel = isDryRun
    ? t("chatInput1.dryRun.activeAria")
    : t("chatInput1.dryRun.enableAria");

  return (
    <Tooltip inheritDelay>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-pressed={isDryRun}
          onClick={onToggle}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-hover",
            isDryRun
              ? // TODO(tokens): no exact role for text-amber-600
                "text-amber-600 hover:text-warning-foreground"
              : "text-foreground-tertiary hover:text-foreground-body",
          )}
          aria-label={ariaLabel}
        >
          <Icon icon={FlaskConicalIcon} size={16} />
        </button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>{tooltip}</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
