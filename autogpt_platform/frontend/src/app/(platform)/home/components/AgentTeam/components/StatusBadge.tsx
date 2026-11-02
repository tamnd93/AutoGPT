import type { HomeAgentStatus } from "@/app/api/__generated__/models/homeAgentStatus";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  working: { labelKey: "home1.status.working", dot: "bg-primary", pulse: true },
  ready: {
    labelKey: "home1.status.ready",
    dot: "bg-emerald-500",
    pulse: false,
  },
  needs_setup: {
    labelKey: "home1.status.needsSetup",
    dot: "bg-warning",
    pulse: false,
  },
  paused: { labelKey: "home1.status.paused", dot: "bg-zinc-400", pulse: false },
  failed: { labelKey: "home1.status.failed", dot: "bg-error", pulse: false },
} as const;

const UNKNOWN_STATUS_CONFIG = {
  labelKey: "home1.status.unknown",
  dot: "bg-zinc-300",
  pulse: false,
} as const;

interface Props {
  status: HomeAgentStatus["status"];
}

/** A dot and a word: the status reads at a glance without a filled pill
 *  competing with the name beside it. */
export function StatusBadge({ status }: Props) {
  const t = useT();
  const config =
    STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ??
    UNKNOWN_STATUS_CONFIG;
  const labelKey: MessageKey = config.labelKey;

  return (
    <Text
      variant="small-medium"
      as="span"
      tone="muted"
      className="inline-flex shrink-0 items-center gap-1.5"
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          config.dot,
          config.pulse && "animate-pulse",
        )}
        aria-hidden="true"
      />
      {t(labelKey)}
    </Text>
  );
}
