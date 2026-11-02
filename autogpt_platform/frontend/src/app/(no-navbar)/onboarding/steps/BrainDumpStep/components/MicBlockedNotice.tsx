"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { MicOff01Icon } from "@hugeicons/core-free-icons";
import type { MicrophonePermission } from "../useMicrophonePermission";

interface Props {
  isBlocked: boolean;
  // No microphone, or one another app holds: fixed on the device, not in
  // the browser.
  isUnavailable?: boolean;
  permission: MicrophonePermission;
  onRetry: () => void;
}

const COPY = {
  blocked: {
    reason: "onboarding1.mic.blocked.reason",
    howTo: "onboarding1.mic.blocked.howTo",
  },
  // The prompt was closed rather than answered: asking again shows it again.
  dismissed: {
    reason: "onboarding1.mic.dismissed.reason",
    howTo: "onboarding1.mic.dismissed.howTo",
  },
  unavailable: {
    reason: "onboarding1.mic.unavailable.reason",
    howTo: "onboarding1.mic.unavailable.howTo",
  },
  // The site is allowed but the operating system refused the browser, as
  // Chrome on a Mac without microphone access in System Settings does.
  system: {
    reason: "onboarding1.mic.system.reason",
    howTo: "onboarding1.mic.system.howTo",
  },
} as const;

export function MicBlockedNotice({
  isBlocked,
  isUnavailable = false,
  permission,
  onRetry,
}: Props) {
  const t = useT();
  if (!isBlocked && !isUnavailable) return null;
  const copy = isBlocked ? noticeCopy(permission) : COPY.unavailable;

  return (
    <div
      role="alert"
      className="flex w-full max-w-[640px] items-start gap-2.5 self-start rounded-xl bg-surface-hover px-3 py-2.5 text-left"
    >
      <Icon
        icon={MicOff01Icon}
        size={18}
        className="mt-0.5 shrink-0 text-warning-foreground"
      />
      <Text variant="body" tone="secondary">
        <Text variant="body-medium" as="span">
          {t(copy.reason)}
        </Text>{" "}
        {t(copy.howTo)}{" "}
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={onRetry}
          className="inline h-auto rounded-sm p-0 align-baseline text-body text-foreground-base underline underline-offset-4 hover:bg-transparent hover:text-foreground-strong"
        >
          {t("onboarding1.mic.retry")}
        </Button>
        .
      </Text>
    </div>
  );
}

function noticeCopy(permission: MicrophonePermission) {
  if (permission === "prompt") return COPY.dismissed;
  if (permission === "granted") return COPY.system;
  return COPY.blocked;
}
