import { Button } from "@/components/atoms/Button/Button";
import { useLocale, useT } from "@/lib/i18n";
import { approveAllLabel, modeLabel } from "../helpers";

interface Props {
  count: number;
  mode: string | null;
  approveAll: { count: number; busy: boolean; onClick: () => void } | null;
  onReviewAll: (() => void) | null;
  // Collapsed after Close and continue: the header alone, and a way back.
  onShow: (() => void) | null;
}

export function QueueHeader({
  count,
  mode,
  approveAll,
  onReviewAll,
  onShow,
}: Props) {
  const t = useT();
  const locale = useLocale();

  return (
    <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-separator bg-surface-muted/60 px-4 py-2">
      <span className="flex items-baseline gap-2 text-sm font-medium text-foreground-strong">
        {t("chatTools1.queue.waitingForYou")}
        <span className="tabular-nums text-foreground-tertiary">{count}</span>
      </span>
      <div className="flex items-center gap-3">
        {modeLabel(mode, locale) && (
          <span className="text-xs text-foreground-tertiary">
            {modeLabel(mode, locale)}
          </span>
        )}
        {onShow ? (
          <Button
            type="button"
            size="small"
            variant="secondary"
            className="min-w-0"
            aria-label={t("chatTools1.queue.showWaiting")}
            aria-expanded={false}
            // Close and continue removed the button that had focus.
            autoFocus
            onClick={onShow}
          >
            {t("chatTools1.queue.show")}
          </Button>
        ) : (
          <>
            {onReviewAll && (
              <Button
                type="button"
                size="small"
                variant="secondary"
                className="min-w-0"
                onClick={onReviewAll}
              >
                {t("chatTools1.queue.reviewAll")}
              </Button>
            )}
            {approveAll && (
              <Button
                size="small"
                variant="secondary"
                className="min-w-0"
                disabled={approveAll.busy}
                onClick={approveAll.onClick}
              >
                {approveAllLabel(approveAll.count, locale)}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
