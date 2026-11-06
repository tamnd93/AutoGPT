"use client";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

export function OAuthAppsHeader() {
  const t = useT();
  return (
    <div className="flex flex-col gap-2">
      <Text variant="h3">{t("profile5.oauth.pageTitle")}</Text>
      <Text variant="large">{t("profile5.oauth.pageDescription")}</Text>
    </div>
  );
}
