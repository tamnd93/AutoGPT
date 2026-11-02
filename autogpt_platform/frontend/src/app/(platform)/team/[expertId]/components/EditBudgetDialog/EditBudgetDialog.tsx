"use client";

import { Expert } from "@/app/api/__generated__/models/expert";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import { useEditBudgetDialog } from "./useEditBudgetDialog";

interface Props {
  expert: Expert;
  open: boolean;
  onClose: () => void;
}

export function EditBudgetDialog({ expert, open, onClose }: Props) {
  const t = useT();
  const { value, setValue, isInvalid, isPending, save } = useEditBudgetDialog({
    expert,
    open,
    onClose,
  });

  return (
    <Dialog
      variant="compact"
      title={t("team5.budget.title")}
      styling={{ maxWidth: "24rem" }}
      controlled={{
        isOpen: open,
        set: (next) => {
          if (!next) onClose();
        },
      }}
    >
      <Dialog.Content>
        <form onSubmit={save} className="flex flex-col gap-4 px-1">
          <div className="flex flex-col gap-1.5">
            <Input
              id="expert-weekly-budget"
              size="small"
              label={t("team5.budget.title")}
              labelVariant="small-medium"
              placeholder={t("team5.budget.placeholder")}
              value={value}
              error={isInvalid ? t("team5.budget.invalid") : undefined}
              onChange={(event) => setValue(event.target.value)}
              wrapperClassName="!mb-0"
            />
            <Text variant="small" tone="muted">
              {t("team5.budget.note", { name: expert.name })}
            </Text>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              size="small"
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              {t("team5.common.cancel")}
            </Button>
            <Button
              size="small"
              type="submit"
              variant="primary"
              disabled={isInvalid}
              loading={isPending}
            >
              {t("team5.budget.save")}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
