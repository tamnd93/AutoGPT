"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";
import { Mic01Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons";

interface Props {
  onTalk: () => void;
  onWrite: () => void;
  writeFirst?: boolean;
}

// The two ways to tell Otto about your work, side by side, so neither
// is hidden behind a link. Talking leads, unless the microphone failed.
export function RestActions({ onTalk, onWrite, writeFirst = false }: Props) {
  const t = useT();

  return (
    <div className="mt-4 flex items-center gap-3">
      <Button
        type="button"
        variant={writeFirst ? "secondary" : "primary"}
        size="small"
        onClick={onTalk}
        leadingIcon={Mic01Icon}
        className="h-10 w-36"
      >
        {t("onboarding1.rest.talk")}
      </Button>
      <Button
        type="button"
        variant={writeFirst ? "primary" : "secondary"}
        size="small"
        onClick={onWrite}
        leadingIcon={PencilEdit01Icon}
        className="h-10 w-36"
      >
        {t("onboarding1.rest.write")}
      </Button>
    </div>
  );
}
