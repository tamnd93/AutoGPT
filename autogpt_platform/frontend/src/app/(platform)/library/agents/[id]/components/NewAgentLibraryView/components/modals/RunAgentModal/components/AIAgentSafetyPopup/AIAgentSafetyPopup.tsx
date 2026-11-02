"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { Key, storage } from "@/services/storage/local-storage";
import { useCallback, useEffect, useState } from "react";
import { SecurityCheckIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  agentId: string;
  onAcknowledge: () => void;
  isOpen: boolean;
}

export function AIAgentSafetyPopup({ agentId, onAcknowledge, isOpen }: Props) {
  const t = useT();
  function handleAcknowledge() {
    // Add this agent to the list of agents for which popup has been shown
    const seenAgentsJson = storage.get(Key.AI_AGENT_SAFETY_POPUP_SHOWN);
    const seenAgents: string[] = seenAgentsJson
      ? JSON.parse(seenAgentsJson)
      : [];

    if (!seenAgents.includes(agentId)) {
      seenAgents.push(agentId);
      storage.set(Key.AI_AGENT_SAFETY_POPUP_SHOWN, JSON.stringify(seenAgents));
    }

    onAcknowledge();
  }

  if (!isOpen) return null;

  return (
    <Dialog
      title={t("library1.safety.title")}
      controlled={{ isOpen, set: () => {} }}
      styling={{ maxWidth: "480px" }}
    >
      <Dialog.Content>
        <div className="flex flex-col items-center p-6 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-info-surface">
            <Icon
              icon={SecurityCheckIcon}
              size={32}
              className="text-info-foreground"
            />
          </div>

          <Text variant="h3" className="mb-4">
            {t("library1.safety.heading")}
          </Text>

          <Text variant="body" className="mb-2 text-foreground-body">
            {t("library1.safety.body1")}
          </Text>

          <Text variant="body" className="mb-8 text-foreground-body">
            {t("library1.safety.body2")}
          </Text>

          <Button
            variant="primary"
            size="large"
            className="w-full"
            onClick={handleAcknowledge}
          >
            {t("library1.safety.gotIt")}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

export function useAIAgentSafetyPopup(
  agentId: string,
  hasSensitiveAction: boolean,
  hasHumanInTheLoop: boolean,
) {
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked) return;

    const seenAgentsJson = storage.get(Key.AI_AGENT_SAFETY_POPUP_SHOWN);
    const seenAgents: string[] = seenAgentsJson
      ? JSON.parse(seenAgentsJson)
      : [];
    const hasSeenPopupForThisAgent = seenAgents.includes(agentId);
    const isRelevantAgent = hasSensitiveAction || hasHumanInTheLoop;

    setShouldShowPopup(!hasSeenPopupForThisAgent && isRelevantAgent);
    setHasChecked(true);
  }, [agentId, hasSensitiveAction, hasHumanInTheLoop, hasChecked]);

  const dismissPopup = useCallback(() => {
    setShouldShowPopup(false);
  }, []);

  return {
    shouldShowPopup,
    dismissPopup,
  };
}
