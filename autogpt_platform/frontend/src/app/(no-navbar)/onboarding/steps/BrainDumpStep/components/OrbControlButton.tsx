"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { SwapFade } from "@/components/atoms/SwapFade/SwapFade";
import { useT } from "@/lib/i18n";
import {
  ArrowReloadHorizontalIcon,
  Mic01Icon,
} from "@hugeicons/core-free-icons";

const LABELS = {
  rest: "onboarding1.orb.start",
  failed: "onboarding1.orb.retry",
} as const;

interface Props {
  screen: keyof typeof LABELS;
  onClick?: () => void;
}

export function OrbControlButton({ screen, onClick }: Props) {
  const t = useT();
  const ariaLabel = t(LABELS[screen]);

  return (
    <Button
      variant="icon"
      size="icon"
      onClick={onClick}
      aria-label={ariaLabel}
      className="mt-4 border border-border-base bg-surface hover:border-border-strong hover:bg-surface-muted"
    >
      <SwapFade swapKey={screen} className="flex items-center justify-center">
        {screen === "failed" ? (
          <Icon icon={ArrowReloadHorizontalIcon} size={22} />
        ) : (
          <Icon icon={Mic01Icon} size={22} />
        )}
      </SwapFade>
    </Button>
  );
}
