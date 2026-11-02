import { Sharing1En } from "./sharing-1.en";

export const Sharing1Vi: Partial<Record<keyof typeof Sharing1En, string>> = {
  "sharing1.shareError.title": "Không tìm thấy liên kết chia sẻ",
  "sharing1.shareError.body":
    "Liên kết này không hợp lệ hoặc đã bị chủ sở hữu tắt. Hãy xin người chia sẻ một liên kết mới.",
  "sharing1.shareError.retry": "Thử lại",
  "sharing1.shareError.poweredBy": "Vận hành bởi AutoGPT Platform",
  "sharing1.actions.copyLink": "Sao chép liên kết",
  "sharing1.actions.copied": "Đã sao chép",
  "sharing1.actions.signUp": "Đăng ký",
  "sharing1.actions.copyFailed": "Sao chép liên kết thất bại",

  "sharing1.link.loadingTitle": "Đang thiết lập AutoGPT",
  "sharing1.link.loadingMessage": "Đang tải...",
  "sharing1.link.errorTitle": "Thiết lập thất bại",
  "sharing1.link.errorHint":
    "Quay lại cuộc trò chuyện và xin bot một liên kết thiết lập mới.",
  "sharing1.link.authTitle": "Đăng nhập để tiếp tục",
  "sharing1.link.authBody":
    "Đăng nhập tài khoản AutoGPT của bạn để hoàn tất thiết lập AutoGPT.",
  "sharing1.link.signIn": "Đăng nhập",
  "sharing1.link.noAccount": "Chưa có tài khoản?",
  "sharing1.link.signUp": "Đăng ký",
  "sharing1.link.readyTitleUser": "Liên kết DM {platform} của bạn",
  "sharing1.link.readyTitleServer": "Thiết lập AutoGPT cho {server}",
  "sharing1.link.readyTitleServerNoName":
    "Thiết lập AutoGPT cho {platform} {noun} này",
  "sharing1.link.whatHappens": "Điều gì xảy ra khi bạn xác nhận:",
  "sharing1.link.contextUser": "DM {platform} của bạn",
  "sharing1.link.contextServer": "{platform} {noun} này",
  "sharing1.link.userLinked":
    "{context} sẽ được liên kết với tài khoản AutoGPT của bạn",
  "sharing1.link.userDmPrivate":
    "DM với bot chạy như cuộc trò chuyện AutoGPT riêng tư của bạn",
  "sharing1.link.userUsageBilled":
    "Mọi mức dùng từ các DM đó đều tính vào tài khoản của bạn",
  "sharing1.link.serverConnected":
    "{context} sẽ được kết nối với tài khoản AutoGPT của bạn",
  "sharing1.link.anyoneTasks": "Mọi người trong {noun} đều có thể giao việc cho AutoGPT",
  "sharing1.link.sharedVisible":
    "Trò chuyện trong {noun} dùng chung sẽ hiển thị với mọi người ở đó — để trao đổi riêng 1:1, hãy DM bot và liên kết tài khoản AutoGPT của bạn",
  "sharing1.link.usesTools":
    "Dùng các công cụ và tích hợp đã kết nối với tài khoản AutoGPT của bạn",
  "sharing1.link.billedNote":
    "Mức dùng từ {context} tính vào tài khoản AutoGPT của bạn. Bạn có thể ngắt liên kết bất cứ lúc nào trong Cài đặt → Bot.",
  "sharing1.link.connectDms": "Kết nối DM {platform} của tôi",
  "sharing1.link.connectPlatform": "Kết nối {platform} với AutoGPT",
  "sharing1.link.signedInAs": "Đăng nhập với {email}",
  "sharing1.link.notYou": "Không phải bạn? Đăng xuất",
  "sharing1.link.successTitle": "AutoGPT đã sẵn sàng!",
  "sharing1.link.successContextUser": "tài khoản {platform} của bạn",
  "sharing1.link.successDetailUser":
    "Bạn có thể trò chuyện với AutoGPT trong DM {platform} của mình.",
  "sharing1.link.successDetailServer":
    "Mọi người trong {noun} có thể dùng AutoGPT ngay.",
  "sharing1.link.successConnected":
    " đã được kết nối với tài khoản AutoGPT của bạn.",
  "sharing1.link.successTryNow":
    "Thử ngay — “nghiên cứu một chủ đề”, “xây workflow cho tôi”, hoặc “soạn một tài liệu”.",
  "sharing1.link.returnTo": "Quay lại {platform}",
  "sharing1.link.manageBots": "Quản lý bot",
  "sharing1.link.closePage":
    "Bạn có thể đóng trang này và quay lại cuộc trò chuyện.",
  "sharing1.link.errorMalformed":
    "Liên kết thiết lập này không hợp lệ. Hãy xin bot một liên kết mới.",
  "sharing1.link.errorLoadDetails":
    "Không tải được chi tiết thiết lập. Liên kết có thể đã hết hạn.",
  "sharing1.link.errorCompleteFailed":
    "Không hoàn tất được thiết lập. Liên kết có thể đã hết hạn.",
  "sharing1.link.fallbackPlatform": "nền tảng chat",
  "sharing1.link.serverNounFallback": "máy chủ",
  "sharing1.slack.title": "Đã kết nối Slack",
  "sharing1.slack.opening":
    "Đang mở Slack để bạn hoàn tất liên kết tài khoản.",
  "sharing1.slack.returning":
    "Bạn sẽ được đưa về cài đặt bot trong giây lát.",
  "sharing1.slack.open": "Mở Slack",
  "sharing1.slack.openBrowser": "Mở Slack trong trình duyệt",
  "sharing1.shareExec.loading": "Đang tải lượt chạy được chia sẻ...",
  "sharing1.shareExec.notFoundTitle": "Không tìm thấy liên kết chia sẻ",
  "sharing1.shareExec.errorTitle": "Không tải được",
  "sharing1.shareExec.notFoundBody":
    "Liên kết được chia sẻ này không hợp lệ hoặc đã bị chủ sở hữu tắt. Hãy hỏi người đã chia sẻ liên kết.",
  "sharing1.shareExec.errorBody":
    "Có lỗi khi tải lượt chạy được chia sẻ này. Hãy thử tải lại trang.",
  "sharing1.shareExec.tryAgain": "Thử lại",
  "sharing1.shareExec.publicNotice":
    "Đây là kết quả lượt chạy workflow được chia sẻ công khai. Người chia sẻ có thể tắt quyền truy cập bất cứ lúc nào.",
  "sharing1.shareExec.status": "Trạng thái:",
  "sharing1.shareExec.created": "Đã tạo:",
  "sharing1.shareExec.output": "Đầu ra",
  "sharing1.shareChat.loading": "Đang tải cuộc trò chuyện được chia sẻ…",
  "sharing1.shareChat.defaultTitle": "Cuộc trò chuyện được chia sẻ",
  "sharing1.shareChat.subtitle": "Chia sẻ {date}",
  "sharing1.shareChat.messagesError":
    "Không tải được tin nhắn. Liên kết chia sẻ vẫn hợp lệ.",
  "sharing1.shareChat.tryAgain": "Thử lại",
  "sharing1.shareChat.recentLimit":
    "Đang hiện {count} tin nhắn mới nhất — lịch sử cũ hơn không hiển thị trong chế độ chia sẻ này.",
};
