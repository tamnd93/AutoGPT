"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { formatElapsed } from "../helpers";

interface Props {
  durationSecs: number;
  onResume: () => void;
  onDownload: () => void;
  onDiscard: () => void;
}

// Reached when the tab was closed, refreshed or crashed mid-recording, or on
// Back after skipping past a recording. Everything captured is still in
// IndexedDB, so the only question is whether the user wants it.
export function RecoveryPrompt({
  durationSecs,
  onResume,
  onDownload,
  onDiscard,
}: Props) {
  const t = useT();

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
      <Text variant="h5">{t("onboarding1.recovery.title")}</Text>
      <Text variant="body" tone="muted">
        {t("onboarding1.recovery.keptPrefix")}{" "}
        <span className="text-foreground-strong">
          {formatElapsed(durationSecs)}
        </span>{" "}
        {t("onboarding1.recovery.keptSuffix")}
      </Text>
      <div className="flex w-full flex-col items-center gap-2">
        <Button size="small" onClick={onResume} className="w-full max-w-xs">
          {t("onboarding1.recovery.use")}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" onClick={onDownload}>
            {t("onboarding1.recording.download")}
          </Button>
          <Button variant="ghost" size="xs" onClick={onDiscard}>
            {t("onboarding1.recovery.startOver")}
          </Button>
        </div>
      </div>
    </div>
  );
}
