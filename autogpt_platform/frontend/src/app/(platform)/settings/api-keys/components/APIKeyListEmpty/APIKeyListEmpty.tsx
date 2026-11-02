"use client";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

import { APIKeyMarquee } from "./components/APIKeyMarquee";

export function APIKeyListEmpty() {
  const t = useT();

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
      <APIKeyMarquee />
      <div className="flex flex-col items-center gap-1">
        <Text variant="large-medium" as="span" className="text-textBlack">
          {t("settingsRest1.empty.title")}
        </Text>
        <Text variant="body" className="max-w-[360px] text-foreground-tertiary">
          {t("settingsRest1.empty.body")}
        </Text>
      </div>
    </div>
  );
}
