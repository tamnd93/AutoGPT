import { useT } from "@/lib/i18n";
import { Dialog } from "../molecules/Dialog/Dialog";
import { WaitlistErrorContent } from "./WaitlistErrorContent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailNotAllowedModal({ isOpen, onClose }: Props) {
  const t = useT();

  return (
    <Dialog
      title={t("auth2.emailNotAllowed.title")}
      controlled={{ isOpen, set: onClose }}
      styling={{ maxWidth: "35rem" }}
    >
      <Dialog.Content>
        <div className="py-4">
          <WaitlistErrorContent />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
