import { ChatStates3En } from "./chat-states-3.en";

export const ChatStates3Vi: Partial<Record<keyof typeof ChatStates3En, string>> = {
  "chatStates3.sharing.title": "Chia sẻ trò chuyện này",
  "chatStates3.sharing.warning1":
    "Ai có liên kết cũng sẽ thấy cuộc trò chuyện này. Đừng chia sẻ nếu nó chứa bí mật bạn đã dán, thông tin cá nhân hoặc thông tin xác thực bạn không muốn công khai.",
  "chatStates3.sharing.livePrefix": "Chia sẻ ở chế độ",
  "chatStates3.sharing.liveWord": "trực tiếp",
  "chatStates3.sharing.liveSuffix":
    ": tin nhắn mới, lượt chạy workflow và tệp thêm sau khi bật chia sẻ cũng sẽ hiển thị. Dừng chia sẻ để thu hồi quyền truy cập.",
  "chatStates3.sharing.currentlySharing": "Đang chia sẻ",
  "chatStates3.sharing.aboutToShare": "Sắp chia sẻ",
  "chatStates3.sharing.messageOne": "tin nhắn",
  "chatStates3.sharing.messages": "tin nhắn",
  "chatStates3.sharing.runOne": "{count} lượt chạy workflow",
  "chatStates3.sharing.runs": "{count} lượt chạy workflow",
  "chatStates3.sharing.fileOne": "{count} tệp trong workspace",
  "chatStates3.sharing.files": "{count} tệp trong workspace",
  "chatStates3.sharing.toggleTitle":
    "Chia sẻ lượt chạy workflow trong trò chuyện này",
  "chatStates3.sharing.toggleBody":
    "Bao gồm mọi lượt chạy của cuộc trò chuyện này, kể cả các lượt chạy sau khi bạn chia sẻ.",
  "chatStates3.sharing.toggleAria":
    "Chia sẻ lượt chạy workflow trong trò chuyện này",
  "chatStates3.sharing.shareLink": "Liên kết chia sẻ",
  "chatStates3.sharing.copied": "Đã sao chép",
  "chatStates3.sharing.copy": "Sao chép",
  "chatStates3.sharing.confirmStop": "Xác nhận dừng chia sẻ",
  "chatStates3.sharing.stop": "Dừng chia sẻ",
  "chatStates3.sharing.enable": "Bật chia sẻ",
  "chatStates3.sharing.toastFailedEnable": "Bật chia sẻ thất bại",
  "chatStates3.sharing.toastTryAgain": "Vui lòng thử lại.",
  "chatStates3.sharing.toastEnabled": "Đã bật chia sẻ trò chuyện",
  "chatStates3.sharing.toastEnabledBody":
    "Ai có liên kết đều có thể xem cuộc trò chuyện này. Có thể thu hồi bất cứ lúc nào.",
  "chatStates3.sharing.toastDisabled": "Đã tắt chia sẻ trò chuyện",
  "chatStates3.sharing.toastDisabledBody":
    "Liên kết chia sẻ không còn truy cập được.",
  "chatStates3.sharing.toastFailedDisable": "Tắt chia sẻ thất bại",
  "chatStates3.sharing.toastFailedCopy": "Sao chép liên kết thất bại",
};
