"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import useCredits from "@/hooks/useCredits";
import { useBackendAPI } from "@/lib/autogpt-server-api/context";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useToast,
  useToastOnFail,
} from "@/components/molecules/Toast/use-toast";

import { useT } from "@/lib/i18n";
import { RefundModal } from "./RefundModal";
import { SubscriptionTierSection } from "./components/SubscriptionTierSection/SubscriptionTierSection";
import { CreditTransaction } from "@/lib/autogpt-server-api";
import { StorageBar } from "@/app/(platform)/copilot/components/UsageLimits/StorageBar";
import { UsageBar } from "@/app/(platform)/copilot/components/UsageLimits/UsageBar";
import type { CoPilotUsagePublic } from "@/app/api/__generated__/models/coPilotUsagePublic";
import { useGetV2GetCopilotUsage } from "@/app/api/__generated__/endpoints/chat/chat";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/Table/components/TablePrimitives";

function CoPilotUsageSection() {
  const t = useT();
  const router = useRouter();
  const { data: usage, isSuccess } = useGetV2GetCopilotUsage({
    query: {
      select: (res) => res.data as CoPilotUsagePublic,
      refetchInterval: 30000,
      staleTime: 10000,
    },
  });

  if (!isSuccess || !usage) return null;
  if (!usage.daily && !usage.weekly) return null;

  return (
    <div className="my-6 space-y-4">
      <Text variant="lg-medium" as="h3" tone="inherit">
        {t("profile4.credits.usageTitle")}
      </Text>
      <div
        // TODO(tokens): no exact role (border-neutral-200 #E5E5E5)
        className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4"
      >
        {usage.daily && (
          <UsageBar
            label={t("profile4.credits.today")}
            percentUsed={usage.daily.percent_used}
            resetsAt={usage.daily.resets_at}
          />
        )}
        {usage.weekly && (
          <UsageBar
            label={t("profile4.credits.thisWeek")}
            percentUsed={usage.weekly.percent_used}
            resetsAt={usage.weekly.resets_at}
          />
        )}
        <StorageBar />
      </div>
      <Button
        variant="legacy-default"
        className="w-full"
        onClick={() => router.push("/copilot")}
      >
        {t("profile4.credits.openOtto")}
      </Button>
    </div>
  );
}

