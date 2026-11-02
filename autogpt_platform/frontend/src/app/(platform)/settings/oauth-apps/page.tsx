"use client";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

export default function SettingsOAuthAppsPage() {
  const t = useT();

  return (
    <>
      <Text
        // TODO(tokens): no exact role (text-[#1F1F20])
        variant="h4"
        className="text-[#1F1F20]"
      >
        {t("account1.oauthApps.title")}
      </Text>
      <Text variant="large" className="mt-2 text-foreground-secondary">
        {t("account1.oauthApps.comingSoon")}
      </Text>
    </>
  );
}
