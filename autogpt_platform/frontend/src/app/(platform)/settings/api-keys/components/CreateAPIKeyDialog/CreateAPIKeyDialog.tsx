"use client";

import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

import { CreateAPIKeyForm } from "./components/CreateAPIKeyForm";
import { CreateAPIKeySuccess } from "./components/CreateAPIKeySuccess";
import { useCreateAPIKeyForm } from "./useCreateAPIKeyForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAPIKeyDialog({ open, onOpenChange }: Props) {
  const t = useT();
  const { form, view, plainTextKey, isPending, handleSubmit, handleClose } =
    useCreateAPIKeyForm({ onClose: () => onOpenChange(false) });

  const isSuccess = view === "success";
  const title = isSuccess
    ? t("settingsRest1.create.titleSuccess")
    : t("settingsRest1.create.title");

  return (
    <Dialog
      title={title}
      styling={{ maxWidth: "34rem" }}
      controlled={{
        isOpen: open,
        set: (next) => {
          if (next) {
            onOpenChange(true);
            return;
          }
          if (isPending) return;
          handleClose();
        },
      }}
    >
      <Dialog.Content>
        {isSuccess ? (
          <CreateAPIKeySuccess
            plainTextKey={plainTextKey}
            onClose={handleClose}
          />
        ) : (
          <CreateAPIKeyForm
            form={form}
            onSubmit={handleSubmit}
            isPending={isPending}
          />
        )}
      </Dialog.Content>
    </Dialog>
  );
}
