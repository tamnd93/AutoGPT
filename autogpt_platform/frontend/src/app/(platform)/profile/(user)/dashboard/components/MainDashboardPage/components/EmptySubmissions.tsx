import { Text } from "@/components/atoms/Text/Text";
import { InboxIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function EmptySubmissions() {
  const t = useT();

  return (
    <div
      // TODO(tokens): no exact role (border-neutral-200 #E5E5E5, dark:border-neutral-700, dark:bg-neutral-800/50)
      className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-neutral-200 bg-background dark:border-neutral-700 dark:bg-neutral-800/50"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          // TODO(tokens): no exact role (bg-neutral-100 #F5F5F5, dark:bg-neutral-700)
          className="rounded-full bg-neutral-100 p-3 dark:bg-neutral-700"
        >
          <Icon
            icon={InboxIcon}
            // TODO(tokens): no exact role (text-neutral-500 #737373, dark:text-neutral-400)
            className="h-8 w-8 text-neutral-500 dark:text-neutral-400"
          />
        </div>
        <div className="space-y-2">
          <Text
            variant="large-medium"
            // TODO(tokens): no exact role (text-neutral-900 #171717, dark:text-neutral-100)
            className="text-neutral-900 dark:text-neutral-100"
          >
            {t("profile4.dashboard.emptyTitle")}
          </Text>
          <Text
            variant="body"
            // TODO(tokens): no exact role (text-neutral-600 #525252, dark:text-neutral-400)
            className="text-neutral-600 dark:text-neutral-400"
          >
            {t("profile4.dashboard.emptyBody")}
          </Text>
        </div>
      </div>
    </div>
  );
}
