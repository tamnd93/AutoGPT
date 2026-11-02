import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  credentialToDelete: { id: string; title: string } | null;
  warningMessage?: string | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onForceConfirm: () => void;
}

export function DeleteConfirmationModal({
  credentialToDelete,
  warningMessage,
  isDeleting,
  onClose,
  onConfirm,
  onForceConfirm,
}: Props) {
  const t = useT();
  return (
    <Dialog
      controlled={{
        isOpen: credentialToDelete !== null,
        set: (open) => {
          if (!open) onClose();
        },
      }}
      title={t("credentials1.delete.title")}
      styling={{ maxWidth: "32rem" }}
    >
      <Dialog.Content>
        {warningMessage ? (
          <Text variant="large">{warningMessage}</Text>
        ) : (
          <Text variant="large">
            {t("credentials1.delete.body", {
              title: credentialToDelete?.title ?? "",
            })}
          </Text>
        )}
        <Dialog.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            {t("credentials1.dialog.cancel")}
          </Button>
          {warningMessage ? (
            <Button
              variant="destructive"
              onClick={onForceConfirm}
              loading={isDeleting}
            >
              {t("credentials1.delete.force")}
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={onConfirm}
              loading={isDeleting}
            >
              {t("credentials1.delete.delete")}
            </Button>
          )}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
