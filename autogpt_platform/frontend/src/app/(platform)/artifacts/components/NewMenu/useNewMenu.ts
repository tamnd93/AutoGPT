import {
  getGetWorkspaceStorageUsageQueryKey,
  getListWorkspaceFoldersQueryKey,
} from "@/app/api/__generated__/endpoints/workspace/workspace";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useT } from "@/lib/i18n";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useArtifactsFolders } from "../../useArtifactsFolders";
import { ARTIFACTS_LIST_QUERY_KEY } from "../../useArtifactsPage";
import { uploadFiles } from "./helpers";

export function useNewMenu(selectedFolderId: string | null) {
  const t = useT();
  const locale = useLocale();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { createFolder, isCreating } = useArtifactsFolders();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useMutation({
    mutationFn: (files: File[]) =>
      uploadFiles(files, selectedFolderId, locale),
    onSuccess: ({ uploaded, leftAtRoot, failed }) => {
      if (uploaded > 0) {
        toast({
          title:
            uploaded === 1
              ? t("artifacts2.upload.uploadedOne")
              : t("artifacts2.upload.uploadedMany", { count: uploaded }),
        });
      }
      if (leftAtRoot.length > 0) {
        toast({
          title: t("artifacts2.upload.leftAtRootTitle"),
          description: t("artifacts2.upload.leftAtRootBody", {
            files: leftAtRoot.join(", "),
          }),
        });
      }
      for (const failure of failed) {
        toast({
          title: t("artifacts2.upload.failedTitle", {
            name: failure.name,
          }),
          description: failure.message,
          variant: "destructive",
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ARTIFACTS_LIST_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: getListWorkspaceFoldersQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: getGetWorkspaceStorageUsageQueryKey(),
      });
    },
  });

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    // Reset so picking the same file again still fires a change event.
    event.target.value = "";
    if (files.length === 0) return;
    upload.mutate(files);
  }

  function handleCreateFolder(values: { name: string }) {
    createFolder({ ...values, parentId: selectedFolderId })
      .then(() => setIsCreateOpen(false))
      .catch(() => {});
  }

  return {
    fileInputRef,
    isUploading: upload.isPending,
    openFilePicker,
    handleFilesSelected,
    isCreateOpen,
    setIsCreateOpen,
    isCreating,
    handleCreateFolder,
  };
}
