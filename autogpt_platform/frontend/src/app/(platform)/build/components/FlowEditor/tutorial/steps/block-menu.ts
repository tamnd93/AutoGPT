import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build4En } from "@/lib/i18n/messages/build-4.en";
import { getMessage } from "@/lib/i18n/translate";
import { TUTORIAL_CONFIG, TUTORIAL_SELECTORS, BLOCK_IDS } from "../constants";
import {
  waitForElement,
  forceBlockMenuOpen,
  focusElement,
  highlightElement,
  removeAllHighlights,
  disableOtherBlocks,
  enableAllBlocks,
  pulseElement,
  highlightFirstBlockInSearch,
} from "../helpers";
import { ICONS } from "../icons";
import { banner } from "../styles";
import { useNodeStore } from "../../../../stores/nodeStore";

type TutorialKey = keyof typeof build4En;

export const createBlockMenuSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t = (key: TutorialKey) => getMessage(locale, key);

  return [
    {
      id: "open-block-menu",
      title: t("build4.tutorial.blockMenu.openTitle"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.blockMenu.openLine")}</p>
          ${banner(
            ICONS.ClickIcon,
            t("build4.tutorial.blockMenu.openBanner"),
            "action",
          )}
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.BLOCKS_TRIGGER,
        on: "right",
      },
      advanceOn: {
        selector: TUTORIAL_SELECTORS.BLOCKS_TRIGGER,
        event: "click",
      },
      buttons: [],
      when: {
        show: () => {
          highlightElement(TUTORIAL_SELECTORS.BLOCKS_TRIGGER);
        },
        hide: () => {
          removeAllHighlights();
        },
      },
    },

    {
      id: "block-menu-overview",
      title: t("build4.tutorial.blockMenu.overviewTitle"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.blockMenu.overviewLine")}</p>
          <p class="text-body font-medium text-foreground-emphasis m-0" style="margin-top: 0.5rem;">${t("build4.tutorial.blockMenu.overviewIntro")}</p>
          <ul>
            <li>${t("build4.tutorial.blockMenu.overviewInput")}</li>
            <li>${t("build4.tutorial.blockMenu.overviewAction")}</li>
            <li>${t("build4.tutorial.blockMenu.overviewOutput")}</li>
            <li>${t("build4.tutorial.blockMenu.overviewIntegrations")}</li>
            <li>${t("build4.tutorial.blockMenu.overviewLibrary")}</li>
            <li>${t("build4.tutorial.blockMenu.overviewMarketplace")}</li>
          </ul>
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.BLOCKS_CONTENT,
        on: "left",
      },
      beforeShowPromise: () =>
        waitForElement(TUTORIAL_SELECTORS.BLOCKS_CONTENT),
      when: {
        show: () => forceBlockMenuOpen(true),
      },
      buttons: [
        {
          text: t("build4.tutorial.common.next"),
          action: () => tour.next(),
        },
      ],
    },

    {
      id: "search-calculator",
      title: t("build4.tutorial.blockMenu.searchTitle"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.blockMenu.searchLine")}</p>
          ${banner(
            ICONS.Keyboard,
            t("build4.tutorial.blockMenu.searchBanner"),
            "action",
          )}
          <p class="text-caption font-normal text-foreground-tertiary m-0" style="margin-top: 0.5rem;">${t("build4.tutorial.blockMenu.searchNote")}</p>
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.BLOCKS_SEARCH_INPUT_BOX,
        on: "bottom",
      },
      beforeShowPromise: () =>
        waitForElement(TUTORIAL_SELECTORS.BLOCKS_SEARCH_INPUT_BOX),
      when: {
        show: () => {
          forceBlockMenuOpen(true);
          setTimeout(() => {
            focusElement(TUTORIAL_SELECTORS.BLOCKS_SEARCH_INPUT_BOX);
          }, 100);

          const checkForCalculator = setInterval(() => {
            const calcBlock = document.querySelector(
              TUTORIAL_SELECTORS.BLOCK_CARD_CALCULATOR_IN_SEARCH,
            );
            if (calcBlock) {
              clearInterval(checkForCalculator);

              const searchInput = document.querySelector(
                TUTORIAL_SELECTORS.BLOCKS_SEARCH_INPUT,
              ) as HTMLInputElement;
              if (searchInput) {
                searchInput.blur();
              }

              disableOtherBlocks(
                TUTORIAL_SELECTORS.BLOCK_CARD_CALCULATOR_IN_SEARCH,
              );
              pulseElement(TUTORIAL_SELECTORS.BLOCK_CARD_CALCULATOR_IN_SEARCH);
              calcBlock.scrollIntoView({ behavior: "smooth", block: "center" });
              setTimeout(() => {
                tour.next();
              }, 300);
            }
          }, TUTORIAL_CONFIG.ELEMENT_CHECK_INTERVAL);

          (window as any).__tutorialCalcInterval = checkForCalculator;
        },
        hide: () => {
          if ((window as any).__tutorialCalcInterval) {
            clearInterval((window as any).__tutorialCalcInterval);
            delete (window as any).__tutorialCalcInterval;
          }
          enableAllBlocks();
        },
      },
      buttons: [],
    },

    {
      id: "select-calculator",
      title: t("build4.tutorial.blockMenu.addTitle"),
      // TODO(tokens): no fitting role for bg-zinc-100 #EFEFF0; #EFEFF0 is surface-hover, a hover fill, and this fill is not a hover state (QUALITY 41); no fitting role for ring-zinc-200 #DADADC; #DADADC is border-base (a border colour) and surface-active (an active-state fill), and this is a ring (QUALITY 41(b))
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.blockMenu.addLine")}</p>
          ${banner(
            ICONS.ClickIcon,
            t("build4.tutorial.blockMenu.addBanner"),
            "action",
          )}
          
          <div class="bg-zinc-100 ring-1 ring-zinc-200 rounded-2xl p-2 px-4 mt-2 flex items-start gap-2 text-body leading-5 font-medium text-foreground-secondary">  
            <span class="flex-shrink-0">${ICONS.Drag}</span>
            <span>${t("build4.tutorial.blockMenu.dragNote")}</span>
          </div>
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.BLOCK_CARD_CALCULATOR,
        on: "left",
      },
      beforeShowPromise: async () => {
        forceBlockMenuOpen(true);
        await waitForElement(TUTORIAL_SELECTORS.BLOCK_CARD_CALCULATOR, 5000);
        await new Promise((resolve) => setTimeout(resolve, 100));
      },
      when: {
        show: () => {
          const calcBlock = document.querySelector(
            TUTORIAL_SELECTORS.BLOCK_CARD_CALCULATOR,
          );
          if (calcBlock) {
            disableOtherBlocks(TUTORIAL_SELECTORS.BLOCK_CARD_CALCULATOR);
          } else {
            highlightFirstBlockInSearch();
          }

          const CALCULATOR_BLOCK_ID = BLOCK_IDS.CALCULATOR;

          const initialNodeCount = useNodeStore.getState().nodes.length;

          const unsubscribe = useNodeStore.subscribe((state) => {
            if (state.nodes.length > initialNodeCount) {
              const calculatorNode = state.nodes.find(
                (node) => node.data?.block_id === CALCULATOR_BLOCK_ID,
              );

              if (calculatorNode) {
                unsubscribe();
                enableAllBlocks();
                forceBlockMenuOpen(false);
                tour.next();
              }
            }
          });

          (tour.getCurrentStep() as any)._nodeUnsubscribe = unsubscribe;
        },
      },
    },
  ];
};
