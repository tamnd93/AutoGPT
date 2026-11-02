"use client";
import { motion, useReducedMotion } from "framer-motion";

import { Select } from "@/components/atoms/Select/Select";
import { Text } from "@/components/atoms/Text/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip/BaseTooltip";

import { useT } from "@/lib/i18n";
import { EASE_OUT, TIMEZONES, findTimezoneLabel } from "../../helpers";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  value: string;
  onChange: (timezone: string) => void;
  index?: number;
}

export function TimezoneCard({ value, onChange, index = 0 }: Props) {
  const t = useT();
  const reduceMotion = useReducedMotion();

  const options = TIMEZONES.some((t) => t.value === value)
    ? TIMEZONES
    : [{ value, label: findTimezoneLabel(value) }, ...TIMEZONES];

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 0.32,
              ease: EASE_OUT,
              delay: 0.04 + index * 0.05,
            }
      }
      className="flex w-full flex-col"
    >
      <div className="flex h-fit flex-col justify-center gap-3 rounded-[18px] border border-border-base bg-surface px-4 py-3 shadow-[0_1px_2px_rgba(15,15,20,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Text variant="body-medium" as="span" className="text-textBlack">
              {t("account1.timezone.title")}
            </Text>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={t("account1.timezone.infoAria")}
                  className="flex items-center text-foreground-subtle transition-colors hover:text-foreground-secondary focus-visible:text-foreground-secondary focus-visible:outline-none"
                >
                  <Icon icon={InformationCircleIcon} size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>{t("account1.timezone.tooltip")}</TooltipContent>
            </Tooltip>
          </div>

          <Select
            id="timezone"
            label={t("account1.timezone.selectLabel")}
            hideLabel
            value={value}
            onValueChange={onChange}
            options={options}
            placeholder={t("account1.timezone.placeholder")}
            size="small"
            wrapperClassName="!mb-0 w-fit"
          />
        </div>
      </div>
    </motion.section>
  );
}
