import { Text } from "@/components/atoms/Text/Text";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function EmptyFollowups() {
  const t = useT();
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-large border border-dashed border-border-base px-6 py-16 text-center"
      data-testid="followups-empty"
    >
      <div
        // TODO(tokens): no exact role for bg-yellow-50 #fef9e6
        className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50"
      >
        <Icon
          // TODO(tokens): no exact role for text-yellow-700 #ae8800
          icon={Calendar03Icon}
          size={24}
          className="text-yellow-700"
        />
      </div>
      <Text variant="h4" className="text-foreground-strong">
        {t("schedule1.empty.title")}
      </Text>
      <Text variant="body" className="max-w-md !text-foreground-tertiary">
        {t("schedule1.empty.body")}
      </Text>
    </div>
  );
}
