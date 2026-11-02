import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import type { ReactNode } from "react";
import type { PauseItem } from "./helpers";

type PreviewProps = {
  expertName: string;
  automationLine: string;
  items: PauseItem[];
  isLoading: boolean;
  isError: boolean;
  isReady: boolean;
  onRetry: () => unknown;
};

type FooterProps = {
  expertName: string;
  isFiring: boolean;
  isPreviewLoading: boolean;
  onClose: () => void;
  onFire: () => void;
};

type PauseItemsPanelProps = {
  items: PauseItem[];
};

type FireLineProps = {
  children: ReactNode;
};

export function FireExpertPreview({
  expertName,
  automationLine,
  items,
  isLoading,
  isError,
  isReady,
  onRetry,
}: PreviewProps) {
  const t = useT();
  function getAutomationLineText() {
    if (isLoading) return t("team8.fire.checking");
    if (isError) return t("team8.fire.previewFailed");
    return automationLine;
  }

  function handleRetry() {
    void onRetry();
  }

  return (
    <>
      <Text variant="body" tone="secondary">
        {t("team8.fire.intro", { name: expertName })}
      </Text>
      <ul className="flex flex-col gap-2.5">
        <FireLine>{t("team8.fire.lineWorkflows")}</FireLine>
        <FireLine>{getAutomationLineText()}</FireLine>
        <FireLine>{t("team8.fire.lineHistory")}</FireLine>
        <FireLine>{t("team8.fire.lineWork")}</FireLine>
      </ul>
      {isError ? (
        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="small"
            onClick={handleRetry}
            data-testid="fire-preview-retry"
          >
            {t("team8.fire.retryPreview")}
          </Button>
        </div>
      ) : null}
      {isReady && items.length > 0 ? <PauseItemsPanel items={items} /> : null}
    </>
  );
}

function PauseItemsPanel({ items }: PauseItemsPanelProps) {
  const t = useT();
  return (
    <div className="rounded-xl bg-surface-muted px-3.5 py-3 ring-1 ring-inset ring-border-base/80">
      <Text variant="small" tone="muted">
        {t("team8.fire.pausingNow")}
      </Text>
      <ul className="mt-1 flex flex-col gap-0.5">
        {items.map((item) => (
          <Text
            key={item.id}
            variant="body"
            as="li"
            tone="secondary"
            className="truncate"
          >
            {item.name}
          </Text>
        ))}
      </ul>
    </div>
  );
}

export function FireExpertFooter({
  expertName,
  isFiring,
  isPreviewLoading,
  onClose,
  onFire,
}: FooterProps) {
  const t = useT();
  return (
    <Dialog.Footer>
      <Button
        size="small"
        variant="secondary"
        disabled={isFiring}
        onClick={onClose}
      >
        {t("team8.fire.keepName", { name: expertName })}
      </Button>
      <Button
        size="small"
        variant="destructive"
        loading={isFiring}
        disabled={isPreviewLoading}
        onClick={onFire}
        data-testid="fire-expert-confirm"
      >
        {t("team8.fire.fireName", { name: expertName })}
      </Button>
    </Dialog.Footer>
  );
}

function FireLine({ children }: FireLineProps) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden
        // TODO(tokens): no fitting role for bg-zinc-300 #C5C5C9; #C5C5C9 is foreground-disabled (a text colour), border-strong (a border colour)
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300"
      />
      <Text variant="body" tone="secondary">
        {children}
      </Text>
    </li>
  );
}
