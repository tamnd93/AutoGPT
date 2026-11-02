import { Tick02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ApprovalFields } from "@/components/organisms/ApprovalFields/ApprovalFields";
import { AUTOPILOT_NAME } from "@/components/molecules/AutopilotAvatar/helpers";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { cn } from "@/lib/utils";
import { approvalCardId } from "../ApprovalQueue/helpers";
import type { HeldRowInfo, HeldState } from "./heldRow";

const TAGS: Record<HeldState, { textKey: MessageKey; className: string }> = {
  waiting: {
    textKey: "chatTools1.queue.waitingForYou",
    className: "bg-warning-surface text-warning-foreground",
  },
  approved: {
    textKey: "chatTools1.receipt.approved",
    className: "bg-surface-hover text-foreground-tertiary",
  },
  rejected: {
    textKey: "chatTools1.receipt.rejected",
    className: "bg-surface-hover text-foreground-tertiary",
  },
  expired: {
    textKey: "chatTools2.held.expired",
    className: "bg-surface-hover text-foreground-tertiary",
  },
  closed: {
    textKey: "chatTools2.held.notRun",
    className: "bg-surface-hover text-foreground-tertiary",
  },
  unknown: {
    textKey: "chatTools2.held.unclear",
    className: "bg-warning-surface text-warning-foreground",
  },
  "not-run": {
    textKey: "chatTools2.held.notRun",
    className: "bg-error-surface text-error-foreground",
  },
};

// A held read is released or kept out, not approved or rejected.
const READ_TAGS: Partial<Record<HeldState, MessageKey>> = {
  waiting: "chatTools2.held.held",
  approved: "chatTools1.receipt.released",
  rejected: "chatTools1.receipt.keptOut",
};

export function HeldTag({ state, read }: { state: HeldState; read?: boolean }) {
  const t = useT();
  const tag = TAGS[state];
  const readKey = read ? READ_TAGS[state] : null;
  const text = readKey ? t(readKey) : t(tag.textKey);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-px text-xs font-medium",
        tag.className,
      )}
    >
      {state === "approved" && <Icon icon={Tick02Icon} size={11} aria-hidden />}
      {text}
    </span>
  );
}

const DETAIL: Record<Exclude<HeldState, "approved">, MessageKey> = {
  waiting: "chatTools2.held.waitingDetail",
  rejected: "chatTools2.held.rejectedDetail",
  expired: "chatTools2.held.expiredDetail",
  unknown: "chatTools2.held.unknownDetail",
  closed: "chatTools2.held.closedDetail",
  "not-run": "chatTools2.held.notRunDetail",
};

const READ_DETAIL: Partial<Record<HeldState, MessageKey>> = {
  waiting: "chatTools2.held.readWaitingDetail",
  rejected: "chatTools2.held.readRejectedDetail",
  unknown: "chatTools2.held.readUnknownDetail",
};

interface HeldCallDetailProps {
  held: HeldRowInfo;
  showArgs?: boolean;
}

export function HeldCallDetail({ held, showArgs = true }: HeldCallDetailProps) {
  const t = useT();
  const card = showArgs ? held.card : undefined;
  if (held.state === "approved" && !card) return null;
  const reviewId = held.reviewId;
  function goToApproval() {
    if (!reviewId) return;
    const el = document.getElementById(approvalCardId(reviewId));
    el?.scrollIntoView?.({ block: "center", behavior: "smooth" });
    el?.focus({ preventScroll: true });
  }
  return (
    <div className="flex flex-col items-start gap-1 rounded-lg border border-border-base px-3 py-2 text-sm text-foreground-secondary">
      {held.state !== "approved" && (
        <p>
          {t((held.read && READ_DETAIL[held.state]) || DETAIL[held.state]!, {
            otto: AUTOPILOT_NAME,
          })}
        </p>
      )}
      {card && (
        <div className="w-full py-1">
          <ApprovalFields
            fields={card.fields}
            values={card.args}
            clipped={card.clipped}
            idsWhenAlone
          />
        </div>
      )}
      {held.state === "waiting" && reviewId && (
        <Button
          variant="link"
          size="small"
          className="h-auto min-w-0 px-0 py-0 text-sm"
          onClick={goToApproval}
        >
          {t("chatTools2.held.goToApproval")}
        </Button>
      )}
    </div>
  );
}
