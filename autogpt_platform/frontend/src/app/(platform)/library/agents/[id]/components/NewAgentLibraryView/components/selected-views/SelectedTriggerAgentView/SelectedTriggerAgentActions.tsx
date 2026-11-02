"use client";

import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Button } from "@/components/atoms/Button/Button";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import Link from "next/link";
import { useRemoveTriggerAgent } from "../../../hooks/useRemoveTriggerAgent";
import {
  Delete02Icon,
  LinkSquare01Icon,
  PencilIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  parentAgent: LibraryAgent;
  triggerAgent: LibraryAgent;
  onDeleted?: () => void;
}

export function SelectedTriggerAgentActions({
  parentAgent,
  triggerAgent,
  onDeleted,
}: Props) {
  const { openDialog, isDeleting, dialog } = useRemoveTriggerAgent({
    parentAgent,
    triggerAgent,
    onDeleted,
  });
  const t = useT();

  return (
    <>
      <div className="my-4 flex flex-col items-center gap-3">
        <Link
          href={`/library/agents/${triggerAgent.id}`}
          aria-label={t("library3.triggerAgent.viewInLibrary")}
        >
          <Button
            variant="icon"
            size="icon"
            aria-label={t("library3.triggerAgent.viewInLibrary")}
          >
            <Icon
              icon={LinkSquare01Icon}
              size={18}
              className="text-foreground-body"
            />
          </Button>
        </Link>
        <Link
          href={`/build?flowID=${triggerAgent.graph_id}`}
          aria-label={t("library3.common.openInBuilder")}
        >
          <Button
            variant="icon"
            size="icon"
            aria-label={t("library3.common.openInBuilder")}
          >
            <Icon
              icon={PencilIcon}
              size={18}
              className="text-foreground-body"
            />
          </Button>
        </Link>
        <Button
          variant="icon"
          size="icon"
          aria-label={t("library3.triggerAgent.remove")}
          onClick={openDialog}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <LoadingSpinner size="small" />
          ) : (
            <Icon icon={Delete02Icon} size={18} />
          )}
        </Button>
      </div>
      {dialog}
    </>
  );
}
