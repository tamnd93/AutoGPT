import type { AgentDetailsResponse } from "@/app/api/__generated__/models/agentDetailsResponse";
import type { AgentOutputResponse } from "@/app/api/__generated__/models/agentOutputResponse";
import type { ErrorResponse } from "@/app/api/__generated__/models/errorResponse";
import type { ExecutionStartedResponse } from "@/app/api/__generated__/models/executionStartedResponse";
import type { NeedLoginResponse } from "@/app/api/__generated__/models/needLoginResponse";
import { ResponseType } from "@/app/api/__generated__/models/responseType";
import type { SetupRequirementsResponse } from "@/app/api/__generated__/models/setupRequirementsResponse";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import type { ToolUIPart } from "ai";
import { ScaleLoader } from "../../components/ScaleLoader/ScaleLoader";
import {
  AlertDiamondIcon,
  PlayIcon,
  Rocket01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface RunAgentInput {
  username_agent_slug?: string;
  library_agent_id?: string;
  inputs?: Record<string, unknown>;
  use_defaults?: boolean;
  schedule_name?: string;
  cron?: string;
  timezone?: string;
}

export type RunAgentToolOutput =
  | SetupRequirementsResponse
  | ExecutionStartedResponse
  | AgentOutputResponse
  | AgentDetailsResponse
  | NeedLoginResponse
  | ErrorResponse;

const RUN_AGENT_OUTPUT_TYPES = new Set<string>([
  ResponseType.setup_requirements,
  ResponseType.execution_started,
  ResponseType.agent_output,
  ResponseType.agent_details,
  ResponseType.need_login,
  ResponseType.error,
]);

export function isRunAgentSetupRequirementsOutput(
  output: RunAgentToolOutput,
): output is SetupRequirementsResponse {
  return (
    output.type === ResponseType.setup_requirements ||
    ("setup_info" in output && typeof output.setup_info === "object")
  );
}

export function isRunAgentExecutionStartedOutput(
  output: RunAgentToolOutput,
): output is ExecutionStartedResponse {
  return (
    output.type === ResponseType.execution_started || "execution_id" in output
  );
}

export function isRunAgentAgentOutputResponse(
  output: RunAgentToolOutput,
): output is AgentOutputResponse {
  return output.type === ResponseType.agent_output;
}

export function isRunAgentAgentDetailsOutput(
  output: RunAgentToolOutput,
): output is AgentDetailsResponse {
  return output.type === ResponseType.agent_details || "agent" in output;
}

export function isRunAgentNeedLoginOutput(
  output: RunAgentToolOutput,
): output is NeedLoginResponse {
  return output.type === ResponseType.need_login;
}

export function isRunAgentErrorOutput(
  output: RunAgentToolOutput,
): output is ErrorResponse {
  return output.type === ResponseType.error || "error" in output;
}

function parseOutput(output: unknown): RunAgentToolOutput | null {
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
    if (typeof type === "string" && RUN_AGENT_OUTPUT_TYPES.has(type)) {
      return output as RunAgentToolOutput;
    }
    if ("execution_id" in output) return output as ExecutionStartedResponse;
    if ("setup_info" in output) return output as SetupRequirementsResponse;
    if ("agent" in output) return output as AgentDetailsResponse;
    if ("error" in output || "details" in output)
      return output as ErrorResponse;
    if (type === ResponseType.need_login) return output as NeedLoginResponse;
  }
  return null;
}

export function getRunAgentToolOutput(
  part: unknown,
): RunAgentToolOutput | null {
  if (!part || typeof part !== "object") return null;
  return parseOutput((part as { output?: unknown }).output);
}

function getAgentIdentifierText(
  input: RunAgentInput | undefined,
  locale: Locale,
): string | null {
  if (!input) return null;
  const slug = input.username_agent_slug?.trim();
  if (slug) return slug;
  const libraryId = input.library_agent_id?.trim();
  if (libraryId) {
    return getMessage(locale, "chatTools4.runAgent.animation.libraryWorkflow", {
      id: libraryId,
    });
  }
  return null;
}

