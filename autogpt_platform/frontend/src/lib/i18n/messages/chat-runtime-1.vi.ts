import { chatRuntime1En } from "./chat-runtime-1.en";

export const chatRuntime1Vi: Partial<
  Record<keyof typeof chatRuntime1En, string>
> = {
  "chatRuntime1.chatError.signedOut":
    "Bạn đã đăng xuất. Hãy đăng nhập lại để tiếp tục chat.",
  "chatRuntime1.chatError.chatGone":
    "Chat này không còn tồn tại. Hãy bắt đầu chat mới để tiếp tục.",
  "chatRuntime1.chatError.messageTooLong":
    "Tin nhắn quá dài. Hãy rút ngắn rồi gửi lại.",
  "chatRuntime1.chatError.conversationTooLong":
    "Cuộc trò chuyện quá dài để tiếp tục. Hãy bắt đầu chat mới để tiếp tục.",
  "chatRuntime1.chatError.needsPlan":
    "Gửi tin cần gói đang hoạt động nên tin nhắn này chưa được gửi.",
  "chatRuntime1.chatError.usageLimit":
    "Bạn đã chạm giới hạn sử dụng nên tin nhắn này chưa được gửi.",
  "chatRuntime1.chatError.refused":
    "Yêu cầu bị từ chối. Hãy tải lại trang và thử lại; nếu vẫn lỗi, hãy liên hệ hỗ trợ.",
  "chatRuntime1.chatError.refusedNote":
    "Người quản trị hệ thống đã được báo về sự cố này",
  "chatRuntime1.chatError.serverProblem":
    "Máy chủ gặp sự cố. Hãy thử gửi lại tin nhắn sau giây lát.",
  "chatRuntime1.chatError.connectionDropped":
    "Kết nối bị ngắt trước khi gửi được tin nhắn. Hãy kiểm tra kết nối và gửi lại.",
  "chatRuntime1.chatError.generic": "Đã xảy ra lỗi. Hãy thử gửi lại tin nhắn.",

  "chatRuntime1.chatErrorBanner.askAdmin":
    "Hãy nhờ người vận hành máy chủ này thiết lập.",
  "chatRuntime1.chatErrorBanner.signIn": "Đăng nhập",
  "chatRuntime1.chatErrorBanner.newChat": "Bắt đầu chat mới",
  "chatRuntime1.chatErrorBanner.seePlans": "Xem các gói",

  "chatRuntime1.copyButton.failedTitle": "Sao chép thất bại",
  "chatRuntime1.copyButton.failedDescription":
    "Trình duyệt có thể không hỗ trợ clipboard, hoặc đã có lỗi.",
  "chatRuntime1.copyButton.copied": "Đã sao chép!",
  "chatRuntime1.copyButton.copy": "Sao chép",

  "chatRuntime1.feedbackModal.title": "Có thể cải thiện gì?",
  "chatRuntime1.feedbackModal.intro":
    "Phản hồi của bạn giúp chúng tôi cải thiện. Hãy chia sẻ chi tiết bên dưới.",
  "chatRuntime1.feedbackModal.placeholder":
    "Cho chúng tôi biết điều gì chưa tốt hoặc có thể cải thiện...",
  "chatRuntime1.feedbackModal.cancel": "Huỷ",
  "chatRuntime1.feedbackModal.submit": "Gửi phản hồi",

  "chatRuntime1.feedback.saveFailedTitle": "Không lưu được phản hồi",
  "chatRuntime1.feedback.saveFailedDescription": "Hãy thử lại.",
  "chatRuntime1.feedback.thanks": "Cảm ơn bạn đã phản hồi!",
  "chatRuntime1.feedback.copied": "Đã sao chép!",
  "chatRuntime1.feedback.copyFailed": "Sao chép thất bại",

  "chatRuntime1.tts.readAloud": "Đọc thành tiếng",
  "chatRuntime1.tts.somethingWrong": "Đã xảy ra lỗi.",

  "chatRuntime1.queue.queued": "Đang xếp hàng",
  "chatRuntime1.queue.queuedTooltip":
    "Sẽ tự bắt đầu khi một tác vụ hiện tại của bạn kết thúc.",
  "chatRuntime1.queue.cancelFailedTitle": "Không huỷ được tác vụ đang xếp hàng",
  "chatRuntime1.queue.cancelFailedDescription": "Hãy thử lại.",
  "chatRuntime1.queue.cancelAria": "Huỷ tác vụ đang xếp hàng",

  "chatRuntime1.sentFrom.title":
    "Mở cuộc trò chuyện mà tác vụ này được gửi từ đó",
  "chatRuntime1.sentFrom.label": "Gửi từ {name}",

  "chatRuntime1.thinking.default": "Đang suy nghĩ…",
};
