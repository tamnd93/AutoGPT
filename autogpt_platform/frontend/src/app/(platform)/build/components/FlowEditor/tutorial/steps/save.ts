import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build3En } from "@/lib/i18n/messages/build-3.en";
import { getMessage } from "@/lib/i18n/translate";
import { TUTORIAL_SELECTORS } from "../constants";
import {
  waitForElement,
  highlightElement,
  removeAllHighlights,
  forceSaveOpen,
} from "../helpers";
import { ICONS } from "../icons";
import { banner } from "../styles";

type TutorialKey = keyof typeof build3En;

export const createSaveSteps = (
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t = (key: TutorialKey) => getMessage(locale, key);

  return [
    {
      id: "open-save",
      title: t("build3.tutorial.save.openTitle"),
      text: `
      <div class="text-body text-foreground-emphasis">
        <p class="text-body font-normal text-foreground-emphasis m-0">${t("build3.tutorial.save.openLine")}</p>
        ${banner(
          ICONS.ClickIcon,
          t("build3.tutorial.save.openBanner"),
          "action",
        )}
      </div>
    `,
      attachTo: {
        element: TUTORIAL_SELECTORS.SAVE_TRIGGER,
        on: "right",
      },
      advanceOn: {
        selector: TUTORIAL_SELECTORS.SAVE_TRIGGER,
        event: "click",
      },
      beforeShowPromise: () =>
        waitForElement(TUTORIAL_SELECTORS.SAVE_TRIGGER, 3000).catch(() => {}),
      buttons: [],
      when: {
        show: () => {
          highlightElement(TUTORIAL_SELECTORS.SAVE_TRIGGER);
        },
        hide: () => {
          removeAllHighlights();
        },
      },
    },

    {
      id: "save-details",
      title: t("build3.tutorial.save.nameTitle"),
      text: `
      <div class="text-body text-foreground-emphasis">
        <p class="text-body font-normal text-foreground-emphasis m-0">${t("build3.tutorial.save.nameLine")}</p>
        ${banner(
          ICONS.ClickIcon,
          t("build3.tutorial.save.nameBanner"),
          "action",
        )}
        <p class="text-caption font-normal text-foreground-tertiary m-0" style="margin-top: 0.5rem;">${t("build3.tutorial.save.example")}</p>
      </div>
    `,
      attachTo: {
        element: TUTORIAL_SELECTORS.SAVE_CONTENT,
        on: "right",
      },
      advanceOn: {
        selector: TUTORIAL_SELECTORS.SAVE_AGENT_BUTTON,
        event: "click",
      },
      beforeShowPromise: () => waitForElement(TUTORIAL_SELECTORS.SAVE_CONTENT),
      when: {
        show: () => {
          forceSaveOpen(true);
        },
        hide: () => {
          forceSaveOpen(false);
        },
      },
      buttons: [],
    },
  ];
};
