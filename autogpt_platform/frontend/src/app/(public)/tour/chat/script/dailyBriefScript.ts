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

export function getDailyBriefScript(
  t: Translate = defaultTranslate,
): TourScript {
  return [
    {
      assistantMessageId: "brief-asst-1",
      userPrompt:
        "Every morning, pull my unread emails and calendar into one brief",
      steps: [
        {
          delayMs: 400,
          part: { type: "text", text: t("sharing2.dailyBrief.assistant1") },
        },
        {
          delayMs: 700,
          part: {
            type: "plan",
            plan: {
              goal: t("sharing2.dailyBrief.goal"),
              steps: [
                {
                  description: t("sharing2.dailyBrief.step1"),
                  blockName: "Gmail Read",
                },
                {
                  description: t("sharing2.dailyBrief.step2"),
                  blockName: "AI Text Generator",
                },
                {
                  description: t("sharing2.dailyBrief.step3"),
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
      assistantMessageId: "brief-asst-2",
      userPrompt: "Perfect, set it up",
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
              name: "Morning Brief",
              schedule: "Daily · 7:30 AM",
              blocks: ["Gmail Read", "AI Text Generator", "Send Email"],
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
              title: t("sharing2.dailyBrief.artifactTitle"),
              bullets: [
                t("sharing2.dailyBrief.bullet1"),
                t("sharing2.dailyBrief.bullet2"),
                t("sharing2.dailyBrief.bullet3"),
              ],
            },
          },
        },
        {
          delayMs: 600,
          part: { type: "text", text: t("sharing2.dailyBrief.final") },
        },
      ],
    },
  ];
}

export const dailyBriefScript = getDailyBriefScript();
