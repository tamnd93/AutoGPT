import type { ToolUIPart } from "ai";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

/* ------------------------------------------------------------------ */
/*  Sub-agent tool name constants                                      */
/* ------------------------------------------------------------------ */

export const TOOL_AGENT = "Agent";
export const TOOL_TASK = "Task";
export const TOOL_TASK_OUTPUT = "TaskOutput";

/* ------------------------------------------------------------------ */
/*  Tool name helpers                                                  */
/* ------------------------------------------------------------------ */

export function extractToolName(part: ToolUIPart): string {
  return part.type.replace(/^tool-/, "");
}

// Specific-case labels for tools whose auto-formatted name reads awkwardly
// alongside a "Running …" prefix (e.g. avoid "Running Run sub session").
const TOOL_DISPLAY_NAME_KEYS: Record<string, MessageKey> = {
  run_sub_session: "chatTools4.generic.toolName.run_sub_session",
  get_sub_session_result: "chatTools4.generic.toolName.get_sub_session_result",
  delegate_to_expert: "chatTools4.generic.toolName.delegate_to_expert",
  handoff_to_expert: "chatTools4.generic.toolName.handoff_to_expert",
  hire_expert: "chatTools4.generic.toolName.hire_expert",
  raise_expert: "chatTools4.generic.toolName.raise_expert",
  update_expert: "chatTools4.generic.toolName.update_expert",
  confirm_expert_change: "chatTools4.generic.toolName.confirm_expert_change",
  run_agent: "chatTools4.generic.toolName.run_agent",
  view_agent_output: "chatTools4.generic.toolName.view_agent_output",
  run_block: "chatTools4.generic.toolName.run_block",
  run_mcp_tool: "chatTools4.generic.toolName.run_mcp_tool",
  find_capability: "chatTools4.generic.toolName.find_capability",
  describe_capability: "chatTools4.generic.toolName.describe_capability",
  run_capability: "chatTools4.generic.toolName.run_capability",
  resume_capability: "chatTools4.generic.toolName.resume_capability",
  get_agent_building_guide:
    "chatTools4.generic.toolName.get_agent_building_guide",
};

export function formatToolName(
  name: string,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const key = TOOL_DISPLAY_NAME_KEYS[name];
  if (key) return getMessage(locale, key);
  // Drop a redundant "run_" prefix so "Running Run agent" → "Running agent".
  const stripped = name.startsWith("run_") ? name.slice(4) : name;
  return stripped.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

/* ------------------------------------------------------------------ */
/*  Tool categorization                                                */
/* ------------------------------------------------------------------ */

export type ToolCategory =
  | "bash"
  | "web"
  | "browser"
  | "file-read"
  | "file-write"
  | "file-delete"
  | "file-list"
  | "search"
  | "edit"
  | "todo"
  | "compaction"
  | "agent"
  | "other";

export function getToolCategory(toolName: string): ToolCategory {
  switch (toolName) {
    case "bash_exec":
      return "bash";
    case "web_fetch":
    case "web_search":
    case "WebSearch":
    case "WebFetch":
      return "web";
    case "browser_navigate":
    case "browser_act":
    case "browser_screenshot":
      return "browser";
    case "read_workspace_file":
    case "read_file":
    case "Read":
      return "file-read";
    case "write_workspace_file":
    case "write_file":
    case "Write":
      return "file-write";
    case "delete_workspace_file":
      return "file-delete";
    case "list_workspace_files":
    case "glob":
    case "Glob":
      return "file-list";
    case "grep":
    case "Grep":
      return "search";
    case "edit_file":
    case "Edit":
      return "edit";
    case "TodoWrite":
      return "todo";
    case "context_compaction":
      return "compaction";
    case TOOL_AGENT:
    case TOOL_TASK:
    case TOOL_TASK_OUTPUT:
      return "agent";
    default:
      return "other";
  }
}

/* ------------------------------------------------------------------ */
/*  Input summary                                                      */
/* ------------------------------------------------------------------ */

function getInputSummary(toolName: string, input: unknown): string | null {
  if (!input || typeof input !== "object") return null;
  const inp = input as Record<string, unknown>;

  switch (toolName) {
    case "bash_exec":
      return typeof inp.command === "string" ? inp.command : null;
    case "web_fetch":
    case "WebFetch":
      return typeof inp.url === "string" ? inp.url : null;
    case "web_search":
    case "WebSearch":
      return typeof inp.query === "string" ? inp.query : null;
    case "browser_navigate":
      return typeof inp.url === "string" ? inp.url : null;
    case "browser_act":
      if (typeof inp.action !== "string") return null;
      return typeof inp.target === "string"
        ? `${inp.action} ${inp.target}`
        : inp.action;
    case "browser_screenshot":
      return null;
    case "read_workspace_file":
    case "read_file":
    case "Read":
      return (
        (typeof inp.file_path === "string" ? inp.file_path : null) ??
        (typeof inp.path === "string" ? inp.path : null)
      );
    case "write_workspace_file":
    case "write_file":
    case "Write":
      return (
        (typeof inp.file_path === "string" ? inp.file_path : null) ??
        (typeof inp.path === "string" ? inp.path : null)
      );
    case "delete_workspace_file":
      return typeof inp.file_path === "string" ? inp.file_path : null;
    case "glob":
    case "Glob":
      return typeof inp.pattern === "string" ? inp.pattern : null;
    case "grep":
    case "Grep":
      return typeof inp.pattern === "string" ? inp.pattern : null;
    case "edit_file":
    case "Edit":
      return typeof inp.file_path === "string" ? inp.file_path : null;
    case "TodoWrite": {
      const todos = Array.isArray(inp.todos) ? inp.todos : [];
      const active = todos.find(
        (t: unknown) =>
          t !== null &&
          typeof t === "object" &&
          (t as Record<string, unknown>).status === "in_progress",
      ) as Record<string, unknown> | undefined;
      if (active && typeof active.activeForm === "string")
        return active.activeForm;
      if (active && typeof active.content === "string") return active.content;
      return null;
    }
    case TOOL_AGENT:
    case TOOL_TASK:
      return typeof inp.description === "string"
        ? inp.description
        : typeof inp.prompt === "string"
          ? truncate(inp.prompt, 60)
          : null;
    case TOOL_TASK_OUTPUT:
      return typeof inp.agentId === "string" ? inp.agentId : null;
    default:
      return null;
  }
}

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "\u2026";
}

