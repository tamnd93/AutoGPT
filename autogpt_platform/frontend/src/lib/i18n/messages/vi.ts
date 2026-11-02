import type { MessageKey } from "./en";
import { chatInput1Vi } from "./chat-input-1.vi";
import { chatInput2Vi } from "./chat-input-2.vi";
import { chatInput3Vi } from "./chat-input-3.vi";
import { chatTools1Vi } from "./chat-tools-1.vi";
import { formatVi } from "./format.vi";
import { home1Vi } from "./home-1.vi";
import { home2Vi } from "./home-2.vi";
import { integrationsVi } from "./integrations.vi";
import { navVi } from "./nav.vi";
import { nav1Vi } from "./nav-1.vi";
import { nav2Vi } from "./nav-2.vi";
import { nav3Vi } from "./nav-3.vi";
import { onboarding1Vi } from "./onboarding-1.vi";
import { onboarding2Vi } from "./onboarding-2.vi";
import { onboarding3Vi } from "./onboarding-3.vi";

export const vi: Partial<Record<MessageKey, string>> = {
  ...chatInput1Vi,
  ...chatInput2Vi,
  ...chatInput3Vi,
  ...chatTools1Vi,
  ...formatVi,
  ...home1Vi,
  ...home2Vi,
  ...integrationsVi,
  ...navVi,
  ...nav1Vi,
  ...nav2Vi,
  ...nav3Vi,
  ...onboarding1Vi,
  ...onboarding2Vi,
  ...onboarding3Vi,
  "common.planSuffix": "gói {plan}",
};
