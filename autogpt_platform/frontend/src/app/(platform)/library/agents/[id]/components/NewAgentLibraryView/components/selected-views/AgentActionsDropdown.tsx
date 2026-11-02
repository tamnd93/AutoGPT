"use client";

import {
  getGetV1ListGraphExecutionsQueryKey,
  getV1GetGraphVersion,
  useDeleteV1DeleteGraphExecution,
} from "@/app/api/__generated__/endpoints/graphs/graphs";
import {
  getGetV2ListLibraryAgentsQueryKey,
  useDeleteV2DeleteLibraryAgent,
} from "@/app/api/__generated__/endpoints/library/library";
import {
  getGetV1ListExecutionSchedulesForAGraphQueryOptions,
  useDeleteV1DeleteExecutionSchedule,
} from "@/app/api/__generated__/endpoints/schedules/schedules";
import type { GraphExecution } from "@/app/api/__generated__/models/graphExecution";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
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
import { useT } from "@/lib/i18n";
import { exportAsJSONFile } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  agent: LibraryAgent;
  scheduleId?: string;
  run?: GraphExecution;
  agentGraphId?: string;
  onClearSelectedRun?: () => void;
}

export function AgentActionsDropdown({
  agent,
  run,
  agentGraphId,
  scheduleId,
  onClearSelectedRun,
}: Props) {
  const t = useT();
  const { toast } = useToast();

  const { mutateAsync: deleteAgent } = useDeleteV2DeleteLibraryAgent();

  const { mutateAsync: deleteRun, isPending: isDeletingRun } =
    useDeleteV1DeleteGraphExecution();

  const queryClient = useQueryClient();
  const router = useRouter();
  const [isDeletingAgent, setIsDeletingAgent] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteRunDialog, setShowDeleteRunDialog] = useState(false);

  const { mutateAsync: deleteSchedule } = useDeleteV1DeleteExecutionSchedule();
  const [isDeletingSchedule, setIsDeletingSchedule] = useState(false);
  const [showDeleteScheduleDialog, setShowDeleteScheduleDialog] =
    useState(false);

  async function handleDeleteAgent() {
    if (!agent.id) return;

    setIsDeletingAgent(true);

    try {
      await deleteAgent({ libraryAgentId: agent.id });

      await queryClient.refetchQueries({
        queryKey: getGetV2ListLibraryAgentsQueryKey(),
      });

      toast({ title: t("library2.emptyTasks.workflowDeleted") });
      setShowDeleteDialog(false);
      router.push("/library");
    } catch (error: unknown) {
      toast({
        title: t("library2.emptyTasks.workflowDeleteFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsDeletingAgent(false);
    }
  }

  async function handleExport() {
    try {
      const res = await getV1GetGraphVersion(
        agent.graph_id,
        agent.graph_version,
        { for_export: true },
      );
      if (res.status === 200) {
        const filename = `${agent.name}_v${agent.graph_version}.json`;
        exportAsJSONFile(res.data as any, filename);
        toast({ title: t("library2.emptyTasks.workflowExported") });
      } else {
        toast({
          title: t("library2.emptyTasks.workflowExportFailed"),
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: t("library2.emptyTasks.workflowExportFailed"),
        description: e?.message,
        variant: "destructive",
      });
    }
  }

  async function handleDeleteRun() {
    if (!run?.id || !agentGraphId) return;

    try {
      await deleteRun({ graphExecId: run.id });

      toast({ title: t("library2.actionsDropdown.taskDeleted") });

      await queryClient.refetchQueries({
        queryKey: getGetV1ListGraphExecutionsQueryKey(agentGraphId),
      });

      if (onClearSelectedRun) onClearSelectedRun();

      setShowDeleteRunDialog(false);
    } catch (error: unknown) {
      toast({
        title: t("library2.actionsDropdown.taskDeleteFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  async function handleDeleteSchedule() {
    setIsDeletingSchedule(true);
    try {
      await deleteSchedule({ scheduleId: scheduleId ?? "" });
      toast({ title: t("library2.schedule.deleted") });

      await queryClient.invalidateQueries({
        queryKey: getGetV1ListExecutionSchedulesForAGraphQueryOptions(
          agentGraphId ?? "",
        ).queryKey,
      });

      setShowDeleteDialog(false);
    } catch (error: unknown) {
      toast({
        title: t("library2.schedule.deleteFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsDeletingSchedule(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="icon"
            size="icon"
            aria-label={t("library2.actionsDropdown.more")}
            className="min-w-fit"
          >
            <Icon icon={MoreHorizontalIcon} size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {run ? (
            <>
              <DropdownMenuItem
                onClick={() => setShowDeleteRunDialog(true)}
                className="flex items-center gap-2"
              >
                {t("library2.actionsDropdown.deleteThisTask")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ) : null}
          <DropdownMenuItem asChild>
            <Link
              href={`/build?flowID=${agent.graph_id}&flowVersion=${agent.graph_version}`}
              target="_blank"
              className="flex items-center gap-2"
            >
              {t("library2.emptyTasks.edit")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            {t("library2.emptyTasks.export")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2"
          >
            {t("library2.emptyTasks.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        controlled={{
          isOpen: showDeleteRunDialog,
          set: setShowDeleteRunDialog,
        }}
        styling={{ maxWidth: "32rem" }}
        title={t("library2.actionsDropdown.deleteTaskTitle")}
      >
        <Dialog.Content>
          <div>
            <Text variant="large">
              {t("library2.actionsDropdown.deleteTaskBody")}
            </Text>
            <Dialog.Footer>
              <Button
                variant="secondary"
                disabled={isDeletingRun}
                onClick={() => setShowDeleteRunDialog(false)}
              >
                {t("library2.common.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteRun}
                loading={isDeletingRun}
              >
                {t("library2.actionsDropdown.deleteTaskConfirm")}
              </Button>
            </Dialog.Footer>
          </div>
        </Dialog.Content>
      </Dialog>

      <Dialog
        controlled={{
          isOpen: showDeleteDialog,
          set: setShowDeleteDialog,
        }}
        styling={{ maxWidth: "32rem" }}
        title={t("library2.emptyTasks.deleteTitle")}
      >
        <Dialog.Content>
          <div>
            <Text variant="large">{t("library2.emptyTasks.deleteBody")}</Text>
            <Dialog.Footer>
              <Button
                variant="secondary"
                disabled={isDeletingAgent}
                onClick={() => setShowDeleteDialog(false)}
              >
                {t("library2.common.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAgent}
                loading={isDeletingAgent}
              >
                {t("library2.emptyTasks.deleteConfirm")}
              </Button>
            </Dialog.Footer>
          </div>
        </Dialog.Content>
      </Dialog>

      <Dialog
        controlled={{
          isOpen: showDeleteScheduleDialog,
          set: setShowDeleteScheduleDialog,
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
                disabled={isDeletingSchedule}
                onClick={() => setShowDeleteScheduleDialog(false)}
              >
                {t("library2.common.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteSchedule}
                loading={isDeletingSchedule}
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
