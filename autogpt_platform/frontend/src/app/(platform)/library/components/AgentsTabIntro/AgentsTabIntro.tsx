"use client";

import { TabIntroCard } from "@/app/(platform)/components/TabIntroCard/TabIntroCard";
import { useTabIntroCard } from "@/app/(platform)/components/TabIntroCard/useTabIntroCard";
import { GridViewIcon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/i18n";

interface Props {
  canShow?: boolean;
}

// First visit to the Agents tab. The fleet is already rendered behind the
// card, so "See my agents" only has to get out of the way.
export function AgentsTabIntro({ canShow = true }: Props) {
  const t = useT();
  const { isOpen, dismiss, takeAction } = useTabIntroCard("agents", canShow);

  return (
    <TabIntroCard
      isOpen={isOpen}
      icon={GridViewIcon}
      title={t("library4.intro.title")}
      body={t("library4.intro.body")}
      cta={{
        label: t("library4.intro.cta"),
        onClick: () => takeAction("see_agents"),
      }}
      onDismiss={dismiss}
    />
  );
}
