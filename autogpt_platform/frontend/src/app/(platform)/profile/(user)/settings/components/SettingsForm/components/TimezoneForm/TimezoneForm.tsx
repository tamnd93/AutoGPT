"use client";

import { cn } from "@/lib/utils";
import { FormProvider } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/molecules/Form/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select/components/SelectPrimitives";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import type { User } from "@/lib/auth/types";
import * as React from "react";
import { TIMEZONES } from "./helpers";
import { useTimezoneForm } from "./useTimezoneForm";
import { useT } from "@/lib/i18n";

type Props = {
  user: User;
  currentTimezone?: string;
};

export function TimezoneForm({ user, currentTimezone = "not-set" }: Props) {
  const t = useT();
  // If timezone is not set, try to detect it from the browser
  const effectiveTimezone = React.useMemo(() => {
    if (currentTimezone === "not-set") {
      // Try to get browser timezone as a suggestion
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      } catch {
        return "UTC";
      }
    }
    return currentTimezone;
  }, [currentTimezone]);

  const { form, onSubmit, isLoading } = useTimezoneForm({
    user,
    currentTimezone: effectiveTimezone,
  });

  return (
    <Card variant="outlined">
      <CardHeader>
        <CardTitle>{t("profile2.timezone.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="timezone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    // the legacy label's error dark: class, moved verbatim; DS6 (SECRT-3116) deletes it
                    className={cn(
                      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      fieldState.error && "dark:text-red-900",
                    )}
                  >
                    <Text
                      variant="body-medium-lh-none"
                      as="span"
                      tone="inherit"
                    >
                      {t("profile2.timezone.selectLabel")}
                    </Text>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("profile2.timezone.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage
                    // TODO(tokens): SECRT-3152 rare size: text-[0.8rem].
                    // dark:text-red-900: the legacy FormMessage's, moved verbatim (DS6, SECRT-3116)
                    className="text-[0.8rem] leading-inherit dark:text-red-900"
                  />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="small">
              {isLoading
                ? t("profile2.timezone.saving")
                : t("profile2.timezone.save")}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
