"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";

interface Props {
  dirty: boolean;
  saving: boolean;
  canSave: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export function SaveBar({ dirty, saving, canSave, onDiscard, onSave }: Props) {
  const t = useT();

  return (
    <div className="flex items-center justify-start gap-2">
      <Button
        variant="outline"
        size="large"
        onClick={onDiscard}
        disabled={!dirty || saving}
      >
        {t("account2.saveBar.discard")}
      </Button>
      <Button
        variant="primary"
        size="large"
        onClick={onSave}
        loading={saving}
        disabled={!canSave || saving}
      >
        {t("account2.saveBar.save")}
      </Button>
    </div>
  );
}
