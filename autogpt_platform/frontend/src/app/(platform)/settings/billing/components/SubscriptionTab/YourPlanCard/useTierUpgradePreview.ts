import { useEffect, useState } from "react";
import { usePreviewSubscriptionUpgrade } from "@/app/api/__generated__/endpoints/credits/credits";
import type { SubscriptionUpgradePreview } from "@/app/api/__generated__/models/subscriptionUpgradePreview";
import { useAuthStore } from "@/lib/auth/hooks/useAuthStore";
import { useT } from "@/lib/i18n";

interface ReviewState {
  userID: string;
  billingCycle: "monthly" | "yearly";
  preview?: SubscriptionUpgradePreview;
  error?: string;
}

export function useTierUpgradePreview(
  enabled: boolean,
  billingCycle: "monthly" | "yearly",
) {
  const t = useT();
  const { mutateAsync } = usePreviewSubscriptionUpgrade();
  const userID = useAuthStore((state) => state.user?.id);
  const [state, setState] = useState<ReviewState>();
  const [attempt, setAttempt] = useState(0);
  const current =
    enabled && state?.userID === userID && state?.billingCycle === billingCycle;
  const preview = current ? state?.preview : undefined;
  const error = current ? (state?.error ?? "") : "";

  useEffect(() => {
    setState(undefined);
    if (!enabled || !userID) return;
    let current = true;
    const owner = { userID, billingCycle };
    void mutateAsync({ data: { tier: "MAX", billing_cycle: billingCycle } })
      .then((response) => {
        if (!current || useAuthStore.getState().user?.id !== userID) return;
        if (response.status !== 200) throw new Error("Review unavailable");
        if (response.data.expires_at * 1000 <= Date.now()) {
          setState({
            ...owner,
            error: t("billing2.upgradePreview.expired"),
          });
          return;
        }
        setState({ ...owner, preview: response.data });
      })
      .catch(() => {
        if (current && useAuthStore.getState().user?.id === userID)
          setState({
            ...owner,
            error: t("billing2.upgradePreview.loadFailed"),
          });
      });
    return () => {
      current = false;
    };
  }, [enabled, userID, billingCycle, attempt, mutateAsync]);

  useEffect(() => {
    if (!preview) return;
    const timer = setTimeout(
      () => {
        setState((value) =>
          value
            ? {
                ...value,
                preview: undefined,
                error: t("billing2.upgradePreview.expired"),
              }
            : value,
        );
      },
      Math.max(0, preview.expires_at * 1000 - Date.now()),
    );
    return () => clearTimeout(timer);
  }, [preview]);

  return {
    required: enabled,
    preview,
    error,
    isLoading: enabled && !preview && !error,
    retry: () => setAttempt((value) => value + 1),
    invalidate: (message = t("billing2.upgradePreview.changed")) => {
      setState((value) =>
        value
          ? {
              ...value,
              preview: undefined,
              error: message,
            }
          : value,
      );
    },
  };
}
