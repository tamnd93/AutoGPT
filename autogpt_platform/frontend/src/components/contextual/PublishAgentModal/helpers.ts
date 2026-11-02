import { SubmissionStatus } from "@/app/api/__generated__/models/submissionStatus";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export const emptyModalState = {
  agent_id: "",
  title: "",
  subheader: "",
  slug: "",
  thumbnailSrc: "",
  youtubeLink: "",
  category: "",
  description: "",
  recommendedScheduleCron: "",
  instructions: "",
  agentOutputDemo: "",
  changesSummary: "",
  additionalImages: [],
};

export interface SubmissionMetaItem {
  label: string;
  value: string;
  title?: string;
}

export function formatSubmissionDate(
  value: string | Date | null | undefined,
): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const DAY_MS = 86_400_000;

export function formatRelativeDate(
  value: string | Date | null | undefined,
  locale: Locale = DEFAULT_LOCALE,
): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const say = (key: string, values?: Record<string, string | number>) =>
    getMessage(locale, key, values);
  const days = Math.floor((Date.now() - date.getTime()) / DAY_MS);
  if (days <= 0) return say("marketplace4.meta.today");
  if (days === 1) return say("marketplace4.meta.yesterday");
  if (days < 7) return say("marketplace4.meta.daysAgo", { count: days });
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1
      ? say("marketplace4.meta.weekAgo")
      : say("marketplace4.meta.weeksAgo", { count: weeks });
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return months === 1
      ? say("marketplace4.meta.monthAgo")
      : say("marketplace4.meta.monthsAgo", { count: months });
  }
  const years = Math.floor(days / 365);
  return years === 1
    ? say("marketplace4.meta.yearAgo")
    : say("marketplace4.meta.yearsAgo", { count: years });
}

function dateItem(
  label: string,
  value: string | Date | null | undefined,
  locale: Locale = DEFAULT_LOCALE,
): SubmissionMetaItem | null {
  const relative = formatRelativeDate(value, locale);
  if (!relative) return null;
  return {
    label,
    value: relative,
    title: formatSubmissionDate(value) ?? undefined,
  };
}

interface SubmissionMetaArgs {
  status: SubmissionStatus | undefined;
  version: number | undefined;
  category: string | null | undefined;
  submittedAt: string | Date | null | undefined;
  reviewedAt: string | Date | null | undefined;
  runCount: number | undefined;
}

export function getSubmissionMeta(
  {
    status,
    version,
    category,
    submittedAt,
    reviewedAt,
    runCount,
  }: SubmissionMetaArgs,
  locale: Locale = DEFAULT_LOCALE,
): SubmissionMetaItem[] {
  const say = (key: string) => getMessage(locale, key);
  const items: SubmissionMetaItem[] = [];

  if (typeof version === "number") {
    items.push({
      label: say("marketplace4.meta.version"),
      value: `v${version}`,
    });
  }
  if (category) {
    items.push({ label: say("marketplace4.meta.category"), value: category });
  }

  if (status === SubmissionStatus.APPROVED) {
    const liveSince = dateItem(
      say("marketplace4.meta.liveSince"),
      reviewedAt,
      locale,
    );
    if (liveSince) items.push(liveSince);
    if (typeof runCount === "number") {
      items.push({
        label: say("marketplace4.meta.runs"),
        value: runCount.toLocaleString(),
      });
    }
  } else if (status === SubmissionStatus.REJECTED) {
    const reviewed = dateItem(
      say("marketplace4.meta.reviewed"),
      reviewedAt,
      locale,
    );
    if (reviewed) items.push(reviewed);
  } else if (status === SubmissionStatus.DRAFT) {
    items.push({
      label: say("marketplace4.meta.status"),
      value: say("marketplace4.meta.notSubmitted"),
    });
  } else {
    const submitted = dateItem(
      say("marketplace4.meta.submitted"),
      submittedAt,
      locale,
    );
    if (submitted) items.push(submitted);
  }

  return items;
}
