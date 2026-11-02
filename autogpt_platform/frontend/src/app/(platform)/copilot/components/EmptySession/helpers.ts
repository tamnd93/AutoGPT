import type { User } from "@/lib/auth/types";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage, type MessageValues } from "@/lib/i18n/translate";
import { getExpertRoleLabel as getExpertDisplayRoleLabel } from "@/services/experts/expert-role-label";

export type Translate = (key: MessageKey, values?: MessageValues) => string;

// The panels pass useT(); a call without one reads English, as the unit tests do.
const english: Translate = (key, values) => getMessage("en", key, values);

// A role is free text, and the hire flow's own presets come in both shapes:
// some name a person ("Marketer", "Analyst"), others just a domain ("Sales",
// "Support", "Operations"). "I'm Max, your Sales." reads as an unfinished
// sentence, so a domain gets "expert" appended while a role that already
// names a person is used as it was written.
const PERSON_NOUN_SUFFIXES = ["er", "or", "ist", "yst", "ant", "ian"];
// Person-nouns that none of the suffixes catch.
const PERSON_NOUNS = new Set([
  "agent",
  "assistant",
  "chef",
  "chief",
  "expert",
  "head",
  "lead",
  "pro",
  "rep",
  "specialist",
]);

function namesAPerson(role: string) {
  // Only the last word decides: "Customer Success" is a domain even though
  // "Customer" would pass the suffix test on its own.
  const head = role.split(/\s+/).pop()?.toLowerCase() ?? "";
  if (PERSON_NOUNS.has(head)) return true;
  return PERSON_NOUN_SUFFIXES.some((suffix) => head.endsWith(suffix));
}

export function getExpertRoleLabel(role: string) {
  const displayRole = getExpertDisplayRoleLabel(role);
  return namesAPerson(displayRole) ? displayRole : `${displayRole} expert`;
}

export function getIntroLine(
  expert: { name: string; role: string | null } | null,
  t: Translate = english,
) {
  if (!expert) return t("home1.intro.otto");
  return t("home1.intro.expert", {
    name: expert.name,
    suffix: getExpertIntroSuffix(expert.role, t),
  });
}

export function getExpertIntroSuffix(
  role: string | null,
  t: Translate = english,
) {
  const trimmedRole = role?.trim();
  return trimmedRole
    ? t("home1.intro.withRole", { role: getExpertRoleLabel(trimmedRole) })
    : t("home1.intro.noRole");
}

export function getExpertInputPlaceholder(
  expertName: string,
  t: Translate = english,
) {
  return t("home1.placeholder.expert", { name: expertName });
}

export function getInputPlaceholder(width?: number, t: Translate = english) {
  if (!width) return t("home1.placeholder.discovery");

  if (width < 500) {
    return t("home1.placeholder.discoveryShort");
  }
  if (width <= 1080) {
    return t("home1.placeholder.discovery");
  }
  return t("home1.placeholder.discoveryLong");
}

export function getGreetingName(user?: User | null): string | null {
  if (!user) return null;
  const metadata = user.user_metadata as Record<string, unknown> | undefined;
  // preferred_name is the name the user set with the hero's edit-name button —
  // it wins over provider-supplied names, and is used verbatim.
  const preferredName = metadata?.preferred_name;
  if (typeof preferredName === "string" && preferredName.trim()) {
    return preferredName.trim();
  }
  // Email sign-up stores the address's local part as the name; that one was never given.
  const emailName = user.email?.split("@")[0].toLowerCase();
  const givenName = [metadata?.full_name, metadata?.name]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .find((value) => value && value.toLowerCase() !== emailName);
  return givenName ? givenName.split(/\s+/)[0] : null;
}
