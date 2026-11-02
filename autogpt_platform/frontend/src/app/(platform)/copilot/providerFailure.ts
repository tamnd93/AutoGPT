/**
 * The typed reason a provider refused a turn, as it arrives on the stream.
 *
 * Until this existed the client had to sniff substrings out of error text --
 * `"usage limit"`, `"401"` -- to guess what happened, and everything it
 * could not place got the same advice: press Try Again. That advice is
 * wrong for most provider failures. Retrying an expired login, a spent
 * quota or a retired model cannot succeed, and telling someone to retry
 * costs them the time it takes to find out.
 *
 * The server decides `retryable` and `reconnectFixesIt` so a second
 * implementation of that judgement cannot drift from the one that classified
 * the failure.
 */

import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export type ProviderFailureKind =
  | "auth_expired"
  | "invalid_credential"
  | "usage_limit"
  | "model_unavailable"
  | "policy_denied"
  | "entitlement_required"
  | "transient";

export interface ProviderFailure {
  kind: ProviderFailureKind;
  message: string;
  authProvider: string | null;
  credentialId: string | null;
  resetsAt: number | null;
  retryable: boolean;
  reconnectFixesIt: boolean;
}

export interface ProviderRoute {
  authProvider: string;
  credentialId: string | null;
}

const KINDS = new Set<string>([
  "auth_expired",
  "invalid_credential",
  "usage_limit",
  "model_unavailable",
  "policy_denied",
  "entitlement_required",
  "transient",
]);

/**
 * The envelope, from wherever it came from.
 *
 * The same object rides the live stream and is persisted onto the error
 * marker row, so reopening a chat tomorrow can offer the same recovery the
 * user was offered when it failed. One parser for both, because a second one
 * would be free to disagree about the shape.
 */
export function parseProviderFailure(value: unknown): ProviderFailure | null {
  const data = value as Partial<ProviderFailure> | undefined;
  if (!data || typeof data.kind !== "string" || !KINDS.has(data.kind)) {
    return null;
  }
  return {
    kind: data.kind as ProviderFailureKind,
    message: typeof data.message === "string" ? data.message : "",
    authProvider: data.authProvider ?? null,
    credentialId: data.credentialId ?? null,
    resetsAt: typeof data.resetsAt === "number" ? data.resetsAt : null,
    retryable: data.retryable === true,
    reconnectFixesIt: data.reconnectFixesIt === true,
  };
}

export function parseProviderFailurePart(dataPart: {
  type: string;
  data?: unknown;
}): ProviderFailure | null {
  if (dataPart.type !== "data-provider-failure") return null;
  return parseProviderFailure(dataPart.data);
}

/** The key the backend stores the envelope under on a marker row. */
export const PROVIDER_FAILURE_KEY = "provider_failure";

// Server-written prefixes that mark a row as a failure card rather than a
// reply. Kept in step with COPILOT_ERROR_PREFIX and
// COPILOT_RETRYABLE_ERROR_PREFIX in the backend's constants.
const ERROR_MARKER_PREFIXES = [
  "[__COPILOT_ERROR_f7a1__]",
  "[__COPILOT_RETRYABLE_ERROR_a9c2__]",
];

function isErrorMarker(row: { role?: unknown; content?: unknown }): boolean {
  const content = row.content;
  if (row.role !== "assistant" || typeof content !== "string") return false;
  return ERROR_MARKER_PREFIXES.some((prefix) => content.startsWith(prefix));
}

/**
 * The failure this chat is *currently* sitting on, if any.
 *
 * Scans newest-first and stops at the first thing that answers the question.
 * A marker carrying an envelope is the answer. So is a newer turn: if the user
 * has spoken again, or the assistant has replied for real, since the failure,
 * then the chat moved on and the old failure is history. Without that second
 * stop the scan walks straight past a recovered turn and resurrects a "continue
 * on ..." offer for a failure that no longer applies -- which on a reload is
 * indistinguishable, to the user, from failing again.
 */
