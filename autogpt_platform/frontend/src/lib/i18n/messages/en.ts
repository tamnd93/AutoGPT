import { chatInput1En } from "./chat-input-1.en";
import { chatInput2En } from "./chat-input-2.en";
import { chatTools1En } from "./chat-tools-1.en";
import { formatEn } from "./format.en";
import { home1En } from "./home-1.en";
import { home2En } from "./home-2.en";
import { integrationsEn } from "./integrations.en";
import { nav1En } from "./nav-1.en";
import { nav2En } from "./nav-2.en";
import { nav3En } from "./nav-3.en";
import { navEn } from "./nav.en";
import { onboarding1En } from "./onboarding-1.en";

export const en = {
  ...integrationsEn,
  ...navEn,
  ...formatEn,
  ...nav1En,
  ...home1En,
  ...home2En,
  ...nav2En,
  ...nav3En,
  ...chatInput1En,
  ...chatInput2En,
  ...chatTools1En,
  ...onboarding1En,
  "common.planSuffix": "{plan} plan",
} as const;

export type MessageKey = keyof typeof en;
