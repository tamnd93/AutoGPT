"use client";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  onConnect: () => void;
  withTitle?: boolean;
}

export function IntegrationsHeader({ onConnect, withTitle = true }: Props) {
  const t = useT();

  return (
    <div className="flex flex-col items-start gap-4 pb-6 pl-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-col">
        {withTitle && (
          <Text
            // TODO(tokens): no exact role for text-[#1F1F20]
            variant="h4"
            as="h1"
            className="leading-7 text-[#1F1F20]"
          >
            {t("integrations.title")}
          </Text>
        )}
        <Text
          variant="body"
          className="mt-4 max-w-[600px] text-foreground-body"
        >
          {t("integrations.description")}
        </Text>
      </div>

      <Button
        variant="primary"
        size="small"
        leftIcon={<Icon icon={PlusSignIcon} size={16} />}
        onClick={onConnect}
        className="sm:hidden"
      >
        {t("integrations.connectService")}
      </Button>
      <Button
        variant="primary"
        size="large"
        leftIcon={<Icon icon={PlusSignIcon} size={20} />}
        onClick={onConnect}
        className="hidden sm:inline-flex"
      >
        {t("integrations.connectService")}
      </Button>
    </div>
  );
}
