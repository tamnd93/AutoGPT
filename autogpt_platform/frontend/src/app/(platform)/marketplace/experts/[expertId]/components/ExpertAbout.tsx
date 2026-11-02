"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { ExpertSection } from "./ExpertSection";

// Roughly the number of characters that fit in the six-line clamp below.
const CLAMPED_LENGTH = 500;

interface Props {
  text: string;
}

export function ExpertAbout({ text }: Props) {
  const t = useT();
  const [isExpanded, setIsExpanded] = useState(false);
  const isClampable = text.length > CLAMPED_LENGTH;

  return (
    <ExpertSection title={t("marketplace2.expert.about")}>
      <p
        className={cn(
          "whitespace-pre-line text-base leading-7 text-foreground-secondary",
          isClampable && !isExpanded && "line-clamp-6",
        )}
      >
        {text}
      </p>
      {isClampable ? (
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-foreground-tertiary transition-colors hover:text-foreground-strong"
        >
          {isExpanded
            ? t("marketplace2.expert.showLess")
            : t("marketplace2.expert.readMore")}
          <Icon
            icon={ArrowDown01Icon}
            size={14}
            className={cn(
              "transition-transform duration-200",
              isExpanded && "rotate-180",
            )}
          />
        </button>
      ) : null}
    </ExpertSection>
  );
}
