"use client";

import { formatWhen } from "@/app/(platform)/settings/memory/helpers";
import type { MemoryFact } from "@/app/api/__generated__/models/memoryFact";
import { Button } from "@/components/atoms/Button/Button";
import { Link } from "@/components/atoms/Link/Link";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { SoulSectionTitle } from "../../SoulSectionTitle";
import { useLocale, useT } from "@/lib/i18n";
import { useLearnedNotes } from "./useLearnedNotes";

interface Props {
  expertId: string;
}

export function LearnedNotes({ expertId }: Props) {
  const t = useT();
  const { facts, isLoading, isError, forget, forgettingUuid } =
    useLearnedNotes(expertId);

  return (
    <section className="mb-8">
      <SoulSectionTitle>{t("team9.learnedNotes.title")}</SoulSectionTitle>
      {isLoading ? (
        <NotesSkeleton />
      ) : isError ? (
        <Text variant="small" tone="muted">
          {t("team9.learnedNotes.error")}
        </Text>
      ) : facts.length === 0 ? (
        <Text variant="small" tone="muted">
          {t("team9.learnedNotes.empty")}
        </Text>
      ) : (
        <NotesList
          expertId={expertId}
          facts={facts}
          forgettingUuid={forgettingUuid}
          onForget={forget}
        />
      )}
    </section>
  );
}

interface NotesListProps {
  expertId: string;
  facts: MemoryFact[];
  forgettingUuid: string | null;
  onForget: (uuid: string) => void;
}

function NotesList({
  expertId,
  facts,
  forgettingUuid,
  onForget,
}: NotesListProps) {
  const t = useT();
  const locale = useLocale();
  return (
    <>
      <Text variant="small" tone="muted">
        {t("team9.learnedNotes.intro")}
        
      </Text>
      <div className="mt-2 flex flex-col divide-y divide-separator">
        {facts.map((fact) => (
          <div
            key={fact.uuid}
            className="flex items-start justify-between gap-2 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <Text variant="small" as="p" className="text-textBlack">
                {fact.fact || `${fact.source} → ${fact.target}`}
              </Text>
              <Text
                variant="small"
                as="span"
                className="text-foreground-subtle"
              >
                {formatWhen(fact.created_at, locale)}
              </Text>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="small"
              className="h-7 !min-w-0 shrink-0 px-2 text-foreground-secondary"
              loading={forgettingUuid === fact.uuid}
              onClick={() => onForget(fact.uuid)}
            >
              {t("team9.learnedNotes.forget")}
            </Button>
          </div>
        ))}
      </div>
      <Link
        href={`/settings/memory?expert=${encodeURIComponent(expertId)}`}
        variant="secondary"
        className="mt-3 inline-block text-foreground-secondary"
      >
        {t("team9.learnedNotes.seeAll")}
      </Link>
    </>
  );
}

function NotesSkeleton() {
  return (
    <div className="mt-2 flex flex-col gap-2 py-1">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  );
}
