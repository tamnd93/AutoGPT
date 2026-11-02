import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import type { Translate } from "./helpers";

// What Otto might ask, by the role picked on the step before. Every question
// points at work the experts can take on (research, writing, outreach,
// follow-ups, reporting, scheduling, inbox and data chores), never at writing
// the user's code, driving their computer or making calls. Each line is
// written "Label: question" and split at the first colon.

interface BrainDumpQuestion {
  label: string;
  text: string;
}

interface BrainDumpPromptSet {
  questions: BrainDumpQuestion[];
  examples: string[];
}

export const PROMPT_SET_NAMES = [
  "Founder/CEO",
  "Operations",
  "Sales/BD",
  "Marketing",
  "Product/PM",
  "Engineering",
  "HR/People",
  "Other",
] as const;

export type PromptSetName = (typeof PROMPT_SET_NAMES)[number];

const SET_KEYS = {
  "Founder/CEO": {
    questions: [
      "onboarding2.prompts.founderCeo.q0",
      "onboarding2.prompts.founderCeo.q1",
      "onboarding2.prompts.founderCeo.q2",
      "onboarding2.prompts.founderCeo.q3",
      "onboarding2.prompts.founderCeo.q4",
      "onboarding2.prompts.founderCeo.q5",
      "onboarding2.prompts.founderCeo.q6",
      "onboarding2.prompts.founderCeo.q7",
    ],
    examples: [
      "onboarding2.prompts.founderCeo.ex0",
      "onboarding2.prompts.founderCeo.ex1",
      "onboarding2.prompts.founderCeo.ex2",
      "onboarding2.prompts.founderCeo.ex3",
      "onboarding2.prompts.founderCeo.ex4",
    ],
  },
  Operations: {
    questions: [
      "onboarding2.prompts.operations.q0",
      "onboarding2.prompts.operations.q1",
      "onboarding2.prompts.operations.q2",
      "onboarding2.prompts.operations.q3",
      "onboarding2.prompts.operations.q4",
      "onboarding2.prompts.operations.q5",
      "onboarding2.prompts.operations.q6",
      "onboarding2.prompts.operations.q7",
    ],
    examples: [
      "onboarding2.prompts.operations.ex0",
      "onboarding2.prompts.operations.ex1",
      "onboarding2.prompts.operations.ex2",
      "onboarding2.prompts.operations.ex3",
      "onboarding2.prompts.operations.ex4",
    ],
  },
  "Sales/BD": {
    questions: [
      "onboarding2.prompts.salesBd.q0",
      "onboarding2.prompts.salesBd.q1",
      "onboarding2.prompts.salesBd.q2",
      "onboarding2.prompts.salesBd.q3",
      "onboarding2.prompts.salesBd.q4",
      "onboarding2.prompts.salesBd.q5",
      "onboarding2.prompts.salesBd.q6",
      "onboarding2.prompts.salesBd.q7",
    ],
    examples: [
      "onboarding2.prompts.salesBd.ex0",
      "onboarding2.prompts.salesBd.ex1",
      "onboarding2.prompts.salesBd.ex2",
      "onboarding2.prompts.salesBd.ex3",
      "onboarding2.prompts.salesBd.ex4",
    ],
  },
  Marketing: {
    questions: [
      "onboarding2.prompts.marketing.q0",
      "onboarding2.prompts.marketing.q1",
      "onboarding2.prompts.marketing.q2",
      "onboarding2.prompts.marketing.q3",
      "onboarding2.prompts.marketing.q4",
      "onboarding2.prompts.marketing.q5",
      "onboarding2.prompts.marketing.q6",
      "onboarding2.prompts.marketing.q7",
    ],
    examples: [
      "onboarding2.prompts.marketing.ex0",
      "onboarding2.prompts.marketing.ex1",
      "onboarding2.prompts.marketing.ex2",
      "onboarding2.prompts.marketing.ex3",
      "onboarding2.prompts.marketing.ex4",
    ],
  },
  "Product/PM": {
    questions: [
      "onboarding2.prompts.productPm.q0",
      "onboarding2.prompts.productPm.q1",
      "onboarding2.prompts.productPm.q2",
      "onboarding2.prompts.productPm.q3",
      "onboarding2.prompts.productPm.q4",
      "onboarding2.prompts.productPm.q5",
      "onboarding2.prompts.productPm.q6",
      "onboarding2.prompts.productPm.q7",
    ],
    examples: [
      "onboarding2.prompts.productPm.ex0",
      "onboarding2.prompts.productPm.ex1",
      "onboarding2.prompts.productPm.ex2",
      "onboarding2.prompts.productPm.ex3",
      "onboarding2.prompts.productPm.ex4",
    ],
  },
  Engineering: {
    questions: [
      "onboarding2.prompts.engineering.q0",
      "onboarding2.prompts.engineering.q1",
      "onboarding2.prompts.engineering.q2",
      "onboarding2.prompts.engineering.q3",
      "onboarding2.prompts.engineering.q4",
      "onboarding2.prompts.engineering.q5",
      "onboarding2.prompts.engineering.q6",
      "onboarding2.prompts.engineering.q7",
    ],
    examples: [
      "onboarding2.prompts.engineering.ex0",
      "onboarding2.prompts.engineering.ex1",
      "onboarding2.prompts.engineering.ex2",
      "onboarding2.prompts.engineering.ex3",
      "onboarding2.prompts.engineering.ex4",
    ],
  },
  "HR/People": {
    questions: [
      "onboarding2.prompts.hrPeople.q0",
      "onboarding2.prompts.hrPeople.q1",
      "onboarding2.prompts.hrPeople.q2",
      "onboarding2.prompts.hrPeople.q3",
      "onboarding2.prompts.hrPeople.q4",
      "onboarding2.prompts.hrPeople.q5",
      "onboarding2.prompts.hrPeople.q6",
      "onboarding2.prompts.hrPeople.q7",
    ],
    examples: [
      "onboarding2.prompts.hrPeople.ex0",
      "onboarding2.prompts.hrPeople.ex1",
      "onboarding2.prompts.hrPeople.ex2",
      "onboarding2.prompts.hrPeople.ex3",
      "onboarding2.prompts.hrPeople.ex4",
    ],
  },
  Other: {
    questions: [
      "onboarding2.prompts.other.q0",
      "onboarding2.prompts.other.q1",
      "onboarding2.prompts.other.q2",
      "onboarding2.prompts.other.q3",
      "onboarding2.prompts.other.q4",
      "onboarding2.prompts.other.q5",
      "onboarding2.prompts.other.q6",
      "onboarding2.prompts.other.q7",
    ],
    examples: [
      "onboarding2.prompts.other.ex0",
      "onboarding2.prompts.other.ex1",
      "onboarding2.prompts.other.ex2",
      "onboarding2.prompts.other.ex3",
      "onboarding2.prompts.other.ex4",
    ],
  },
} as const;

