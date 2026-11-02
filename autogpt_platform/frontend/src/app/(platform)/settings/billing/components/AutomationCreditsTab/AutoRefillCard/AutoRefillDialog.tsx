"use client";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { Alert01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  threshold: string;
  setThreshold: (value: string) => void;
  refillAmount: string;
  setRefillAmount: (value: string) => void;
  isValid: boolean;
  isEnabled: boolean;
  isSaving: boolean;
  onSave: () => void;
  onDisable: () => void;
}

export function AutoRefillDialog({
  isOpen,
  onOpenChange,
  threshold,
  setThreshold,
  refillAmount,
  setRefillAmount,
  isValid,
  isEnabled,
  isSaving,
  onSave,
  onDisable,
}: Props) {
  const t = useT();
  return (
    <Dialog
      title={t("billing1.autoRefill.title")}
      styling={{ maxWidth: "440px" }}
      controlled={{ isOpen, set: onOpenChange }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="small" as="span" className="text-foreground-tertiary">
            {t("billing1.autoRefill.dialogBody")}
          </Text>

          <RefillRow
            id="refill-threshold"
            label={t("billing1.autoRefill.thresholdLabel")}
            value={threshold}
            onChange={setThreshold}
          />
          <RefillRow
            id="refill-amount"
            label={t("billing1.autoRefill.amountLabel")}
            value={refillAmount}
            onChange={setRefillAmount}
          />

          <div className="flex items-start gap-2 rounded-[12px] bg-warning-surface px-3 py-2">
            <Icon
              icon={Alert01Icon}
              size={18}
              // TODO(tokens): no exact role (text-amber-600 #D97706)
              className="mt-0.5 shrink-0 text-amber-600"
            />
            <Text variant="small" as="span" className="text-warning-foreground">
              {t("billing1.autoRefill.warning")}
            </Text>
          </div>
        </div>

        <Dialog.Footer>
          {isEnabled ? (
            <Button
              type="button"
              variant="ghost"
              size="small"
              onClick={onDisable}
              disabled={isSaving}
            >
              Disable
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="small"
              onClick={() => onOpenChange(false)}
            >
              {t("billing1.autoRefill.cancel")}
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            size="small"
            disabled={!isValid || isSaving}
            loading={isSaving}
            onClick={onSave}
          >
            {isEnabled
              ? t("billing1.autoRefill.saveChanges")
              : t("billing1.autoRefill.enable")}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

function RefillRow({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useT();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <Text variant="body" as="span" className="text-textBlack">
        {label}
      </Text>
      <div className="w-full sm:max-w-[180px]">
        <Input
          id={id}
          label={label}
          hideLabel
          type="amount"
          amountPrefix="$"
          decimalCount={2}
          placeholder={t("billing1.autoRefill.minPlaceholder")}
          size="small"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          wrapperClassName="!mb-0"
        />
      </div>
    </div>
  );
}
