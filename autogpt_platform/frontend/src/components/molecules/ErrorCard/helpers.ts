import { ErrorCardProps } from "./ErrorCard";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export function getErrorMessage(
  error: ErrorCardProps["responseError"],
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (!error) return getMessage(locale, "shared3.errorCard.unknown");

  if (typeof error.detail === "string") return error.detail;
  if (Array.isArray(error.detail) && error.detail.length > 0) {
    return error.detail[0].msg;
  }
  if (error.message) return error.message;

  return getMessage(locale, "shared3.errorCard.unknown");
}

export function getHttpErrorMessage(
  httpError: ErrorCardProps["httpError"],
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (!httpError) return "";

  const status = httpError.status || 0;

  if (httpError.message || httpError.statusText)
    return (
      httpError.message ||
      httpError.statusText ||
      getMessage(locale, "shared3.errorCard.unknownShort")
    );

  if (status >= 500) {
    return getMessage(locale, "shared3.errorCard.http500");
  }

  if (status === 404) {
    return getMessage(locale, "shared3.errorCard.http404");
  }

  if (status === 403) {
    return getMessage(locale, "shared3.errorCard.http403");
  }

  if (status === 429) {
    return getMessage(locale, "shared3.errorCard.http429");
  }

  if (status >= 400) {
    return getMessage(locale, "shared3.errorCard.http400");
  }

  return getMessage(locale, "shared3.errorCard.unexpected");
}

export function shouldShowError(
  isSuccess: boolean,
  responseError?: ErrorCardProps["responseError"],
  httpError?: ErrorCardProps["httpError"],
): boolean {
  return !isSuccess || !!responseError || !!httpError;
}

export function handleReportError(
  responseError?: ErrorCardProps["responseError"],
  httpError?: ErrorCardProps["httpError"],
  context?: string,
  locale: Locale = DEFAULT_LOCALE,
): void {
  try {
    // Import Sentry dynamically to avoid SSR issues
    import("@sentry/nextjs").then((Sentry) => {
      // Create a comprehensive error object for Sentry
      const errorData = {
        responseError,
        httpError,
        context,
        timestamp: new Date().toISOString(),
        userAgent:
          typeof window !== "undefined" ? window.navigator.userAgent : "server",
        url: typeof window !== "undefined" ? window.location.href : "unknown",
      };

      // Create an error object that Sentry can capture
      const errorMessage = httpError
        ? `HTTP ${httpError.status} - ${httpError.statusText || "Error"}`
        : responseError
          ? `Response Error - ${getErrorMessage(responseError, locale)}`
          : "Unknown Error";

      const error = new Error(
        `ErrorCard: ${context ? `${context} ` : ""}${errorMessage}`,
      );

      Sentry.withScope((scope) => {
        scope.setTag("component", "ErrorCard");
        scope.setTag("errorType", httpError ? "http" : "response");
        scope.setContext("errorDetails", errorData);

        if (context) {
          scope.setTag("context", context);
        }

        if (httpError?.status) {
          scope.setTag("httpStatus", httpError.status.toString());
        }

        Sentry.captureException(error);
      });

      // Show success toast notification after pressing the report error button
      import("sonner").then(({ toast }) => {
        toast.success(getMessage(locale, "shared3.errorCard.reportSuccess"), {
          description: getMessage(
            locale,
            "shared3.errorCard.reportSuccessBody",
          ),
          duration: 4000,
        });
      });
    });
  } catch (error) {
    console.error("Failed to report error to Sentry:", error);
    // Fallback toast notification
    import("sonner").then(({ toast }) => {
      toast.error(getMessage(locale, "shared3.errorCard.reportFailed"), {
        description: getMessage(
          locale,
          "shared3.errorCard.reportFailedBody",
        ),
        duration: 4000,
      });
    });
  }
}
