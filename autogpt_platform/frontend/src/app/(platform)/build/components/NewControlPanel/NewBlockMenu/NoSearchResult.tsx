import { Sad01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

export const NoSearchResult = () => {
  const t = useT();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <Icon
        icon={Sad01Icon}
        size={64}
        className="mb-10 text-foreground-subtle"
      />
      <div className="space-y-1">
        <Text variant="body-medium" tone="emphasis">
          {t("build5.noSearchResult.title")}
        </Text>
        <Text variant="body" tone="secondary">
          {t("build5.noSearchResult.body")}
        </Text>
      </div>
    </div>
  );
};
