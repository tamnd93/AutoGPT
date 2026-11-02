import { createIconComponent } from "@/components/atoms/Icon/Icon";
import type { SearchCommandBucket } from "@/components/organisms/SearchCommandModal/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import type { ComponentType } from "react";
import { Copy01Icon } from "@hugeicons/core-free-icons";

export const ACTIONS_BUCKET_KEY = "actions";
export const ACTIONS_BUCKET_LABEL = getMessage(
  DEFAULT_LOCALE,
  "nav1.search.actions",
);

export const COPY_USER_ID_ACTION = "action:copy-user-id";

interface ActionTarget {
  id: string;
  titleKey: MessageKey;
  // Extra terms that match this action beyond its title. Kept in English in
  // every locale: they are hidden search keywords, not copy.
  keywords: string[];
  icon: ComponentType<{ className?: string }>;
}

// Namespaced ids so they never collide with API result / navigation ids
// in the shared keyboard-nav flattening.
const ACTION_TARGETS: ActionTarget[] = [
  {
    id: COPY_USER_ID_ACTION,
    titleKey: "nav1.search.copyUserId",
    keywords: ["copy", "user", "id", "uid", "account"],
    icon: createIconComponent(Copy01Icon),
  },
];

function titlesOf(target: ActionTarget, locale: Locale) {
  const title = getMessage(locale, target.titleKey);
  const englishTitle = getMessage(DEFAULT_LOCALE, target.titleKey);
  return title === englishTitle ? [title] : [englishTitle, title];
}

function matchesQuery(
  target: ActionTarget,
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

function isExactTitleMatch(
  target: ActionTarget,
  query: string,
  locale: Locale,
): boolean {
  return titlesOf(target, locale).some(
    (title) => title.toLocaleLowerCase() === query,
  );
}

/**
 * Build the static "Actions" bucket filtered by ``query``. Actions run a
 * side effect (e.g. copy to clipboard) rather than navigate. An empty
 * query lists every action so they stay available on the idle list.
 * ``isExactMatch`` lets the caller hoist actions above the search
 * results when the user typed an action name verbatim.
 */
export function buildActionsBucket(
  query: string,
  locale: Locale = DEFAULT_LOCALE,
): {
  bucket: SearchCommandBucket | null;
  isExactMatch: boolean;
} {
  const normalized = query.trim().toLocaleLowerCase();

  const matches = normalized
    ? ACTION_TARGETS.filter((target) =>
        matchesQuery(target, normalized, locale),
      )
    : ACTION_TARGETS;
  if (matches.length === 0) return { bucket: null, isExactMatch: false };

  const isExactMatch = normalized
    ? matches.some((target) => isExactTitleMatch(target, normalized, locale))
    : false;

  const bucket: SearchCommandBucket = {
    key: ACTIONS_BUCKET_KEY,
    label: getMessage(locale, "nav1.search.actions"),
    items: matches.map((target) => ({
      id: target.id,
      title: getMessage(locale, target.titleKey),
      icon: target.icon,
    })),
  };

  return { bucket, isExactMatch };
}
