"use client";

"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  session: { id: string; title: string | null | undefined } | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteChatDialog({
  session,
  isDeleting,
  onConfirm,
  onCancel,
}: Props) {
  const t = useT();

  return (
    <Dialog
      title={t("chatStates2.deleteChat.title")}
      styling={{ maxWidth: "30rem", minWidth: "auto" }}
      controlled={{
        isOpen: !!session,
        set: async (open) => {
          if (!open && !isDeleting) {
            onCancel();
          }
        },
      }}
    >
      <Dialog.Content>
        <Text variant="body">
          {t("chatStates2.deleteChat.bodyPrefix")}{" "}
          <Text variant="body-medium" as="span">
            &quot;{session?.title || t("chatStates2.deleteChat.untitled")}&quot;
          </Text>
          {t("chatStates2.deleteChat.bodySuffix")}
        </Text>
        <Dialog.Footer>
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            {t("chatStates2.deleteChat.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
          >
            {t("chatStates2.deleteChat.delete")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
