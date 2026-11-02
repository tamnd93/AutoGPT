"use client";
import { FormProvider } from "react-hook-form";
import { FormField } from "@/components/molecules/Form/Form";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Link } from "@/components/atoms/Link/Link";
import { Text } from "@/components/atoms/Text/Text";
import AuthFeedback from "@/components/auth/AuthFeedback";
import { CheckYourInbox } from "@/components/auth/CheckYourInbox/CheckYourInbox";
import { EmailNotAllowedModal } from "@/components/auth/EmailNotAllowedModal";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { AuthDivider } from "@/components/auth/AuthSplitLayout/AuthDivider";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout/AuthSplitLayout";
import { MobileWarningBanner } from "@/components/auth/MobileWarningBanner";
import { Alert, AlertDescription } from "@/components/molecules/Alert/Alert";
import { useT } from "@/lib/i18n";
import { environment } from "@/services/environment";
import { useSearchParams } from "next/navigation";
import { LoadingLogin } from "./components/LoadingLogin";
import { LoginMarketingPanel } from "./components/LoginMarketingPanel";
import {
  ACCOUNT_BANNED_NOTICE_KEY,
  EMAIL_VERIFICATION_NOTICE_KEYS,
} from "./helpers";
import { useLoginPage } from "./useLoginPage";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const t = useT();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");
  const signupHref = nextUrl
    ? `/signup?next=${encodeURIComponent(nextUrl)}`
    : "/signup";

  const {
    user,
    form,
    feedback,
    nextUrl: safeNextUrl,
    verificationEmail,
    verificationNotice,
    showBannedNotice,
    isLoading,
    isGoogleLoading,
    isCloudEnv,
    isUserLoading,
    showNotAllowedModal,
    handleSubmit,
    handleProviderLogin,
    handleCloseNotAllowedModal,
    handleBackToLogin,
  } = useLoginPage();

  if (isUserLoading || user) {
    return <LoadingLogin />;
  }

  if (verificationEmail) {
    return (
      <AuthSplitLayout marketing={<LoginMarketingPanel />}>
        <CheckYourInbox
          email={verificationEmail}
          reason="login"
          next={safeNextUrl}
          onBack={handleBackToLogin}
        />
      </AuthSplitLayout>
    );
  }

  return (
    <AuthSplitLayout marketing={<LoginMarketingPanel />}>
      <div className="mb-8">
        <Text variant="h3" as="h1" className="!text-foreground-strong">
          {t("auth1.login.title")}
        </Text>
      </div>

      {showBannedNotice ? (
        <Alert variant="error" className="mb-6">
          <AlertDescription>{t(ACCOUNT_BANNED_NOTICE_KEY)}</AlertDescription>
        </Alert>
      ) : null}

      {verificationNotice ? (
        <Alert className="mb-6">
          <AlertDescription>
            {t(EMAIL_VERIFICATION_NOTICE_KEYS[verificationNotice])}
          </AlertDescription>
        </Alert>
      ) : null}

      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                id={field.name}
                label={t("auth1.login.emailLabel")}
                placeholder="name@company.com"
                type="email"
                autoComplete="username"
                className="w-full"
                error={form.formState.errors.email?.message}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input
                id={field.name}
                label={t("auth1.login.passwordLabel")}
                placeholder={t("auth1.login.passwordPlaceholder")}
                type="password"
                autoComplete="current-password"
                error={form.formState.errors.password?.message}
                hint={
                  <Link variant="secondary" href="/reset-password">
                    {t("auth1.login.forgot")}
                  </Link>
                }
                {...field}
              />
            )}
          />

          <Button
            variant="primary"
            loading={isLoading}
            disabled={isGoogleLoading}
            type="submit"
            className="mt-6 w-full"
          >
            {isLoading ? t("auth1.login.submitting") : t("auth1.login.submit")}
          </Button>
        </form>

        {isCloudEnv ? (
          <>
            <AuthDivider />
            <GoogleOAuthButton
              onClick={() => handleProviderLogin("google")}
              isLoading={isGoogleLoading}
              disabled={isLoading}
            />
          </>
        ) : null}

        <AuthFeedback
          type="login"
          message={feedback}
          isError={!!feedback}
          behaveAs={environment.getBehaveAs()}
        />
      </FormProvider>

      <div className="mt-6 inline-flex w-full items-center justify-center gap-1">
        <Text variant="body-medium" className="!text-foreground-tertiary">
          {t("auth1.login.noAccount")}
        </Text>
        <Link href={signupHref} variant="secondary">
          {t("auth1.login.signupLink")}
        </Link>
      </div>

      <MobileWarningBanner />
      <EmailNotAllowedModal
        isOpen={showNotAllowedModal}
        onClose={handleCloseNotAllowedModal}
      />
    </AuthSplitLayout>
  );
}
