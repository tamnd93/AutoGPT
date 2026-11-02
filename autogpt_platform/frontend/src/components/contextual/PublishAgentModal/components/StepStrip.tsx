import { Fragment } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Text } from "@/components/atoms/Text/Text";
import { cn } from "@/lib/utils";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

type Props = {
  currentStep: "select" | "info" | "review";
};

const STEP_KEYS = [
  { key: "select", labelKey: "marketplace4.strip.workflow" },
  { key: "info", labelKey: "marketplace4.strip.listing" },
  { key: "review", labelKey: "marketplace4.strip.review" },
] as const;

function getStepIndex(currentStep: Props["currentStep"]) {
  return STEP_KEYS.findIndex((step) => step.key === currentStep);
}

export function StepStrip({ currentStep }: Props) {
  const t = useT();
  const steps = STEP_KEYS.map((step) => ({
    ...step,
    label: t(step.labelKey),
  }));
  const currentIndex = getStepIndex(currentStep);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-6 px-1 pb-6 sm:px-2">
      <div className="flex items-center gap-2 pr-12">
        <Text variant="lead-medium" as="span" className="text-textBlack">
          {t("marketplace4.strip.heading")}
        </Text>
      </div>

      <ol
        aria-label={t("marketplace4.strip.progressAria")}
        className="flex w-full items-center gap-3"
      >
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <Fragment key={step.key}>
              <li
                aria-current={isCurrent ? "step" : undefined}
                className="flex shrink-0 items-center gap-2"
              >
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { scale: isCurrent ? 1.04 : 1 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
                  }
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-caption font-medium leading-inherit transition-colors",
                    isCurrent
                      ? "bg-action-hover text-action-foreground"
                      : isComplete
                        ? "bg-action-hover text-action-foreground"
                        : "border border-border-strong bg-surface text-foreground-subtle",
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isComplete ? (
                      <motion.span
                        key="check"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.6 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.6 }
                        }
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center justify-center"
                      >
                        <Icon icon={Tick02Icon} size={12} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="num"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 4 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -4 }
                        }
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
                <Text
                  variant="small-medium"
                  as="span"
                  className={cn(
                    "whitespace-nowrap !text-current transition-colors",
                    isCurrent
                      ? "text-foreground"
                      : isComplete
                        ? "text-foreground-body"
                        : "font-normal text-foreground-subtle",
                  )}
                >
                  {step.label}
                </Text>
              </li>
              {!isLast ? (
                <li aria-hidden className="relative h-0 flex-1">
                  <span className="absolute inset-x-0 top-0 border-t border-solid border-border-base" />
                  <motion.span
                    initial={false}
                    animate={{ scaleX: isComplete ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
                    }
                    className="absolute inset-x-0 top-0 border-t border-solid border-action-hover"
                  />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
