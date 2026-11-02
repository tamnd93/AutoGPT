import { ChatStates2En } from "./chat-states-2.en";

export const ChatStates2Vi: Partial<Record<keyof typeof ChatStates2En, string>> =
  {
    "chatStates2.compaction.summarizing": "Đang cô đọng cuộc trò chuyện…",
    "chatStates2.compaction.rebuilding": "Đang tải lại ngữ cảnh…",
    "chatStates2.compaction.dropped":
      "Đã bắt đầu ngữ cảnh mới — các tin nhắn trước đã bị bỏ",
    "chatStates2.compaction.condensedCount": "Đã cô đọng {count} tin nhắn",
    "chatStates2.compaction.condensed": "Đã cô đọng cuộc trò chuyện",
    "chatStates2.compaction.tokens": "{before} → {after} token",
    "chatStates2.compaction.condensedToKeepGoing":
      "Đã cô đọng cuộc trò chuyện để tiếp tục",

    "chatStates2.credentialRejection.refusedNamed":
      '"{name}" đã bị từ chối',
    "chatStates2.credentialRejection.refused":
      "Thông tin đăng nhập đã lưu bị từ chối",

    "chatStates2.deleteChat.title": "Xoá chat",
    "chatStates2.deleteChat.bodyPrefix": "Bạn có chắc muốn xoá",
    "chatStates2.deleteChat.bodySuffix":
      "? Thao tác này không thể hoàn tác.",
    "chatStates2.deleteChat.untitled": "Chat chưa đặt tên",
    "chatStates2.deleteChat.cancel": "Huỷ",
    "chatStates2.deleteChat.delete": "Xoá",

    "chatStates2.turnStats.thoughtFor": "Suy nghĩ {time}",

    "chatStates2.connectTools.dialogAria": "Kết nối công cụ của bạn",
    "chatStates2.connectTools.backNotNow": "Để sau",
    "chatStates2.connectTools.nextDone": "Xong",
    "chatStates2.connectTools.back": "Quay lại",
    "chatStates2.connectTools.next": "Tiếp",
    "chatStates2.connectTools.searchPlaceholder": "Tìm dịch vụ...",
    "chatStates2.connectTools.searchAria": "Tìm dịch vụ",
    "chatStates2.connectTools.noMatch": 'Không có dịch vụ nào khớp "{query}"',
    "chatStates2.connectTools.recommended":
      "Đề xuất từ cuộc trò chuyện này",
    "chatStates2.connectTools.popular": "Lựa chọn phổ biến để bắt đầu",
    "chatStates2.connectTools.searchHint":
      "Tìm kiếm để chọn dịch vụ cần kết nối.",
    "chatStates2.connectTools.connecting": "Đang kết nối…",
    "chatStates2.connectTools.continue": "Tiếp tục",

    "chatStates2.copilotModals.grantFailedTitle":
      "Đã kết nối nhưng không cấp được quyền cho {name}",
    "chatStates2.copilotModals.grantFailedDescription":
      "Hãy cấp quyền trong tab Tích hợp.",
    "chatStates2.copilotModals.skills": "Kỹ năng",
    "chatStates2.copilotModals.scheduled": "Đã lên lịch",
    "chatStates2.copilotModals.integrations": "Tích hợp",

    "chatStates2.notificationBanner.body":
      "Thông báo đang tắt. Hãy bật trong Cài đặt để biết khi các chuyên gia làm xong, kể cả khi bạn chuyển tab.",
    "chatStates2.notificationBanner.openSettings": "Mở cài đặt",
    "chatStates2.notificationBanner.dismiss": "Bỏ qua",

    "chatStates2.panelResize.resize": "Đổi kích thước bảng",
    "chatStates2.credentialMention.inputAria": "Ô nhập tin nhắn",
  };
