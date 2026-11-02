"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";
import type { BlockOutputResponse } from "@/app/api/__generated__/models/blockOutputResponse";
import {
  globalRegistry,
  OutputItem,
} from "@/components/contextual/OutputRenderers";
import { resolveForRenderer } from "@/app/(platform)/copilot/tools/ViewAgentOutput/ViewAgentOutput";
import {
  ContentBadge,
  ContentCard,
  ContentCardTitle,
  ContentGrid,
  ContentMessage,
} from "../../../../components/ToolAccordion/AccordionContent";

interface Props {
  output: BlockOutputResponse;
}

const COLLAPSED_LIMIT = 3;

function RenderOutputValue({ value }: { value: unknown }) {
  const resolved = resolveForRenderer(value);
  const renderer = globalRegistry.getRenderer(
    resolved.value,
    resolved.metadata,
  );

  if (renderer) {
    return (
      <OutputItem
        value={resolved.value}
        metadata={resolved.metadata}
        renderer={renderer}
      />
    );
  }

  return null;
}

function OutputKeySection({
  outputKey,
  items,
}: {
  outputKey: string;
  items: unknown[];
}) {
  const t = useT();
  const [expanded, setExpanded] = useState(false);
  const hasMoreItems = items.length > COLLAPSED_LIMIT;
  const visibleItems = expanded ? items : items.slice(0, COLLAPSED_LIMIT);

  return (
    <ContentCard>
      <div className="flex items-center justify-between gap-2">
        <ContentCardTitle className="text-xs">{outputKey}</ContentCardTitle>
        <ContentBadge>
          {t(
            items.length === 1
              ? "chatTools4.runBlock.output.itemOne"
              : "chatTools4.runBlock.output.itemMany",
            { count: items.length },
          )}
        </ContentBadge>
      </div>
      <div className="mt-2">
        {visibleItems.map((item, i) => (
          <RenderOutputValue key={i} value={item} />
        ))}
      </div>
      {hasMoreItems && (
        <Button
          variant="ghost"
          size="small"
          className="mt-1 h-auto px-0 py-0.5 text-caption-sm leading-inherit text-muted-foreground"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded
            ? t("chatTools4.runBlock.output.showLess")
            : t("chatTools4.runBlock.output.showAll", { count: items.length })}
        </Button>
      )}
    </ContentCard>
  );
}

export function BlockOutputCard({ output }: Props) {
  const t = useT();
  return (
    <ContentGrid>
      {output.is_dry_run && (
        <div className="flex items-center gap-1.5 rounded-md border border-warning-border bg-warning-surface px-2.5 py-1.5 text-xs font-medium text-warning-foreground">
          <span>⚡</span>
          <span>{t("chatTools4.runBlock.output.simulated")}</span>
        </div>
      )}
      <ContentMessage>{output.message}</ContentMessage>

      {Object.entries(output.outputs ?? {}).map(([key, items]) => (
        <OutputKeySection key={key} outputKey={key} items={items} />
      ))}
    </ContentGrid>
  );
}
