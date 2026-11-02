import { ApiError } from "@/lib/autogpt-server-api/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

/** A 4xx won't heal on retry — fail fast instead of stalling ~7s in backoff. */
export function retryUnlessClientError(
  failureCount: number,
  error: unknown,
): boolean {
  const status = error instanceof ApiError ? error.status : undefined;
  return (
    failureCount < 3 && !(status !== undefined && status >= 400 && status < 500)
  );
}

export function getGraphLoadErrorToast(
  error: unknown,
  locale: Locale = DEFAULT_LOCALE,
): {
  title: string;
  description: string;
} {
  const status = error instanceof ApiError ? error.status : undefined;
  const description =
    error instanceof Error && error.message
      ? error.message
      : getMessage(locale, "build5.loadError.unexpected");

  if (status === 404) {
    return {
      title: getMessage(locale, "build5.loadError.notFound"),
      description,
    };
  }
  if (status === 401 || status === 403) {
    return {
      title: getMessage(locale, "build5.loadError.notAuthorized"),
      description,
    };
  }
  return {
    title: getMessage(locale, "build5.loadError.failed"),
    description,
  };
}
