import { GraphModel } from "@/app/api/__generated__/models/graphModel";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Button } from "@/components/atoms/Button/Button";
import { Graph } from "@/lib/autogpt-server-api/types";
import { cn } from "@/lib/utils";
import { Text } from "@/components/atoms/Text/Text";
import { useAgentSafeMode } from "@/hooks/useAgentSafeMode";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip/BaseTooltip";
import { SecurityCheckIcon, Shield01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  graph: GraphModel | LibraryAgent | Graph;
  className?: string;
  fullWidth?: boolean;
}

interface SafeModeButtonProps {
  isEnabled: boolean;
  label: string;
  tooltipEnabled: string;
  tooltipDisabled: string;
  onToggle: () => void;
  isPending: boolean;
  fullWidth?: boolean;
}

function SafeModeButton({
  isEnabled,
  label,
  tooltipEnabled,
  tooltipDisabled,
  onToggle,
  isPending,
  fullWidth = false,
}: SafeModeButtonProps) {
  const t = useT();

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          variant={isEnabled ? "primary" : "outline"}
          size="small"
          onClick={onToggle}
          disabled={isPending}
          className={cn("justify-start", fullWidth ? "w-full" : "")}
        >
          {isEnabled ? (
            <>
              <Icon icon={SecurityCheckIcon} size={16} />
              <Text
                // TODO(tokens): no fitting role for text-zinc-200 #DADADC; #DADADC is surface-active (a surface fill), border-base (a border colour)
                variant="body"
                className="text-zinc-200"
              >
                {label}: {t("build1.safeMode.on")}
              </Text>
            </>
          ) : (
            <>
              <Icon icon={Shield01Icon} size={16} />
              <Text variant="body" tone="secondary">
                {label}: {t("build1.safeMode.off")}
              </Text>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-center">
          <Text variant="small-medium-lh-normal" as="div" tone="inherit">
            {label}:{" "}
            {isEnabled ? t("build1.safeMode.on") : t("build1.safeMode.off")}
          </Text>
          <Text
            variant="small-tight"
            as="div"
            className="mt-1 text-muted-foreground"
          >
            {isEnabled ? tooltipEnabled : tooltipDisabled}
          </Text>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function FloatingSafeModeToggle({
  graph,
  className,
  fullWidth = false,
}: Props) {
  const t = useT();
  const {
    currentHITLSafeMode,
    showHITLToggle,
    handleHITLToggle,
    currentSensitiveActionSafeMode,
    showSensitiveActionToggle,
    handleSensitiveActionToggle,
    isPending,
    shouldShowToggle,
  } = useAgentSafeMode(graph);

  if (!shouldShowToggle || isPending) {
    return null;
  }

  return (
    <div className={cn("fixed z-50 flex flex-col gap-2", className)}>
      {showHITLToggle && (
        <SafeModeButton
          isEnabled={currentHITLSafeMode}
          label={t("build1.safeMode.hitlLabel")}
          tooltipEnabled={t("build1.safeMode.hitlEnabled")}
          tooltipDisabled={t("build1.safeMode.hitlDisabled")}
          onToggle={handleHITLToggle}
          isPending={isPending}
          fullWidth={fullWidth}
        />
      )}
      {showSensitiveActionToggle && (
        <SafeModeButton
          isEnabled={currentSensitiveActionSafeMode}
          label={t("build1.safeMode.sensitiveLabel")}
          tooltipEnabled={t("build1.safeMode.sensitiveEnabled")}
          tooltipDisabled={t("build1.safeMode.sensitiveDisabled")}
          onToggle={handleSensitiveActionToggle}
          isPending={isPending}
          fullWidth={fullWidth}
        />
      )}
    </div>
  );
}
