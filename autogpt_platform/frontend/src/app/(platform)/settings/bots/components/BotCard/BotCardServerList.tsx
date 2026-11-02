import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip/BaseTooltip";
import { useT } from "@/lib/i18n";
import type { PlatformLinkInfo } from "@/app/api/__generated__/models/platformLinkInfo";
import {
  AlertCircleIcon,
  Delete02Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

type Props = {
  platformName: string;
  serverNoun: string;
  addBotLabel: string;
  serverLinks: PlatformLinkInfo[];
  isPending: (linkId: string) => boolean;
  onUnlink: (linkId: string) => void;
};

export function BotCardServerList({
  platformName,
  serverNoun,
  addBotLabel,
  serverLinks,
  isPending,
  onUnlink,
}: Props) {
  const t = useT();

  if (serverLinks.length === 0) {
    return (
      <div className="rounded-large border border-dashed border-border-base px-4 py-3">
        <Text variant="small" as="span" className="text-foreground-tertiary">
          {t("settingsRest1.server.emptyLead", { noun: serverNoun })} &quot;
          {addBotLabel}&quot; {t("settingsRest1.server.emptyMid")}{" "}
          <code>/setup</code> {t("settingsRest1.server.emptyTail")}
        </Text>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {serverLinks.map((link) => (
        <BotCardServerRow
          key={link.id}
          link={link}
          platformName={platformName}
          serverNoun={serverNoun}
          isPending={isPending(link.id)}
          onUnlink={() => onUnlink(link.id)}
        />
      ))}
    </ul>
  );
}

type RowProps = {
  link: PlatformLinkInfo;
  platformName: string;
  serverNoun: string;
  isPending: boolean;
  onUnlink: () => void;
};

function BotCardServerRow({
  link,
  platformName,
  serverNoun,
  isPending,
  onUnlink,
}: RowProps) {
  const t = useT();
  const botMissing = !link.server_name;
  const displayLabel = link.server_name ?? link.platform_server_id;

  return (
    <li className="flex items-center justify-between gap-3 rounded-large border border-border-base px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon
          icon={UserMultipleIcon}
          size={20}
          className="shrink-0 text-foreground-tertiary"
        />
        <div className="flex min-w-0 flex-col">
          <Text
            variant="body-medium"
            as="span"
            className="truncate text-textBlack"
          >
            {displayLabel}
          </Text>
          {botMissing ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  // TODO(tokens): no exact role (text-amber-600 #D97706)
                  className="inline-flex items-center gap-1 text-xs text-amber-600"
                >
                  <Icon icon={AlertCircleIcon} size={14} />{" "}
                  {t("settingsRest1.server.nameUnavailable")}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {t("settingsRest1.server.nameTooltip", {
                  platform: platformName,
                  noun: serverNoun,
                })}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Text
              variant="small"
              as="span"
              className="text-foreground-tertiary"
            >
              {t("settingsRest1.server.linkedByYou")}
            </Text>
          )}
        </div>
      </div>
      <Button
        variant="outline"
        size="small"
        leftIcon={<Icon icon={Delete02Icon} size={16} />}
        loading={isPending}
        onClick={onUnlink}
        aria-label={t("settingsRest1.server.unlinkAria", {
          label: displayLabel,
        })}
      >
        {t("settingsRest1.server.unlink")}
      </Button>
    </li>
  );
}
