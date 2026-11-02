import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { UserGroupIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function EmptyTeamState() {
  const t = useT();
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-strong bg-surface p-8 text-center">
      <Icon icon={UserGroupIcon} size={32} className="text-foreground-subtle" />
      <Text variant="large-medium" tone="primary">
        {t("team8.empty.title")}
      </Text>
      <Text variant="body" tone="secondary" className="max-w-prose">
        {t("team8.empty.body")}
      </Text>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          as="NextLink"
          href="/marketplace"
          variant="primary"
          size="small"
        >
          {t("team8.empty.browse")}
        </Button>
        <Button as="NextLink" href="/raise" variant="secondary" size="small">
          {t("team8.empty.create")}
        </Button>
      </div>
    </div>
  );
}
