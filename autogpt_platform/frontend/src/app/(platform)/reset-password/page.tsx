"use client";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { AuthCard } from "@/components/auth/AuthCard";
import { CookieSettingsLink } from "@/components/molecules/CookieSettingsLink/CookieSettingsLink";
import { ExpiredLinkMessage } from "@/components/auth/ExpiredLinkMessage";
import { FormField } from "@/components/molecules/Form/Form";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useLocale } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n/translate";
import { changePasswordFormSchema, sendEmailFormSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { changePassword, sendResetEmail } from "./actions";

function ResetPasswordContent() {
  const locale = useLocale();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);

  // Better Auth's reset link lands here with `?token=`; its presence decides
  // whether we show the "set new password" form or the "request email" form.
  const resetToken = searchParams.get("token");

  useEffect(() => {
    const error = searchParams.get("error");
    const errorCode = searchParams.get("error_code");
    const errorDescription = searchParams.get("error_description");

    if (error || errorCode) {
      // Check if this is an expired/used link error
      // Avoid broad checks like "invalid" which can match unrelated errors
      const descLower = errorDescription?.toLowerCase() || "";
      const isExpiredOrUsed =
        error === "link_expired" ||
        error === "INVALID_TOKEN" ||
        error === "invalid_token" ||
        errorCode === "otp_expired" ||
        descLower.includes("expired") ||
        descLower.includes("already") ||
        descLower.includes("used");

      if (isExpiredOrUsed) {
        setShowExpiredMessage(true);
        // Also show a toast with the error detail for debugging
        if (errorDescription) {
          toast({
            title: getMessage(locale, "auth1.reset.expiredTitle"),
            description: errorDescription,
            variant: "destructive",
          });
        }
      } else {
        // Show toast for other errors
        const errorMessage =
          errorDescription ||
          error ||
          getMessage(locale, "auth1.reset.fallbackError");
        toast({
          title: getMessage(locale, "auth1.reset.failedTitle"),
          description: errorMessage,
          variant: "destructive",
        });
      }

      // Clear all error params from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("error");
      newUrl.searchParams.delete("error_code");
      newUrl.searchParams.delete("error_description");
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, toast, router, locale]);

  const sendEmailForm = useForm<z.infer<typeof sendEmailFormSchema>>({
    resolver: zodResolver(sendEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const changePasswordForm = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSendEmail = useCallback(
    async (data: z.infer<typeof sendEmailFormSchema>) => {
      setIsLoading(true);

      if (!(await sendEmailForm.trigger())) {
        setIsLoading(false);
        return;
      }

      const error = await sendResetEmail(data.email);
      setIsLoading(false);
      if (error) {
        toast({
          title: getMessage(locale, "auth1.reset.errorTitle"),
          description: error,
          variant: "destructive",
        });
        return;
      }
      setDisabled(true);
      toast({
        title: getMessage(locale, "auth1.reset.sentTitle"),
        description: getMessage(locale, "auth1.reset.sentBody"),
        variant: "default",
      });
    },
    [sendEmailForm, toast, locale],
  );

  function handleShowEmailForm() {
    setShowExpiredMessage(false);
  }

  const onChangePassword = useCallback(
    async (data: z.infer<typeof changePasswordFormSchema>) => {
      if (!resetToken) return;

      setIsLoading(true);

      if (!(await changePasswordForm.trigger())) {
        setIsLoading(false);
        return;
      }

      const error = await changePassword(data.password, resetToken);
      setIsLoading(false);
      if (error) {
        toast({
          title: getMessage(locale, "auth1.reset.errorTitle"),
          description: error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: getMessage(locale, "auth1.reset.successTitle"),
        description: getMessage(locale, "auth1.reset.successBody"),
        variant: "default",
      });
    },
    [changePasswordForm, resetToken, toast, locale],
  );

  // Show expired link message if detected
  if (showExpiredMessage && !resetToken) {
    return (
      <div className="flex h-full min-h-[85vh] w-full flex-col items-center justify-center">
        <AuthCard title={getMessage(locale, "auth1.reset.cardTitle")}>
          <ExpiredLinkMessage onRequestNewLink={handleShowEmailForm} />
        </AuthCard>
        <CookieSettingsLink className="mt-6" />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[85vh] w-full flex-col items-center justify-center">
      <AuthCard title={getMessage(locale, "auth1.reset.cardTitle")}>
        {resetToken ? (
          <form
            onSubmit={changePasswordForm.handleSubmit(onChangePassword)}
            className="flex w-full flex-col gap-1"
          >
            <FormProvider {...changePasswordForm}>
              <FormField
                control={changePasswordForm.control}
                name="password"
                render={({ field }) => (
                  <Input
                    id={field.name}
                    label={getMessage(locale, "auth1.reset.passwordLabel")}
                    type="password"
                    placeholder="••••••••••••••••"
                    error={
                      changePasswordForm.formState.errors.password?.message
                    }
                    {...field}
                  />
                )}
              />
              <FormField
                control={changePasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input
                    id={field.name}
                    label={getMessage(locale, "auth1.reset.confirmLabel")}
                    type="password"
                    placeholder="••••••••••••••••"
                    error={
                      changePasswordForm.formState.errors.confirmPassword
                        ?.message
                    }
                    {...field}
                  />
                )}
              />

              <Button
                variant="primary"
                loading={isLoading}
                type="submit"
                className="mt-6 w-full"
              >
                {isLoading
                  ? getMessage(locale, "auth1.reset.updating")
                  : getMessage(locale, "auth1.reset.update")}
              </Button>
            </FormProvider>
          </form>
        ) : (
          <form
            onSubmit={sendEmailForm.handleSubmit(onSendEmail)}
            className="flex w-full flex-col gap-1"
          >
            <FormProvider {...sendEmailForm}>
              <FormField
                control={sendEmailForm.control}
                name="email"
                render={({ field }) => (
                  <Input
                    id={field.name}
                    label={getMessage(locale, "auth1.reset.emailLabel")}
                    placeholder="m@example.com"
                    type="email"
                    error={sendEmailForm.formState.errors.email?.message}
                    {...field}
                  />
                )}
              />

              <Button
                variant="primary"
                loading={isLoading}
                disabled={disabled}
                type="submit"
                className="mt-6 w-full"
              >
                {getMessage(locale, "auth1.reset.send")}
              </Button>
            </FormProvider>
          </form>
        )}
      </AuthCard>
      <CookieSettingsLink className="mt-6" />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[80vh] items-center justify-center">
          <LoadingSpinner
            variant="circle"
            className="size-16"
            aria-hidden="true"
          />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
