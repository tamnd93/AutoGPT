import type { APIKeyPermission } from "@/app/api/__generated__/models/aPIKeyPermission";
import type { MessageKey } from "@/lib/i18n/messages/en";

export type ScopeAPIVersion = "v2" | "both" | "v1";

export const SCOPE_DESCRIPTION_KEYS: Record<APIKeyPermission, MessageKey> = {
  IDENTITY: "errors1.apiKey.scope.IDENTITY",
  EXECUTE_GRAPH: "errors1.apiKey.scope.EXECUTE_GRAPH",
  READ_GRAPH: "errors1.apiKey.scope.READ_GRAPH",
  WRITE_GRAPH: "errors1.apiKey.scope.WRITE_GRAPH",
  WRITE_LIBRARY: "errors1.apiKey.scope.WRITE_LIBRARY",
  EXECUTE_BLOCK: "errors1.apiKey.scope.EXECUTE_BLOCK",
  READ_BLOCK: "errors1.apiKey.scope.READ_BLOCK",
  READ_STORE: "errors1.apiKey.scope.READ_STORE",
  WRITE_STORE: "errors1.apiKey.scope.WRITE_STORE",
  READ_LIBRARY: "errors1.apiKey.scope.READ_LIBRARY",
  RUN_AGENT: "errors1.apiKey.scope.RUN_AGENT",
  READ_RUN: "errors1.apiKey.scope.READ_RUN",
  WRITE_RUN: "errors1.apiKey.scope.WRITE_RUN",
  SHARE_RUN: "errors1.apiKey.scope.SHARE_RUN",
  READ_RUN_REVIEW: "errors1.apiKey.scope.READ_RUN_REVIEW",
  WRITE_RUN_REVIEW: "errors1.apiKey.scope.WRITE_RUN_REVIEW",
  READ_SCHEDULE: "errors1.apiKey.scope.READ_SCHEDULE",
  WRITE_SCHEDULE: "errors1.apiKey.scope.WRITE_SCHEDULE",
  READ_CREDITS: "errors1.apiKey.scope.READ_CREDITS",
  READ_FILES: "errors1.apiKey.scope.READ_FILES",
  WRITE_FILES: "errors1.apiKey.scope.WRITE_FILES",
  USE_TOOLS: "errors1.apiKey.scope.USE_TOOLS",
  MANAGE_INTEGRATIONS: "errors1.apiKey.scope.MANAGE_INTEGRATIONS",
  READ_INTEGRATIONS: "errors1.apiKey.scope.READ_INTEGRATIONS",
  DELETE_INTEGRATIONS: "errors1.apiKey.scope.DELETE_INTEGRATIONS",
};

// Which version of the public API checks each scope, read from its routes.
export const SCOPE_API_VERSION: Record<APIKeyPermission, ScopeAPIVersion> = {
  IDENTITY: "both",
  EXECUTE_GRAPH: "v1",
  READ_GRAPH: "both",
  WRITE_GRAPH: "both",
  EXECUTE_BLOCK: "v1",
  READ_BLOCK: "both",
  WRITE_LIBRARY: "both",
  USE_TOOLS: "both",
  MANAGE_INTEGRATIONS: "both",
  READ_INTEGRATIONS: "both",
  DELETE_INTEGRATIONS: "both",
  READ_SCHEDULE: "v2",
  WRITE_SCHEDULE: "v2",
  READ_STORE: "v2",
  WRITE_STORE: "v2",
  READ_LIBRARY: "v2",
  RUN_AGENT: "v2",
  READ_RUN: "v2",
  WRITE_RUN: "v2",
  SHARE_RUN: "v2",
  READ_RUN_REVIEW: "v2",
  WRITE_RUN_REVIEW: "v2",
  READ_CREDITS: "v2",
  READ_FILES: "v2",
  WRITE_FILES: "v2",
};

export const SCOPE_GROUPS: { version: ScopeAPIVersion; labelKey: MessageKey }[] =
  [
    { version: "v2", labelKey: "errors1.apiKey.group.v2" },
    { version: "both", labelKey: "errors1.apiKey.group.both" },
    { version: "v1", labelKey: "errors1.apiKey.group.v1" },
  ];
