import { chatRuntime2En } from "./chat-runtime-2.en";

export const chatRuntime2Vi: Partial<
  Record<keyof typeof chatRuntime2En, string>
> = {
  "chatRuntime2.threadHeader.defaultRole": "Trưởng nhóm AI",
  "chatRuntime2.threadHeader.loadingExpert": "Đang tải chuyên gia",

  "chatRuntime2.messages.loadOlder": "Tải tin nhắn cũ hơn",
  "chatRuntime2.messages.reconnecting": "Đang kết nối lại…",
  "chatRuntime2.messages.stillSyncing": "Vẫn đang đồng bộ tiến độ mới nhất.",
  "chatRuntime2.messages.retrieving": "Đang lấy tin nhắn mới nhất",

  "chatRuntime2.attachments.download": "Tải tệp xuống",
  "chatRuntime2.attachments.fileFallback": "tệp",
  "chatRuntime2.attachments.folder": "Thư mục",
  "chatRuntime2.attachments.folderWithFiles": "Thư mục · {summary}",
  "chatRuntime2.attachments.openFolder": "Mở thư mục {name} trong Tệp",

  "chatRuntime2.thumbnail.open": "Mở {title}",

  "chatRuntime2.part.videoUnsupported":
    "Trình duyệt của bạn không hỗ trợ thẻ video.",
  "chatRuntime2.part.imageAlt": "Hình ảnh",
  "chatRuntime2.part.errorContext": "phản hồi",

  "chatRuntime2.stoppedTask.title": "Tác vụ đã dừng",
  "chatRuntime2.stoppedTask.body":
    "Phản hồi ở trên chưa hoàn tất. Bạn có thể nhờ tiếp tục hoặc nhập nội dung mới.",
  "chatRuntime2.stoppedTask.hint": "Thử “continue” hoặc nhập nội dung mới.",

  "chatRuntime2.reasoning.title": "Suy luận",
  "chatRuntime2.reasoning.collapse": "Thu gọn",

  "chatRuntime2.testMode.banner":
    "Chế độ thử — phiên này chạy workflow dưới dạng mô phỏng",
};
