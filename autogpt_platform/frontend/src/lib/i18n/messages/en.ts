import { formatEn } from "./format.en";
import { integrationsEn } from "./integrations.en";
import { nav1En } from "./nav-1.en";
import { nav2En } from "./nav-2.en";
import { nav3En } from "./nav-3.en";
import { navEn } from "./nav.en";

export const en = {
  ...integrationsEn,
  ...navEn,
  ...formatEn,
  ...nav1En,
  ...nav2En,
  ...nav3En,
  "common.planSuffix": "{plan} plan",
} as const;

export type MessageKey = keyof typeof en;
