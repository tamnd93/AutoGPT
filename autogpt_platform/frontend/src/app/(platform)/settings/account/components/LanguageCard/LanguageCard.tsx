"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Select } from "@/components/atoms/Select/Select";
import { Text } from "@/components/atoms/Text/Text";
import {
  isLocale,
  useLocale,
  useT,
  writeLocaleCookie,
  type Locale,
} from "@/lib/i18n";

import { EASE_OUT } from "../../helpers";

const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "vi", label: "Tiếng Việt" },
];

interface Props {
  index?: number;
}

export function LanguageCard({ index = 0 }: Props) {
  const t = useT();
  const reduceMotion = useReducedMotion();
  const locale = useLocale();

  function handleChange(value: string) {
    if (!isLocale(value)) return;
    writeLocaleCookie(value);
    window.location.reload();
  }

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
          <Text variant="body-medium" as="span" className="text-textBlack">
            {t("account1.language.title")}
          </Text>

          <Select
            id="language"
            label={t("account1.language.selectLabel")}
            hideLabel
            value={locale}
            onValueChange={handleChange}
            options={LOCALE_OPTIONS}
            size="small"
            wrapperClassName="!mb-0 w-fit"
          />
        </div>
      </div>
    </motion.section>
  );
}
