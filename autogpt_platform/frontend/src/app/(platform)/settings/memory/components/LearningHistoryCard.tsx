"use client";

import type { Expert } from "@/app/api/__generated__/models/expert";
import type { LearningHistoryItem } from "@/app/api/__generated__/models/learningHistoryItem";
import { Select } from "@/components/atoms/Select/Select";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import { formatWhen } from "../helpers";
import { originFilters, stateFilters } from "../useLearningHistory";

interface Props {
  items: LearningHistoryItem[];
  isLoading: boolean;
  experts: Expert[];
  origin: string;
  state: string;
  onOriginChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onOpen: (item: LearningHistoryItem) => void;
}

export function LearningHistoryCard({
  items,
  isLoading,
  experts,
  origin,
  state,
  onOriginChange,
  onStateChange,
  onOpen,
}: Props) {
  const t = useT();
  const locale = useLocale();

  function expertName(expertId: string | null | undefined) {
    if (!expertId) return t("settingsRest2.memory.learning.otto");
    return (
      experts.find((expert) => expert.id === expertId)?.name ??
      t("settingsRest2.memory.learning.expertFallback")
    );
  }
  return (
    <div
      className="flex flex-col rounded-[18px] border border-border-base bg-surface px-4 py-4 shadow-[0_1px_2px_rgba(15,15,20,0.04)]"
      data-testid="learning-history-card"
    >
      <Text variant="body-medium" as="span" className="text-textBlack">
        {t("settingsRest2.memory.learning.title")}
      </Text>
      <Text variant="small" as="span" className="text-foreground-tertiary">
        {t("settingsRest2.memory.learning.body")}
      </Text>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Select
          id="learning-origin"
          label={t("settingsRest2.memory.learning.origin")}
          hideLabel
          size="small"
          value={origin}
          onValueChange={onOriginChange}
          options={originFilters(locale)}
        />
        <Select
          id="learning-state"
          label={t("settingsRest2.memory.learning.state")}
          hideLabel
          size="small"
          value={state}
          onValueChange={onStateChange}
          options={stateFilters(locale)}
        />
      </div>
      <div className="mt-2 flex flex-col divide-y divide-separator">
        {isLoading ? (
          <div className="flex flex-col gap-2 py-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        ) : items.length === 0 ? (
          <Text
            variant="small"
            as="p"
            className="py-3 text-foreground-tertiary"
          >
            {t("settingsRest2.memory.learning.empty")}
          </Text>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-col gap-0.5 py-2.5">
              <div className="flex items-center justify-between gap-3">
                <Text
                  variant="small-medium"
                  as="span"
                  className="min-w-0 truncate text-textBlack"
                >
                  {item.skill_name ? (
                    <button
                      type="button"
                      className="underline-offset-2 hover:underline"
                      onClick={() => onOpen(item)}
                    >
                      {item.skill_name}
                      {item.version ? ` v${item.version}` : ""}
                    </button>
                  ) : (
                    t("settingsRest2.memory.learning.review")
                  )}
                </Text>
                <Text
                  variant="small"
                  as="span"
                  className="shrink-0 text-foreground-subtle"
                >
                  {formatWhen(item.created_at, locale)}
                </Text>
              </div>
              <Text
                variant="small"
                as="span"
                className="text-foreground-secondary"
              >
                {item.summary}
              </Text>
              <Text
                variant="small"
                as="span"
                className="text-foreground-tertiary"
              >
                {[
                  expertName(item.expert_id),
                  item.origin_label,
                  item.state_label,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </Text>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
