"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";
import { GridViewIcon, ListViewIcon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { ArtifactsView } from "../../useArtifactsPage";

interface Props {
  value: ArtifactsView;
  onChange: (view: ArtifactsView) => void;
}

interface Option {
  value: ArtifactsView;
  labelKey: MessageKey;
  icon: IconSvgElement;
}

const OPTIONS: Option[] = [
  { value: "grid", labelKey: "artifacts3.view.grid", icon: GridViewIcon },
  { value: "list", labelKey: "artifacts3.view.list", icon: ListViewIcon },
];

export function ViewToggle({ value, onChange }: Props) {
  const t = useT();
  return (
    <div
      role="group"
      aria-label={t("artifacts3.view.layout")}
      className="flex items-center gap-1"
      data-testid="artifacts-view-toggle"
    >
      {OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-label={t(option.labelKey)}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              // TODO(tokens): no fitting role for focus-visible:ring-zinc-400 #ADADB3; #ADADB3 is foreground-subtle, a text colour
              "flex h-9 w-9 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400",
              active
                ? "bg-surface-hover text-foreground-strong"
                : "text-foreground-tertiary hover:bg-surface-hover/70 hover:text-foreground-strong",
            )}
            data-testid={`artifacts-view-${option.value}`}
          >
            <Icon icon={option.icon} size={18} />
          </button>
        );
      })}
    </div>
  );
}
