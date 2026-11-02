"use client";

import { GraphExecution } from "@/app/api/__generated__/models/graphExecution";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
  run?: GraphExecution;
}

export function CreateTemplateModal({ isOpen, onClose, onCreate }: Props) {
  const t = useT();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  async function handleSubmit() {
    if (!name.trim()) return;

    setIsCreating(true);
    try {
      await onCreate(name.trim(), description.trim());
      setName("");
      setDescription("");
      onClose();
    } finally {
      setIsCreating(false);
    }
  }

  function handleCancel() {
    setName("");
    setDescription("");
    onClose();
  }

  return (
    <Dialog
      title={t("library2.createTemplate.title")}
      controlled={{ isOpen, set: () => onClose() }}
      styling={{ maxWidth: "500px" }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Text variant="body" className="text-foreground-secondary">
              {t("library2.createTemplate.body")}
            </Text>
          </div>

          <div className="flex w-[96%] flex-col gap-4 pl-1">
            <Input
              id="template-name"
              label={t("library2.createTemplate.name")}
              placeholder={t("library2.createTemplate.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <Input
              type="textarea"
              id="template-description"
              label={t("library2.createTemplate.description")}
              placeholder={t("library2.createTemplate.descriptionPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <Dialog.Footer className="mt-6">
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCancel}>
              {t("library2.createTemplate.cancel")}
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!name.trim() || isCreating}
              loading={isCreating}
            >
              {t("library2.createTemplate.submit")}
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
