"use client";

import { Expert } from "@/app/api/__generated__/models/expert";
import { DEFAULT_AUTOPILOT_MODE } from "@/app/(platform)/copilot/autopilotModeStore";
import { AUTOPILOT_MODE_OPTIONS } from "@/app/(platform)/copilot/components/ChatInput/components/AutopilotModeSelector/helpers";
import { UnsupervisedConfirmDialog } from "@/app/(platform)/copilot/components/ChatInput/components/AutopilotModeSelector/UnsupervisedConfirmDialog";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Flag, useGetFlag } from "@/services/feature-flags/use-get-flag";
import { useExpertModeSection } from "./useExpertModeSection";

interface Props {
  expert: Expert;
}

export function ExpertModeSection({ expert }: Props) {
  const isAutoModeEnabled = useGetFlag(Flag.COPILOT_AUTO_MODE);
  if (!isAutoModeEnabled) return null;
  return <ExpertModeOptions expert={expert} />;
}

function ExpertModeOptions({ expert }: Props) {
  const {
    mode,
    isPending,
    selectMode,
    isConfirmOpen,
    confirmUnsupervised,
    cancelUnsupervised,
  } = useExpertModeSection({ expert });
  const t = useT();

  return (
    <section
      aria-label={t("team3.mode.aria", { name: expert.name })}
      className="rounded-xl border border-border-base bg-surface p-4"
    >
      <Text variant="large-medium">{t("team3.mode.heading")}</Text>
      <Text variant="small" tone="secondary" className="mt-1">
        {t("team3.mode.description", { name: expert.name })}
      </Text>
      <fieldset className="mt-4 flex flex-col gap-2" disabled={isPending}>
        <legend className="sr-only">
          {t("team3.mode.legend", { name: expert.name })}
        </legend>
        {AUTOPILOT_MODE_OPTIONS.map((option) => {
          const isSelected = option.value === mode;
          return (
            <label
              key={option.value}
              className={cn(
                // TODO(tokens): no fitting role for has-[:focus-visible]:outline-zinc-800 #3E3E43; #3E3E43 is foreground-emphasis (a text colour), action (a button fill)
                "flex cursor-pointer items-start gap-3 rounded-xl p-3 text-left transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-zinc-800",
                isSelected
                  ? // TODO(tokens): no fitting role for ring-zinc-800 #3E3E43; #3E3E43 is foreground-emphasis (a text colour), action (a button fill)
                    "bg-surface ring-2 ring-inset ring-zinc-800"
                  : "bg-surface-muted ring-1 ring-inset ring-border-base hover:bg-surface-hover",
                option.value === "unsupervised" &&
                  isSelected &&
                  // TODO(tokens): no exact role: ring-amber-600 #D97706
                  "bg-warning-surface ring-amber-600",
              )}
            >
              <input
                type="radio"
                name="expert-autopilot-mode"
                value={option.value}
                checked={isSelected}
                onChange={() => selectMode(option.value)}
                className="sr-only"
              />
              <Icon
                icon={option.icon}
                size={18}
                className="mt-0.5 shrink-0 text-foreground-body"
                aria-hidden="true"
              />
              <span className="flex flex-col gap-0.5">
                <Text variant="body-md-medium" as="span" tone="primary">
                  {t(option.labelKey)}
                  {option.value === DEFAULT_AUTOPILOT_MODE
                    ? t("team3.mode.defaultSuffix")
                    : ""}
                </Text>
                <Text variant="small-tight" as="span" tone="muted">
                  {t(option.descriptionKey)}
                </Text>
              </span>
            </label>
          );
        })}
      </fieldset>
      <UnsupervisedConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={confirmUnsupervised}
        onCancel={cancelUnsupervised}
        title={t("team3.mode.confirmTitle", { name: expert.name })}
        description={t("team3.mode.confirmDescription", {
          name: expert.name,
        })}
      />
    </section>
  );
}
