"use client";

import { ProfileEntry } from "./ProfileEntry";
import { useT } from "@/lib/i18n";

interface Props {
  identity: string;
  voicePreferences: string | null;
  boundaries: string | null;
}

/** The expert's Soul: who it is, how it speaks and what it won't do. The
 *  header's "Edit Soul" button edits it. */
export function ExpertSoulSection({
  identity,
  voicePreferences,
  boundaries,
}: Props) {
  const t = useT();
  return (
    <dl className="space-y-4">
      <ProfileEntry label={t("team7.soul.identity")} value={identity} />
      <ProfileEntry label={t("team7.soul.voice")} value={voicePreferences} />
      <ProfileEntry
        label={t("team7.soul.boundaries")}
        value={boundaries}
      />
    </dl>
  );
}
