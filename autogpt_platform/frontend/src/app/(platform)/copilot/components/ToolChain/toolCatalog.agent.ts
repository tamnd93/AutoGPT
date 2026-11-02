import { quoted, quotedName, type ToolMeta } from "./toolCatalog.shared";
import { getAgentDisplayName } from "../../helpers/toolDisplay";

export const AGENT_TOOL_CATALOG: Record<string, ToolMeta> = {
  add_understanding: {
    category: "memory",
    running: "chatTools3.catalog.add_understanding.running",
    done: "chatTools3.catalog.add_understanding.done",
  },
  create_agent: {
    category: "agent-build",
    running: "chatTools3.catalog.create_agent.running",
    done: "chatTools3.catalog.create_agent.done",
  },
  customize_agent: {
    category: "agent-build",
    running: "chatTools3.catalog.customize_agent.running",
    done: "chatTools3.catalog.customize_agent.done",
  },
  edit_agent: {
    category: "agent-build",
    running: "chatTools3.catalog.edit_agent.running",
    done: "chatTools3.catalog.edit_agent.done",
  },
  validate_agent_graph: {
    category: "agent-build",
    running: "chatTools3.catalog.validate_agent_graph.running",
    done: "chatTools3.catalog.validate_agent_graph.done",
  },
  fix_agent_graph: {
    category: "agent-build",
    running: "chatTools3.catalog.fix_agent_graph.running",
    done: "chatTools3.catalog.fix_agent_graph.done",
  },
  enter_agent_building_mode: {
    category: "agent-build",
    running: "chatTools3.catalog.enter_agent_building_mode.running",
    done: "chatTools3.catalog.enter_agent_building_mode.done",
  },
  get_agent_building_guide: {
    category: "docs",
    running: "chatTools3.catalog.get_agent_building_guide.running",
    done: "chatTools3.catalog.get_agent_building_guide.done",
  },
  decompose_goal: {
    category: "plan",
    running: "chatTools3.catalog.decompose_goal.running",
    done: "chatTools3.catalog.decompose_goal.done",
    subject: (input) => quoted(input, "goal"),
  },
  find_block: {
    category: "block",
    running: "chatTools3.catalog.find_block.running",
    done: "chatTools3.catalog.find_block.done",
    subject: (input) => quoted(input, "query"),
  },
  find_agent: {
    category: "agent",
    running: "chatTools3.catalog.find_agent.running",
    done: "chatTools3.catalog.find_agent.done",
    subject: (input) => quoted(input, "query"),
  },
  find_library_agent: {
    category: "agent",
    running: "chatTools3.catalog.find_library_agent.running",
    done: "chatTools3.catalog.find_library_agent.done",
    subject: (input) => quoted(input, "query"),
  },
  memory_search: {
    category: "memory",
    running: "chatTools3.catalog.memory_search.running",
    done: "chatTools3.catalog.memory_search.done",
    subject: (input) => quoted(input, "query"),
  },
  memory_store: {
    category: "memory",
    running: "chatTools3.catalog.memory_store.running",
    done: "chatTools3.catalog.memory_store.done",
    subject: (input) => quoted(input, "name"),
  },
  memory_forget_search: {
    category: "memory",
    running: "chatTools3.catalog.memory_forget_search.running",
    done: "chatTools3.catalog.memory_forget_search.done",
  },
  memory_forget_confirm: {
    category: "memory",
    running: "chatTools3.catalog.memory_forget_confirm.running",
    done: "chatTools3.catalog.memory_forget_confirm.done",
  },
  create_folder: {
    category: "folder",
    running: "chatTools3.catalog.create_folder.running",
    done: "chatTools3.catalog.create_folder.done",
    subject: (input) => quoted(input, "name"),
  },
  list_folders: {
    category: "folder",
    running: "chatTools3.catalog.list_folders.running",
    done: "chatTools3.catalog.list_folders.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  update_folder: {
    category: "folder",
    running: "chatTools3.catalog.update_folder.running",
    done: "chatTools3.catalog.update_folder.done",
    subject: (input) => quoted(input, "name"),
  },
  move_folder: {
    category: "folder",
    running: "chatTools3.catalog.move_folder.running",
    done: "chatTools3.catalog.move_folder.done",
  },
  delete_folder: {
    category: "folder",
    running: "chatTools3.catalog.delete_folder.running",
    done: "chatTools3.catalog.delete_folder.done",
  },
  move_agents_to_folder: {
    category: "folder",
    running: "chatTools3.catalog.move_agents_to_folder.running",
    done: "chatTools3.catalog.move_agents_to_folder.done",
  },
  run_agent: {
    category: "agent",
    running: "chatTools3.catalog.run_agent.running",
    done: "chatTools3.catalog.run_agent.done",
    subject: (_input, context) =>
      quotedName(getAgentDisplayName(context.displayName, context.output)),
  },
  view_agent_output: {
    category: "agent",
    running: "chatTools3.catalog.view_agent_output.running",
    done: "chatTools3.catalog.view_agent_output.done",
  },
  run_sub_session: {
    category: "agent",
    running: "chatTools3.catalog.run_sub_session.running",
    done: "chatTools3.catalog.run_sub_session.done",
    subject: (input) => quoted(input, "prompt", 45),
  },
  get_sub_session_result: {
    category: "agent",
    running: "chatTools3.catalog.get_sub_session_result.running",
    done: "chatTools3.catalog.get_sub_session_result.done",
  },
  delegate_to_expert: {
    category: "agent",
    running: "chatTools3.catalog.delegate_to_expert.running",
    done: "chatTools3.catalog.delegate_to_expert.done",
    subject: (input) => quoted(input, "prompt", 45),
  },
  consult_teammate: {
    category: "team",
    running: "chatTools3.catalog.consult_teammate.running",
    done: "chatTools3.catalog.consult_teammate.done",
    subject: (input) => quoted(input, "question", 45),
  },
  find_session: {
    category: "team",
    running: "chatTools3.catalog.find_session.running",
    done: "chatTools3.catalog.find_session.done",
  },
  message_session: {
    category: "team",
    running: "chatTools3.catalog.message_session.running",
    done: "chatTools3.catalog.message_session.done",
    subject: (input) => quoted(input, "message", 45),
  },
  handoff_to_expert: {
    category: "agent",
    running: "chatTools3.catalog.handoff_to_expert.running",
    done: "chatTools3.catalog.handoff_to_expert.done",
    subject: (input) => quoted(input, "prompt", 45),
  },
  hire_expert: {
    category: "team",
    running: "chatTools3.catalog.hire_expert.running",
    done: "chatTools3.catalog.hire_expert.done",
  },
  raise_expert: {
    category: "team",
    running: "chatTools3.catalog.raise_expert.running",
    done: "chatTools3.catalog.raise_expert.done",
    subject: (input) => quoted(input, "name", 30),
  },
  update_expert: {
    category: "team",
    running: "chatTools3.catalog.update_expert.running",
    done: "chatTools3.catalog.update_expert.done",
    subject: (input) => quoted(input, "name", 30),
  },
  confirm_expert_change: {
    category: "team",
    running: "chatTools3.catalog.confirm_expert_change.running",
    done: "chatTools3.catalog.confirm_expert_change.done",
  },
  update_expert_soul: {
    category: "team",
    running: "chatTools3.catalog.update_expert_soul.running",
    done: "chatTools3.catalog.update_expert_soul.done",
  },
  confirm_expert_soul_update: {
    category: "team",
    running: "chatTools3.catalog.confirm_expert_soul_update.running",
    done: "chatTools3.catalog.confirm_expert_soul_update.done",
  },
  expert_onboarding: {
    category: "question",
    running: "chatTools3.catalog.expert_onboarding.running",
    done: "chatTools3.catalog.expert_onboarding.done",
  },
  list_team: {
    category: "team",
    running: "chatTools3.catalog.list_team.running",
    done: "chatTools3.catalog.list_team.done",
    empty: "chatTools3.catalog.empty.noOneYet",
  },
  list_expert_chats: {
    category: "team",
    running: "chatTools3.catalog.list_expert_chats.running",
    done: "chatTools3.catalog.list_expert_chats.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  read_expert_chat: {
    category: "team",
    running: "chatTools3.catalog.read_expert_chat.running",
    done: "chatTools3.catalog.read_expert_chat.done",
  },
  list_expert_workflows: {
    category: "team",
    running: "chatTools3.catalog.list_expert_workflows.running",
    done: "chatTools3.catalog.list_expert_workflows.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  install_expert_workflow: {
    category: "team",
    running: "chatTools3.catalog.install_expert_workflow.running",
    done: "chatTools3.catalog.install_expert_workflow.done",
  },
  remove_expert_workflow: {
    category: "team",
    running: "chatTools3.catalog.remove_expert_workflow.running",
    done: "chatTools3.catalog.remove_expert_workflow.done",
  },
  list_expert_credentials: {
    category: "team",
    running: "chatTools3.catalog.list_expert_credentials.running",
    done: "chatTools3.catalog.list_expert_credentials.done",
    empty: "chatTools3.catalog.empty.noneYet",
  },
  grant_expert_credential: {
    category: "team",
    running: "chatTools3.catalog.grant_expert_credential.running",
    done: "chatTools3.catalog.grant_expert_credential.done",
  },
  revoke_expert_credential: {
    category: "team",
    running: "chatTools3.catalog.revoke_expert_credential.running",
    done: "chatTools3.catalog.revoke_expert_credential.done",
  },
  request_credential_grant: {
    category: "team",
    running: "chatTools3.catalog.request_credential_grant.running",
    done: "chatTools3.catalog.request_credential_grant.done",
  },
};
