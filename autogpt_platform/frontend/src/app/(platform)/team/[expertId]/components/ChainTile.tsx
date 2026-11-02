"use client";

import { ExpertWorkflowChainItem } from "@/app/api/__generated__/models/expertWorkflowChainItem";
import { ExpertWorkflowChainItemKind } from "@/app/api/__generated__/models/expertWorkflowChainItemKind";
import { Icon } from "@/components/atoms/Icon/Icon";
import { IntegrationLogo } from "@/components/molecules/IntegrationLogo/IntegrationLogo";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";
import {
  AiChat02Icon,
  FlashIcon,
  FileExportIcon,
  InputCursorTextIcon,
  Plug01Icon,
  Robot01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

const KIND_ICONS: Record<
  ExpertWorkflowChainItemKind,
  { icon: IconSvgElement; labelKey: MessageKey }
> = {
  integration: { icon: Plug01Icon, labelKey: "team5.chain.kind.integration" },
  input: { icon: InputCursorTextIcon, labelKey: "team5.chain.kind.input" },
  output: { icon: FileExportIcon, labelKey: "team5.chain.kind.output" },
  trigger: { icon: FlashIcon, labelKey: "team5.chain.kind.trigger" },
  agent: { icon: Robot01Icon, labelKey: "team5.chain.kind.agent" },
  ai: { icon: AiChat02Icon, labelKey: "team5.chain.kind.ai" },
  mcp: { icon: Plug01Icon, labelKey: "team5.chain.kind.mcp" },
  human: { icon: UserCheck01Icon, labelKey: "team5.chain.kind.human" },
};

interface Props {
  item: ExpertWorkflowChainItem;
  size: "sm" | "md";
}

export function ChainTile({ item, size }: Props) {
  const t = useT();
  const fallback = KIND_ICONS[item.kind];
  const isSmall = size === "sm";
  return (
    <span
      className={cn(
        "flex items-center justify-center bg-surface ring-1 ring-border-base/70",
        isSmall ? "size-9 rounded-lg" : "size-12 rounded-xl",
      )}
    >
      {item.provider ? (
        <IntegrationLogo provider={item.provider} size={isSmall ? 16 : 22} />
      ) : (
        <Icon
          icon={fallback.icon}
          size={isSmall ? 16 : 20}
          role="img"
          aria-label={t(fallback.labelKey)}
          className="text-foreground-secondary"
        />
      )}
    </span>
  );
}
