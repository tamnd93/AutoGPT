import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build4En } from "@/lib/i18n/messages/build-4.en";
import { getMessage } from "@/lib/i18n/translate";
import { TUTORIAL_SELECTORS } from "../constants";
import {
  waitForElement,
  waitForNodeOnCanvas,
  closeBlockMenu,
  fitViewToScreen,
  highlightElement,
  removeAllHighlights,
} from "../helpers";
import { ICONS } from "../icons";
import { banner } from "../styles";

type TutorialKey = keyof typeof build4En;

export const createBlockBasicsSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t = (key: TutorialKey) => getMessage(locale, key);

  return [
    {
      id: "focus-new-block",
      title: t("build4.tutorial.blockBasics.firstTitle"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.blockBasics.firstLine")}</p>
          <p class="text-body font-normal text-foreground-emphasis m-0" style="margin-top: 0.5rem;">${t("build4.tutorial.blockBasics.firstExplore")}</p>
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.REACT_FLOW_NODE,
        on: "right",
      },
      beforeShowPromise: async () => {
        closeBlockMenu();
        await waitForNodeOnCanvas(5000);
        await new Promise((resolve) => setTimeout(resolve, 300));
        fitViewToScreen();
      },
      when: {
        show: () => {
          const node = document.querySelector(
            TUTORIAL_SELECTORS.REACT_FLOW_NODE,
          );
          if (node) {
            highlightElement(TUTORIAL_SELECTORS.REACT_FLOW_NODE);
          }
        },
        hide: () => {
          removeAllHighlights();
        },
      },
      buttons: [
        {
          text: t("build4.tutorial.blockBasics.showMe"),
          action: () => tour.next(),
        },
      ],
    },

    {
      id: "input-handles",
      title: t("build4.tutorial.blockBasics.inputTitle"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.blockBasics.inputLine")}</p>
          <p class="text-body font-normal text-foreground-emphasis m-0" style="margin-top: 0.5rem;">${t("build4.tutorial.blockBasics.inputDetail")}</p>
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.NODE_INPUT_HANDLE,
        on: "bottom",
      },
      classes: "new-builder-tour input-handles-step",
      beforeShowPromise: () =>
        waitForElement(TUTORIAL_SELECTORS.NODE_INPUT_HANDLE, 3000).catch(
          () => {},
        ),
      buttons: [
        {
          text: t("build4.tutorial.common.back"),
          action: () => tour.back(),
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build4.tutorial.common.next"),
          action: () => tour.next(),
        },
      ],
    },

    {
      id: "output-handles",
      title: t("build4.tutorial.blockBasics.outputTitle"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.blockBasics.outputLine")}</p>
          <p class="text-body font-normal text-foreground-emphasis m-0" style="margin-top: 0.5rem;">${t("build4.tutorial.blockBasics.outputDetail")}</p>
          ${banner(
            ICONS.Drag,
            t("build4.tutorial.blockBasics.dragBanner"),
            "info",
          )}
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.NODE_OUTPUT_HANDLE,
        on: "right",
      },
      beforeShowPromise: () =>
        waitForElement(TUTORIAL_SELECTORS.NODE_OUTPUT_HANDLE, 3000).catch(
          () => {},
        ),
      buttons: [
        {
          text: t("build4.tutorial.common.back"),
          action: () => tour.back(),
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build4.tutorial.common.nextArrow"),
          action: () => tour.next(),
        },
      ],
    },
  ];
};
