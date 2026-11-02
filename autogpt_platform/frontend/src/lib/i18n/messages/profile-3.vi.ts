import { profile3En } from "./profile-3.en";

export const profile3Vi: Partial<Record<keyof typeof profile3En, string>> = {
  "profile3.timezone.required": "Hãy chọn múi giờ",
  "profile3.timezone.successTitle": "Thành công",
  "profile3.timezone.successDesc": "Đã cập nhật múi giờ thành công.",
  "profile3.timezone.errorTitle": "Lỗi",
  "profile3.timezone.errorDesc": "Không cập nhật được múi giờ. Hãy thử lại.",

  "profile3.detection.title": "Đã phát hiện múi giờ",
  "profile3.detection.description":
    "Chúng tôi đã đặt múi giờ của bạn thành {timezone}. Bạn có thể đổi trong phần cài đặt.",

  "profile3.page.title": "Cài đặt – AutoGPT Platform",
  "profile3.page.heading": "Tài khoản của tôi",
  "profile3.page.description":
    "Quản lý cài đặt và tuỳ chọn tài khoản của bạn.",
};
