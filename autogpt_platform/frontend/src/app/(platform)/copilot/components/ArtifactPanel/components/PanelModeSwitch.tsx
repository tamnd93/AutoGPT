"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { cn } from "@/lib/utils";
import { ComputerIcon, LicenseDraftIcon } from "@hugeicons/core-free-icons";
import type { ArtifactPanelMode } from "../../../store";
import { useT, type MessageKey } from "@/lib/i18n";

interface Props {
  mode: ArtifactPanelMode;
  hasArtifact: boolean;
  onChange: (mode: ArtifactPanelMode) => void;
}

const OPTIONS: {
  value: ArtifactPanelMode;
  labelKey: MessageKey;
  icon: typeof ComputerIcon;
}[] = [
  {
    value: "artifact",
    labelKey: "chatFiles1.panelMode.artifact",
    icon: LicenseDraftIcon,
  },
  {
    value: "computer",
    labelKey: "chatFiles1.panelMode.computer",
    icon: ComputerIcon,
  },
];

/** Two faces of one side panel: the document being worked on, or the
 *  machine doing the work. */
export function PanelModeSwitch({ mode, hasArtifact, onChange }: Props) {
  const t = useT();

  return (
    <div
      role="group"
      aria-label={t("chatFiles1.panelMode.groupLabel")}
      className="flex shrink-0 items-center rounded-md bg-surface-hover p-0.5"
    >
      {OPTIONS.map((option) => {
        const active = option.value === mode;
        const disabled = option.value === "artifact" && !hasArtifact;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors",
              active
                ? "bg-surface text-foreground-strong shadow-sm"
                : "text-foreground-tertiary hover:text-foreground-emphasis",
              disabled &&
                "cursor-not-allowed opacity-40 hover:text-foreground-tertiary",
            )}
          >
            <Icon icon={option.icon} size={14} />
            {t(option.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
