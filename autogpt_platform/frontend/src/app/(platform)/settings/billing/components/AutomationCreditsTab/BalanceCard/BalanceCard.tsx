"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { InformationTooltip } from "@/components/molecules/InformationTooltip/InformationTooltip";

import { formatCents, getSectionMotionProps } from "../../../helpers";
import { useT } from "@/lib/i18n";

import { useBalanceCard } from "./useBalanceCard";

interface Props {
  index?: number;
}

export function BalanceCard({ index = 0 }: Props) {
  const t = useT();
  const reduceMotion = useReducedMotion();
  const {
    balanceCents,
    isLoading,
    isError,
    refetch,
    open,
    setOpen,
    amount,
    setAmount,
    isValid,
    isAdding,
    isRedirecting,
    handleSubmit,
  } = useBalanceCard();

  const sectionMotion = getSectionMotionProps(index, Boolean(reduceMotion));

  if (isLoading) {
    return (
      <motion.div {...sectionMotion}>
        <Skeleton className="h-[120px] rounded-[18px]" />
      </motion.div>
    );
  }

  if (isError || balanceCents === null) {
    return (
      <ErrorCard
        context={t("billing1.balance.errorContext")}
        hint={t("billing1.balance.errorHint")}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <motion.section {...sectionMotion} className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-1 px-4">
        <Text variant="body-medium" as="span" className="text-textBlack">
          {t("billing1.balance.title")}
        </Text>
        <InformationTooltip
          description={t("billing1.balance.explainer")}
          iconSize={22}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-border-base bg-surface p-5 shadow-[0_1px_2px_rgba(15,15,20,0.04)]">
        <Text variant="h2" as="span" className="text-textBlack">
          {formatCents(balanceCents)}
        </Text>
        <Dialog
          title={t("billing1.balance.addTitle")}
          styling={{ maxWidth: "420px" }}
          controlled={{ isOpen: open, set: setOpen }}
        >
          <Dialog.Trigger>
            <Button variant="primary" size="small">
              {t("billing1.balance.addButton")}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <div className="flex flex-col gap-3">
              <Text
                variant="small"
                as="span"
                className="text-foreground-tertiary"
              >
                {t("billing1.balance.stripeNote")}
              </Text>
              <Input
                id="addcredits-amount"
                label={t("billing1.balance.amountLabel")}
                type="amount"
                amountPrefix="$"
                decimalCount={0}
                placeholder={t("billing1.balance.amountPlaceholder")}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                wrapperClassName="!mb-0"
              />
            </div>
            <Dialog.Footer>
              <Button
                type="button"
                variant="ghost"
                size="small"
                onClick={() => setOpen(false)}
              >
                {t("billing1.balance.cancel")}
              </Button>
              <Button
                type="button"
                variant="primary"
                size="small"
                disabled={!isValid || isAdding || isRedirecting}
                loading={isAdding}
                onClick={handleSubmit}
              >
                {t("billing1.balance.continue")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>
    </motion.section>
  );
}
