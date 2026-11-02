"use client";

import { Button } from "@/components/atoms/Button/Button";
import { FadeIn } from "@/components/atoms/FadeIn/FadeIn";
import { Text } from "@/components/atoms/Text/Text";
import { AutopilotAvatar } from "@/components/molecules/AutopilotAvatar/AutopilotAvatar";
import { MicrosoftCopilotProviderBox } from "@/components/contextual/IntegrationsPanel/components/AIConnectionsSection/MicrosoftCopilotProviderBox";
import { UpcomingProviderBoxes } from "@/components/contextual/IntegrationsPanel/components/AIConnectionsSection/UpcomingProviderBoxes";
import { ProviderBox } from "@/components/contextual/IntegrationsPanel/components/AIConnectionsSection/ProviderBox";
import { useT } from "@/lib/i18n";
import { useConnectStep } from "./useConnectStep";

/**
 * The last thing a self-host install asks for: a model to run on.
 *
 * The zero-config path (link the ChatGPT plan you already pay for) leads;
 * API keys are the advanced path and live in Settings. Deliberately
 * skippable so a user with keys is not blocked by a wizard.
 */
export function ConnectStep() {
  const t = useT();
  const {
    connect,
    finishConnection,
    isConnecting,
    skip,
    isChatGPTLinked,
    isMicrosoftLinked,
  } = useConnectStep();

  return (
    <FadeIn>
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <AutopilotAvatar size={120} transparent />
          <Text variant="h4" as="h1">
            {t("onboarding2.connect.title")}
          </Text>
          <Text variant="large" as="p" tone="muted" className="max-w-md">
            {t("onboarding2.connect.body")}
          </Text>
        </div>

        <div
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4"
          aria-label={t("onboarding2.connect.subscriptionsAria")}
        >
          <ProviderBox
            name="ChatGPT"
            logoSrc="/integrations/openai.png"
            state={isChatGPTLinked ? "connected" : "available"}
            isBusy={isConnecting}
            onClick={connect}
          />
          <MicrosoftCopilotProviderBox
            isLinked={isMicrosoftLinked}
            onSuccess={finishConnection}
          />
          <UpcomingProviderBoxes />
        </div>

        {isMicrosoftLinked && (
          <Text variant="small" as="p" tone="muted" className="text-center">
            {t("onboarding2.connect.microsoft")}
          </Text>
        )}

        <Button size="small" onClick={skip} className="h-10 w-56">
          {t("onboarding2.connect.next")}
        </Button>
      </div>
    </FadeIn>
  );
}
