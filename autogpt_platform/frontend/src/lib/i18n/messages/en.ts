import { formatEn } from "./format.en";
import { integrationsEn } from "./integrations.en";
import { navEn } from "./nav.en";

export const en = {
  ...integrationsEn,
  ...navEn,
  ...formatEn,
  "common.planSuffix": "{plan} plan",
} as const;

export type MessageKey = keyof typeof en;
