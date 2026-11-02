"use client";

import { useTutorialStore } from "@/app/(platform)/build/stores/tutorialStore";
import { TabIntroCard } from "@/app/(platform)/components/TabIntroCard/TabIntroCard";
import { useTabIntroCard } from "@/app/(platform)/components/TabIntroCard/useTabIntroCard";
import { FlowIcon } from "@hugeicons/core-free-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { startTutorial } from "../FlowEditor/tutorial";
import { useT } from "@/lib/i18n";

// First visit to the Build tab. Otto is the primary route on purpose —
// most users should not start on an empty canvas — with the existing builder
// tutorial kept as the quiet alternative for people who want the canvas.
export function BuildTabIntro() {
  const t = useT();
  // Deep link into an existing graph: the intro is about starting something,
  // and its tutorial clears the canvas — neither belongs over someone's saved
  // agent. Vetoing the visit leaves the step unrecorded, so a later blank
  // /build still gets the introduction.
  const isEditingSavedGraph = Boolean(useSearchParams().get("flowID"));
  const isTutorialRunning = useTutorialStore(
    (state) => state.isTutorialRunning,
  );
  const { isOpen, dismiss, takeAction } = useTabIntroCard(
    "build",
    !isEditingSavedGraph && !isTutorialRunning,
  );
  const setIsTutorialRunning = useTutorialStore(
    (state) => state.setIsTutorialRunning,
  );
  const router = useRouter();

  function askAutoPilot() {
    takeAction("ask_autopilot");
    router.push("/copilot?new=1");
  }

  function learnToBuild() {
    takeAction("builder_tutorial");
    startTutorial();
    setIsTutorialRunning(true);
  }

  return (
    <TabIntroCard
      isOpen={isOpen}
      icon={FlowIcon}
      title={t("build1.intro.title")}
      body={t("build1.intro.body")}
      cta={{ label: t("build1.intro.cta"), onClick: askAutoPilot }}
      altAction={{
        label: t("build1.intro.altAction"),
        onClick: learnToBuild,
      }}
      onDismiss={dismiss}
    />
  );
}
