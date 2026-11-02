"use client";

import React from "react";
import { useLocale, useT } from "@/lib/i18n";
import { getErrorMessage, getHttpErrorMessage } from "./helpers";
import { CardWrapper } from "./components/CardWrapper";
import { ErrorHeader } from "./components/ErrorHeader";
import { ErrorMessage } from "./components/ErrorMessage";
import { ActionButtons } from "./components/ActionButtons";

export interface ErrorCardProps {
  isSuccess?: boolean;
  isOurProblem?: boolean;
  responseError?: {
    detail?: Array<{ msg: string }> | string;
    message?: string;
  };
  httpError?: {
    status?: number;
    statusText?: string;
    message?: string;
  };
  context?: string;
  hint?: string;
  onRetry?: () => void;
  className?: string;
  /** `body-md` inside a profile tab, whose copy reads at 15px. */
  textSize?: "body" | "body-md";
}

export function ErrorCard({
  isSuccess = false,
  isOurProblem = true,
  responseError,
  httpError,
  context,
  hint,
  onRetry,
  className = "",
  textSize = "body",
}: ErrorCardProps) {
  const locale = useLocale();
  const t = useT();

  if (isSuccess && !responseError && !httpError) {
    return null;
  }

  const hasResponseDetail = !!(
    responseError &&
    ((typeof responseError.detail === "string" &&
      responseError.detail.length > 0) ||
      (Array.isArray(responseError.detail) &&
        responseError.detail.length > 0) ||
      (responseError.message && responseError.message.length > 0))
  );

  const resolvedContext = context ?? t("shared3.errorCard.dataFallback");

  const errorMessage = hasResponseDetail
    ? getErrorMessage(responseError, locale)
    : getHttpErrorMessage(httpError, locale);

  return (
    <CardWrapper className={className}>
      <div data-slot="error-card-content" className="relative space-y-4 p-6">
        <ErrorHeader />
        <ErrorMessage
          errorMessage={errorMessage}
          context={resolvedContext}
          hint={hint}
          textSize={textSize}
        />
        {isOurProblem && (
          <ActionButtons
            onRetry={onRetry}
            responseError={responseError}
            httpError={httpError}
            context={resolvedContext}
            textSize={textSize}
          />
        )}
      </div>
    </CardWrapper>
  );
}
