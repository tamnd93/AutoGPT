import { Text } from "@/components/atoms/Text/Text";
import { AuthCard } from "@/components/auth/AuthCard";
import { Unlink01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  message: string;
}

export function ErrorView({ message }: Props) {
  const t = useT();

  return (
    <AuthCard title={t("sharing1.link.errorTitle")}>
      <div className="flex w-full flex-col items-center gap-6">
        <div
          // TODO(tokens): no exact role for bg-red-100 (#FDECEC)
          className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
        >
          <Icon
            icon={Unlink01Icon}
            size={40}
            // TODO(tokens): no fitting role for text-red-600 #D93636; #D93636 is error-hover (a hover fill), not a text colour
            className="text-red-600"
          />
        </div>
        <Text
          variant="body-medium"
          className="text-center text-muted-foreground"
        >
          {message}
        </Text>
        <Text variant="small" className="text-center text-muted-foreground">
          {t("sharing1.link.errorHint")}
        </Text>
      </div>
    </AuthCard>
  );
}
