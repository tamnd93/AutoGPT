import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { ProfileEntry } from "../../[expertId]/components/ProfileEntry";

interface AboutEntry {
  labelKey: MessageKey;
  valueKey: MessageKey;
}

const ENTRIES: AboutEntry[] = [
  { labelKey: "team8.about.bio", valueKey: "team8.autopilot.blurb" },
  { labelKey: "team8.about.identity", valueKey: "team8.about.identityValue" },
  { labelKey: "team8.about.worksWith", valueKey: "team8.about.worksWithValue" },
  {
    labelKey: "team8.about.boundaries",
    valueKey: "team8.about.boundariesValue",
  },
];

export function AutopilotAboutSection() {
  const t = useT();
  return (
    <section className="space-y-5">
      <dl className="space-y-4">
        {ENTRIES.map((entry) => (
          <ProfileEntry
            key={entry.labelKey}
            label={t(entry.labelKey)}
            value={t(entry.valueKey)}
          />
        ))}
      </dl>
    </section>
  );
}
