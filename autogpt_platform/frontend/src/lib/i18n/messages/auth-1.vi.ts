import { auth1En } from "./auth-1.en";

export const auth1Vi: Partial<Record<keyof typeof auth1En, string>> = {
  "auth1.login.banned":
    "Tài khoản này đã bị cấm. Nếu bạn cho rằng có nhầm lẫn, vui lòng liên hệ bộ phận hỗ trợ.",
  "auth1.login.verificationExpired":
    "Liên kết xác minh đó đã hết hạn hoặc đã được dùng. Hãy đăng nhập và chúng tôi sẽ gửi liên kết mới.",
  "auth1.login.verificationVerified":
    "Email của bạn đã được xác minh. Hãy đăng nhập để tiếp tục.",
  "auth1.login.title": "Đăng nhập vào tài khoản của bạn để tiếp tục",
  "auth1.login.emailLabel": "Email",
  "auth1.login.passwordLabel": "Mật khẩu",
  "auth1.login.passwordPlaceholder": "Nhập mật khẩu của bạn",
  "auth1.login.forgot": "Quên mật khẩu?",
  "auth1.login.submitting": "Đang đăng nhập...",
  "auth1.login.submit": "Đăng nhập",
  "auth1.login.noAccount": "Chưa có tài khoản?",
  "auth1.login.signupLink": "Đăng ký",
  "auth1.login.useGoogleSso":
    "Vui lòng dùng Google SSO để đăng nhập bằng email AutoGPT.",
  "auth1.login.unexpected": "Lỗi không mong muốn khi đăng nhập",
  "auth1.common.oauthStartFailed": "Không bắt đầu được luồng OAuth",
  "auth1.login.invalidCredentials": "Email hoặc mật khẩu không đúng",
  "auth1.login.failed": "Đăng nhập thất bại. Vui lòng thử lại.",

  "auth1.signup.title": "Tạo tài khoản của bạn",
  "auth1.signup.alreadyMember": "Đã có tài khoản?",
  "auth1.signup.loginLink": "Đăng nhập",
  "auth1.signup.emailLabel": "Email",
  "auth1.signup.passwordLabel": "Mật khẩu",
  "auth1.signup.passwordPlaceholder": "Tạo mật khẩu",
  "auth1.signup.confirmLabel": "Xác nhận mật khẩu",
  "auth1.signup.confirmPlaceholder": "Nhập lại mật khẩu",
  "auth1.signup.submitting": "Đang đăng ký...",
  "auth1.signup.submit": "Đăng ký",
  "auth1.signup.useGoogleSso":
    "Vui lòng dùng Google SSO để tạo tài khoản bằng email AutoGPT.",
  "auth1.signup.userExists": "Email này đã được dùng cho một tài khoản",
  "auth1.signup.failedToast": "Đăng ký thất bại",
  "auth1.signup.unexpected": "Lỗi không mong muốn khi đăng ký",
  "auth1.signup.invalidPayload": "Dữ liệu đăng ký không hợp lệ",
  "auth1.signup.accountSetupFailed":
    "Không hoàn tất được việc tạo tài khoản. Vui lòng thử lại.",
  "auth1.signup.failed": "Đăng ký thất bại. Vui lòng thử lại.",

  "auth1.signup.legal.intro": "Khi tiếp tục, bạn đồng ý với",
  "auth1.signup.legal.terms": "Điều khoản sử dụng",
  "auth1.signup.legal.and": "và",
  "auth1.signup.legal.privacy": "Chính sách quyền riêng tư",
  "auth1.signup.legal.optedOut": "Bạn sẽ không nhận email marketing.",
  "auth1.signup.legal.marketing":
    "Chúng tôi có thể gửi email cập nhật sản phẩm và ưu đãi cho bạn;",
  "auth1.signup.legal.undo": "Hoàn tác",
  "auth1.signup.legal.optOut": "từ chối",

  "auth1.logout.failed": "Đăng xuất thất bại. Đang chuyển về trang đăng nhập.",
  "auth1.logout.loggingOut": "Đang đăng xuất...",

  "auth1.authError.loading": "Đang tải...",
  "auth1.authError.withDescription":
    "{description}. Nếu lỗi này tiếp diễn, vui lòng liên hệ hỗ trợ tại contact@agpt.co",
  "auth1.authError.fallback":
    "Đã xảy ra lỗi xác thực. Vui lòng liên hệ hỗ trợ tại contact@agpt.co",
  "auth1.authError.codeDetail": "Mã lỗi: {code}",
  "auth1.authError.context": "xác thực",

  "auth1.authorize.invalidRequest": "Yêu cầu không hợp lệ",
  "auth1.authorize.missingParams": "Thiếu tham số bắt buộc: {params}",
  "auth1.authorize.paramsContext": "tham số yêu cầu",
  "auth1.authorize.hint":
    "Vui lòng liên hệ quản trị viên của ứng dụng đã gửi bạn đến đây.",
  "auth1.authorize.loadingTitle": "Đang tải...",
  "auth1.authorize.loadingApp": "Đang tải thông tin ứng dụng...",
  "auth1.authorize.appNotFound": "Không tìm thấy ứng dụng",
  "auth1.authorize.appContext": "ứng dụng",
  "auth1.authorize.appMissing":
    "Không tìm thấy ứng dụng bạn đang cố uỷ quyền hoặc ứng dụng đã bị vô hiệu hoá.",
  "auth1.authorize.invalidScopes": "Phạm vi không hợp lệ",
  "auth1.authorize.scopesContext": "phạm vi quyền",
  "auth1.authorize.scopesMessage":
    "Ứng dụng đang yêu cầu những phạm vi mà nó không được phép dùng: {scopes}",
  "auth1.authorize.returnToApp": "Quay lại ứng dụng",
  "auth1.authorize.title": "Uỷ quyền ứng dụng",
  "auth1.authorize.logoAlt": "Logo {name}",
  "auth1.authorize.requesting": "Ứng dụng này đang yêu cầu quyền:",
  "auth1.authorize.authzContext": "uỷ quyền",
  "auth1.authorize.failedNoRedirect":
    "Uỷ quyền thất bại: không nhận được URL chuyển hướng",
  "auth1.authorize.failed": "Uỷ quyền thất bại",
  "auth1.authorize.authorizing": "Đang uỷ quyền...",
  "auth1.authorize.authorize": "Uỷ quyền",
  "auth1.authorize.deny": "Từ chối",
  "auth1.authorize.warning":
    "Khi uỷ quyền, bạn cho phép ứng dụng này truy cập tài khoản AutoGPT của bạn với các quyền nêu trên.",

  "auth1.setup.title": "Kết nối các tài khoản của bạn",
  "auth1.setup.requestContext": "chi tiết yêu cầu",
  "auth1.setup.requestSuffix":
    "đang yêu cầu bạn kết nối các tích hợp sau với tài khoản AutoGPT của bạn.",
  "auth1.setup.connected": "Đã kết nối",
  "auth1.setup.continue": "Tiếp tục",
  "auth1.setup.connectMore": "Kết nối thêm {count}",
  "auth1.setup.cancel": "Huỷ",
  "auth1.setup.settingsPrefix": "Bạn có thể xem và quản lý mọi tích hợp trong",
  "auth1.setup.settingsLink": "cài đặt tích hợp",
  "auth1.setup.appNotFound": "Không tìm thấy ứng dụng",
  "auth1.setup.providersContext": "nhà cung cấp",
  "auth1.setup.noProviders": "Chưa chỉ định nhà cung cấp nào",
  "auth1.setup.iconAlt": "Biểu tượng {provider}",

  "auth1.mcp.title": "Đăng nhập MCP",
  "auth1.mcp.completing": "Đang hoàn tất đăng nhập...",
  "auth1.mcp.completeClosing": "Đăng nhập hoàn tất! Cửa sổ này sẽ đóng lại.",
  "auth1.mcp.completeManual":
    "Đăng nhập thành công! Bạn có thể đóng tab này và quay lại builder.",
  "auth1.mcp.failedPrefix": "Đăng nhập thất bại: ",
  "auth1.mcp.unknownError": "Lỗi không xác định",

  "auth1.oauth.missingCodeState": "Callback OAuth thiếu code hoặc state",

  "auth1.reset.sentTitle": "Kiểm tra email của bạn",
  "auth1.reset.sentBody":
    "Nếu tồn tại tài khoản với địa chỉ này, chúng tôi đã gửi liên kết đặt lại mật khẩu.",
  "auth1.reset.errorTitle": "Lỗi",
  "auth1.reset.successTitle": "Thành công",
  "auth1.reset.successBody":
    "Đổi mật khẩu thành công. Đang chuyển về trang đăng nhập.",
  "auth1.reset.expiredTitle": "Liên kết đã hết hạn",
  "auth1.reset.failedTitle": "Đặt lại mật khẩu thất bại",
  "auth1.reset.fallbackError": "Đặt lại mật khẩu thất bại",
  "auth1.reset.cardTitle": "Đặt lại mật khẩu",
  "auth1.reset.passwordLabel": "Mật khẩu",
  "auth1.reset.confirmLabel": "Xác nhận mật khẩu",
  "auth1.reset.updating": "Đang cập nhật mật khẩu...",
  "auth1.reset.update": "Cập nhật mật khẩu",
  "auth1.reset.emailLabel": "Email",
  "auth1.reset.send": "Gửi email đặt lại",
  "auth1.reset.sendFailed": "Không gửi được email đặt lại. Vui lòng thử lại.",
  "auth1.reset.changeFailed": "Không đổi được mật khẩu. Vui lòng thử lại.",

  "auth1.feedback.genericError": "Đã xảy ra lỗi. Vui lòng thử lại.",
  "auth1.feedback.signupNotAllowed":
    "Email bạn cung cấp có thể không được phép đăng ký.",
  "auth1.feedback.betaTitle": "Nền tảng AutoGPT hiện đang trong beta kín.",
  "auth1.feedback.joinWaitlistDesc": "Bạn có thể tham gia ",
  "auth1.feedback.waitlistLink": "danh sách chờ tại đây",
  "auth1.feedback.sameEmail":
    "Hãy chắc rằng bạn dùng đúng địa chỉ email đã dùng để đăng ký danh sách chờ.",
  "auth1.feedback.selfHostTitle": "Bạn có thể tự lưu trữ nền tảng!",
  "auth1.feedback.visitOur": "Ghé thăm",
  "auth1.feedback.githubRepo": "kho GitHub",
  "auth1.feedback.loginTrouble": "Gặp khó khăn khi đăng nhập?",
  "auth1.feedback.makeSureSignedUp": "Hãy chắc rằng bạn đã ",
  "auth1.feedback.signedUp": "đăng ký",
  "auth1.feedback.localTrouble": "Gặp khó khăn khi chạy AutoGPT cục bộ?",
  "auth1.feedback.askHelp": "Hỏi trợ giúp trên",
  "auth1.feedback.discord": "Discord",
  "auth1.feedback.bugTitle": "Bạn nghĩ mình đã tìm thấy lỗi?",
  "auth1.feedback.openIssue": "Mở issue trên",
  "auth1.feedback.github": "GitHub",
  "auth1.feedback.cloudTitle": "Quan tâm đến bản lưu trữ trên cloud?",
  "auth1.feedback.joinOur": "Tham gia",
  "auth1.feedback.waitlistHere": "danh sách chờ tại đây",

  "auth1.divider.or": "hoặc",
};
