import { useState } from "react";
import type { HomeAttentionItem } from "@/app/api/__generated__/models/homeAttentionItem";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { useAttentionDecisions } from "./useAttentionDecisions";
import { useHeldReview } from "./useHeldReview";
import { useReviewCarousel } from "./useReviewCarousel";

interface Args {
  items: HomeAttentionItem[];
}

type AttentionFilter = "all" | HomeAttentionItem["kind"];

const FILTER_LABEL_KEYS: Partial<Record<AttentionFilter, MessageKey>> = {
  all: "home1.needsYou.filter.all",
  approval: "home1.needsYou.filter.approval",
  setup: "home1.needsYou.filter.setup",
  paused: "home1.needsYou.filter.paused",
  credits: "home1.needsYou.filter.credits",
  question: "home1.needsYou.filter.question",
};

export function useNeedsYou({ items }: Args) {
  const t = useT();
  const { pendingIDs, decide } = useAttentionDecisions();
  const held = useHeldReview({ items });
  const carousel = useReviewCarousel({ rows: held.rows, held });
  const [activeKind, setActiveKind] = useState<AttentionFilter>("all");
  const filterKinds = Array.from(new Set(items.map((item) => item.kind)));
  const selectedKind: AttentionFilter =
    activeKind !== "all" && filterKinds.includes(activeKind)
      ? activeKind
      : "all";
  const visibleRows =
    selectedKind === "all"
      ? held.rows
      : held.rows.filter((row) => row.item.kind === selectedKind);

  function selectKind(kind: AttentionFilter) {
    setActiveKind(kind);
  }

  return {
    visibleRows,
    pendingCount: held.pendingCount,
    filterOptions: (["all", ...filterKinds] as AttentionFilter[]).map(
      (value) => {
        const labelKey = FILTER_LABEL_KEYS[value];
        return { value, label: labelKey ? t(labelKey) : value };
      },
    ),
    hasFilters: filterKinds.length > 1,
    selectedKind,
    selectKind,
    pendingIDs,
    decide,
    held,
    carousel,
  };
}
