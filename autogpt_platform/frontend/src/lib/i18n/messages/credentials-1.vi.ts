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
};
