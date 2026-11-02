import type { UIMessage } from "ai";

import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

import { TURN_PAUSED_PART_TYPE, type TurnPause } from "../../turnPause";

/**
 * The pause the chat is sitting on: the last thing in it, with nothing drawn
 * after it. Once anything follows (a "Keep going" note, a resumed turn, the
 * user's next message) the pause is history and its card stops offering
 * ways back in. A card knows it is this pause by comparing its `data` to it
 * by reference, so the chat's message transforms must pass that object on.
 */
export function getCurrentPause(messages: readonly UIMessage[]): unknown {
  const last = messages[messages.length - 1];
  if (last?.role !== "assistant") return null;
  for (let i = last.parts.length - 1; i >= 0; i--) {
    const part = last.parts[i];
    if (part.type === TURN_PAUSED_PART_TYPE) {
      return (part as { data?: unknown }).data ?? null;
    }
    if (!drawsNothing(part)) return null;
  }
  return null;
}

function drawsNothing(part: UIMessage["parts"][number]): boolean {
  if (part.type === "step-start" || part.type.startsWith("data-")) return true;
  if (part.type === "text" || part.type === "reasoning") {
    return !part.text.trim();
  }
  return false;
}

type BudgetPause = TurnPause & { reason: "daily" | "weekly" };

export function isBudgetPause(pause: TurnPause): pause is BudgetPause {
  return pause.reason === "daily" || pause.reason === "weekly";
}

/** A budget pause with no reset time: the account has no plan, so its
 *  allowance never refills on its own. */
export function neverResets(pause: TurnPause): boolean {
  return isBudgetPause(pause) && pause.resets_at === null;
}

/** The window the pause waited on has refilled since. */
export function hasReset(pause: TurnPause, now = new Date()): boolean {
  if (!isBudgetPause(pause) || !pause.resets_at) return false;
  return Date.parse(pause.resets_at) <= now.getTime();
}

function budgetName(reason: "daily" | "weekly", locale: Locale): string {
  return reason === "daily"
    ? getMessage(locale, "chatStates3.pause.budgetToday")
    : getMessage(locale, "chatStates3.pause.budgetWeek");
}

export function pauseTitle(
  pause: TurnPause,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const lead = pause.started
    ? getMessage(locale, "chatStates3.pause.paused")
    : getMessage(locale, "chatStates3.pause.notStarted");
  // No plan behind it, so no window that will refill to name.
  if (neverResets(pause)) {
    return getMessage(locale, "chatStates3.pause.titleOutOfBudget", { lead });
  }
  if (isBudgetPause(pause)) {
    return getMessage(locale, "chatStates3.pause.titleOutOfBudgetNamed", {
      lead,
      budget: budgetName(pause.reason, locale),
    });
  }
  if (pause.reason === "trial") {
    return getMessage(locale, "chatStates3.pause.titleTrial", { lead });
  }
  if (!pause.started) return lead;
  return pause.reason === "task"
    ? getMessage(locale, "chatStates3.pause.titleSizeLimit")
    : getMessage(locale, "chatStates3.pause.titleLongRun");
}

interface BodyArgs {
  pause: TurnPause;
  name: string;
  /** The budget refilled after the pause, so there is nothing to wait for. */
  budgetBack?: boolean;
  now?: Date;
  locale?: Locale;
}

export function pauseBody({
  pause,
  name,
  budgetBack = false,
  now = new Date(),
  locale = DEFAULT_LOCALE,
}: BodyArgs): string {
  if (pause.reason === "steps" && pause.started) {
    return stepsBody(pause, name, locale);
  }
  if (!pause.started) {
    return notStartedBody(pause, name, budgetBack, now, locale);
  }
  const saved = pause.checkpoint_saved
    ? getMessage(locale, "chatStates3.pause.saved", { name })
    : getMessage(locale, "chatStates3.pause.stopped", { name });
  if (!isBudgetPause(pause)) return saved;
  if (budgetBack) {
    return getMessage(locale, "chatStates3.pause.budgetReset", { saved });
  }
  const reset = resetPhrase(pause.resets_at, now, locale);
  return reset
    ? getMessage(locale, "chatStates3.pause.budgetResets", { saved, reset })
    : saved;
}

