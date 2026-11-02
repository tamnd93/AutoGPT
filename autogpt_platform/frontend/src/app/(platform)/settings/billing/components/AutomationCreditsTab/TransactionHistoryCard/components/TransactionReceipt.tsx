import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { activityName, receiptNote, type Transaction } from "../helpers";
import { ReceiptBreakdown } from "./ReceiptBreakdown";
import { ReceiptEntries } from "./ReceiptEntries";
import { ReceiptMetadata } from "./ReceiptMetadata";
import { ReceiptRelations } from "./ReceiptRelations";

type Props = {
  transaction: Transaction;
  receiptID: string;
  loadedTransactions: Transaction[];
  onSelectRelated: (executionID: string) => void;
};

export function TransactionReceipt({
  transaction,
  receiptID,
  loadedTransactions,
  onSelectRelated,
}: Props) {
  const t = useT();
  const hasRelations =
    !!transaction.parent_execution_id ||
    !!transaction.related_executions?.length ||
    !!transaction.related_executions_has_more;
  const heading =
    transaction.activity_type === "agent_run"
      ? t(
          hasRelations
            ? "billing1.receipt.chargesForRunOnly"
            : "billing1.receipt.chargesForRun",
        )
      : transaction.activity_type === "copilot_tools"
        ? t("billing1.receipt.toolUsage")
        : t("billing1.receipt.balanceChange");
  const note = receiptNote(transaction, t);
  return (
    <section
      id={receiptID}
      aria-label={t("billing1.receipt.aria", {
        name: activityName(transaction, t),
      })}
      className="mx-2 mb-3 rounded-medium border border-separator bg-surface-muted p-3 sm:mx-4 sm:p-5"
    >
      <Text variant="body-medium" as="h3">
        {heading}
      </Text>
      <ReceiptBreakdown transaction={transaction} />
      {note && (
        <Text variant="small" className="mt-3 text-foreground-secondary">
          {note}
        </Text>
      )}
      <ReceiptRelations
        transaction={transaction}
        loadedTransactions={loadedTransactions}
        onSelectRelated={onSelectRelated}
      />
      <ReceiptMetadata transaction={transaction} />
      <ReceiptEntries transaction={transaction} />
    </section>
  );
}
