import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { build4En } from "@/lib/i18n/messages/build-4.en";
import { getMessage } from "@/lib/i18n/translate";
import {
  fitViewToScreen,
  highlightElement,
  removeAllHighlights,
} from "../helpers";
import { ICONS } from "../icons";
import { banner } from "../styles";
import { useEdgeStore } from "../../../../stores/edgeStore";
import { TUTORIAL_SELECTORS } from "../constants";

type TutorialKey = keyof typeof build4En;
type Translate = (key: TutorialKey) => string;

// TODO(tokens): no exact role: ring-green-200 #94D5AC, text-amber-600 #D97706; no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
const getConnectionStatusHtml = (
  t: Translate,
  id: string,
  isConnected: boolean = false,
) => `
  <div id="${id}" class="mt-3 p-2 ${isConnected ? "bg-success-surface ring-1 ring-green-200" : "bg-warning-surface ring-1 ring-amber-200"} rounded-2xl text-center text-body leading-5 ${isConnected ? "text-success" : "text-amber-600"}">
    ${isConnected ? t("build4.tutorial.connections.connected") : t("build4.tutorial.connections.waiting")}
  </div>
`;

const updateConnectionStatus = (
  t: Translate,
  id: string,
  isConnected: boolean,
  message?: string,
) => {
  const statusEl = document.querySelector(`#${id}`);
  if (statusEl) {
    statusEl.innerHTML =
      message ||
      (isConnected
        ? t("build4.tutorial.connections.connected")
        : t("build4.tutorial.connections.waiting"));
    statusEl.classList.remove(
      "bg-warning-surface",
      // TODO(tokens): no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
      "ring-amber-200",
      // TODO(tokens): no exact role: text-amber-600 #D97706
      "text-amber-600",
      "bg-success-surface",
      // TODO(tokens): no exact role: ring-green-200 #94D5AC
      "ring-green-200",
      "text-success",
    );
    if (isConnected) {
      // TODO(tokens): no exact role: ring-green-200 #94D5AC
      statusEl.classList.add(
        "bg-success-surface",
        // TODO(tokens): no exact role: ring-green-200 #94D5AC
        "ring-green-200",
        "text-success",
      );
    } else {
      // TODO(tokens): no exact role: text-amber-600 #D97706
      statusEl.classList.add(
        "bg-warning-surface",
        // TODO(tokens): no fitting role for ring-amber-200 #FDE68A; #FDE68A is warning-border (a border colour), and this is a ring (QUALITY 41(b))
        "ring-amber-200",
        // TODO(tokens): no exact role: text-amber-600 #D97706
        "text-amber-600",
      );
    }
  }
};

const hasAnyEdge = (): boolean => {
  return useEdgeStore.getState().edges.length > 0;
};

// Shepherd 14 positions the popover via @floating-ui/dom (absolute left/top),
// so CSS margins don't move it. Use a floating-ui offset middleware to push the
// popover away from the handle, leaving room to grab and drag the connection.
export const CONNECTION_STEP_OFFSET = 72;

export const connectionHandleOffset = ({
  placement,
  x,
  y,
}: {
  placement: string;
  x: number;
  y: number;
}): { x?: number; y?: number } => {
  const side = placement.split("-")[0];
  if (side === "left") return { x: x - CONNECTION_STEP_OFFSET };
  if (side === "right") return { x: x + CONNECTION_STEP_OFFSET };
  if (side === "top") return { y: y - CONNECTION_STEP_OFFSET };
  if (side === "bottom") return { y: y + CONNECTION_STEP_OFFSET };
  return {};
};

const connectionFloatingOptions: StepOptions["floatingUIOptions"] = {
  middleware: [
    {
      name: "connectionHandleOffset",
      fn: (state) =>
        connectionHandleOffset({
          placement: state.placement,
          x: state.x,
          y: state.y,
        }),
    },
  ],
};

