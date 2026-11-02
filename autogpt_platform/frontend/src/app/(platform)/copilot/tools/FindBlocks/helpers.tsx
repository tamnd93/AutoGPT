import type { BlockListResponse } from "@/app/api/__generated__/models/blockListResponse";
import { ResponseType } from "@/app/api/__generated__/models/responseType";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { FindBlockInput, FindBlockToolPart } from "./FindBlocks";
import { CubeIcon, Package01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

export function parseOutput(output: unknown): BlockListResponse | null {
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
    const type = (output as { type?: unknown }).type;
    if (type === ResponseType.block_list || "blocks" in output) {
      return output as BlockListResponse;
    }
  }
  return null;
}

export function getAnimationText(
  part: FindBlockToolPart,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const query = (part.input as FindBlockInput | undefined)?.query?.trim();
  const queryText = query
    ? ` ${getMessage(locale, "chatTools3.findBlocks.matching", { query })}`
    : "";

  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return `${getMessage(locale, "chatTools3.findBlocks.searching")}${queryText}`;

    case "output-available": {
      const parsed = parseOutput(part.output);
      if (parsed) {
        return `${getMessage(
          locale,
          parsed.count === 1
            ? "chatTools3.findBlocks.foundOne"
            : "chatTools3.findBlocks.foundMany",
          { count: parsed.count },
        )}${queryText}`;
      }
      return `${getMessage(locale, "chatTools3.findBlocks.searching")}${queryText}`;
    }

    case "output-error":
      return query
        ? getMessage(locale, "chatTools3.findBlocks.failedFor", { query })
        : getMessage(locale, "chatTools3.findBlocks.failed");

    default:
      return getMessage(locale, "chatTools3.findBlocks.searching");
  }
}

export function ToolIcon({
  isStreaming,
  isError,
}: {
  isStreaming?: boolean;
  isError?: boolean;
}) {
  return (
    <Icon
      icon={Package01Icon}
      size={14}
      // TODO(tokens): no exact role for neutral-500 #737373, neutral-400 #A3A3A3
      className={
        isError
          ? "text-error"
          : isStreaming
            ? "text-neutral-500"
            : "text-neutral-400"
      }
    />
  );
}

export function AccordionIcon() {
  return <Icon icon={CubeIcon} size={32} />;
}
