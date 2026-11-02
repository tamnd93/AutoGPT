import type { getV1ListAvailableBlocksResponse } from "@/app/api/__generated__/endpoints/blocks/blocks";
import type { BlockOutputResponse } from "@/app/api/__generated__/models/blockOutputResponse";
import type { ErrorResponse } from "@/app/api/__generated__/models/errorResponse";
import { ResponseType } from "@/app/api/__generated__/models/responseType";
import type { SetupRequirementsResponse } from "@/app/api/__generated__/models/setupRequirementsResponse";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import type { ToolUIPart } from "ai";
import { ScaleLoader } from "../../components/ScaleLoader/ScaleLoader";
import { getBlockDisplayName } from "../../helpers/toolDisplay";
import {
  AlertDiamondIcon,
  PlayCircleIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

/** Block details returned on first run_block attempt (before input_data provided). */
export interface BlockDetailsResponse {
  type: typeof ResponseType.block_details;
  message: string;
  session_id?: string | null;
  block: {
    id: string;
    name: string;
    description: string;
    inputs: Record<string, unknown>;
    outputs: Record<string, unknown>;
    credentials: unknown[];
  };
  user_authenticated: boolean;
}

/** Response when a block requires human review before execution. */
export interface ReviewRequiredResponse {
  type: typeof ResponseType.review_required;
  message: string;
  session_id?: string | null;
  block_id: string;
  block_name: string;
  review_id: string;
  input_data: Record<string, unknown>;
}

export interface RunBlockInput {
  block_id?: string;
  block_name?: string;
  input_data?: Record<string, unknown>;
  dry_run?: boolean;
}

export type RunBlockToolOutput =
  | SetupRequirementsResponse
  | BlockDetailsResponse
  | BlockOutputResponse
  | ReviewRequiredResponse
  | ErrorResponse;

const RUN_BLOCK_OUTPUT_TYPES = new Set<string>([
  ResponseType.setup_requirements,
  ResponseType.block_details,
  ResponseType.block_output,
  ResponseType.review_required,
  ResponseType.error,
]);

export function isRunBlockSetupRequirementsOutput(
  output: RunBlockToolOutput,
): output is SetupRequirementsResponse {
  return (
    output.type === ResponseType.setup_requirements ||
    ("setup_info" in output && typeof output.setup_info === "object")
  );
}

export function isRunBlockDetailsOutput(
  output: RunBlockToolOutput,
): output is BlockDetailsResponse {
  return (
    output.type === ResponseType.block_details ||
    ("block" in output && typeof output.block === "object")
  );
}

export function isRunBlockBlockOutput(
  output: RunBlockToolOutput,
): output is BlockOutputResponse {
  return (
    output.type === ResponseType.block_output ||
    ("block_id" in output && !("review_id" in output))
  );
}

export function isRunBlockReviewRequiredOutput(
  output: RunBlockToolOutput,
): output is ReviewRequiredResponse {
  return (
    output.type === ResponseType.review_required ||
    ("review_id" in output && "block_name" in output && "input_data" in output)
  );
}

export function isRunBlockErrorOutput(
  output: RunBlockToolOutput,
): output is ErrorResponse {
  // Only match actual error responses (type=error), not block outputs that
  // happen to have an "error" key in their outputs dict.  The old
  // `"error" in output` check was too broad and caused BlockOutputResponse
  // to be mis-identified as errors, showing dry-run results as failed.
  if (output.type === ResponseType.error) return true;
  // Fallback for untyped payloads: match only if "error" exists at the top
  // level AND there is no "block_id" (which distinguishes BlockOutputResponse
  // from ErrorResponse).  Note: `type` is optional in both interfaces, so
  // correctness here depends on `block_id` presence (always set on
  // BlockOutputResponse), not on `type` presence.
  if (!("type" in output) && "error" in output && !("block_id" in output))
    return true;
  return false;
}

function parseOutput(output: unknown): RunBlockToolOutput | null {
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
    if (typeof type === "string" && RUN_BLOCK_OUTPUT_TYPES.has(type)) {
      return output as RunBlockToolOutput;
    }
    if ("review_id" in output) return output as ReviewRequiredResponse;
    if ("block_id" in output) return output as BlockOutputResponse;
    if ("block" in output) return output as BlockDetailsResponse;
    if ("setup_info" in output) return output as SetupRequirementsResponse;
    // Only match error responses that have an "error" key but NOT "block_id"
    // (which would indicate a BlockOutputResponse, not an error).
    if (("error" in output || "details" in output) && !("block_id" in output))
      return output as ErrorResponse;
  }
  return null;
}

export function getRunBlockToolOutput(
  part: unknown,
): RunBlockToolOutput | null {
  if (!part || typeof part !== "object") return null;
  return parseOutput((part as { output?: unknown }).output);
}

