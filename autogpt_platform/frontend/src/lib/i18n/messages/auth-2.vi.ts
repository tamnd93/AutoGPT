import { auth2En } from "./auth-2.en";

export const auth2Vi: Partial<Record<keyof typeof auth2En, string>> = {
  "auth2.inbox.signup.title": "Kiểm tra hộp thư của bạn",
  "auth2.inbox.signup.action": "tiếp tục",
  "auth2.inbox.signup.backPrompt": "Sai địa chỉ?",
  "auth2.inbox.signup.backLabel": "Bắt đầu lại",
  "auth2.inbox.login.title": "Xác minh email để đăng nhập",
  "auth2.inbox.login.action": "đăng nhập",
  "auth2.inbox.login.backPrompt": "Sai tài khoản?",
  "auth2.inbox.login.backLabel": "Quay lại đăng nhập",
  "auth2.inbox.sentPrefix": "Chúng tôi đã gửi email tới",
  "auth2.inbox.sentSuffix": ". Hãy mở liên kết trong email để {action}.",
  "auth2.inbox.spam": "Không thấy? Hãy kiểm tra thư mục spam.",
  "auth2.inbox.resendIn": "Gửi lại email sau {seconds}s",
  "auth2.inbox.resend": "Gửi lại email",
  "auth2.inbox.sentToast": "Đã gửi email tới {email}",
  "auth2.inbox.resendFailedTitle": "Chúng tôi không gửi được email",
  "auth2.inbox.resendRateLimited":
    "Bạn thử quá nhiều lần. Vui lòng thử lại sau vài phút.",
  "auth2.inbox.resendRetry": "Vui lòng thử lại sau giây lát.",

  "auth2.emailNotAllowed.title": "Email không được phép",

  "auth2.expired.title":
    "Liên kết đặt lại mật khẩu của bạn đã hết hạn hoặc đã được dùng",
  "auth2.expired.body":
    "Nhấn bên dưới để yêu cầu liên kết đặt lại mật khẩu mới.",
  "auth2.expired.request": "Yêu cầu liên kết mới",
  "auth2.expired.haveAccess": "Đã có quyền truy cập?",
  "auth2.expired.login": "Đăng nhập tại đây",

  "auth2.google.connecting": "Đang kết nối...",
  "auth2.google.continue": "Tiếp tục với Google",

  "auth2.mobile.title": "Lưu ý: AutoGPT hoạt động tốt nhất trên máy tính",
  "auth2.mobile.body":
    "Một số tính năng có thể bị hạn chế trên điện thoại. Để có trải nghiệm tốt nhất, hãy chuyển sang máy tính.",

  "auth2.waitlist.title": "Chúng tôi đang ở giai đoạn beta kín",
  "auth2.waitlist.body":
    "Có vẻ email của bạn chưa có trong danh sách được dùng thử sớm. Hãy tham gia danh sách chờ và chúng tôi sẽ báo ngay khi mở quyền truy cập!",
  "auth2.waitlist.join": "Tham gia danh sách chờ",
  "auth2.waitlist.backToLogin": "Quay lại đăng nhập",
  "auth2.waitlist.footerPrefix":
    "Đã tham gia rồi? Hãy kiểm tra lại bạn đang dùng đúng email đã đăng ký. Cần hỗ trợ? Gửi email cho chúng tôi tại",
  "auth2.waitlist.footerOr": "hoặc",
  "auth2.waitlist.footerDiscord": "nhắn cho chúng tôi trên Discord",
  "auth2.waitlist.selfHostTitle": "Email này không thể đăng ký ở đây",
  "auth2.waitlist.selfHostBody":
    "Máy chủ này chỉ cho phép những email đã được duyệt. Hãy nhờ quản trị viên thêm email của bạn, hoặc đăng ký bằng một email đã được duyệt.",
};
