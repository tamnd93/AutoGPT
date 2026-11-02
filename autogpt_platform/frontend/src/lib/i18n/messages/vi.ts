import type { MessageKey } from "./en";
import { integrationsVi } from "./integrations.vi";
import { navVi } from "./nav.vi";

export const vi: Partial<Record<MessageKey, string>> = {
  ...integrationsVi,
  ...navVi,
  "common.planSuffix": "gói {plan}",
};
