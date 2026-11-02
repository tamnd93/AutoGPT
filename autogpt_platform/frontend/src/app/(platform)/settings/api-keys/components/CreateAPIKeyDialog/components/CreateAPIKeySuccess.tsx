"use client";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  plainTextKey: string;
  onClose: () => void;
}

export function CreateAPIKeySuccess({ plainTextKey, onClose }: Props) {
  const t = useT();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(plainTextKey);
      toast({ title: t("settingsRest1.success.copied"), variant: "success" });
    } catch {
      toast({
        title: t("settingsRest1.success.copyFailed"),
        description: t("settingsRest1.success.copyManually"),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 px-1">
      <Text variant="body" className="text-foreground-body">
        {t("settingsRest1.success.warning")}
      </Text>

      <div className="flex items-center gap-2 rounded-md border border-border-base bg-surface-muted p-3">
        {/* ph-no-capture keeps the one-time key out of PostHog session replays. */}
        <code className="ph-no-capture flex-1 break-all font-mono text-xs text-foreground-emphasis">
          {plainTextKey}
        </code>
        <Button
          variant="secondary"
          size="small"
          leftIcon={<Icon icon={Copy01Icon} size={16} />}
          onClick={handleCopy}
        >
          {t("settingsRest1.success.copy")}
        </Button>
      </div>

      <Button variant="primary" size="large" onClick={onClose}>
        {t("settingsRest1.success.close")}
      </Button>
    </div>
  );
}
