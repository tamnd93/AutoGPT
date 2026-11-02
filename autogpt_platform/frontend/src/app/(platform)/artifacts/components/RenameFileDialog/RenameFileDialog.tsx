"use client";

import type { WorkspaceFileItem } from "@/app/api/__generated__/models/workspaceFileItem";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { isKey } from "@/lib/keyboard";
import { useT } from "@/lib/i18n";
import { useRenameFileDialog } from "./useRenameFileDialog";

interface Props {
  file: WorkspaceFileItem;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function RenameFileDialog({ file, isOpen, setIsOpen }: Props) {
  const t = useT();
  const { name, setName, validationError, canSubmit, isPending, handleSubmit } =
    useRenameFileDialog(file, () => setIsOpen(false));

  return (
    <Dialog
      controlled={{ isOpen, set: setIsOpen }}
      styling={{ maxWidth: "28rem" }}
      title={t("artifacts2.rename.title")}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-3">
          <Input
            id="rename-file-name"
            label={t("artifacts2.rename.label")}
            placeholder={t("artifacts2.rename.placeholder")}
            value={name}
            error={validationError ?? undefined}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (isKey(e, "Enter")) handleSubmit();
            }}
            className="w-full"
            wrapperClassName="!mb-0"
          />
          <Button
            variant="primary"
            className="mt-2"
            disabled={!canSubmit}
            loading={isPending}
            onClick={handleSubmit}
            data-testid="rename-file-submit"
          >
            {t("artifacts2.rename.save")}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
