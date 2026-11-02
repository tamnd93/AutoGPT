"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemNames: string[];
  isPending?: boolean;
  onConfirm: () => void;
  variant?: "remove" | "force";
  /** Provider-specific consequence, when the generic wording would overstate
   *  or understate what actually stops working. */
  notice?: string;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  itemNames,
  isPending = false,
  onConfirm,
  variant = "remove",
  notice,
}: Props) {
  const t = useT();
  const count = itemNames.length;
  const isBulk = count > 1;
  const isForce = variant === "force";
  const oneName = itemNames[0] ?? t("integrations1.delete.thisIntegration");
  const title = isForce
    ? isBulk
      ? t("integrations1.delete.forceTitleMany", { count })
      : t("integrations1.delete.forceTitleOne", { name: oneName })
    : isBulk
      ? t("integrations1.delete.removeTitleMany", { count })
      : t("integrations1.delete.removeTitleOne", { name: oneName });
  const message = isForce
    ? isBulk
      ? t("integrations1.delete.forceMessageMany")
      : t("integrations1.delete.forceMessageOne")
    : isBulk
      ? t("integrations1.delete.removeMessageMany")
      : t("integrations1.delete.removeMessageOne");
  const confirmLabel = isForce
    ? t("integrations1.delete.force")
    : t("integrations1.delete.remove");

  return (
    <Dialog
      title={title}
      styling={{ maxWidth: "28rem" }}
      controlled={{ isOpen: open, set: onOpenChange }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="body" className="text-foreground-emphasis">
            {message}
          </Text>

          {notice && (
            <Text variant="small" className="text-foreground-body">
              {notice}
            </Text>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t("integrations1.delete.cancel")}
            </Button>
            <Button
              variant="destructive"
              size="small"
              onClick={onConfirm}
              loading={isPending}
              disabled={isPending}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
