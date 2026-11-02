"use client";

import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { SubmissionStatus } from "@/app/api/__generated__/models/submissionStatus";
import { useLocale, useT } from "@/lib/i18n";
import { getSubmissionMeta } from "../helpers";
import {
  Cancel01Icon,
  NoteEditIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

interface HeroContent {
  title: string;
  description: string;
  Icon: IconSvgElement;
  pulse: string;
  gradient: string;
}

function getHeroContent(
  status: SubmissionStatus | undefined,
  isDashboardPage: boolean,
  t: ReturnType<typeof useT>,
): HeroContent {
  switch (status) {
    case SubmissionStatus.APPROVED:
      return {
        title: t("marketplace4.hero.approvedTitle"),
        description: t("marketplace4.hero.approvedBody"),
        Icon: Tick02Icon,
        pulse: "bg-emerald-400/40",
        gradient: "from-emerald-400 to-emerald-600",
      };
    case SubmissionStatus.REJECTED:
      return {
        title: t("marketplace4.hero.rejectedTitle"),
        description: t("marketplace4.hero.rejectedBody"),
        Icon: Cancel01Icon,
        pulse: "bg-rose-400/40",
        gradient: "from-rose-400 to-rose-600",
      };
    case SubmissionStatus.DRAFT:
      return {
        title: t("marketplace4.hero.draftTitle"),
        description: t("marketplace4.hero.draftBody"),
        Icon: NoteEditIcon,
        pulse: "bg-zinc-400/40",
        gradient: "from-zinc-400 to-zinc-600",
      };
    default:
      return {
        title: t("marketplace4.hero.pendingTitle"),
        description: isDashboardPage
          ? t("marketplace4.hero.pendingBodyDashboard")
          : t("marketplace4.hero.pendingBody"),
        Icon: Tick02Icon,
        pulse: "bg-purple-400/40",
        gradient: "from-purple-400 to-purple-600",
      };
  }
}

interface Args {
  status: SubmissionStatus | undefined;
  version: number | undefined;
  category: string | null | undefined;
  submittedAt: string | Date | null | undefined;
  reviewedAt: string | Date | null | undefined;
  runCount: number | undefined;
}

export function useAgentReviewStep({
  status,
  version,
  category,
  submittedAt,
  reviewedAt,
  runCount,
}: Args) {
  const pathname = usePathname();
  const t = useT();
  const locale = useLocale();
  const isDashboardPage = pathname.includes("/settings/creator-dashboard");
  const hero = getHeroContent(status, isDashboardPage, t);
  const shouldReduceMotion = useReducedMotion();

  const isApproved = status === SubmissionStatus.APPROVED;
  const isRejected = status === SubmissionStatus.REJECTED;
  const isDraft = status === SubmissionStatus.DRAFT;
  const isPending = !isApproved && !isRejected && !isDraft;

  const showCelebration = isApproved || (isPending && !isDashboardPage);
  const showConfetti = showCelebration && !shouldReduceMotion;

  const metaItems = getSubmissionMeta(
    {
      status,
      version,
      category,
      submittedAt,
      reviewedAt,
      runCount,
    },
    locale,
  );

  return {
    isDashboardPage,
    hero,
    shouldReduceMotion,
    isApproved,
    isRejected,
    isDraft,
    isPending,
    showCelebration,
    showConfetti,
    metaItems,
  };
}