export function latestProviderFailure(
  messages: readonly unknown[],
  activeRoute: ProviderRoute | null = null,
): ProviderFailure | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const row = messages[i];
    if (!row || typeof row !== "object") continue;
    const typed = row as {
      role?: unknown;
      content?: unknown;
      metadata?: unknown;
    };

    if (isErrorMarker(typed)) {
      const meta = typed.metadata;
      if (!meta || typeof meta !== "object") return null;
      const raw = (meta as Record<string, unknown>)[PROVIDER_FAILURE_KEY];
      const failure = raw === undefined ? null : parseProviderFailure(raw);
      if (!failure || !activeRoute || failure.authProvider === null) {
        return failure;
      }
      return failure.authProvider === activeRoute.authProvider &&
        failure.credentialId === activeRoute.credentialId
        ? failure
        : null;
    }

    // A real turn after the failure means the chat recovered.
    if (typed.role === "user") return null;
    if (typed.role === "assistant" && typeof typed.content === "string") {
      return null;
    }
  }
  return null;
}

export function providerFailureFingerprint(failure: ProviderFailure): string {
  return JSON.stringify([
    failure.kind,
    failure.message,
    failure.authProvider,
    failure.credentialId,
    failure.resetsAt,
  ]);
}

interface FailureCopy {
  title: string;
  description: string;
}

const COPY_KEY_BY_KIND: Record<
  ProviderFailureKind,
  { titleKey: string; descriptionKey: string }
> = {
  auth_expired: {
    titleKey: "chatStates3.providerFailure.authExpired.title",
    descriptionKey: "chatStates3.providerFailure.authExpired.description",
  },
  invalid_credential: {
    titleKey: "chatStates3.providerFailure.invalidCredential.title",
    descriptionKey: "chatStates3.providerFailure.invalidCredential.description",
  },
  usage_limit: {
    titleKey: "chatStates3.providerFailure.usageLimit.title",
    descriptionKey: "chatStates3.providerFailure.usageLimit.description",
  },
  model_unavailable: {
    titleKey: "chatStates3.providerFailure.modelUnavailable.title",
    descriptionKey: "chatStates3.providerFailure.modelUnavailable.description",
  },
  policy_denied: {
    titleKey: "chatStates3.providerFailure.policyDenied.title",
    descriptionKey: "chatStates3.providerFailure.policyDenied.description",
  },
  entitlement_required: {
    titleKey: "chatStates3.providerFailure.entitlementRequired.title",
    descriptionKey:
      "chatStates3.providerFailure.entitlementRequired.description",
  },
  transient: {
    titleKey: "chatStates3.providerFailure.transient.title",
    descriptionKey: "chatStates3.providerFailure.transient.description",
  },
};

/**
 * What to tell the user, preferring the provider's own words for the detail.
 *
 * The reset time is appended only when the provider reported one -- an
 * invented "try again in an hour" is worse than silence, because people plan
 * around it.
 */
export function describeProviderFailure(
  failure: ProviderFailure,
  locale: Locale = DEFAULT_LOCALE,
): FailureCopy {
  const keys = COPY_KEY_BY_KIND[failure.kind];
  const title = getMessage(locale, keys.titleKey);
  const description = getMessage(locale, keys.descriptionKey);
  const reset = formatResetHint(failure.resetsAt, locale);
  const detail = failure.message.trim() || description;
  return {
    title,
    description: reset ? `${description} ${reset}` : detail,
  };
}

function formatResetHint(
  resetsAt: number | null,
  locale: Locale,
): string | null {
  if (resetsAt === null) return null;
  const seconds = resetsAt - Math.floor(Date.now() / 1000);
  if (seconds <= 0) return null;
  if (seconds < 90) {
    return getMessage(locale, "chatStates3.providerFailure.resetUnderMinute");
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return getMessage(locale, "chatStates3.providerFailure.resetMinutes", {
      minutes,
    });
  }
  const hours = Math.round(minutes / 60);
  return hours === 1
    ? getMessage(locale, "chatStates3.providerFailure.resetHour")
    : getMessage(locale, "chatStates3.providerFailure.resetHours", { hours });
}
