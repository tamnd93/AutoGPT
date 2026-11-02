import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import type { PlatformUserLinkInfo } from "@/app/api/__generated__/models/platformUserLinkInfo";
import {
  Chatting01Icon,
  Delete02Icon,
  Link01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

type Props = {
  platformName: string;
  serverNoun: string;
  dmLink: PlatformUserLinkInfo | null;
  pendingServerName?: string | null;
  isPending: (linkId: string) => boolean;
  onUnlink: (linkId: string) => void;
};

export function BotCardDmTile({
  platformName,
  serverNoun,
  dmLink,
  pendingServerName,
  isPending,
  onUnlink,
}: Props) {
  const t = useT();
  const title = dmLink
    ? (dmLink.platform_username ??
      t("settingsRest1.dm.userFallback", { id: dmLink.platform_user_id }))
    : pendingServerName
      ? t("settingsRest1.dm.pendingTitle", {
          noun: capitalize(serverNoun),
          name: pendingServerName,
        })
      : t("settingsRest1.dm.linkPrompt", { platform: platformName });
  const subtitle = dmLink
    ? t("settingsRest1.dm.linkedSubtitle")
    : pendingServerName
      ? t("settingsRest1.dm.pendingSubtitle", { platform: platformName })
      : t("settingsRest1.dm.idleSubtitle");

  return (
    <div className="flex items-center justify-between gap-3 rounded-large border border-border-base px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon
          icon={Chatting01Icon}
          size={20}
          className="shrink-0 text-foreground-tertiary"
        />
        <div className="flex min-w-0 flex-col">
          <Text variant="body-medium" as="span" className="text-textBlack">
            {title}
          </Text>
          <Text variant="small" as="span" className="text-foreground-tertiary">
            {subtitle}
          </Text>
        </div>
      </div>
      {dmLink ? (
        <Button
          variant="outline"
          size="small"
          leftIcon={<Icon icon={Delete02Icon} size={16} />}
          loading={isPending(dmLink.id)}
          onClick={() => onUnlink(dmLink.id)}
          aria-label={t("settingsRest1.dm.unlinkAria", {
            platform: platformName,
          })}
        >
          {t("settingsRest1.dm.unlink")}
        </Button>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs text-foreground-tertiary">
          <Icon icon={Link01Icon} size={14} /> {t("settingsRest1.dm.notLinked")}
        </span>
      )}
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