export const createConnectionSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => {
  const t: Translate = (key) => getMessage(locale, key);
  let isConnecting = false;

  const handleMouseDown = () => {
    isConnecting = true;

    const inputSelector =
      TUTORIAL_SELECTORS.FIRST_CALCULATOR_RESULT_OUTPUT_HANDLER;
    if (inputSelector) {
      highlightElement(inputSelector);
    }

    setTimeout(() => {
      if (isConnecting) {
        tour.next();
      }
    }, 100);
  };

  const resetConnectionState = () => {
    isConnecting = false;
  };

  return [
    {
      id: "connect-blocks-output",
      title: t("build4.tutorial.connections.outputTitle"),
      // TODO(tokens): no exact role: ring-blue-200 #BFDBFE
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.connections.outputLine")}</p>
          
          <div class="mt-3 p-3 bg-info-surface ring-1 ring-blue-200 rounded-2xl">
            <p class="text-body leading-5 font-medium text-info-foreground m-0 mb-2">${t("build4.tutorial.connections.outputDragTitle")}</p>
            <p class="text-body-sm leading-inherit text-info-foreground m-0">${t("build4.tutorial.connections.outputDragLine")}</p>
          </div>
          ${getConnectionStatusHtml(t, "connection-status-output", false)}
          ${banner(
            ICONS.Drag,
            t("build4.tutorial.connections.outputBanner"),
            "action",
          )}
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.FIRST_CALCULATOR_RESULT_OUTPUT_HANDLER,
        on: "left",
      },
      floatingUIOptions: connectionFloatingOptions,

      when: {
        show: () => {
          resetConnectionState();

          if (hasAnyEdge()) {
            updateConnectionStatus(
              t,
              "connection-status-output",
              true,
              t("build4.tutorial.connections.alreadyConnected"),
            );
            setTimeout(() => {
              tour.next();
            }, 1000);
            return;
          }

          const outputSelector =
            TUTORIAL_SELECTORS.FIRST_CALCULATOR_RESULT_OUTPUT_HANDLER;
          if (outputSelector) {
            const outputHandle = document.querySelector(outputSelector);
            if (outputHandle) {
              highlightElement(outputSelector);
              outputHandle.addEventListener("mousedown", handleMouseDown);
            }
          }

          const unsubscribe = useEdgeStore.subscribe(() => {
            if (hasAnyEdge()) {
              updateConnectionStatus(t, "connection-status-output", true);
              setTimeout(() => {
                unsubscribe();
                tour.next();
              }, 500);
            }
          });

          (tour.getCurrentStep() as any)._edgeUnsubscribe = unsubscribe;
        },
        hide: () => {
          removeAllHighlights();
          const step = tour.getCurrentStep() as any;
          if (step?._edgeUnsubscribe) {
            step._edgeUnsubscribe();
          }
          const outputSelector =
            TUTORIAL_SELECTORS.FIRST_CALCULATOR_RESULT_OUTPUT_HANDLER;
          if (outputSelector) {
            const outputHandle = document.querySelector(outputSelector);
            if (outputHandle) {
              outputHandle.removeEventListener("mousedown", handleMouseDown);
            }
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
          text: t("build4.tutorial.common.skipConnected"),
          action: () => tour.show("connection-complete"),
          classes: "shepherd-button-secondary",
        },
      ],
    },

    {
      id: "connect-blocks-input",
      title: t("build4.tutorial.connections.inputTitle"),
      // TODO(tokens): no exact role: ring-blue-200 #BFDBFE
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.connections.inputLine")}</p>
          
          <div class="mt-3 p-3 bg-info-surface ring-1 ring-blue-200 rounded-2xl">
            <p class="text-body leading-5 font-medium text-info-foreground m-0 mb-2">${t("build4.tutorial.connections.inputDropTitle")}</p>
            <p class="text-body-sm leading-inherit text-info-foreground m-0">${t("build4.tutorial.connections.inputDragLine")}</p>
          </div>
          ${getConnectionStatusHtml(t, "connection-status-input", false)}
        </div>
      `,
      attachTo: {
        element: TUTORIAL_SELECTORS.SECOND_CALCULATOR_NUMBER_A_INPUT_HANDLER,
        on: "right",
      },
      floatingUIOptions: connectionFloatingOptions,
      when: {
        show: () => {
          const inputSelector =
            TUTORIAL_SELECTORS.SECOND_CALCULATOR_NUMBER_A_INPUT_HANDLER;
          if (inputSelector) {
            highlightElement(inputSelector);
          }

          if (hasAnyEdge()) {
            updateConnectionStatus(
              t,
              "connection-status-input",
              true,
              t("build4.tutorial.connections.connected"),
            );
            setTimeout(() => {
              tour.next();
            }, 500);
            return;
          }

          const unsubscribe = useEdgeStore.subscribe(() => {
            if (hasAnyEdge()) {
              updateConnectionStatus(t, "connection-status-input", true);
              setTimeout(() => {
                unsubscribe();
                tour.next();
              }, 500);
            }
          });

          (tour.getCurrentStep() as any)._edgeUnsubscribe = unsubscribe;

          const handleMouseUp = () => {
            setTimeout(() => {
              if (!hasAnyEdge()) {
                isConnecting = false;
                tour.show("connect-blocks-output");
              }
            }, 200);
          };
          document.addEventListener("mouseup", handleMouseUp, true);
          (tour.getCurrentStep() as any)._mouseUpHandler = handleMouseUp;
        },
        hide: () => {
          removeAllHighlights();
          const step = tour.getCurrentStep() as any;
          if (step?._edgeUnsubscribe) {
            step._edgeUnsubscribe();
          }
          if (step?._mouseUpHandler) {
            document.removeEventListener("mouseup", step._mouseUpHandler, true);
          }
        },
      },
      buttons: [
        {
          text: t("build4.tutorial.common.back"),
          action: () => tour.show("connect-blocks-output"),
          classes: "shepherd-button-secondary",
        },
        {
          text: t("build4.tutorial.common.skipConnected"),
          action: () => tour.next(),
          classes: "shepherd-button-secondary",
        },
      ],
    },

    {
      id: "connection-complete",
      title: t("build4.tutorial.connections.completeTitle"),
      // TODO(tokens): no exact role: ring-green-200 #94D5AC, text-green-500 #16A34A
      text: `
        <div class="text-body text-foreground-emphasis">
          <p class="text-body font-normal text-foreground-emphasis m-0">${t("build4.tutorial.connections.completeLine")}</p>
          
          <div class="mt-3 p-3 bg-success-surface ring-1 ring-green-200 rounded-2xl">
            <div class="flex items-center justify-center gap-2 text-body leading-5 font-medium text-success">
              <span>Calculator 1</span>
              <span>→</span>
              <span>Calculator 2</span>
            </div>
            <p class="text-caption leading-inherit text-green-500 m-0 mt-2 text-center italic">${t("build4.tutorial.connections.completeNote")}</p>
          </div>
          
          <p class="text-body font-normal text-foreground-emphasis m-0" style="margin-top: 0.75rem;">${t("build4.tutorial.connections.completeNext")}</p>
        </div>
      `,
      beforeShowPromise: async () => {
        fitViewToScreen();
        return Promise.resolve();
      },
      buttons: [
        {
          text: t("build4.tutorial.connections.saveButton"),
          action: () => tour.next(),
        },
      ],
    },
  ];
};
