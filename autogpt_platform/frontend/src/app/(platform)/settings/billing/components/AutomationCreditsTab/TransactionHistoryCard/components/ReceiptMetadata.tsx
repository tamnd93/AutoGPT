import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { useLocale, useT } from "@/lib/i18n";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import {
  formatActivityDate,
  statusLabel,
  taskHref,
  type Transaction,
} from "../helpers";

type Props = { transaction: Transaction };

export function ReceiptMetadata({ transaction }: Props) {
  const t = useT();
  const locale = useLocale();
  const started = formatActivityDate(transaction.execution_started_at, locale);
  const posted = formatActivityDate(transaction.transaction_time, locale);
  const cutoff = formatActivityDate(transaction.receipt_as_of, locale);
  return (
    <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-border-base pt-4">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {transaction.execution_status && (
          <div className="flex flex-col items-start gap-1">
            <Text variant="small" className="text-foreground-secondary">
              {t("billing1.metadata.runStatus")}
            </Text>
            <Badge
              variant={
                transaction.execution_status === "COMPLETED"
                  ? "success"
                  : transaction.execution_status === "FAILED"
                    ? "error"
                    : "info"
              }
              size="small"
            >
              {statusLabel(transaction.execution_status, t)}
            </Badge>
          </div>
        )}
        {transaction.execution_started_at && (
          <MetadataField
            label={t("billing1.metadata.started")}
            value={`${started.date} · ${started.time}`}
            title={started.full}
          />
        )}
        {transaction.execution_graph_version != null && (
          <MetadataField
            label={t("billing1.metadata.version")}
            value={`v${transaction.execution_graph_version}`}
          />
        )}
        <MetadataField
          label={t("billing1.metadata.lastActivity")}
          value={`${posted.date} · ${posted.time}`}
          title={posted.full}
        />
        {transaction.receipt_as_of && (
          <MetadataField
            label={t("billing1.metadata.creditsAsOf")}
            value={`${cutoff.date} · ${cutoff.time}`}
            title={cutoff.full}
          />
        )}
      </div>
      <ReceiptDestination transaction={transaction} />
    </div>
  );
}

function MetadataField({
  label,
  value,
  title,
}: {
  label: string;
  value: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Text variant="small" className="text-foreground-secondary">
        {label}
      </Text>
      <Text variant="small" title={title}>
        {value}
      </Text>
    </div>
  );
}

function ReceiptDestination({ transaction }: Props) {
  const t = useT();
  const href = taskHref(transaction);
  const conversationHref = transaction.conversation_id
    ? `/copilot?sessionId=${encodeURIComponent(transaction.conversation_id)}`
    : null;
  if (href || conversationHref) {
    return (
      <Button
        as="NextLink"
        href={href || conversationHref || ""}
        variant="secondary"
        size="small"
        className="min-h-11 min-w-0"
        rightIcon={<Icon icon={ArrowUpRight01Icon} size={16} />}
      >
        {href
          ? t("billing1.metadata.viewTask")
          : t("billing1.metadata.viewConversation")}
      </Button>
    );
  }
  if (transaction.activity_type === "agent_run") {
    const label = transaction.library_agent_id
      ? t("billing1.metadata.runUnavailable")
      : transaction.execution_available
        ? t("billing1.metadata.notInLibrary")
        : t("billing1.metadata.workflowRunUnavailable");
    return (
      <Text variant="small" className="text-foreground-secondary">
        {label}
      </Text>
    );
  }
  if (transaction.activity_type === "copilot_tools")
    return (
      <Text variant="small" className="text-foreground-secondary">
        {t("billing1.metadata.conversationUnavailable")}
      </Text>
    );
  return null;
}
