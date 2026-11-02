import type { AgentPreviewResponse } from "@/app/api/__generated__/models/agentPreviewResponse";
import type { AgentSavedResponse } from "@/app/api/__generated__/models/agentSavedResponse";
import type { ErrorResponse } from "@/app/api/__generated__/models/errorResponse";
import { ResponseType } from "@/app/api/__generated__/models/responseType";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import type { ToolUIPart } from "ai";
import { ScaleLoader } from "../../components/ScaleLoader/ScaleLoader";
import {
  AlertDiamondIcon,
  NoteEditIcon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

export type EditAgentToolOutput =
  | AgentPreviewResponse
  | AgentSavedResponse
  | ErrorResponse;

function parseOutput(output: unknown): EditAgentToolOutput | null {
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
    if (
      type === ResponseType.agent_builder_preview ||
      type === ResponseType.agent_builder_saved ||
      type === ResponseType.error
    ) {
      return output as EditAgentToolOutput;
    }
    if ("agent_json" in output && "agent_name" in output)
      return output as AgentPreviewResponse;
    if ("agent_id" in output && "library_agent_id" in output)
      return output as AgentSavedResponse;
    if ("error" in output || "details" in output)
      return output as ErrorResponse;
  }
  return null;
}

export function getEditAgentToolOutput(
  part: unknown,
): EditAgentToolOutput | null {
  if (!part || typeof part !== "object") return null;
  return parseOutput((part as { output?: unknown }).output);
}

export function isAgentPreviewOutput(
  output: EditAgentToolOutput,
): output is AgentPreviewResponse {
  return (
    output.type === ResponseType.agent_builder_preview || "agent_json" in output
  );
}

export function isAgentSavedOutput(
  output: EditAgentToolOutput,
): output is AgentSavedResponse {
  return (
    output.type === ResponseType.agent_builder_saved ||
    "agent_page_link" in output
  );
}

export function isErrorOutput(
  output: EditAgentToolOutput,
): output is ErrorResponse {
  return output.type === ResponseType.error || "error" in output;
}

export function getAnimationText(
  part: {
    state: ToolUIPart["state"];
    input?: unknown;
    output?: unknown;
  },
  locale: Locale = DEFAULT_LOCALE,
): string {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return getMessage(locale, "chatTools3.editAgent.editing");
    case "output-available": {
      const output = parseOutput(part.output);
      if (!output) return getMessage(locale, "chatTools3.editAgent.editing");
      if (isAgentSavedOutput(output))
        return getMessage(locale, "chatTools3.editAgent.saved", {
          name: output.agent_name,
        });
      if (isAgentPreviewOutput(output))
        return getMessage(locale, "chatTools3.editAgent.preview", {
          name: output.agent_name,
        });
      return getMessage(locale, "chatTools3.editAgent.error");
    }
    case "output-error":
      return getMessage(locale, "chatTools3.editAgent.error");
    default:
      return getMessage(locale, "chatTools3.editAgent.editing");
  }
}

export function ToolIcon({
  isStreaming,
  isError,
}: {
  isStreaming?: boolean;
  isError?: boolean;
}) {
  if (isError) {
    return <Icon icon={AlertDiamondIcon} size={14} className="text-error" />;
  }
  if (isStreaming) {
    return <ScaleLoader size={14} />;
  }
  // TODO(tokens): no exact role for neutral-400 #A3A3A3
  return (
    <Icon icon={PencilEdit01Icon} size={14} className="text-neutral-400" />
  );
}

export function AccordionIcon() {
  return <Icon icon={NoteEditIcon} size={32} />;
}

export function formatMaybeJson(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function truncateText(text: string, maxChars: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars).trimEnd()}…`;
}
