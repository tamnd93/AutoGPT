"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useLocale } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n/translate";
import type { User } from "@/lib/auth/types";
import {
  usePostV1UpdateUserTimezone,
  getGetV1GetUserTimezoneQueryKey,
} from "@/app/api/__generated__/endpoints/auth/auth";
import { useQueryClient } from "@tanstack/react-query";

function timezoneSchema(message: string) {
  return z.object({ timezone: z.string().min(1, message) });
}

type FormData = z.infer<ReturnType<typeof timezoneSchema>>;

type UseTimezoneFormProps = {
  user: User;
  currentTimezone: string;
};

export const useTimezoneForm = ({ currentTimezone }: UseTimezoneFormProps) => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(
      timezoneSchema(getMessage(locale, "profile3.timezone.required")),
    ),
    defaultValues: {
      timezone: currentTimezone,
    },
  });

  const updateTimezone = usePostV1UpdateUserTimezone();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await updateTimezone.mutateAsync({
        data: { timezone: data.timezone } as any,
      });

      // Invalidate the timezone query to refetch the updated value
      await queryClient.invalidateQueries({
        queryKey: getGetV1GetUserTimezoneQueryKey(),
      });

      toast({
        title: getMessage(locale, "profile3.timezone.successTitle"),
        description: getMessage(locale, "profile3.timezone.successDesc"),
        variant: "success",
      });
    } catch {
      toast({
        title: getMessage(locale, "profile3.timezone.errorTitle"),
        description: getMessage(locale, "profile3.timezone.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
