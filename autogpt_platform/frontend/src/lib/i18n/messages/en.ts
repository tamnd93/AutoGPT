import { integrationsEn } from "./integrations.en";
import { navEn } from "./nav.en";

export const en = {
  ...integrationsEn,
  ...navEn,
  "common.planSuffix": "{plan} plan",
} as const;

export type MessageKey = keyof typeof en;
