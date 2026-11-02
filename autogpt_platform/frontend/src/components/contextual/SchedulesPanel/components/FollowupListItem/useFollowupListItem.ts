import { useDeleteV1DeleteExecutionSchedule } from "@/app/api/__generated__/endpoints/schedules/schedules";
import type { CopilotTurnJobInfo } from "@/app/api/__generated__/models/copilotTurnJobInfo";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { safeHumanizeCronExpression } from "@/lib/cron-expression-utils";
import { invalidateAllScheduleQueries } from "@/services/schedules/invalidate-schedules";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { vi as dateFnsVi } from "date-fns/locale";
import { useLocale, useT } from "@/lib/i18n";
import { useState } from "react";
import { describeFollowup, formatNextRunTitle } from "./helpers";

interface Args {
  followup: CopilotTurnJobInfo;
}

export function useFollowupListItem({ followup }: Args) {
  const t = useT();
  const locale = useLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const { mutateAsync: deleteSchedule, isPending: isDeleting } =
    useDeleteV1DeleteExecutionSchedule();

  const { messagePreview, sessionHref } = describeFollowup(followup);

  const nextRunDate = followup.next_run_time
    ? new Date(followup.next_run_time)
    : null;
  const nextRunLabel =
    nextRunDate && !Number.isNaN(nextRunDate.valueOf())
      ? t("schedule1.followup.nextRun", {
          relative: formatDistanceToNow(nextRunDate, {
            addSuffix: true,
            locale: locale === "vi" ? dateFnsVi : undefined,
          }),
        })
      : t("schedule1.followup.pending");
  const nextRunTitle = formatNextRunTitle(
    followup.next_run_time,
    followup.user_timezone ?? followup.timezone,
  );

  const recurrenceLabel = followup.cron
    ? safeHumanizeCronExpression(followup.cron)
    : t("schedule1.followup.runsOnce");

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
      await deleteSchedule({ scheduleId: followup.id });
      toast({ title: t("schedule1.followup.deleted") });
      setIsDeleteOpen(false);
      invalidateAllScheduleQueries(queryClient);
    } catch (error) {
      toast({
        title: t("schedule1.followup.deleteFailedTitle"),
        description:
          error instanceof Error
            ? error.message
            : t("schedule1.followup.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  return {
    sessionHref,
    messagePreview,
    nextRunLabel,
    nextRunTitle,
    recurrenceLabel,
    isDeleteOpen,
    openDelete,
    closeDelete,
    isDeleting,
    handleDelete,
    isViewOpen,
    openView,
    closeView,
    fullMessage: followup.message || t("schedule1.followup.noMessage"),
  };
}
