import { ChatStates4En } from "./chat-states-4.en";

export const ChatStates4Vi: Partial<
  Record<keyof typeof ChatStates4En, string>
> = {
  "chatStates4.stop.pendingTitle": "Dừng có thể mất một chút",
  "chatStates4.stop.pendingBody":
    "Lệnh huỷ đã gửi nhưng chưa được xác nhận. Tác vụ sẽ sớm dừng.",
  "chatStates4.stop.failedTitle": "Không dừng được tác vụ",
  "chatStates4.stop.failedBody": "Tác vụ có thể vẫn đang chạy nền.",

  "chatStates4.reconnect.lostTitle": "Mất kết nối",
  "chatStates4.reconnect.exhaustedBody":
    "Không thể kết nối lại. Vui lòng tải lại trang.",
  "chatStates4.reconnect.timeoutTitle": "Kết nối quá thời gian",
  "chatStates4.reconnect.timeoutBody":
    "Chuyên gia của bạn có thể vẫn đang làm việc. Tải lại để xem cập nhật.",
  "chatStates4.reconnect.reconnecting": "Đang kết nối lại...",
  "chatStates4.reconnect.sendBlockedTitle": "Đang kết nối lại",
  "chatStates4.reconnect.sendBlockedBody": "Chờ kết nối lại trước khi gửi.",
  "chatStates4.anomaly.title": "Mất kết nối",
  "chatStates4.anomaly.body":
    "Chúng tôi vẫn đang thử; chuyên gia của bạn có thể vẫn đang làm việc.",

  "chatStates4.notice.catchingUp": "Đang bắt kịp…",
  "chatStates4.notice.reconnecting": "Đang kết nối lại…",
  "chatStates4.notice.offline": "Ngoại tuyến — đang chờ mạng…",

  "chatStates4.followUp.notSentTitle": "Tin nhắn tiếp theo chưa gửi",
  "chatStates4.followUp.notSentBody":
    "Bạn đã rời chat trước khi tin nhắn kịp gửi. Tin nhắn đã trở lại ô soạn.",
  "chatStates4.followUp.attachWaitTitle": "Vui lòng chờ để đính kèm tệp",
  "chatStates4.followUp.attachWaitBody":
    "Không thể xếp hàng tệp đính kèm cho đến khi phản hồi hiện tại xong.",

  "chatStates4.hydrate.interruptedTitle": "Phản hồi trước bị ngắt",
  "chatStates4.hydrate.interruptedBody":
    "Chat mất kết nối trước khi phản hồi cuối hoàn tất. Gửi lại để thử.",

  "chatStates4.delete.failedTitle": "Không xoá được chat",
  "chatStates4.delete.failedBody": "Đã xảy ra lỗi",

  "chatStates4.send.failedTitle": "Không gửi được tin nhắn",
  "chatStates4.send.recoveryComposer": "tin nhắn của bạn đã trở lại ô soạn",
  "chatStates4.send.recoveryFiles": "các tệp của bạn chưa được gửi",

  "chatStates4.connections.checkFailedTitle": "Không kiểm tra được kết nối AI",
  "chatStates4.connections.checkFailedBody": "Tải lại trang và thử lại.",
  "chatStates4.connections.noneTitle": "Chưa thiết lập kết nối AI",
  "chatStates4.connections.noneBody":
    "Tin nhắn của bạn đã trở lại ô soạn. Xem thông báo phía trên để biết cách kết nối model.",
  "chatStates4.connections.chooseTitle": "Chọn một kết nối AI",
  "chatStates4.connections.chooseBody":
    "Chọn kết nối chuyên gia của bạn nên dùng trước khi bắt đầu tác vụ mới.",
  "chatStates4.connections.changedTitle": "Kết nối AI đã thay đổi",
  "chatStates4.connections.changedBody":
    "Tác vụ tiếp theo sẽ dùng kết nối khả dụng khi bắt đầu.",

  "chatStates4.turn.closedEarly": "Kết nối đã đóng sớm.",
  "chatStates4.turn.chatUnavailable": "Chat này không còn khả dụng.",
  "chatStates4.turn.unreachable":
    "Không kết nối được tới máy chủ (HTTP {status}).",
};
