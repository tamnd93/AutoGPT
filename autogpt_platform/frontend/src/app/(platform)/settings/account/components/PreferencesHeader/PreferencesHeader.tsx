"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

import { EASE_OUT } from "../../helpers";

export function PreferencesHeader() {
  const t = useT();
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.32, ease: EASE_OUT }}
      className="flex min-w-0 flex-col pb-2 pl-4"
    >
      <Text variant="h4" as="h1" className="leading-7 text-textBlack">
        {t("account1.header.title")}
      </Text>
      <Text variant="body" className="mt-4 max-w-[600px] text-foreground-body">
        {t("account1.header.body")}
      </Text>
    </motion.header>
  );
}
