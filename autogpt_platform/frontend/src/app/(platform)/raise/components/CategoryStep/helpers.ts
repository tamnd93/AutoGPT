import { ExpertAvatarRequestCategory } from "@/app/api/__generated__/models/expertAvatarRequestCategory";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { EXPERT_PALETTE } from "@/components/molecules/ExpertAvatar/helpers";

interface CategoryDetails {
  labelKey: MessageKey;
  color: string;
  // Saved as the expert's role, so the intro reads "I'm Curie, your Researcher".
  role: string;
  // Seeds the name step, so suggestions fit the area the expert works in.
  nameSuggestions: string[];
  jobTitleSuggestions: string[];
}

const CATEGORY_DETAILS: Record<ExpertAvatarRequestCategory, CategoryDetails> = {
  general: {
    labelKey: "team1.category.general",
    color: "amber-300",
    role: "Assistant",
    nameSuggestions: ["Otto", "Nova", "Juno"],
    jobTitleSuggestions: ["Executive Assistant", "Personal Assistant"],
  },
  marketing: {
    color: "orange-300",
    labelKey: "team1.category.marketing",
    role: "Marketer",
    nameSuggestions: ["Echo", "Reach", "Nova"],
    jobTitleSuggestions: [
      "Marketing Manager",
      "Growth Marketer",
      "Content Marketer",
    ],
  },
  sales: {
    color: "amber-300",
    labelKey: "team1.category.sales",
    role: "Sales",
    nameSuggestions: ["Pitch", "Ace", "Rain"],
    jobTitleSuggestions: [
      "Sales Development Rep",
      "Account Executive",
      "Sales Manager",
    ],
  },
  finance: {
    color: "green-300",
    labelKey: "team1.category.finance",
    role: "Analyst",
    nameSuggestions: ["Tally", "Vector", "Sigma"],
    jobTitleSuggestions: [
      "Financial Analyst",
      "Data Analyst",
      "Business Analyst",
    ],
  },
  support: {
    color: "rose-300",
    labelKey: "team1.category.support",
    role: "Support",
    nameSuggestions: ["Remy", "Aide", "Piper"],
    jobTitleSuggestions: [
      "Support Specialist",
      "Customer Success Manager",
      "Support Engineer",
    ],
  },
  operations: {
    color: "sky-300",
    labelKey: "team1.category.operations",
    role: "Operations",
    nameSuggestions: ["Cadence", "Clockwork", "Scout"],
    jobTitleSuggestions: [
      "Operations Manager",
      "Executive Assistant",
      "Recruiter",
    ],
  },
  research: {
    color: "lime-300",
    labelKey: "team1.category.research",
    role: "Researcher",
    nameSuggestions: ["Kepler", "Curie", "Juno"],
    jobTitleSuggestions: [
      "Research Analyst",
      "Market Researcher",
      "UX Researcher",
    ],
  },
  content: {
    color: "amber-300",
    labelKey: "team1.category.content",
    role: "Writer",
    nameSuggestions: ["Quill", "Hemingway", "Ink"],
    jobTitleSuggestions: ["Content Writer", "Copywriter", "Technical Writer"],
  },
  development: {
    color: "blue-300",
    labelKey: "team1.category.development",
    role: "Developer",
    nameSuggestions: ["Ada", "Turing", "Bit"],
    jobTitleSuggestions: [
      "Software Engineer",
      "Full-Stack Developer",
      "DevOps Engineer",
    ],
  },
};

// The role ids a `/raise?role=` link can carry; keep in step with the
// backend's RAISE_ROLES in onboarding_dump/recommend_experts.py.
const ROLE_CATEGORIES = new Map<string, ExpertAvatarRequestCategory>([
  ["marketer", "marketing"],
  ["sales", "sales"],
  ["developer", "development"],
  ["researcher", "research"],
  ["writer", "content"],
  ["analyst", "finance"],
  ["recruiter", "operations"],
  ["support", "support"],
  ["operations", "operations"],
]);

const FALLBACK_NAMES = ["Otto", "Nova", "Juno"];

export interface CategoryOption {
  id: ExpertAvatarRequestCategory;
  labelKey: MessageKey;
  hex: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = Object.values(
  ExpertAvatarRequestCategory,
)
  .filter((id) => id !== "general")
  .map((id) => ({
    id,
    labelKey: CATEGORY_DETAILS[id].labelKey,
    hex: EXPERT_PALETTE[id].hex,
  }));

export function categoryOptionsForSelection(
  selected: ExpertAvatarRequestCategory | null,
) {
  if (!selected) return CATEGORY_OPTIONS;
  return CATEGORY_OPTIONS.filter((option) => option.id === selected);
}

/** The wizard color a category answers for, used from the first beat onwards. */
export function colorForCategory(category: ExpertAvatarRequestCategory) {
  return CATEGORY_DETAILS[category].color;
}

export function categoryForRole(role: string) {
  return ROLE_CATEGORIES.get(role) ?? null;
}

export function roleFor(category: ExpertAvatarRequestCategory | null) {
  return category ? CATEGORY_DETAILS[category].role : null;
}

export function nameSuggestionsFor(
  category: ExpertAvatarRequestCategory | null,
) {
  return category ? CATEGORY_DETAILS[category].nameSuggestions : FALLBACK_NAMES;
}

export function jobTitleSuggestionsFor(
  category: ExpertAvatarRequestCategory | null,
) {
  return category ? CATEGORY_DETAILS[category].jobTitleSuggestions : [];
}
