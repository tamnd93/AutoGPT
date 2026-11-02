import type { CreditHistoryRelatedExecution } from "@/app/api/__generated__/models/creditHistoryRelatedExecution";
import { Button } from "@/components/atoms/Button/Button";
import { Link } from "@/components/atoms/Link/Link";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { libraryHref, type Transaction } from "../helpers";
import { TransactionAmount } from "./TransactionAmount";

type Props = {
  transaction: Transaction;
  loadedTransactions: Transaction[];
  onSelectRelated: (executionID: string) => void;
};

export function ReceiptRelations({
  transaction,
  loadedTransactions,
  onSelectRelated,
}: Props) {
  const t = useT();
  const related = transaction.related_executions ?? [];
  if (
    !transaction.parent_execution_id &&
    related.length === 0 &&
    !transaction.related_executions_has_more
  )
    return null;
  return (
    <div className="mt-4 space-y-2 border-t border-border-base pt-3">
      {transaction.parent_execution_id && (
        <Text variant="small" className="text-foreground-secondary">
          {t("billing1.relations.startedBy")}
        </Text>
      )}
      {transaction.parent_execution_id && (
        <RelatedExecution
          t={t}
          execution={{
            execution_id: transaction.parent_execution_id,
            agent_name: transaction.parent_agent_name,
            library_agent_id: transaction.parent_library_agent_id,
            execution_available: !!transaction.parent_library_agent_id,
          }}
          loadedTransactions={loadedTransactions}
          receiptAsOf={transaction.receipt_as_of}
          onSelectRelated={onSelectRelated}
        />
      )}
      {(related.length > 0 || transaction.related_executions_has_more) && (
        <Text variant="small" className="text-foreground-secondary">
          {t("billing1.relations.otherWorkflows")}
        </Text>
      )}
      {related.map((execution) => (
        <RelatedExecution
          key={execution.execution_id}
          t={t}
          execution={execution}
          loadedTransactions={loadedTransactions}
          receiptAsOf={transaction.receipt_as_of}
          onSelectRelated={onSelectRelated}
        />
      ))}
      <Text variant="small" className="text-foreground-secondary">
        {t("billing1.relations.note")}
        {related.length > 0 ? t("billing1.relations.noteSuffix") : ""}
      </Text>
      {transaction.related_executions_has_more && (
        <Text variant="small" className="text-foreground-secondary">
          {t("billing1.relations.moreHidden")}
        </Text>
      )}
    </div>
  );
}

function RelatedExecution({
  t,
  execution,
  loadedTransactions,
  receiptAsOf,
  onSelectRelated,
}: {
  t: ReturnType<typeof useT>;
  execution: CreditHistoryRelatedExecution;
  loadedTransactions: Transaction[];
  receiptAsOf: Transaction["receipt_as_of"];
  onSelectRelated: (executionID: string) => void;
}) {
  const name =
    execution.agent_name || t("billing1.history.workflowUnavailable");
  const loaded = loadedTransactions.find(
    (item) => item.usage_execution_id === execution.execution_id,
  );
  const sameSnapshot =
    receiptAsOf &&
    loaded?.receipt_as_of &&
    new Date(receiptAsOf).getTime() ===
      new Date(loaded.receipt_as_of).getTime();
  const amount = sameSnapshot ? loaded.amount : execution.amount;
  const agentHref = libraryHref(execution.library_agent_id);
  const href =
    agentHref && execution.execution_available
      ? `${agentHref}?activeTab=runs&activeItem=${encodeURIComponent(execution.execution_id)}`
      : null;
  return (
    <div className="flex items-center justify-between gap-4">
      {loaded ? (
        <Button
          variant="ghost"
          size="small"
          // TODO(tokens): no exact role (text-purple-700 #5424AE)
          className="min-h-11 min-w-0 whitespace-normal px-0 text-left text-purple-700"
          onClick={() => onSelectRelated(execution.execution_id)}
        >
          {name}
        </Button>
      ) : href ? (
        <Link
          href={href}
          // TODO(tokens): no exact role (text-purple-700 #5424AE)
          className="inline-flex min-h-11 items-center text-purple-700"
        >
          {name}
        </Link>
      ) : (
        <Text variant="small">{name}</Text>
      )}
      {amount != null && (
        <TransactionAmount amount={amount} className="text-xs" />
      )}
    </div>
  );
}
