"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { LockIcon } from "@hugeicons/core-free-icons";

export function PrivacyNote() {
  const t = useT();

  return (
    <div className="flex items-center justify-center gap-2 px-4">
      <Icon
        icon={LockIcon}
        size={14}
        className="shrink-0 text-foreground-subtle"
      />
      <Text
        variant="small"
        className="text-center text-foreground-subtle sm:whitespace-nowrap"
      >
        {t("onboarding1.privacy.note")}
      </Text>
    </div>
  );
}
