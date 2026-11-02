import type { MessageKey } from "./en";
import { chatInput1Vi } from "./chat-input-1.vi";
import { chatInput2Vi } from "./chat-input-2.vi";
import { formatVi } from "./format.vi";
import { home1Vi } from "./home-1.vi";
import { home2Vi } from "./home-2.vi";
import { integrationsVi } from "./integrations.vi";
import { nav1Vi } from "./nav-1.vi";
import { nav2Vi } from "./nav-2.vi";
import { nav3Vi } from "./nav-3.vi";
import { navVi } from "./nav.vi";
import { onboarding1Vi } from "./onboarding-1.vi";

export const vi: Partial<Record<MessageKey, string>> = {
  ...integrationsVi,
  ...navVi,
  ...formatVi,
  ...nav1Vi,
  ...home1Vi,
  ...home2Vi,
  ...nav2Vi,
  ...nav3Vi,
  ...chatInput1Vi,
  ...chatInput2Vi,
  ...onboarding1Vi,
  "common.planSuffix": "gói {plan}",
};
