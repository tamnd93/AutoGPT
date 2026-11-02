"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import {
  CHECK_YOUR_INBOX_HEADING_ID,
  CHECK_YOUR_INBOX_KEYS,
  type CheckYourInboxReason,
} from "./helpers";
import { useCheckYourInbox } from "./useCheckYourInbox";

interface Props {
  email: string;
  reason: CheckYourInboxReason;
  next?: string | null;
  marketingOptOut?: boolean;
  onBack: () => void;
}

export function CheckYourInbox({
  email,
  reason,
  next,
  marketingOptOut,
  onBack,
}: Props) {
  const t = useT();
  const keys = CHECK_YOUR_INBOX_KEYS[reason];
  const { cooldown, isResending, canResend, handleResend } = useCheckYourInbox({
    email,
    next,
    marketingOptOut,
  });

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-accent-surface">
        <Icon
          icon={Mail01Icon}
          // TODO(tokens): no exact role for text-violet-600 (#7C3AED)
          className="size-7 text-violet-600"
        />
      </div>

      <Text
        id={CHECK_YOUR_INBOX_HEADING_ID}
        tabIndex={-1}
        variant="h3"
        as="h1"
        // TODO(tokens): no exact role for !text-slate-950 (#020617)
        className="!text-slate-950 outline-none"
      >
        {t(keys.title)}
      </Text>

      <Text variant="body" tone="secondary" className="mt-3">
        {t("auth2.inbox.sentPrefix")}{" "}
        <span
          // TODO(tokens): no exact role for text-slate-950 (#020617)
          className="break-all font-medium text-slate-950"
        >
          {email}
        </span>
        {t("auth2.inbox.sentSuffix", { action: t(keys.action) })}
      </Text>

      <Text variant="small" tone="muted" className="mt-2">
        {t("auth2.inbox.spam")}
      </Text>

      <Button
        variant="secondary"
        loading={isResending}
        type="button"
        disabled={!canResend}
        onClick={handleResend}
        className="mt-8 w-full"
      >
        {cooldown > 0
          ? t("auth2.inbox.resendIn", { seconds: cooldown })
          : t("auth2.inbox.resend")}
      </Button>

      <div className="mt-6 inline-flex items-center justify-center gap-1">
        <Text
          variant="body-medium"
          // TODO(tokens): no exact role for !text-slate-500 (#64748B)
          className="!text-slate-500"
        >
          {t(keys.backPrompt)}
        </Text>
        <Button
          type="button"
          variant="link"
          className="h-auto min-w-0 p-0"
          onClick={onBack}
        >
          {t(keys.backLabel)}
        </Button>
      </div>
    </div>
  );
}
