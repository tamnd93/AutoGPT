import { account1En } from "./account-1.en";

export const account1Vi: Partial<Record<keyof typeof account1En, string>> = {
  "account1.page.title": "Tài khoản – Nền tảng AutoGPT",
  "account1.page.errorContext": "cài đặt",

  "account1.header.title": "Tài khoản",
  "account1.header.body": "Điều chỉnh tài khoản và múi giờ của bạn.",

  "account1.saveBar.save": "Lưu thay đổi",
  "account1.saveBar.discard": "Bỏ thay đổi",

  "account1.accountCard.email": "Email",
  "account1.accountCard.updateTitle": "Cập nhật email",
  "account1.accountCard.editAria": "Sửa email",
  "account1.accountCard.confirmNote":
    "Chúng tôi sẽ gửi liên kết xác nhận để xác minh địa chỉ mới của bạn.",
  "account1.accountCard.emailLabel": "Email",
  "account1.accountCard.cancel": "Huỷ",
  "account1.accountCard.saving": "Đang lưu",
  "account1.accountCard.update": "Cập nhật email",
  "account1.accountCard.password": "Mật khẩu",
  "account1.accountCard.reset": "Đặt lại mật khẩu",
  "account1.accountCard.emailRequired": "Cần nhập email",
  "account1.accountCard.emailInvalid": "Nhập địa chỉ email hợp lệ",
  "account1.accountCard.updateFailedFallback": "Không cập nhật được email",
  "account1.accountCard.toastConfirmTitle": "Xác nhận email mới của bạn",
  "account1.accountCard.toastConfirmBody":
    "Chúng tôi đã gửi liên kết xác nhận tới địa chỉ email hiện tại của bạn. Email sẽ thay đổi sau khi bạn nhấn vào liên kết.",
  "account1.accountCard.toastUpdatedTitle": "Đã cập nhật email",
  "account1.accountCard.toastUpdatedBody": "Email của bạn bây giờ là {email}.",
  "account1.accountCard.toastFailedTitle": "Không cập nhật được email",

  "account1.browser.title": "Trình duyệt",
  "account1.browser.body":
    "Đặt riêng cho từng thiết bị. Bật ở đây sẽ không áp dụng cho điện thoại hay trình duyệt khác của bạn.",

  "account1.cookie.title": "Cookie",
  "account1.cookie.body":
    "Chọn những cookie tuỳ chọn mà AutoGPT được phép dùng.",
  "account1.cookie.unavailable":
    "Không tải được cài đặt cookie. Có thể trình chặn nội dung đang ngăn chúng.",
  "account1.cookie.button": "Cài đặt cookie",

  "account1.language.title": "Ngôn ngữ",
  "account1.language.selectLabel": "Ngôn ngữ",

  "account1.notif.emailTitle": "Email",
  "account1.notif.billingNote":
    "Tin nhắn thanh toán và tài khoản luôn được gửi — chúng liên quan đến tài khoản của bạn, không phải quảng cáo.",
  "account1.notif.briefingLabel": "Thông báo",
  "account1.notif.briefingBody":
    "Những gì workflow của bạn đã làm được, vào khoảng 07:30 theo giờ của bạn. Không gửi khi không có gì chạy.",
  "account1.notif.alertsTitle": "Cảnh báo",
  "account1.notif.alertsBody":
    "Chỉ khi có việc đang chờ bạn — không bao giờ cho lần chạy thành công. Tối đa hai lần một ngày.",
  "account1.notif.storeTitle": "Đánh giá Marketplace",
  "account1.notif.storeBody":
    "Khi một workflow bạn gửi được duyệt hoặc cần chỉnh sửa.",

  "account1.helpers.briefing.daily": "Hằng ngày",
  "account1.helpers.briefing.weekly": "Hằng tuần",
  "account1.helpers.briefing.monthly": "Hằng tháng",
  "account1.helpers.briefing.off": "Tắt",
  "account1.helpers.footer.daily": "Bạn sẽ nhận bản tóm tắt mỗi ngày",
  "account1.helpers.footer.weekly": "Bạn sẽ nhận bản tóm tắt mỗi tuần",
  "account1.helpers.footer.monthly": "Bạn sẽ nhận bản tóm tắt mỗi tháng",
  "account1.helpers.footer.alerts":
    "Bản tóm tắt đã tạm dừng — bạn vẫn nhận cảnh báo",
  "account1.helpers.footer.off": "Bản tóm tắt và cảnh báo đã tạm dừng",
  "account1.helpers.footer.default": "Đã cập nhật tuỳ chọn",

  "account1.prefs.footerFailedTitle": "Không cập nhật được tần suất email",
  "account1.prefs.footerFailedBody":
    "Lựa chọn của bạn đã được chọn bên dưới — nhấn Lưu để thử lại.",
  "account1.prefs.saveFailedTz": "Múi giờ: {detail}",
  "account1.prefs.saveFailedNotifications": "Thông báo: {detail}",
  "account1.prefs.unknownError": "lỗi không xác định",
  "account1.prefs.saved": "Đã lưu tuỳ chọn",
  "account1.prefs.partial": "Đã lưu một phần tuỳ chọn",
  "account1.prefs.saveFailed": "Không lưu được tuỳ chọn",

  "account1.timezone.title": "Múi giờ",
  "account1.timezone.infoAria": "Thông tin múi giờ",
  "account1.timezone.tooltip":
    "Dùng cho lịch chạy, bản tóm tắt và mốc thời gian.",
  "account1.timezone.selectLabel": "Múi giờ",
  "account1.timezone.placeholder": "Chọn múi giờ của bạn",

  "account1.nav.profile": "Hồ sơ",
  "account1.nav.account": "Tài khoản",
  "account1.nav.memory": "Ký ức",
  "account1.nav.billing": "Thanh toán",
  "account1.nav.integrations": "Tích hợp",
  "account1.nav.bots": "Bot",
  "account1.nav.apiKeys": "Khoá API AutoGPT",
  "account1.nav.creator": "Bảng điều khiển người sáng tạo",

  "account1.oauthApps.title": "Ứng dụng OAuth",
  "account1.oauthApps.comingSoon": "Sắp ra mắt.",

  "account1.links.title": "Liên kết của bạn",
  "account1.links.body":
    "Thêm tối đa {max} liên kết. Trang web, GitHub, X, bất cứ thứ gì bạn muốn hiển thị.",
  "account1.links.linkAria": "Liên kết {index}",
  "account1.links.removeAria": "Xoá liên kết {index}",
  "account1.links.empty": "Chưa có liên kết nào.",
  "account1.links.add": "Thêm liên kết",
  "account1.links.limit": "Đã đạt giới hạn {max}",

  "account1.profile.bio": "Giới thiệu",
  "account1.profile.left": "còn {count} ký tự",
  "account1.profile.actionBold": "Đậm",
  "account1.profile.actionItalic": "Nghiêng",
  "account1.profile.actionStrike": "Gạch ngang",
  "account1.profile.actionLink": "Liên kết",
  "account1.profile.actionList": "Danh sách gạch đầu dòng",
  "account1.profile.phBold": "văn bản đậm",
  "account1.profile.phItalic": "văn bản nghiêng",
  "account1.profile.phStrike": "gạch ngang",
  "account1.profile.phLink": "văn bản liên kết",
  "account1.profile.phList": "mục danh sách",
  "account1.profile.edit": "Sửa",
  "account1.profile.preview": "Xem trước",
  "account1.profile.emptyPreview": "Chưa có gì để xem trước.",
  "account1.profile.bioLabel": "Giới thiệu",
  "account1.profile.bioPlaceholder":
    "Cho mọi người biết bạn xây gì, những workflow bạn gửi, và điều bạn quan tâm.",
};
