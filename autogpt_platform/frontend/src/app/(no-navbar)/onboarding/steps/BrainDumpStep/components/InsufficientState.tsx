"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

interface Props {
  mode: "voice" | "typed";
  canRecord: boolean;
  onRecordAgain: () => void;
  onTypeInstead: () => void;
  onSkip: () => void;
}

// The take went through — it just didn't say enough to personalize from.
// Calm and specific on purpose: nothing broke, nothing was lost, and all
// three ways forward stay open. The copy and the primary action follow
// how the user got here: a voice reject leads with a fresh take, a typed
// reject leads back to their preserved text.
export function InsufficientState({
  mode,
  canRecord,
  onRecordAgain,
  onTypeInstead,
  onSkip,
}: Props) {
  const t = useT();
  const recordIsPrimary = mode === "voice" && canRecord;

  return (
    <div
      role="alert"
      className="flex max-w-md flex-col items-center gap-4 text-center"
    >
      <Text variant="body" tone="muted">
        {mode === "voice"
          ? t("onboarding1.insufficient.voiceBody")
          : t("onboarding1.insufficient.typedBody")}
      </Text>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {canRecord && (
          <Button
            variant={recordIsPrimary ? "primary" : "secondary"}
            size="small"
            onClick={onRecordAgain}
          >
            {t("onboarding1.insufficient.recordAgain")}
          </Button>
        )}
        <Button
          variant={recordIsPrimary ? "secondary" : "primary"}
          size="small"
          onClick={onTypeInstead}
        >
          {mode === "typed"
            ? t("onboarding1.insufficient.addMore")
            : t("onboarding1.insufficient.typeInstead")}
        </Button>
        <Button variant="ghost" size="small" onClick={onSkip}>
          {t("onboarding1.common.continueWithout")}
        </Button>
      </div>
    </div>
  );
}
