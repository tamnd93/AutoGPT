import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

const ERROR_CASES: Record<
  string,
  { message: MessageKey; context: MessageKey }
> = {
  "user-creation-failed": {
    message: "errors1.error.userCreation.message",
    context: "errors1.error.userCreation.context",
  },
  "auth-token-invalid": {
    message: "errors1.error.authToken.message",
    context: "errors1.error.authToken.context",
  },
  "server-error": {
    message: "errors1.error.server.message",
    context: "errors1.error.server.context",
  },
  "rate-limited": {
    message: "errors1.error.rateLimited.message",
    context: "errors1.error.rateLimited.context",
  },
  "network-error": {
    message: "errors1.error.network.message",
    context: "errors1.error.network.context",
  },
  "auth-failed": {
    message: "errors1.error.authFailed.message",
    context: "errors1.error.authFailed.context",
  },
  "session-expired": {
    message: "errors1.error.sessionExpired.message",
    context: "errors1.error.sessionExpired.context",
  },
};

const UNEXPECTED_CASE = {
  message: "errors1.error.unexpected.message" as MessageKey,
  context: "errors1.error.unexpected.context" as MessageKey,
};

export function getErrorDetails(
  errorType: string | null,
  locale: Locale = DEFAULT_LOCALE,
) {
  const errorCase =
    (errorType ? ERROR_CASES[errorType] : undefined) ?? UNEXPECTED_CASE;
  return {
    responseError: { message: getMessage(locale, errorCase.message) },
    context: getMessage(locale, errorCase.context),
  };
}
