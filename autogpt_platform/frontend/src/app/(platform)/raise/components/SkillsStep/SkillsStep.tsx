"use client";

import { useT } from "@/lib/i18n";
import type { RaiseAttachmentDraft } from "../../helpers";
import { AttachmentStep } from "../KitStep/AttachmentStep";

interface Props {
  name: string;
  color: string | null;
  submitted: RaiseAttachmentDraft[] | null;
  existingCount: number;
  isSubmitting: boolean;
  onSubmit: (attachments: RaiseAttachmentDraft[]) => void;
  onSkip: () => void;
}

export function SkillsStep({
  name,
  color,
  submitted,
  existingCount,
  isSubmitting,
  onSubmit,
  onSkip,
}: Props) {
  const t = useT();
  return (
    <AttachmentStep
      color={color}
      submitted={submitted}
      isSubmitting={isSubmitting}
      scope="skills"
      existingCount={existingCount}
      searchLabel={t("team1.skills.searchLabel")}
      searchPlaceholder={t("team1.skills.searchPlaceholder")}
      emptyQueryHint={t("team1.skills.emptyQuery")}
      emptyResultsHint={t("team1.skills.emptyResults")}
      primaryLabel={t("team1.common.bringToLife", {
        name: name || t("team1.common.them"),
      })}
      onSubmit={onSubmit}
      onSkip={onSkip}
    />
  );
}
