import type { MessageKey } from "./en";
import { formatVi } from "./format.vi";
import { integrationsVi } from "./integrations.vi";
import { nav1Vi } from "./nav-1.vi";
import { navVi } from "./nav.vi";

export const vi: Partial<Record<MessageKey, string>> = {
  ...integrationsVi,
  ...navVi,
  ...formatVi,
  ...nav1Vi,
  "common.planSuffix": "gói {plan}",
};
