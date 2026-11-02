import { Alert02Icon, RefreshIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { ENTERPRISE_CONTACT_URL } from "../YourPlanCard/useYourPlanCard";

interface Props {
  onRetry: () => void;
}

export function UsageUnavailable({ onRetry }: Props) {
  const t = useT();
  return (
    <section
      aria-label={t("billing1.apUsage.aria")}
      className="flex h-full min-h-80 flex-col rounded-2xl border border-border-base bg-surface p-6"
    >
      <Text variant="large-medium" as="h2">
        {t("billing1.apUsage.title")}
      </Text>
      <div className="my-auto py-8">
        <span className="mb-4 flex size-9 items-center justify-center rounded-xl bg-surface-hover text-foreground-secondary">
          <Icon icon={Alert02Icon} size={18} />
        </span>
        <Text variant="large-medium" className="mb-2">
          {t("billing1.usageUnavailable.errorTitle")}
        </Text>
        <Text variant="small" tone="secondary" className="leading-6">
          {t("billing1.usageUnavailable.errorBody")}
        </Text>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            size="small"
            onClick={onRetry}
            leftIcon={<Icon icon={RefreshIcon} size={14} aria-hidden="true" />}
          >
            {t("billing1.usageUnavailable.tryAgain")}
          </Button>
          <Button
            as="NextLink"
            href={ENTERPRISE_CONTACT_URL}
            variant="ghost"
            size="small"
          >
            {t("billing1.usageUnavailable.contactSupport")}
          </Button>
        </div>
      </div>
    </section>
  );
}
