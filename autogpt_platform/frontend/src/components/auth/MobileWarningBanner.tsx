"use client";

import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { useT } from "@/lib/i18n";
import { Text } from "../atoms/Text/Text";
import { SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

export function MobileWarningBanner() {
  const t = useT();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "base" || breakpoint === "sm";

  if (!isMobile) {
    return null;
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-[32rem] rounded-lg border border-warning-border bg-warning-surface p-4">
      <div className="flex items-start gap-3">
        <Icon
          icon={SmartPhone01Icon}
          // TODO(tokens): no exact role for text-amber-600 (#D97706)
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600"
        />
        <div className="flex flex-col gap-1">
          <Text
            variant="body-medium"
            // TODO(tokens): no exact role for text-amber-900 (#78350F)
            className="text-amber-900"
          >
            {t("auth2.mobile.title")}
          </Text>
          <Text
            variant="small"
            // TODO(tokens): no exact role for text-amber-800 (#92400E)
            className="text-amber-800"
          >
            {t("auth2.mobile.body")}
          </Text>
        </div>
      </div>
    </div>
  );
}
