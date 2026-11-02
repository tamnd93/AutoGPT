"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useToast } from "@/components/molecules/Toast/use-toast";
import {
  useDeleteV2DeleteFolder,
  getGetV2ListLibraryFoldersQueryKey,
} from "@/app/api/__generated__/endpoints/folders/folders";
import { getGetV2ListLibraryAgentsQueryKey } from "@/app/api/__generated__/endpoints/library/library";
import { useQueryClient } from "@tanstack/react-query";
import type { LibraryFolder } from "@/app/api/__generated__/models/libraryFolder";
import { useT } from "@/lib/i18n";

interface Props {
  folder: LibraryFolder;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDeleted?: () => void;
}

export function LibraryFolderDeleteDialog({
  folder,
  isOpen,
  setIsOpen,
  onDeleted,
}: Props) {
  const t = useT();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deleteFolder, isPending } = useDeleteV2DeleteFolder({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetV2ListLibraryFoldersQueryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: getGetV2ListLibraryAgentsQueryKey(),
        });
        toast({
          title: t("library5.folderDelete.deleted"),
          description: t("library5.folderDelete.deletedBody", {
            name: folder.name,
          }),
        });
        setIsOpen(false);
        onDeleted?.();
      },
      onError: () => {
        toast({
          title: t("library3.common.error"),
          description: t("library5.folderDelete.failed"),
          variant: "destructive",
        });
      },
    },
  });

  function handleDelete() {
    deleteFolder({ folderId: folder.id });
  }

  return (
    <Dialog
      controlled={{
        isOpen,
        set: setIsOpen,
      }}
      styling={{ maxWidth: "32rem" }}
      title={t("library5.folderDelete.title")}
    >
      <Dialog.Content>
        <div>
          <Text variant="large">
            {t("library5.folderDelete.body", { name: folder.name })}
          </Text>
          <Dialog.Footer>
            <Button
              variant="secondary"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              loading={isPending}
            >
              {t("library5.folderDelete.confirm")}
            </Button>
          </Dialog.Footer>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
