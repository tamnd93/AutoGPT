import { getGetHomeDashboardQueryKey } from "@/app/api/__generated__/endpoints/home/home";
import {
  getListPausedScheduledChatsQueryKey,
  useDeleteV1DeleteExecutionSchedule,
  useResumeScheduledChat,
} from "@/app/api/__generated__/endpoints/schedules/schedules";
import type { PausedScheduledChat } from "@/app/api/__generated__/models/pausedScheduledChat";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { ApiError } from "@/lib/autogpt-server-api/helpers";
import { invalidateAllScheduleQueries } from "@/services/schedules/invalidate-schedules";
import * as Sentry from "@sentry/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useT } from "@/lib/i18n";
import { useState } from "react";

interface Args {
  paused: PausedScheduledChat;
}

export function usePausedChatListItem({ paused }: Args) {
  const t = useT();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function refresh() {
    queryClient.invalidateQueries({
      queryKey: getListPausedScheduledChatsQueryKey(),
    });
    // Home lists each paused chat under Needs you.
    queryClient.invalidateQueries({ queryKey: getGetHomeDashboardQueryKey() });
    return invalidateAllScheduleQueries(queryClient);
  }

  const { mutate, isPending } = useResumeScheduledChat({
    mutation: {
      onSuccess: () => {
        void refresh();
        toast({
          title: t("schedule1.paused.resumedTitle"),
          description: t("schedule1.paused.resumedBody", {
            title: paused.title,
          }),
        });
      },
      onError: (error) => {
        void refresh();
        // Resumed elsewhere already: the refresh drops the row.
        if (error instanceof ApiError && error.status === 404) return;
        Sentry.captureException(error);
        toast({
          variant: "destructive",
          title: t("schedule1.paused.resumeFailedTitle"),
          description: t("schedule1.paused.retry"),
        });
      },
    },
  });

  function handleDeleted() {
    setIsDeleteOpen(false);
    void refresh();
    toast({ title: t("schedule1.paused.deleted") });
  }

  const { mutate: deleteSchedule, isPending: isDeleting } =
    useDeleteV1DeleteExecutionSchedule({
      mutation: {
        onSuccess: handleDeleted,
        onError: (error) => {
          // Its schedule was gone already; the delete still cleared the row.
          if (error instanceof ApiError && error.status === 404) {
            handleDeleted();
            return;
          }
          void refresh();
          Sentry.captureException(error);
          toast({
            variant: "destructive",
            title: t("schedule1.paused.deleteFailedTitle"),
            description: t("schedule1.paused.retry"),
          });
        },
      },
    });

  const sessionHref = paused.session_id
    ? `/copilot?sessionId=${encodeURIComponent(paused.session_id)}`
    : null;

  function handleResume() {
    if (isPending) return;
    mutate({ scheduleKey: paused.schedule_key });
  }

  function handleDelete() {
    if (isDeleting) return;
    deleteSchedule({ scheduleId: paused.schedule_key });
  }

  return {
    sessionHref,
    handleResume,
    isResuming: isPending,
    canDelete: !paused.routine,
    isDeleteOpen,
    setIsDeleteOpen,
    handleDelete,
    isDeleting,
  };
}