const STRIPPABLE_EXTENSIONS =
  /\.(md|csv|json|txt|yaml|yml|xml|html|js|ts|py|sh|toml|cfg|ini|log|pdf|png|jpg|jpeg|gif|svg|mp4|mp3|wav|zip|tar|gz)$/i;

export function humanizeFileName(filePath: string): string {
  const fileName = filePath.split("/").pop() ?? filePath;
  const stem = fileName.replace(STRIPPABLE_EXTENSIONS, "");
  const words = stem
    .replace(/[_-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => {
      if (w === w.toUpperCase()) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });
  return `"${words.join(" ")}"`;
}

/* ------------------------------------------------------------------ */
/*  Animation text                                                     */
/* ------------------------------------------------------------------ */

// web_search accepts a deep-search arg that dispatches to a multi-step
// research model; render a distinct verb ("Researching"/"Researched"/
// "Research failed") so users know the call takes longer.
function _isDeepWebSearch(part: ToolUIPart): boolean {
  const input = part.input as Record<string, unknown> | undefined;
  return input?.deep === true;
}

export function getAnimationText(
  part: ToolUIPart,
  category: ToolCategory,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const toolName = extractToolName(part);
  const summary = getInputSummary(toolName, part.input);
  const shortSummary = summary ? truncate(summary, 60) : null;
  const displayName = formatToolName(toolName, locale);
  const m = (key: MessageKey, values?: Record<string, string | number>) =>
    getMessage(locale, key, values);

  switch (part.state) {
    case "input-streaming":
    case "input-available": {
      switch (category) {
        case "bash":
          return shortSummary
            ? m("chatTools4.generic.bashRunningNamed", {
                summary: shortSummary,
              })
            : m("chatTools4.generic.bashRunningGeneric");
        case "web":
          if (toolName === "WebSearch" || toolName === "web_search") {
            const deep = _isDeepWebSearch(part);
            if (shortSummary) {
              return deep
                ? m("chatTools4.generic.webResearchingNamed", {
                    summary: shortSummary,
                  })
                : m("chatTools4.generic.webSearchingNamed", {
                    summary: shortSummary,
                  });
            }
            return deep
              ? m("chatTools4.generic.webResearchingGeneric")
              : m("chatTools4.generic.webSearchingGeneric");
          }
          return shortSummary
            ? m("chatTools4.generic.webFetchingNamed", {
                summary: shortSummary,
              })
            : m("chatTools4.generic.webFetchingGeneric");
        case "browser":
          if (toolName === "browser_screenshot") {
            return m("chatTools4.generic.browserScreenshotting");
          }
          return shortSummary
            ? m("chatTools4.generic.browserBrowsingNamed", {
                summary: shortSummary,
              })
            : m("chatTools4.generic.browserBrowsingGeneric");
        case "file-read":
          return summary
            ? m("chatTools4.generic.fileReadNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.fileReadGeneric");
        case "file-write":
          return summary
            ? m("chatTools4.generic.fileWriteNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.fileWriteGeneric");
        case "file-delete":
          return summary
            ? m("chatTools4.generic.fileDeleteNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.fileDeleteGeneric");
        case "file-list":
          return shortSummary
            ? m("chatTools4.generic.fileListNamed", { summary: shortSummary })
            : m("chatTools4.generic.fileListGeneric");
        case "search":
          return shortSummary
            ? m("chatTools4.generic.searchNamed", { summary: shortSummary })
            : m("chatTools4.generic.searchGeneric");
        case "edit":
          return summary
            ? m("chatTools4.generic.editNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.editGeneric");
        case "todo":
          return shortSummary
            ? shortSummary
            : m("chatTools4.generic.todoUpdating");
        case "compaction":
          return m("chatTools4.generic.compactionRunning");
        case "agent":
          if (toolName === TOOL_TASK_OUTPUT) {
            return shortSummary
              ? m("chatTools4.generic.subCheckingNamed", { name: shortSummary })
              : m("chatTools4.generic.subCheckingGeneric");
          }
          return shortSummary
            ? m("chatTools4.generic.subRunningNamed", { summary: shortSummary })
            : m("chatTools4.generic.subStartingGeneric");
        default:
          return m("chatTools4.generic.runningDefault", { name: displayName });
      }
    }
    case "output-available": {
      switch (category) {
        case "bash":
          return shortSummary
            ? m("chatTools4.generic.bashDoneNamed", { summary: shortSummary })
            : m("chatTools4.generic.bashDoneGeneric");
        case "web":
          if (toolName === "WebSearch" || toolName === "web_search") {
            const deep = _isDeepWebSearch(part);
            if (shortSummary) {
              return deep
                ? m("chatTools4.generic.webResearchedNamed", {
                    summary: shortSummary,
                  })
                : m("chatTools4.generic.webSearchedNamed", {
                    summary: shortSummary,
                  });
            }
            return deep
              ? m("chatTools4.generic.webResearchCompleted")
              : m("chatTools4.generic.webSearchCompleted");
          }
          return shortSummary
            ? m("chatTools4.generic.webFetchedNamed", { summary: shortSummary })
            : m("chatTools4.generic.webFetchedGeneric");
        case "browser":
          if (toolName === "browser_screenshot") {
            return m("chatTools4.generic.browserScreenshotDone");
          }
          return shortSummary
            ? m("chatTools4.generic.browserBrowsedNamed", {
                summary: shortSummary,
              })
            : m("chatTools4.generic.browserDoneGeneric");
        case "file-read":
          return summary
            ? m("chatTools4.generic.fileReadDoneNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.fileReadDoneGeneric");
        case "file-write":
          return summary
            ? m("chatTools4.generic.fileWriteDoneNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.fileWriteDoneGeneric");
        case "file-delete":
          return summary
            ? m("chatTools4.generic.fileDeleteDoneNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.fileDeleteDoneGeneric");
        case "file-list":
          return m("chatTools4.generic.fileListDone");
        case "search":
          return shortSummary
            ? m("chatTools4.generic.searchDoneNamed", {
                summary: shortSummary,
              })
            : m("chatTools4.generic.searchDoneGeneric");
        case "edit":
          return summary
            ? m("chatTools4.generic.editDoneNamed", {
                name: humanizeFileName(summary),
              })
            : m("chatTools4.generic.editDoneGeneric");
        case "todo":
          return m("chatTools4.generic.todoUpdated");
        case "compaction":
          return m("chatTools4.generic.compactionDone");
        case "agent": {
          if (toolName === TOOL_TASK_OUTPUT) {
            const taskOut =
              part.output && typeof part.output === "object"
                ? (part.output as Record<string, unknown>)
                : null;
            if (taskOut?.retrieval_status === "timeout") {
              return m("chatTools4.generic.subStillRunning");
            }
            return m("chatTools4.generic.subResultReceived");
          }
          const agentOut =
            part.output && typeof part.output === "object"
              ? (part.output as Record<string, unknown>)
              : null;
          if (agentOut?.isAsync || agentOut?.status === "async_launched") {
            return shortSummary
              ? m("chatTools4.generic.subStartedNamed", {
                  summary: shortSummary,
                })
              : m("chatTools4.generic.subStartedGeneric");
          }
          return shortSummary
            ? m("chatTools4.generic.subCompletedNamed", {
                summary: shortSummary,
              })
            : m("chatTools4.generic.subCompletedGeneric");
        }
        default:
          return m("chatTools4.generic.completedDefault", {
            name: displayName,
          });
      }
    }
    case "output-error": {
      switch (category) {
        case "bash":
          return m("chatTools4.generic.bashFailed");
        case "web":
          if (toolName === "WebSearch" || toolName === "web_search") {
            return _isDeepWebSearch(part)
              ? m("chatTools4.generic.webResearchFailed")
              : m("chatTools4.generic.webSearchFailed");
          }
          return m("chatTools4.generic.webFetchFailed");
        case "browser":
          return m("chatTools4.generic.browserFailed");
        case "file-read":
          return m("chatTools4.generic.fileReadFailed");
        case "file-write":
          return m("chatTools4.generic.fileWriteFailed");
        case "file-delete":
          return m("chatTools4.generic.fileDeleteFailed");
        case "file-list":
          return m("chatTools4.generic.fileListFailed");
        case "search":
          return m("chatTools4.generic.searchFailed");
        case "edit":
          return m("chatTools4.generic.editFailed");
        case "todo":
          return m("chatTools4.generic.todoFailed");
        case "agent":
          return m("chatTools4.generic.subFailed");
        default:
          return m("chatTools4.generic.failedDefault", { name: displayName });
      }
    }
    default:
      return m("chatTools4.generic.runningDefault", { name: displayName });
  }
}
