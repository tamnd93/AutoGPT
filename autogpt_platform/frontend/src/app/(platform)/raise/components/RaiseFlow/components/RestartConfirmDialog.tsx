"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function RestartConfirmDialog({ open, onOpenChange, onConfirm }: Props) {
  const t = useT();
  return (
    <Dialog
      title={t("team1.restart.title")}
      styling={{ maxWidth: "26rem" }}
      controlled={{ isOpen: open, set: onOpenChange }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="body" className="text-foreground-emphasis">
            {t("team1.restart.body")}
          </Text>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => onOpenChange(false)}
            >
              {t("team1.restart.keepGoing")}
            </Button>
            <Button variant="destructive" size="small" onClick={onConfirm}>
              {t("team1.raiseFlow.startOver")}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
