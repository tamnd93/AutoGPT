"use client";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { IntegrationsMarquee } from "@/components/molecules/IntegrationsMarquee/IntegrationsMarquee";

interface Props {
  query: string;
}

export function IntegrationsListEmpty({ query }: Props) {
  const t = useT();
  const trimmed = query.trim();

  // A search usually lands in Available integrations below, so a miss here
  // is one quiet line rather than the full empty state.
  if (trimmed) {
    return (
      <Text variant="body" className="px-4 text-foreground-tertiary">
        {t("integrations1.empty.noMatch", { query: trimmed })}
      </Text>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
      <IntegrationsMarquee />
      <div className="flex flex-col items-center gap-1">
        <Text variant="large-medium" as="span" className="text-textBlack">
          {t("integrations1.empty.title")}
        </Text>
        <Text variant="body" className="max-w-[360px] text-foreground-tertiary">
          {t("integrations1.empty.description")}
        </Text>
      </div>
    </div>
  );
}
