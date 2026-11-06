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

  "aiConnections1.offer.backedBy.chatgpt": "Gói ChatGPT của bạn",
  "aiConnections1.offer.backedBy.microsoft":
    "Gói Microsoft 365 Copilot của bạn",
  "aiConnections1.offer.backedBy.microsoftShort":
    "Gói Microsoft Copilot của bạn",
  "aiConnections1.offer.backedBy.opencode": "Gói OpenCode của bạn",
  "aiConnections1.offer.backedBy.autogpt": "Gói AutoGPT của bạn",
  "aiConnections1.offer.backedBy.server":
    "Nhà cung cấp trò chuyện của máy chủ này",

  "aiConnections1.offer.description.chatgptLocked":
    "Chạy cuộc trò chuyện trên gói ChatGPT bạn đã trả phí mà không tốn tín dụng AutoGPT.",
  "aiConnections1.offer.description.chatgpt":
    "Các cuộc trò chuyện mới sử dụng gói ChatGPT của bạn và không tốn tín dụng AutoGPT.",
  "aiConnections1.offer.description.microsoft":
    "Các cuộc trò chuyện mới sử dụng gói Microsoft 365 Copilot công việc hoặc trường học của bạn và không tốn tín dụng AutoGPT.",
  "aiConnections1.offer.description.opencode":
    "Các cuộc trò chuyện mới sử dụng gói đăng ký OpenCode của bạn và không tốn tín dụng AutoGPT.",
  "aiConnections1.offer.description.autogpt":
    "Các cuộc trò chuyện mới sử dụng gói AutoGPT của bạn và tiêu dùng tín dụng AutoGPT.",
  "aiConnections1.offer.description.server":
    "Các cuộc trò chuyện mới sử dụng nhà cung cấp trò chuyện được cấu hình trên máy chủ này.",

  "aiConnections1.offer.lockReason.chatgptMinPlan":
    "Cần gói Max trở lên để sử dụng ChatGPT.",
  "aiConnections1.offer.lockReason.advancedMinPlan":
    "Cần gói Max trở lên để sử dụng mức Nâng cao.",
  "aiConnections1.offer.lockReason.connectChatgpt":
    "Kết nối ChatGPT để sử dụng gói đăng ký này",

  "aiConnections1.offer.limitation.builderRunsOnAutogpt":
    "Bảng trò chuyện trong trình dựng quy trình luôn chạy trên AutoGPT.",
  "aiConnections1.offer.limitation.microsoftNoTools":
    "Microsoft 365 Copilot chỉ trả về văn bản và không chạy công cụ AutoGPT.",
  "aiConnections1.offer.limitation.microsoftNoLocalFiles":
    "Không hỗ trợ tệp cục bộ; hãy dùng liên kết OneDrive hoặc SharePoint.",
  "aiConnections1.offer.limitation.noServerProvider":
    "Máy chủ này chưa được cấu hình nhà cung cấp trò chuyện nào.",
};
