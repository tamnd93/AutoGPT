import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build4En } from "@/lib/i18n/messages/build-4.en";
import { getMessage } from "@/lib/i18n/translate";

type TutorialKey = keyof typeof build4En;

export const createCompletionSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t = (key: TutorialKey) => getMessage(locale, key);

  return [
    {
      id: "congratulations",
      title: t("build4.tutorial.completion.title"),
      // TODO(tokens): no exact role: ring-green-200 #94D5AC
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.completion.line")}</p>
          
          <div class="mt-3 p-3 bg-success-surface ring-1 ring-green-200 rounded-2xl">
            <p class="text-body leading-5 font-medium text-success m-0">${t("build4.tutorial.completion.learnedTitle")}</p>
            <ul class="text-body-sm leading-inherit text-success m-0 pl-4 mt-2 space-y-1">
              <li>${t("build4.tutorial.completion.learnedAdd")}</li>
              <li>${t("build4.tutorial.completion.learnedHandles")}</li>
              <li>${t("build4.tutorial.completion.learnedConfigure")}</li>
              <li>${t("build4.tutorial.completion.learnedConnect")}</li>
              <li>${t("build4.tutorial.completion.learnedSaveRun")}</li>
              <li>${t("build4.tutorial.completion.learnedStatus")}</li>
            </ul>
          </div>
          
          <p class="text-body font-medium text-foreground-emphasis m-0" style="margin-top: 0.75rem;">${t("build4.tutorial.completion.happy")}</p>
        </div>
      `,
      when: {
        show: () => {
          const modal = document.querySelector(
            ".shepherd-modal-overlay-container",
          );
          if (modal) {
            (modal as HTMLElement).style.opacity = "0.3";
          }
        },
      },
      buttons: [
        {
          text: t("build4.tutorial.completion.restart"),
          action: () => {
            tour.cancel();
            setTimeout(() => tour.start(), 100);
          },
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build4.tutorial.completion.finish"),
          action: () => tour.complete(),
        },
      ],
    },
  ];
};
