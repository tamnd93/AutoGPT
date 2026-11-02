import { useId, useState } from "react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import { chargeLabel, formatActivityDate, type Transaction } from "../helpers";
import { TransactionAmount } from "./TransactionAmount";

type Props = { transaction: Transaction };

export function ReceiptEntries({ transaction }: Props) {
  const t = useT();
  const [entriesOpen, setEntriesOpen] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const entriesID = useId();
  const referenceID = useId();
  const reference =
    transaction.usage_execution_id ||
    transaction.usage_chat_session_id ||
    transaction.transaction_key;
  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        {!!transaction.charges?.length && (
          <Button
            variant="ghost"
            size="small"
            className="min-h-11 min-w-0 px-0 text-foreground-secondary"
            onClick={() => setEntriesOpen(!entriesOpen)}
            aria-expanded={entriesOpen}
            aria-controls={entriesOpen ? entriesID : undefined}
            rightIcon={
              <Icon
                icon={entriesOpen ? ArrowUp01Icon : ArrowDown01Icon}
                size={16}
              />
            }
          >
            {entriesOpen
              ? t("billing1.entries.hide")
              : t("billing1.entries.show")}
          </Button>
        )}
        {reference && (
          <Button
            variant="ghost"
            size="small"
            className="min-h-11 min-w-0 px-0 text-foreground-secondary"
            onClick={() => setReferenceOpen(!referenceOpen)}
            aria-expanded={referenceOpen}
            aria-controls={referenceOpen ? referenceID : undefined}
          >
            {referenceOpen
              ? t("billing1.entries.hideReference")
              : t("billing1.entries.showReference")}
          </Button>
        )}
      </div>
      {entriesOpen && (
        <div id={entriesID}>
          <ChargeEntries transaction={transaction} />
        </div>
      )}
      {referenceOpen && (
        <div id={referenceID} className="mt-2">
          <Text variant="small" className="text-foreground-secondary">
            {referenceLabel(transaction, t)}
          </Text>
          <Text variant="small" as="code" className="break-all font-mono">
            {reference}
          </Text>
        </div>
      )}
    </div>
  );
}

function referenceLabel(transaction: Transaction, t: ReturnType<typeof useT>) {
  if (transaction.usage_execution_id) return t("billing1.entries.runId");
  if (transaction.usage_chat_session_id) return t("billing1.entries.chatId");
  return t("billing1.entries.reference");
}

function ChargeEntries({ transaction }: Props) {
  const locale = useLocale();
  const t = useT();
  const charges = transaction.charges ?? [];
  return (
    <div className="mt-2 border-t border-border-base pt-3">
      <table
        className="w-full text-left"
        aria-label={t("billing1.entries.aria")}
      >
        <thead className="sr-only">
          <tr>
            <th scope="col">{t("billing1.entries.dateTime")}</th>
            <th scope="col">{t("billing1.entries.charge")}</th>
            <th scope="col">{t("billing1.entries.amount")}</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((charge) => {
            const posted = formatActivityDate(charge.posted_at, locale);
            return (
              <tr key={charge.id}>
                <td className="py-2 pr-3 align-top">
                  <Text
                    variant="small"
                    title={posted.full}
                    className="text-foreground-secondary"
                  >
                    {posted.date}
                    <br />
                    {posted.time}
                  </Text>
                </td>
                <td className="py-2 pr-3 align-top">
                  {chargeLabel(charge.charge_type, t)}
                </td>
                <td className="py-2 text-right align-top">
                  <TransactionAmount
                    amount={charge.amount}
                    className="text-xs font-normal"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {transaction.charges_truncated && (
        <Text variant="small" className="mt-2 text-foreground-secondary">
          {t("billing1.entries.truncated", {
            shown: charges.length,
            total: transaction.charges_total_count,
          })}
        </Text>
      )}
    </div>
  );
}
