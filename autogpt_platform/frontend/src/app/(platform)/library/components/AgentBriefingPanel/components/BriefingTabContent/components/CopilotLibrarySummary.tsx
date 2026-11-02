"use client";

import { useListCopilotSkills } from "@/app/api/__generated__/endpoints/skills/skills";
import { useListCopilotFollowupSchedules } from "@/app/api/__generated__/endpoints/schedules/schedules";
import { Text } from "@/components/atoms/Text/Text";
import Link from "next/link";
import { useT } from "@/lib/i18n";

export function CopilotLibrarySummary() {
  const t = useT();
  const { data: skillsRes } = useListCopilotSkills(undefined, {
    query: { staleTime: 30_000 },
  });
  const { data: followupsRes } = useListCopilotFollowupSchedules({
    query: { staleTime: 30_000 },
  });

  const skillsCount =
    skillsRes && skillsRes.status === 200 ? skillsRes.data.length : 0;
  // Count only copilot follow-ups here — graph schedules (recurring
  // agent runs) are already surfaced by the briefing's own "Scheduled"
  // tab above, so folding them into this pill would double-count and
  // confuse the "Skills and follow-ups" framing.  The pill's link still
  // goes to the unified `/library/followups` page, where both kinds
  // are listed together.
  const followupCount =
    followupsRes && followupsRes.status === 200 ? followupsRes.data.length : 0;

  // Suppress the pill entirely when the user has no autopilot library
  // content yet — surfacing "0 skills · 0 follow-ups" is noise, not a
  // discovery affordance.  The pill reappears the moment either count
  // turns positive (e.g. after a store_skill / schedule_followup tool
  // call).
  if (skillsCount === 0 && followupCount === 0) return null;

  // Per-link hide: surface only the counts that are non-zero.  We
  // already returned ``null`` above when both are zero, so at least
  // one branch always renders.
  const showSkills = skillsCount > 0;
  const showFollowups = followupCount > 0;

  return (
    <div
      className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-separator pt-3"
      data-testid="copilot-library-summary"
    >
      <Text variant="small" className="!text-foreground-tertiary">
        {t("library4.summary.title")}
      </Text>
      {showSkills ? (
        <Link
          href="/library/skills"
          className="text-sm text-accent-strong hover:underline"
          data-testid="copilot-library-skills-link"
        >
          {skillsCount === 1
            ? t("library4.summary.skillOne")
            : t("library4.summary.skills", { count: skillsCount })}
        </Link>
      ) : null}
      {showSkills && showFollowups ? (
        <span className="text-foreground-disabled">•</span>
      ) : null}
      {showFollowups ? (
        <Link
          href="/library/followups"
          // TODO(tokens): no exact role for text-yellow-700 (#AE8800)
          className="text-sm text-yellow-700 hover:underline"
          data-testid="copilot-library-followups-link"
        >
          {followupCount === 1
            ? t("library4.summary.followupOne")
            : t("library4.summary.followups", {
                count: followupCount,
              })}
        </Link>
      ) : null}
    </div>
  );
}
