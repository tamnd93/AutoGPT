"use client";

import { Button } from "@/components/atoms/Button/Button";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { NEW_SCHEDULED_TASK_PROMPT } from "../guidedPrompts";
import { EmptyFollowups } from "./components/EmptyFollowups/EmptyFollowups";
import { FollowupListItem } from "./components/FollowupListItem/FollowupListItem";
import { GraphScheduleListItem } from "./components/GraphScheduleListItem/GraphScheduleListItem";
import { PausedChatListItem } from "./components/PausedChatListItem/PausedChatListItem";
import { useSchedulesPanel } from "./useSchedulesPanel";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  onGuidedPrompt: (prompt: string) => void;
  withHeading?: boolean;
}

export function SchedulesPanel({ onGuidedPrompt, withHeading = true }: Props) {
  const t = useT();
  const { schedules, paused, isLoading, error, partialError } =
    useSchedulesPanel();

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          {withHeading && <Text variant="h2">{t("schedule1.panel.title")}</Text>}
          <Text variant="body" className="!text-foreground-tertiary">
            {t("schedule1.panel.body")}
          </Text>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Button
            variant="primary"
            size="small"
            onClick={() => onGuidedPrompt(NEW_SCHEDULED_TASK_PROMPT)}
            data-testid="schedule-new-button"
          >
            <Icon icon={PlusSignIcon} className="mr-1 h-4 w-4" />
            {t("schedule1.panel.newTask")}
          </Button>
        </div>
      </header>

      {partialError && (
        <Text
          variant="body"
          className="rounded-md border border-warning-border bg-warning-surface px-3 py-2 !text-warning-foreground"
          data-testid="schedules-partial-error"
        >
          {t("schedule1.panel.partialError")}
        </Text>
      )}

      {paused.length > 0 && (
        <ul
          className="flex flex-col gap-3"
          data-testid="paused-chats-list"
          aria-label={t("schedule1.panel.pausedAria")}
        >
          {paused.map((chat) => (
            <li key={`paused:${chat.schedule_key}`}>
              <PausedChatListItem paused={chat} />
            </li>
          ))}
        </ul>
      )}

      {error ? (
        <ErrorCard
          responseError={{
            message:
              error instanceof Error
                ? error.message
                : t("schedule1.panel.loadFailed"),
          }}
          context={t("schedule1.panel.errorContext")}
        />
      ) : isLoading ? (
        <div
          className="flex items-center justify-center py-16"
          data-testid="followups-loading"
        >
          <LoadingSpinner />
        </div>
      ) : schedules.length === 0 ? (
        paused.length === 0 && <EmptyFollowups />
      ) : (
        <ul
          className="flex flex-col gap-3"
          data-testid="followups-list"
          aria-label={t("schedule1.panel.itemsAria")}
        >
          {schedules.map((schedule) => (
            <li key={`${schedule.kind}:${schedule.item.id}`}>
              {schedule.kind === "copilot_turn" ? (
                <FollowupListItem followup={schedule.item} />
              ) : (
                <GraphScheduleListItem schedule={schedule.item} />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
