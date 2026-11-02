import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { AuthCard } from "@/components/auth/AuthCard";
import { LinkType } from "@/app/api/__generated__/models/linkType";
import { isUserLink } from "../helpers";
import {
  ArrowTurnBackwardIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  linkType: LinkType;
  platform: string;
  serverName: string | null;
  serverNoun: string;
  returnUrl: string | null;
}

export function SuccessView({
  linkType,
  platform,
  serverName,
  serverNoun,
  returnUrl,
}: Props) {
  const t = useT();
  const forUser = isUserLink(linkType);
  const label =
    forUser || !serverName
      ? t("sharing1.link.successContextUser", { platform })
      : serverName;
  const detail = forUser
    ? t("sharing1.link.successDetailUser", { platform })
    : t("sharing1.link.successDetailServer", { noun: serverNoun });

  return (
    <AuthCard
      title={t("sharing1.link.successTitle")}
      className="max-w-[38rem] gap-6 p-8"
    >
      <div className="flex w-full flex-col items-center gap-7">
        <div
          // TODO(tokens): no exact role for bg-green-100 (#B7E2C7)
          className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <Icon
            icon={CheckmarkCircle02Icon}
            size={40}
            className="text-success"
          />
        </div>

        <div className="w-full rounded-xl bg-muted px-6 py-5 text-center">
          <Text variant="body-medium" className="text-muted-foreground">
            <strong>{label}</strong>
            {t("sharing1.link.successConnected")}
            <br />
            {detail}
          </Text>
          {returnUrl && forUser ? (
            <Text variant="small" className="mt-3 block text-muted-foreground">
              {t("sharing1.link.successTryNow")}
            </Text>
          ) : null}
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
          {returnUrl ? (
            <Button
              as="NextLink"
              href={returnUrl}
              size="small"
              leftIcon={<Icon icon={ArrowTurnBackwardIcon} size={16} />}
            >
              {t("sharing1.link.returnTo", { platform })}
            </Button>
          ) : null}
          <Button
            as="NextLink"
            href="/settings/bots"
            variant="outline"
            size="small"
          >
            {t("sharing1.link.manageBots")}
          </Button>
        </div>

        {returnUrl ? null : (
          <Text variant="small" className="text-center text-muted-foreground">
            {t("sharing1.link.closePage")}
          </Text>
        )}
      </div>
    </AuthCard>
  );
}
