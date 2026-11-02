import { useDeleteV1DeleteExecutionSchedule } from "@/app/api/__generated__/endpoints/schedules/schedules";
import type { GraphExecutionJobInfo } from "@/app/api/__generated__/models/graphExecutionJobInfo";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { safeHumanizeCronExpression } from "@/lib/cron-expression-utils";
import { invalidateAllScheduleQueries } from "@/services/schedules/invalidate-schedules";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { vi as dateFnsVi } from "date-fns/locale";
import { useLocale, useT } from "@/lib/i18n";
import { useState } from "react";

interface Args {
  schedule: GraphExecutionJobInfo;
}

export function useGraphScheduleListItem({ schedule }: Args) {
  const t = useT();
  const locale = useLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const { mutateAsync: deleteSchedule, isPending: isDeleting } =
    useDeleteV1DeleteExecutionSchedule();

  const nextRunDate = schedule.next_run_time
    ? new Date(schedule.next_run_time)
    : null;
  const nextRunRelative =
    nextRunDate && !Number.isNaN(nextRunDate.valueOf())
      ? formatDistanceToNow(nextRunDate, {
          addSuffix: true,
          locale: locale === "vi" ? dateFnsVi : undefined,
        })
      : null;
  // One source of truth: the row prefixes it, the View dialog shows it bare.
  const nextRunValue = nextRunRelative
    ? nextRunRelative
    : schedule.next_run_time
      ? t("schedule1.graph.pending")
      : t("schedule1.graph.paused");
  const nextRunLabel = nextRunRelative
    ? t("schedule1.followup.nextRun", { relative: nextRunRelative })
    : nextRunValue;
  const nextRunTitle = nextRunDate ? nextRunDate.toString() : undefined;

  const recurrenceLabel = schedule.cron
    ? safeHumanizeCronExpression(schedule.cron)
    : t("schedule1.followup.runsOnce");

  const agentLabel =
    schedule.agent_name ||
    schedule.name ||
    t("schedule1.graph.scheduledWorkflow");
  const agentHref = `/build?flowID=${schedule.graph_id}&flowVersion=${schedule.graph_version}`;

  function openDelete() {
    setIsDeleteOpen(true);
  }
  function closeDelete(open: boolean) {
    setIsDeleteOpen(open);
  }
  function openView() {
    setIsViewOpen(true);
  }
  function closeView(open: boolean) {
    setIsViewOpen(open);
  }

  async function handleDelete() {
    try {
      await deleteSchedule({ scheduleId: schedule.id });
      toast({ title: t("schedule1.graph.deleted") });
      setIsDeleteOpen(false);
      invalidateAllScheduleQueries(queryClient, schedule.graph_id);
    } catch (error) {
      toast({
        title: t("schedule1.graph.deleteFailedTitle"),
        description:
          error instanceof Error
            ? error.message
            : t("schedule1.followup.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  return {
    nextRunLabel,
    nextRunValue,
    nextRunTitle,
    recurrenceLabel,
    agentLabel,
    agentHref,
    isDeleteOpen,
    openDelete,
    closeDelete,
    isDeleting,
    handleDelete,
    isViewOpen,
    openView,
    closeView,
  };
}
