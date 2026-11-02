"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  fileName: string | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteFileDialog({
  fileName,
  isDeleting,
  onConfirm,
  onCancel,
}: Props) {
  const t = useT();

  return (
    <Dialog
      title={t("chatFiles1.deleteFile.title")}
      styling={{ maxWidth: "30rem", minWidth: "auto" }}
      controlled={{
        isOpen: !!fileName,
        set: async (open) => {
          if (!open && !isDeleting) onCancel();
        },
      }}
    >
      <Dialog.Content>
        <Text variant="body">
          {t("chatFiles1.deleteFile.bodyPrefix")}{" "}
          <Text variant="body-medium" as="span">
            &quot;{fileName}&quot;
          </Text>
          {t("chatFiles1.deleteFile.bodySuffix")}
        </Text>
        <Dialog.Footer>
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            {t("chatFiles1.deleteFile.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
          >
            {t("chatFiles1.deleteFile.delete")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
