import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { PlugSocketIcon } from "@hugeicons/core-free-icons";

interface Props {
  names: string[];
  onConnect: () => void;
}

/** Offered after the install has already succeeded, so it reads as the next
 *  thing worth doing rather than something that went wrong. */
export function ConnectStep({ names, onConnect }: Props) {
  const t = useT();
  const providers = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(names);

  return (
    <div
      className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border-base bg-surface p-4"
      data-testid="skill-connect-step"
    >
      <Icon
        icon={PlugSocketIcon}
        size={18}
        className="text-foreground-tertiary"
        aria-hidden
      />
      <Text variant="small" className="!text-foreground-secondary">
        {t("marketplace2.skillPage.connectStep", { providers })}
      </Text>
      <Button
        variant="secondary"
        size="small"
        onClick={onConnect}
        className="ml-auto"
      >
        {t("marketplace2.skillPage.connect")}
      </Button>
    </div>
  );
}
