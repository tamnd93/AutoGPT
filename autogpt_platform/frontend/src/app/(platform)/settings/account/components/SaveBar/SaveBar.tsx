"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";

interface Props {
  visible: boolean;
  saving: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export function SaveBar({ visible, saving, onDiscard, onSave }: Props) {
  const t = useT();

  return (
    <div className="flex items-center justify-end gap-2 px-4">
      <Button
        variant="primary"
        size="large"
        onClick={onSave}
        loading={saving}
        disabled={saving || !visible}
      >
        {t("account1.saveBar.save")}
      </Button>
      <Button
        variant="secondary"
        size="large"
        onClick={onDiscard}
        disabled={saving || !visible}
      >
        {t("account1.saveBar.discard")}
      </Button>
    </div>
  );
}
