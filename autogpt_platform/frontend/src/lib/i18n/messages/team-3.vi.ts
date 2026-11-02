import { team3En } from "./team-3.en";

export const team3Vi: Partial<Record<keyof typeof team3En, string>> = {
  "team3.mode.aria": "Chế độ phê duyệt của {name}",
  "team3.mode.heading": "Phê duyệt",
  "team3.mode.description":
    "Mỗi chat web mới với {name} bắt đầu theo cách này. Bạn vẫn có thể đổi riêng từng chat ở ô nhập, và các chat đang mở giữ thiết lập riêng. Routine, lượt chạy theo lịch và chat từ Slack, Discord, Teams hoặc Telegram không bị ảnh hưởng.",
  "team3.mode.legend": "Chế độ phê duyệt cho các chat mới với {name}",
  "team3.mode.defaultSuffix": " (mặc định)",
  "team3.mode.confirmTitle": "Chạy {name} không giám sát theo mặc định?",
  "team3.mode.confirmDescription":
    "{name} sẽ không hỏi trước bất cứ việc gì trong các chat mới. Chỉnh sửa, lệnh và hành động ra ngoài nền tảng, như gửi tin nhắn hay email, sẽ chạy mà không cần bạn duyệt, trừ khi bạn đổi lại một chat từ ô nhập.",

  "team3.mode.updated": "Đã cập nhật chế độ phê duyệt",
  "team3.mode.disabledTitle": "Tài khoản của bạn chưa bật chế độ phê duyệt",
  "team3.mode.failedTitle": "Không cập nhật được chế độ phê duyệt",
  "team3.mode.retry": "Hãy thử lại.",

  "team3.needsYou.aria": "Cần bạn xử lý",
  "team3.needsYou.statusOne": "{count} mục cần bạn xử lý",
  "team3.needsYou.statusMany": "{count} mục cần bạn xử lý",
};
