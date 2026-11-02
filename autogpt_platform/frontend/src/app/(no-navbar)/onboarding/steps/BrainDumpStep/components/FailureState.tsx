"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

interface Props {
  mode: "voice" | "typed";
  reason: string | null;
  onDownload: () => void;
  onSkip: () => void;
}

// Calm on purpose. The recording is safe in the browser and (once it got
// that far) on the server, which keeps a failed take for 46 hours 30 minutes
// (the hourly sweep then deletes it, within 48 hours), so this is an
// inconvenience, not a loss — the copy and the download button both have to
// make that obvious. Download and retry both read the
// browser's copy. Retrying is the orb itself, so only the secondary exits
// live here. A typed take has no recording, so it gets neither the download
// nor that promise; its text stays in the composer.
export function FailureState({ mode, reason, onDownload, onSkip }: Props) {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {reason && <Text variant="body">{reason}</Text>}
      <Text variant="body" tone="muted">
        {mode === "voice"
          ? t("onboarding1.failure.voiceSafe")
          : t("onboarding1.failure.typedSafe")}
      </Text>
      <div className="flex items-center gap-3">
        {mode === "voice" && (
          <Button variant="primary" size="small" onClick={onDownload}>
            {t("onboarding1.recording.download")}
          </Button>
        )}
        <Button variant="ghost" size="small" onClick={onSkip}>
          {t("onboarding1.common.continueWithout")}
        </Button>
      </div>
    </div>
  );
}
