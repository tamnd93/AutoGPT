import { AutopilotAvatar } from "@/components/molecules/AutopilotAvatar/AutopilotAvatar";
import { ExpertAvatar } from "@/components/molecules/ExpertAvatar/ExpertAvatar";
import { useLocale, useT } from "@/lib/i18n";
import { OTTO_TINT } from "./ottoTint";
import { formatReadyLine, MAX_NAMED_EXPERTS } from "./TrialWelcome/helpers";
import type { ReadyExpert } from "./useReadyExperts";

const AVATAR_SIZE = 24;

interface Props {
  experts: ReadyExpert[];
}

// The welcome comes before the billing: the user's own setup, by name.
export function ReadyLine({ experts }: Props) {
  const t = useT();
  const locale = useLocale();

  return (
    <p
      style={{ backgroundColor: OTTO_TINT }}
      className="inline-flex max-w-full items-center gap-2 rounded-2xl py-1 pl-1 pr-3 font-sans text-caption font-medium text-foreground-emphasis sm:rounded-full"
    >
      <span aria-hidden className="flex shrink-0 -space-x-1">
        <AutopilotAvatar size={AVATAR_SIZE} className="rounded-full" />
        {experts.slice(0, MAX_NAMED_EXPERTS).map((expert) => (
          <span
            key={expert.id}
            className="rounded-full"
            style={{ boxShadow: `0 0 0 2px ${OTTO_TINT}` }}
          >
            <ExpertAvatar
              name={expert.name}
              avatarUrl={expert.avatarUrl}
              size={AVATAR_SIZE}
              className="rounded-full"
            />
          </span>
        ))}
      </span>
      <span className="min-w-0">
        {formatReadyLine(
          experts.map((expert) => expert.name),
          t,
          locale,
        )}
      </span>
    </p>
  );
}