export default function CreditsPage() {
  const t = useT();
  const api = useBackendAPI();
  const {
    requestTopUp,
    autoTopUpConfig,
    updateAutoTopUpConfig,
    transactionHistory,
    fetchTransactionHistory,
    formatCredits,
    refundTopUp,
    refundRequests,
  } = useCredits({
    fetchInitialAutoTopUpConfig: true,
    fetchInitialRefundRequests: true,
    fetchInitialTransactionHistory: true,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const topupStatus = searchParams.get("topup") as "success" | "cancel" | null;
  const { toast } = useToast();
  const toastOnFail = useToastOnFail();
  const checkoutRedirect = useCheckoutRedirect();
  const [isRequestingTopUp, setIsRequestingTopUp] = useState(false);

  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [topUpTransactions, setTopUpTransactions] = useState<
    CreditTransaction[]
  >([]);
  const openRefundModal = () => {
    api.getTransactionHistory(null, 20, "TOP_UP").then((history) => {
      setTopUpTransactions(history.transactions);
      setIsRefundModalOpen(true);
    });
  };
  const refundCredits = (transaction_key: string, reason: string) =>
    refundTopUp(transaction_key, reason)
      .then((amount) => {
        if (amount > 0) {
          toast({
            title: t("profile4.credits.refundApprovedTitle"),
            description: t("profile4.credits.refundApprovedBody", {
              amount: formatCredits(amount),
            }),
          });
        } else {
          toast({
            title: t("profile4.credits.refundReceivedTitle"),
            description: t("profile4.credits.refundReceivedBody"),
          });
        }
      })
      .catch(toastOnFail("refund transaction"));

  useEffect(() => {
    if (api && topupStatus === "success") {
      api.fulfillCheckout().catch(toastOnFail("fulfill checkout"));
    }
  }, [api, topupStatus, toastOnFail]);

  const openBillingPortal = () =>
    api
      .getUserPaymentPortalLink()
      .then((portal) => {
        router.push(portal.url);
      })
      .catch(toastOnFail("open billing portal"));

  const submitTopUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRequestingTopUp || checkoutRedirect.isRedirecting) return;
    const form = e.currentTarget;
    const amount =
      parseInt(new FormData(form).get("topUpAmount") as string) * 100;
    setIsRequestingTopUp(true);
    requestTopUp(amount)
      .then(() => checkoutRedirect.markRedirecting())
      .catch(toastOnFail("request top-up"))
      .finally(() => setIsRequestingTopUp(false));
  };

  const submitAutoTopUpConfig = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const amount = parseInt(formData.get("topUpAmount") as string) * 100;
    const threshold = parseInt(formData.get("threshold") as string) * 100;
    updateAutoTopUpConfig(amount, threshold)
      .then(() => {
        toast({ title: t("profile4.credits.autoTopUpUpdated") });
      })
      .catch(toastOnFail("update auto top-up config"));
  };

  return (
    <div className="w-full px-4 sm:px-8 md:min-w-[800px]">
      <h1
        // TODO(tokens): no exact role (text-neutral-900 #171717, dark:text-neutral-100); SECRT-3152 rare size (sm:text-[35px])
        className="mb-6 text-heading font-normal leading-inherit text-neutral-900 dark:text-neutral-100 sm:mb-8 sm:text-[35px]"
      >
        {t("profile4.credits.billing")}
      </h1>

      {/* Subscription Tier */}
      <div className="mb-8">
        <SubscriptionTierSection />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Top-up Form */}
        <div className="space-y-4">
          <Text variant="lg-medium" as="h3" tone="inherit">
            {t("profile4.credits.topUpTitle")}
          </Text>

          <p
            // TODO(tokens): no exact role (text-neutral-600 #525252, dark:text-neutral-400)
            className="mb-6 text-neutral-600 dark:text-neutral-400"
          >
            {topupStatus === "success" && (
              <span
                // TODO(tokens): no exact role (text-green-500 #16A34A)
                className="text-green-500"
              >
                {t("profile4.credits.topUpSuccess")}
              </span>
            )}
            {topupStatus === "cancel" && (
              <span className="text-error">
                {t("profile4.credits.topUpCancel")}
              </span>
            )}
          </p>

          <form onSubmit={submitTopUp} className="space-y-4">
            <div>
              <label
                htmlFor="topUpAmount"
                // TODO(tokens): no exact role (text-neutral-700 #404040)
                className="mb-1 block text-neutral-700"
              >
                {t("profile4.credits.topUpAmountLabel")}
              </label>
              <input
                type="number"
                id="topUpAmount"
                name="topUpAmount"
                placeholder={t("profile4.credits.topUpAmountPlaceholder")}
                min="5"
                step="1"
                defaultValue={5}
                // TODO(tokens): no exact role (border-slate-200 #CFD4DB, dark:border-slate-700, dark:bg-slate-800)
                className="w-full rounded-md border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
                required
              />
            </div>

            <Button
              variant="legacy-default"
              type="submit"
              className="w-full"
              disabled={isRequestingTopUp || checkoutRedirect.isRedirecting}
            >
              {t("profile4.credits.topUp")}
            </Button>
          </form>

          {/* Auto Top-up Form */}
          <form onSubmit={submitAutoTopUpConfig} className="my-6 space-y-4">
            <Text variant="lg-medium" as="h3" tone="inherit">
              {t("profile4.credits.refillTitle")}
            </Text>

            <div>
              <label
                htmlFor="threshold"
                // TODO(tokens): no exact role (text-neutral-700 #404040)
                className="mb-1 block text-neutral-700"
              >
                {t("profile4.credits.thresholdLabel")}
              </label>
              <input
                type="number"
                id="threshold"
                name="threshold"
                defaultValue={
                  autoTopUpConfig?.threshold
                    ? autoTopUpConfig.threshold / 100
                    : ""
                }
                placeholder={t("profile4.credits.thresholdPlaceholder")}
                min="5"
                step="1"
                // TODO(tokens): no exact role (border-slate-200 #CFD4DB, dark:border-slate-700, dark:bg-slate-800)
                className="w-full rounded-md border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
                required
              />
            </div>

            <div>
              <label
                htmlFor="autoTopUpAmount"
                // TODO(tokens): no exact role (text-neutral-700 #404040)
                className="mb-1 block text-neutral-700"
              >
                {t("profile4.credits.refillAmountLabel")}
              </label>
              <input
                type="number"
                id="autoTopUpAmount"
                name="topUpAmount"
                defaultValue={
                  autoTopUpConfig?.amount ? autoTopUpConfig.amount / 100 : ""
                }
                placeholder={t("profile4.credits.refillAmountPlaceholder")}
                min="5"
                step="1"
                // TODO(tokens): no exact role (border-slate-200 #CFD4DB, dark:border-slate-700, dark:bg-slate-800)
                className="w-full rounded-md border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
                required
              />
            </div>

            <Text variant="body-tight" tone="inherit">
              <b>{t("profile4.credits.refillNoteLabel")}</b>{" "}
              {t("profile4.credits.refillNote")}
            </Text>

            {autoTopUpConfig?.amount ? (
              <>
                <Button
                  variant="legacy-default"
                  type="submit"
                  className="w-full"
                >
                  {t("profile4.credits.saveChanges")}
                </Button>
                <Button
                  className="w-full"
                  variant="legacy-destructive"
                  onClick={() =>
                    updateAutoTopUpConfig(0, 0).then(() => {
                      toast({
                        title: t("profile4.credits.autoTopUpDisabled"),
                      });
                    })
                  }
                >
                  {t("profile4.credits.disableAutoRefill")}
                </Button>
              </>
            ) : (
              <Button variant="legacy-default" type="submit" className="w-full">
                {t("profile4.credits.enableAutoRefill")}
              </Button>
            )}
          </form>

          {/* Expert Usage Limits */}
          <CoPilotUsageSection />
        </div>

        <div className="my-6 space-y-4">
          {/* Payment Portal */}

          <Text variant="lg-medium" as="h3" tone="inherit">
            {t("profile4.credits.paymentTitle")}
          </Text>
          <p
            // TODO(tokens): no exact role (text-neutral-600 #525252)
            className="text-neutral-600"
          >
            {t("profile4.credits.paymentBody")}
          </p>
          <Button
            variant="legacy-default"
            type="submit"
            className="w-full"
            onClick={() => openBillingPortal()}
          >
            {t("profile4.credits.openPortal")}
          </Button>

          {/* Transaction History */}

          <Text variant="lg-medium" as="h3" tone="inherit">
            {t("profile4.credits.historyTitle")}
          </Text>
          {transactionHistory.transactions.length === 0 && (
            <p
              // TODO(tokens): no exact role (text-neutral-600 #525252)
              className="text-neutral-600"
            >
              {t("profile4.credits.noTransactions")}
            </p>
          )}
          <Table
            className={
              transactionHistory.transactions.length === 0 ? "hidden" : ""
            }
          >
            <TableHeader>
              <TableRow>
                <TableHead>{t("profile4.credits.date")}</TableHead>
                <TableHead>{t("profile4.credits.description")}</TableHead>
                <TableHead>{t("profile4.credits.amount")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory.transactions.map((transaction, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {new Date(transaction.transaction_time).toLocaleString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      },
                    )}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  {/* Make it green if it's positive, red if it's negative */}
                  <TableCell
                    className={
                      // TODO(tokens): no exact role (text-green-500 #16A34A)
                      transaction.amount > 0 ? "text-green-500" : "text-error"
                    }
                  >
                    <b>{formatCredits(transaction.amount)}</b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {transactionHistory.next_transaction_time && (
            <Button
              variant="legacy-default"
              type="submit"
              className="w-full"
              onClick={() => fetchTransactionHistory()}
            >
              {t("profile4.credits.loadMore")}
            </Button>
          )}

          {refundRequests.length > 0 && (
            <>
              <Text variant="lg-medium" as="h3" tone="inherit">
                {t("profile4.credits.refundRequestsTitle")}
              </Text>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("profile4.credits.lastUpdated")}</TableHead>
                    <TableHead>{t("profile4.credits.amount")}</TableHead>
                    <TableHead>{t("profile4.credits.status")}</TableHead>
                    <TableHead>{t("profile4.credits.comment")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refundRequests.map((request, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {new Date(request.updated_at).toLocaleString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          },
                        )}
                      </TableCell>
                      <TableCell>{formatCredits(request.amount)}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>{request.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}

          <Button
            variant="legacy-destructive"
            onClick={() => openRefundModal()}
            className="w-full"
          >
            {t("profile4.refund.title")}
          </Button>
          <RefundModal
            isOpen={isRefundModalOpen}
            onClose={() => setIsRefundModalOpen(false)}
            transactions={topUpTransactions}
            formatCredits={formatCredits}
            refundCredits={refundCredits}
          />
        </div>
      </div>
    </div>
  );
}
