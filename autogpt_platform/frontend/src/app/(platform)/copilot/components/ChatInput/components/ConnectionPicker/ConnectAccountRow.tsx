"use client";

import { Loading03Icon, PlusSignIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { IntegrationLogo } from "@/components/molecules/IntegrationLogo/IntegrationLogo";
import { useT } from "@/lib/i18n";

interface Props {
  onConnect: () => void;
  isConnecting: boolean;
}

/**
 * The way in for a subscription the user has not linked yet.
 *
 * Without it the picker can only list what already exists, so a user who
 * has never connected ChatGPT sees a control about connections that offers
 * no way to make one, and has to discover Settings to act on it.
 */
export function ConnectAccountRow({ onConnect, isConnecting }: Props) {
  const t = useT();

  return (
    <Button
      type="button"
      variant="ghost"
      size="small"
      aria-label={t("chatInput1.connect.aria")}
      disabled={isConnecting}
      onClick={onConnect}
      className="h-auto min-h-14 w-full justify-start gap-3 whitespace-normal rounded-lg px-3 py-2 text-left"
    >
      <IntegrationLogo provider="openai" size={20} />
      <span className="min-w-0 flex-1 text-sm font-medium text-foreground-strong">
        <span className="block">{t("chatInput1.connect.chatGPTSublabel")}</span>
        <span className="mt-1 block text-caption-sm font-normal leading-inherit text-foreground-secondary">
          {t("chatInput1.connect.connectExisting")}
        </span>
      </span>
      <span
        role={isConnecting ? "status" : undefined}
        aria-label={
          isConnecting ? t("chatInput1.connect.connectingAria") : undefined
        }
        className="flex size-7 flex-none items-center justify-center rounded-lg border border-border-base bg-surface text-foreground-tertiary"
      >
        <Icon
          icon={isConnecting ? Loading03Icon : PlusSignIcon}
          size={14}
          aria-hidden
          className={isConnecting ? "animate-spin" : undefined}
        />
      </span>
    </Button>
  );
}
