"use client";

import { useDeleteV1DeleteExecutionSchedule } from "@/app/api/__generated__/endpoints/schedules/schedules";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { invalidateAllScheduleQueries } from "@/services/schedules/invalidate-schedules";
import { useQueryClient } from "@tanstack/react-query";

export function useScheduleDetailHeader(
  agentGraphId: string,
  scheduleId?: string,
  agentGraphVersion?: number | string,
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const t = useT();

  const deleteMutation = useDeleteV1DeleteExecutionSchedule({
    mutation: {
      onSuccess: () => {
        toast({ title: t("library2.schedule.deleted") });
        invalidateAllScheduleQueries(queryClient, agentGraphId);
      },
      onError: (error: any) =>
        toast({
          title: t("library2.schedule.deleteFailed"),
          description: error?.message || t("library2.common.unexpectedError"),
          variant: "destructive",
        }),
    },
  });

  function deleteSchedule() {
    if (!scheduleId) return;
    deleteMutation.mutate({ scheduleId });
  }

  const openInBuilderHref = `/build?flowID=${agentGraphId}&flowVersion=${agentGraphVersion}`;

  return {
    deleteSchedule,
    isDeleting: deleteMutation.isPending,
    openInBuilderHref,
  } as const;
}
