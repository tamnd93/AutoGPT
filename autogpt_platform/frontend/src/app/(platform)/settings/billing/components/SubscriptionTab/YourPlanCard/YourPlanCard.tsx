"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { BillingOffer } from "../BillingOffer";
import { AutopilotUsageCard } from "../AutopilotUsageCard/AutopilotUsageCard";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";

import {
  formatCents,
  formatShortDate,
  getSectionMotionProps,
} from "../../../helpers";
import { CycleToggle } from "./CycleToggle";
import { SwitchCycleDialog } from "./SwitchCycleDialog";
import { SwitchTierDialog } from "./SwitchTierDialog";
import { useLocale, useT } from "@/lib/i18n";
import { ENTERPRISE_CONTACT_URL, useYourPlanCard } from "./useYourPlanCard";
import { LinkSquare01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  index?: number;
  showUsage?: boolean;
}

export function YourPlanCard({ index = 0, showUsage = false }: Props) {
  const t = useT();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const controller = useYourPlanCard();
  const {
    plan,
    isError,
    retry,
    isLoading,
    isUpdatingTier,
    isRedirecting,
    canManagePortal,
    canUpgrade,
    canDowngrade,
    canResume,
    selectedCycle,
    pendingCycle,
    pendingTierUpgrade,
    pendingTierUpgradeLabel,
    pendingTierDowngrade,
    pendingTierDowngradeLabel,
    isCycleToggleVisible,
    cycleDialogTitle,
    cycleDialogBody,
    tierUpgradeDialogBody,
    tierDowngradeDialogBody,
    onCycleChange,
    onConfirmCycleSwitch,
    onCancelCycleSwitch,
    onConfirmTierUpgrade,
    onCancelTierUpgrade,
    onConfirmTierDowngrade,
    onCancelTierDowngrade,
    onUpgrade,
    onDowngrade,
    onResume,
    onManage,
  } = controller;

  const sectionMotion = getSectionMotionProps(index, Boolean(reduceMotion));

  if (plan?.tierKey === "TRIAL") return null;
  if (isError)
    return (
      <ErrorCard context={t("billing2.plan.errorContext")} onRetry={retry} />
    );

  if (isLoading || !plan) {
    return (
      <motion.div {...sectionMotion}>
        <Skeleton className="h-[100px] rounded-[18px]" />
      </motion.div>
    );
  }

  return (
    <motion.section {...sectionMotion} className="flex w-full flex-col gap-4">
      <div className="sr-only">
        <Text variant="body-medium" as="span" className="text-textBlack">
          {t("billing2.plan.aria")}
        </Text>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Text variant="large-semibold" as="h2" className="text-textBlack">
              {plan.label}
            </Text>
            <Badge
              variant="success"
              size="small"
              className={
                plan.isPendingCancel ||
                plan.isPendingDowngrade ||
                plan.isPendingCycleSwitch
                  ? // TODO(tokens): no exact role (bg-amber-100 #FEF3C7, text-amber-800 #92400E)
                    "bg-amber-100 text-amber-800"
                  : // TODO(tokens): no exact role (bg-violet-100 #EDE9FE, text-violet-800 #5B21B6)
                    "bg-violet-100 text-violet-800"
              }
            >
              {!plan.isPaidPlan
                ? t("billing2.plan.badge.inactive")
                : plan.isPendingCancel
                  ? t("billing2.plan.badge.cancellationScheduled")
                  : plan.isPendingDowngrade
                    ? t("billing2.plan.badge.downgradeScheduled")
                    : plan.isPendingCycleSwitch
                      ? t("billing2.plan.badge.cycleSwitchScheduled")
                      : t("billing2.plan.badge.active")}
            </Badge>
            {isCycleToggleVisible ? (
              <CycleToggle
                value={selectedCycle}
                onChange={onCycleChange}
                disabled={isUpdatingTier || isRedirecting}
              />
            ) : null}
          </div>
          {plan.isAdminManaged ? (
            <Text variant="body" as="span" className="text-foreground-body">
              {t("billing2.plan.managed")}{" "}
              <a
                href={ENTERPRISE_CONTACT_URL}
                // TODO(tokens): no fitting role for hover:text-purple-600 #6C2EDF; #6C2EDF is brand-hover, a hover fill
                className="font-medium text-brand no-underline hover:text-purple-600"
              >
                {t("billing2.plan.contactUs")}
              </a>{" "}
              {t("billing2.plan.forChanges")}
            </Text>
          ) : plan.isPaidPlan ? (
            <Text variant="body" as="span" className="text-foreground-body">
              {formatCents(plan.monthlyCostCents)}
              {plan.billingCycle === "yearly"
                ? t("billing2.plan.perYear")
                : t("billing2.plan.perMonth")}
              {plan.isPendingCancel && plan.pendingEffectiveAt
                ? t("billing2.plan.endsOn", {
                    date: formatShortDate(plan.pendingEffectiveAt, locale),
                  })
                : plan.isPendingDowngrade &&
                    plan.pendingEffectiveAt &&
                    plan.pendingTierLabel
                  ? t("billing2.plan.switchesTo", {
                      tier: plan.pendingTierLabel,
                      date: formatShortDate(plan.pendingEffectiveAt, locale),
                    })
                  : plan.isPendingCycleSwitch && plan.pendingEffectiveAt
                    ? t("billing2.plan.activeUntil", {
                        date: formatShortDate(plan.pendingEffectiveAt, locale),
                      })
                    : plan.currentPeriodEnd
                      ? t("billing2.plan.renewsOn", {
                          date: formatShortDate(
                            plan.currentPeriodEnd * 1000,
                            locale,
                          ),
                        })
                      : null}
            </Text>
          ) : (
            <Text variant="body" as="span" className="text-foreground-body">
              {t("billing2.plan.pickPlan")}
            </Text>
          )}
          {plan.isPaidPlan &&
          plan.isPendingCycleSwitch &&
          plan.pendingEffectiveAt &&
          plan.pendingCycle ? (
            <Text
              variant="small"
              as="span"
              className="text-foreground-tertiary"
            >
              {t("billing2.plan.pendingSwitch", {
                cycle: plan.pendingCycle,
                name: plan.label,
                date: formatShortDate(plan.pendingEffectiveAt, locale),
              })}{" "}
              {t("billing2.plan.noChargeToday")}
            </Text>
          ) : null}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {canResume ? (
            <Button
              variant="primary"
              size="small"
              onClick={onResume}
              disabled={isUpdatingTier || isRedirecting}
              loading={isUpdatingTier}
            >
              {plan.isPendingCancel
                ? t("billing2.plan.resumeSubscription")
                : plan.isPendingCycleSwitch
                  ? t("billing2.plan.cancelCycleSwitch")
                  : t("billing2.plan.cancelDowngrade")}
            </Button>
          ) : null}
          {canDowngrade && plan.previousTierLabel ? (
            <Button
              variant="outline"
              size="small"
              onClick={onDowngrade}
              disabled={isUpdatingTier || isRedirecting}
              loading={isUpdatingTier}
            >
              {t("billing2.plan.downgradeTo", {
                tier: plan.previousTierLabel,
              })}
            </Button>
          ) : null}
          {plan.isPaidPlan && !plan.isAdminManaged ? (
            <Button
              variant="secondary"
              size="small"
              onClick={onManage}
              disabled={!canManagePortal}
            >
              {t("billing2.plan.manageSubscription")}
            </Button>
          ) : null}
          {canUpgrade &&
          plan.nextTierLabel &&
          (!showUsage || !plan.isPaidPlan) ? (
            <Button
              variant="primary"
              size="small"
              onClick={onUpgrade}
              disabled={isUpdatingTier || isRedirecting}
              loading={isUpdatingTier && !plan.nextTierIsTeamLink}
              rightIcon={
                plan.nextTierIsTeamLink ? (
                  <Icon icon={LinkSquare01Icon} size={14} aria-hidden="true" />
                ) : undefined
              }
            >
              {!plan.isPaidPlan
                ? t("billing2.plan.startTier", { tier: plan.nextTierLabel })
                : plan.nextTierIsTeamLink
                  ? t("billing2.plan.talkToSales", { tier: plan.nextTierLabel })
                  : t("billing2.plan.upgradeTo", { tier: plan.nextTierLabel })}
            </Button>
          ) : null}
        </div>
      </div>

      {showUsage ? (
        <div className="grid items-stretch gap-4 md:grid-cols-[1.15fr_1fr]">
          <AutopilotUsageCard index={1} />
          <BillingOffer controller={controller} />
        </div>
      ) : null}

      {pendingCycle ? (
        <SwitchCycleDialog
          isOpen={pendingCycle !== null}
          onOpenChange={(open) => {
            if (!open) onCancelCycleSwitch();
          }}
          targetCycle={pendingCycle}
          title={cycleDialogTitle || undefined}
          body={cycleDialogBody}
          isSaving={isUpdatingTier}
          onConfirm={onConfirmCycleSwitch}
        />
      ) : null}

      {pendingTierUpgrade && pendingTierUpgradeLabel ? (
        <SwitchTierDialog
          isOpen={pendingTierUpgrade !== null}
          onOpenChange={(open) => {
            if (!open) onCancelTierUpgrade();
          }}
          targetTierLabel={pendingTierUpgradeLabel}
          body={tierUpgradeDialogBody}
          priceCents={controller.offerPriceCents}
          billingCycle={plan.billingCycle}
          usageCarriesOver={
            plan.tierKey === "PRO" && pendingTierUpgrade === "MAX"
          }
          usageMultiplier={controller.upgradeUsageMultiplier}
          upgradeReview={controller.upgradeReview}
          isSaving={isUpdatingTier}
          onConfirm={onConfirmTierUpgrade}
        />
      ) : null}

      {pendingTierDowngrade && pendingTierDowngradeLabel ? (
        <SwitchTierDialog
          isOpen={pendingTierDowngrade !== null}
          onOpenChange={(open) => {
            if (!open) onCancelTierDowngrade();
          }}
          targetTierLabel={pendingTierDowngradeLabel}
          title={t("billing2.plan.downgradeTitle", {
            tier: pendingTierDowngradeLabel,
          })}
          confirmLabel={t("billing2.plan.downgradeAction", {
            tier: pendingTierDowngradeLabel,
          })}
          body={tierDowngradeDialogBody}
          isSaving={isUpdatingTier}
          onConfirm={onConfirmTierDowngrade}
        />
      ) : null}
    </motion.section>
  );
}
