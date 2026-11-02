import { useT } from "@/lib/i18n";
import { environment } from "@/services/environment";
import { Button } from "../atoms/Button/Button";
import { Text } from "../atoms/Text/Text";

interface Props {
  onBackToLogin?: () => void;
}

export function WaitlistErrorContent(props: Props) {
  const t = useT();
  if (!environment.isCloud()) return <SelfHostedNotAllowed {...props} />;
  return (
    <div className="flex flex-col items-center gap-6">
      <Text variant="h3">{t("auth2.waitlist.title")}</Text>
      <div className="flex flex-col gap-4 text-center">
        <Text variant="large" className="text-center">
          {t("auth2.waitlist.body")}
        </Text>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            window.open("https://agpt.co/waitlist", "_blank");
          }}
        >
          {t("auth2.waitlist.join")}
        </Button>
        {props.onBackToLogin ? (
          <Button variant="secondary" onClick={props.onBackToLogin}>
            {t("auth2.waitlist.backToLogin")}
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <Text variant="small" className="text-center text-muted-foreground">
          {t("auth2.waitlist.footerPrefix")}{" "}
          <a
            href="mailto:contact@agpt.co"
            className="underline hover:text-foreground"
          >
            contact@agpt.co
          </a>{" "}
          {t("auth2.waitlist.footerOr")}{" "}
          <a
            href="https://discord.gg/autogpt"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            {t("auth2.waitlist.footerDiscord")}
          </a>
          .
        </Text>
      </div>
    </div>
  );
}

// A self-hosted instance's allowlist belongs to its operator, not to AutoGPT's
// waitlist, so point the user at whoever runs it.
function SelfHostedNotAllowed(props: Props) {
  const t = useT();
  return (
    <div className="flex flex-col items-center gap-6">
      <Text variant="h3">{t("auth2.waitlist.selfHostTitle")}</Text>
      <Text variant="large" className="text-center">
        {t("auth2.waitlist.selfHostBody")}
      </Text>
      {props.onBackToLogin ? (
        <Button variant="secondary" onClick={props.onBackToLogin}>
          {t("auth2.waitlist.backToLogin")}
        </Button>
      ) : null}
    </div>
  );
}
