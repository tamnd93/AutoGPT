import { useToast } from "@/components/molecules/Toast/use-toast";
import { authClient } from "@/lib/auth/client";
import { useT } from "@/lib/i18n";
import { getEmailVerificationCallbackURL } from "@/lib/auth/email-verification";
import {
  UNDELIVERABLE_EMAIL_CODE,
  UNDELIVERABLE_EMAIL_HINT,
  UNDELIVERABLE_EMAIL_TITLE,
} from "@/lib/auth/undeliverable-email";
import { useEffect, useState } from "react";
import {
  CHECK_YOUR_INBOX_HEADING_ID,
  RESEND_COOLDOWN_SECONDS,
} from "./helpers";

interface Args {
  email: string;
  next?: string | null;
  marketingOptOut?: boolean;
}

export function useCheckYourInbox({ email, next, marketingOptOut }: Args) {
  const t = useT();
  const { toast } = useToast();
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    document.getElementById(CHECK_YOUR_INBOX_HEADING_ID)?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleResend() {
    setIsResending(true);
    try {
      // Through the HTTP route rather than a server action so Better Auth's
      // per-IP rate limit applies.
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: getEmailVerificationCallbackURL({ next, marketingOptOut }),
      });
      if (error?.code === UNDELIVERABLE_EMAIL_CODE) {
        toast({
          title: UNDELIVERABLE_EMAIL_TITLE,
          description: UNDELIVERABLE_EMAIL_HINT,
          variant: "destructive",
        });
        return;
      }
      if (error) {
        showResendFailed(error.status === 429);
        return;
      }
    } catch {
      // A network failure throws instead of answering with an error.
      showResendFailed(false);
      return;
    } finally {
      setIsResending(false);
    }

    setCooldown(RESEND_COOLDOWN_SECONDS);
    toast({ title: t("auth2.inbox.sentToast", { email }), variant: "success" });
  }

  function showResendFailed(rateLimited: boolean) {
    toast({
      title: t("auth2.inbox.resendFailedTitle"),
      description: rateLimited
        ? t("auth2.inbox.resendRateLimited")
        : t("auth2.inbox.resendRetry"),
      variant: "destructive",
    });
  }

  return {
    cooldown,
    isResending,
    canResend: cooldown <= 0 && !isResending,
    handleResend,
  };
}
