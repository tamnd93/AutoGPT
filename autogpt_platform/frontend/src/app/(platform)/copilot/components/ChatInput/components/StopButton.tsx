import { PromptInputSubmit } from "@/components/organisms/PromptInput/PromptInput";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipPortal,
} from "@/components/atoms/Tooltip/BaseTooltip";
import { useT } from "@/lib/i18n";
import { useEffect, useState } from "react";

// Stop takes Send's place under the finger that just used it; a stray second
// tap on a phone lands well inside this.
const STOP_ARM_MS = 1000;

interface Props {
  onStop?: () => void;
  className?: string;
}

export function StopButton({ onStop, className }: Props) {
  const t = useT();
  const [isArmed, setIsArmed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsArmed(true), STOP_ARM_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tooltip inheritDelay>
      <TooltipTrigger asChild>
        <PromptInputSubmit
          status="streaming"
          onStop={onStop}
          disabled={!isArmed}
          className={className}
        />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent side="top">
          {t("chatInput2.stop.tooltip")}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
