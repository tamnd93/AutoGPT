import { chatTools3En } from "./chat-tools-3.en";

export const chatTools3Vi: Partial<Record<keyof typeof chatTools3En, string>> =
  {
    "chatTools3.catalog.add_understanding.running": "Đang ghi nhớ ngữ cảnh",
    "chatTools3.catalog.add_understanding.done": "Đã ghi nhớ ngữ cảnh",
    "chatTools3.catalog.create_agent.running": "Đang tạo workflow",
    "chatTools3.catalog.create_agent.done": "Đã tạo workflow",
    "chatTools3.catalog.customize_agent.running": "Đang tuỳ chỉnh workflow",
    "chatTools3.catalog.customize_agent.done": "Đã tuỳ chỉnh workflow",
    "chatTools3.catalog.edit_agent.running": "Đang sửa workflow",
    "chatTools3.catalog.edit_agent.done": "Đã sửa workflow",
    "chatTools3.catalog.validate_agent_graph.running": "Đang kiểm tra workflow",
    "chatTools3.catalog.validate_agent_graph.done": "Đã kiểm tra workflow",
    "chatTools3.catalog.fix_agent_graph.running": "Đang sửa lỗi workflow",
    "chatTools3.catalog.fix_agent_graph.done": "Đã sửa lỗi workflow",
    "chatTools3.catalog.enter_agent_building_mode.running":
      "Đang vào chế độ dựng workflow",
    "chatTools3.catalog.enter_agent_building_mode.done":
      "Đã vào chế độ dựng workflow",
    "chatTools3.catalog.get_agent_building_guide.running":
      "Đang đọc hướng dẫn dựng workflow",
    "chatTools3.catalog.get_agent_building_guide.done":
      "Đã đọc hướng dẫn dựng workflow",
    "chatTools3.catalog.decompose_goal.running": "Đang chia nhỏ mục tiêu",
    "chatTools3.catalog.decompose_goal.done": "Đã chia nhỏ mục tiêu",
    "chatTools3.catalog.find_block.running": "Đang tìm khối cho",
    "chatTools3.catalog.find_block.done": "Đã tìm thấy khối cho",
    "chatTools3.catalog.find_agent.running": "Đang tìm workflow cho",
    "chatTools3.catalog.find_agent.done": "Đã tìm thấy workflow cho",
    "chatTools3.catalog.find_library_agent.running":
      "Đang tìm trong thư viện của bạn",
    "chatTools3.catalog.find_library_agent.done":
      "Đã tìm trong thư viện của bạn",
    "chatTools3.catalog.memory_search.running": "Đang tìm trong ghi nhớ",
    "chatTools3.catalog.memory_search.done": "Đã tìm trong ghi nhớ",
    "chatTools3.catalog.memory_store.running": "Đang lưu vào ghi nhớ",
    "chatTools3.catalog.memory_store.done": "Đã lưu vào ghi nhớ",
    "chatTools3.catalog.memory_forget_search.running":
      "Đang tìm ghi nhớ để quên",
    "chatTools3.catalog.memory_forget_search.done":
      "Đã tìm thấy ghi nhớ để quên",
    "chatTools3.catalog.memory_forget_confirm.running": "Đang quên ghi nhớ",
    "chatTools3.catalog.memory_forget_confirm.done": "Đã quên ghi nhớ",
    "chatTools3.catalog.create_folder.running": "Đang tạo thư mục",
    "chatTools3.catalog.create_folder.done": "Đã tạo thư mục",
    "chatTools3.catalog.list_folders.running": "Đang liệt kê thư mục",
    "chatTools3.catalog.list_folders.done": "Đã liệt kê thư mục",
    "chatTools3.catalog.update_folder.running": "Đang cập nhật thư mục",
    "chatTools3.catalog.update_folder.done": "Đã cập nhật thư mục",
    "chatTools3.catalog.move_folder.running": "Đang di chuyển thư mục",
    "chatTools3.catalog.move_folder.done": "Đã di chuyển thư mục",
    "chatTools3.catalog.delete_folder.running": "Đang xoá thư mục",
    "chatTools3.catalog.delete_folder.done": "Đã xoá thư mục",
    "chatTools3.catalog.move_agents_to_folder.running":
      "Đang chuyển workflow vào thư mục",
    "chatTools3.catalog.move_agents_to_folder.done":
      "Đã chuyển workflow vào thư mục",
    "chatTools3.catalog.run_agent.running": "Đang chạy workflow",
    "chatTools3.catalog.run_agent.done": "Đã chạy workflow",
    "chatTools3.catalog.view_agent_output.running": "Đang xem đầu ra workflow",
    "chatTools3.catalog.view_agent_output.done": "Đã xem đầu ra workflow",
    "chatTools3.catalog.run_sub_session.running": "Đang giao việc phụ:",
    "chatTools3.catalog.run_sub_session.done": "Đã hoàn tất việc phụ:",
    "chatTools3.catalog.get_sub_session_result.running":
      "Đang xem tiến độ phiên phụ",
    "chatTools3.catalog.get_sub_session_result.done": "Đã theo kịp phiên phụ",
    "chatTools3.catalog.delegate_to_expert.running":
      "Đang giao cho chuyên gia:",
    "chatTools3.catalog.delegate_to_expert.done": "Chuyên gia đã xử lý:",
    "chatTools3.catalog.consult_teammate.running":
      "Đang nhờ chuyên gia kiểm tra:",
    "chatTools3.catalog.consult_teammate.done": "Chuyên gia đã kiểm tra:",
    "chatTools3.catalog.find_session.running": "Đang tìm phiên",
    "chatTools3.catalog.find_session.done": "Đã tìm thấy phiên",
    "chatTools3.catalog.message_session.running": "Đang nhắn cho phiên:",
    "chatTools3.catalog.message_session.done": "Đã nhắn cho phiên:",
    "chatTools3.catalog.handoff_to_expert.running": "Đang chuyển giao:",
    "chatTools3.catalog.handoff_to_expert.done": "Đã chuyển giao:",
    "chatTools3.catalog.hire_expert.running": "Đang soạn đề xuất tuyển",
    "chatTools3.catalog.hire_expert.done": "Sẵn sàng tuyển",
    "chatTools3.catalog.raise_expert.running": "Đang viết bản mô tả cho",
    "chatTools3.catalog.raise_expert.done": "Sẵn sàng tạo",
    "chatTools3.catalog.update_expert.running": "Đang cập nhật",
    "chatTools3.catalog.update_expert.done": "Đã cập nhật",
    "chatTools3.catalog.confirm_expert_change.running": "Đang thêm vào đội",
    "chatTools3.catalog.confirm_expert_change.done": "Đã thêm vào đội",
    "chatTools3.catalog.update_expert_soul.running":
      "Đang soạn bản cập nhật Soul",
    "chatTools3.catalog.update_expert_soul.done":
      "Bản cập nhật Soul đã sẵn sàng",
    "chatTools3.catalog.confirm_expert_soul_update.running":
      "Đang cập nhật Soul",
    "chatTools3.catalog.confirm_expert_soul_update.done": "Đã cập nhật Soul",
    "chatTools3.catalog.expert_onboarding.running": "Đang chuẩn bị vài câu hỏi",
    "chatTools3.catalog.expert_onboarding.done": "Đã hỏi vài câu hỏi",
    "chatTools3.catalog.list_team.running": "Đang kiểm tra đội của bạn",
    "chatTools3.catalog.list_team.done": "Đã kiểm tra đội của bạn",
    "chatTools3.catalog.list_expert_chats.running":
      "Đang xem chat của chuyên gia",
    "chatTools3.catalog.list_expert_chats.done": "Đã xem chat của chuyên gia",
    "chatTools3.catalog.read_expert_chat.running":
      "Đang đọc chat của chuyên gia",
    "chatTools3.catalog.read_expert_chat.done": "Đã đọc chat của chuyên gia",
    "chatTools3.catalog.list_expert_workflows.running":
      "Đang kiểm tra workflow của chuyên gia",
    "chatTools3.catalog.list_expert_workflows.done":
      "Đã kiểm tra workflow của chuyên gia",
    "chatTools3.catalog.install_expert_workflow.running":
      "Đang thêm workflow cho chuyên gia",
    "chatTools3.catalog.install_expert_workflow.done":
      "Đã thêm workflow cho chuyên gia",
    "chatTools3.catalog.remove_expert_workflow.running":
      "Đang gỡ workflow khỏi chuyên gia",
    "chatTools3.catalog.remove_expert_workflow.done":
      "Đã gỡ workflow khỏi chuyên gia",
    "chatTools3.catalog.list_expert_credentials.running":
      "Đang kiểm tra thông tin kết nối của chuyên gia",
    "chatTools3.catalog.list_expert_credentials.done":
      "Đã kiểm tra thông tin kết nối của chuyên gia",
    "chatTools3.catalog.grant_expert_credential.running":
      "Đang cấp quyền cho chuyên gia",
    "chatTools3.catalog.grant_expert_credential.done":
      "Đã cấp quyền cho chuyên gia",
    "chatTools3.catalog.revoke_expert_credential.running":
      "Đang thu quyền của chuyên gia",
    "chatTools3.catalog.revoke_expert_credential.done":
      "Đã thu quyền của chuyên gia",
    "chatTools3.catalog.request_credential_grant.running":
      "Đang xin quyền truy cập từ bạn",
    "chatTools3.catalog.request_credential_grant.done": "Đã xin quyền truy cập",
    "chatTools3.catalog.TodoWrite.running": "Đang cập nhật tác vụ",
    "chatTools3.catalog.TodoWrite.done": "Đã cập nhật tác vụ",
    "chatTools3.catalog.web_search.running": "Đang tìm trên web",
    "chatTools3.catalog.web_search.done": "Đã tìm trên web",
    "chatTools3.catalog.web_fetch.running": "Đang tải",
    "chatTools3.catalog.web_fetch.done": "Đã tải",
    "chatTools3.catalog.browser_navigate.running": "Đang mở",
    "chatTools3.catalog.browser_navigate.done": "Đã mở",
    "chatTools3.catalog.browser_act.running": "Đang dùng trình duyệt",
    "chatTools3.catalog.browser_act.done": "Đã dùng trình duyệt",
    "chatTools3.catalog.browser_screenshot.running": "Đang chụp màn hình",
    "chatTools3.catalog.browser_screenshot.done": "Đã chụp màn hình",
    "chatTools3.catalog.bash_exec.running": "Đang chạy lệnh",
    "chatTools3.catalog.bash_exec.done": "Đã chạy lệnh",
    "chatTools3.catalog.start_desktop.running": "Đang khởi động desktop",
    "chatTools3.catalog.start_desktop.done": "Đã khởi động desktop",
    "chatTools3.catalog.list_workspace_files.running":
      "Đang liệt kê tệp trong không gian làm việc",
    "chatTools3.catalog.list_workspace_files.done":
      "Đã liệt kê tệp trong không gian làm việc",
    "chatTools3.catalog.read_workspace_file.running": "Đang đọc",
    "chatTools3.catalog.read_workspace_file.done": "Đã đọc",
    "chatTools3.catalog.write_workspace_file.running": "Đang ghi",
    "chatTools3.catalog.write_workspace_file.done": "Đã ghi",
    "chatTools3.catalog.read_tool_result.running": "Đang đọc toàn bộ kết quả",
    "chatTools3.catalog.read_tool_result.done": "Đã đọc toàn bộ kết quả",
    "chatTools3.catalog.delete_workspace_file.running": "Đang xoá",
    "chatTools3.catalog.delete_workspace_file.done": "Đã xoá",
    "chatTools3.catalog.list_schedules.running": "Đang kiểm tra lịch của bạn",
    "chatTools3.catalog.list_schedules.done": "Đã kiểm tra lịch của bạn",
    "chatTools3.catalog.pause_schedule.running": "Đang tạm dừng lịch",
    "chatTools3.catalog.pause_schedule.done": "Đã tạm dừng lịch",
    "chatTools3.catalog.resume_schedule.running": "Đang tiếp tục lịch",
    "chatTools3.catalog.resume_schedule.done": "Đã tiếp tục lịch",
    "chatTools3.catalog.list_routines.running": "Đang kiểm tra routine của bạn",
    "chatTools3.catalog.list_routines.done": "Đã kiểm tra routine của bạn",
    "chatTools3.catalog.schedule_routine.running": "Đang lưu routine",
    "chatTools3.catalog.schedule_routine.done": "Đã lưu routine",
    "chatTools3.catalog.delete_schedule.running": "Đang xoá lịch",
    "chatTools3.catalog.delete_schedule.done": "Đã xoá lịch",
    "chatTools3.catalog.schedule_followup.running": "Đang lên lịch theo dõi",
    "chatTools3.catalog.schedule_followup.done": "Đã lên lịch theo dõi",
    "chatTools3.catalog.post_to_chat_platform.running": "Đang đăng lên",
    "chatTools3.catalog.post_to_chat_platform.done": "Đã đăng lên",
    "chatTools3.catalog.edit_chat_platform_message.running":
      "Đang sửa tin nhắn đã đăng",
    "chatTools3.catalog.edit_chat_platform_message.done":
      "Đã sửa tin nhắn đã đăng",
    "chatTools3.catalog.list_chat_platform_channels.running":
      "Đang liệt kê kênh chat",
    "chatTools3.catalog.list_chat_platform_channels.done":
      "Đã liệt kê kênh chat",
    "chatTools3.catalog.list_agent_triggers.running":
      "Đang liệt kê trigger của workflow",
    "chatTools3.catalog.list_agent_triggers.done":
      "Đã liệt kê trigger của workflow",
    "chatTools3.catalog.setup_agent_webhook_trigger.running":
      "Đang thiết lập trigger webhook",
    "chatTools3.catalog.setup_agent_webhook_trigger.done":
      "Đã thiết lập trigger webhook",
    "chatTools3.catalog.list_presets.running": "Đang liệt kê preset",
    "chatTools3.catalog.list_presets.done": "Đã liệt kê preset",
    "chatTools3.catalog.update_preset.running": "Đang cập nhật preset",
    "chatTools3.catalog.update_preset.done": "Đã cập nhật preset",
    "chatTools3.catalog.delete_preset.running": "Đang xoá preset",
    "chatTools3.catalog.delete_preset.done": "Đã xoá preset",
    "chatTools3.catalog.run_block.running": "Đang chạy khối",
    "chatTools3.catalog.run_block.done": "Đã chạy khối",
    "chatTools3.catalog.find_capability.running": "Đang tìm khả năng cho",
    "chatTools3.catalog.find_capability.done": "Đã tìm thấy khả năng cho",
    "chatTools3.catalog.describe_capability.running":
      "Đang đọc thông tin khả năng",
    "chatTools3.catalog.describe_capability.done": "Đã đọc thông tin khả năng",
    "chatTools3.catalog.run_capability.running": "Đang chạy",
    "chatTools3.catalog.run_capability.done": "Đã chạy",
    "chatTools3.catalog.resume_capability.running": "Đang tiếp tục",
    "chatTools3.catalog.resume_capability.done": "Đã tiếp tục",
    "chatTools3.catalog.schedule_agent.running": "Đang lên lịch workflow",
    "chatTools3.catalog.schedule_agent.done": "Đã lên lịch workflow",
    "chatTools3.catalog.continue_run_block.running": "Đang tiếp tục chạy khối",
    "chatTools3.catalog.continue_run_block.done": "Đã tiếp tục chạy khối",
    "chatTools3.catalog.run_mcp_tool.running": "Đang chạy công cụ MCP",
    "chatTools3.catalog.run_mcp_tool.done": "Đã chạy công cụ MCP",
    "chatTools3.catalog.get_mcp_guide.running": "Đang đọc hướng dẫn MCP",
    "chatTools3.catalog.get_mcp_guide.done": "Đã đọc hướng dẫn MCP",
    "chatTools3.catalog.search_docs.running": "Đang tìm trong tài liệu",
    "chatTools3.catalog.search_docs.done": "Đã tìm trong tài liệu",
    "chatTools3.catalog.get_doc_page.running": "Đang đọc trang tài liệu",
    "chatTools3.catalog.get_doc_page.done": "Đã đọc trang tài liệu",
    "chatTools3.catalog.store_skill.running": "Đang lưu kỹ năng",
    "chatTools3.catalog.store_skill.done": "Đã lưu kỹ năng",
    "chatTools3.catalog.read_skill.running": "Đang đọc kỹ năng",
    "chatTools3.catalog.read_skill.done": "Đã đọc kỹ năng",
    "chatTools3.catalog.delete_skill.running": "Đang xoá kỹ năng",
    "chatTools3.catalog.delete_skill.done": "Đã xoá kỹ năng",
    "chatTools3.catalog.list_skills.running": "Đang liệt kê kỹ năng",
    "chatTools3.catalog.list_skills.done": "Đã liệt kê kỹ năng",
    "chatTools3.catalog.connect_integration.running": "Đang kết nối",
    "chatTools3.catalog.connect_integration.done": "Đã kết nối",
    "chatTools3.catalog.search_feature_requests.running":
      "Đang tìm yêu cầu tính năng cho",
    "chatTools3.catalog.search_feature_requests.done":
      "Đã tìm yêu cầu tính năng cho",
    "chatTools3.catalog.create_feature_request.running":
      "Đang tạo yêu cầu tính năng",
    "chatTools3.catalog.create_feature_request.done":
      "Đã tạo yêu cầu tính năng",
    "chatTools3.catalog.get_platform_info.running":
      "Đang kiểm tra thông tin nền tảng",
    "chatTools3.catalog.get_platform_info.done":
      "Đã kiểm tra thông tin nền tảng",
    "chatTools3.catalog.ask_question.running": "Đang hỏi bạn một câu",
    "chatTools3.catalog.ask_question.done": "Đã hỏi bạn một câu",
    "chatTools3.catalog.empty.noneYet": "chưa có gì",
    "chatTools3.catalog.empty.noOneYet": "chưa có ai",
    "chatTools3.catalog.empty.noneFound": "không tìm thấy",
    "chatTools3.catalog.failed": "Lỗi khi {action}",

    "chatTools3.result.nothingFound": "Không tìm thấy gì.",

    "chatTools3.ask.asking": "Đang đặt câu hỏi…",
    "chatTools3.ask.needsInput": "Cần bạn trả lời",
    "chatTools3.ask.failed": "Không hỏi được",

    "chatTools3.connect.connecting": "Đang kết nối {name}…",
    "chatTools3.connect.failed": "Không kết nối được {name}",
    "chatTools3.connect.connect": "Kết nối {name}",
    "chatTools3.connect.defaultName": "dịch vụ",
    "chatTools3.connect.errorFallback": "Không kết nối được dịch vụ",
    "chatTools3.connect.corrupted":
      "Dữ liệu thẻ đăng nhập đến bị hỏng nên không hiển thị được. Nhờ chuyên gia của bạn thử kết nối lại {name}.",

    "chatTools3.createAgent.creating": "Đang tạo workflow, có thể mất một phút",
    "chatTools3.createAgent.saved": "Đã lưu {name}",
    "chatTools3.createAgent.preview": 'Xem trước "{name}"',
    "chatTools3.createAgent.goalRefinement": "Mục tiêu cần rõ hơn",
    "chatTools3.createAgent.error": "Lỗi tạo workflow",
    "chatTools3.createAgent.failed": "Không tạo được workflow. Hãy thử lại.",
    "chatTools3.createAgent.savedMessage": "đã được lưu vào thư viện của bạn!",
    "chatTools3.createAgent.simplifyGoal": "Đơn giản hoá mục tiêu",
    "chatTools3.createAgent.blockOne": "{count} khối",
    "chatTools3.createAgent.blockMany": "{count} khối",

    "chatTools3.editAgent.editing": "Đang sửa workflow, có thể mất một phút",
    "chatTools3.editAgent.saved": 'Đã lưu "{name}"',
    "chatTools3.editAgent.preview": 'Xem trước "{name}"',
    "chatTools3.editAgent.error": "Lỗi sửa workflow",
    "chatTools3.editAgent.failed": "Không sửa được workflow. Hãy thử lại.",
    "chatTools3.editAgent.savedMessage": "đã được cập nhật!",

    "chatTools3.decomposeGoal.analyzing": "Đang phân tích mục tiêu của bạn…",
    "chatTools3.decomposeGoal.planReady": "Kế hoạch sẵn sàng ({count} bước)",
    "chatTools3.decomposeGoal.error": "Lỗi phân tích mục tiêu",
    "chatTools3.decomposeGoal.failed":
      "Không phân tích được mục tiêu. Hãy thử lại.",
    "chatTools3.decomposeGoal.planTitle": "Kế hoạch dựng — {count} bước",
    "chatTools3.decomposeGoal.statusCompleted": "hoàn tất",
    "chatTools3.decomposeGoal.statusInProgress": "đang làm",
    "chatTools3.decomposeGoal.statusFailed": "thất bại",
    "chatTools3.decomposeGoal.statusPending": "chờ xử lý",

    "chatTools3.suggestedGoal.unachievable":
      "Không thể hoàn thành mục tiêu này",
    "chatTools3.suggestedGoal.needsDetail": "Mục tiêu cần thêm chi tiết",
    "chatTools3.suggestedGoal.alternative": "Phương án thay thế được gợi ý:",

    "chatTools3.findAgents.workflows": "Workflow",
    "chatTools3.findAgents.lookingLibrary": "Đang tìm workflow trong thư viện",
    "chatTools3.findAgents.lookingMarketplace":
      "Đang tìm workflow trên marketplace",
    "chatTools3.findAgents.matching": 'khớp "{query}"',
    "chatTools3.findAgents.none": "Không tìm thấy workflow",
    "chatTools3.findAgents.foundOne": "Tìm thấy {count} workflow",
    "chatTools3.findAgents.foundMany": "Tìm thấy {count} workflow",
    "chatTools3.findAgents.error": "Lỗi khi tìm workflow",

    "chatTools3.findBlocks.searching": "Đang tìm hành động",
    "chatTools3.findBlocks.matching": 'khớp "{query}"',
    "chatTools3.findBlocks.foundOne": "Tìm thấy {count} hành động",
    "chatTools3.findBlocks.foundMany": "Tìm thấy {count} hành động",
    "chatTools3.findBlocks.failed": "Tìm kiếm thất bại",
    "chatTools3.findBlocks.failedFor": 'Tìm kiếm thất bại với "{query}"',

    "chatTools3.findCapabilities.searching": "Đang tìm khả năng",
    "chatTools3.findCapabilities.for": 'cho "{query}"',
    "chatTools3.findCapabilities.foundOne": "Tìm thấy {count} khả năng",
    "chatTools3.findCapabilities.foundMany": "Tìm thấy {count} khả năng",
    "chatTools3.findCapabilities.searched": "Đã tìm khả năng",
    "chatTools3.findCapabilities.failed": "Tìm kiếm thất bại",
    "chatTools3.findCapabilities.grantNeeded": "cần cấp quyền",
    "chatTools3.findCapabilities.connected": "đã kết nối",
    "chatTools3.findCapabilities.signIn": "đăng nhập",
    "chatTools3.findCapabilities.kindIntegration": "tích hợp",
    "chatTools3.findCapabilities.kindSkill": "kỹ năng",
    "chatTools3.findCapabilities.kindBlock": "khối xây dựng",
    "chatTools3.findCapabilities.kindTool": "công cụ",
    "chatTools3.findCapabilities.kindAction": "hành động",

    "chatTools3.folderTool.creating": "Đang tạo thư mục…",
    "chatTools3.folderTool.loading": "Đang tải thư mục…",
    "chatTools3.folderTool.updating": "Đang cập nhật thư mục…",
    "chatTools3.folderTool.moving": "Đang di chuyển thư mục…",
    "chatTools3.folderTool.deleting": "Đang xoá thư mục…",
    "chatTools3.folderTool.movingWorkflows": "Đang di chuyển workflow…",
    "chatTools3.folderTool.managing": "Đang quản lý thư mục…",
    "chatTools3.folderTool.failed": "Thao tác thư mục thất bại",

    "chatTools3.featureRequests.requests": "Yêu cầu tính năng",
    "chatTools3.featureRequests.noneFound": "Không tìm thấy yêu cầu tính năng",
    "chatTools3.featureRequests.searchError": "Lỗi tìm yêu cầu tính năng",
    "chatTools3.featureRequests.created": "Đã tạo yêu cầu tính năng",
    "chatTools3.featureRequests.addedTo": "Đã thêm vào yêu cầu tính năng",
    "chatTools3.featureRequests.error": "Lỗi yêu cầu tính năng",
    "chatTools3.featureRequests.request": "Yêu cầu tính năng",
    "chatTools3.featureRequests.searching": "Đang tìm yêu cầu tính năng",
    "chatTools3.featureRequests.for": 'cho "{query}"',
    "chatTools3.featureRequests.foundOne": "Tìm thấy {count} yêu cầu tính năng",
    "chatTools3.featureRequests.foundMany":
      "Tìm thấy {count} yêu cầu tính năng",
    "chatTools3.featureRequests.errorSearching":
      "Lỗi khi tìm yêu cầu tính năng",
    "chatTools3.featureRequests.creating": "Đang tạo yêu cầu tính năng",
    "chatTools3.featureRequests.addedToExisting":
      "Đã thêm vào yêu cầu tính năng hiện có",
    "chatTools3.featureRequests.errorCreating": "Lỗi tạo yêu cầu tính năng",
    "chatTools3.featureRequests.createdWithTitle": "Đã tạo yêu cầu tính năng",
  };
