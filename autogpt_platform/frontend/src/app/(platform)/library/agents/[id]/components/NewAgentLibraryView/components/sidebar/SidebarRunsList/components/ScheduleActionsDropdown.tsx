"use client";

import {
  getGetV1ListGraphExecutionsQueryKey,
  usePostV1ExecuteGraphAgent,
} from "@/app/api/__generated__/endpoints/graphs/graphs";
import { useDeleteV1DeleteExecutionSchedule } from "@/app/api/__generated__/endpoints/schedules/schedules";
import type { GraphExecutionJobInfo } from "@/app/api/__generated__/models/graphExecutionJobInfo";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { okData } from "@/app/api/helpers";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu/DropdownMenu";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { invalidateAllScheduleQueries } from "@/services/schedules/invalidate-schedules";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  agent: LibraryAgent;
  schedule: GraphExecutionJobInfo;
  onDeleted?: () => void;
  onRunCreated?: (runID: string) => void;
}

export function ScheduleActionsDropdown({
  agent,
  schedule,
  onDeleted,
  onRunCreated,
}: Props) {
  const t = useT();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutateAsync: deleteSchedule, isPending: isDeleting } =
    useDeleteV1DeleteExecutionSchedule();

  const { mutateAsync: executeAgent, isPending: isRunning } =
    usePostV1ExecuteGraphAgent();

  async function handleDelete() {
    try {
      await deleteSchedule({ scheduleId: schedule.id });

      toast({ title: t("library2.schedule.deleted") });
      setShowDeleteDialog(false);

      onDeleted?.();

      invalidateAllScheduleQueries(queryClient, agent.graph_id);
    } catch (error: unknown) {
      toast({
        title: t("library2.schedule.deleteFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  async function handleRunNow(e: React.MouseEvent) {
    e.stopPropagation();

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

      if (newRunID) {
        onRunCreated?.(newRunID);
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            // TODO(tokens): no exact role for hover:bg-gray-100 (#F3F4F6)
            className="ml-auto shrink-0 rounded p-1 hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()}
            aria-label={t("library3.actions.more")}
          >
            <Icon
              // TODO(tokens): no exact role for text-gray-400 (#9CA3AF)
              icon={MoreVerticalIcon}
              className="h-5 w-5 text-gray-400"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={handleRunNow}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning
              ? t("library3.scheduleActions.running")
              : t("library3.scheduleActions.runNow")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="flex items-center gap-2"
          >
            {t("library3.scheduleActions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        controlled={{
          isOpen: showDeleteDialog,
          set: setShowDeleteDialog,
        }}
        styling={{ maxWidth: "32rem" }}
        title={t("library2.actionsDropdown.deleteScheduleTitle")}
      >
        <Dialog.Content>
          <div>
            <Text variant="large">
              {t("library2.actionsDropdown.deleteScheduleBody")}
            </Text>
            <Dialog.Footer>
              <Button
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setShowDeleteDialog(false)}
              >
                {t("library2.common.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                loading={isDeleting}
              >
                {t("library2.actionsDropdown.deleteScheduleConfirm")}
              </Button>
            </Dialog.Footer>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
