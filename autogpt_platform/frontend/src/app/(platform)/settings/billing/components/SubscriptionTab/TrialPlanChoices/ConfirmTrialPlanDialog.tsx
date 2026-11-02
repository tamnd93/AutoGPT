import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  planLabel: string;
  price: string;
  isSaving: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmTrialPlanDialog({
  isOpen,
  planLabel,
  price,
  isSaving,
  onConfirm,
  onClose,
}: Props) {
  const t = useT();
  return (
    <Dialog
      title={t("billing2.confirmTrial.title", { name: planLabel })}
      styling={{ maxWidth: "28rem", minWidth: "auto" }}
      controlled={{
        isOpen,
        set: (open) => {
          if (!open) onClose();
        },
      }}
    >
      <Dialog.Content>
        <Text variant="body">{t("billing2.confirmTrial.body", { price })}</Text>
        <Dialog.Footer>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            {t("billing2.confirmTrial.keep")}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isSaving}
            loading={isSaving}
          >
            {t("billing2.confirmTrial.subscribe", { name: planLabel })}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
