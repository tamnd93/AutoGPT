import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build3En } from "@/lib/i18n/messages/build-3.en";
import { getMessage } from "@/lib/i18n/translate";
import { handleTutorialSkip } from "../helpers";

type TutorialKey = keyof typeof build3En;

export const createWelcomeSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t = (key: TutorialKey) => getMessage(locale, key);

  return [
    {
      id: "welcome",
      title: t("build3.tutorial.welcome.title"),
      text: `
      <div class="text-body text-foreground-emphasis">
        <p class="text-body font-normal text-foreground-emphasis m-0">${t("build3.tutorial.welcome.intro")}</p>
        <p class="text-body font-medium text-foreground-emphasis m-0" style="margin-top: 0.75rem;">${t("build3.tutorial.welcome.learnTitle")}</p>
        <ul class="pl-2 text-body leading-5 pt-2">
          <li>${t("build3.tutorial.welcome.learnAdd")}</li>
          <li>${t("build3.tutorial.welcome.learnIo")}</li>
          <li>${t("build3.tutorial.welcome.learnSaveRun")}</li>
          <li>${t("build3.tutorial.welcome.learnMore")}</li>
        </ul>
        <p class="text-caption font-normal text-foreground-tertiary m-0" style="margin-top: 0.75rem;">${t("build3.tutorial.welcome.estimated")}</p>
      </div>
    `,
      buttons: [
        {
          text: t("build3.tutorial.welcome.skip"),
          action: () => handleTutorialSkip(tour),
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build3.tutorial.welcome.begin"),
          action: () => tour.next(),
        },
      ],
    },
  ];
};
