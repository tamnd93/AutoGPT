"use client";

import {
  getGetV2GetSessionQueryKey,
  usePostV2CancelSessionTask,
} from "@/app/api/__generated__/endpoints/chat/chat";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip/BaseTooltip";
import { toast } from "@/components/molecules/Toast/use-toast";
import * as Sentry from "@sentry/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { CancelCircleIcon, HourglassIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  sessionID: string | null;
}

export function QueueBadge({ sessionID }: Props) {
  const t = useT();
  const queryClient = useQueryClient();
  const { mutate: cancelTask, isPending: isCancelling } =
    usePostV2CancelSessionTask({
      mutation: {
        onSuccess: () => {
          if (sessionID) {
            queryClient.invalidateQueries({
              queryKey: getGetV2GetSessionQueryKey(sessionID),
            });
          }
        },
        onError: (error) => {
          // 404 = session not found / not owned: sync the UI and
          // suppress the destructive toast.
          const status = (error as { response?: { status?: number } })?.response
            ?.status;
          if (status === 404) {
            if (sessionID) {
              queryClient.invalidateQueries({
                queryKey: getGetV2GetSessionQueryKey(sessionID),
              });
            }
            return;
          }
          Sentry.captureException(error);
          toast({
            variant: "destructive",
            title: t("chatRuntime1.queue.cancelFailedTitle"),
            description: t("chatRuntime1.queue.cancelFailedDescription"),
          });
        },
      },
    });

  function handleCancel() {
    if (!sessionID || isCancelling) return;
    cancelTask({ sessionId: sessionID });
  }

  return (
    <span className="inline-flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            // TODO(tokens): no exact role for bg-purple-100, text-purple-800
            className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-caption-sm font-medium leading-inherit text-purple-800"
            data-testid="queue-badge-queued"
          >
            <Icon icon={HourglassIcon} size={12} />
            {t("chatRuntime1.queue.queued")}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs whitespace-normal">
          {t("chatRuntime1.queue.queuedTooltip")}
        </TooltipContent>
      </Tooltip>
      {sessionID ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isCancelling}
              aria-label={t("chatRuntime1.queue.cancelAria")}
              data-testid="queue-cancel-button"
              // TODO(tokens): no exact role for text-neutral-500; no fitting role for hover:text-red-600 #D93636; #D93636 is error-hover (a fill and line colour)
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-red-600 disabled:opacity-50"
            >
              <Icon icon={CancelCircleIcon} size={14} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {t("chatRuntime1.queue.cancelAria")}
          </TooltipContent>
        </Tooltip>
      ) : null}
    </span>
  );
}
