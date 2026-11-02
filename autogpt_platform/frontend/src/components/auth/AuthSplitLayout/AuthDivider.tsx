import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

export function AuthDivider() {
  const t = useT();

  return (
    <div className="my-5 flex w-full items-center gap-3">
      <span className="h-px flex-1 bg-surface-active" />
      <Text variant="small-medium" className="!text-foreground-tertiary">
        {t("auth1.divider.or")}
      </Text>
      <span className="h-px flex-1 bg-surface-active" />
    </div>
  );
}
