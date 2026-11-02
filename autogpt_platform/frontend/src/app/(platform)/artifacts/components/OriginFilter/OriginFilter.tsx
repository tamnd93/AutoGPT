"use client";

import { Text } from "@/components/atoms/Text/Text";
import { cn } from "@/lib/utils";
import { LayoutGroup, motion, type Transition } from "framer-motion";
import type { OriginFilter as OriginFilterValue } from "../../useArtifactsPage";
import { useT, type MessageKey } from "@/lib/i18n";

interface Props {
  value: OriginFilterValue;
  onChange: (value: OriginFilterValue) => void;
}

interface Option {
  value: OriginFilterValue;
  labelKey: MessageKey;
}

const OPTIONS: Option[] = [
  { value: "all", labelKey: "artifacts1.origin.all" },
  { value: "uploaded", labelKey: "artifacts1.origin.uploaded" },
  { value: "generated", labelKey: "artifacts1.origin.generated" },
];

const snappySpring: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 1,
};

export function OriginFilter({ value, onChange }: Props) {
  const t = useT();

  return (
    <LayoutGroup id="artifacts-origin-filter">
      <div className="flex flex-col gap-1">
        <Text
          variant="small"
          as="span"
          className="pl-4 text-foreground-tertiary"
        >
          {t("artifacts1.origin.type")}
        </Text>
        <div
          role="tablist"
          aria-label={t("artifacts1.origin.aria")}
          className="flex items-center gap-1"
          data-testid="artifacts-origin-filter"
        >
          {OPTIONS.map((opt) => (
            <OriginTab
              key={opt.value}
              value={opt.value}
              label={t(opt.labelKey)}
              active={value === opt.value}
              onClick={() => onChange(opt.value)}
            />
          ))}
        </div>
      </div>
    </LayoutGroup>
  );
}

interface OriginTabProps {
  value: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function OriginTab({ value, label, active, onClick }: OriginTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        // TODO(tokens): no fitting role for focus-visible:ring-zinc-400 #ADADB3; #ADADB3 is foreground-subtle, a text colour
        "relative rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400",
        active
          ? "text-foreground-strong"
          : "text-foreground-tertiary hover:text-foreground-strong",
      )}
      data-testid={`artifacts-origin-filter-${value}`}
    >
      {active ? (
        <motion.span
          layoutId="artifacts-origin-active"
          className="absolute inset-0 rounded-full bg-surface-hover"
          transition={snappySpring}
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
