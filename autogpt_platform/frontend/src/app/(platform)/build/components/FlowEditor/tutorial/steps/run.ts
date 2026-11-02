import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build4En } from "@/lib/i18n/messages/build-4.en";
import { getMessage } from "@/lib/i18n/translate";
import { TUTORIAL_SELECTORS } from "../constants";
import {
  waitForElement,
  fitViewToScreen,
  highlightElement,
  removeAllHighlights,
} from "../helpers";
import { ICONS } from "../icons";
import { banner } from "../styles";

type TutorialKey = keyof typeof build4En;

export const createRunSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t = (key: TutorialKey) => getMessage(locale, key);

  return [
    {
      id: "press-run",
      title: t("build4.tutorial.run.title"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.run.line")}</p>
          ${banner(ICONS.ClickIcon, t("build4.tutorial.run.banner"), "action")}
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.RUN_BUTTON,
        on: "top",
      },
      advanceOn: {
        selector: TUTORIAL_SELECTORS.RUN_BUTTON,
        event: "click",
      },
      beforeShowPromise: () =>
        waitForElement(TUTORIAL_SELECTORS.RUN_BUTTON, 3000).catch(() => {}),
      when: {
        show: () => {
          highlightElement(TUTORIAL_SELECTORS.RUN_BUTTON);
        },
        hide: () => {
          removeAllHighlights();
          setTimeout(() => {
            fitViewToScreen();
          }, 500);
        },
      },
      buttons: [],
    },

    {
      id: "show-output",
      title: t("build4.tutorial.run.outputTitle"),
      // TODO(tokens): no exact role: ring-blue-200 #BFDBFE; no fitting role for bg-zinc-100 #EFEFF0; #EFEFF0 is surface-hover, a hover fill, and this fill is not a hover state (QUALITY 41); no fitting role for ring-zinc-200 #DADADC; #DADADC is border-base (a border colour) and surface-active (an active-state fill), and this is a ring (QUALITY 41(b))
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.run.outputLine")}</p>
          
          <div class="mt-3 p-3 bg-info-surface ring-1 ring-blue-200 rounded-2xl">
            <p class="text-body leading-5 font-medium text-info-foreground m-0">${t("build4.tutorial.run.latestOutput")}</p>
            <p class="text-body-sm leading-inherit text-info-foreground m-0 mt-1">${t("build4.tutorial.run.latestNote")}</p>
          </div>
          
          <div class="mt-2 p-2 bg-zinc-100 ring-1 ring-zinc-200 rounded-xl">
            <p class="text-body-sm leading-inherit text-foreground-secondary m-0">${t("build4.tutorial.run.showsTitle")}</p>
            <ul class="text-body-sm leading-inherit text-foreground-tertiary m-0 mt-1 pl-4">
              <li>${t("build4.tutorial.run.showsResult")}</li>
              <li>${t("build4.tutorial.run.showsTimestamp")}</li>
            </ul>
          </div>
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.FIRST_CALCULATOR_NODE_OUTPUT,
        on: "top",
      },
      beforeShowPromise: () =>
        waitForElement(TUTORIAL_SELECTORS.FIRST_CALCULATOR_NODE_OUTPUT, 20000)
          .then(async () => {
            fitViewToScreen();
            // fitView animates the viewport over 800ms. Wait for it to settle so
            // Shepherd measures the output at its final position before opening
            // the overlay — otherwise the spotlight lands where the output used
            // to be and the output stays hidden under the dimmed overlay.
            await new Promise((resolve) => setTimeout(resolve, 900));
          })
          .catch(() => {}),
      when: {
        show: () => {
          highlightElement(TUTORIAL_SELECTORS.FIRST_CALCULATOR_NODE_OUTPUT);
        },
        hide: () => {
          removeAllHighlights();
        },
      },
      buttons: [
        {
          text: t("build4.tutorial.run.finishTutorial"),
          action: () => tour.next(),
        },
      ],
    },
  ];
};
