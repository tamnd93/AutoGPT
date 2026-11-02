"use client";

import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useLocale, useT } from "@/lib/i18n";
import { getErrorDetails } from "./error/helpers";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorPageContent() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  const errorDetails = getErrorDetails(errorMessage, locale);

  function handleRetry() {
    if (
      errorMessage === "user-creation-failed" ||
      errorMessage === "auth-failed"
    ) {
      window.location.href = "/login";
    } else {
      window.document.location.reload();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <ErrorCard
          responseError={errorDetails.responseError}
          context={errorDetails.context}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
}

export default function ErrorPage() {
  const t = useT();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <ErrorCard
              responseError={{ message: t("errors1.error.loading") }}
              context={t("errors1.error.unexpected.context")}
            />
          </div>
        </div>
      }
    >
      <ErrorPageContent />
    </Suspense>
  );
}
