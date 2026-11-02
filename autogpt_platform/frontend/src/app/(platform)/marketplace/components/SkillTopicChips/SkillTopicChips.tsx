"use client";

import { useStoreCategories } from "@/hooks/useStoreCategories";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CategoryChip, type ChipSize } from "../CategoryChip/CategoryChip";
import { getCategoryAccent } from "../ExpertsSection/helpers";

interface Props {
  selected: string | null;
  onSelect: (topic: string | null) => void;
  size?: ChipSize;
}

export function SkillTopicChips({ selected, onSelect, size = "small" }: Props) {
  const t = useT();
  const { categories } = useStoreCategories();

  if (categories.length === 0) return null;

  return (
    <div
      role="group"
      aria-label={t("marketplace1.skillChips.filterAria")}
      className={cn(
        "flex flex-wrap",
        size === "default" ? "gap-2" : "gap-1 sm:justify-end",
      )}
    >
      <CategoryChip
        label={t("marketplace1.all")}
        size={size}
        isSelected={selected === null}
        onClick={() => onSelect(null)}
      />
      {categories.map((category) => {
        const { accent, icon } = getCategoryAccent(category.value);
        return (
          <CategoryChip
            key={category.value}
            label={category.label}
            title={category.description}
            icon={icon}
            accent={accent}
            size={size}
            isSelected={selected === category.value}
            onClick={() =>
              onSelect(selected === category.value ? null : category.value)
            }
          />
        );
      })}
    </div>
  );
}