function stepsBody(pause: TurnPause, name: string, locale: Locale): string {
  const done =
    pause.steps !== null
      ? getMessage(locale, "chatStates3.pause.stepsDone", {
          steps: pause.steps.toLocaleString(),
        })
      : getMessage(locale, "chatStates3.pause.stepsWhile");
  return pause.checkpoint_saved
    ? getMessage(locale, "chatStates3.pause.stepsSaved", { name, done })
    : getMessage(locale, "chatStates3.pause.stepsStopped", { name, done });
}

function notStartedBody(
  pause: TurnPause,
  name: string,
  budgetBack: boolean,
  now: Date,
  locale: Locale,
): string {
  if (pause.reason === "trial") {
    return getMessage(locale, "chatStates3.pause.notStartedTrial", { name });
  }
  if (!isBudgetPause(pause)) {
    return getMessage(locale, "chatStates3.pause.notStartedGeneric", { name });
  }
  if (neverResets(pause)) {
    return getMessage(locale, "chatStates3.pause.notStartedNoBudget", { name });
  }
  const budget = budgetName(pause.reason, locale);
  if (budgetBack) {
    return getMessage(locale, "chatStates3.pause.notStartedBudgetBack", {
      name,
      budget,
    });
  }
  const reset = resetPhrase(pause.resets_at, now, locale);
  const lead = getMessage(locale, "chatStates3.pause.notStartedBudgetLead", {
    name,
    budget,
  });
  return reset
    ? getMessage(locale, "chatStates3.pause.resetSuffix", { lead, reset })
    : lead;
}

/** "at 1:00 AM, in 4 h 12 min", or nothing when the time is unknown. */
function resetPhrase(
  resetsAt: string | null,
  now: Date,
  locale: Locale,
): string | null {
  if (!resetsAt) return null;
  const date = new Date(resetsAt);
  if (!Number.isFinite(date.getTime())) return null;
  return `${resetAt(date, now, locale)}, ${resetIn(date, now, locale)}`;
}

/** "Resume at 1:00 AM", or a plain "Resume at reset" when the time is unknown. */
export function resumeLabel(
  resetsAt: string | null,
  now = new Date(),
  locale: Locale = DEFAULT_LOCALE,
) {
  const date = resetsAt ? new Date(resetsAt) : null;
  return date && Number.isFinite(date.getTime())
    ? getMessage(locale, "chatStates3.pause.resumeAt", {
        at: resetAt(date, now, locale),
      })
    : getMessage(locale, "chatStates3.pause.resumeAtReset");
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** "at 1:00 AM" within a day, "Monday at 1:00 AM" within a week. */
export function resetAt(
  date: Date,
  now = new Date(),
  locale: Locale = DEFAULT_LOCALE,
): string {
  const localeTag = locale === "vi" ? "vi-VN" : undefined;
  const time = date.toLocaleTimeString(localeTag, {
    hour: "numeric",
    minute: "2-digit",
  });
  const ms = date.getTime() - now.getTime();
  if (ms < DAY_MS) {
    return getMessage(locale, "chatStates3.pause.resetAtTime", { time });
  }
  const day =
    ms < 7 * DAY_MS
      ? date.toLocaleDateString(localeTag, { weekday: "long" })
      : date.toLocaleDateString(localeTag, { month: "short", day: "numeric" });
  return getMessage(locale, "chatStates3.pause.resetAtDay", { day, time });
}

/** "in 4 h 12 min", "in 45 min", "in 2 days". */
export function resetIn(
  date: Date,
  now = new Date(),
  locale: Locale = DEFAULT_LOCALE,
): string {
  const ms = date.getTime() - now.getTime();
  const minutes = Math.max(1, Math.ceil(ms / 60_000));
  if (minutes < 60) {
    return getMessage(locale, "chatStates3.pause.resetInMinutes", { minutes });
  }
  // resetAt's cut-off: a time it names without the day never reads "in 1 day".
  if (ms < DAY_MS) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest
      ? getMessage(locale, "chatStates3.pause.resetInHoursMin", {
          hours,
          rest,
        })
      : getMessage(locale, "chatStates3.pause.resetInHours", { hours });
  }
  const days = Math.round(minutes / (24 * 60));
  return days === 1
    ? getMessage(locale, "chatStates3.pause.resetInDay")
    : getMessage(locale, "chatStates3.pause.resetInDays", { days });
}
