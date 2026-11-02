import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import type { ToolUIPart } from "ai";
import {
  BulbIcon,
  CheckmarkCircle02Icon,
  PlusSignCircleIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

/* ------------------------------------------------------------------ */
/*  Types (local until API client is regenerated)                      */
/* ------------------------------------------------------------------ */

interface FeatureRequestInfo {
  id: string;
  identifier: string;
  title: string;
  description?: string | null;
}

export interface FeatureRequestSearchResponse {
  type: "feature_request_search";
  message: string;
  results: FeatureRequestInfo[];
  count: number;
  query: string;
}

export interface FeatureRequestCreatedResponse {
  type: "feature_request_created";
  message: string;
  issue_id: string;
  issue_identifier: string;
  issue_title: string;
  issue_url: string;
  is_new_issue: boolean;
  customer_name: string;
}

interface NoResultsResponse {
  type: "no_results";
  message: string;
  suggestions?: string[];
}

interface ErrorResponse {
  type: "error";
  message: string;
  error?: string;
}

export type FeatureRequestOutput =
  | FeatureRequestSearchResponse
  | FeatureRequestCreatedResponse
  | NoResultsResponse
  | ErrorResponse;

export type FeatureRequestToolType =
  | "tool-search_feature_requests"
  | "tool-create_feature_request"
  | string;

/* ------------------------------------------------------------------ */
/*  Output parsing                                                     */
/* ------------------------------------------------------------------ */

function parseOutput(output: unknown): FeatureRequestOutput | null {
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
      type === "feature_request_search" ||
      type === "feature_request_created" ||
      type === "no_results" ||
      type === "error"
    ) {
      return output as FeatureRequestOutput;
    }
    // Fallback structural checks
    if ("results" in output && "query" in output)
      return output as FeatureRequestSearchResponse;
    if ("issue_identifier" in output)
      return output as FeatureRequestCreatedResponse;
    if ("suggestions" in output && !("error" in output))
      return output as NoResultsResponse;
    if ("error" in output || "details" in output)
      return output as ErrorResponse;
  }
  return null;
}

export function getFeatureRequestOutput(
  part: unknown,
): FeatureRequestOutput | null {
  if (!part || typeof part !== "object") return null;
  return parseOutput((part as { output?: unknown }).output);
}

/* ------------------------------------------------------------------ */
/*  Type guards                                                        */
/* ------------------------------------------------------------------ */

export function isSearchResultsOutput(
  output: FeatureRequestOutput,
): output is FeatureRequestSearchResponse {
  return (
    output.type === "feature_request_search" ||
    ("results" in output && "query" in output)
  );
}

export function isCreatedOutput(
  output: FeatureRequestOutput,
): output is FeatureRequestCreatedResponse {
  return (
    output.type === "feature_request_created" || "issue_identifier" in output
  );
}

export function isNoResultsOutput(
  output: FeatureRequestOutput,
): output is NoResultsResponse {
  return (
    output.type === "no_results" ||
    ("suggestions" in output && !("error" in output))
  );
}

export function isErrorOutput(
  output: FeatureRequestOutput,
): output is ErrorResponse {
  return output.type === "error" || "error" in output;
}

/* ------------------------------------------------------------------ */
/*  Accordion metadata                                                 */
/* ------------------------------------------------------------------ */

export function getAccordionTitle(
  toolType: FeatureRequestToolType,
  output: FeatureRequestOutput,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (toolType === "tool-search_feature_requests") {
    if (isSearchResultsOutput(output))
      return getMessage(locale, "chatTools3.featureRequests.requests");
    if (isNoResultsOutput(output))
      return getMessage(locale, "chatTools3.featureRequests.noneFound");
    return getMessage(locale, "chatTools3.featureRequests.searchError");
  }
  if (isCreatedOutput(output)) {
    return getMessage(
      locale,
      output.is_new_issue
        ? "chatTools3.featureRequests.created"
        : "chatTools3.featureRequests.addedTo",
    );
  }
  if (isErrorOutput(output))
    return getMessage(locale, "chatTools3.featureRequests.error");
  return getMessage(locale, "chatTools3.featureRequests.request");
}

/* ------------------------------------------------------------------ */
/*  Animation text                                                     */
/* ------------------------------------------------------------------ */

interface AnimationPart {
  type: FeatureRequestToolType;
  state: ToolUIPart["state"];
  input?: unknown;
  output?: unknown;
}

export function getAnimationText(
  part: AnimationPart,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (part.type === "tool-search_feature_requests") {
    const query = (part.input as { query?: string } | undefined)?.query?.trim();
    const queryText = query
      ? ` ${getMessage(locale, "chatTools3.featureRequests.for", { query })}`
      : "";

    switch (part.state) {
      case "input-streaming":
      case "input-available":
        return `${getMessage(locale, "chatTools3.featureRequests.searching")}${queryText}`;
      case "output-available": {
        const output = parseOutput(part.output);
        if (!output)
          return `${getMessage(locale, "chatTools3.featureRequests.searching")}${queryText}`;
        if (isSearchResultsOutput(output)) {
          return `${getMessage(
            locale,
            output.count === 1
              ? "chatTools3.featureRequests.foundOne"
              : "chatTools3.featureRequests.foundMany",
            { count: output.count },
          )}${queryText}`;
        }
        if (isNoResultsOutput(output))
          return `${getMessage(locale, "chatTools3.featureRequests.noneFound")}${queryText}`;
        return `${getMessage(locale, "chatTools3.featureRequests.errorSearching")}${queryText}`;
      }
      case "output-error":
        return `${getMessage(locale, "chatTools3.featureRequests.errorSearching")}${queryText}`;
      default:
        return getMessage(locale, "chatTools3.featureRequests.searching");
    }
  }

  // create_feature_request
  const title = (part.input as { title?: string } | undefined)?.title?.trim();
  const titleText = title ? ` "${title}"` : "";

  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return `${getMessage(locale, "chatTools3.featureRequests.creating")}${titleText}`;
    case "output-available": {
      const output = parseOutput(part.output);
      if (!output)
        return `${getMessage(locale, "chatTools3.featureRequests.creating")}${titleText}`;
      if (isCreatedOutput(output)) {
        return getMessage(
          locale,
          output.is_new_issue
            ? "chatTools3.featureRequests.created"
            : "chatTools3.featureRequests.addedToExisting",
        );
      }
      if (isErrorOutput(output))
        return getMessage(locale, "chatTools3.featureRequests.errorCreating");
      return `${getMessage(locale, "chatTools3.featureRequests.createdWithTitle")}${titleText}`;
    }
    case "output-error":
      return getMessage(locale, "chatTools3.featureRequests.errorCreating");
    default:
      return getMessage(locale, "chatTools3.featureRequests.creating");
  }
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

export function ToolIcon({
  toolType,
  isStreaming,
  isError,
}: {
  toolType: FeatureRequestToolType;
  isStreaming?: boolean;
  isError?: boolean;
}) {
  const icon =
    toolType === "tool-create_feature_request"
      ? PlusSignCircleIcon
      : Search01Icon;

  return (
    <Icon
      icon={icon}
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

export function AccordionIcon({
  toolType,
}: {
  toolType: FeatureRequestToolType;
}) {
  const icon =
    toolType === "tool-create_feature_request"
      ? CheckmarkCircle02Icon
      : BulbIcon;
  return <Icon icon={icon} size={32} />;
}
