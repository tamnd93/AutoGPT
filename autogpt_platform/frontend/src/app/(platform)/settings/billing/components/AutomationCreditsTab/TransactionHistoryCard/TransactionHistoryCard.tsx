"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useT } from "@/lib/i18n";

import { getSectionMotionProps } from "../../../helpers";
import { TransactionHistoryTable } from "./components/TransactionHistoryTable";
import { useTransactionHistoryCard } from "./useTransactionHistoryCard";

type Props = { index?: number };

export function TransactionHistoryCard({ index = 0 }: Props) {
  const t = useT();
  const reduceMotion = useReducedMotion();
  const history = useTransactionHistoryCard();
  const headingID = useId();

  async function retryHistory() {
    await history.refetch();
    document.getElementById(headingID)?.focus({ preventScroll: true });
  }
  return (
    <motion.section
      {...getSectionMotionProps(index, Boolean(reduceMotion))}
      className="flex w-full flex-col gap-3"
      aria-label={t("billing1.history.aria")}
    >
      <div className="flex flex-wrap items-end justify-between gap-2 px-4">
        <div>
          <Text
            variant="body-medium"
            as="h2"
            id={headingID}
            tabIndex={-1}
            className="focus:outline-none"
          >
            {t("billing1.history.title")}
          </Text>
          <Text variant="small" className="mt-1 text-foreground-secondary">
            {t("billing1.history.subtitle")}
          </Text>
        </div>
        <Text variant="small" className="text-foreground-secondary">
          {t("billing1.history.currencyNote")}
        </Text>
      </div>
      {history.isLoading ? (
        <HistorySkeleton />
      ) : history.isError ? (
        <ErrorCard
          context={t("billing1.history.errorContext")}
          hint={t("billing1.history.errorHint")}
          onRetry={() => void retryHistory()}
        />
      ) : history.transactions.length === 0 ? (
        <EmptyHistory />
      ) : (
        <TransactionHistoryTable
          transactions={history.transactions}
          hasMore={history.hasMore}
          isLoadingMore={history.isLoadingMore}
          isLoadMoreError={history.isLoadMoreError}
          onLoadMore={() => history.loadMore()}
        />
      )}
      {history.isRefreshError && (
        <div
          className="flex flex-wrap items-center justify-between gap-2 px-4"
          role="alert"
        >
          <Text variant="small" className="text-foreground-secondary">
            {t("billing1.history.refreshError")}
          </Text>
          <Button
            variant="ghost"
            size="small"
            onClick={() => void retryHistory()}
          >
            {t("billing1.history.tryAgain")}
          </Button>
        </div>
      )}
      <Text variant="small" className="px-4 text-foreground-secondary">
        {t("billing1.history.footnote")}
      </Text>
    </motion.section>
  );
}

function HistorySkeleton() {
  const t = useT();
  return (
    <div
      role="status"
      aria-label={t("billing1.history.loadingAria")}
      className="rounded-large border border-border-base bg-surface p-5"
    >
      <div className="space-y-6">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center justify-between gap-6">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyHistory() {
  const t = useT();
  return (
    <div className="rounded-large border border-border-base bg-surface px-5 py-10 text-center">
      <Text variant="body-medium">{t("billing1.history.emptyTitle")}</Text>
      <Text variant="small" className="mt-2 text-foreground-secondary">
        {t("billing1.history.emptyBody")}
      </Text>
    </div>
  );
}
