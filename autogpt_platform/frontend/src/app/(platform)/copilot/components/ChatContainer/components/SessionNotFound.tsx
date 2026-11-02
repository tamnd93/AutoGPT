import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { AppSidebarTrigger } from "@/components/layout/AppSidebar/components/AppSidebarTrigger/AppSidebarTrigger";
import { useT } from "@/lib/i18n";
import { BubbleChatBlockedIcon } from "@hugeicons/core-free-icons";
import { parseAsString, useQueryState } from "nuqs";

export function SessionNotFound() {
  const t = useT();
  const [, setSessionId] = useQueryState("sessionId", parseAsString);
  const [, setExpertId] = useQueryState("expertId", parseAsString);

  function handleNewChat() {
    setSessionId(null);
    // Otherwise the ?expertId= deep-link adoption drops the user into that
    // expert's latest thread instead of a new chat.
    setExpertId(null);
  }

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center bg-surface px-6">
      {/* An open chat's thread chip owns the mobile sidebar button; this
          screen has no chip, so it brings its own. */}
      <AppSidebarTrigger
        // TODO(tokens): no exact role for hover:bg-[#F5F5F6]
        className="absolute left-4 top-5 rounded-full border border-border-base bg-surface shadow-md hover:bg-[#F5F5F6] md:hidden"
      />
      <div
        role="status"
        className="flex max-w-md flex-col items-center gap-3 text-center"
      >
        <Icon
          icon={BubbleChatBlockedIcon}
          size={28}
          className="text-muted-foreground"
        />
        <Text variant="large-medium" as="h2">
          {t("chatInput1.chat.sessionNotFoundTitle")}
        </Text>
        <Text variant="body" className="text-muted-foreground">
          {t("chatInput1.chat.sessionNotFoundBody")}
        </Text>
        <Button
          type="button"
          variant="secondary"
          size="small"
          className="mt-2"
          onClick={handleNewChat}
        >
          {t("chatInput1.chat.startNewChat")}
        </Button>
      </div>
    </div>
  );
}
