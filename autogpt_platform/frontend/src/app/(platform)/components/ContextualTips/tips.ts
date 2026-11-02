import type { PostV1CompleteOnboardingStepStep } from "@/app/api/__generated__/models/postV1CompleteOnboardingStepStep";
import type { Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import type { TourTarget } from "@/lib/tour-targets";

export type TipID = "second-chat" | "first-cost" | "first-expert";

export interface TipContext {
  isTrial: boolean;
}

interface Tip {
  /** Records the tip as seen, once per user across devices. */
  step: PostV1CompleteOnboardingStepStep;
  /** Where it points, then where to point when that is not on screen. */
  targets: TourTarget[];
  titleKey: MessageKey;
  bodyKey: MessageKey | ((context: TipContext) => MessageKey);
  /** Only where billing is on: a self-hosted install has no wallet. */
  requiresBilling?: boolean;
}

export const TIPS: Record<TipID, Tip> = {
  "second-chat": {
    step: "CHATS_TIP",
    targets: ["chats", "menu"],
    titleKey: "nav1.tip.secondChat.title",
    bodyKey: "nav1.tip.secondChat.body",
  },
  "first-cost": {
    step: "COST_TIP",
    targets: ["wallet", "menu"],
    requiresBilling: true,
    titleKey: "nav1.tip.firstCost.title",
    bodyKey: ({ isTrial }) =>
      isTrial ? "nav1.tip.firstCost.trial" : "nav1.tip.firstCost.plan",
  },
  "first-expert": {
    step: "EXPERT_TIP",
    targets: ["team", "workspace", "menu"],
    titleKey: "nav1.tip.firstExpert.title",
    bodyKey: "nav1.tip.firstExpert.body",
  },
};

export function getTipBody(locale: Locale, id: TipID, context: TipContext) {
  const { bodyKey } = TIPS[id];
  return getMessage(
    locale,
    typeof bodyKey === "function" ? bodyKey(context) : bodyKey,
  );
}

// Units of Otto's own work that a cost in cents is quoted against.
const WORK_UNIT =
  "(?:image|photo|picture|run|message|reply|task|search|call|video|page|step|request|generation)s?";

// Otto's billing words in the sense the product uses them, not money in
// general: people talk tax credits, share prices and baggage allowances all
// day, and a tip spent on one of those is gone for the real moment.
const COST_PHRASES = [
  // The person's allowance, or the trial's or plan's: not a baggage one.
  /\byour\s+(?:(?:trial|plan|usage|remaining|daily|weekly|monthly)\s+)?allowance\b/i,
  /\b(?:trial|plan|usage)\s+allowance\b/i,
  // Credits as the balance: a count of them, ours by name, or what is left.
  /\b\d[\d.,]*\s*credits?\b(?!\s+cards?\b)/i,
  /\bautomation\s+credits?\b/i,
  /\byour\s+(?:remaining\s+|automation\s+)?credits\b/i,
  /\bcredits?\s+(?:left|remaining)\b/i,
  // Cents against a unit of Otto's work: "a few cents per image".
  new RegExp(
    `\\bcents?\\b[^.!?\\n]{0,25}\\b(?:per|each|every|for each|a|an)\\s+${WORK_UNIT}\\b`,
    "i",
  ),
  new RegExp(
    `\\b(?:per|each|every)\\s+${WORK_UNIT}\\b[^.!?\\n]{0,25}\\bcents?\\b`,
    "i",
  ),
];

export function mentionsCost(text: string) {
  return COST_PHRASES.some((phrase) => phrase.test(text));
}
