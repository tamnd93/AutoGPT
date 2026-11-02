"use client";

import { useEffect, useReducer, useSyncExternalStore } from "react";

import { useCopilotUIStore } from "@/app/(platform)/copilot/store";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";

import {
  readPermission,
  readServerPermission,
  subscribeToPermission,
} from "./helpers";

/**
 * The one place that knows how the browser's three-state permission maps onto
 * our single app-level switch.
 *
 * We can never revoke a granted permission — "off" only ever means our own
 * flag, which also drops this browser's push subscription (see
 * `usePushNotifications`). Once the user has denied at the browser level, the switch is inert
 * and the surface has to send them to their browser's site settings.
 */
export function useNotificationSettings() {
  const t = useT();
  const isNotificationsEnabled = useCopilotUIStore(
    (s) => s.isNotificationsEnabled,
  );
  const setNotificationsEnabled = useCopilotUIStore(
    (s) => s.setNotificationsEnabled,
  );
  const isSoundEnabled = useCopilotUIStore((s) => s.isSoundEnabled);
  const toggleSound = useCopilotUIStore((s) => s.toggleSound);

  // Read during render, so a blocked or unsupported browser never paints an
  // enabled switch first. Answering the prompt fires no event, hence the
  // manual refresh after it.
  const permission = useSyncExternalStore(
    subscribeToPermission,
    readPermission,
    readServerPermission,
  );
  const [, refreshPermission] = useReducer((count: number) => count + 1, 0);

  // The store only checks permission once, at load. A revoke since then must
  // switch our flag off too, or the switch shows on while nothing can ever be
  // delivered. This reads the browser directly because the hydration render
  // still sees the server's "default".
  useEffect(() => {
    if (isNotificationsEnabled && readPermission() !== "granted") {
      setNotificationsEnabled(false);
    }
  }, [permission, isNotificationsEnabled, setNotificationsEnabled]);

  const isSupported = permission !== "unsupported";
  const isBlocked = permission === "denied";

  async function toggleNotifications() {
    if (isNotificationsEnabled) {
      setNotificationsEnabled(false);
      return;
    }

    if (typeof Notification === "undefined") {
      toast({
        title: t("nav2.notifications.notSupportedTitle"),
        description: t("nav2.notifications.notSupportedDescription"),
        variant: "destructive",
      });
      return;
    }

    const result = await Notification.requestPermission();
    refreshPermission();

    if (result === "granted") {
      setNotificationsEnabled(true);
      return;
    }

    // The prompt was dismissed or never shown (Chrome's quiet UI), not
    // refused, so nothing needs unblocking in browser settings.
    if (result === "default") {
      toast({
        title: t("nav2.notifications.notTurnedOnTitle"),
        description: t("nav2.notifications.notTurnedOnDescription"),
      });
      return;
    }

    toast({
      title: t("nav2.notifications.blockedTitle"),
      description: t("nav2.notifications.blockedDescription"),
      variant: "destructive",
    });
  }

  return {
    isNotificationsEnabled,
    isSoundEnabled,
    isSupported,
    isBlocked,
    permission,
    toggleNotifications,
    toggleSound,
  };
}
