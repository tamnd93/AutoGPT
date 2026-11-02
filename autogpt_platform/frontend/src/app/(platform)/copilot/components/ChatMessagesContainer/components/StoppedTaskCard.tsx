import { Text } from "@/components/atoms/Text/Text";
import { BulbIcon, SquareIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function StoppedTaskCard() {
  const t = useT();
  return (
    <div className="my-2 flex items-start gap-3 rounded-xl border border-border-base/70 bg-surface p-4 shadow-sm duration-500 animate-in fade-in slide-in-from-bottom-2 fill-mode-both">
      <div
        // TODO(tokens): no exact role for bg-purple-50
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-small bg-purple-50"
      >
        <Icon icon={SquareIcon} size={16} className="text-brand" />
      </div>
      <div className="min-w-0 flex-1">
        <Text variant="body-medium" className="text-foreground-strong">
          {t("chatRuntime2.stoppedTask.title")}
        </Text>
        <Text
          variant="body"
          className="mt-1 text-body-sm leading-inherit text-foreground-secondary"
        >
          {t("chatRuntime2.stoppedTask.body")}
        </Text>
        <div className="mt-2.5 flex items-center gap-1.5">
          <Icon
            icon={BulbIcon}
            size={14}
            // TODO(tokens): no exact role for text-purple-300
            className="shrink-0 text-purple-300"
          />
          <Text variant="small" className="text-foreground-secondary">
            {t("chatRuntime2.stoppedTask.hint")}
          </Text>
        </div>
      </div>
    </div>
  );
}
