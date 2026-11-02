"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  targetCycle: "monthly" | "yearly";
  title?: string;
  body: { label?: string; text: string }[];
  isSaving: boolean;
  onConfirm: () => void;
}

export function SwitchCycleDialog({
  isOpen,
  onOpenChange,
  targetCycle,
  title,
  body,
  isSaving,
  onConfirm,
}: Props) {
  const t = useT();
  const targetLabel =
    targetCycle === "yearly"
      ? t("billing2.cycle.yearly")
      : t("billing2.cycle.monthly");

  return (
    <Dialog
      title={title ?? t("billing2.cycle.switchTitle", { cycle: targetLabel })}
      styling={{ maxWidth: "440px" }}
      controlled={{ isOpen, set: onOpenChange }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-2">
          {body.map((line, index) => (
            <div
              key={`${index}-${line.label ?? ""}-${line.text}`}
              className="flex flex-wrap gap-1"
            >
              {line.label ? (
                <Text
                  variant="body"
                  as="span"
                  className="font-semibold text-foreground-body"
                >
                  {line.label}
                </Text>
              ) : null}
              <Text variant="body" as="span" className="text-foreground-body">
                {line.text}
              </Text>
            </div>
          ))}
        </div>

        <Dialog.Footer>
          <Button
            type="button"
            variant="ghost"
            size="small"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            {t("billing2.cycle.cancel")}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="small"
            onClick={onConfirm}
            disabled={isSaving}
            loading={isSaving}
          >
            {t("billing2.cycle.switchAction", { cycle: targetLabel })}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
