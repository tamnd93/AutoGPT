"use client";

import { useEffect, useRef, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import { UsageCreditsDialog } from "@/components/organisms/UsageCreditsDialog/UsageCreditsDialog";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { useBillingStatus } from "@/hooks/useIsBillingEnabled";
import {
  TabsLine,
  TabsLineContent,
  TabsLineList,
  TabsLineTrigger,
} from "@/components/molecules/TabsLine/TabsLine";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useLocale, useT } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n/translate";
import {
  getGetSubscriptionStatusQueryKey,
  usePatchV1FulfillCheckoutSession,
} from "@/app/api/__generated__/endpoints/credits/credits";
import { getGetTrialsGetTrialStatusQueryKey } from "@/app/api/__generated__/endpoints/trials/trials";

import {
  trackCheckoutAbandoned,
  trackTrialCheckoutAbandoned,
} from "@/services/analytics/monetization-analytics";

import { AutomationCreditsTab } from "./components/AutomationCreditsTab/AutomationCreditsTab";
import { SubscriptionTab } from "./components/SubscriptionTab/SubscriptionTab";

type BillingTab = "subscription" | "automation-credits";

function isBillingTab(value: string): value is BillingTab {
  return value === "subscription" || value === "automation-credits";
}

function resolveInitialTab(searchParams: URLSearchParams): BillingTab {
  const tabParam = searchParams.get("tab");
  if (tabParam && isBillingTab(tabParam)) return tabParam;
  // Topup flow only originates from the Automation Credits tab — when Stripe
  // redirects back, return the user to where they started instead of the
  // Subscription default.
  if (searchParams.get("topup")) return "automation-credits";
  return "subscription";
}

export default function SettingsBillingRoute() {
  const { isBillingEnabled, isResolved } = useBillingStatus();
  if (!isResolved) return null;
  if (!isBillingEnabled) notFound();
  return <SettingsBillingPage />;
}

function SettingsBillingPage() {
  const t = useT();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const topupStatus = searchParams.get("topup");
  const subscriptionStatus = searchParams.get("subscription");
  const trialStatus = searchParams.get("trial");
  const { mutateAsync: fulfillCheckout } = usePatchV1FulfillCheckoutSession();
  const handledTopupRef = useRef<string | null>(null);
  const handledSubscriptionRef = useRef<string | null>(null);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BillingTab>(() =>
    resolveInitialTab(searchParams),
  );
  // Read once: the redirect handler below drops the query string.
  const [isPlanCheckoutReturn] = useState(
    () => subscriptionStatus === "success",
  );

  function handleTabChange(value: string) {
    if (isBillingTab(value)) setActiveTab(value);
  }

  useEffect(function setBillingDocumentTitle() {
    document.title = getMessage(locale, "billing2.page.title");
  }, []);

  useEffect(
    function handleTopupRedirect() {
      if (!topupStatus) return;
      // Stripe re-renders the page after redirect — guard so we don't
      // fire fulfillCheckout twice or stack duplicate toasts.
      if (handledTopupRef.current === topupStatus) return;
      handledTopupRef.current = topupStatus;

      if (topupStatus === "success") {
        toast({
          title: t("billing2.page.paymentSuccessTitle"),
          description: t("billing2.page.paymentSuccessBody"),
        });
        fulfillCheckout().catch(() => {
          // Background fulfillment call — webhook is the source of truth,
          // so a failure here is non-blocking.
        });
      } else if (topupStatus === "cancel") {
        trackCheckoutAbandoned({ checkout_kind: "top_up", surface: "billing" });
        toast({
          title: t("billing2.page.paymentCancelledTitle"),
          description: t("billing2.page.paymentCancelledBody"),
          variant: "destructive",
        });
      }

      router.replace("/settings/billing");
    },
    [topupStatus, fulfillCheckout, router],
  );

  useEffect(
    function handleSubscriptionRedirect() {
      if (!subscriptionStatus) return;
      if (handledSubscriptionRef.current === subscriptionStatus) return;
      handledSubscriptionRef.current = subscriptionStatus;

      if (subscriptionStatus === "success") {
        toast({
          title: t("billing2.page.confirmingTitle"),
          description: t("billing2.page.confirmingBody"),
        });
        queryClient.invalidateQueries({
          queryKey: getGetSubscriptionStatusQueryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: getGetTrialsGetTrialStatusQueryKey(),
        });
      } else if (subscriptionStatus === "cancelled") {
        trackCheckoutAbandoned({
          checkout_kind: "subscription",
          surface: "billing",
        });
        toast({
          title: t("billing2.page.checkoutCancelledTitle"),
          description: t("billing2.page.checkoutCancelledBody"),
          variant: "destructive",
        });
      }

      router.replace("/settings/billing");
    },
    [subscriptionStatus, queryClient, router],
  );

  useEffect(
    function reportTrialCheckoutCancelled() {
      if (trialStatus === "cancelled") trackTrialCheckoutAbandoned("billing");
    },
    [trialStatus],
  );

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5 px-4 pb-8 sm:px-6">
      <header className="space-y-1">
        <div className="flex items-center gap-1">
          <Text
            // TODO(tokens): no exact text token (tracking-[-0.035em])
            variant="h3"
            as="h1"
            className="tracking-[-0.035em]"
          >
            {t("billing2.page.header")}
          </Text>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            leadingIcon={InformationCircleIcon}
            aria-label={t("billing2.page.explainerAria")}
            onClick={() => setIsExplainerOpen(true)}
            className="text-foreground-tertiary"
          />
        </div>
        <Text variant="body" tone="secondary">
          {t("billing2.page.subtitle")}
        </Text>
      </header>

      <TabsLine value={activeTab} onValueChange={handleTabChange}>
        <TabsLineList flush className="overflow-x-auto">
          <TabsLineTrigger value="subscription">
            {t("billing2.page.tabSubscription")}
          </TabsLineTrigger>
          <TabsLineTrigger value="automation-credits">
            {t("billing2.page.tabCredits")}
          </TabsLineTrigger>
        </TabsLineList>

        <TabsLineContent value="subscription">
          <SubscriptionTab isPlanCheckoutReturn={isPlanCheckoutReturn} />
        </TabsLineContent>

        <TabsLineContent value="automation-credits">
          <AutomationCreditsTab />
        </TabsLineContent>
      </TabsLine>

      <UsageCreditsDialog
        isOpen={isExplainerOpen}
        onOpenChange={setIsExplainerOpen}
        showBillingLink={false}
      />
    </div>
  );
}
