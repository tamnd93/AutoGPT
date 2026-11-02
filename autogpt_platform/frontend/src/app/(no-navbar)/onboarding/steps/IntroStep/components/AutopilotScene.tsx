import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import { AutopilotAvatar } from "@/components/molecules/AutopilotAvatar/AutopilotAvatar";

const POINTS = [
  "onboarding2.intro.point1",
  "onboarding2.intro.point2",
  "onboarding2.intro.point3",
  "onboarding2.intro.point4",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function reveal(i: number) {
  return { delay: 0.25 + i * 0.15, duration: 0.5, ease: EASE };
}

export function AutopilotScene() {
  const t = useT();

  return (
    <div className="flex h-full flex-col items-center justify-start gap-4">
      <AutopilotAvatar size={120} transparent />

      <div className="flex flex-col items-center gap-3">
        <ul className="flex flex-col items-center gap-2">
          {POINTS.map((pointKey, i) => (
            <motion.li
              key={pointKey}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reveal(i)}
              className="flex items-center gap-1.5"
            >
              <Icon
                icon={ArrowRight01Icon}
                size={18}
                className="shrink-0 text-brand"
              />
              <Text variant="large" as="span" className="md:text-lead">
                {t(pointKey)}
              </Text>
            </motion.li>
          ))}
        </ul>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reveal(POINTS.length)}
        >
          <Text variant="large" as="p" tone="muted" className="md:text-lead">
            {t("onboarding2.intro.andMore")}
          </Text>
        </motion.div>
      </div>
    </div>
  );
}
