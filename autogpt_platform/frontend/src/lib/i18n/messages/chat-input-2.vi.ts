import { chatInput2En } from "./chat-input-2.en";

export const chatInput2Vi: Partial<Record<keyof typeof chatInput2En, string>> =
  {
    "chatInput2.workspacePicker.dialogTitle":
      "Dùng một tệp từ không gian làm việc của bạn",
    "chatInput2.workspacePicker.searchLabel":
      "Tìm tệp trong không gian làm việc",
    "chatInput2.workspacePicker.searchPlaceholder": "Tìm tệp",
    "chatInput2.workspacePicker.thisExpert": "chuyên gia này",
    "chatInput2.workspacePicker.onlyWho": "Chỉ tệp của {who}",
    "chatInput2.workspacePicker.fromChats": "Từ các chat của bạn với {who}",
    "chatInput2.workspacePicker.plusOwn": "Cùng với tệp và thư mục của bạn",
    "chatInput2.workspacePicker.widen": "Hiện cả tệp của bạn",
    "chatInput2.workspacePicker.cancel": "Huỷ",
    "chatInput2.workspacePicker.add": "Thêm",
    "chatInput2.workspacePicker.addPrefix": "Thêm {items}",
    "chatInput2.workspacePicker.addJoin": "{first} và {second}",
    "chatInput2.workspacePicker.fileOne": "1 tệp",
    "chatInput2.workspacePicker.fileMany": "{count} tệp",
    "chatInput2.workspacePicker.folderOne": "1 thư mục",
    "chatInput2.workspacePicker.folderMany": "{count} thư mục",
    "chatInput2.workspacePicker.emptyExpertSearch":
      "Không có tệp nào từ {who} phù hợp.",
    "chatInput2.workspacePicker.emptyExpert": "Chưa có tệp nào từ {who}.",
    "chatInput2.workspacePicker.emptySearch": "Không có tệp phù hợp.",
    "chatInput2.workspacePicker.emptyFolderFiles":
      "Không có tệp trực tiếp trong thư mục này.",
    "chatInput2.workspacePicker.emptyFolder": "Thư mục này trống.",
    "chatInput2.workspacePicker.emptyWorkspace":
      "Chưa có tệp nào trong không gian làm việc của bạn.",

    "chatInput2.workspaceFiles.loadFailed": "Không tải được",
    "chatInput2.workspaceFiles.loadMore": "Tải thêm",

    "chatInput2.workspaceFolders.listAria": "Thư mục",
    "chatInput2.workspaceFolders.openAria": "Mở {name}",
    "chatInput2.workspaceFolders.attachAria": "Đính kèm thư mục {name}",
    "chatInput2.workspaceFolders.attach": "Đính kèm",

    "chatInput2.noConnection.aria": "Chưa có kết nối AI",
    "chatInput2.noConnection.before":
      "Chưa có model AI nào được kết nối nên chat chưa thể trả lời. Người quản lý máy chủ này có thể thêm khoá API của model hoặc một model chạy cục bộ",
    "chatInput2.noConnection.setupGuide": "(hướng dẫn thiết lập)",
    "chatInput2.noConnection.middle":
      ", hoặc bạn có thể kết nối gói ChatGPT hay Microsoft 365 Copilot của mình trong ",
    "chatInput2.noConnection.integrationsLink": "Cài đặt → Tích hợp",
    "chatInput2.noConnection.after": ".",

    "chatInput2.recipient.loadingAria": "Đang tải người nhận",
    "chatInput2.recipient.changeAria": "Đang gửi tới {name} — đổi người nhận",

    "chatInput2.secret.before":
      "Có vẻ đây là khoá API hoặc bí mật khác. Mọi thứ bạn gửi ở đây đều được lưu trong chat. Để {assistant} dùng khoá, hãy thêm khoá trong",
    "chatInput2.secret.link": "Tích hợp",
    "chatInput2.secret.after": " thay vào đó.",

    "chatInput2.stop.tooltip": "Dừng",
    "chatInput2.transcriptionError.retry": "Thử lại",
    "chatInput2.transcriptionError.download": "Tải bản ghi âm",
    "chatInput2.transcriptionError.dismiss": "Bỏ qua",

    "chatInput2.send.failedTitle": "Không gửi được tin nhắn",
    "chatInput2.send.failedRecovery": "tin nhắn của bạn đã trở lại ô soạn",

    "chatInput2.voice.transcriptionFailed": "Chép lời thất bại",
    "chatInput2.voice.permissionDenied": "Quyền dùng micro bị từ chối",
    "chatInput2.voice.micFailed": "Không truy cập được micro",
    "chatInput2.voice.failedTitle": "Ghi âm thất bại",

    "chatInput2.providerLimit.title": "Bạn đã chạm giới hạn của kết nối này",
    "chatInput2.providerLimit.fallbackBody":
      "Kết nối mà chat này đang chạy đã ngừng nhận lượt mới.",
    "chatInput2.providerLimit.checking":
      "Đang xem chat này còn chạy được trên gì khác…",
    "chatInput2.providerLimit.checkFailed":
      "Hiện chưa kiểm tra được các kết nối khác của bạn.",
    "chatInput2.providerLimit.close": "Đóng",
    "chatInput2.providerLimit.tryAgain": "Thử lại",
    "chatInput2.providerLimit.continueBody":
      "Tiếp tục sẽ chuyển phần còn lại của chat này sang {name}. Mọi điều đã nói vẫn giữ nguyên, trên kết nối đã chạy.",
    "chatInput2.providerLimit.wait": "Chờ đến khi đặt lại",
    "chatInput2.providerLimit.continueOn": "Tiếp tục trên {name}",
    "chatInput2.providerLimit.noAlternative":
      "Không có kết nối nào khác để tiếp tục. Bạn có thể thêm trong Cài đặt, hoặc chờ kết nối này đặt lại.",
    "chatInput2.providerLimit.switchFailedTitle": "Không đổi được kết nối",
    "chatInput2.providerLimit.switchFailedBody":
      "Chat này vẫn đang ở kết nối cũ. Hãy thử lại, hoặc chọn kết nối trong Cài đặt.",
    "chatInput2.providerLimit.resetUnderMinute": "Còn dưới một phút nữa.",
    "chatInput2.providerLimit.resetMinutes": "Còn khoảng {minutes} phút nữa.",
    "chatInput2.providerLimit.resetHour": "Còn khoảng một giờ nữa.",
    "chatInput2.providerLimit.resetHours": "Còn khoảng {hours} giờ nữa.",

    "chatInput2.rateLimit.checkingEyebrow": "Đang kiểm tra hạn mức của bạn",
    "chatInput2.rateLimit.unavailableEyebrow":
      "Tạm thời không xem được mức dùng",
    "chatInput2.rateLimit.checkingTitle":
      "Một chút nhé. Công việc của bạn đã được lưu.",
    "chatInput2.rateLimit.trialTitle": "Bạn đã dùng hết hạn mức dùng thử",
    "chatInput2.rateLimit.weeklyTitle": "Bạn đã chạm giới hạn tuần này",
    "chatInput2.rateLimit.dailyTitle": "Bạn đã chạm giới hạn hôm nay",
    "chatInput2.rateLimit.unavailableTitle":
      "Chúng tôi không kiểm tra được mức dùng của bạn.",
    "chatInput2.rateLimit.refreshing": "Đang làm mới gói và mức dùng…",
    "chatInput2.rateLimit.savedTryAgain":
      "Công việc của bạn đã được lưu. Hãy thử lại để kiểm tra hạn mức trước khi tiếp tục.",
    "chatInput2.rateLimit.tryAgain": "Thử lại",
    "chatInput2.rateLimit.trialMeter": "Hạn mức dùng thử",
    "chatInput2.rateLimit.trialMeterDetail":
      "Một hạn mức cho bản dùng thử. Hạn mức không làm mới.",
    "chatInput2.rateLimit.reviewBilling": "Xem thông tin thanh toán",
    "chatInput2.rateLimit.needCapacity": "Cần thêm dung lượng?",
    "chatInput2.rateLimit.capacityHelp":
      "Chúng tôi sẽ giúp tìm phương án phù hợp.",
    "chatInput2.rateLimit.backToWork": "Về công việc của tôi",

    "chatInput2.sendAtReset.label": "Gửi khi đặt lại",
    "chatInput2.sendAtReset.failedTitle": "Không lên lịch được tin nhắn",
    "chatInput2.sendAtReset.sentNowFailed": "Không gửi được tin nhắn",
    "chatInput2.sendAtReset.placeholder":
      "Viết ngay, tin nhắn sẽ gửi khi hạn mức của bạn đặt lại…",
    "chatInput2.sendAtReset.sendsAt": "Gửi lúc {clock}",
    "chatInput2.sendAtReset.sendsWeekdayAt": "Gửi {weekday} lúc {clock}",
    "chatInput2.sendAtReset.chipAria": "Tin nhắn đã lên lịch",
    "chatInput2.sendAtReset.sending": "Đang gửi…",
    "chatInput2.sendAtReset.edit": "Sửa",
    "chatInput2.sendAtReset.cancel": "Huỷ",
    "chatInput2.sendAtReset.chatNotReady": "Chat này chưa sẵn sàng",
    "chatInput2.sendAtReset.tooLongJoined":
      "Quá dài để thêm vào tin nhắn đang chờ",
    "chatInput2.sendAtReset.noAutoReset": "Hạn mức của bạn không tự đặt lại",
    "chatInput2.sendAtReset.budgetBack": "Hạn mức của bạn đã trở lại",
    "chatInput2.sendAtReset.changedJustNow": "Nó vừa thay đổi",
    "chatInput2.sendAtReset.changeFailed":
      "Không đổi được tin nhắn đã lên lịch",
    "chatInput2.sendAtReset.stillSends": "tin nhắn vẫn gửi khi đặt lại",
    "chatInput2.sendAtReset.checkFailedTitle":
      "Không kiểm tra được tin nhắn đã lên lịch",
    "chatInput2.sendAtReset.mayAlreadySend":
      "Tin nhắn có thể đã được đặt để gửi",
    "chatInput2.sendAtReset.recoveryComposer":
      "tin nhắn của bạn đã trở lại ô soạn",

    "chatInput2.voice.startRecording": "Bắt đầu ghi âm",
    "chatInput2.voice.stopRecording": "Dừng ghi âm",
  };
