import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useState } from "react";
import { useDuplicateGraph } from "../../hooks/useDuplicateGraph";
import { Cancel01Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function ReadOnlyBanner() {
  const t = useT();
  const { duplicate, isDuplicating, canDuplicate, isCheckingLibrary } =
    useDuplicateGraph();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  // Show the Duplicate CTA immediately while we look up the library agent, only
  // falling back to the "add to library" hint once we know it can't be forked.
  const showDuplicate = canDuplicate || isCheckingLibrary;

  return (
    <div
      data-id="read-only-banner"
      role="status"
      aria-live="polite"
      className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 select-none items-center gap-3 rounded-full bg-surface px-4 py-2 shadow-lg"
    >
      <Text variant="body" tone="body" className="px-2">
        {t("build5.readOnly.viewing")}
        <br />
        {showDuplicate
          ? t("build5.readOnly.duplicateHint")
          : t("build5.readOnly.libraryHint")}
      </Text>
      {showDuplicate && (
        <Button
          variant="primary"
          size="small"
          onClick={duplicate}
          loading={isDuplicating}
          disabled={!canDuplicate}
          leftIcon={<Icon icon={Copy01Icon} className="size-4" />}
        >
          {t("build5.readOnly.duplicate")}
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsDismissed(true)}
        aria-label={t("build5.readOnly.dismiss")}
        title={t("build5.readOnly.dismiss")}
      >
        <Icon icon={Cancel01Icon} className="h-4 w-4" />
      </Button>
    </div>
  );
}
