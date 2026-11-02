import { useT } from "@/lib/i18n";
import Image from "next/image";
import { Button } from "../atoms/Button/Button";

interface GoogleOAuthButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function GoogleOAuthButton({
  onClick,
  isLoading,
  disabled,
}: GoogleOAuthButtonProps) {
  const t = useT();

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full gap-3"
      onClick={onClick}
      disabled={disabled}
      loading={isLoading}
    >
      <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
      {isLoading ? t("auth2.google.connecting") : t("auth2.google.continue")}
    </Button>
  );
}
