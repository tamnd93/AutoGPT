import {
  CallRinging01Icon,
  HeadsetIcon,
  Search01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { DEFAULT_LOCALE } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import {
  callPrepArtifact,
  competitorWatchArtifact,
  dailyBriefArtifact,
  supportQueueArtifact,
} from "./completionArtifacts";
import { getCallPrepScript } from "./callPrepScript";
import { getCompetitorWatchScript } from "./competitorWatchScript";
import { getDailyBriefScript } from "./dailyBriefScript";
import { getSupportQueueScript } from "./supportQueueScript";
import type { TourScenario } from "./types";

type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const defaultTranslate: Translate = (key, values) =>
  getMessage(DEFAULT_LOCALE, key, values);

export function getTourScenarios(t: Translate = defaultTranslate): TourScenario[] {
  return [
    {
      id: "daily-brief",
      label: t("sharing2.scenario.dailyBrief"),
      icon: Sun01Icon,
      script: getDailyBriefScript(t),
      completionArtifact: dailyBriefArtifact,
    },
    {
      id: "call-prep",
      label: t("sharing2.scenario.callPrep"),
      icon: CallRinging01Icon,
      script: getCallPrepScript(t),
      completionArtifact: callPrepArtifact,
    },
    {
      id: "competitor-watch",
      label: t("sharing2.scenario.competitorWatch"),
      icon: Search01Icon,
      script: getCompetitorWatchScript(t),
      completionArtifact: competitorWatchArtifact,
    },
    {
      id: "support-queue",
      label: t("sharing2.scenario.supportQueue"),
      icon: HeadsetIcon,
      script: getSupportQueueScript(t),
      completionArtifact: supportQueueArtifact,
    },
  ];
}

export const tourScenarios: TourScenario[] = getTourScenarios();

export const DEFAULT_SCENARIO_ID = "competitor-watch";

export function getNextTourScenario(
  activeScenarioId: string,
  watchedScenarioIds: string[],
  t: Translate = defaultTranslate,
): TourScenario {
  const all = getTourScenarios(t);
  const activeIndex = all.findIndex(
    (scenario) => scenario.id === activeScenarioId,
  );
  const others = [
    ...all.slice(activeIndex + 1),
    ...all.slice(0, Math.max(activeIndex, 0)),
  ];
  return (
    others.find((scenario) => !watchedScenarioIds.includes(scenario.id)) ??
    others[0] ??
    all[0]
  );
}

export function getTourScenario(
  id: string,
  t: Translate = defaultTranslate,
): TourScenario {
  const all = getTourScenarios(t);
  return (
    all.find((scenario) => scenario.id === id) ??
    all.find((scenario) => scenario.id === DEFAULT_SCENARIO_ID) ??
    all[0]
  );
}
