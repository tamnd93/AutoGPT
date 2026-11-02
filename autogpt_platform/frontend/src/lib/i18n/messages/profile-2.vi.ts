import { Profile2En } from "./profile-2.en";

export const Profile2Vi: Partial<Record<keyof typeof Profile2En, string>> = {
  "profile2.nav.profile": "Hồ sơ",
  "profile2.nav.creatorDashboard": "Bảng điều khiển người sáng tạo",
  "profile2.nav.billing": "Thanh toán",
  "profile2.nav.integrations": "Tích hợp",
  "profile2.nav.settings": "Cài đặt",
  "profile2.nav.apiKeys": "Khoá API",
  "profile2.nav.oauthApps": "Ứng dụng OAuth",

  "profile2.email.securityTitle": "Bảo mật & truy cập",
  "profile2.email.label": "Email",
  "profile2.email.resetPassword": "Đặt lại mật khẩu",
  "profile2.email.saving": "Đang lưu...",
  "profile2.email.update": "Cập nhật email",
  "profile2.email.validationRequired": "Cần nhập email",
  "profile2.email.validationInvalid": "Hãy nhập địa chỉ email hợp lệ",
  "profile2.email.confirmTitle": "Xác nhận email mới",
  "profile2.email.confirmDescription":
    "Chúng tôi đã gửi liên kết xác nhận tới địa chỉ email hiện tại của bạn. Email sẽ đổi sau khi bạn bấm vào liên kết đó.",
  "profile2.email.updatedTitle": "Đã cập nhật email",
  "profile2.email.updatedDescription": "Email của bạn giờ là {email}.",
  "profile2.email.errorTitle": "Lỗi cập nhật email",
  "profile2.email.failedUpdate": "Không cập nhật được email",
  "profile2.email.somethingWrong": "Đã xảy ra lỗi",

  "profile2.timezone.title": "Múi giờ",
  "profile2.timezone.selectLabel": "Chọn múi giờ của bạn",
  "profile2.timezone.placeholder": "Chọn múi giờ",
  "profile2.timezone.saving": "Đang lưu...",
  "profile2.timezone.save": "Lưu múi giờ",
};
