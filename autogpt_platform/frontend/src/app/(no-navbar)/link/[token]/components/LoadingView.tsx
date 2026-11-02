import { Text } from "@/components/atoms/Text/Text";
import { AuthCard } from "@/components/auth/AuthCard";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  title?: string;
  message?: string;
}

export function LoadingView({ title, message }: Props) {
  const t = useT();

  return (
    <AuthCard title={title ?? t("sharing1.link.loadingTitle")}>
      <div className="flex flex-col items-center gap-4">
        <Icon
          icon={Loading03Icon}
          size={48}
          className="animate-spin text-primary"
        />
        <Text variant="body-medium" className="text-muted-foreground">
          {message ?? t("sharing1.link.loadingMessage")}
        </Text>
      </div>
    </AuthCard>
  );
}
