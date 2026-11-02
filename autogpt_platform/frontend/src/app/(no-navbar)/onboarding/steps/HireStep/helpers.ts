import type { ExpertRecommendations } from "@/app/api/__generated__/models/expertRecommendations";
import type { RecommendedExpert } from "@/app/api/__generated__/models/recommendedExpert";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

export const RECOMMENDATIONS_POLL_MS = 2_500;
// A job the backend never finished (process restart mid-run) must not strand
// the user on this step: past this ceiling the step shows what it has, or the
// way out, rather than a skeleton forever.
export const RECOMMENDATIONS_MAX_WAIT_MS = 20_000;
// Long enough to see the last card flip to Hired before the step moves on.
export const HIRE_ALL_ADVANCE_DELAY_MS = 500;

export type ContinueVia = "auto" | "continue" | "later";

const HIRE_TITLE_KEYS = {
  llm: "onboarding2.hire.title.llm",
  fallback: "onboarding2.hire.title.fallback",
  empty: "onboarding2.hire.title.empty",
  emptyNoRead: "onboarding2.hire.title.emptyNoRead",
  pending: "onboarding2.hire.title.pending",
} as const;

export function skipAction(t: Translate = english) {
  return { label: t("onboarding2.hire.skip"), via: "later" } as const;
}

export function hireTitle(
  team: ExpertRecommendations | null,
  isPending: boolean,
  t: Translate = english,
): string {
  if (isPending) return t(HIRE_TITLE_KEYS.pending);
  if ((team?.experts?.length ?? 0) === 0) {
    return team?.diagnosis
      ? t(HIRE_TITLE_KEYS.empty)
      : t(HIRE_TITLE_KEYS.emptyNoRead);
  }
  return team?.source === "llm"
    ? t(HIRE_TITLE_KEYS.llm)
    : t(HIRE_TITLE_KEYS.fallback);
}

// The diagnosis is the "read" the empty-state title promises; with cards on
// screen the cards themselves are the read, so it stays out of the way.
export function hireDiagnosis(
  team: ExpertRecommendations | null,
  isPending: boolean,
): string | null {
  if (isPending || (team?.experts?.length ?? 0) > 0) return null;
  return team?.diagnosis?.trim() || null;
}

export function raiseNote(
  role: string | null | undefined,
  t: Translate = english,
): string | null {
  if (!role) return null;
  return t("onboarding2.hire.raiseNote", { role });
}

interface ActionArgs {
  experts: RecommendedExpert[];
  hiredTemplateIds: string[];
  failedTemplateIds: string[];
  excludedTemplateIds: string[];
}

// The primary hires every unhired expert the user left in, and moves on once
// nobody is unhired; with everyone left out, the skip is the only action. The
// secondary always moves on without hiring more.
export function hireStepActions(
  {
    experts,
    hiredTemplateIds,
    failedTemplateIds,
    excludedTemplateIds,
  }: ActionArgs,
  t: Translate = english,
) {
  const unhired = experts.filter(
    (expert) => !hiredTemplateIds.includes(expert.template_id),
  );
  const batch = unhired.filter(
    (expert) => !excludedTemplateIds.includes(expert.template_id),
  );
  const hiredCount = experts.length - unhired.length;
  const isRetry =
    batch.length > 0 &&
    batch.every((expert) => failedTemplateIds.includes(expert.template_id));
  const skip =
    hiredCount > 0
      ? { label: t("onboarding2.hire.continue"), via: "continue" as const }
      : skipAction(t);

  if (unhired.length === 0) {
    return {
      primaryLabel: t("onboarding2.hire.continue"),
      batch,
      isRetry,
      skip: null,
    };
  }
  return {
    primaryLabel: isRetry
      ? t("onboarding2.hire.tryAgain")
      : hireLabel(batch, unhired.length, hiredCount, t),
    batch,
    isRetry,
    skip,
  };
}

export function hireFailureToast(
  failed: RecommendedExpert[],
  batchSize: number,
  anyHired: boolean,
  t: Translate = english,
) {
  if (!anyHired && batchSize > 1 && failed.length === batchSize) {
    return {
      title: t("onboarding2.hire.fail.titleMany"),
      description: t("onboarding2.hire.fail.retry"),
    };
  }
  return {
    title: t("onboarding2.hire.fail.titleNames", {
      names: failedNames(failed, t),
    }),
    description: anyHired
      ? t("onboarding2.hire.fail.partial")
      : t("onboarding2.hire.fail.retry"),
  };
}

function hireLabel(
  batch: RecommendedExpert[],
  unhiredCount: number,
  hiredCount: number,
  t: Translate,
) {
  if (batch.length === 0) return null;
  if (batch.length === 1) {
    return t(
      hiredCount > 0
        ? "onboarding2.hire.label.oneToo"
        : "onboarding2.hire.label.one",
      { name: batch[0].name },
    );
  }
  if (batch.length < unhiredCount)
    return t("onboarding2.hire.label.some", { count: batch.length });
  return hiredCount > 0
    ? t("onboarding2.hire.label.others", { count: batch.length })
    : t("onboarding2.hire.label.all", { count: batch.length });
}

function failedNames(failed: RecommendedExpert[], t: Translate) {
  const names = failed.map((expert) => expert.name);
  if (names.length > 3)
    return t("onboarding2.hire.fail.namesMany", { count: names.length });
  if (names.length === 1) return names[0];
  return t("onboarding2.hire.fail.namesAnd", {
    head: names.slice(0, -1).join(", "),
    last: names[names.length - 1],
  });
}
