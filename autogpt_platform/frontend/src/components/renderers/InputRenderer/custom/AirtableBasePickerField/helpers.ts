import { ApiError } from "@/lib/autogpt-server-api/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export const AIRTABLE_PICKER_FORMAT = "airtable-base-picker";
export const AIRTABLE_HOME_URL = "https://airtable.com/";

// The search box appears once the list is too long to scan.
export const SEARCH_THRESHOLD = 8;

// The copilot fills in the account the run will use; without one (the builder)
// there is nothing to list, so the field stays a plain text input.
export function pickerCredentialsID(schema: unknown): string | null {
  if (!isRecord(schema) || schema.format !== AIRTABLE_PICKER_FORMAT) {
    return null;
  }
  const picker = schema.resource_picker;
  if (!isRecord(picker)) return null;
  const id = picker.credentials_id;
  return typeof id === "string" && id ? id : null;
}

export type BaseAccess = "read" | "edit" | "create";

const ACCESS_RANK: Record<BaseAccess, number> = { read: 0, edit: 1, create: 2 };

// The least a base must allow for the step: Airtable lets only a base's
// creators change its tables, editors write records, and anyone read.
export function pickerAccess(schema: unknown): BaseAccess {
  if (!isRecord(schema) || !isRecord(schema.resource_picker)) return "create";
  const access = schema.resource_picker.access;
  return access === "read" || access === "edit" ? access : "create";
}

export function allows(access: BaseAccess, needed: BaseAccess): boolean {
  return ACCESS_RANK[access] >= ACCESS_RANK[needed];
}

// Why a base is listed but can't be picked for this step.
export function lockedReason(
  access: BaseAccess,
  needed: BaseAccess,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (access === "read") return getMessage(locale, "shared7.airtable.lockedViewOnly");
  return needed === "create"
    ? getMessage(locale, "shared7.airtable.lockedNeedsCreator")
    : getMessage(locale, "shared7.airtable.lockedViewOnly");
}

// What the step will do to the base, and only that: a table change is shown
// on a card first, a record change (adding, updating or deleting) is not, and
// a read changes nothing.
export function pickerHint(
  needed: BaseAccess,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (needed === "read") return getMessage(locale, "shared7.airtable.hintRead");
  if (needed === "edit") return getMessage(locale, "shared7.airtable.hintEdit");
  return getMessage(locale, "shared7.airtable.hintCreate");
}

// What to do when no base allows the step.
export function noUsableBaseText(
  needed: BaseAccess,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return needed === "create"
    ? getMessage(locale, "shared7.airtable.noUsableCreator")
    : getMessage(locale, "shared7.airtable.noUsableViewOnly");
}

export function isAirtableBasePickerSchema(schema: unknown): boolean {
  return pickerCredentialsID(schema) !== null;
}

// The server words these for the user: reconnect, busy, or try again.
const WORDED_STATUSES = new Set([409, 502, 503]);

export function loadErrorText(
  error: unknown,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (error instanceof ApiError && WORDED_STATUSES.has(error.status)) {
    return error.message;
  }
  return getMessage(locale, "shared7.airtable.loadFailed");
}

export function matchesSearch(name: string, search: string): boolean {
  return name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