export function getAnimationText(
  part: {
    state: ToolUIPart["state"];
    input?: unknown;
    output?: unknown;
  },
  blockNamesById?: Map<string, string>,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const input = part.input as RunBlockInput | undefined;
  const blockName = input?.block_name?.trim();
  const blockId = input?.block_id?.trim();
  const isDryRun = input?.dry_run === true;
  // Prefer block_name, then a name looked up from the blocks API,
  // and only fall back to the raw block_id when neither is known
  const displayName =
    blockName || (blockId ? blockNamesById?.get(blockId) : undefined);
  const blockText = displayName
    ? ` "${displayName}"`
    : blockId
      ? ` "${blockId}"`
      : "";

  const runningText = getMessage(
    locale,
    isDryRun
      ? "chatTools4.runBlock.animation.simulating"
      : "chatTools4.runBlock.animation.running",
  );
  const failedText = getMessage(locale, "chatTools4.runBlock.animation.failed");

  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return `${runningText}${blockText}`;
    case "output-available": {
      const output = parseOutput(part.output);
      if (!output) return `${runningText}${blockText}`;
      if (isRunBlockBlockOutput(output)) {
        return getMessage(
          locale,
          output.is_dry_run
            ? "chatTools4.runBlock.animation.simulated"
            : "chatTools4.runBlock.animation.ran",
          { name: output.block_name },
        );
      }
      if (isRunBlockDetailsOutput(output)) {
        return getMessage(locale, "chatTools4.runBlock.animation.details", {
          name: output.block.name,
        });
      }
      if (isRunBlockSetupRequirementsOutput(output)) {
        return getMessage(locale, "chatTools4.runBlock.animation.setupNeeded", {
          name: output.setup_info.agent_name,
        });
      }
      if (isRunBlockReviewRequiredOutput(output)) {
        return getMessage(
          locale,
          "chatTools4.runBlock.animation.reviewNeeded",
          { name: output.block_name },
        );
      }
      return failedText;
    }
    case "output-error":
      return failedText;
    default:
      return runningText;
  }
}

export function getBlockNamesById(
  response: getV1ListAvailableBlocksResponse | undefined,
): Map<string, string> | undefined {
  if (response?.status !== 200) return undefined;
  const names = new Map<string, string>();
  for (const block of response.data) {
    const name = getBlockDisplayName(block.name);
    if (typeof block.id === "string" && name) {
      names.set(block.id, name);
    }
  }
  return names;
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
  return <Icon icon={PlayIcon} size={14} className="text-neutral-400" />;
}

export function AccordionIcon() {
  return <Icon icon={PlayCircleIcon} size={32} />;
}

export function formatMaybeJson(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function getAccordionMeta(
  output: RunBlockToolOutput,
  locale: Locale = DEFAULT_LOCALE,
): {
  icon: React.ReactNode;
  title: string;
  titleClassName?: string;
  description?: string;
} {
  const icon = <AccordionIcon />;

  if (isRunBlockBlockOutput(output)) {
    const keys = Object.keys(output.outputs ?? {});
    const outputCount =
      keys.length > 0
        ? getMessage(
            locale,
            keys.length === 1
              ? "chatTools4.runBlock.accordion.outputKeyOne"
              : "chatTools4.runBlock.accordion.outputKeyMany",
            { count: keys.length },
          )
        : output.message;
    return {
      icon,
      title: output.block_name,
      description: output.is_dry_run
        ? getMessage(locale, "chatTools4.runBlock.accordion.simulated", {
            summary: outputCount,
          })
        : outputCount,
    };
  }

  if (isRunBlockDetailsOutput(output)) {
    const inputKeys = Object.keys(
      (output.block.inputs as { properties?: Record<string, unknown> })
        ?.properties ?? {},
    );
    return {
      icon,
      title: output.block.name,
      description:
        inputKeys.length > 0
          ? getMessage(
              locale,
              inputKeys.length === 1
                ? "chatTools4.runBlock.accordion.inputFieldOne"
                : "chatTools4.runBlock.accordion.inputFieldMany",
              { count: inputKeys.length },
            )
          : output.message,
    };
  }

  if (isRunBlockSetupRequirementsOutput(output)) {
    const missingCredsCount = Object.keys(
      (output.setup_info.user_readiness?.missing_credentials ?? {}) as Record<
        string,
        unknown
      >,
    ).length;
    return {
      icon,
      title: output.setup_info.agent_name,
      description:
        missingCredsCount > 0
          ? getMessage(
              locale,
              missingCredsCount === 1
                ? "chatTools4.runBlock.accordion.missingCredentialOne"
                : "chatTools4.runBlock.accordion.missingCredentialMany",
              { count: missingCredsCount },
            )
          : output.message,
    };
  }

  if (isRunBlockReviewRequiredOutput(output)) {
    return {
      icon,
      title: output.block_name,
      description: getMessage(
        locale,
        "chatTools4.runBlock.accordion.reviewRequired",
      ),
    };
  }

  return {
    icon: <Icon icon={AlertDiamondIcon} size={32} className="text-error" />,
    title: getMessage(locale, "chatTools4.runBlock.accordion.error"),
    titleClassName: "text-error",
  };
}
