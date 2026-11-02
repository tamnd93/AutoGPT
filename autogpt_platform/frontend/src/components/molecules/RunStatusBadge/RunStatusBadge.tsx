import { Badge } from "@/components/atoms/Badge/Badge";
import { useLocale } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

type BadgeVariant = "success" | "error" | "warning" | "info";

interface RunStatusInfo {
  label: string;
  variant: BadgeVariant;
}

interface Props {
  status: string;
}

const STATUS_KEYS: Record<string, { labelKey: string; variant: BadgeVariant }> =
  {
    COMPLETED: { labelKey: "shared3.runStatus.completed", variant: "success" },
    FAILED: { labelKey: "shared3.runStatus.failed", variant: "error" },
    RUNNING: { labelKey: "shared3.runStatus.running", variant: "info" },
    QUEUED: { labelKey: "shared3.runStatus.queued", variant: "info" },
    REVIEW: {
      labelKey: "shared3.runStatus.waitingForReview",
      variant: "warning",
    },
    TERMINATED: { labelKey: "shared3.runStatus.stopped", variant: "info" },
    INCOMPLETE: { labelKey: "shared3.runStatus.incomplete", variant: "info" },
  };

export function getRunStatusInfo(
  status: string,
  locale: Locale = DEFAULT_LOCALE,
): RunStatusInfo {
  const known = STATUS_KEYS[status.toUpperCase()];
  return known
    ? { label: getMessage(locale, known.labelKey), variant: known.variant }
    : { label: status, variant: "info" };
}

export function RunStatusBadge({ status }: Props) {
  const locale = useLocale();
  const info = getRunStatusInfo(status, locale);
  return (
    <Badge variant={info.variant} size="small">
      {info.label}
    </Badge>
  );
}
