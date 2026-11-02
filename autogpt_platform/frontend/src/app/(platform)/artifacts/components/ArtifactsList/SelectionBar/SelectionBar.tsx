"use client";

import type { WorkspaceFileItem } from "@/app/api/__generated__/models/workspaceFileItem";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import {
  Cancel01Icon,
  Delete02Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { MoveToFolderDialog } from "../../MoveToFolderDialog/MoveToFolderDialog";
import { useSelectionBar } from "./useSelectionBar";

interface Props {
  selectedFiles: WorkspaceFileItem[];
  totalCount: number;
  onSelectAll: () => void;
  onClear: () => void;
}

export function SelectionBar({
  selectedFiles,
  totalCount,
  onSelectAll,
  onClear,
}: Props) {
  const t = useT();
  const {
    isMoveOpen,
    setIsMoveOpen,
    isDeleting,
    handleDelete,
    moveSubject,
    sharedFolderId,
  } = useSelectionBar(selectedFiles, onClear);
  const count = selectedFiles.length;

  return (
    <div
      className="flex h-[1.875rem] items-center justify-between gap-3 px-2 pb-2"
      data-testid="artifacts-selection-bar"
    >
      <div className="flex items-center gap-3">
        <Text
          variant="body-medium"
          as="span"
          className="text-foreground-strong"
        >
          {t("artifacts2.selection.selected", { count })}
        </Text>
        {count < totalCount ? (
          <button
            type="button"
            className="text-sm text-foreground-tertiary underline-offset-2 hover:text-foreground-strong hover:underline"
            onClick={onSelectAll}
            data-testid="artifacts-select-all"
          >
            {t("artifacts2.selection.selectAll", { count: totalCount })}
          </button>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="xs"
          onClick={() => setIsMoveOpen(true)}
          data-testid="artifacts-selection-move"
        >
          <Icon icon={Folder01Icon} size={14} />
          {t("artifacts2.selection.moveToFolder")}
        </Button>
        <Button
          variant="outline"
          size="xs"
          disabled={isDeleting}
          onClick={handleDelete}
          // TODO(tokens): no fitting role for text-red-600 #D93636; #D93636 is error-hover, a hover fill
          className="text-red-600 hover:bg-error-surface hover:text-error-foreground"
          data-testid="artifacts-selection-delete"
        >
          <Icon icon={Delete02Icon} size={14} />
          {isDeleting
            ? t("artifacts2.selection.deleting")
            : t("artifacts2.selection.delete")}
        </Button>
        <button
          type="button"
          aria-label={t("artifacts2.selection.clearAria")}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground-tertiary transition-colors hover:bg-surface-hover hover:text-foreground-strong"
          onClick={onClear}
          data-testid="artifacts-selection-clear"
        >
          <Icon icon={Cancel01Icon} size={16} />
        </button>
      </div>
      {isMoveOpen && (
        <MoveToFolderDialog
          move={{
            kind: "files",
            fileIds: selectedFiles.map((file) => file.id),
            currentFolderId: sharedFolderId,
          }}
          subject={moveSubject}
          canMoveToRoot={selectedFiles.some((file) => file.folder_id != null)}
          isOpen={isMoveOpen}
          setIsOpen={setIsMoveOpen}
          onMoved={onClear}
        />
      )}
    </div>
  );
}
