import { useT } from "@/lib/i18n";

export function SharedChatLoadingState() {
  const t = useT();
  return (
    <div
      data-testid="shared-chat-loading-state"
      className="flex h-full w-full flex-1 items-center justify-center"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-sm text-foreground-tertiary">
          {t("sharing1.shareChat.loading")}
        </p>
      </div>
    </div>
  );
}
