import { toast } from "@/components/molecules/Toast/use-toast";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

import {
  describeProviderFailure,
  parseProviderFailure,
  type ProviderFailure,
} from "./providerFailure";

/**
 * Parses a backend-encoded error code from an `errorText` payload.
 *
 * The AI-SDK SSE protocol enforces `z.strictObject({type, errorText})`
 * on StreamError frames, so the backend cannot attach a top-level `code`
 * field. Instead it prefixes the message with `[code:<id>] <msg>` and
 * this helper extracts it client-side.
 */
export function parseBackendErrorCode(raw: string): {
  code: string | null;
  message: string;
} {
  const match = raw.match(/^\s*\[code:([a-z0-9_]+)\]\s*(.*)$/is);
  if (!match) return { code: null, message: raw };
  return { code: match[1], message: match[2].trim() };
}

/**
 * User-facing toast copy for each backend error code we surface.
 * `description` defaults to the backend's error message when provided;
 * `fallbackDescription` is used when the backend sends only the code.
 */
const TOAST_BY_BACKEND_CODE: Record<
  string,
  { titleKey: string; fallbackKey: string }
> = {
  idle_timeout: {
    titleKey: "chatStates3.streamErrors.idleTimeout.title",
    fallbackKey: "chatStates3.streamErrors.idleTimeout.fallback",
  },
  tool_stalled: {
    titleKey: "chatStates3.streamErrors.toolStalled.title",
    fallbackKey: "chatStates3.streamErrors.toolStalled.fallback",
  },
  transient_api_error: {
    titleKey: "chatStates3.streamErrors.transientApiError.title",
    fallbackKey: "chatStates3.streamErrors.transientApiError.fallback",
  },
  circuit_breaker_empty_tool_calls: {
    titleKey: "chatStates3.streamErrors.emptyToolCalls.title",
    fallbackKey: "chatStates3.streamErrors.emptyToolCalls.fallback",
  },
  all_attempts_exhausted: {
    titleKey: "chatStates3.streamErrors.attemptsExhausted.title",
    fallbackKey: "chatStates3.streamErrors.attemptsExhausted.fallback",
  },
  sdk_stream_error: {
    titleKey: "chatStates3.streamErrors.sdkStreamError.title",
    fallbackKey: "chatStates3.streamErrors.sdkStreamError.fallback",
  },
  sdk_error: {
    titleKey: "chatStates3.streamErrors.sdkError.title",
    fallbackKey: "chatStates3.streamErrors.sdkError.fallback",
  },
  provider_unavailable: {
    titleKey: "chatStates3.streamErrors.providerUnavailable.title",
    fallbackKey: "chatStates3.streamErrors.providerUnavailable.fallback",
  },
  max_budget_exhausted: {
    titleKey: "chatStates3.streamErrors.maxBudget.title",
    fallbackKey: "chatStates3.streamErrors.maxBudget.fallback",
  },
};

/** Fallback toast shown for any `[code:X]` we don't have specific copy for. */
const GENERIC_BACKEND_TOAST = {
  titleKey: "chatStates3.streamErrors.generic.title",
  fallbackKey: "chatStates3.streamErrors.generic.fallback",
};

/**
 * Extract the human-readable error detail. FastAPI typically wraps 4xx
 * responses in `{"detail": "..."}` — if the SDK surfaced that as JSON in
 * `error.message`, unwrap to the nested string; otherwise use the raw message.
 */
function extractErrorDetail(error: Error): string {
  try {
    const parsed = JSON.parse(error.message) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "detail" in parsed &&
      typeof (parsed as { detail: unknown }).detail === "string"
    ) {
      return (parsed as { detail: string }).detail;
    }
  } catch {
    // Not JSON — use message as-is
  }
  return error.message;
}

/**
 * A typed provider-failure envelope, when FastAPI's `{"detail": ...}` wraps
 * an object instead of a string (e.g. the 429 raised for the platform usage
 * cap). `extractErrorDetail` above only unwraps string details, so a
 * structured refusal used to fall through to substring guessing and never
 * reached the "switch connection" UI. Checked separately so the string path
 * stays untouched for every other error shape.
 */
function extractProviderFailureDetail(error: Error): ProviderFailure | null {
  try {
    const parsed = JSON.parse(error.message) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "detail" in parsed &&
      typeof (parsed as { detail: unknown }).detail === "object" &&
      (parsed as { detail: unknown }).detail !== null
    ) {
      return parseProviderFailure((parsed as { detail: unknown }).detail);
    }
  } catch {
    // Not JSON
  }
  return null;
}

/**
 * Where a usage limit was refused. The two limits do not share an answer:
 *
 * - `"admission"`: the backend refused the turn before the stream opened,
 *   which only our own budget does. The envelope came in the HTTP error body.
 * - `"provider"`: the connection the turn ran on refused it mid-turn. The
 *   envelope rode the live stream.
 *
 * Told apart by origin rather than by `authProvider` because a self-host
 * runs its own OpenRouter or local gateway on the "platform" route, so its
 * upstream 429 carries the same `authProvider` as our admission cap.
 */
export type UsageLimitOrigin = "admission" | "provider";

