"use client";

import {
  getGetV2ListLibraryAgentsQueryKey,
  useDeleteV2DeleteLibraryAgent,
  usePostV2ForkLibraryAgent,
} from "@/app/api/__generated__/endpoints/library/library";
import {
  usePostV2BulkMoveAgents,
  getGetV2ListLibraryFoldersQueryKey,
} from "@/app/api/__generated__/endpoints/folders/folders";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MoveToFolderDialog } from "../../MoveToFolderDialog/MoveToFolderDialog";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface AgentCardMenuProps {
  agent: LibraryAgent;
}

export function AgentCardMenu({ agent }: AgentCardMenuProps) {
  const { toast } = useToast();
  const t = useT();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [isDeletingAgent, setIsDeletingAgent] = useState(false);
  const [isDuplicatingAgent, setIsDuplicatingAgent] = useState(false);
  const [isRemovingFromFolder, setIsRemovingFromFolder] = useState(false);

  const { mutateAsync: deleteAgent } = useDeleteV2DeleteLibraryAgent();
  const { mutateAsync: forkAgent } = usePostV2ForkLibraryAgent();
  const { mutateAsync: bulkMoveAgents } = usePostV2BulkMoveAgents({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetV2ListLibraryAgentsQueryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: getGetV2ListLibraryFoldersQueryKey(),
        });
      },
    },
  });

  async function handleDuplicateAgent() {
    if (!agent.id) return;

    setIsDuplicatingAgent(true);

    try {
      const result = await forkAgent({ libraryAgentId: agent.id });

      if (result.status === 200) {
        await queryClient.refetchQueries({
          queryKey: getGetV2ListLibraryAgentsQueryKey(),
        });

        toast({
          title: t("library4.cardMenu.duplicated"),
          description: t("library4.cardMenu.duplicatedBody", {
            name: result.data.name,
          }),
        });
      }
    } catch (error: unknown) {
      toast({
        title: t("library4.cardMenu.duplicateFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsDuplicatingAgent(false);
    }
  }

  async function handleRemoveFromFolder() {
    if (!agent.id) return;

    setIsRemovingFromFolder(true);

    try {
      await bulkMoveAgents({
        data: {
          agent_ids: [agent.id],
          folder_id: null,
        },
      });

      toast({
        title: t("library4.cardMenu.removedFromFolder"),
        description: t("library4.cardMenu.removedFromFolderBody"),
      });
    } catch (error: unknown) {
      toast({
        title: t("library4.cardMenu.removeFromFolderFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsRemovingFromFolder(false);
    }
  }

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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            // TODO(tokens): no exact role for hover:bg-neutral-100 (#F5F5F5)
            className="absolute right-2 top-1 rounded p-1.5 transition-opacity hover:bg-neutral-100"
            onClick={(e) => e.stopPropagation()}
            aria-label={t("library3.actions.more")}
          >
            <Icon
              icon={MoreHorizontalIcon}
              // TODO(tokens): no exact role for text-neutral-600 (#525252)
              className="h-5 w-5 text-neutral-600"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {agent.can_access_graph && (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href={`/build?flowID=${agent.graph_id}&flowVersion=${agent.graph_version}`}
                  target="_blank"
                  className="flex items-center gap-2"
                  data-testid="library-agent-card-open-in-builder-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("library2.emptyTasks.edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDuplicateAgent();
            }}
            disabled={isDuplicatingAgent}
            className="flex items-center gap-2"
          >
            {t("library4.cardMenu.duplicate")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setShowMoveDialog(true);
            }}
            className="flex items-center gap-2"
          >
            {t("library4.cardMenu.moveToFolder")}
          </DropdownMenuItem>
          {agent.folder_id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromFolder();
                }}
                disabled={isRemovingFromFolder}
                className="flex items-center gap-2"
              >
                {t("library4.cardMenu.removeFromFolder")}
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            // TODO(tokens): no fitting role for text-red-600 #D93636; #D93636 is error-hover, a hover fill; no fitting role for focus:text-red-600 #D93636
            className="flex items-center gap-2 text-red-600 focus:bg-error-surface focus:text-red-600"
          >
            {t("library2.emptyTasks.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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

      <MoveToFolderDialog
        agentId={agent.id}
        agentName={agent.name}
        currentFolderId={agent.folder_id}
        isOpen={showMoveDialog}
        setIsOpen={setShowMoveDialog}
      />
    </>
  );
}
