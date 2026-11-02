"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description: string;
}

export function UnsupervisedConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
}: Props) {
  const t = useT();

  return (
    <Dialog
      title={title ?? t("chatInput1.mode.unsupervisedConfirmTitle")}
      styling={{ maxWidth: "30rem", minWidth: "auto" }}
      controlled={{
        isOpen,
        set: async (open) => {
          if (!open) onCancel();
        },
      }}
    >
      <Dialog.Content>
        <Text variant="body">{description}</Text>
        <Dialog.Footer>
          <Button variant="secondary" onClick={onCancel}>
            {t("chatInput1.mode.cancel")}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {t("chatInput1.mode.runUnsupervised")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
