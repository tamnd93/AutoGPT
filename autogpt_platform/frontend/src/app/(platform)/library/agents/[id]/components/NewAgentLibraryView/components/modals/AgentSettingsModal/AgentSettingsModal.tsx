"use client";

import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Button } from "@/components/atoms/Button/Button";
import { Switch } from "@/components/atoms/Switch/Switch";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useAgentSafeMode } from "@/hooks/useAgentSafeMode";
import { useState } from "react";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  agent: LibraryAgent;
  controlledOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AgentSettingsModal({
  agent,
  controlledOpen,
  onOpenChange,
}: Props) {
  const t = useT();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalIsOpen;

  function setIsOpen(open: boolean) {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  }

  const {
    currentHITLSafeMode,
    showHITLToggle,
    handleHITLToggle,
    currentSensitiveActionSafeMode,
    showSensitiveActionToggle,
    handleSensitiveActionToggle,
    isPending,
    shouldShowToggle,
  } = useAgentSafeMode(agent);

  if (!shouldShowToggle) return null;

  return (
    <Dialog
      controlled={{ isOpen, set: setIsOpen }}
      styling={{ maxWidth: "600px", maxHeight: "90vh" }}
      title={t("library1.settings.title")}
    >
      {controlledOpen === undefined && (
        <Dialog.Trigger>
          <Button
            variant="ghost"
            size="small"
            className="m-0 min-w-0 rounded-full p-0 px-1"
            aria-label={t("library1.settings.title")}
          >
            <Icon
              icon={Settings01Icon}
              size={18}
              className="text-foreground-secondary"
            />
            <Text variant="small">{t("library1.settings.title")}</Text>
          </Button>
        </Dialog.Trigger>
      )}
      <Dialog.Content>
        <div className="space-y-6">
          {showHITLToggle && (
            <div className="flex w-full flex-col items-start gap-4 rounded-xl border border-separator bg-surface p-6">
              <div className="flex w-full items-start justify-between gap-4">
                <div className="flex-1">
                  <Text variant="large-semibold">
                    {t("library1.settings.hitl")}
                  </Text>
                  <Text variant="large" className="mt-1 text-foreground-strong">
                    {t("library1.settings.hitlBody")}
                  </Text>
                </div>
                <Switch
                  checked={currentHITLSafeMode || false}
                  onCheckedChange={handleHITLToggle}
                  disabled={isPending}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          {showSensitiveActionToggle && (
            <div className="flex w-full flex-col items-start gap-4 rounded-xl border border-separator bg-surface p-6">
              <div className="flex w-full items-start justify-between gap-4">
                <div className="flex-1">
                  <Text variant="large-semibold">
                    {t("library1.settings.sensitive")}
                  </Text>
                  <Text variant="large" className="mt-1 text-foreground-strong">
                    {t("library1.settings.sensitiveBody")}
                  </Text>
                </div>
                <Switch
                  checked={currentSensitiveActionSafeMode}
                  onCheckedChange={handleSensitiveActionToggle}
                  disabled={isPending}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
