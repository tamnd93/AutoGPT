import type { CreditTransactionItem } from "@/app/api/__generated__/models/creditTransactionItem";
import type { Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

import { formatCents } from "../../../helpers";

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

export type Transaction = CreditTransactionItem & {
  id: string;
  amount: number;
  transaction_type: NonNullable<CreditTransactionItem["transaction_type"]>;
  receipt_as_of?: string | Date | null;
};

const TRANSACTION_NAME_KEYS: Record<string, MessageKey> = {
  TOP_UP: "billing1.history.name.topUp",
  GRANT: "billing1.history.name.grant",
  REFUND: "billing1.history.name.refund",
  SUBSCRIPTION: "billing1.history.name.subscription",
  CARD_CHECK: "billing1.history.name.cardCheck",
};

export function activityName(
  transaction: Transaction,
  t: Translate = english,
): string {
  if (transaction.activity_type === "agent_run")
    return transaction.agent_name || t("billing1.history.workflowUnavailable");
  if (transaction.activity_type === "copilot_tools")
    return t("billing1.history.expertToolUse");
  if (transaction.activity_type === "block_usage")
    return t("billing1.history.directBlockUsage");
  if (transaction.transaction_type === "USAGE")
    return transaction.description || t("billing1.history.creditUsage");
  return TRANSACTION_NAME_KEYS[transaction.transaction_type]
    ? t(TRANSACTION_NAME_KEYS[transaction.transaction_type])
    : t("billing1.history.balanceChange");
}

export function activityDescription(
  transaction: Transaction,
  t: Translate = english,
): string {
  if (transaction.parent_agent_name)
    return t("billing1.history.partOf", {
      name: transaction.parent_agent_name,
    });
  if (transaction.activity_type === "agent_run")
    return t("billing1.history.workflowRun");
  if (transaction.activity_type === "copilot_tools")
    return (
      transaction.conversation_title || t("billing1.history.paidBlockTools")
    );
  if (transaction.activity_type === "block_usage")
    return t("billing1.history.outsideWorkflowRun");
  if (transaction.transaction_type === "TOP_UP")
    return t("billing1.history.creditPurchase");
  if (transaction.transaction_type === "REFUND")
    return t("billing1.history.creditPurchaseRefunded");
  if (transaction.transaction_type === "SUBSCRIPTION")
    return t("billing1.history.paidFromBalance");
  return t("billing1.history.creditBalance");
}

export function formatAmount(amount: number): string {
  const sign = amount < 0 ? "−" : amount > 0 ? "+" : "";
  return `${sign}${formatCents(Math.abs(amount))}`;
}

export function formatActivityDate(
  value: string | Date | null | undefined,
  locale: Locale = "en",
) {
  const dateLocale = locale === "vi" ? "vi-VN" : undefined;
  if (!value)
    return {
      date: getMessage(locale, "billing1.history.dateUnavailable"),
      time: "",
      full: getMessage(locale, "billing1.history.dateUnavailableFull"),
    };
  const date = new Date(value);
  if (Number.isNaN(date.getTime()))
    return {
      date: getMessage(locale, "billing1.history.dateUnavailable"),
      time: "",
      full: getMessage(locale, "billing1.history.dateUnavailableFull"),
    };
  return {
    date: date.toLocaleDateString(dateLocale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(dateLocale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    full: date.toLocaleString(dateLocale, {
      dateStyle: "long",
      timeStyle: "long",
    }),
  };
}

export function libraryHref(libraryID: string | null | undefined) {
  return libraryID ? `/library/agents/${encodeURIComponent(libraryID)}` : null;
}

export function taskHref(transaction: Transaction) {
  const agentHref = libraryHref(transaction.library_agent_id);
  if (
    !agentHref ||
    !transaction.execution_available ||
    !transaction.usage_execution_id
  )
    return null;
  return `${agentHref}?activeTab=runs&activeItem=${encodeURIComponent(transaction.usage_execution_id)}`;
}

export function isRunActive(transaction: Transaction) {
  return ["QUEUED", "RUNNING", "REVIEW", "INCOMPLETE"].includes(
    transaction.execution_status || "",
  );
}

const STATUS_LABEL_KEYS: Record<string, MessageKey> = {
  QUEUED: "billing1.history.status.queued",
  RUNNING: "billing1.history.status.running",
  REVIEW: "billing1.history.status.review",
  INCOMPLETE: "billing1.history.status.incomplete",
  COMPLETED: "billing1.history.status.completed",
  FAILED: "billing1.history.status.failed",
  TERMINATED: "billing1.history.status.terminated",
};

export function statusLabel(status: string, t: Translate = english) {
  return STATUS_LABEL_KEYS[status]
    ? t(STATUS_LABEL_KEYS[status])
    : t("billing1.history.unavailable");
}

export function receiptNote(transaction: Transaction, t: Translate = english) {
  if (transaction.activity_type === "agent_run") {
    if (isRunActive(transaction))
      return t("billing1.history.receipt.runActive");
    if (transaction.amount === 0)
      return t("billing1.history.receipt.noNetChange");
    return t("billing1.history.receipt.runRecorded");
  }
  if (transaction.activity_type === "copilot_tools")
    return t("billing1.history.receipt.copilotTools");
  if (transaction.activity_type === "block_usage")
    return t("billing1.history.receipt.blockUsage");
  if (transaction.transaction_type === "REFUND")
    return t("billing1.history.receipt.refunded");
  if (transaction.transaction_type === "SUBSCRIPTION")
    return t("billing1.history.receipt.subscription");
  if (transaction.amount === 0) return t("billing1.history.receipt.noChange");
  return "";
}

const CHARGE_LABEL_KEYS: Record<string, MessageKey> = {
  usage: "billing1.history.charge.usage",
  execution_fee: "billing1.history.charge.executionFee",
  adjustment: "billing1.history.charge.adjustment",
  transaction: "billing1.history.charge.transaction",
};

export function chargeLabel(type: string, t: Translate = english) {
  return CHARGE_LABEL_KEYS[type]
    ? t(CHARGE_LABEL_KEYS[type])
    : t("billing1.history.charge.fallback");
}
