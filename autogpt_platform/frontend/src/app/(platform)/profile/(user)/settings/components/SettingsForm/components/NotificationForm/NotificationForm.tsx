"use client";

import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/molecules/Form/Form";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { Button } from "@/components/atoms/Button/Button";
import { Select } from "@/components/atoms/Select/Select";
import { NotificationPreference } from "@/app/api/__generated__/models/notificationPreference";
import type { User } from "@/lib/auth/types";
import {
  useNotificationForm,
  type NotificationFormValues,
} from "./useNotificationForm";
import { Switch } from "@/components/atoms/Switch/Switch";

type NotificationFormProps = {
  preferences: NotificationPreference;
  user: User;
};

const BRIEFING_OPTIONS: { value: string; labelKey: MessageKey }[] = [
  { value: "DAILY", labelKey: "profile5.notifications.frequency.daily" },
  { value: "WEEKLY", labelKey: "profile5.notifications.frequency.weekly" },
  { value: "MONTHLY", labelKey: "profile5.notifications.frequency.monthly" },
  { value: "OFF", labelKey: "profile5.notifications.frequency.off" },
];

export function NotificationForm({ preferences, user }: NotificationFormProps) {
  const t = useT();
  const briefingOptions = BRIEFING_OPTIONS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));
  const { form, onSubmit, onCancel, isLoading } = useNotificationForm({
    preferences,
    user,
  });

  return (
    <div>
      <Text variant="h3" size="large-semibold">
        {t("profile5.notifications.title")}
      </Text>
      <Text
        // TODO(tokens): no exact role (text-slate-400 #8A97A8)
        variant="body"
        className="mt-2 text-slate-400"
      >
        {t("profile5.notifications.description")}
      </Text>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="briefingFrequency"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="space-y-0.5">
                    <Text variant="h4" size="body-medium">
                      {t("profile5.notifications.briefingTitle")}
                    </Text>
                    <Text variant="body">
                      {t("profile5.notifications.briefingDesc")}
                    </Text>
                  </div>
                  <FormControl>
                    <Select
                      id="briefing-frequency"
                      label={t("profile5.notifications.frequencyLabel")}
                      hideLabel
                      value={field.value}
                      options={briefingOptions}
                      onValueChange={(value) =>
                        field.onChange(
                          value as NotificationFormValues["briefingFrequency"],
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alertsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Text variant="h4" size="body-medium">
                      {t("profile5.notifications.alertsTitle")}
                    </Text>
                    <Text variant="body">
                      {t("profile5.notifications.alertsDesc")}
                    </Text>
                  </div>
                  <FormControl>
                    <Switch
                      aria-label={t("profile5.notifications.alertsTitle")}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storeVerdictsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Text variant="h4" size="body-medium">
                      {t("profile5.notifications.reviewsTitle")}
                    </Text>
                    <Text variant="body">
                      {t("profile5.notifications.reviewsDesc")}
                    </Text>
                  </div>
                  <FormControl>
                    <Switch
                      aria-label={t("profile5.notifications.reviewsTitle")}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-8">
            <Button
              variant="outline"
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="min-w-[10rem]"
            >
              {t("profile5.notifications.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isDirty}
              className="min-w-[10rem]"
              loading={isLoading}
            >
              {isLoading
                ? t("profile5.notifications.saving")
                : t("profile5.notifications.save")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
