"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Select } from "@/components/atoms/Select/Select";
import { Switch } from "@/components/atoms/Switch/Switch";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

import {
  BRIEFING_OPTIONS,
  EASE_OUT,
  type BriefingFrequency,
  type NotificationSettings,
} from "../../helpers";

interface Props {
  values: NotificationSettings;
  onBriefingFrequencyChange: (value: BriefingFrequency) => void;
  onAlertsChange: (value: boolean) => void;
  onStoreVerdictsChange: (value: boolean) => void;
  index?: number;
}

export function NotificationsCard({
  values,
  onBriefingFrequencyChange,
  onAlertsChange,
  onStoreVerdictsChange,
  index = 0,
}: Props) {
  const t = useT();
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 0.32, ease: EASE_OUT, delay: 0.04 + index * 0.05 }
      }
      className="flex w-full flex-col"
    >
      <div className="flex h-fit flex-col gap-4 rounded-[18px] border border-border-base bg-surface px-4 py-3 shadow-[0_1px_2px_rgba(15,15,20,0.04)]">
        <div className="flex flex-col gap-1">
          <Text variant="body-medium" as="span" className="text-textBlack">
            {t("account1.notif.emailTitle")}
          </Text>
          <Text variant="small" as="span" className="text-foreground-tertiary">
            {t("account1.notif.billingNote")}
          </Text>
        </div>

        <div className="flex flex-col gap-2">
          <Select
            id="briefing-frequency"
            label={t("account1.notif.briefingLabel")}
            value={values.briefingFrequency}
            options={BRIEFING_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            onValueChange={(value) =>
              onBriefingFrequencyChange(value as BriefingFrequency)
            }
          />
          <Text variant="small" as="span" className="text-foreground-tertiary">
            {t("account1.notif.briefingBody")}
          </Text>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <Text variant="body-medium" as="span" className="text-textBlack">
              {t("account1.notif.alertsTitle")}
            </Text>
            <Text
              variant="small"
              as="span"
              className="text-foreground-tertiary"
            >
              {t("account1.notif.alertsBody")}
            </Text>
          </div>
          <Switch
            checked={values.alertsEnabled}
            onCheckedChange={onAlertsChange}
            aria-label={t("account1.notif.alertsTitle")}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <Text variant="body-medium" as="span" className="text-textBlack">
              {t("account1.notif.storeTitle")}
            </Text>
            <Text
              variant="small"
              as="span"
              className="text-foreground-tertiary"
            >
              {t("account1.notif.storeBody")}
            </Text>
          </div>
          <Switch
            checked={values.storeVerdictsEnabled}
            onCheckedChange={onStoreVerdictsChange}
            aria-label={t("account1.notif.storeTitle")}
          />
        </div>
      </div>
    </motion.section>
  );
}
