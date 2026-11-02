import { CopilotAuthError } from "./helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import {
  ChatUnavailableError,
  isUnexpectedRefusal,
  MessageTooLongError,
} from "./stream/turnRuntime";

export type ChatErrorAction = "sign-in" | "new-chat" | "plans";

export interface ChatErrorGuidance {
  /** What happened, and what will work next. */
  title: string;
  action: ChatErrorAction | null;
  /** A small muted line under the guidance. */
  note?: string;
}

/** Guidance for a failed send or stream; it promises a resend only where one can succeed. */
export function describeChatError(
  error: Error,
  locale: Locale = DEFAULT_LOCALE,
): ChatErrorGuidance {
  const status = statusOf(error);
  const m = (key: Parameters<typeof getMessage>[1]) => getMessage(locale, key);
  if (
    error instanceof CopilotAuthError ||
    status === 401 ||
    /authentication failed|not authenticated/i.test(error.message)
  )
    return {
      title: m("chatRuntime1.chatError.signedOut"),
      action: "sign-in",
    };
  if (error instanceof ChatUnavailableError || status === 404)
    return {
      title: m("chatRuntime1.chatError.chatGone"),
      action: "new-chat",
    };
  if (error instanceof MessageTooLongError)
    return {
      title: m("chatRuntime1.chatError.messageTooLong"),
      action: null,
    };
  if (/prompt is too long/i.test(error.message))
    return {
      title: m("chatRuntime1.chatError.conversationTooLong"),
      action: "new-chat",
    };
  if (status === 402)
    return {
      title: m("chatRuntime1.chatError.needsPlan"),
      action: "plans",
    };
  if (status === 429 || /usage limit/i.test(error.message))
    return {
      title: m("chatRuntime1.chatError.usageLimit"),
      action: null,
    };
  // The app only sends what the server accepts, so this is our bug.
  if (status !== null && isUnexpectedRefusal(status))
    return {
      title: m("chatRuntime1.chatError.refused"),
      action: null,
      note: m("chatRuntime1.chatError.refusedNote"),
    };
  if (status !== null && status >= 500)
    return {
      title: m("chatRuntime1.chatError.serverProblem"),
      action: null,
    };
  if (error.name === "TypeError")
    return {
      title: m("chatRuntime1.chatError.connectionDropped"),
      action: null,
    };
  return {
    title: m("chatRuntime1.chatError.generic"),
    action: null,
  };
}

function statusOf(error: Error) {
  const status = (error as { status?: unknown }).status;
  return typeof status === "number" ? status : null;
}
