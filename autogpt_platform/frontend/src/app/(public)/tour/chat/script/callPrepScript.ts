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

export function getCallPrepScript(
  t: Translate = defaultTranslate,
): TourScript {
  return [
    {
      assistantMessageId: "callprep-asst-1",
      userPrompt: "Brief me on the company and person before every sales call",
      steps: [
        {
          delayMs: 400,
          part: { type: "text", text: t("sharing2.callPrep.assistant1") },
        },
        {
          delayMs: 700,
          part: {
            type: "plan",
            plan: {
              goal: t("sharing2.callPrep.goal"),
              steps: [
                {
                  description: t("sharing2.callPrep.step1"),
                  blockName: "Google Calendar",
                },
                {
                  description: t("sharing2.callPrep.step2"),
                  blockName: "Web Search",
                },
                {
                  description: t("sharing2.callPrep.step3"),
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
      assistantMessageId: "callprep-asst-2",
      userPrompt: "Sounds great, set it up",
      steps: [
        {
          delayMs: 500,
          part: { type: "text", text: t("sharing2.script.buildingTrigger") },
        },
        {
          delayMs: 900,
          part: {
            type: "agent",
            agent: {
              name: "Call Prep Briefer",
              schedule: "30 min before each call",
              blocks: ["Google Calendar", "Web Search", "Send Email"],
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
              title: t("sharing2.callPrep.artifactTitle"),
              bullets: [
                t("sharing2.callPrep.bullet1"),
                t("sharing2.callPrep.bullet2"),
                t("sharing2.callPrep.bullet3"),
              ],
            },
          },
        },
        {
          delayMs: 600,
          part: { type: "text", text: t("sharing2.callPrep.final") },
        },
      ],
    },
  ];
}

export const callPrepScript = getCallPrepScript();
