import type { HomeAttentionItem } from "@/app/api/__generated__/models/homeAttentionItem";
import {
  type ApprovalItem,
  isBare,
  isGateReview,
  isHeldRead,
} from "@/app/(platform)/copilot/components/ApprovalQueue/helpers";
import { AUTOPILOT_NAME } from "@/components/molecules/AutopilotAvatar/helpers";
import type { Locale } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage, type MessageValues } from "@/lib/i18n/translate";
import type { AttentionListRow } from "./useHeldReview";

function translate(
  locale: Locale | undefined,
  key: MessageKey,
  values?: MessageValues,
) {
  return getMessage(locale ?? "en", key, values);
}

// A passage this short is shown whole on the row, so it can be released from there.
export const PASSAGE_FITS = 180;

// A held AutoPilot call the gate wrote a headline for; older rows keep the generic row.
export function isHeldCall(item: HomeAttentionItem) {
  return (
    item.kind === "approval" &&
    !!item.review &&
    isGateReview(item.review) &&
    !!item.headline
  );
}

// The row shows everything the card would, so it may be approved without opening it.
export function isInformed(item: ApprovalItem) {
  if (item.spend || item.subject.irreversible) return false;
  if (isHeldRead(item))
    return item.unjudged || (item.passage ?? "").length <= PASSAGE_FITS;
  return isBare(item);
}

export function receiptText(
  item: ApprovalItem,
  approved: boolean,
  locale?: Locale,
) {
  if (isHeldRead(item))
    return approved
      ? translate(locale, "home2.receipt.released", { reader: item.reader })
      : translate(locale, "home2.receipt.keptOut", { reader: item.reader });
  return approved
    ? translate(locale, "home2.receipt.approved", { name: AUTOPILOT_NAME })
    : translate(locale, "home2.receipt.rejected", { name: AUTOPILOT_NAME });
}

/** The tally's own wording for the same outcome, so the count never parses it. */
export function receiptLabelKey(
  item: ApprovalItem,
  approved: boolean,
): MessageKey {
  if (isHeldRead(item))
    return approved
      ? "home2.receipt.tallyReleased"
      : "home2.receipt.tallyKeptOut";
  return approved
    ? "home2.receipt.tallyApproved"
    : "home2.receipt.tallyRejected";
}

// "3h", "40m": narrow enough for a column of twenty rows.
export function shortAge(createdAt: Date | string, now = new Date()) {
  const minutes = Math.max(
    1,
    Math.floor((now.getTime() - new Date(createdAt).getTime()) / 60_000),
  );
  const [value, unit] =
    minutes < 60
      ? [minutes, "minute"]
      : minutes < 24 * 60
        ? [Math.floor(minutes / 60), "hour"]
        : [Math.floor(minutes / (24 * 60)), "day"];
  return new Intl.NumberFormat(undefined, {
    style: "unit",
    unit,
    unitDisplay: "narrow",
  }).format(value);
}

export function headlineButtonId(itemID: string) {
  return `held-${itemID.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

// "4 released · 1 kept out · 1 answered elsewhere". A receipt carries its own
// label key; the chat's receipts have none yet, so their text is parsed instead.
export function reviewTally(rows: AttentionListRow[], locale?: Locale) {
  const counts = new Map<string, number>();
  for (const { receipt } of rows) {
    if (!receipt) continue;
    const label = receipt.labelKey
      ? translate(locale, receipt.labelKey)
      : receipt.text.split(" · ")[0].toLowerCase();
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts]
    .map(([label, count]) =>
      translate(locale, "home2.receipt.tally", { count, label }),
    )
    .join(" · ");
}
