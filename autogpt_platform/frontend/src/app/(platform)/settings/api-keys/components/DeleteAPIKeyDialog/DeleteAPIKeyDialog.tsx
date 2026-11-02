"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

import { useRevokeAPIKey } from "../hooks/useRevokeAPIKey";

interface Props {
  open: boolean;
  keyIds: string[];
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}

export function DeleteAPIKeyDialog({
  open,
  keyIds,
  onOpenChange,
  onDeleted,
}: Props) {
  const t = useT();
  const { revoke, isPending } = useRevokeAPIKey();
  const isBatch = keyIds.length > 1;

  async function handleConfirm() {
    const succeeded = await revoke(keyIds);
    if (!succeeded) return;
    onDeleted?.();
    onOpenChange(false);
  }

  return (
    <Dialog
      title={
        isBatch
          ? t("settingsRest1.delete.titleMany", { count: keyIds.length })
          : t("settingsRest1.delete.titleOne")
      }
      styling={{ maxWidth: "28rem" }}
      controlled={{
        isOpen: open,
        set: (next) => {
          if (isPending) return;
          onOpenChange(next);
        },
      }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4 px-1">
          <Text variant="body" className="text-foreground-body">
            {t("settingsRest1.delete.bodyPrefix")}{" "}
            {isBatch
              ? t("settingsRest1.delete.theseKeys")
              : t("settingsRest1.delete.thisKey")}{" "}
            {t("settingsRest1.delete.bodySuffix")}
          </Text>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t("settingsRest1.delete.cancel")}
            </Button>
            <Button
              variant="destructive"
              loading={isPending}
              onClick={handleConfirm}
            >
              {isBatch
                ? t("settingsRest1.delete.revokeMany")
                : t("settingsRest1.delete.revokeOne")}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
