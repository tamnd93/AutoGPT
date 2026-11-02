import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
  providerName: string;
  /**
   * Set when the browser blocked the OAuth popup window and the helper
   * fell back to opening the login URL in a new tab. Changes the copy
   * to direct the user there instead of to a popup that doesn't exist.
   */
  popupBlocked?: boolean;
};

export function OAuthFlowWaitingModal({
  open,
  onClose,
  providerName,
  popupBlocked = false,
}: Props) {
  const t = useT();
  return (
    <Dialog
      title={t("credentials1.oauthWait.title", { name: providerName })}
      controlled={{
        isOpen: open,
        set: (isOpen) => {
          if (!isOpen) onClose();
        },
      }}
      onClose={onClose}
    >
      <Dialog.Content>
        {popupBlocked ? (
          <p className="text-sm text-foreground-secondary">
            {t("credentials1.oauthWait.blocked")}
          </p>
        ) : (
          <p className="text-sm text-foreground-secondary">
            {t("credentials1.oauthWait.body")}
          </p>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
