"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/molecules/Toast/use-toast";
import type { User } from "@/lib/auth/types";
import { useLocale, useT } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

type EmailValues = { email: string };

const schemaCache = new Map<Locale, z.ZodType<EmailValues>>();

function emailFormSchema(locale: Locale) {
  const cached = schemaCache.get(locale);
  if (cached) return cached;
  const schema = z.object({
    email: z
      .string()
      .min(1, getMessage(locale, "profile2.email.validationRequired"))
      .email(getMessage(locale, "profile2.email.validationInvalid")),
  });
  schemaCache.set(locale, schema);
  return schema;
}

function createEmailDefaultValues(user: { email?: string }) {
  return {
    email: user.email || "",
  };
}

// Better Auth owns the email change. For a verified user it emails a
// confirmation link to their CURRENT address and only applies the new email
// once that link is clicked (anti-takeover); for an unverified user the change
// applies immediately. Platform User.email (notifications / Stripe) then
// converges via the databaseHooks.user.update mirror in lib/auth/auth.ts — we
// deliberately do NOT write the platform email here, so it can never diverge to
// an unverified value.
async function requestEmailChange(
  email: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  const response = await fetch("/api/auth/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || getMessage(locale, "profile2.email.failedUpdate"),
    );
  }

  return response.json();
}

export function useEmailForm({ user }: { user: User }) {
  const locale = useLocale();
  const t = useT();
  const { toast } = useToast();
  const defaultValues = createEmailDefaultValues(user);
  const currentEmail = user.email;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmailValues>({
    resolver: zodResolver(emailFormSchema(locale)),
    defaultValues,
    mode: "onSubmit",
  });

  async function onSubmit(values: EmailValues) {
    if (values.email === user.email) return;

    setIsSubmitting(true);
    try {
      await requestEmailChange(values.email, locale);
      // Reset to the still-current address. On the verified path Better Auth
      // deliberately doesn't write the row until the link is clicked, so
      // `user.email` stays old — leaving the new value in the field would keep
      // the submit button enabled and fire another email on every click.
      form.reset({ email: currentEmail });
      toast(
        user.email_verified
          ? {
              title: t("profile2.email.confirmTitle"),
              description: t("profile2.email.confirmDescription"),
            }
          : {
              title: t("profile2.email.updatedTitle"),
              description: t("profile2.email.updatedDescription", {
                email: values.email,
              }),
            },
      );
    } catch (error) {
      toast({
        title: t("profile2.email.errorTitle"),
        description:
          error instanceof Error
            ? error.message
            : t("profile2.email.somethingWrong"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    onSubmit,
    isLoading: isSubmitting,
    currentEmail,
  };
}
