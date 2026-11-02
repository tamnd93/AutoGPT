"use client";

import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Button } from "@/components/atoms/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu/DropdownMenu";
import Link from "next/link";
import { useRemoveTriggerAgent } from "../../../../hooks/useRemoveTriggerAgent";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  parentAgent: LibraryAgent;
  triggerAgent: LibraryAgent;
  onDeleted?: () => void;
}

export function TriggerAgentActionsDropdown({
  parentAgent,
  triggerAgent,
  onDeleted,
}: Props) {
  const t = useT();
  const { openDialog, dialog } = useRemoveTriggerAgent({
    parentAgent,
    triggerAgent,
    onDeleted,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="icon"
            size="icon"
            onClick={(e) => e.stopPropagation()}
            aria-label={t("library3.actions.more")}
            className="ml-auto min-w-fit shrink-0"
          >
            <Icon icon={MoreVerticalIcon} size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`/library/agents/${triggerAgent.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {t("library3.triggerAgent.viewInLibrary")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/build?flowID=${triggerAgent.graph_id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {t("library3.common.openInBuilder")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              openDialog();
            }}
          >
            {t("library3.triggerAgent.remove")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialog}
    </>
  );
}
