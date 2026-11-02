import { chatInput1En } from "./chat-input-1.en";
import { chatInput2En } from "./chat-input-2.en";
import { chatInput3En } from "./chat-input-3.en";
import { chatTools1En } from "./chat-tools-1.en";
import { chatTools2En } from "./chat-tools-2.en";
import { formatEn } from "./format.en";
import { home1En } from "./home-1.en";
import { home2En } from "./home-2.en";
import { integrationsEn } from "./integrations.en";
import { marketplace1En } from "./marketplace-1.en";
import { nav1En } from "./nav-1.en";
import { nav2En } from "./nav-2.en";
import { nav3En } from "./nav-3.en";
import { navEn } from "./nav.en";
import { onboarding1En } from "./onboarding-1.en";
import { onboarding2En } from "./onboarding-2.en";
import { onboarding3En } from "./onboarding-3.en";

export const en = {
  ...chatInput1En,
  ...chatInput2En,
  ...chatInput3En,
  ...chatTools1En,
  ...chatTools2En,
  ...formatEn,
  ...home1En,
  ...home2En,
  ...integrationsEn,
  ...marketplace1En,
  ...nav1En,
  ...nav2En,
  ...nav3En,
  ...navEn,
  ...onboarding1En,
  ...onboarding2En,
  ...onboarding3En,
  "common.planSuffix": "{plan} plan",
} as const;

export type MessageKey = keyof typeof en;
