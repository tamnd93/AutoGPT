import { useDeleteWorkspaceFile } from "@/app/api/__generated__/endpoints/workspace/workspace";
import type { WorkspaceFileItem } from "@/app/api/__generated__/models/workspaceFileItem";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import {
  deriveFileOrigin,
  downloadFileBlob,
  invalidateWorkspaceFileQueries,
} from "./helpers";

export function useFileActionsMenu(file: WorkspaceFileItem) {
  const t = useT();
  const origin = deriveFileOrigin(file.path);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteFile, isPending: isDeleting } =
    useDeleteWorkspaceFile({
      mutation: {
        onSuccess: () => {
          invalidateWorkspaceFileQueries(queryClient);
          toast({ title: t("artifacts1.fileActions.fileDeleted") });
        },
        onError: (error) => {
          toast({
            title: t("artifacts1.fileActions.deleteFailed"),
            description:
              error instanceof Error
                ? error.message
                : t("artifacts1.fileActions.tryAgain"),
            variant: "destructive",
          });
        },
      },
    });

  async function handleDownload() {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadFileBlob(file.id, file.name);
    } catch (error) {
      toast({
        title: t("artifacts1.fileActions.downloadFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("artifacts1.fileActions.tryAgain"),
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleDelete() {
    if (isDeleting) return;
    const confirmed = window.confirm(
      t("artifacts1.fileActions.deleteConfirm", { name: file.name }),
    );
    if (!confirmed) return;
    try {
      await deleteFile({ fileId: file.id });
    } catch {
      // Already surfaced by the mutation's onError toast.
    }
  }

  return {
    goLabel:
      origin.kind === "session"
        ? t("artifacts1.fileActions.openChat")
        : t("artifacts1.fileActions.openInBuilder"),
    goHref: origin.href,
    isMoveOpen,
    setIsMoveOpen,
    isRenameOpen,
    setIsRenameOpen,
    isDownloading,
    isDeleting,
    handleDownload,
    handleDelete,
  };
}
