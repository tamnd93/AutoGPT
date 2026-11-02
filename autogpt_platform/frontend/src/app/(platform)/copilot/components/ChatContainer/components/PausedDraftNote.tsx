import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

export function PausedDraftNote() {
  const t = useT();

  return (
    <Text
      variant="small"
      className="mt-2 px-1 text-center !text-xs !text-foreground-tertiary"
    >
      {t("chatInput1.chat.pausedDraftNote")}
    </Text>
  );
}
