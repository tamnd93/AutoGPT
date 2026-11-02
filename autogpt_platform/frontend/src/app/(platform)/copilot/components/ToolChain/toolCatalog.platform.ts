import { getBlockDisplayName } from "../../helpers/toolDisplay";
import {
  quoted,
  quotedName,
  strField,
  type ToolInput,
  type ToolMeta,
} from "./toolCatalog.shared";

export const PLATFORM_TOOL_CATALOG: Record<string, ToolMeta> = {
  TodoWrite: {
    category: "todo",
    running: "chatTools3.catalog.TodoWrite.running",
    done: "chatTools3.catalog.TodoWrite.done",
  },
  web_search: {
    category: "web",
    running: "chatTools3.catalog.web_search.running",
    done: "chatTools3.catalog.web_search.done",
    subject: (input) => quoted(input, "query"),
  },
  web_fetch: {
    category: "web",
    running: "chatTools3.catalog.web_fetch.running",
    done: "chatTools3.catalog.web_fetch.done",
    subject: (input) => quoted(input, "url", 60),
  },
  browser_navigate: {
    category: "browser",
    running: "chatTools3.catalog.browser_navigate.running",
    done: "chatTools3.catalog.browser_navigate.done",
    subject: (input) => quoted(input, "url", 60),
  },
  browser_act: {
    category: "browser",
    running: "chatTools3.catalog.browser_act.running",
    done: "chatTools3.catalog.browser_act.done",
  },
  browser_screenshot: {
    category: "browser",
    running: "chatTools3.catalog.browser_screenshot.running",
    done: "chatTools3.catalog.browser_screenshot.done",
  },
  bash_exec: {
    category: "bash",
    running: "chatTools3.catalog.bash_exec.running",
    done: "chatTools3.catalog.bash_exec.done",
    subject: (input) => quoted(input, "command", 60),
  },
  start_desktop: {
    category: "browser",
    running: "chatTools3.catalog.start_desktop.running",
    done: "chatTools3.catalog.start_desktop.done",
  },
  list_workspace_files: {
    category: "file-list",
    running: "chatTools3.catalog.list_workspace_files.running",
    done: "chatTools3.catalog.list_workspace_files.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  read_workspace_file: {
    category: "file-read",
    running: "chatTools3.catalog.read_workspace_file.running",
    done: "chatTools3.catalog.read_workspace_file.done",
    subject: (input) =>
      quoted(input, "path", 60) ?? quoted(input, "filename", 60),
  },
  write_workspace_file: {
    category: "file-write",
    running: "chatTools3.catalog.write_workspace_file.running",
    done: "chatTools3.catalog.write_workspace_file.done",
    subject: (input) =>
      quoted(input, "path", 60) ?? quoted(input, "filename", 60),
  },
  read_tool_result: {
    category: "file-read",
    running: "chatTools3.catalog.read_tool_result.running",
    done: "chatTools3.catalog.read_tool_result.done",
  },
  delete_workspace_file: {
    category: "file-delete",
    running: "chatTools3.catalog.delete_workspace_file.running",
    done: "chatTools3.catalog.delete_workspace_file.done",
    subject: (input) =>
      quoted(input, "path", 60) ?? quoted(input, "filename", 60),
  },
  list_schedules: {
    category: "schedule",
    running: "chatTools3.catalog.list_schedules.running",
    done: "chatTools3.catalog.list_schedules.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  pause_schedule: {
    category: "schedule",
    running: "chatTools3.catalog.pause_schedule.running",
    done: "chatTools3.catalog.pause_schedule.done",
  },
  resume_schedule: {
    category: "schedule",
    running: "chatTools3.catalog.resume_schedule.running",
    done: "chatTools3.catalog.resume_schedule.done",
  },
  list_routines: {
    category: "schedule",
    running: "chatTools3.catalog.list_routines.running",
    done: "chatTools3.catalog.list_routines.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  schedule_routine: {
    category: "schedule",
    running: "chatTools3.catalog.schedule_routine.running",
    done: "chatTools3.catalog.schedule_routine.done",
    subject: (input) => quoted(input, "title"),
  },
  delete_schedule: {
    category: "schedule",
    running: "chatTools3.catalog.delete_schedule.running",
    done: "chatTools3.catalog.delete_schedule.done",
  },
  schedule_followup: {
    category: "schedule",
    running: "chatTools3.catalog.schedule_followup.running",
    done: "chatTools3.catalog.schedule_followup.done",
  },
  post_to_chat_platform: {
    category: "chat",
    running: "chatTools3.catalog.post_to_chat_platform.running",
    done: "chatTools3.catalog.post_to_chat_platform.done",
    subject: (input) => quoted(input, "channel"),
  },
  edit_chat_platform_message: {
    category: "chat",
    running: "chatTools3.catalog.edit_chat_platform_message.running",
    done: "chatTools3.catalog.edit_chat_platform_message.done",
  },
  list_chat_platform_channels: {
    category: "chat",
    running: "chatTools3.catalog.list_chat_platform_channels.running",
    done: "chatTools3.catalog.list_chat_platform_channels.done",
    empty: "chatTools3.catalog.empty.noneFound",
  },
  list_agent_triggers: {
    category: "trigger",
    running: "chatTools3.catalog.list_agent_triggers.running",
    done: "chatTools3.catalog.list_agent_triggers.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  setup_agent_webhook_trigger: {
    category: "trigger",
    running: "chatTools3.catalog.setup_agent_webhook_trigger.running",
    done: "chatTools3.catalog.setup_agent_webhook_trigger.done",
  },
  list_presets: {
    category: "preset",
    running: "chatTools3.catalog.list_presets.running",
    done: "chatTools3.catalog.list_presets.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  update_preset: {
    category: "preset",
    running: "chatTools3.catalog.update_preset.running",
    done: "chatTools3.catalog.update_preset.done",
  },
  delete_preset: {
    category: "preset",
    running: "chatTools3.catalog.delete_preset.running",
    done: "chatTools3.catalog.delete_preset.done",
  },
  run_block: {
    category: "block",
    running: "chatTools3.catalog.run_block.running",
    done: "chatTools3.catalog.run_block.done",
    subject: (_input, context) =>
      quotedName(getBlockDisplayName(context.displayName, context.output)),
  },
  find_capability: {
    category: "block",
    running: "chatTools3.catalog.find_capability.running",
    done: "chatTools3.catalog.find_capability.done",
    subject: (input) => quoted(input, "query"),
  },
  describe_capability: {
    category: "block",
    running: "chatTools3.catalog.describe_capability.running",
    done: "chatTools3.catalog.describe_capability.done",
    subject: (input) => quotedName(strField(input, "id")),
  },
  run_capability: {
    category: "block",
    running: "chatTools3.catalog.run_capability.running",
    done: "chatTools3.catalog.run_capability.done",
    subject: (input, context) =>
      quotedName(
        getBlockDisplayName(context.displayName, context.output) ??
          strField(input, "id"),
      ),
  },
  resume_capability: {
    category: "block",
    running: "chatTools3.catalog.resume_capability.running",
    done: "chatTools3.catalog.resume_capability.done",
    subject: (_input, context) =>
      quotedName(getBlockDisplayName(context.displayName, context.output)),
  },
  schedule_agent: {
    category: "agent",
    running: "chatTools3.catalog.schedule_agent.running",
    done: "chatTools3.catalog.schedule_agent.done",
  },
  continue_run_block: {
    category: "block",
    running: "chatTools3.catalog.continue_run_block.running",
    done: "chatTools3.catalog.continue_run_block.done",
    subject: (_input, context) =>
      quotedName(getBlockDisplayName(context.displayName, context.output)),
  },
  run_mcp_tool: {
    category: "mcp",
    running: "chatTools3.catalog.run_mcp_tool.running",
    done: "chatTools3.catalog.run_mcp_tool.done",
    subject: (input) => quoted(input, "tool_name"),
  },
  get_mcp_guide: {
    category: "docs",
    running: "chatTools3.catalog.get_mcp_guide.running",
    done: "chatTools3.catalog.get_mcp_guide.done",
  },
  search_docs: {
    category: "docs",
    running: "chatTools3.catalog.search_docs.running",
    done: "chatTools3.catalog.search_docs.done",
    subject: (input) => quoted(input, "query"),
  },
  get_doc_page: {
    category: "docs",
    running: "chatTools3.catalog.get_doc_page.running",
    done: "chatTools3.catalog.get_doc_page.done",
    subject: (input) => strField(input, "path"),
  },
  store_skill: {
    category: "skill",
    running: "chatTools3.catalog.store_skill.running",
    done: "chatTools3.catalog.store_skill.done",
    subject: (input) => quoted(input, "name"),
  },
  read_skill: {
    category: "skill",
    running: "chatTools3.catalog.read_skill.running",
    done: "chatTools3.catalog.read_skill.done",
    subject: (input) => quoted(input, "name"),
  },
  delete_skill: {
    category: "skill",
    running: "chatTools3.catalog.delete_skill.running",
    done: "chatTools3.catalog.delete_skill.done",
    subject: (input) => quoted(input, "name"),
  },
  list_skills: {
    category: "skill",
    running: "chatTools3.catalog.list_skills.running",
    done: "chatTools3.catalog.list_skills.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  connect_integration: {
    category: "integration",
    running: "chatTools3.catalog.connect_integration.running",
    done: "chatTools3.catalog.connect_integration.done",
    subject: (input) => strField(input, "provider"),
  },
  search_feature_requests: {
    category: "feature",
    running: "chatTools3.catalog.search_feature_requests.running",
    done: "chatTools3.catalog.search_feature_requests.done",
    subject: (input) => quoted(input, "query"),
  },
  create_feature_request: {
    category: "feature",
    running: "chatTools3.catalog.create_feature_request.running",
    done: "chatTools3.catalog.create_feature_request.done",
    subject: (input) => quoted(input, "title"),
  },
  get_platform_info: {
    category: "info",
    running: "chatTools3.catalog.get_platform_info.running",
    done: "chatTools3.catalog.get_platform_info.done",
  },
  ask_question: {
    category: "question",
    running: "chatTools3.catalog.ask_question.running",
    done: "chatTools3.catalog.ask_question.done",
    subject: (input) => {
      const direct = quoted(input, "question", 60);
      if (direct) return direct;
      const first = Array.isArray(input.questions)
        ? (input.questions as unknown[])[0]
        : null;
      return first && typeof first === "object"
        ? quoted(first as ToolInput, "question", 60)
        : null;
    },
  },
};
