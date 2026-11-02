"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import { isKey } from "@/lib/keyboard";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mode: "create" | "edit";
  initialName?: string;
  /** Folder the new one lands in, shown under the input. Absent at the root. */
  location?: string;
  isSubmitting: boolean;
  onSubmit: (values: { name: string }) => void;
}

export function FolderFormDialog({
  isOpen,
  setIsOpen,
  mode,
  initialName = "",
  location,
  isSubmitting,
  onSubmit,
}: Props) {
  const t = useT();
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  const trimmed = name.trim();
  const canSubmit =
    trimmed.length > 0 && trimmed.length <= 100 && !isSubmitting;

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({ name: trimmed });
  }

  return (
    <Dialog
      controlled={{ isOpen, set: setIsOpen }}
      styling={{ maxWidth: "28rem" }}
      title={t(
        mode === "create"
          ? "artifacts3.form.titleCreate"
          : "artifacts3.form.titleEdit",
      )}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-3">
          <Input
            id="folder-name"
            label={t("artifacts3.form.nameLabel")}
            placeholder={t("artifacts3.form.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (isKey(e, "Enter")) handleSubmit();
            }}
            className="w-full"
            wrapperClassName="!mb-0"
          />
          {location ? (
            <Text variant="small" className="text-foreground-tertiary">
              {t("artifacts3.form.inside", { location })}
            </Text>
          ) : null}
          <Button
            variant="primary"
            className="mt-2"
            disabled={!canSubmit}
            loading={isSubmitting}
            onClick={handleSubmit}
            data-testid="folder-form-submit"
          >
            {t(
              mode === "create"
                ? "artifacts3.form.create"
                : "artifacts3.form.save",
            )}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
