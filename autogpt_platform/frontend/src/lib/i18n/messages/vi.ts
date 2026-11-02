import type { MessageKey } from "./en";
import { auth1Vi } from "./auth-1.vi";
import { auth2Vi } from "./auth-2.vi";
import { chatInput1Vi } from "./chat-input-1.vi";
import { chatInput2Vi } from "./chat-input-2.vi";
import { chatInput3Vi } from "./chat-input-3.vi";
import { chatTools1Vi } from "./chat-tools-1.vi";
import { chatTools2Vi } from "./chat-tools-2.vi";
import { formatVi } from "./format.vi";
import { home1Vi } from "./home-1.vi";
import { home2Vi } from "./home-2.vi";
import { integrationsVi } from "./integrations.vi";
import { marketplace1Vi } from "./marketplace-1.vi";
import { marketplace2Vi } from "./marketplace-2.vi";
import { marketplace3Vi } from "./marketplace-3.vi";
import { navVi } from "./nav.vi";
import { nav1Vi } from "./nav-1.vi";
import { nav2Vi } from "./nav-2.vi";
import { nav3Vi } from "./nav-3.vi";
import { onboarding1Vi } from "./onboarding-1.vi";
import { onboarding2Vi } from "./onboarding-2.vi";
import { onboarding3Vi } from "./onboarding-3.vi";

export const vi: Partial<Record<MessageKey, string>> = {
  ...auth1Vi,
  ...auth2Vi,
  ...chatInput1Vi,
  ...chatInput2Vi,
  ...chatInput3Vi,
  ...chatTools1Vi,
  ...chatTools2Vi,
  ...formatVi,
  ...home1Vi,
  ...home2Vi,
  ...integrationsVi,
  ...marketplace1Vi,
  ...marketplace2Vi,
  ...marketplace3Vi,
  ...navVi,
  ...nav1Vi,
  ...nav2Vi,
  ...nav3Vi,
  ...onboarding1Vi,
  ...onboarding2Vi,
  ...onboarding3Vi,
  "common.planSuffix": "gói {plan}",
};
