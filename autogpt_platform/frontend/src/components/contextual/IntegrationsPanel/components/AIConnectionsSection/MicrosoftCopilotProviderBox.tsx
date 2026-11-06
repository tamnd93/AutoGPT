"use client";

import { useState } from "react";
import { Text } from "@/components/atoms/Text/Text";
import { DeviceAuthConnectButton } from "@/components/contextual/DeviceAuth/DeviceAuthConnectButton";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import { ProviderBox } from "./ProviderBox";

interface Props {
  isLinked: boolean;
  onSuccess: () => void;
  name?: string;
  logoSrc?: string;
  description?: string;
  provider?: string;
}

export function MicrosoftCopilotProviderBox({
  isLinked,
  onSuccess,
  name = "Microsoft 365 Copilot",
  logoSrc = "/integrations/microsoft.webp",
  description,
  provider = "microsoft_365_copilot",
}: Props) {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);

  function handleSuccess() {
    setIsOpen(false);
    onSuccess();
  }

  const card = (
    <ProviderBox
      name={name}
      logoSrc={logoSrc}
      description={description}
      state={isLinked ? "connected" : "available"}
    />
  );

  if (isLinked) return card;

  const isMicrosoft = provider === "microsoft_365_copilot";

  return (
    <Dialog
      title={
        isMicrosoft
          ? t("aiConnections1.microsoft.dialogTitle")
          : t("providerCatalogue.connectDialogTitle", { name })
      }
      variant="compact"
      controlled={{ isOpen, set: setIsOpen }}
    >
      <Dialog.Trigger>{card}</Dialog.Trigger>
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="small" as="p" tone="muted">
            {isMicrosoft
              ? t("aiConnections1.microsoft.requires")
              : (description ?? "")}
          </Text>
          <DeviceAuthConnectButton
            provider={provider}
            providerName={name}
            onSuccess={handleSuccess}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
