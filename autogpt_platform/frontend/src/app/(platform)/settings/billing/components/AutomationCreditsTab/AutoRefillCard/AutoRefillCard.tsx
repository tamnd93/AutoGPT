"use client";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";

import { useT } from "@/lib/i18n";

import { getSectionMotionProps } from "../../../helpers";
import { AutoRefillDialog } from "./AutoRefillDialog";
import { useAutoRefillCard } from "./useAutoRefillCard";
import { ReloadIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  index?: number;
}

export function AutoRefillCard({ index = 0 }: Props) {
  const t = useT();
  const reduceMotion = useReducedMotion();
  const {
    config,
    isEnabled,
    isLoading,
    isSaving,
    open,
    setOpen,
    threshold,
    setThreshold,
    refillAmount,
    setRefillAmount,
    isValid,
    save,
    disable,
  } = useAutoRefillCard();

  return (
    <motion.section
      {...getSectionMotionProps(index, Boolean(reduceMotion))}
      className="flex w-full flex-wrap items-center justify-between gap-4 rounded-[18px] border border-border-base bg-surface p-5 shadow-[0_1px_2px_rgba(15,15,20,0.04)]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          // TODO(tokens): no exact role (bg-violet-100 #EDE9FE)
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-violet-100 text-accent-strong"
        >
          <Icon icon={ReloadIcon} size={20} />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <Text variant="body-medium" as="span" className="text-textBlack">
            {t("billing1.autoRefill.title")}
          </Text>
          <Text variant="body" as="span" className="text-foreground-tertiary">
            {isEnabled && config
              ? t("billing1.autoRefill.enabledBody", {
                  amount: (config.amount / 100).toFixed(0),
                  threshold: (config.threshold / 100).toFixed(0),
                })
              : t("billing1.autoRefill.disabledBody")}
          </Text>
        </div>
      </div>

      <Button
        variant="secondary"
        size="small"
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        {isEnabled
          ? t("billing1.autoRefill.edit")
          : t("billing1.autoRefill.setUp")}
      </Button>

      <AutoRefillDialog
        isOpen={open}
        onOpenChange={setOpen}
        threshold={threshold}
        setThreshold={setThreshold}
        refillAmount={refillAmount}
        setRefillAmount={setRefillAmount}
        isValid={isValid}
        isEnabled={isEnabled}
        isSaving={isSaving}
        onSave={save}
        onDisable={disable}
      />
    </motion.section>
  );
}
