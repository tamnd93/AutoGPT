"use client";

import {
  getGetV1ListGraphExecutionsQueryKey,
  useDeleteV1DeleteGraphExecution,
} from "@/app/api/__generated__/endpoints/graphs/graphs";
import {
  getGetV2ListPresetsQueryKey,
  usePostV2CreateANewPreset,
} from "@/app/api/__generated__/endpoints/presets/presets";
import type { GraphExecutionMeta } from "@/app/api/__generated__/models/graphExecutionMeta";
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
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreateTemplateModal } from "../../../selected-views/SelectedRunView/components/CreateTemplateModal/CreateTemplateModal";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  agent: LibraryAgent;
  run: GraphExecutionMeta;
  onDeleted?: () => void;
}

export function TaskActionsDropdown({ agent, run, onDeleted }: Props) {
  const t = useT();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] =
    useState(false);

  const { mutateAsync: deleteRun, isPending: isDeletingRun } =
    useDeleteV1DeleteGraphExecution();

  const { mutateAsync: createPreset } = usePostV2CreateANewPreset();

  async function handleDeleteRun() {
    try {
      await deleteRun({ graphExecId: run.id });

      toast({ title: t("library2.actionsDropdown.taskDeleted") });

      await queryClient.refetchQueries({
        queryKey: getGetV1ListGraphExecutionsQueryKey(agent.graph_id),
      });

      setShowDeleteDialog(false);
      onDeleted?.();
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

  async function handleCreateTemplate(name: string, description: string) {
    try {
      const res = await createPreset({
        data: {
          name,
          description,
          graph_execution_id: run.id,
        },
      });

      if (res.status === 200) {
        toast({
          title: t("library2.runActions.toast.templateCreated"),
        });

        queryClient.invalidateQueries({
          queryKey: getGetV2ListPresetsQueryKey({
            graph_id: agent.graph_id,
          }),
        });

        setIsCreateTemplateModalOpen(false);
      }
    } catch (error: unknown) {
      toast({
        title: t("library2.runActions.toast.templateFailed"),
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
            onClick={(e) => {
              e.stopPropagation();
              setIsCreateTemplateModalOpen(true);
            }}
            className="flex items-center gap-2"
          >
            {t("library3.taskActions.saveAsTemplate")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="flex items-center gap-2"
          >
            {t("library3.taskActions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        controlled={{
          isOpen: showDeleteDialog,
          set: setShowDeleteDialog,
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
                onClick={() => setShowDeleteDialog(false)}
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

      <CreateTemplateModal
        isOpen={isCreateTemplateModalOpen}
        onClose={() => setIsCreateTemplateModalOpen(false)}
        onCreate={handleCreateTemplate}
        run={run as any}
      />
    </>
  );
}