interface HandleStreamErrorArgs {
  error: Error;
  onRateLimit: (
    message: string,
    providerFailure?: ProviderFailure,
    origin?: UsageLimitOrigin,
  ) => void;
  onReconnect: () => void;
  /**
   * The account has no plan (HTTP 402). The backend refuses before saving the
   * prompt, so the caller puts it back in the composer; the chat's error
   * banner is the one message and carries the upgrade path, so no toast.
   */
  onPaywall?: () => void;
  isUserStoppingRef: React.MutableRefObject<boolean>;
  /**
   * The typed envelope, when this turn sent one. It is the only source here
   * that actually knows what happened; every branch below it is inference
   * from error text.
   */
  providerFailure?: ProviderFailure | null;
  /** Locale for the toast copy; defaults to English. */
  locale?: Locale;
}

/**
 * Process a stream error from `useChat.onError`. Surfaces the right toast
 * (or rate-limit UI), and decides whether to retry via reconnect.
 *
 * Dispatch order (exclusive branches):
 *  -. HTTP 402 (no plan) → `onPaywall`; the error banner says the rest.
 *  0. A typed provider-failure envelope → its own copy.
 *  1. `[code:<id>]` backend prefix → curated or generic backend toast.
 *  2. Legacy `usage limit` substring → rate-limit UI via `onRateLimit`.
 *  3. Legacy 401 / auth failure → auth-error toast.
 *  4. TypeError / AbortError / "connection interrupted" → reconnect.
 *  5. Anything else silently falls through (the AI-SDK also surfaces
 *     `error` into the hook's `error` return, which drives the inline
 *     error banner).
 */
function errorMessageOrFallback(
  locale: Locale,
  message: string,
  toastKeys: { fallbackKey: string },
): string {
  return message || getMessage(locale, toastKeys.fallbackKey);
}

export function handleStreamError({
  error,
  onRateLimit,
  onReconnect,
  onPaywall,
  isUserStoppingRef,
  providerFailure: streamedProviderFailure,
  locale = DEFAULT_LOCALE,
}: HandleStreamErrorArgs): void {
  if ((error as { status?: unknown }).status === 402) {
    onPaywall?.();
    return;
  }
  const errorDetail = extractErrorDetail(error);
  // The live stream's typed envelope wins when present; otherwise recover
  // one from a structured 429/etc. body raised before streaming started.
  const providerFailure =
    streamedProviderFailure ?? extractProviderFailureDetail(error);

  // 0. The server said what went wrong, so stop guessing.
  if (providerFailure) {
    const copy = describeProviderFailure(providerFailure, locale);
    if (providerFailure.kind === "usage_limit") {
      // Still routed through the rate-limit path: it restores the composer
      // text for a message the backend refused before persisting, which a
      // toast alone would lose.
      //
      // The failure travels with it, and so does where it was refused, so
      // the caller can tell the two limits apart. They are not the same
      // event: our own credits running out is answered by upgrading a plan
      // with us, and a linked subscription running out is answered by
      // continuing on a different connection. Offering the first for the
      // second asks someone to pay us because OpenAI said no.
      const origin: UsageLimitOrigin = streamedProviderFailure
        ? "provider"
        : "admission";
      onRateLimit(
        `${copy.title}. ${copy.description}`,
        providerFailure,
        origin,
      );
      return;
    }
    toast({
      title: copy.title,
      description: copy.description,
      variant: "destructive",
    });
    return;
  }

  // 1. Coded backend errors take precedence over message-text heuristics.
  const { code: backendCode, message: backendMessage } =
    parseBackendErrorCode(errorDetail);
  if (backendCode) {
    const userToast =
      TOAST_BY_BACKEND_CODE[backendCode] ?? GENERIC_BACKEND_TOAST;
    toast({
      title: getMessage(locale, userToast.titleKey),
      description: errorMessageOrFallback(locale, backendMessage, userToast),
      variant: "destructive",
    });
    return;
  }

  // 2. Rate limit (FastAPI 429 body contains "usage limit")
  if (errorDetail.toLowerCase().includes("usage limit")) {
    onRateLimit(
      errorDetail ||
        getMessage(locale, "chatStates3.streamErrors.usageLimitFallback"),
    );
    return;
  }

  // 3. Authentication failures (from getCopilotAuthHeaders or 401 responses)
  const isAuthError =
    errorDetail.includes("Authentication failed") ||
    errorDetail.includes("Unauthorized") ||
    errorDetail.includes("Not authenticated") ||
    errorDetail.toLowerCase().includes("401");
  if (isAuthError) {
    toast({
      title: getMessage(locale, "chatStates3.streamErrors.auth.title"),
      description: getMessage(
        locale,
        "chatStates3.streamErrors.auth.fallback",
      ),
      variant: "destructive",
    });
    return;
  }

  // 4. Transient network / abort — reconnect so the "Try Again" affordance
  // (persisted retryable-error marker on the session) lights up.
  if (isUserStoppingRef.current) return;
  const isNetworkError =
    error.name === "TypeError" || error.name === "AbortError";
  const isTransientApiError = errorDetail.includes("connection interrupted");
  if (isNetworkError || isTransientApiError) {
    onReconnect();
  }
}
