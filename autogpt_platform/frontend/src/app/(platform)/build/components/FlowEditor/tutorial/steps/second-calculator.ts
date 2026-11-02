import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build3En } from "@/lib/i18n/messages/build-3.en";
import { getMessage } from "@/lib/i18n/translate";
import {
  waitForNodesCount,
  fitViewToScreen,
  highlightElement,
  removeAllHighlights,
  addSecondCalculatorBlock,
  getSecondCalculatorNode,
} from "../helpers";
import { ICONS } from "../icons";
import { banner } from "../styles";

type TutorialKey = keyof typeof build3En;
type Translate = (key: TutorialKey) => string;

const getSecondCalculatorFormSelector = (): string | HTMLElement => {
  const secondNode = getSecondCalculatorNode();
  if (secondNode) {
    const selector = `[data-id="form-creator-container-${secondNode.id}-node"]`;
    const element = document.querySelector(selector);
    if (element) {
      return element as HTMLElement;
    }
    return selector;
  }
  const formContainers = document.querySelectorAll(
    '[data-id^="form-creator-container-"]',
  );
  if (formContainers.length >= 2) {
    return formContainers[1] as HTMLElement;
  }
  return '[data-id^="form-creator-container-"]';
};

// TODO(tokens): no exact role: text-amber-600 #D97706; no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
const getSecondCalcRequirementsHtml = (t: Translate) => `
  <div id="second-calc-requirements-box" class="mt-3 p-3 bg-warning-surface ring-1 ring-amber-200 rounded-2xl">
    <p id="second-calc-requirements-title" class="text-body leading-5 font-medium text-amber-600 m-0 mb-2">${t("build3.tutorial.secondCalc.requiredTitle")}</p>
    <ul id="second-calc-requirements-list" class="text-body-sm leading-inherit text-amber-600 m-0 pl-4 space-y-1">
      <li id="req2-b" class="flex items-center gap-2">
        <span class="req-icon">○</span> ${t("build3.tutorial.secondCalc.reqB")}
      </li>
      <li id="req2-op" class="flex items-center gap-2">
        <span class="req-icon">○</span> ${t("build3.tutorial.secondCalc.reqOp")}
      </li>
    </ul>
    <p class="text-caption leading-inherit text-warning m-0 mt-2 italic">${t("build3.tutorial.secondCalc.note")}</p>
  </div>
`;

const updateSecondCalcToSuccessState = (t: Translate) => {
  const reqBox = document.querySelector("#second-calc-requirements-box");
  const reqTitle = document.querySelector("#second-calc-requirements-title");
  const reqList = document.querySelector("#second-calc-requirements-list");

  if (reqBox && reqTitle) {
    // TODO(tokens): no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
    reqBox.classList.remove("bg-warning-surface", "ring-amber-200");
    // TODO(tokens): no exact role: ring-green-200 #94D5AC
    reqBox.classList.add("bg-success-surface", "ring-green-200");
    // TODO(tokens): no exact role: text-amber-600 #D97706
    reqTitle.classList.remove("text-amber-600");
    reqTitle.classList.add("text-success");
    reqTitle.innerHTML = t("build3.tutorial.secondCalc.successTitle");
    if (reqList) {
      reqList.classList.add("hidden");
    }
  }
};

const updateSecondCalcToWarningState = (t: Translate) => {
  const reqBox = document.querySelector("#second-calc-requirements-box");
  const reqTitle = document.querySelector("#second-calc-requirements-title");
  const reqList = document.querySelector("#second-calc-requirements-list");

  if (reqBox && reqTitle) {
    // TODO(tokens): no exact role: ring-green-200 #94D5AC
    reqBox.classList.remove("bg-success-surface", "ring-green-200");
    // TODO(tokens): no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
    reqBox.classList.add("bg-warning-surface", "ring-amber-200");
    reqTitle.classList.remove("text-success");
    // TODO(tokens): no exact role: text-amber-600 #D97706
    reqTitle.classList.add("text-amber-600");
    reqTitle.innerHTML = t("build3.tutorial.secondCalc.requiredTitle");
    if (reqList) {
      reqList.classList.remove("hidden");
    }
  }
};

