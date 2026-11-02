"use client";
import { Button } from "@/components/atoms/Button/Button";
import { Link } from "@/components/atoms/Link/Link";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

const API_DOCS_URL =
  "https://agpt.co/docs/platform/api-and-integrations/api-guide";

interface Props {
  onCreate: () => void;
}

export function APIKeysHeader({ onCreate }: Props) {
  const t = useT();

  return (
    <div className="flex flex-col items-start gap-4 pb-6 pl-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col">
        <Text variant="h4" as="h1" className="leading-7 text-textBlack">
          {t("settingsRest1.header.title")}
        </Text>
        <Text
          variant="body"
          className="mt-4 max-w-[600px] text-foreground-body"
        >
          {t("settingsRest1.header.bodyPrefix")}{" "}
          <Link href={API_DOCS_URL} isExternal variant="secondary">
            {t("settingsRest1.header.apiDocs")}
          </Link>{" "}
          {t("settingsRest1.header.bodySuffix")}
        </Text>
      </div>

      <Button
        variant="primary"
        size="small"
        leftIcon={<Icon icon={PlusSignIcon} size={16} />}
        onClick={onCreate}
        className="sm:hidden"
      >
        {t("settingsRest1.header.create")}
      </Button>
      <Button
        variant="primary"
        size="large"
        leftIcon={<Icon icon={PlusSignIcon} size={20} />}
        onClick={onCreate}
        className="hidden sm:inline-flex"
      >
        {t("settingsRest1.header.create")}
      </Button>
    </div>
  );
}
