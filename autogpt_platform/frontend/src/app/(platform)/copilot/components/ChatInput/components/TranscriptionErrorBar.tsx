"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  Alert02Icon,
  Cancel01Icon,
  Download04Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";

interface Props {
  message: string;
  isRetrying: boolean;
  onRetry: () => void;
  onDownload: () => void;
  onDismiss: () => void;
  className?: string;
}

/**
 * The recording behind this message is still in memory, so the row stays put
 * until the user acts on it — retried, downloaded, or dismissed. Anything
 * that expires on its own takes the audio with it.
 */
export function TranscriptionErrorBar({
  message,
  isRetrying,
  onRetry,
  onDownload,
  onDismiss,
  className,
}: Props) {
  const t = useT();

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full flex-wrap items-center gap-1.5 rounded-2xl bg-error-surface px-3 py-1.5 text-sm text-error-foreground",
        className,
      )}
    >
      <Icon icon={Alert02Icon} className="h-4 w-4 shrink-0" aria-hidden />
      <span className="min-w-0 flex-1 truncate">{message}</span>
      <Button
        type="button"
        variant="ghost"
        size="xs"
        leadingIcon={RefreshIcon}
        loading={isRetrying}
        disabled={isRetrying}
        onClick={onRetry}
      >
        {t("chatInput2.transcriptionError.retry")}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="xs"
        leadingIcon={Download04Icon}
        onClick={onDownload}
      >
        {t("chatInput2.transcriptionError.download")}
      </Button>
      <Button
        type="button"
        variant="icon"
        size="icon-xs"
        aria-label={t("chatInput2.transcriptionError.dismiss")}
        onClick={onDismiss}
      >
        <Icon icon={Cancel01Icon} className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
