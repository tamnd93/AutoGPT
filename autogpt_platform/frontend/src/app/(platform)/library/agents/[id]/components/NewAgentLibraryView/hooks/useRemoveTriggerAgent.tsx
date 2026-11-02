"use client";

import {
  getGetV2ListTriggerAgentsQueryKey,
  useDeleteV2DeleteLibraryAgent,
} from "@/app/api/__generated__/endpoints/library/library";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useT } from "@/lib/i18n";

interface Args {
  parentAgent: LibraryAgent;
  triggerAgent: LibraryAgent;
  onDeleted?: () => void;
}

/**
 * Shared delete flow for a trigger agent — confirmation dialog,
 * mutation, toast notifications, and parent-list invalidation.
 *
 * Used by both `SelectedTriggerAgentActions` (side panel icon button)
 * and `TriggerAgentActionsDropdown` (sidebar three-dots menu), which
 * render different triggers but need identical delete behavior.
 */
export function useRemoveTriggerAgent({
  parentAgent,
  triggerAgent,
  onDeleted,
}: Args): {
  openDialog: () => void;
  isDeleting: boolean;
  dialog: ReactNode;
} {
  const { toast } = useToast();
  const t = useT();
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);

  const { mutate: deleteLibraryAgent, isPending } =
    useDeleteV2DeleteLibraryAgent({
      mutation: {
        onSuccess: async () => {
          toast({ title: t("library4.removeTrigger.removed") });
          queryClient.invalidateQueries({
            queryKey: getGetV2ListTriggerAgentsQueryKey(parentAgent.id),
          });
          setShowDialog(false);
          onDeleted?.();
        },
        onError: (error) => {
          toast({
            title: t("library4.removeTrigger.failed"),
            description:
              error instanceof Error
                ? error.message
                : t("library2.common.unexpectedError"),
            variant: "destructive",
          });
        },
      },
    });

  function handleDelete() {
    deleteLibraryAgent({ libraryAgentId: triggerAgent.id });
  }

  const dialog = (
    <Dialog
      controlled={{ isOpen: showDialog, set: setShowDialog }}
      styling={{ maxWidth: "32rem" }}
      title={t("library3.triggerAgent.remove")}
    >
      <Dialog.Content>
        <Text variant="large">{t("library4.removeTrigger.body")}</Text>
        <Dialog.Footer>
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={() => setShowDialog(false)}
          >
            {t("library2.common.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            {t("library3.triggerAgent.remove")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );

  return {
    openDialog: () => setShowDialog(true),
    isDeleting: isPending,
    dialog,
  };
}
