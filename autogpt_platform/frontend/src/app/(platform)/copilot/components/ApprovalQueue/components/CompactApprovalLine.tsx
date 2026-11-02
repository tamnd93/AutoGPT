import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";
import type { ApprovalItem } from "../helpers";
import type { CardStatus } from "./ApprovalCard/ApprovalCard";
import { ApprovalHeadline } from "./ApprovalHeadline";

interface Props {
  item: ApprovalItem;
  // Nothing beyond the headline to show, so it can be answered in place.
  bare: boolean;
  status: CardStatus;
  onOpen: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function CompactApprovalLine({
  item,
  bare,
  status,
  onOpen,
  onApprove,
  onReject,
}: Props) {
  const t = useT();
  const busy = status !== "idle";
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <button
        type="button"
        onClick={onOpen}
        className="min-w-0 flex-1 rounded-md text-left hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong"
      >
        <ApprovalHeadline item={item} compact />
      </button>
      {bare ? (
        <div className="flex shrink-0 gap-2">
          <Button
            size="xs"
            variant="primary"
            className="rounded-full"
            loading={status === "approving"}
            disabled={busy}
            onClick={onApprove}
          >
            {t("chatTools1.approve")}
          </Button>
          <Button
            size="xs"
            variant="secondary"
            className="rounded-full"
            loading={status === "rejecting"}
            disabled={busy}
            onClick={onReject}
          >
            {t("chatTools1.reject")}
          </Button>
        </div>
      ) : (
        <Button
          size="xs"
          variant="secondary"
          className="shrink-0 rounded-full"
          onClick={onOpen}
        >
          {t("chatTools1.review")}
        </Button>
      )}
    </div>
  );
}