export function getAnimationText(
  part: {
    state: ToolUIPart["state"];
    input?: unknown;
    output?: unknown;
  },
  locale: Locale = DEFAULT_LOCALE,
): string {
  const input = part.input as RunAgentInput | undefined;
  const agentIdentifier = getAgentIdentifierText(input, locale);
  const isSchedule = Boolean(
    input?.schedule_name?.trim() || input?.cron?.trim(),
  );
  const actionPhrase = getMessage(
    locale,
    isSchedule
      ? "chatTools4.runAgent.animation.scheduling"
      : "chatTools4.runAgent.animation.running",
  );
  const identifierText = agentIdentifier ? ` "${agentIdentifier}"` : "";

  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return `${actionPhrase}${identifierText}`;
    case "output-available": {
      const output = parseOutput(part.output);
      if (!output) return `${actionPhrase}${identifierText}`;
      if (isRunAgentExecutionStartedOutput(output)) {
        return getMessage(locale, "chatTools4.runAgent.animation.started", {
          name: output.graph_name,
        });
      }
      if (isRunAgentAgentDetailsOutput(output)) {
        if (output.agent.trigger_info) {
          return getMessage(
            locale,
            "chatTools4.runAgent.animation.webhookSetup",
            { name: output.agent.name },
          );
        }
        return getMessage(
          locale,
          "chatTools4.runAgent.animation.inputsNeeded",
          { name: output.agent.name },
        );
      }
      if (isRunAgentSetupRequirementsOutput(output)) {
        return getMessage(locale, "chatTools4.runAgent.animation.setupNeeded", {
          name: output.setup_info.agent_name,
        });
      }
      if (isRunAgentNeedLoginOutput(output)) {
        return getMessage(
          locale,
          "chatTools4.runAgent.animation.signInRequired",
        );
      }
      return getMessage(locale, "chatTools4.runAgent.animation.wentWrong");
    }
    case "output-error":
      return getMessage(locale, "chatTools4.runAgent.animation.wentWrong");
    default:
      return actionPhrase;
  }
}

export function getStreamingLoadingText(
  part: { input?: unknown },
  locale: Locale = DEFAULT_LOCALE,
): string {
  const input = part.input as RunAgentInput | undefined;
  const isSchedule = Boolean(
    input?.schedule_name?.trim() || input?.cron?.trim(),
  );
  return getMessage(
    locale,
    isSchedule
      ? "chatTools4.runAgent.loading.scheduling"
      : "chatTools4.runAgent.loading.running",
  );
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
  return <Icon icon={Rocket01Icon} size={28} />;
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
  output: RunAgentToolOutput,
  locale: Locale = DEFAULT_LOCALE,
): {
  icon: React.ReactNode;
  title: string;
  titleClassName?: string;
  description?: string;
} {
  const icon = <AccordionIcon />;

  if (isRunAgentExecutionStartedOutput(output)) {
    const statusText =
      typeof output.status === "string" && output.status.trim()
        ? output.status.trim()
        : getMessage(locale, "chatTools4.runAgent.accordion.statusStarted");
    return {
      icon,
      title: output.graph_name,
      description: getMessage(locale, "chatTools4.runAgent.accordion.status", {
        status: statusText,
      }),
    };
  }

  if (isRunAgentAgentDetailsOutput(output)) {
    return {
      icon,
      title: output.agent.name,
      description: getMessage(
        locale,
        output.agent.trigger_info
          ? "chatTools4.runAgent.accordion.webhookSetup"
          : "chatTools4.runAgent.accordion.inputsRequired",
      ),
    };
  }

  if (isRunAgentSetupRequirementsOutput(output)) {
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
                ? "chatTools4.runAgent.accordion.missingCredentialOne"
                : "chatTools4.runAgent.accordion.missingCredentialMany",
              { count: missingCredsCount },
            )
          : output.message,
    };
  }

  if (isRunAgentAgentOutputResponse(output)) {
    return {
      icon,
      title: output.agent_name,
      description: getMessage(locale, "chatTools4.runAgent.status.completed"),
    };
  }

  if (isRunAgentNeedLoginOutput(output)) {
    return {
      icon,
      title: getMessage(locale, "chatTools4.runAgent.accordion.signInRequired"),
    };
  }

  return {
    icon: <Icon icon={AlertDiamondIcon} size={28} className="text-error" />,
    title: getMessage(locale, "chatTools4.runAgent.accordion.error"),
    titleClassName: "text-error",
  };
}
