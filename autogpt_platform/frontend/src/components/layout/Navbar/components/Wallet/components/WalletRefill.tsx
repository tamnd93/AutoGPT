import { FormField } from "@/components/molecules/Form/Form";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import {
  TabsLine,
  TabsLineContent,
  TabsLineList,
  TabsLineTrigger,
} from "@/components/molecules/TabsLine/TabsLine";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { TopUpForm } from "@/components/layout/TopUpPrompt/TopUpForm/TopUpForm";
import useCredits from "@/hooks/useCredits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

type Translate = (key: MessageKey) => string;
type AutoRefillValues = z.infer<ReturnType<typeof createAutoRefillSchema>>;

// Built per render: the schema carries translated validation messages, and a
// language switch reloads the page, so one schema serves its lifetime.
function createAutoRefillSchema(t: Translate) {
  return z
    .object({
      threshold: z
        .number({
          coerce: true,
          invalid_type_error: t("nav2.wallet.error.thresholdRequired"),
        })
        .min(5, t("nav2.wallet.error.thresholdTooLow")),
      refillAmount: z
        .number({
          coerce: true,
          invalid_type_error: t("nav2.wallet.error.refillRequired"),
        })
        .min(5, t("nav2.wallet.error.refillTooLow")),
    })
    .refine((data) => data.refillAmount >= data.threshold, {
      message: t("nav2.wallet.error.refillBelowThreshold"),
      path: ["refillAmount"],
    });
}

export function WalletRefill() {
  const t = useT();
  const { toast } = useToast();

  const { autoTopUpConfig, updateAutoTopUpConfig } = useCredits({
    fetchInitialAutoTopUpConfig: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const autoRefillForm = useForm<AutoRefillValues>({
    resolver: zodResolver(createAutoRefillSchema(t)),
  });

  // Pre-fill the auto-refill form with existing values
  useEffect(() => {
    if (
      autoTopUpConfig &&
      autoTopUpConfig.amount > 0 &&
      autoTopUpConfig.threshold > 0 &&
      !autoRefillForm.getFieldState("threshold").isTouched &&
      !autoRefillForm.getFieldState("refillAmount").isTouched
    ) {
      autoRefillForm.setValue("threshold", autoTopUpConfig.threshold / 100);
      autoRefillForm.setValue("refillAmount", autoTopUpConfig.amount / 100);
    }
  }, [autoTopUpConfig, autoRefillForm]);

  const submitAutoTopUpConfig = useCallback(
    async (data: AutoRefillValues) => {
      setIsLoading(true);
      await updateAutoTopUpConfig(data.refillAmount * 100, data.threshold * 100)
        .then(() => {
          toast({
            title: t("nav2.wallet.autoTopUpUpdated"),
            variant: "success",
          });
        })
        .catch((error: unknown) => {
          toast({
            title: t("nav2.wallet.autoTopUpFailed"),
            description:
              error instanceof Error
                ? error.message
                : t("nav2.wallet.genericError"),
            variant: "destructive",
            duration: 10000,
          });
        });
      setIsLoading(false);
    },
    [updateAutoTopUpConfig, toast, t],
  );

  return (
    <div className="mx-1 border-b border-border-strong">
      <Text
        variant="small-medium-tight"
        as="p"
        className="mx-0 mt-4 text-accent-strong"
      >
        {t("nav2.wallet.addCreditsHeading")}
      </Text>
      <Text variant="small-tight" as="p" tone="muted" className="mx-0 my-1">
        {t("nav2.wallet.addCreditsDescription")}
      </Text>
      <TabsLine
        variant="pill"
        defaultValue="top-up"
        className="mb-6 mt-4 flex w-full flex-col items-center"
      >
        <TabsLineList className="mx-auto">
          <TabsLineTrigger value="top-up">
            {t("nav2.wallet.oneTimeTopUp")}
          </TabsLineTrigger>
          <TabsLineTrigger value="auto-refill">
            {t("nav2.wallet.autoRefill")}
          </TabsLineTrigger>
        </TabsLineList>
        <div className="mt-4 w-full rounded-lg px-5 outline outline-1 outline-offset-2 outline-border-base">
          <TabsLineContent value="top-up" className="flex flex-col">
            <Text
              variant="body-medium-lh-snug"
              as="div"
              tone="primary"
              className="mt-2 justify-start"
            >
              {t("nav2.wallet.oneTimeTopUpHeading")}
            </Text>
            <Text
              variant="small-lh-tight"
              as="div"
              tone="muted"
              className="mt-1 justify-start"
            >
              {t("nav2.wallet.oneTimeDescription")}
            </Text>
            <TopUpForm submitLabel={t("nav2.wallet.topUp")} size="small" />
          </TabsLineContent>
          <TabsLineContent value="auto-refill" className="flex flex-col">
            <Text
              variant="body-medium-lh-snug"
              as="div"
              tone="primary"
              className="justify-start"
            >
              {t("nav2.wallet.autoRefill")}
            </Text>
            <Text
              variant="small-lh-tight"
              as="div"
              tone="muted"
              className="mt-1 justify-start"
            >
              {t("nav2.wallet.autoRefillDescription")}
            </Text>

            <FormProvider {...autoRefillForm}>
              <form
                onSubmit={autoRefillForm.handleSubmit(submitAutoTopUpConfig)}
                className="my-6"
              >
                <FormField
                  control={autoRefillForm.control}
                  name="threshold"
                  render={({ field }) => (
                    <Input
                      type="amount"
                      label={t("nav2.wallet.refillWhenBelow")}
                      id={field.name}
                      size="small"
                      decimalCount={0}
                      error={autoRefillForm.formState.errors.threshold?.message}
                      amountPrefix="$"
                      {...field}
                    />
                  )}
                />
                <FormField
                  control={autoRefillForm.control}
                  name="refillAmount"
                  render={({ field }) => (
                    <Input
                      type="amount"
                      label={t("nav2.wallet.addAmount")}
                      size="small"
                      decimalCount={0}
                      id={field.name}
                      error={
                        autoRefillForm.formState.errors.refillAmount?.message
                      }
                      amountPrefix="$"
                      {...field}
                    />
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="small"
                  className="mt-5"
                >
                  {t("nav2.wallet.enableAutoRefill")}
                </Button>
              </form>
            </FormProvider>
          </TabsLineContent>
          <Text
            variant="small-lh-tight"
            as="div"
            tone="inherit"
            className="mb-3 justify-start"
          >
            <span className="text-foreground-tertiary">
              {t("nav2.wallet.updateBillingHint")}
            </span>
            <Link
              href="/settings/billing"
              className="cursor-pointer text-foreground-emphasis underline"
            >
              {t("nav2.wallet.billingSettings")}
            </Link>
          </Text>
        </div>
      </TabsLine>
    </div>
  );
}
