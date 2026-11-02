"use client";

import { useEffect } from "react";

import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useLocale, useT } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n/translate";
import { isConsentManagerConfigured } from "@/services/consent/consent";
import { Flag, useGetFlag } from "@/services/feature-flags/use-get-flag";

import { AccountCard } from "./components/AccountCard/AccountCard";
import { BrowserNotificationsCard } from "./components/BrowserNotificationsCard/BrowserNotificationsCard";
import { LanguageCard } from "./components/LanguageCard/LanguageCard";
import { NotificationsCard } from "./components/NotificationsCard/NotificationsCard";
import { PreferencesHeader } from "./components/PreferencesHeader/PreferencesHeader";
import { CookieSettingsCard } from "./components/CookieSettingsCard/CookieSettingsCard";
import { PreferencesSkeleton } from "./components/PreferencesSkeleton/PreferencesSkeleton";
import { SaveBar } from "./components/SaveBar/SaveBar";
import { TimezoneCard } from "./components/TimezoneCard/TimezoneCard";
import { usePreferencesPage } from "./usePreferencesPage";

export default function SettingsPreferencesPage() {
  const t = useT();
  const locale = useLocale();

  useEffect(() => {
    document.title = getMessage(locale, "account1.page.title");
  }, [locale]);

  const {
    user,
    isLoading,
    isError,
    error,
    refetch,
    formState,
    dirty,
    isSaving,
    setTimezone,
    setBriefingFrequency,
    setAlertsEnabled,
    setStoreVerdictsEnabled,
    discardChanges,
    savePreferences,
  } = usePreferencesPage();

  const showNotifications = useGetFlag(Flag.SETTINGS_NOTIFICATIONS);
  const browserCardIndex = showNotifications ? 4 : 3;

  if (isError) {
    return (
      <ErrorCard
        context={t("account1.page.errorContext")}
        responseError={
          error ? { detail: (error as { detail?: string }).detail } : undefined
        }
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (isLoading || !user) {
    return <PreferencesSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PreferencesHeader />

      <AccountCard user={user} index={0} />

      <LanguageCard index={1} />

      <TimezoneCard
        value={formState.timezone}
        onChange={setTimezone}
        index={2}
      />

      {showNotifications ? (
        <NotificationsCard
          values={formState.notifications}
          onBriefingFrequencyChange={setBriefingFrequency}
          onAlertsChange={setAlertsEnabled}
          onStoreVerdictsChange={setStoreVerdictsEnabled}
          index={3}
        />
      ) : null}

      <BrowserNotificationsCard index={browserCardIndex} />

      {isConsentManagerConfigured() ? (
        <CookieSettingsCard index={browserCardIndex + 1} />
      ) : null}

      <SaveBar
        visible={dirty}
        saving={isSaving}
        onDiscard={discardChanges}
        onSave={savePreferences}
      />
    </div>
  );
}
