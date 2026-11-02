import { useState } from "react";
import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useLocale, useT } from "@/lib/i18n";
import { formatTrialEnd } from "./helpers";

interface Props {
  trial: TrialStatusResponse;
  isCanceling: boolean;
  onCancel: () => void;
}

export function CancelTrialDialog({ trial, isCanceling, onCancel }: Props) {
  const t = useT();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  function confirmCancellation() {
    setIsOpen(false);
    onCancel();
  }

  return (
    <Dialog
      title={t("billing3.cancelTrial.title")}
      styling={{ maxWidth: "28rem", minWidth: "auto" }}
      controlled={{ isOpen, set: setIsOpen }}
    >
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="small"
          loading={isCanceling}
          disabled={isCanceling}
        >
          {t("billing3.cancelTrial.button")}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div
          data-slot="cancel-trial-dialog-body"
          className="flex flex-col gap-3"
        >
          <Text variant="body" className="!text-foreground-emphasis">
            {t("billing3.cancelTrial.body")}
          </Text>
          <Text variant="body" className="!text-foreground-emphasis">
            {t("billing3.cancelTrial.keepAccess")}{" "}
            <strong
              data-slot="cancel-trial-dialog-end-date"
              className="font-semibold"
            >
              {formatTrialEnd(trial.ends_at, locale)}
            </strong>
            {t("billing3.cancelTrial.keepAccessSuffix")}
          </Text>
        </div>
        <Dialog.Footer>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
                        {t("billing3.cancelTrial.keep")}
          </Button>
          <Button
            variant="primary"
            onClick={confirmCancellation}
            disabled={isCanceling}
          >
            {t("billing3.cancelTrial.button")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
