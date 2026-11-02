"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  folderName: string;
  /** Folders that go with it. The delete cascades, so this is the whole
   *  subtree, not the direct children the folder rows summarise. */
  subfolderCount: number;
  isDeleting: boolean;
  onConfirm: () => void;
}

export function DeleteFolderDialog({
  isOpen,
  setIsOpen,
  folderName,
  subfolderCount,
  isDeleting,
  onConfirm,
}: Props) {
  const t = useT();
  return (
    <Dialog
      controlled={{ isOpen, set: setIsOpen }}
      styling={{ maxWidth: "28rem" }}
      title={t("artifacts3.delete.title")}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="body" className="text-foreground-secondary">
            {t("artifacts3.delete.confirm")}{" "}
            <span className="font-medium">&ldquo;{folderName}&rdquo;</span>
            {subfolderCount > 0
              ? t("artifacts3.delete.andSubfolders", {
                  count: subfolderCount,
                  noun: t(
                    subfolderCount === 1
                      ? "artifacts3.delete.folderOne"
                      : "artifacts3.delete.folderMany",
                  ),
                })
              : t("artifacts3.delete.confirmNoSubfolders")}
          </Text>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
            >
              {t("artifacts3.delete.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              loading={isDeleting}
              disabled={isDeleting}
              data-testid="confirm-delete-folder"
            >
              {t("artifacts3.delete.confirm")}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