export const createSecondCalculatorSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t: Translate = (key) => getMessage(locale, key);

  return [
    {
      id: "adding-second-calculator",
      title: t("build3.tutorial.secondCalc.addTitle"),
      // TODO(tokens): no exact role: ring-blue-200 #BFDBFE
      text: `
      <div class="text-body text-foreground-emphasis">
        <p class="text-body font-normal text-foreground-emphasis m-0">${t("build3.tutorial.secondCalc.addLine1")}</p>
        <p class="text-body font-normal text-foreground-emphasis m-0" style="margin-top: 0.5rem;">${t("build3.tutorial.secondCalc.addLine2")}</p>
        
        <div class="mt-3 p-3 bg-info-surface ring-1 ring-blue-200 rounded-2xl">
          <p class="text-body leading-5 font-medium text-info-foreground m-0 mb-1">${t("build3.tutorial.secondCalc.chainTitle")}</p>
          <p class="text-body-sm leading-inherit text-info-foreground m-0">Calculator 1 → Calculator 2</p>
          <p class="text-caption leading-inherit text-info m-0 mt-1 italic">${t("build3.tutorial.secondCalc.chainNote")}</p>
        </div>
      </div>
    `,
      buttons: [
        {
          text: t("build3.tutorial.common.back"),
          action: () => tour.back(),
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build3.tutorial.secondCalc.addButton"),
          action: () => tour.next(),
        },
      ],
    },

    {
      id: "second-calculator-added",
      title: t("build3.tutorial.secondCalc.addedTitle"),
      // TODO(tokens): no exact role: ring-green-200 #94D5AC
      text: `
      <div class="text-body text-foreground-emphasis">
        <p class="text-body font-normal text-foreground-emphasis m-0">${t("build3.tutorial.secondCalc.addedLine1")}</p>
        <p class="text-body font-normal text-foreground-emphasis m-0" style="margin-top: 0.5rem;">${t("build3.tutorial.secondCalc.addedLine2")}</p>
        
        <div class="mt-3 p-3 bg-success-surface ring-1 ring-green-200 rounded-2xl">
          <p class="text-body leading-5 font-medium text-success m-0">${t("build3.tutorial.secondCalc.addedLine3")}</p>
        </div>
      </div>
    `,
      beforeShowPromise: async () => {
        addSecondCalculatorBlock();
        await waitForNodesCount(2, 5000);
        await new Promise((resolve) => setTimeout(resolve, 500));
        fitViewToScreen();
      },
      buttons: [
        {
          text: t("build3.tutorial.secondCalc.configureButton"),
          action: () => tour.next(),
        },
      ],
    },

    {
      id: "configure-second-calculator",
      title: t("build3.tutorial.secondCalc.configureTitle"),
      text: `
      <div class="text-body text-foreground-emphasis">
        <p class="text-body font-normal text-foreground-emphasis m-0">${t("build3.tutorial.secondCalc.configureLine")}</p>
        ${getSecondCalcRequirementsHtml(t)}
        ${banner(
          ICONS.ClickIcon,
          t("build3.tutorial.secondCalc.configureBanner"),
          "action",
        )}
      </div>
    `,
      beforeShowPromise: async () => {
        fitViewToScreen();
        await new Promise<void>((resolve) => {
          const checkNode = () => {
            const secondNode = getSecondCalculatorNode();
            if (secondNode) {
              const formContainer = document.querySelector(
                `[data-id="form-creator-container-${secondNode.id}-node"]`,
              );
              if (formContainer) {
                resolve();
              } else {
                setTimeout(checkNode, 100);
              }
            } else {
              setTimeout(checkNode, 100);
            }
          };
          checkNode();
        });
      },
      attachTo: {
        element: getSecondCalculatorFormSelector,
        on: "right",
      },
      when: {
        show: () => {
          const secondNode = getSecondCalculatorNode();
          if (secondNode) {
            highlightElement(`[data-id="custom-node-${secondNode.id}"]`);
          }

          let wasComplete = false;

          const checkInterval = setInterval(() => {
            const secondNode = getSecondCalculatorNode();
            if (!secondNode) return;

            const hardcodedValues = secondNode.data?.hardcodedValues || {};
            const hasB =
              hardcodedValues.b !== undefined &&
              hardcodedValues.b !== null &&
              hardcodedValues.b !== "";
            const hasOp =
              hardcodedValues.operation !== undefined &&
              hardcodedValues.operation !== null &&
              hardcodedValues.operation !== "";

            const allComplete = hasB && hasOp;

            const reqB = document.querySelector("#req2-b .req-icon");
            const reqOp = document.querySelector("#req2-op .req-icon");

            if (reqB) reqB.textContent = hasB ? "✓" : "○";
            if (reqOp) reqOp.textContent = hasOp ? "✓" : "○";

            const reqBEl = document.querySelector("#req2-b");
            const reqOpEl = document.querySelector("#req2-op");

            if (reqBEl) {
              reqBEl.classList.toggle("text-success", hasB);
              // TODO(tokens): no exact role: text-amber-600 #D97706
              reqBEl.classList.toggle("text-amber-600", !hasB);
            }
            if (reqOpEl) {
              reqOpEl.classList.toggle("text-success", hasOp);
              // TODO(tokens): no exact role: text-amber-600 #D97706
              reqOpEl.classList.toggle("text-amber-600", !hasOp);
            }

            if (allComplete && !wasComplete) {
              updateSecondCalcToSuccessState(t);
              wasComplete = true;
            } else if (!allComplete && wasComplete) {
              updateSecondCalcToWarningState(t);
              wasComplete = false;
            }

            const nextBtn = document.querySelector(
              ".shepherd-button-primary",
            ) as HTMLButtonElement;
            if (nextBtn) {
              nextBtn.style.opacity = allComplete ? "1" : "0.5";
              nextBtn.style.pointerEvents = allComplete ? "auto" : "none";
            }
          }, 300);

          (window as any).__tutorialSecondCalcInterval = checkInterval;
        },
        hide: () => {
          removeAllHighlights();
          if ((window as any).__tutorialSecondCalcInterval) {
            clearInterval((window as any).__tutorialSecondCalcInterval);
            delete (window as any).__tutorialSecondCalcInterval;
          }
        },
      },
      buttons: [
        {
          text: t("build3.tutorial.common.back"),
          action: () => tour.back(),
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build3.tutorial.common.continue"),
          action: () => {
            const secondNode = getSecondCalculatorNode();
            if (!secondNode) return;

            const hardcodedValues = secondNode.data?.hardcodedValues || {};
            const hasB =
              hardcodedValues.b !== undefined &&
              hardcodedValues.b !== null &&
              hardcodedValues.b !== "";
            const hasOp =
              hardcodedValues.operation !== undefined &&
              hardcodedValues.operation !== null &&
              hardcodedValues.operation !== "";

            if (hasB && hasOp) {
              tour.next();
            }
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
  ];
};
