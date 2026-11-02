"use client";

import {
  getGetV2ListPresetsQueryKey,
  useDeleteV2DeleteAPreset,
} from "@/app/api/__generated__/endpoints/presets/presets";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import type { LibraryAgentPreset } from "@/app/api/__generated__/models/libraryAgentPreset";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu/DropdownMenu";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  agent: LibraryAgent;
  template: LibraryAgentPreset;
  onDeleted?: () => void;
}

export function TemplateActionsDropdown({ agent, template, onDeleted }: Props) {
  const { toast } = useToast();
  const t = useT();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutateAsync: deletePreset, isPending: isDeleting } =
    useDeleteV2DeleteAPreset();

  async function handleDelete() {
    try {
      await deletePreset({ presetId: template.id });

      toast({
        title: t("library3.templateActions.deleted"),
      });

      queryClient.invalidateQueries({
        queryKey: getGetV2ListPresetsQueryKey({
          graph_id: agent.graph_id,
        }),
      });

      setShowDeleteDialog(false);
      onDeleted?.();
    } catch (error: unknown) {
      toast({
        title: t("library3.templateActions.deleteFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            // TODO(tokens): no exact role for hover:bg-gray-100 (#F3F4F6)
            className="ml-auto shrink-0 rounded p-1 hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()}
            aria-label={t("library3.actions.more")}
          >
            <Icon
              // TODO(tokens): no exact role for text-gray-400 (#9CA3AF)
              icon={MoreVerticalIcon}
              className="h-5 w-5 text-gray-400"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="flex items-center gap-2"
          >
            {t("library3.templateActions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        controlled={{
          isOpen: showDeleteDialog,
          set: setShowDeleteDialog,
        }}
        styling={{ maxWidth: "32rem" }}
        title={t("library3.templateActions.delete")}
      >
        <Dialog.Content>
          <div>
            <Text variant="large">
              {t("library3.templateActions.deleteBody")}
            </Text>
            <Dialog.Footer>
              <Button
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setShowDeleteDialog(false)}
              >
                {t("library2.common.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                loading={isDeleting}
              >
                {t("library4.templateActions.confirmDelete")}
              </Button>
            </Dialog.Footer>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
