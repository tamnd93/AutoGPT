import { z } from "zod";

import { APIKeyPermission } from "@/app/api/__generated__/models/aPIKeyPermission";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import {
  SCOPE_API_VERSION,
  SCOPE_DESCRIPTIONS,
  SCOPE_GROUPS,
} from "@/lib/api-key-scopes";

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

export function createAPIKeySchema(t: Translate = english) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t("settingsRest1.schema.nameRequired"))
      .max(100, t("settingsRest1.schema.nameTooLong")),
    description: z
      .string()
      .trim()
      .max(500, t("settingsRest1.schema.descriptionTooLong"))
      .optional(),
    permissions: z
      .array(z.nativeEnum(APIKeyPermission))
      .min(1, t("settingsRest1.schema.permissionRequired")),
  });
}

export type CreateAPIKeyFormValues = z.infer<
  ReturnType<typeof createAPIKeySchema>
>;

export function humanizePermission(permission: APIKeyPermission): string {
  return permission
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const PERMISSION_GROUPS = SCOPE_GROUPS.map((group) => ({
  ...group,
  options: Object.values(APIKeyPermission)
    .filter((permission) => SCOPE_API_VERSION[permission] === group.version)
    .map((permission) => ({
      value: permission,
      label: humanizePermission(permission),
      description: SCOPE_DESCRIPTIONS[permission],
    })),
}));
