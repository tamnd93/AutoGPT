import {
  AlertDiamondIcon,
  SecurityCheckIcon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import type { AutopilotMode } from "../../../../autopilotModeStore";

interface ModeOption {
  value: AutopilotMode;
  /** Catalogue entries the chat composer reads. */
  labelKey: MessageKey;
  descriptionKey: MessageKey;
  /** English fallback for surfaces outside the composer (ExpertModeSection
   *  keeps reading them until its own task moves to this catalogue). */
  label: string;
  description: string;
  icon: IconSvgElement;
}

export const AUTOPILOT_MODE_OPTIONS: ModeOption[] = [
  {
    value: "ask_first",
    labelKey: "chatInput1.mode.askFirst.label",
    descriptionKey: "chatInput1.mode.askFirst.description",
    label: "Ask first",
    description:
      "Asks before every edit or outside action. Work that stays in its sandbox runs.",
    icon: UserCheck01Icon,
  },
  {
    value: "auto",
    labelKey: "chatInput1.mode.auto.label",
    descriptionKey: "chatInput1.mode.auto.description",
    label: "Auto",
    description:
      "Asks before anything leaves the platform, and about edits or commands that look risky.",
    icon: SecurityCheckIcon,
  },
  {
    value: "unsupervised",
    labelKey: "chatInput1.mode.unsupervised.label",
    descriptionKey: "chatInput1.mode.unsupervised.description",
    label: "Unsupervised",
    description: "Never asks. Every action runs without your approval.",
    icon: AlertDiamondIcon,
  },
];

export function getModeOption(mode: AutopilotMode) {
  return (
    AUTOPILOT_MODE_OPTIONS.find((option) => option.value === mode) ??
    AUTOPILOT_MODE_OPTIONS[1]
  );
}

export function isAutopilotMode(value: string): value is AutopilotMode {
  return AUTOPILOT_MODE_OPTIONS.some((option) => option.value === value);
}

export function unsupervisedChatDescription(
  assistantName: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  return getMessage(locale, "chatInput1.mode.unsupervisedConfirmDescription", {
    assistant: assistantName,
  });
}
