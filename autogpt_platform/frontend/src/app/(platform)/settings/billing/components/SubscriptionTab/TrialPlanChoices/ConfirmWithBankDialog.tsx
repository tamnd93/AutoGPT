import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

import { formatChoicePrice } from "./helpers";
import type { PaymentPage } from "./useTrialPlanRequest";

interface Props {
  page: PaymentPage | null;
  onClose: () => void;
}

export function ConfirmWithBankDialog({ page, onClose }: Props) {
  const t = useT();
  return (
    <Dialog
      title={t("billing2.confirmBank.title")}
      styling={{ maxWidth: "28rem", minWidth: "auto" }}
      controlled={{
        isOpen: page !== null,
        set: (open) => {
          if (!open) onClose();
        },
      }}
    >
      <Dialog.Content>
        {page ? (
          <Text variant="body">
            {t("billing2.confirmBank.body", {
              price: formatChoicePrice(page.plan, t),
              name: page.plan.label,
            })}
          </Text>
        ) : null}
        <Dialog.Footer>
          <Button variant="outline" onClick={onClose}>
            {t("billing2.confirmBank.done")}
          </Button>
          {page ? (
            <Button
              as="NextLink"
              variant="primary"
              href={page.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("billing2.confirmBank.pay")}
            </Button>
          ) : null}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
