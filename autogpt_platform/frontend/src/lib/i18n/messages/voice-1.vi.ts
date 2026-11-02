import { voice1En } from "./voice-1.en";

export const voice1Vi: Partial<Record<keyof typeof voice1En, string>> = {
  "voice1.status.listening": "Đang nghe",
  "voice1.status.transcribing": "Đang chuyển thành văn bản",
  "voice1.status.thinking": "Đang suy nghĩ",
  "voice1.status.speaking": "Đang nói",
  "voice1.status.off": "Chế độ giọng nói đã tắt",

  "voice1.toast.title": "Chế độ giọng nói",
  "voice1.toast.genericError": "Đã xảy ra lỗi.",

  "voice1.error.transcription": "Chuyển giọng nói thành văn bản thất bại",
  "voice1.error.audioPlayback": "Phát âm thanh thất bại",
  "voice1.error.synthesisFailed": "Tổng hợp giọng nói thất bại ({status})",
  "voice1.error.usageLimit":
    "Bạn đã dùng hết hạn mức — trả lời bằng giọng nói tạm dừng cho đến khi hạn mức được làm mới.",
  "voice1.error.subscription":
    "Trả lời bằng giọng nói cần gói AutoGPT đang hoạt động.",
  "voice1.error.unavailable":
    "Hiện chưa thể trả lời bằng giọng nói. Hãy thử lại sau ít phút.",

  "voice1.bar.retry": "Thử lại",
  "voice1.bar.download": "Tải bản ghi âm",

  "voice1.button.stop": "Dừng",
  "voice1.button.leave": "Thoát chế độ giọng nói",
  "voice1.button.start": "Bật chế độ giọng nói",
};
