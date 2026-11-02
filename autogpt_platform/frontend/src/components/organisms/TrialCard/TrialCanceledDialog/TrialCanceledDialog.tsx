import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { TrialTimeLeft } from "./components/TrialTimeLeft";
  import { useT } from "@/lib/i18n";
import { WorthDoingPanel } from "./components/WorthDoingPanel";

interface Props {
  trial: TrialStatusResponse;
  isOpen: boolean;
  isResuming: boolean;
  onResume: () => void;
  onSubscribe: () => void;
  onClose: () => void;
}

export function TrialCanceledDialog({
  trial,
  isOpen,
  isResuming,
  onResume,
  onSubscribe,
  onClose,
}: Props) {
  const t = useT();
  if (!trial.offer) return null;
  return (
    <Dialog
      title={t("billing3.canceled.title")}
      styling={{ maxWidth: "29rem", minWidth: "auto" }}
      controlled={{
        isOpen,
        set: (open) => {
          if (!open) onClose();
        },
      }}
    >
      <Dialog.Content>
        <div
          data-slot="trial-canceled-dialog-body"
          className="flex flex-col gap-4"
        >
          <Text variant="body" className="!text-foreground-emphasis">
            {t("billing3.canceled.noCharge")}{" "}
            <TrialTimeLeft endsAt={trial.ends_at} />
          </Text>
          <WorthDoingPanel offer={trial.offer} endsAt={trial.ends_at} />
        </div>
        <Dialog.Footer>
          <Button
            variant="outline"
            onClick={onResume}
            loading={isResuming}
            disabled={isResuming}
          >
                        {t("billing3.canceled.resume")}
          </Button>
          <Button variant="primary" onClick={onSubscribe}>
                        {t("billing3.canceled.subscribe")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
