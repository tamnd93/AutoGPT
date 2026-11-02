import type { DocPageResponse } from "@/app/api/__generated__/models/docPageResponse";
import type { DocSearchResultsResponse } from "@/app/api/__generated__/models/docSearchResultsResponse";
import type { ErrorResponse } from "@/app/api/__generated__/models/errorResponse";
import type { NoResultsResponse } from "@/app/api/__generated__/models/noResultsResponse";
import { ResponseType } from "@/app/api/__generated__/models/responseType";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { ToolUIPart } from "ai";
import {
  File02Icon,
  FileSearchIcon,
  NewsIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface SearchDocsInput {
  query: string;
}

export interface GetDocPageInput {
  path: string;
}

export type DocsToolOutput =
  | DocSearchResultsResponse
  | DocPageResponse
  | NoResultsResponse
  | ErrorResponse;

export type DocsToolType = "tool-search_docs" | "tool-get_doc_page" | string;

export function getToolLabel(
  toolType: DocsToolType,
  locale: Locale = DEFAULT_LOCALE,
): string {
  switch (toolType) {
    case "tool-get_doc_page":
      return getMessage(locale, "chatTools4.searchDocs.label.docsPage");
    default:
      return getMessage(locale, "chatTools4.searchDocs.label.docs");
  }
}

function parseOutput(output: unknown): DocsToolOutput | null {
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
      type === ResponseType.doc_search_results ||
      type === ResponseType.doc_page ||
      type === ResponseType.no_results ||
      type === ResponseType.error
    ) {
      return output as DocsToolOutput;
    }
    if ("results" in output && "query" in output)
      return output as DocSearchResultsResponse;
    if ("content" in output && "path" in output)
      return output as DocPageResponse;
    if ("suggestions" in output && !("error" in output))
      return output as NoResultsResponse;
    if ("error" in output || "details" in output)
      return output as ErrorResponse;
  }
  return null;
}

export function getDocsToolOutput(part: unknown): DocsToolOutput | null {
  if (!part || typeof part !== "object") return null;
  return parseOutput((part as { output?: unknown }).output);
}

export function isDocSearchResultsOutput(
  output: DocsToolOutput,
): output is DocSearchResultsResponse {
  return output.type === ResponseType.doc_search_results || "results" in output;
}

export function isDocPageOutput(
  output: DocsToolOutput,
): output is DocPageResponse {
  return output.type === ResponseType.doc_page || "content" in output;
}

export function isNoResultsOutput(
  output: DocsToolOutput,
): output is NoResultsResponse {
  return (
    output.type === ResponseType.no_results ||
    ("suggestions" in output && !("error" in output))
  );
}

export function isErrorOutput(output: DocsToolOutput): output is ErrorResponse {
  return output.type === ResponseType.error || "error" in output;
}

export function getDocsToolTitle(
  toolType: DocsToolType,
  output: DocsToolOutput,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (toolType === "tool-search_docs") {
    if (isDocSearchResultsOutput(output)) {
      return getMessage(locale, "chatTools4.searchDocs.title.results");
    }
    if (isNoResultsOutput(output)) {
      return getMessage(locale, "chatTools4.searchDocs.title.noResults");
    }
    return getMessage(locale, "chatTools4.searchDocs.title.searchError");
  }

  if (isDocPageOutput(output)) {
    return getMessage(locale, "chatTools4.searchDocs.title.page");
  }
  if (isNoResultsOutput(output)) {
    return getMessage(locale, "chatTools4.searchDocs.title.noResults");
  }
  return getMessage(locale, "chatTools4.searchDocs.title.pageError");
}

export function getAnimationText(
  part: {
    type: DocsToolType;
    state: ToolUIPart["state"];
    input?: unknown;
    output?: unknown;
  },
  locale: Locale = DEFAULT_LOCALE,
): string {
  switch (part.type) {
    case "tool-search_docs": {
      const query = (part.input as SearchDocsInput | undefined)?.query?.trim();
      const queryText = query
        ? ` ${getMessage(locale, "chatTools4.searchDocs.animation.for", { query })}`
        : "";

      switch (part.state) {
        case "input-streaming":
        case "input-available":
          return `${getMessage(locale, "chatTools4.searchDocs.animation.searching")}${queryText}`;
        case "output-available": {
          const output = parseOutput(part.output);
          if (!output) {
            return `${getMessage(locale, "chatTools4.searchDocs.animation.searching")}${queryText}`;
          }
          if (isDocSearchResultsOutput(output)) {
            const count = output.count ?? output.results.length;
            return `${getMessage(
              locale,
              count === 1
                ? "chatTools4.searchDocs.animation.foundOne"
                : "chatTools4.searchDocs.animation.foundMany",
              { count },
            )}${queryText}`;
          }
          if (isNoResultsOutput(output)) {
            return `${getMessage(locale, "chatTools4.searchDocs.animation.none")}${queryText}`;
          }
          return `${getMessage(locale, "chatTools4.searchDocs.animation.searchError")}${queryText}`;
        }
        case "output-error":
          return `${getMessage(locale, "chatTools4.searchDocs.animation.searchError")}${queryText}`;
        default:
          return getMessage(
            locale,
            "chatTools4.searchDocs.animation.searching",
          );
      }
    }
    case "tool-get_doc_page": {
      const path = (part.input as GetDocPageInput | undefined)?.path?.trim();
      const pathText = path ? ` "${path}"` : "";

      switch (part.state) {
        case "input-streaming":
        case "input-available":
          return `${getMessage(locale, "chatTools4.searchDocs.animation.loading")}${pathText}`;
        case "output-available": {
          const output = parseOutput(part.output);
          if (!output) {
            return `${getMessage(locale, "chatTools4.searchDocs.animation.loading")}${pathText}`;
          }
          if (isDocPageOutput(output)) {
            return getMessage(
              locale,
              "chatTools4.searchDocs.animation.loaded",
              {
                title: output.title,
              },
            );
          }
          if (isNoResultsOutput(output)) {
            return getMessage(
              locale,
              "chatTools4.searchDocs.animation.pageNotFound",
            );
          }
          return getMessage(
            locale,
            "chatTools4.searchDocs.animation.loadError",
          );
        }
        case "output-error":
          return getMessage(
            locale,
            "chatTools4.searchDocs.animation.loadError",
          );
        default:
          return getMessage(locale, "chatTools4.searchDocs.animation.loading");
      }
    }
  }

  return getMessage(locale, "chatTools4.searchDocs.animation.processing");
}

export function ToolIcon({
  toolType,
  isStreaming,
  isError,
}: {
  toolType: DocsToolType;
  isStreaming?: boolean;
  isError?: boolean;
}) {
  return (
    <Icon
      icon={toolType === "tool-get_doc_page" ? File02Icon : FileSearchIcon}
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

export function AccordionIcon({ toolType }: { toolType: DocsToolType }) {
  return (
    <Icon
      icon={toolType === "tool-get_doc_page" ? NewsIcon : File02Icon}
      size={32}
    />
  );
}

export function toDocsUrl(path: string): string {
  // Mirrors backend.util.docs.make_doc_url: extension-less rendered-page
  // path on agpt.co with underscores canonicalized to hyphens (the site's
  // edge worker rewrites _ to -; the .md variant is a soft-404 and
  // docs.agpt.co is dead).
  const clean = path
    .replace(/^\/+/, "")
    .replace(/\.mdx?$/, "")
    .replace(/_/g, "-");
  return `https://agpt.co/docs/${clean}`;
}
