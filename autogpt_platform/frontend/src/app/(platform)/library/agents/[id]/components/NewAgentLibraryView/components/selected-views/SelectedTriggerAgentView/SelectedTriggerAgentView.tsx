"use client";

import { useGetV2ListTriggerAgents } from "@/app/api/__generated__/endpoints/library/library";
import { useGetV1ListExecutionSchedulesForAGraph } from "@/app/api/__generated__/endpoints/schedules/schedules";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { okData } from "@/app/api/helpers";
import { Text } from "@/components/atoms/Text/Text";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { humanizeCronExpression } from "@/lib/cron-expression-utils";
import { useUserTimezone } from "@/lib/hooks/useUserTimezone";
import { useLocale, useT } from "@/lib/i18n";
import { formatInTimezone, getTimezoneDisplayName } from "@/lib/timezone-utils";
import { LoadingSelectedContent } from "../LoadingSelectedContent";
import { RunDetailCard } from "../RunDetailCard/RunDetailCard";
import { SelectedViewLayout } from "../SelectedViewLayout";
import { SelectedTriggerAgentActions } from "./SelectedTriggerAgentActions";

interface Props {
  agent: LibraryAgent;
  triggerAgentId: string;
  onClearSelectedRun?: () => void;
  banner?: React.ReactNode;
}

export function SelectedTriggerAgentView({
  agent,
  triggerAgentId,
  onClearSelectedRun,
  banner,
}: Props) {
  const { data, isLoading, error } = useGetV2ListTriggerAgents(agent.id, {
    query: { select: okData },
  });

  const triggerAgent = data?.find((t) => t.id === triggerAgentId);

  const {
    data: schedules,
    isLoading: isSchedulesLoading,
    error: schedulesError,
  } = useGetV1ListExecutionSchedulesForAGraph(triggerAgent?.graph_id || "", {
    query: {
      enabled: !!triggerAgent?.graph_id,
      select: okData,
    },
  });

  const locale = useLocale();
  const t = useT();
  const rawUserTimezone = useUserTimezone();
  const displayTimezone =
    rawUserTimezone && rawUserTimezone !== "not-set"
      ? rawUserTimezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone;
  const schedule = schedules?.[0];

  if (error || schedulesError) {
    const queryError = error ?? schedulesError;
    const message =
      queryError instanceof Error
        ? queryError.message
        : queryError != null
          ? String(queryError)
          : t("library3.triggerAgent.loadFailed");
    return <ErrorCard responseError={{ message }} context="trigger workflow" />;
  }

  if (isLoading || !data) {
    return <LoadingSelectedContent agent={agent} />;
  }

  if (!triggerAgent) {
    return (
      <SelectedViewLayout agent={agent} banner={banner}>
        <RunDetailCard title={t("library2.triggerNotFound.title")}>
          <Text variant="body" className="!text-foreground-tertiary">
            {t("library3.triggerAgent.notFoundBody")}
          </Text>
        </RunDetailCard>
      </SelectedViewLayout>
    );
  }

  return (
    <div className="flex h-full w-full gap-4">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <SelectedViewLayout agent={agent} banner={banner}>
          <div className="flex flex-col gap-4">
            <RunDetailCard title={triggerAgent.name}>
              <div className="flex flex-col gap-3">
                {triggerAgent.description ? (
                  <Text variant="body">{triggerAgent.description}</Text>
                ) : (
                  <Text variant="body" className="!text-foreground-tertiary">
                    {t("library3.common.noDescription")}
                  </Text>
                )}
                <Text variant="small" className="!text-foreground-tertiary">
                  {t("library3.triggerAgent.descriptionNote")}
                </Text>
              </div>
            </RunDetailCard>

            {schedule && (
              <RunDetailCard title={t("library2.scheduleView.schedule")}>
                <div className="flex flex-col gap-6">
                  {schedule.graph_version !== triggerAgent.graph_version && (
                    <Text
                      variant="small"
                      // TODO(tokens): no exact role for !text-amber-800 (#92400E)
                      className="rounded-md bg-warning-surface px-3 py-2 !text-amber-800"
                    >
                      {t("library3.triggerAgent.versionWarn", {
                        current: schedule.graph_version,
                        latest: triggerAgent.graph_version,
                      })}
                    </Text>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <Text variant="large-medium">
                      {t("library2.scheduleView.recurrence")}
                    </Text>
                    <Text variant="body" className="flex items-center gap-3">
                      {humanizeCronExpression(schedule.cron, locale)}{" "}
                      <span className="text-foreground-tertiary">&middot;</span>{" "}
                      <span className="text-foreground-tertiary">
                        {getTimezoneDisplayName(
                          displayTimezone || schedule.timezone || "UTC",
                          locale,
                        )}
                      </span>
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Text variant="large-medium">
                      {t("library2.scheduleView.nextRun")}
                    </Text>
                    <Text variant="body" className="flex items-center gap-3">
                      {formatInTimezone(
                        schedule.next_run_time,
                        displayTimezone || "UTC",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        },
                        locale,
                      )}{" "}
                      <span className="text-foreground-tertiary">&middot;</span>{" "}
                      <span className="text-foreground-tertiary">
                        {getTimezoneDisplayName(
                          displayTimezone || schedule.timezone || "UTC",
                          locale,
                        )}
                      </span>
                    </Text>
                  </div>
                </div>
              </RunDetailCard>
            )}

            {!schedule && !isSchedulesLoading && (
              <RunDetailCard title={t("library2.scheduleView.schedule")}>
                <Text variant="body" className="!text-foreground-tertiary">
                  {t("library3.triggerAgent.noSchedule")}
                </Text>
              </RunDetailCard>
            )}
          </div>
        </SelectedViewLayout>
      </div>
      <div className="-mt-2 max-w-[3.75rem] flex-shrink-0">
        <SelectedTriggerAgentActions
          parentAgent={agent}
          triggerAgent={triggerAgent}
          onDeleted={onClearSelectedRun}
        />
      </div>
    </div>
  );
}
