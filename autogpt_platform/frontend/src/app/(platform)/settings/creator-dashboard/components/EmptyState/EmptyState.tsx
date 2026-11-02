"use client";
import { motion, useReducedMotion } from "framer-motion";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

import { EASE_OUT } from "../../helpers";
import { Rocket01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

export function EmptyState() {
  const t = useT();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.28, ease: EASE_OUT }}
      className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center"
    >
      <Icon icon={Rocket01Icon} size={28} className="text-foreground-subtle" />
      <Text variant="body-medium" className="text-textBlack">
        {t("settingsRest2.empty.title")}
      </Text>
      <Text variant="small" className="max-w-[460px] text-foreground-tertiary">
        {t("settingsRest2.empty.body")}
      </Text>
    </motion.div>
  );
}
