import { createIconComponent } from "@/components/atoms/Icon/Icon";
import type { SearchCommandBucket } from "@/components/organisms/SearchCommandModal/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import type { ComponentType } from "react";
import {
  BubbleChatIcon,
  CreditCardIcon,
  HammerIcon,
  Layers01Icon,
  Settings01Icon,
  Store01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

export const NAV_BUCKET_KEY = "navigation";
export const NAV_BUCKET_LABEL = getMessage(
  DEFAULT_LOCALE,
  "nav1.search.navigate",
);

// Idle (empty query) only previews a few destinations; typing reveals
// the full filtered set.
const IDLE_NAV_LIMIT = 4;

interface NavTarget {
  id: string;
  titleKey: MessageKey;
  href: string;
  // Extra terms that should match this target beyond its title (e.g.
  // "agents" routing to the library page). Kept in English in every locale:
  // they are hidden search keywords, not copy.
  keywords: string[];
  icon: ComponentType<{ className?: string }>;
}

// Namespaced ids so they never collide with API result ids in the
// shared ``itemsById`` map / keyboard-nav flattening.
const NAV_TARGETS: NavTarget[] = [
  {
    id: "nav:builder",
    titleKey: "nav1.search.target.builder",
    href: "/build",
    keywords: ["build", "editor", "graph", "workflow", "create"],
    icon: createIconComponent(HammerIcon),
  },
  {
    id: "nav:library",
    titleKey: "nav1.search.target.library",
    href: "/library",
    keywords: ["agents", "my agents", "workflows", "my workflows"],
    icon: createIconComponent(Layers01Icon),
  },
  {
    id: "nav:marketplace",
    titleKey: "nav.marketplace",
    href: "/marketplace",
    keywords: ["store", "explore", "templates"],
    icon: createIconComponent(Store01Icon),
  },
  {
    id: "nav:chat",
    titleKey: "nav1.search.target.chat",
    href: "/copilot",
    keywords: ["copilot", "home", "assistant"],
    icon: createIconComponent(BubbleChatIcon),
  },
  {
    id: "nav:settings",
    titleKey: "nav1.search.target.settings",
    href: "/settings",
    keywords: ["preferences", "account"],
    icon: createIconComponent(Settings01Icon),
  },
  {
    id: "nav:billing",
    titleKey: "nav1.search.target.billing",
    href: "/settings/billing",
    keywords: ["credits", "payment", "wallet", "subscription"],
    icon: createIconComponent(CreditCardIcon),
  },
  {
    id: "nav:profile",
    titleKey: "nav1.search.target.profile",
    href: "/settings/profile",
    keywords: ["account", "me"],
    icon: createIconComponent(UserIcon),
  },
];

const HREF_BY_ID = new Map(
  NAV_TARGETS.map((target) => [target.id, target.href]),
);

export function getNavigationHref(id: string): string | undefined {
  return HREF_BY_ID.get(id);
}

function titlesOf(target: NavTarget, locale: Locale) {
  const title = getMessage(locale, target.titleKey);
  const englishTitle = getMessage(DEFAULT_LOCALE, target.titleKey);
  return title === englishTitle ? [title] : [englishTitle, title];
}

function isExactTitleMatch(
  target: NavTarget,
  query: string,
  locale: Locale,
): boolean {
  return titlesOf(target, locale).some(
    (title) => title.toLocaleLowerCase() === query,
  );
}

// True when ``currentPath`` is the target itself or any page nested under
// it (e.g. ``/settings/billing`` is "on" ``/settings``). The trailing
// slash keeps unrelated routes that merely share a prefix (``/settings-x``)
// from matching.
function isCurrentDestination(
  target: NavTarget,
  currentPath: string | null,
): boolean {
  if (!currentPath) return false;
  return (
    currentPath === target.href || currentPath.startsWith(`${target.href}/`)
  );
}

function matchesQuery(
  target: NavTarget,
  query: string,
  locale: Locale,
): boolean {
  if (
    titlesOf(target, locale).some((title) =>
      title.toLocaleLowerCase().includes(query),
    )
  )
    return true;
  return target.keywords.some((keyword) =>
    keyword.toLocaleLowerCase().includes(query),
  );
}

/**
 * Build the static "Navigate" bucket filtered by ``query``. The
 * destination matching ``currentPath`` is dropped — there's no point
 * navigating to the page you're already on. An empty query previews a
 * few destinations alongside the idle recent-items list; typing reveals
 * the full filtered set. ``isExactMatch`` lets the caller hoist
 * navigation above the search results when the user typed a destination
 * name verbatim (e.g. "Builder").
 */
export function buildNavigationBucket(
  query: string,
  currentPath: string | null,
  isBillingEnabled = true,
  locale: Locale = DEFAULT_LOCALE,
): {
  bucket: SearchCommandBucket | null;
  isExactMatch: boolean;
} {
  const normalized = query.trim().toLocaleLowerCase();

  const available = NAV_TARGETS.filter(
    (target) =>
      !isCurrentDestination(target, currentPath) &&
      (isBillingEnabled || target.id !== "nav:billing"),
  );
  const matches = normalized
    ? available.filter((target) => matchesQuery(target, normalized, locale))
    : available.slice(0, IDLE_NAV_LIMIT);
  if (matches.length === 0) return { bucket: null, isExactMatch: false };

  const isExactMatch = normalized
    ? matches.some((target) => isExactTitleMatch(target, normalized, locale))
    : false;

  const bucket: SearchCommandBucket = {
    key: NAV_BUCKET_KEY,
    label: getMessage(locale, "nav1.search.navigate"),
    items: matches.map((target) => ({
      id: target.id,
      title: getMessage(locale, target.titleKey),
      icon: target.icon,
    })),
  };

  return { bucket, isExactMatch };
}
