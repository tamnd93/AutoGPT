import { credentials1En } from "./credentials-1.en";

export const credentials1Vi: Partial<
  Record<keyof typeof credentials1En, string>
> = {
  "credentials1.dialog.cancel": "Huỷ",
  "credentials1.dialog.addNew": "Thêm mới",
  "credentials1.dialog.granting": "Đang cấp quyền…",
  "credentials1.dialog.updateThisAccount": "Cập nhật tài khoản này",
  "credentials1.dialog.useThisAccount": "Dùng tài khoản này",
  "credentials1.dialog.useExisting": "Dùng tài khoản có sẵn",
  "credentials1.dialog.connecting": "Đang kết nối…",
  "credentials1.dialog.continue": "Tiếp tục",

  "credentials1.existing.titleGrant":
    "Cấp cho chuyên gia này quyền dùng {name}",
  "credentials1.existing.titleChoose": "Chọn một tài khoản {name}",
  "credentials1.existing.titleUpdate": "Cập nhật một tài khoản {name}",
  "credentials1.existing.descGrant":
    "Tài khoản của bạn đã được kết nối nhưng chuyên gia này chưa dùng được. Chọn một tài khoản để chia sẻ, hoặc thêm tài khoản mới.",
  "credentials1.existing.descChoose":
    "Bạn có nhiều tài khoản đã kết nối. Chọn tài khoản chat này nên dùng, hoặc thêm tài khoản mới.",
  "credentials1.existing.descUpdate":
    "Không tài khoản nào trong các tài khoản đã kết nối có quyền cần thiết. Chọn tài khoản để đăng nhập lại, hoặc thêm tài khoản mới.",
  "credentials1.existing.accountLabel": "Tài khoản",
  "credentials1.existing.typeOAuth": "OAuth",
  "credentials1.existing.typeApiKey": "Khoá API",
  "credentials1.row.delete": "Xoá",

  "credentials1.apiKey.title": "Thêm API key mới cho {name}",
  "credentials1.apiKey.name": "Tên",
  "credentials1.apiKey.namePlaceholder": "Nhập tên cho API key này...",
  "credentials1.apiKey.label": "API Key",
  "credentials1.apiKey.placeholder": "Nhập API Key...",
  "credentials1.apiKey.scopesHint": "Quyền bắt buộc cho khối này:",
  "credentials1.apiKey.expiration": "Ngày hết hạn",
  "credentials1.apiKey.expirationPlaceholder": "Chọn ngày hết hạn...",
  "credentials1.apiKey.submit": "Thêm API Key",
  "credentials1.apiKey.nameRequired": "Cần nhập tên",
  "credentials1.apiKey.keyRequired": "Cần nhập API key",

  "credentials1.typeSelector.title": "Thêm thông tin kết nối cho {name}",
  "credentials1.typeSelector.passwordDesc":
    "Thêm thông tin kết nối gồm tên đăng nhập và mật khẩu.",
  "credentials1.typeSelector.passwordButton": "Nhập thông tin kết nối",
  "credentials1.typeSelector.hostDesc": "Thêm header theo host để xác thực.",
  "credentials1.typeSelector.hostButton": "Thêm header",
  "credentials1.typeSelector.oauthDesc":
    "Đăng nhập bằng tài khoản {name} qua OAuth.",
  "credentials1.typeSelector.oauthButton": "Đăng nhập bằng {name}",

  "credentials1.ayrshare.button": "Kết nối tài khoản mạng xã hội",
  "credentials1.ayrshare.popupBlocked":
    "Hãy cho phép cửa sổ bật lên cho trang này để đăng nhập bằng Ayrshare",
  "credentials1.ayrshare.successTitle": "Thành công",
  "credentials1.ayrshare.successBody":
    "Vui lòng hoàn tất xác thực trong cửa sổ bật lên",
  "credentials1.ayrshare.errorTitle": "Lỗi",
  "credentials1.ayrshare.errorBody": "Lỗi khi lấy URL SSO: {error}",

  "credentials1.flatView.credentials": "thông tin kết nối {name}",
  "credentials1.flatView.optional": "(không bắt buộc)",
  "credentials1.flatView.required": "bắt buộc",

  "credentials1.select.none": "Không có (bỏ qua thông tin kết nối này)",
  "credentials1.select.placeholder": "Chọn thông tin kết nối",
  "credentials1.select.aria": "Chọn thông tin kết nối {name}",
  "credentials1.select.selectOne": "Chọn một thông tin kết nối",

  "credentials1.delete.title": "Xoá thông tin kết nối",
  "credentials1.delete.body":
    'Bạn có chắc muốn xoá "{title}"? Không thể hoàn tác thao tác này.',
  "credentials1.delete.delete": "Xoá",
  "credentials1.delete.force": "Xoá cưỡng bức",
  "credentials1.typeLabels.apiKey": "Khoá API",
  "credentials1.typeLabels.userPassword": "Mật khẩu",
  "credentials1.typeLabels.hostScoped": "Header",
  "credentials1.typeLabels.deviceCode": "Xác thực thiết bị",

  "credentials1.action.existing": "Thêm thông tin kết nối khác",
  "credentials1.action.add": "Thêm thông tin kết nối",
  "credentials1.action.codexReconnect": "Kết nối lại ChatGPT",
  "credentials1.action.codexSignIn": "Đăng nhập bằng ChatGPT",
  "credentials1.action.connectAnother": "Kết nối tài khoản khác",
  "credentials1.action.useNewApiKey": "Dùng API key mới",
  "credentials1.action.addUserPassword":
    "Thêm tên đăng nhập và mật khẩu mới",
  "credentials1.action.updateHeaders": "Cập nhật header",
  "credentials1.action.addNew": "Thêm thông tin kết nối mới",
  "credentials1.action.addAccount": "Thêm tài khoản",
  "credentials1.action.addApiKeyShort": "Thêm API key",
  "credentials1.action.addUserPasswordShort": "Thêm tên đăng nhập và mật khẩu",
  "credentials1.action.addHeadersShort": "Thêm header",
  "credentials1.action.addCredentialsShort": "Thêm thông tin kết nối",

  "credentials1.oauthWait.title": "Đang chờ {name} đăng nhập...",
  "credentials1.oauthWait.blocked":
    "Trình duyệt đã chặn cửa sổ đăng nhập nên chúng tôi mở nó ở tab mới. Chuyển sang tab đó và hoàn tất đăng nhập. Nếu không thấy tab, hãy cho phép cửa sổ bật lên cho trang này, đóng hộp thoại này và thử kết nối lại.",
  "credentials1.oauthWait.body":
    "Hoàn tất đăng nhập trong cửa sổ đăng nhập. Đóng hộp thoại này sẽ huỷ quá trình đăng nhập.",

  "credentials1.password.title":
    "Thêm tên đăng nhập và mật khẩu mới cho {name}",
  "credentials1.password.username": "Tên đăng nhập",
  "credentials1.password.usernamePlaceholder": "Nhập tên đăng nhập...",
  "credentials1.password.password": "Mật khẩu",
  "credentials1.password.passwordPlaceholder": "Nhập mật khẩu...",
  "credentials1.password.namePlaceholder":
    "Nhập tên cho thông tin đăng nhập này...",
  "credentials1.password.submit": "Lưu và dùng thông tin đăng nhập này",
  "credentials1.password.usernameRequired": "Cần nhập tên đăng nhập",
  "credentials1.password.passwordRequired": "Cần nhập mật khẩu",

  "credentials1.mcp.authType": "Kiểu xác thực",
  "credentials1.mcp.authTypeAria": "Kiểu xác thực cho {name}",
  "credentials1.mcp.optionBearer": "API token (Bearer)",
  "credentials1.mcp.optionBasic": "Xác thực Basic",
  "credentials1.mcp.tokenLabelBasic": "Token xác thực Basic",
  "credentials1.mcp.tokenLabelBearer": "API token",
  "credentials1.mcp.hintBasic":
    'Dán chuỗi Base64 của user:password — giá trị sau "Basic" — hoặc toàn bộ header Authorization.',
  "credentials1.mcp.hintBearer":
    "Dán token trực tiếp. AutoGPT gửi token bằng xác thực Bearer.",
  "credentials1.mcp.placeholderBasic": "Dán Base64 của user:password",
  "credentials1.mcp.placeholderBearer": "Dán API token",

  "credentials1.deviceAuth.requesting": "Đang yêu cầu mã từ {name}…",
  "credentials1.deviceAuth.starting": "Đang bắt đầu xác thực thiết bị…",
  "credentials1.deviceAuth.intro":
    "{name} dùng xác thực thiết bị. Bấm nút bên dưới rồi mở liên kết để chấp thuận quyền truy cập.",
  "credentials1.deviceAuth.connect": "Kết nối {name}",
  "credentials1.deviceAuth.openAndEnter":
    "Mở liên kết bên dưới và nhập mã để kết nối tài khoản {name} của bạn.",
  "credentials1.deviceAuth.yourCode": "Mã của bạn",
  "credentials1.deviceAuth.open": "Mở {name}",
  "credentials1.deviceAuth.waitingApproval": "Đang chờ chấp thuận…",
  "credentials1.deviceAuth.connected": "Đã kết nối bằng xác thực thiết bị",
  "credentials1.deviceAuth.denied": "Yêu cầu bị từ chối",
  "credentials1.deviceAuth.deniedBody": "Yêu cầu xác thực đã bị từ chối.",
  "credentials1.deviceAuth.expired": "Yêu cầu đã hết hạn",
  "credentials1.deviceAuth.expiredBody":
    "Yêu cầu xác thực đã hết hạn. Vui lòng thử lại.",
  "credentials1.deviceAuth.pollFailed": "Kiểm tra xác thực thiết bị thất bại",
  "credentials1.deviceAuth.initFailed": "Bắt đầu xác thực thiết bị thất bại",
  "credentials1.deviceAuth.unexpected": "Lỗi không mong đợi",
  "credentials1.deviceAuth.planRequired": "Kết nối dịch vụ cần gói đang hoạt động",
  "credentials1.displayName.fallback": "Tài khoản {name} của bạn",
  "credentials1.removed.gone":
    "{title} đã bị xoá. Chọn một kết nối để workflow này tiếp tục chạy.",
  "credentials1.removed.replaced": "{title} đã bị xoá — đang dùng {replacement}.",
};
