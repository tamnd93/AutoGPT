"use client";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Props {
  value: "monthly" | "yearly";
  onChange: (cycle: "monthly" | "yearly") => void;
  disabled?: boolean;
}

const CYCLES = ["monthly", "yearly"] as const;

export function CycleToggle({ value, onChange, disabled }: Props) {
  const t = useT();
  return (
    <div
      role="radiogroup"
      aria-label={t("billing2.cycle.aria")}
      // TODO(tokens): no exact role (border-[#d8d8d8])
      className="inline-flex rounded-full border border-[#d8d8d8] bg-surface-hover p-[3px]"
    >
      {CYCLES.map((cycle) => {
        const selected = value === cycle;
        return (
          <button
            key={cycle}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(cycle)}
            className={cn(
              "rounded-full border-none px-3 py-1 text-xs font-medium transition-all",
              selected
                ? "bg-surface text-foreground-strong shadow-sm"
                : "bg-transparent text-foreground-tertiary hover:text-foreground-body",
              disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {cycle === "monthly" ? (
              t("billing2.cycle.monthly")
            ) : (
              <>
                {t("billing2.cycle.yearly")}{" "}
                <span
                  // TODO(tokens): no exact role (from-green-500 #16A34A, via-emerald-500 #10B981, to-teal-500 #14B8A6)
                  className="ml-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-caption-sm font-semibold leading-inherit text-transparent"
                >
                  {t("billing2.cycle.save")}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
