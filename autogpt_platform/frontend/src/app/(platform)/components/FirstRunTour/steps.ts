import {
  BubbleChatIcon,
  Folder01Icon,
  Rocket01Icon,
  UserGroupIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import type { TourTarget } from "@/lib/tour-targets";

export interface TourContext {
  isTrial: boolean;
}

export interface TourAvailability {
  isBillingEnabled: boolean;
}

export interface TourStep {
  id: string;
  icon: IconSvgElement;
  titleKey: MessageKey;
  /** One line. A function when the line depends on the account. */
  bodyKey: MessageKey | ((context: TourContext) => MessageKey);
  /** Where it points, then where to point when that is not on screen. */
  targets: TourTarget[];
  /** Lives in the sidebar: on a phone the menu button stands in for it. */
  inSidebar?: boolean;
  /** Per-target wording, for a step whose fallback reads differently. */
  bodyFor?: Partial<Record<TourTarget, MessageKey>>;
  /** Wording while none of the targets is on screen yet. */
  bodyWhenMissing?: MessageKey;
  /** Only shown where billing is on: a self-hosted install has no wallet. */
  requiresBilling?: boolean;
}

// One entry per step: rewording one (the allowance copy is shared with
// SECRT-3133) is an edit here, nowhere else.
export const TOUR_STEPS: TourStep[] = [
  {
    id: "chats",
    icon: BubbleChatIcon,
    titleKey: "nav1.tour.chats.title",
    bodyKey: "nav1.tour.chats.body",
    targets: ["chats"],
    inSidebar: true,
  },
  {
    id: "team",
    icon: UserGroupIcon,
    titleKey: "nav1.tour.team.title",
    bodyKey: "nav1.tour.team.body",
    targets: ["team", "workspace"],
    inSidebar: true,
  },
  {
    id: "files",
    icon: Folder01Icon,
    titleKey: "nav1.tour.files.title",
    bodyKey: "nav1.tour.files.body",
    targets: ["files", "workspace"],
    inSidebar: true,
  },
  {
    id: "allowance",
    icon: Wallet01Icon,
    titleKey: "nav1.tour.allowance.title",
    bodyKey: ({ isTrial }) =>
      isTrial ? "nav1.tour.allowance.trial" : "nav1.tour.allowance.plan",
    // The wallet draws nothing until credits load; its footer stands in.
    targets: ["wallet", "account"],
    bodyFor: {
      account: "nav1.tour.allowance.account",
    },
    inSidebar: true,
    requiresBilling: true,
  },
  {
    id: "start",
    icon: Rocket01Icon,
    titleKey: "nav1.tour.start.title",
    bodyKey: "nav1.tour.start.body",
    targets: ["first-tasks", "composer"],
    bodyFor: {
      composer: "nav1.tour.start.composer",
    },
    bodyWhenMissing: "nav1.tour.start.missing",
  },
];

// Built once: downstream effects depend on the list's identity.
const STEPS_WITHOUT_BILLING = TOUR_STEPS.filter(
  (step) => !step.requiresBilling,
);

export function getAvailableSteps({ isBillingEnabled }: TourAvailability) {
  return isBillingEnabled ? TOUR_STEPS : STEPS_WITHOUT_BILLING;
}

// The list can change under an open walkthrough (billing answering late), so
// it holds a step, not a position; a dropped step hands over to the next one.
export function findStepIndex(steps: TourStep[], stepID: string | null) {
  const index = steps.findIndex((step) => step.id === stepID);
  if (stepID === null || index !== -1) return Math.max(index, 0);
  const order = TOUR_STEPS.findIndex((step) => step.id === stepID);
  const next = steps.findIndex(
    (step) => TOUR_STEPS.findIndex(({ id }) => id === step.id) > order,
  );
  return next === -1 ? steps.length - 1 : next;
}

// Cached so the same step always hands the measuring hook the same array.
const stepLists = new WeakMap<TourStep, TourStep[]>();

export function stepListOf(step: TourStep) {
  let list = stepLists.get(step);
  if (!list) {
    list = [step];
    stepLists.set(step, list);
  }
  return list;
}

export function getStepBody(
  locale: Locale,
  step: TourStep,
  target: TourTarget | null,
  context: TourContext,
) {
  if (!target && step.bodyWhenMissing)
    return getMessage(locale, step.bodyWhenMissing);
  const override = target ? step.bodyFor?.[target] : undefined;
  const key =
    override ??
    (typeof step.bodyKey === "function" ? step.bodyKey(context) : step.bodyKey);
  return getMessage(locale, key);
}
