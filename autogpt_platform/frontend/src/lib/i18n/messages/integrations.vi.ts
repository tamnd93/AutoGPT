import { integrationsEn } from "./integrations.en";

export const integrationsVi: Partial<
  Record<keyof typeof integrationsEn, string>
> = {
  "integrations.title": "Tích hợp",
  "integrations.description":
    "Kết nối gói AI để chạy các expert của bạn, cùng các công cụ bên thứ ba để họ sử dụng.",
  "integrations.connectService": "Kết nối dịch vụ",

  "integrations.ai.title": "Gói AI (đã đăng ký)",
  "integrations.ai.descriptionWithChoice":
    "Đây là nguồn chạy Otto và các expert của bạn. Chọn gói mà chat mới sẽ bắt đầu — bạn vẫn có thể đổi theo từng cuộc trò chuyện, và không có gì tự chuyển.",
  "integrations.ai.descriptionSingle":
    "Đây là nguồn chạy Otto và các expert của bạn. Liên kết một gói AI để chọn gói mà chat mới sẽ bắt đầu.",
  "integrations.ai.startLabel": "Kết nối mà chat mới sẽ dùng",
  "integrations.ai.availableLabel": "Gói AI có thể kết nối",
  "integrations.connected": "Đã kết nối",
  "integrations.usedForNewChats": "Dùng cho chat mới",
  "integrations.manage": "Quản lý",
  "integrations.comingSoon": "Sắp ra mắt",

  "integrations.opencode.dialogTitle": "Kết nối OpenCode",
  "integrations.opencode.description":
    "Dán khoá API từ OpenCode Console. Chat trên kết nối này chạy bằng gói OpenCode của bạn và không dùng credit AutoGPT.",
  "integrations.opencode.apiKeyLabel": "Khoá API",
  "integrations.opencode.docsHint": "Tìm khoá trong OpenCode Console —",
  "integrations.opencode.docsLink": "Tài liệu OpenCode",
  "integrations.opencode.connect": "Kết nối",

  "integrations.manage.connectedAccount": "Tài khoản đã kết nối",
  "integrations.manage.chatgptAccount": "Tài khoản ChatGPT của bạn",
  "integrations.manage.checkingChatGPT": "Đang kiểm tra với ChatGPT…",
  "integrations.manage.chatgptUnreachable":
    "Không kết nối được tới ChatGPT để xác nhận gói của tài khoản này.",
  "integrations.manage.chatgptNeedsReconnect":
    "ChatGPT báo kết nối này cần được kết nối lại.",
  "integrations.manage.chatgptWorkspaceNote":
    "ChatGPT chỉ nhận diện không gian làm việc sau kết nối này bằng một id nội bộ, nên hiện chưa thể đặt tên ở đây.",
  "integrations.manage.chatgptDefaultNote":
    "Chat mới bắt đầu trên kết nối này và chạy bằng gói ChatGPT của bạn.",
  "integrations.manage.chatgptRoutedNote":
    "Chat bạn chuyển sang đây chạy bằng gói ChatGPT của bạn thay vì credit AutoGPT.",
  "integrations.manage.chatgptDisconnectNote":
    "Ngắt kết nối sẽ dừng việc chat mới chạy bằng gói ChatGPT của bạn. Lịch sử chat vẫn được giữ và các tích hợp khác không bị ảnh hưởng.",
  "integrations.manage.reconnect": "Kết nối lại",
  "integrations.manage.disconnect": "Ngắt kết nối",
  "integrations.manage.opencodeNote":
    "Chat trên kết nối này chạy bằng gói OpenCode của bạn và không dùng credit AutoGPT.",
  "integrations.manage.connectedWorkAccount": "Tài khoản công việc đã kết nối",
  "integrations.manage.microsoftAccount": "Tài khoản Microsoft 365 Copilot",
  "integrations.manage.microsoftReconnectToShow":
    "Kết nối lại một lần để hiển thị tài khoản đã đăng nhập ở đây.",
  "integrations.manage.accessGranted": "Quyền đã cấp",
  "integrations.manage.microsoftReconnectToRefresh":
    "Kết nối lại một lần để làm mới quyền hiển thị ở đây.",
  "integrations.manage.microsoftLimitNote":
    "Microsoft vẫn giới hạn mọi câu trả lời trong phạm vi nội dung mà tài khoản công việc này đã truy cập được trong Microsoft 365.",
  "integrations.manage.microsoftDisconnectNote":
    "Ngắt kết nối sẽ dừng việc chat mới dùng gói Copilot này. Lịch sử chat vẫn được giữ và các tích hợp khác không bị ảnh hưởng.",
};
