import { RUN_DELAY_MS } from "./constants";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { DEFAULT_LOCALE } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import type { TourScript } from "./types";

type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const defaultTranslate: Translate = (key, values) =>
  getMessage(DEFAULT_LOCALE, key, values);

export function getCompetitorWatchScript(
  t: Translate = defaultTranslate,
): TourScript {
  return [
    {
      assistantMessageId: "competitor-asst-1",
      userPrompt:
        "Watch a competitor's pricing page and email me when the price changes",
      steps: [
        {
          delayMs: 400,
          part: { type: "text", text: t("sharing2.competitor.assistant1") },
        },
        {
          delayMs: 700,
          part: {
            type: "plan",
            plan: {
              goal: t("sharing2.competitor.goal"),
              steps: [
                {
                  description: t("sharing2.competitor.step1"),
                  blockName: "Send Web Request",
                },
                {
                  description: t("sharing2.competitor.step2"),
                  blockName: "Text Compare",
                },
                {
                  description: t("sharing2.competitor.step3"),
                  blockName: "Send Email",
                },
              ],
            },
          },
        },
        {
          delayMs: 500,
          part: { type: "text", text: t("sharing2.script.ask") },
        },
      ],
    },
    {
      assistantMessageId: "competitor-asst-2",
      userPrompt: "Yes, build and run it for me",
      steps: [
        {
          delayMs: 500,
          part: { type: "text", text: t("sharing2.script.building") },
        },
        {
          delayMs: 900,
          part: {
            type: "agent",
            agent: {
              name: "Competitor Pricing Watcher",
              schedule: "Daily · 8:00 AM",
              blocks: ["Send Web Request", "Text Compare", "Send Email"],
            },
          },
        },
        {
          delayMs: RUN_DELAY_MS,
          part: { type: "text", text: t("sharing2.script.done") },
        },
        {
          delayMs: 700,
          part: {
            type: "artifact",
            artifact: {
              caption: t("sharing2.script.captionInbox"),
              title: t("sharing2.competitor.artifactTitle"),
              subtitle: t("sharing2.competitor.artifactSubtitle"),
              diff: { from: "$49/mo", to: "$59/mo", delta: "+20.4%" },
            },
          },
        },
        {
          delayMs: 600,
          part: { type: "text", text: t("sharing2.competitor.final") },
        },
      ],
    },
  ];
}

export const competitorWatchScript = getCompetitorWatchScript();
