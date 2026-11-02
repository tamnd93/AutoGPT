"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { Dialog } from "@/components/molecules/Dialog/Dialog";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelRecordingDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}: Props) {
  const t = useT();

  return (
    <Dialog
      title={t("onboarding1.recording.discard.title")}
      className="min-w-0 max-w-[30rem] rounded-2xlarge"
      controlled={{ isOpen, set: onOpenChange }}
    >
      <Dialog.Content>
        <Text variant="body">{t("onboarding1.recording.discard.body")}</Text>
        <Dialog.Footer>
          <Button
            variant="secondary"
            size="small"
            onClick={() => onOpenChange(false)}
            className="h-10"
          >
            {t("onboarding1.recording.discard.keep")}
          </Button>
          <Button
            variant="destructive"
            size="small"
            onClick={onConfirm}
            className="h-10"
          >
            {t("onboarding1.recording.discard.confirm")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
