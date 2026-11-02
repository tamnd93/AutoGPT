"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { formatCents } from "../../../helpers";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import { formatUpgradeAmount } from "./MaxUpgradeSummary";
import { MaxUpgradeReview } from "./MaxUpgradeReview";
import type { useTierUpgradePreview } from "./useTierUpgradePreview";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  targetTierLabel: string;
  body: string;
  isSaving: boolean;
  onConfirm: () => void;
  title?: string;
  confirmLabel?: string;
  priceCents?: number;
  billingCycle?: "monthly" | "yearly";
  usageCarriesOver?: boolean;
  usageMultiplier?: number;
  upgradeReview?: ReturnType<typeof useTierUpgradePreview>;
}

export function SwitchTierDialog({
  isOpen,
  onOpenChange,
  targetTierLabel,
  body,
  isSaving,
  onConfirm,
  title,
  confirmLabel,
  priceCents,
  billingCycle = "monthly",
  usageCarriesOver = false,
  usageMultiplier,
  upgradeReview,
}: Props) {
  const t = useT();
  const preview = upgradeReview?.preview;
  const reviewing = upgradeReview?.required;
  const cannotConfirm = isSaving || (reviewing && !preview);
  const action = preview
    ? t("billing2.switchTier.pay", {
        amount: formatUpgradeAmount(preview.amount_due, preview.currency),
      })
    : (confirmLabel ??
      t("billing2.switchTier.upgradeAction", { name: targetTierLabel }));
  return (
    <Dialog
      variant="compact"
      title={
        <div className="space-y-2 pr-7">
          <Text variant="small" className="text-foreground-tertiary">
            {title
              ? t("billing2.switchTier.eyebrow")
              : t("billing2.switchTier.upgradeAction", {
                  name: targetTierLabel,
                })}
          </Text>
          <Text
            variant="h3"
            as="span"
            // TODO(tokens): SECRT-3152 rare size (text-[26px])
            className="block text-[26px] leading-8 tracking-tight"
          >
            {title ??
              t("billing2.switchTier.upgradeAction", { name: targetTierLabel })}
          </Text>
        </div>
      }
      styling={{ maxWidth: "520px" }}
      controlled={{ isOpen, set: onOpenChange }}
    >
      <Dialog.Content>
        {usageCarriesOver && (
          <Text
            variant="body"
            className="mb-5 leading-6 text-foreground-secondary"
          >
            {usageMultiplier
              ? t("billing2.switchTier.carryOver", {
                  multiple: usageMultiplier,
                })
              : t("billing2.switchTier.carryOverDefault")}
          </Text>
        )}
        {reviewing ? (
          <MaxUpgradeReview review={upgradeReview} />
        ) : (
          <>
            {priceCents !== undefined && (
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 rounded-2xl border border-border-base bg-surface-muted p-5">
                <Text variant="large-medium">
                  {t("billing2.switchTier.planTitle", {
                    name: targetTierLabel,
                  })}
                </Text>
                <div>
                  <Text variant="h3" as="span">
                    {formatCents(priceCents)}
                  </Text>
                  <Text variant="small" as="span" tone="secondary">
                    {" "}
                    /{" "}
                    {billingCycle === "yearly"
                      ? t("billing2.offer.perYear")
                      : t("billing2.offer.perMonth")}
                  </Text>
                </div>
              </div>
            )}
            <Text variant="body" as="span" className="text-foreground-body">
              {body}
            </Text>
          </>
        )}
        {usageCarriesOver && (
          <Text
            variant="small"
            tone="secondary"
            className="mt-4 rounded-xl bg-surface-muted p-4 leading-6"
          >
            {t("billing2.switchTier.carryOverBodyLead")}
            {usageMultiplier
              ? t("billing2.switchTier.carryOverBodyMultiple", {
                  multiple: usageMultiplier,
                })
              : "."}
          </Text>
        )}
        <Dialog.Footer
          className={
            usageCarriesOver ? "flex-col items-stretch gap-2" : undefined
          }
        >
          {usageCarriesOver ? (
            <>
              <ConfirmButton
                label={action}
                disabled={cannotConfirm}
                isSaving={isSaving}
                onConfirm={onConfirm}
              />
              <Button
                type="button"
                variant="ghost"
                size="large"
                className="w-full"
                onClick={() => onOpenChange(false)}
                disabled={isSaving}
              >
                {t("billing2.switchTier.keepPro")}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="ghost"
                size="large"
                onClick={() => onOpenChange(false)}
                disabled={isSaving}
              >
                {t("billing2.switchTier.cancel")}
              </Button>
              <ConfirmButton
                label={action}
                disabled={cannotConfirm}
                isSaving={isSaving}
                onConfirm={onConfirm}
              />
            </>
          )}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

function ConfirmButton({
  label,
  disabled,
  isSaving,
  onConfirm,
}: {
  label: string;
  disabled?: boolean;
  isSaving: boolean;
  onConfirm: () => void;
}) {
  return (
    <Button
      type="button"
      variant="primary"
      size="large"
      className="w-full"
      onClick={onConfirm}
      disabled={disabled}
      loading={isSaving}
    >
      {label}
    </Button>
  );
}
