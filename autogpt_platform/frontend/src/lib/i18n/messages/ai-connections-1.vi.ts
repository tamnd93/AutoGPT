import { AiConnections1En } from "./ai-connections-1.en";

export const AiConnections1Vi: Partial<
  Record<keyof typeof AiConnections1En, string>
> = {
  "aiConnections1.microsoft.dialogTitle": "Kết nối Microsoft 365 Copilot",
  "aiConnections1.microsoft.requires":
    "Cần bản Microsoft Copilot trả phí hoặc Copilot Business từ tổ chức công việc hay trường học của bạn. Bản Microsoft 365 Copilot Chat đi kèm không đủ điều kiện. Kết nối này trả lời chat nhưng không chạy công cụ AutoGPT.",

  "aiConnections1.microsoft.scope.basicProfile": "Hồ sơ tài khoản cơ bản",
  "aiConnections1.microsoft.scope.sharePoint":
    "Tệp trên SharePoint và OneDrive",
  "aiConnections1.microsoft.scope.mail": "Thư Outlook",
  "aiConnections1.microsoft.scope.people": "Mọi người trong tổ chức của bạn",
  "aiConnections1.microsoft.scope.meetingTranscripts": "Bản ghi cuộc họp Teams",
  "aiConnections1.microsoft.scope.teamsChats": "Chat Teams",
  "aiConnections1.microsoft.scope.channelMessages": "Tin nhắn kênh Teams",
  "aiConnections1.microsoft.scope.externalSearch":
    "Mục tìm kiếm Microsoft bên ngoài",
  "aiConnections1.microsoft.scope.stayConnected": "Duy trì kết nối",
  "aiConnections1.microsoft.scope.signInIdentity": "Danh tính đăng nhập",
  "aiConnections1.microsoft.scope.email": "Địa chỉ email",

  "aiConnections1.toast.saveFailed": "Không lưu được kết nối đó",
  "aiConnections1.toast.saveFailedHint":
    "Kết nối mặc định của bạn không đổi. Kiểm tra kết nối còn được liên kết, rồi thử lại.",

  "aiConnections1.opencode.connected": "Đã kết nối OpenCode",
  "aiConnections1.opencode.saveFailed": "Không lưu được khoá OpenCode",
  "aiConnections1.opencode.unexpectedError": "Lỗi không xác định",
};
