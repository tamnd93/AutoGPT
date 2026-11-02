"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { SuggestedTaskList } from "./SuggestedTaskList";
import type { useSuggestedTasks } from "./useSuggestedTasks";

interface Props {
  suggestions: ReturnType<typeof useSuggestedTasks>;
  disabled?: boolean;
}

// The greeting's list after the greeting has retired: under the composer
// until every row is hidden.
export function SuggestedTasksBlock({ suggestions, disabled }: Props) {
  const t = useT();
  if (!suggestions.isStored || suggestions.tasks.length === 0) return null;

  return (
    <section
      className="group/block mx-auto mb-6 w-full max-w-[42rem] text-left"
      aria-label={t("home1.suggested.label")}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <Text variant="eyebrow">{t("home1.suggested.label")}</Text>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={suggestions.hideAll}
          disabled={suggestions.sendingId !== null}
          className="text-foreground-subtle opacity-0 transition-opacity duration-150 hover:text-foreground-body focus-visible:opacity-100 group-focus-within/block:opacity-100 group-hover/block:opacity-100 [@media(hover:none)]:opacity-100"
        >
          {t("home1.suggested.hideAll")}
        </Button>
      </div>
      <SuggestedTaskList
        tasks={suggestions.tasks}
        sendingId={suggestions.sendingId}
        disabled={disabled}
        onSend={suggestions.sendTask}
        onHide={suggestions.hideTask}
      />
    </section>
  );
}
