import { Button } from "@/components/atoms/Button/Button";
import { AUTOPILOT_NAME } from "@/components/molecules/AutopilotAvatar/helpers";
import { useT } from "@/lib/i18n";

interface Props {
  rejectAll: {
    count: number;
    confirming: boolean;
    onAsk: () => void;
    onCancel: () => void;
    onConfirm: () => void;
  } | null;
  // Shown once something is answered and something still waits.
  onContinue: (() => void) | null;
  busy: boolean;
}

export function QueueFooter({ rejectAll, onContinue, busy }: Props) {
  const t = useT();

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-separator bg-surface-muted/60 px-4 py-2 text-sm">
      {rejectAll?.confirming ? (
        <>
          <span role="alert" className="text-foreground-body">
            {t("chatTools1.footer.rejectAllQuestion", {
              count: rejectAll.count,
              otto: AUTOPILOT_NAME,
            })}
          </span>
          <Button
            size="xs"
            variant="primary"
            className="rounded-full"
            disabled={busy}
            onClick={rejectAll.onConfirm}
          >
            {t("chatTools1.footer.rejectAll")}
          </Button>
          <Button
            size="xs"
            variant="ghost"
            className="rounded-full"
            onClick={rejectAll.onCancel}
          >
            {t("chatTools1.footer.cancel")}
          </Button>
        </>
      ) : rejectAll ? (
        <Button
          variant="link"
          size="small"
          className="h-auto min-w-0 px-0 py-0 text-sm"
          disabled={busy}
          onClick={rejectAll.onAsk}
        >
          {t("chatTools1.footer.rejectAllCount", { count: rejectAll.count })}
        </Button>
      ) : null}
      {onContinue && !rejectAll?.confirming && (
        <Button
          type="button"
          size="small"
          variant="secondary"
          className="ml-auto min-w-0"
          disabled={busy}
          onClick={onContinue}
        >
          {t("chatTools1.footer.closeAndContinue")}
        </Button>
      )}
    </div>
  );
}
