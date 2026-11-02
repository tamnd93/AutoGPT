"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import NextLink from "next/link";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";
import { useHandoffRetry } from "./useHandoffRetry";

interface Props {
  title: string;
  name: string;
  expertId: string;
  onSend: (message: string) => void;
}

/** Try again, for a hand-off the backend says can be sent again, and only
 *  while nothing has reached the expert since: one copy of the task, never
 *  two. */
export function HandoffRetry({ title, name, expertId, onSend }: Props) {
  const t = useT();
  const { asked, markAsked, known, threadId } = useHandoffRetry(expertId);
  if (asked) {
    return (
      <span className="text-sm text-foreground-tertiary">
        {t("chatTools2.handoff.askedRetry")}
      </span>
    );
  }
  if (!known) return null;
  if (threadId) {
    return (
      <NextLink
        href={`/copilot?sessionId=${encodeURIComponent(threadId)}`}
        className="inline-flex shrink-0 items-center gap-1 rounded text-sm font-medium text-foreground-emphasis underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
      >
        {t("chatTools2.handoff.openChat", { name })}
        <Icon
          icon={ArrowUpRight01Icon}
          size={14}
          aria-hidden
          className="rtl:-scale-x-100"
        />
      </NextLink>
    );
  }
  return (
    <Button
      variant="secondary"
      size="small"
      onClick={() => {
        markAsked();
        onSend(`Try handing ${title} to ${name} again.`);
      }}
      className="h-8 !min-w-0 px-3"
    >
      {t("chatInput3.card.tryAgain")}
    </Button>
  );
}
