"use client";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

export function BotsHeader() {
  const t = useT();

  return (
    <div className="flex flex-col items-start gap-4 pb-6 pl-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-col">
        <Text variant="h4" as="h1" className="leading-7 text-foreground-strong">
          {t("settingsRest1.bots.title")}
        </Text>
        <Text
          variant="body"
          className="mt-4 max-w-[600px] text-foreground-secondary"
        >
          {t("settingsRest1.bots.body")}
        </Text>
      </div>
    </div>
  );
}
