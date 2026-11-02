import { chatInput1En } from "./chat-input-1.en";

export const chatInput1Vi: Partial<Record<keyof typeof chatInput1En, string>> =
  {
    "chatInput1.placeholder": "Nhập tin nhắn...",
    "chatInput1.transcribing": "Đang chuyển thành văn bản...",
    "chatInput1.folderCap.title": "Tối đa {max} thư mục mỗi tin nhắn",
    "chatInput1.folderCap.description": "Chưa thêm {count} mục.",
    "chatInput1.menu.voiceMode": "Chế độ giọng nói",
    "chatInput1.menu.modelAndConnection": "Model và kết nối",
    "chatInput1.menu.tokenUsage": "Mức dùng token",
    "chatInput1.queueMessage": "Xếp hàng tin nhắn",
    "chatInput1.sending": "Đang gửi",
    "chatInput1.composerHint":
      "Nhấn Enter để gửi, Shift+Enter để xuống dòng, Space để ghi âm",
    "chatInput1.testMode.enabled": "Đã bật chế độ thử nghiệm",
    "chatInput1.testMode.disabled": "Đã tắt chế độ thử nghiệm",
    "chatInput1.testMode.enabledDescription":
      "Chat mới sẽ chạy workflow ở chế độ thử nghiệm.",
    "chatInput1.testMode.disabledDescription":
      "Chat mới sẽ chạy workflow bình thường.",

    "chatInput1.overflow.moreOptions": "Tuỳ chọn khác",
    "chatInput1.plus.addFilesAndMore": "Thêm tệp và hơn thế",
    "chatInput1.plus.attachFile": "Đính kèm tệp",
    "chatInput1.plus.takePhoto": "Chụp ảnh",
    "chatInput1.plus.workspaceFile": "Dùng tệp từ Không gian làm việc",
    "chatInput1.plus.connectService": "Kết nối dịch vụ",
    "chatInput1.plus.skills": "Kỹ năng",
    "chatInput1.plus.scheduled": "Đã lên lịch",
    "chatInput1.plus.cap": "tối đa {max}",

    "chatInput1.attach.limit":
      "Tối đa {max} tệp đính kèm mỗi tin nhắn — {refused} mục chưa được thêm",
    "chatInput1.attach.limitDismiss": "Bỏ qua thông báo giới hạn tệp đính kèm",
    "chatInput1.atReset.filesOnlyText":
      "Chỉ văn bản mới chờ được tới lúc đặt lại. Hãy bỏ các tệp để lên lịch tin nhắn này.",

    "chatInput1.mode.approvalsInChat": "Phê duyệt trong chat này",
    "chatInput1.mode.approvalModeAria": "Chế độ phê duyệt: {mode}. Đổi chế độ",
    "chatInput1.mode.approvalModeTitle": "Chế độ phê duyệt: {mode}",
    "chatInput1.mode.askFirst.label": "Hỏi trước",
    "chatInput1.mode.askFirst.description":
      "Hỏi trước mỗi lần sửa hoặc hành động ra ngoài. Công việc ở trong sandbox vẫn chạy.",
    "chatInput1.mode.auto.label": "Tự động",
    "chatInput1.mode.auto.description":
      "Hỏi trước mọi việc rời khỏi nền tảng, và trước các chỉnh sửa hoặc lệnh có vẻ rủi ro.",
    "chatInput1.mode.unsupervised.label": "Không giám sát",
    "chatInput1.mode.unsupervised.description":
      "Không bao giờ hỏi. Mọi hành động chạy mà không cần bạn phê duyệt.",
    "chatInput1.mode.unsupervisedConfirmTitle": "Chạy chat này không giám sát?",
    "chatInput1.mode.unsupervisedConfirmDescription":
      "{assistant} sẽ không hỏi trước bất cứ việc gì trong chat này. Các chỉnh sửa, lệnh và hành động bên ngoài nền tảng, như gửi tin nhắn hay email, sẽ chạy mà không cần bạn phê duyệt.",
    "chatInput1.mode.cancel": "Huỷ",
    "chatInput1.mode.runUnsupervised": "Chạy không giám sát",

    "chatInput1.connection.unavailableAria": "Không lấy được kết nối AI",
    "chatInput1.connection.unavailable": "Không có kết nối",
    "chatInput1.connection.setUpAria": "Thiết lập kết nối AI",
    "chatInput1.connection.setUp": "Thiết lập kết nối AI",
    "chatInput1.connection.choose": "Chọn kết nối",
    "chatInput1.connection.yourPlan": "· gói của bạn",
    "chatInput1.connection.modelTierAria": "Mức model {label} — đổi",
    "chatInput1.connection.runsOnAria": "Chạy trên {label} — đổi",

    "chatInput1.picker.dialogTitle": "Model và kết nối",
    "chatInput1.picker.unavailable":
      "Hiện không lấy được kết nối AI. Thử lại sau giây lát.",
    "chatInput1.picker.noConnection": "Chưa thiết lập kết nối AI nào.",
    "chatInput1.picker.setOneUp": "Thiết lập ngay",
    "chatInput1.picker.runsOn": "Chạy trên",
    "chatInput1.picker.modelTier": "Mức model",
    "chatInput1.picker.addConnection": "Thêm kết nối",
    "chatInput1.picker.connectionGroupAria": "Kết nối chat này chạy trên",
    "chatInput1.picker.connected": "Đã kết nối",
    "chatInput1.picker.seePlans": "Xem các gói",
    "chatInput1.picker.unavailableTier": "không khả dụng",
    "chatInput1.picker.tierBalanced": "Cân bằng",
    "chatInput1.picker.tierAdvanced": "Nâng cao",
    "chatInput1.picker.tierAria": "{label} — {reason}",

    "chatInput1.connect.aria": "Kết nối gói ChatGPT",
    "chatInput1.connect.chatGPTSublabel": "Gói ChatGPT",
    "chatInput1.connect.connectExisting": "Kết nối tài khoản có sẵn của bạn",
    "chatInput1.connect.connectingAria": "Đang kết nối ChatGPT",

    "chatInput1.upgrade.unlockWithMax": "Mở khoá {name} với Max.",
    "chatInput1.upgrade.upgradeToMax": "Nâng cấp lên Max",

    "chatInput1.dryRun.onTooltip":
      "Đã bật chế độ thử nghiệm — phiên mới chạy mà không thực hiện hành động thật (bấm để tắt).",
    "chatInput1.dryRun.offTooltip":
      "Bật chế độ thử nghiệm để thử prompt mà không thực hiện hành động thật.",
    "chatInput1.dryRun.activeAria": "Chế độ thử nghiệm đang bật",
    "chatInput1.dryRun.enableAria": "Bật chế độ thử nghiệm",

    "chatInput1.mention.listAria": "Gợi ý nhắc tới",
    "chatInput1.mention.integrationsHeading": "Tích hợp",
    "chatInput1.mention.filesHeading": "Tệp",
    "chatInput1.mention.folderAria": "Thư mục {name}, {count}",
    "chatInput1.mention.loadError": "Không tải được tệp. Thử lại.",
    "chatInput1.mention.searching": "Đang tìm tệp…",
    "chatInput1.mention.emptyFilesAndIntegrations":
      "Không có tệp hay tích hợp phù hợp.",
    "chatInput1.mention.emptyFiles": "Không có tệp phù hợp.",
    "chatInput1.mention.emptyIntegrations": "Không có tích hợp phù hợp.",
    "chatInput1.mention.emptyNoIntegrations":
      "Chưa có tích hợp nào để nhắc tới.",

    "chatInput1.chat.sessionNotFoundTitle":
      "Chat này không khả dụng trên tài khoản này",
    "chatInput1.chat.sessionNotFoundBody":
      "Có thể nó thuộc tài khoản khác bạn đang dùng, hoặc không còn tồn tại.",
    "chatInput1.chat.startNewChat": "Bắt đầu chat mới",
    "chatInput1.chat.shared": "Chat này đang được chia sẻ",
    "chatInput1.chat.copyLink": "Sao chép liên kết",
    "chatInput1.chat.copied": "Đã sao chép",
    "chatInput1.chat.copyLinkFailed": "Không sao chép được liên kết",
    "chatInput1.chat.pausedDraftNote":
      "Bản nháp đã được lưu. Bạn vẫn có thể sửa trong khi việc gửi đang tạm dừng.",
    "chatInput1.chat.placeholderFollowUp": "Tôi có thể giúp gì thêm?",
    "chatInput1.chat.sendingPausedTooltip":
      "Việc gửi đang tạm dừng. Bản nháp đã được lưu và bạn vẫn có thể sửa.",
    "chatInput1.chat.couldNotStartSession": "Không bắt đầu được phiên chat mới",
    "chatInput1.chat.voiceModeDidNotStart": "chế độ giọng nói không khởi động",
    "chatInput1.chat.couldNotRetry": "Không thử lại được tin nhắn",
    "chatInput1.chat.previousMessageStill":
      "tin nhắn trước của bạn vẫn còn trong chat",
    "chatInput1.chat.continueAfterHeldCall": "Tiếp tục từ chỗ bạn đã dừng.",
    "chatInput1.chat.startChatFailed": "Không bắt đầu được chat",
  };
