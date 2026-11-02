import { Profile1En } from "./profile-1.en";

export const Profile1Vi: Partial<Record<keyof typeof Profile1En, string>> = {
  "profile1.tier.free": "Miễn phí",
  "profile1.tier.pricePerMonth": "{price}/tháng",
  "profile1.tier.noSubscription": "Chưa đăng ký gói",
  "profile1.tier.rateLimits": "{multiplier}x giới hạn tốc độ",
  "profile1.tier.desc.basic":
    "Năng lực expert cơ bản với giới hạn tốc độ tiêu chuẩn",
  "profile1.tier.desc.pro":
    "Năng lực expert để chạy nhiều việc hơn mỗi ngày/tuần",
  "profile1.tier.desc.max":
    "Năng lực expert mở rộng — phù hợp người dùng chuyên sâu",
  "profile1.tier.desc.business":
    "Năng lực expert cho đội và khối lượng việc lớn",

  "profile1.apiKeys.page.title": "Khoá API AutoGPT Platform",
  "profile1.apiKeys.page.description":
    "Quản lý khoá API AutoGPT Platform để truy cập bằng chương trình",
  "profile1.apiKeys.table.name": "Tên",
  "profile1.apiKeys.table.apiKey": "Khoá API",
  "profile1.apiKeys.table.status": "Trạng thái",
  "profile1.apiKeys.table.created": "Ngày tạo",
  "profile1.apiKeys.table.lastUsed": "Dùng gần nhất",
  "profile1.apiKeys.table.never": "Chưa bao giờ",
  "profile1.apiKeys.table.revoke": "Thu hồi",
  "profile1.common.success": "Thành công",
  "profile1.common.error": "Lỗi",
  "profile1.common.cancel": "Huỷ",
  "profile1.apiKeys.toast.revoked":
    "Đã thu hồi khoá API AutoGPT Platform thành công",
  "profile1.apiKeys.toast.revokeFailed":
    "Không thu hồi được khoá API AutoGPT Platform",
  "profile1.apiKeys.toast.createFailed":
    "Không tạo được khoá API AutoGPT Platform",
  "profile1.apiKeys.toast.copied":
    "Đã sao chép khoá API AutoGPT Platform vào clipboard",
  "profile1.apiKeys.copiedTitle": "Đã sao chép",
  "profile1.apiKeys.createKey": "Tạo khoá",
  "profile1.apiKeys.createTitle": "Tạo khoá API mới",
  "profile1.apiKeys.createDescription": "Tạo một khoá API AutoGPT Platform mới",
  "profile1.apiKeys.name": "Tên",
  "profile1.apiKeys.namePlaceholder": "Khoá API AutoGPT Platform của tôi",
  "profile1.apiKeys.description": "Mô tả (không bắt buộc)",
  "profile1.apiKeys.descriptionPlaceholder": "Dùng cho...",
  "profile1.apiKeys.permissions": "Quyền",
  "profile1.apiKeys.create": "Tạo",
  "profile1.apiKeys.createdTitle": "Đã tạo khoá API AutoGPT Platform",
  "profile1.apiKeys.createdDescription":
    "Hãy sao chép khoá API AutoGPT ngay. Bạn sẽ không xem lại được khoá này nữa!",
  "profile1.apiKeys.close": "Đóng",
};
