"use client";

import { useEffect, useState } from "react";
import { Text } from "@/components/atoms/Text/Text";
import { Card } from "@/components/atoms/Card/Card";
import { WaitlistErrorContent } from "@/components/auth/WaitlistErrorContent";
import { isWaitlistError } from "@/app/api/auth/utils";
import { useRouter } from "next/navigation";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useT } from "@/lib/i18n";
import { environment } from "@/services/environment";

export default function AuthErrorPage() {
  const t = useT();
  const [errorType, setErrorType] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This code only runs on the client side
    if (!environment.isServerSide()) {
      const hash = window.location.hash.substring(1); // Remove the leading '#'
      const params = new URLSearchParams(hash);

      setErrorType(params.get("error"));
      setErrorCode(params.get("error_code"));
      setErrorDescription(
        params.get("error_description")?.replace(/\+/g, " ") ?? null,
      ); // Replace '+' with space
    }
  }, []);

  if (!errorType && !errorCode && !errorDescription) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Text variant="body">{t("auth1.authError.loading")}</Text>
      </div>
    );
  }

  // Check if this is a waitlist/not allowed error
  const isWaitlistErr = isWaitlistError(errorCode, errorDescription);

  if (isWaitlistErr) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <WaitlistErrorContent onBackToLogin={() => router.push("/login")} />
        </Card>
      </div>
    );
  }

  // Use ErrorCard for consistent error display
  const errorMessage = errorDescription
    ? t("auth1.authError.withDescription", { description: errorDescription })
    : t("auth1.authError.fallback");

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ErrorCard
          responseError={{
            message: errorMessage,
            detail: errorCode
              ? `${t("auth1.authError.codeDetail", { code: errorCode })}${errorType ? ` (${errorType})` : ""}`
              : undefined,
          }}
          context={t("auth1.authError.context")}
          onRetry={() => router.push("/login")}
        />
      </div>
    </div>
  );
}
