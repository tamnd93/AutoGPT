import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export type ConnectionState = boolean | "needs_expert_grant" | null;

export interface CapabilityListing {
  id: string;
  name: string;
  purpose: string;
  kind: string;
  class?: string;
  connected?: ConnectionState;
  eager?: boolean;
}

export interface ConnectionBadge {
  label: string;
  className: string;
}

export interface CapabilityListOutput {
  type: "capability_list";
  query: string;
  capabilities: CapabilityListing[];
  count: number;
  fallback?: CapabilityListing[];
  service?: string | null;
  message?: string;
}

export interface FindCapabilityInput {
  query?: string;
  context?: string;
  kind?: string;
}

export interface FindCapabilityToolPart {
  type: string;
  toolCallId: string;
  state: string;
  input?: unknown;
  output?: unknown;
}

export function parseOutput(output: unknown): CapabilityListOutput | null {
  if (!output) return null;
  if (typeof output === "string") {
    const trimmed = output.trim();
    if (!trimmed) return null;
    try {
      return parseOutput(JSON.parse(trimmed) as unknown);
    } catch {
      return null;
    }
  }
  if (typeof output === "object") {
    const candidate = output as { type?: unknown; capabilities?: unknown };
    if (
      candidate.type === "capability_list" &&
      Array.isArray(candidate.capabilities)
    ) {
      return output as CapabilityListOutput;
    }
  }
  return null;
}

export function queryOf(part: FindCapabilityToolPart): string | undefined {
  // `input` is whatever the model streamed, so `query` is not necessarily a
  // string -- and this runs while the call is still streaming.
  const query = (part.input as FindCapabilityInput | undefined)?.query;
  return typeof query === "string" ? query.trim() : undefined;
}

export function getAnimationText(
  part: FindCapabilityToolPart,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const query = queryOf(part);
  const queryText = query
    ? ` ${getMessage(locale, "chatTools3.findCapabilities.for", { query })}`
    : "";
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return `${getMessage(locale, "chatTools3.findCapabilities.searching")}${queryText}`;
    case "output-available": {
      const parsed = parseOutput(part.output);
      if (parsed) {
        return `${getMessage(
          locale,
          parsed.count === 1
            ? "chatTools3.findCapabilities.foundOne"
            : "chatTools3.findCapabilities.foundMany",
          { count: parsed.count },
        )}${queryText}`;
      }
      return `${getMessage(locale, "chatTools3.findCapabilities.searched")}${queryText}`;
    }
    case "output-error":
      return `${getMessage(locale, "chatTools3.findCapabilities.failed")}${queryText}`;
    default:
      return getMessage(locale, "chatTools3.findCapabilities.searching");
  }
}

export function connectionBadge(
  item: CapabilityListing,
  locale: Locale = DEFAULT_LOCALE,
): ConnectionBadge | null {
  if (item.connected === undefined || item.connected === null) return null;
  if (item.connected === "needs_expert_grant") {
    // TODO(tokens): no exact role for amber-100 #FEF3C7, amber-800 #92400E
    return {
      label: getMessage(locale, "chatTools3.findCapabilities.grantNeeded"),
      className: "bg-amber-100 text-amber-800",
    };
  }
  if (item.connected) {
    // TODO(tokens): no exact role for green-100 #B7E2C7, green-800 #0C5A29
    return {
      label: getMessage(locale, "chatTools3.findCapabilities.connected"),
      className: "bg-green-100 text-green-800",
    };
  }
  return {
    label: getMessage(locale, "chatTools3.findCapabilities.signIn"),
    className: "bg-surface-hover text-foreground-tertiary",
  };
}

export function kindLabel(
  item: CapabilityListing,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (item.kind === "mcp_server")
    return getMessage(locale, "chatTools3.findCapabilities.kindIntegration");
  if (item.kind === "skill")
    return getMessage(locale, "chatTools3.findCapabilities.kindSkill");
  if (item.class === "primitive")
    return getMessage(locale, "chatTools3.findCapabilities.kindBlock");
  if (item.kind === "tool")
    return getMessage(locale, "chatTools3.findCapabilities.kindTool");
  return getMessage(locale, "chatTools3.findCapabilities.kindAction");
}
