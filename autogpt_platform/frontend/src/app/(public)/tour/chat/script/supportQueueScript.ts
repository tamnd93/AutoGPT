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

export function getSupportQueueScript(
  t: Translate = defaultTranslate,
): TourScript {
  return [
    {
      assistantMessageId: "support-asst-1",
      userPrompt:
        "Triage new support tickets and draft replies for the common ones",
      steps: [
        {
          delayMs: 400,
          part: { type: "text", text: t("sharing2.support.assistant1") },
        },
        {
          delayMs: 700,
          part: {
            type: "plan",
            plan: {
              goal: t("sharing2.support.goal"),
              steps: [
                {
                  description: t("sharing2.support.step1"),
                  blockName: "Gmail Read",
                },
                {
                  description: t("sharing2.support.step2"),
                  blockName: "AI Text Generator",
                },
                {
                  description: t("sharing2.support.step3"),
                  blockName: "Send Slack Message",
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
      assistantMessageId: "support-asst-2",
      userPrompt: "Go ahead, set it up",
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
              name: "Support Queue Triage",
              schedule: "Every 15 minutes",
              blocks: ["Gmail Read", "AI Text Generator", "Send Slack Message"],
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
              caption: t("sharing2.script.captionTeam"),
              title: t("sharing2.support.artifactTitle"),
              bullets: [
                t("sharing2.support.bullet1"),
                t("sharing2.support.bullet2"),
                t("sharing2.support.bullet3"),
              ],
            },
          },
        },
        {
          delayMs: 600,
          part: { type: "text", text: t("sharing2.support.final") },
        },
      ],
    },
  ];
}

export const supportQueueScript = getSupportQueueScript();
