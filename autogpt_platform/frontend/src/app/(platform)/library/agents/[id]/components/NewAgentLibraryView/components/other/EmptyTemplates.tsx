"use client";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { EmptySchedulesIllustration } from "./EmptySchedulesIllustration";

export function EmptyTemplates() {
  const t = useT();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-20">
      <EmptySchedulesIllustration />
      <div className="flex flex-col items-center gap-2">
        <Text variant="h4" className="text-center leading-inherit">
          {t("library2.emptyTemplates.title")}
        </Text>
        <Text variant="large" className="text-foreground-body">
          {t("library2.emptyTemplates.body")}
        </Text>
      </div>
    </div>
  );
}
