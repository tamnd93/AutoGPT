import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { isEmptyResult } from "./resultHelpers";
import { AGENT_TOOL_CATALOG } from "./toolCatalog.agent";
import { PLATFORM_TOOL_CATALOG } from "./toolCatalog.platform";
import type {
  ChainCategory,
  ToolDisplayContext,
  ToolInput,
  ToolMeta,
} from "./toolCatalog.shared";

export type { ChainCategory } from "./toolCatalog.shared";

export const COPILOT_TOOL_CATALOG: Record<string, ToolMeta> = {
  ...AGENT_TOOL_CATALOG,
  ...PLATFORM_TOOL_CATALOG,
};

function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function getCatalogLabel(
  toolName: string,
  input: unknown,
  state: "running" | "done" | "error",
  context: ToolDisplayContext = {},
  locale: Locale = DEFAULT_LOCALE,
): { category: ChainCategory; text: string; emptyResult?: true } | null {
  const meta = COPILOT_TOOL_CATALOG[toolName];
  if (!meta) return null;
  const subject =
    meta.subject?.(
      input && typeof input === "object" ? (input as ToolInput) : {},
      context,
    ) ?? null;
  const suffix = subject ? ` ${subject}` : "";
  const running = getMessage(locale, meta.running);
  const done = getMessage(locale, meta.done);
  const empty = meta.empty ? getMessage(locale, meta.empty) : null;
  const emptyResult =
    state === "done" && !!empty && isEmptyResult(context.output);
  const text =
    state === "running"
      ? `${running}${suffix}…`
      : state === "error"
        ? getMessage(locale, "chatTools3.catalog.failed", {
            action: `${lowerFirst(running)}${suffix}`,
          })
        : emptyResult
          ? `${done}${suffix} – ${empty}`
          : `${done}${suffix}`;
  return { category: meta.category, text, ...(emptyResult && { emptyResult }) };
}
