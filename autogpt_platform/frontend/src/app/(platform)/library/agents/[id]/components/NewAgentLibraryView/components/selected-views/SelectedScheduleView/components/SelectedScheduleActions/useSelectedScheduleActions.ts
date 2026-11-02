"use client";

import {
  getGetV1ListGraphExecutionsQueryKey,
  usePostV1ExecuteGraphAgent,
} from "@/app/api/__generated__/endpoints/graphs/graphs";
import { useDeleteV1DeleteExecutionSchedule } from "@/app/api/__generated__/endpoints/schedules/schedules";
import type { GraphExecutionJobInfo } from "@/app/api/__generated__/models/graphExecutionJobInfo";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { okData } from "@/app/api/helpers";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { invalidateAllScheduleQueries } from "@/services/schedules/invalidate-schedules";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface UseSelectedScheduleActionsProps {
  agent: LibraryAgent;
  scheduleId: string;
  schedule?: GraphExecutionJobInfo;
  onDeleted?: () => void;
  onSelectRun?: (id: string) => void;
}

export function useSelectedScheduleActions({
  agent,
  scheduleId,
  schedule,
  onDeleted,
  onSelectRun,
}: UseSelectedScheduleActionsProps) {
  const { toast } = useToast();
  const t = useT();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteMutation = useDeleteV1DeleteExecutionSchedule({
    mutation: {
      onSuccess: () => {
        toast({ title: t("library2.schedule.deleted") });
        setShowDeleteDialog(false);

        onDeleted?.();

        invalidateAllScheduleQueries(queryClient, agent.graph_id);
      },
      onError: (error: unknown) =>
        toast({
          title: t("library2.schedule.deleteFailed"),
          description:
            error instanceof Error
              ? error.message
              : t("library2.common.unexpectedError"),
          variant: "destructive",
        }),
    },
  });

  const { mutateAsync: executeAgent, isPending: isRunning } =
    usePostV1ExecuteGraphAgent();

  function handleDelete() {
    if (!scheduleId) return;
    deleteMutation.mutate({ scheduleId });
  }

  async function handleRunNow() {
    if (!schedule) {
      toast({
        title: t("library3.scheduleActions.notLoaded"),
        description: t("library3.scheduleActions.waitForLoad"),
        variant: "destructive",
      });
      return;
    }

    try {
      toast({ title: t("library2.runActions.toast.started") });

      const res = await executeAgent({
        graphId: schedule.graph_id,
        graphVersion: schedule.graph_version,
        data: {
          inputs: schedule.input_data || {},
          credentials_inputs: schedule.input_credentials || {},
          source: "library",
        },
      });

      const newRunID = okData(res)?.id;

      await queryClient.invalidateQueries({
        queryKey: getGetV1ListGraphExecutionsQueryKey(agent.graph_id),
      });

      if (newRunID && onSelectRun) {
        onSelectRun(newRunID);
      }
    } catch (error: unknown) {
      toast({
        title: t("library2.runActions.toast.startFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  const openInBuilderHref = `/build?flowID=${agent.graph_id}&flowVersion=${agent.graph_version}`;

  return {
    openInBuilderHref,
    showDeleteDialog,
    setShowDeleteDialog,
    handleDelete,
    isDeleting: deleteMutation.isPending,
    handleRunNow,
    isRunning,
  };
}
