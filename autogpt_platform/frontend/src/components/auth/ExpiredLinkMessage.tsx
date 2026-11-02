import { useT } from "@/lib/i18n";
import { Button } from "../atoms/Button/Button";
import { Link } from "../atoms/Link/Link";
import { Text } from "../atoms/Text/Text";

interface Props {
  onRequestNewLink: () => void;
}

export function ExpiredLinkMessage({ onRequestNewLink }: Props) {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-6">
      <Text variant="h3" className="text-center">
        {t("auth2.expired.title")}
      </Text>
      <Text variant="body-medium" className="text-center text-muted-foreground">
        {t("auth2.expired.body")}
      </Text>
      <Button variant="primary" onClick={onRequestNewLink} className="w-full">
        {t("auth2.expired.request")}
      </Button>
      <div className="flex items-center gap-1">
        <Text variant="small" className="text-muted-foreground">
          {t("auth2.expired.haveAccess")}
        </Text>
        <Link href="/login" variant="secondary">
          {t("auth2.expired.login")}
        </Link>
      </div>
    </div>
  );
}
