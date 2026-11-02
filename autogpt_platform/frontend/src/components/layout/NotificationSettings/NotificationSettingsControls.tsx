"use client";

import { useId } from "react";

import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { Alert01Icon } from "@hugeicons/core-free-icons";

import { SettingRow } from "./components/SettingRow/SettingRow";
import { useNotificationSettings } from "./useNotificationSettings";

export function NotificationSettingsControls() {
  const t = useT();
  const {
    isNotificationsEnabled,
    isSoundEnabled,
    isSupported,
    isBlocked,
    toggleNotifications,
    toggleSound,
  } = useNotificationSettings();
  const blockedExplainerId = useId();

  if (!isSupported) {
    return (
      <Text variant="small" as="p" className="text-foreground-tertiary">
        {t("nav2.notifications.unsupported")}
      </Text>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <SettingRow
        label={t("nav2.notifications.label")}
        description={t("nav2.notifications.description")}
        checked={isNotificationsEnabled}
        disabled={isBlocked}
        describedBy={isBlocked ? blockedExplainerId : undefined}
        onCheckedChange={toggleNotifications}
      />
      <SettingRow
        label={t("nav2.notifications.sound")}
        description={t("nav2.notifications.soundDescription")}
        checked={isSoundEnabled && isNotificationsEnabled}
        disabled={!isNotificationsEnabled}
        onCheckedChange={toggleSound}
      />

      {/* A browser-level denial is the one state we can't fix from in here —
          say so rather than leaving a switch that silently refuses to move. */}
      {isBlocked ? (
        <div
          id={blockedExplainerId}
          className="flex items-start gap-2 rounded-lg bg-surface-hover px-3 py-2"
        >
          <Icon
            icon={Alert01Icon}
            className="mt-0.5 size-4 shrink-0 text-foreground-tertiary"
          />
          <Text variant="small" as="p" className="text-foreground-secondary">
            {t("nav2.notifications.blocked")}
          </Text>
        </div>
      ) : null}
    </div>
  );
}
