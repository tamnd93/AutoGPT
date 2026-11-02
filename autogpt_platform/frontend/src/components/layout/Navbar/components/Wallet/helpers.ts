import type { TrialStatusResponse } from "@/app/api/__generated__/models/trialStatusResponse";
import { formatTrialEndDate } from "@/components/organisms/TrialCard/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { OnboardingStep, UserOnboarding } from "@/lib/autogpt-server-api";

export interface Task {
  id: OnboardingStep;
  name: string;
  amount: number;
  details: string;
  video?: string;
  progress?: {
    current: number;
    target: number;
  };
}

export interface TaskGroup {
  name: string;
  details: string;
  tasks: Task[];
}

export function getTaskGroups(
  state: UserOnboarding | null,
  locale: Locale = DEFAULT_LOCALE,
): TaskGroup[] {
  const copy = (key: Parameters<typeof getMessage>[1]) =>
    getMessage(locale, key);

  return [
    {
      name: copy("nav2.wallet.group.firstWins"),
      details: copy("nav2.wallet.group.firstWinsDetails"),
      tasks: [
        {
          id: "ONBOARDING_COMPLETE",
          name: copy("nav2.wallet.task.onboarding"),
          amount: 3,
          details: "",
        },
        {
          id: "MARKETPLACE_ADD_AGENT",
          name: copy("nav2.wallet.task.marketplace"),
          amount: 1,
          details: copy("nav2.wallet.task.marketplaceDetails"),
          video: "/onboarding/marketplace-add.mp4",
        },
        {
          id: "LIBRARY_RUN_AGENT",
          name: copy("nav2.wallet.task.libraryRun"),
          amount: 1,
          details: copy("nav2.wallet.task.libraryRunDetails"),
          video: "/onboarding/agent-run.mp4",
        },
      ],
    },
    {
      name: copy("nav2.wallet.group.consistency"),
      details: copy("nav2.wallet.group.consistencyDetails"),
      tasks: [
        {
          id: "SCHEDULE_AGENT",
          name: copy("nav2.wallet.task.schedule"),
          amount: 1,
          details: copy("nav2.wallet.task.scheduleDetails"),
          video: "/onboarding/agent-schedule.mp4",
        },
        {
          id: "RUN_3_DAYS",
          name: copy("nav2.wallet.task.run3Days"),
          amount: 1,
          details: copy("nav2.wallet.task.run3DaysDetails"),
          progress: {
            current: state?.consecutiveRunDays || 0,
            target: 3,
          },
        },
      ],
    },
    {
      name: copy("nav2.wallet.group.pro"),
      details: copy("nav2.wallet.group.proDetails"),
      tasks: [
        {
          id: "TRIGGER_WEBHOOK",
          name: copy("nav2.wallet.task.webhook"),
          amount: 1,
          details: copy("nav2.wallet.task.webhookDetails"),
        },
        {
          id: "RUN_14_DAYS",
          name: copy("nav2.wallet.task.run14Days"),
          amount: 1,
          details: copy("nav2.wallet.task.run14DaysDetails"),
          progress: {
            current: state?.consecutiveRunDays || 0,
            target: 14,
          },
        },
        {
          id: "RUN_AGENTS_100",
          name: copy("nav2.wallet.task.run100"),
          amount: 1,
          details: copy("nav2.wallet.task.run100Details"),
          progress: {
            current: state?.agentRuns || 0,
            target: 100,
          },
        },
      ],
    },
  ];
}

export interface EarnRow {
  key: string;
  label: string;
  done: boolean;
  amount: number;
}

export interface EarnGroup {
  key: string;
  label: string;
  done: boolean;
  /** Sum of the rewards still claimable in this group (0 when done). */
  amount: number;
  /** Done groups start collapsed; in-progress groups start expanded. */
  defaultOpen: boolean;
  rows: EarnRow[];
}

/**
 * Shapes the task groups for the compact panel accordion: every group gets a
 * "Name · N of M" header row, keeps its tasks as sub-rows, and starts
 * collapsed only once fully completed.
 */
export function getEarnGroups(
  groups: TaskGroup[],
  // The onboarding payload is typed as always carrying `completedSteps`, but
  // the rest of the wallet already guards against it being absent — do the same
  // here so a thin backend response degrades to "nothing claimed" and not a
  // TypeError. Plain string[] (not OnboardingStep[]): stored rows may contain
  // legacy step names; the typed task ids still get typo protection.
  completedSteps: string[] | undefined,
  locale: Locale = DEFAULT_LOCALE,
): EarnGroup[] {
  const claimed = completedSteps ?? [];

  return groups.map((group): EarnGroup => {
    const rows = group.tasks.map((task) => ({
      key: task.id,
      label: task.name,
      done: claimed.includes(task.id),
      amount: task.amount,
    }));
    const completedCount = rows.filter((row) => row.done).length;
    const done = completedCount === rows.length;

    return {
      key: group.name,
      label: getMessage(locale, "nav2.wallet.groupProgress", {
        group: group.name,
        done: completedCount,
        total: rows.length,
      }),
      done,
      amount: rows
        .filter((row) => !row.done)
        .reduce((total, row) => total + row.amount, 0),
      defaultOpen: !done,
      rows,
    };
  });
}

// One line during an active trial; the explainer dialog covers what the card
// pays for. A canceled trial has no plan to start, so it names the end instead.
export function getTrialPlanLine(
  trial: TrialStatusResponse | undefined,
  locale: Locale = DEFAULT_LOCALE,
) {
  if (!trial?.active) return null;
  const date = trial.ends_at ? formatTrialEndDate(trial.ends_at) : null;
  if (trial.cancel_at_period_end) {
    return date ? getMessage(locale, "nav2.wallet.trialEnds", { date }) : null;
  }
  return date
    ? getMessage(locale, "nav2.wallet.planStarts", { date })
    : getMessage(locale, "nav2.wallet.planStartsAfterTrial");
}
