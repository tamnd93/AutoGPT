import type { MessageKey } from "./en";
import { formatVi } from "./format.vi";
import { home1Vi } from "./home-1.vi";
import { integrationsVi } from "./integrations.vi";
import { nav1Vi } from "./nav-1.vi";
import { nav2Vi } from "./nav-2.vi";
import { nav3Vi } from "./nav-3.vi";
import { navVi } from "./nav.vi";

export const vi: Partial<Record<MessageKey, string>> = {
  ...integrationsVi,
  ...navVi,
  ...formatVi,
  ...nav1Vi,
  ...home1Vi,
  ...nav2Vi,
  ...nav3Vi,
  "common.planSuffix": "gói {plan}",
};