const english: Translate = (key, values) => getMessage("en", key, values);

export function getBrainDumpPromptSet(
  name: PromptSetName,
  t: Translate,
): BrainDumpPromptSet {
  return translateSet(SET_KEYS[name], t);
}

// The English catalogue, kept for callers and tests that read the source
// strings directly; the screen renders getBrainDumpPromptSet(name, useT()).
export const BRAIN_DUMP_PROMPT_SETS: Record<PromptSetName, BrainDumpPromptSet> =
  Object.fromEntries(
    PROMPT_SET_NAMES.map((name) => [
      name,
      getBrainDumpPromptSet(name, english),
    ]),
  ) as Record<PromptSetName, BrainDumpPromptSet>;

export function promptSetNameForRole(role: string): PromptSetName {
  return PROMPT_SET_NAMES.find((name) => name === role) ?? "Other";
}

function translateSet(
  keys: {
    questions: readonly MessageKey[];
    examples: readonly MessageKey[];
  },
  t: Translate,
): BrainDumpPromptSet {
  return {
    questions: keys.questions.map((key) => toQuestion(t(key))),
    examples: keys.examples.map((key) => t(key)),
  };
}

function toQuestion(line: string): BrainDumpQuestion {
  const split = line.indexOf(": ");
  return { label: line.slice(0, split), text: line.slice(split + 2) };
}
