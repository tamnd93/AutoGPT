"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@/lib/auth/types";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";

type EmailFormValues = { email: string };

export function useAccountCard({ user }: { user: User }) {
  const t = useT();
  const currentEmail = user.email ?? "";
  const emailSchema = z.object({
    email: z
      .string()
      .min(1, t("account1.accountCard.emailRequired"))
      .email(t("account1.accountCard.emailInvalid")),
  });

  async function updateEmailViaAuthAPI(email: string) {
    const response = await fetch("/api/auth/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.error ?? t("account1.accountCard.updateFailedFallback"),
      );
    }

    return response.json();
  }

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: currentEmail },
    mode: "onChange",
  });

  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  async function onSubmitEmail(values: EmailFormValues): Promise<boolean> {
    if (values.email === currentEmail) return false;

    // Route the change only through Better Auth. A verified user approves it via
    // a confirmation link sent to their CURRENT address (anti-takeover); an
    // unverified user's change applies immediately. Platform User.email
    // converges via the databaseHooks.user.update mirror in lib/auth/auth.ts —
    // writing it here in parallel would let it diverge to an unverified value.
    // Mirrors EmailForm.
    setIsUpdatingEmail(true);
    try {
      await updateEmailViaAuthAPI(values.email);
      // Reset to the still-current address: on the verified path the row isn't
      // written until the link is clicked, so leaving the new value in the
      // field would let every further click send another email. Mirrors
      // EmailForm.
      emailForm.reset({ email: currentEmail });
      toast(
        user.email_verified
          ? {
              title: t("account1.accountCard.toastConfirmTitle"),
              description: t("account1.accountCard.toastConfirmBody"),
              variant: "success",
            }
          : {
              title: t("account1.accountCard.toastUpdatedTitle"),
              description: t("account1.accountCard.toastUpdatedBody", {
                email: values.email,
              }),
              variant: "success",
            },
      );
      return true;
    } catch (err) {
      toast({
        title: t("account1.accountCard.toastFailedTitle"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdatingEmail(false);
    }
  }

  return {
    emailForm,
    onSubmitEmail,
    isUpdatingEmail,
    currentEmail,
  };
}
