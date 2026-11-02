import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { AuthCard } from "@/components/auth/AuthCard";
import { LinkType } from "@/app/api/__generated__/models/linkType";
import { isUserLink } from "../helpers";
import { useT } from "@/lib/i18n";

interface Props {
  linkType: LinkType;
  platform: string;
  serverName: string | null;
  serverNoun: string;
  userEmail: string | null;
  isLinking: boolean;
  onLink: () => void;
  onSwitchAccount: () => void;
}

export function ReadyView({
  linkType,
  platform,
  serverName,
  serverNoun,
  userEmail,
  isLinking,
  onLink,
  onSwitchAccount,
}: Props) {
  const t = useT();
  const forUser = isUserLink(linkType);
  const title = buildTitle({ forUser, platform, serverName, serverNoun }, t);
  const contextLabel = forUser
    ? t("sharing1.link.contextUser", { platform })
    : (serverName ??
      t("sharing1.link.contextServer", { platform, noun: serverNoun }));

  return (
    <AuthCard title={title} className="max-w-[38rem] gap-6 p-8">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="w-full rounded-xl bg-muted px-6 py-5 text-left">
          <Text variant="body-medium" className="font-medium">
            {t("sharing1.link.whatHappens")}
          </Text>
          {forUser ? (
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              <li>
                {t("sharing1.link.userLinked", { context: contextLabel })}
              </li>
              <li>{t("sharing1.link.userDmPrivate")}</li>
              <li>{t("sharing1.link.userUsageBilled")}</li>
            </ul>
          ) : (
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              <li>
                {t("sharing1.link.serverConnected", {
                  context: contextLabel,
                })}
              </li>
              <li>{t("sharing1.link.anyoneTasks", { noun: serverNoun })}</li>
              <li>
                {t("sharing1.link.sharedVisible", { noun: serverNoun })}
              </li>
              <li>{t("sharing1.link.usesTools")}</li>
            </ul>
          )}
        </div>

        <div className="w-full rounded-xl border border-border bg-muted px-5 py-4">
          <Text
            variant="small"
            className="leading-relaxed text-muted-foreground"
          >
            {t("sharing1.link.billedNote", { context: contextLabel })}
          </Text>
        </div>

        <Button
          onClick={onLink}
          loading={isLinking}
          disabled={isLinking}
          className="w-full sm:w-auto sm:min-w-[16rem]"
        >
          {forUser
            ? t("sharing1.link.connectDms", { platform })
            : t("sharing1.link.connectPlatform", { platform })}
        </Button>

        {userEmail && (
          <div className="flex w-full items-center justify-between">
            <Text variant="small" className="text-muted-foreground">
              {t("sharing1.link.signedInAs", { email: userEmail })}
            </Text>
            <Button
              variant="ghost"
              size="small"
              onClick={onSwitchAccount}
              className="text-xs text-muted-foreground underline underline-offset-2"
            >
              {t("sharing1.link.notYou")}
            </Button>
          </div>
        )}
      </div>
    </AuthCard>
  );
}

function buildTitle(
  args: {
    forUser: boolean;
    platform: string;
    serverName: string | null;
    serverNoun: string;
  },
  t: ReturnType<typeof useT>,
): string {
  if (args.forUser) {
    return t("sharing1.link.readyTitleUser", { platform: args.platform });
  }
  if (args.serverName) {
    return t("sharing1.link.readyTitleServer", { server: args.serverName });
  }
  return t("sharing1.link.readyTitleServerNoName", {
    platform: args.platform,
    noun: args.serverNoun,
  });
}
