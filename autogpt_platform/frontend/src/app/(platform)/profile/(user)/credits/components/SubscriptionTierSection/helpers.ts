import type { Locale } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

function translate(
  locale: Locale | undefined,
  key: MessageKey,
  values?: Record<string, string | number>,
) {
  return getMessage(locale ?? "en", key, values);
}

export interface TierInfo {
  key: string;
  label: string;
  descriptionKey: MessageKey;
}

export const TIERS: TierInfo[] = [
  {
    key: "BASIC",
    label: "Basic",
    descriptionKey: "profile1.tier.desc.basic",
  },
  {
    key: "PRO",
    label: "Pro",
    descriptionKey: "profile1.tier.desc.pro",
  },
  {
    key: "MAX",
    label: "Max",
    descriptionKey: "profile1.tier.desc.max",
  },
  {
    key: "BUSINESS",
    label: "Business",
    descriptionKey: "profile1.tier.desc.business",
  },
];

export const TIER_ORDER = [
  "NO_TIER",
  "BASIC",
  "PRO",
  "MAX",
  "BUSINESS",
  "ENTERPRISE",
];

export function formatCost(
  cents: number,
  _tierKey: string,
  locale?: Locale,
): string {
  if (cents === 0) return translate(locale, "profile1.tier.free");
  return translate(locale, "profile1.tier.pricePerMonth", {
    price: `$${(cents / 100).toFixed(2)}`,
  });
}

export function getTierLabel(tierKey: string, locale?: Locale): string {
  if (tierKey === "NO_TIER")
    return translate(locale, "profile1.tier.noSubscription");
  return (
    TIERS.find((t) => t.key === tierKey)?.label ??
    tierKey.charAt(0) + tierKey.slice(1).toLowerCase()
  );
}

export function formatPendingDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  // Pin to en-US so SSR and CSR produce the same string — passing `undefined`
  // picks up the server's locale during prerender and the browser's locale on
  // hydration, which triggers a React hydration mismatch warning.
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Render a tier's rate-limit badge *relative* to the lowest visible tier so the
// UI doesn't have to hard-code the backend multiplier defaults.  Returns `null`
// for the lowest tier (it's the baseline — no badge) and for tiers absent from
// the payload (hidden, e.g. BUSINESS before its LD price is set).
export function formatRelativeMultiplier(
  tierKey: string,
  tierMultipliers: Record<string, number>,
  locale?: Locale,
): string | null {
  const mine = tierMultipliers[tierKey];
  if (mine === undefined || mine <= 0) return null;
  const visible = Object.values(tierMultipliers).filter((v) => v > 0);
  if (visible.length === 0) return null;
  const min = Math.min(...visible);
  const label = (mine / min).toFixed(1);
  // Post-rounding equality — floats that are mathematically equal but differ
  // in the last bits (e.g. 5.0 vs 5.0000000001) still collapse to the same
  // displayed ratio, so treat "1.0" as baseline regardless of raw values.
  if (label === "1.0") return null;
  return translate(locale, "profile1.tier.rateLimits", { multiplier: label });
}
