import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build4En } from "@/lib/i18n/messages/build-4.en";
import { getMessage } from "@/lib/i18n/translate";
import { TUTORIAL_SELECTORS } from "../constants";
import {
  fitViewToScreen,
  highlightElement,
  removeAllHighlights,
  getFirstNode,
} from "../helpers";
import { ICONS } from "../icons";
import { banner } from "../styles";

type TutorialKey = keyof typeof build4En;
type Translate = (key: TutorialKey) => string;

// TODO(tokens): no exact role: text-amber-600 #D97706; no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
const getRequirementsHtml = (t: Translate) => `
  <div id="requirements-box" class="mt-3 p-3 bg-warning-surface ring-1 ring-amber-200 rounded-2xl">
    <p id="requirements-title" class="text-body leading-5 font-medium text-amber-600 m-0 mb-2">${t("build4.tutorial.configure.requirementsTitle")}</p>
    <ul id="requirements-list" class="text-body-sm leading-inherit text-amber-600 m-0 pl-4 space-y-1">
      <li id="req-a" class="flex items-center gap-2">
        <span class="req-icon">○</span> ${t("build4.tutorial.configure.reqA")}
      </li>
      <li id="req-b" class="flex items-center gap-2">
        <span class="req-icon">○</span> ${t("build4.tutorial.configure.reqB")}
      </li>
      <li id="req-op" class="flex items-center gap-2">
        <span class="req-icon">○</span> ${t("build4.tutorial.configure.reqOp")}
      </li>
    </ul>
  </div>
`;

const updateToSuccessState = (t: Translate) => {
  const reqBox = document.querySelector("#requirements-box");
  const reqTitle = document.querySelector("#requirements-title");
  const reqList = document.querySelector("#requirements-list");

  if (reqBox && reqTitle) {
    // TODO(tokens): no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
    reqBox.classList.remove("bg-warning-surface", "ring-amber-200");
    // TODO(tokens): no exact role: ring-green-200 #94D5AC
    reqBox.classList.add("bg-success-surface", "ring-green-200");
    // TODO(tokens): no exact role: text-amber-600 #D97706
    reqTitle.classList.remove("text-amber-600");
    reqTitle.classList.add("text-success");
    reqTitle.innerHTML = t("build4.tutorial.configure.successTitle");
    if (reqList) {
      reqList.classList.add("hidden");
    }
  }
};

const updateToWarningState = (t: Translate) => {
  const reqBox = document.querySelector("#requirements-box");
  const reqTitle = document.querySelector("#requirements-title");
  const reqList = document.querySelector("#requirements-list");

  if (reqBox && reqTitle) {
    // TODO(tokens): no exact role: ring-green-200 #94D5AC
    reqBox.classList.remove("bg-success-surface", "ring-green-200");
    // TODO(tokens): no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
    reqBox.classList.add("bg-warning-surface", "ring-amber-200");
    reqTitle.classList.remove("text-success");
    // TODO(tokens): no exact role: text-amber-600 #D97706
    reqTitle.classList.add("text-amber-600");
    reqTitle.innerHTML = t("build4.tutorial.configure.requirementsTitle");
    if (reqList) {
      reqList.classList.remove("hidden");
    }
  }
};

export const createConfigureCalculatorSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t: Translate = (key) => getMessage(locale, key);

  return [
    {
      id: "enter-values",
      title: t("build4.tutorial.configure.title"),
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.configure.line")}</p>
          ${getRequirementsHtml(t)}
          ${banner(
            ICONS.ClickIcon,
            t("build4.tutorial.configure.banner"),
            "action",
          )}
        </div>
      `,
      beforeShowPromise: () => {
        fitViewToScreen();
        return Promise.resolve();
      },
      attachTo: {
        element: TUTORIAL_SELECTORS.CALCULATOR_NODE_FORM_CONTAINER,
        on: "right",
      },
      when: {
        show: () => {
          const node = getFirstNode();
          if (node) {
            highlightElement(`[data-id="custom-node-${node.id}"]`);
          }

          let wasComplete = false;

          const checkInterval = setInterval(() => {
            const node = getFirstNode();
            if (!node) return;

            const hardcodedValues = node.data?.hardcodedValues || {};
            const hasA =
              hardcodedValues.a !== undefined &&
              hardcodedValues.a !== null &&
              hardcodedValues.a !== "";
            const hasB =
              hardcodedValues.b !== undefined &&
              hardcodedValues.b !== null &&
              hardcodedValues.b !== "";
            const hasOp =
              hardcodedValues.operation !== undefined &&
              hardcodedValues.operation !== null &&
              hardcodedValues.operation !== "";

            const allComplete = hasA && hasB && hasOp;

            const reqA = document.querySelector("#req-a .req-icon");
            const reqB = document.querySelector("#req-b .req-icon");
            const reqOp = document.querySelector("#req-op .req-icon");

            if (reqA) reqA.textContent = hasA ? "✓" : "○";
            if (reqB) reqB.textContent = hasB ? "✓" : "○";
            if (reqOp) reqOp.textContent = hasOp ? "✓" : "○";

            const reqAEl = document.querySelector("#req-a");
            const reqBEl = document.querySelector("#req-b");
            const reqOpEl = document.querySelector("#req-op");

            if (reqAEl) {
              reqAEl.classList.toggle("text-success", hasA);
              // TODO(tokens): no exact role: text-amber-600 #D97706
              reqAEl.classList.toggle("text-amber-600", !hasA);
            }
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
              updateToSuccessState(t);
              wasComplete = true;
            } else if (!allComplete && wasComplete) {
              updateToWarningState(t);
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

          (window as any).__tutorialCheckInterval = checkInterval;
        },
        hide: () => {
          removeAllHighlights();
          if ((window as any).__tutorialCheckInterval) {
            clearInterval((window as any).__tutorialCheckInterval);
            delete (window as any).__tutorialCheckInterval;
          }
        },
      },
      buttons: [
        {
          text: t("build4.tutorial.common.back"),
          action: () => tour.back(),
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build4.tutorial.configure.continue"),
          action: () => {
            const node = getFirstNode();
            if (!node) return;

            const hardcodedValues = node.data?.hardcodedValues || {};
            const hasA =
              hardcodedValues.a !== undefined &&
              hardcodedValues.a !== null &&
              hardcodedValues.a !== "";
            const hasB =
              hardcodedValues.b !== undefined &&
              hardcodedValues.b !== null &&
              hardcodedValues.b !== "";
            const hasOp =
              hardcodedValues.operation !== undefined &&
              hardcodedValues.operation !== null &&
              hardcodedValues.operation !== "";

            if (hasA && hasB && hasOp) {
              tour.next();
            }
          },
          classes: "shepherd-button-primary",
        },
      ],
    },
  ];
};
