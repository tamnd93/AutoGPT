import { StepOptions } from "shepherd.js";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { createWelcomeSteps } from "./welcome";
import { createBlockMenuSteps } from "./block-menu";
import { createBlockBasicsSteps } from "./block-basics";
import { createConfigureCalculatorSteps } from "./configure-calculator";
import { createSecondCalculatorSteps } from "./second-calculator";
import { createConnectionSteps } from "./connections";
import { createSaveSteps } from "./save";
import { createRunSteps } from "./run";
import { createCompletionSteps } from "./completion";

export const createTutorialSteps = (
  tour: any,
  locale: Locale = DEFAULT_LOCALE,
): StepOptions[] => [
  ...createWelcomeSteps(tour, locale),
  ...createBlockMenuSteps(tour, locale),
  ...createBlockBasicsSteps(tour, locale),
  ...createConfigureCalculatorSteps(tour, locale),
  ...createSecondCalculatorSteps(tour, locale),
  ...createConnectionSteps(tour, locale),
  ...createSaveSteps(locale),
  ...createRunSteps(tour, locale),
  ...createCompletionSteps(tour, locale),
];
