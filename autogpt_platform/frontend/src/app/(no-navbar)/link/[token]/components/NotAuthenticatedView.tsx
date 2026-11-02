import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { AuthCard } from "@/components/auth/AuthCard";
import { useT } from "@/lib/i18n";

interface Props {
  token: string;
  loginRedirect: string;
}

export function NotAuthenticatedView({ token, loginRedirect }: Props) {
  const t = useT();

  return (
    <AuthCard title={t("sharing1.link.authTitle")}>
      <div className="flex w-full flex-col items-center gap-6">
        <Text
          variant="body-medium"
          className="text-center text-muted-foreground"
        >
          {t("sharing1.link.authBody")}
        </Text>
        <Button as="NextLink" href={loginRedirect} className="w-full">
          {t("sharing1.link.signIn")}
        </Button>
        <AuthCard.BottomText
          text={t("sharing1.link.noAccount")}
          link={{ text: t("sharing1.link.signUp"), href: `/signup?next=/link/${token}` }}
        />
      </div>
    </AuthCard>
  );
}
