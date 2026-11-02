import { ConnectServices1En } from "./connect-services-1.en";

export const ConnectServices1Vi: Partial<
  Record<keyof typeof ConnectServices1En, string>
> = {
  "connectServices1.dialog.title": "Kết nối một dịch vụ",
  "connectServices1.dialog.description":
    "Chọn một dịch vụ để kết nối tài khoản hoặc xem hướng dẫn thiết lập.",

  "connectServices1.methodView.connectProvider": "Kết nối {provider}",
  "connectServices1.methodView.connectAutoGpt":
    "Kết nối AutoGPT với {provider}",
  "connectServices1.methodView.chooseHow":
    "Chọn cách bạn muốn kết nối tài khoản {provider}.",
  "connectServices1.methodView.recommended": "ĐỀ XUẤT",
  "connectServices1.methodView.oauthLabel": "OAuth",
  "connectServices1.methodView.oauthDesc": "Truy cập an toàn một cú nhấp.",
  "connectServices1.methodView.apiKeyLabel": "Khoá API",
  "connectServices1.methodView.apiKeyDesc":
    "Dán token của bạn để tự thiết lập.",
  "connectServices1.methodView.userPasswordLabel": "Tên đăng nhập & mật khẩu",
  "connectServices1.methodView.userPasswordDesc":
    "Đăng nhập bằng thông tin tài khoản.",
  "connectServices1.methodView.hostScopedLabel": "Truy cập website",
  "connectServices1.methodView.hostScopedDesc":
    "Dán khoá hoặc header chỉ dùng cho một website.",
  "connectServices1.methodView.deviceCodeLabel": "Xác thực thiết bị",
  "connectServices1.methodView.deviceCodeDesc":
    "Duyệt trên điện thoại bằng mã ngắn.",

  "connectServices1.inlineApiKey.name": "Tên",
  "connectServices1.inlineApiKey.keyPlaceholder": "Khoá {provider} của tôi",
  "connectServices1.inlineApiKey.apiKey": "Khoá API",
  "connectServices1.inlineApiKey.expires": "Hết hạn (tuỳ chọn)",

  "connectServices1.hostScoped.hostRequired": "Cần nhập máy chủ",
  "connectServices1.hostScoped.hostNoUrl":
    "Chỉ nhập máy chủ (ví dụ api.example.com), không nhập URL đầy đủ",
  "connectServices1.hostScoped.hostNoPath":
    "Chỉ nhập máy chủ, không kèm đường dẫn. Có thể kèm cổng.",
  "connectServices1.hostScoped.savedTitle":
    "Đã lưu thông tin xác thực của máy chủ",
  "connectServices1.hostScoped.saveFailed":
    "Không lưu được thông tin xác thực của máy chủ",
  "connectServices1.hostScoped.host": "Máy chủ",
  "connectServices1.hostScoped.takenFromUrl": "Lấy từ URL mà block này gọi.",
  "connectServices1.hostScoped.hostFromUrl":
    "Máy chủ của URL mà block này sẽ gọi.",
  "connectServices1.hostScoped.headers": "Header",
  "connectServices1.hostScoped.headersBody":
    "Gửi kèm mọi yêu cầu tới máy chủ này, ví dụ Authorization.",
  "connectServices1.hostScoped.headerName": "Tên header",
  "connectServices1.hostScoped.headerValue": "Giá trị header",
  "connectServices1.hostScoped.removeHeader": "Xoá header {index}",
  "connectServices1.hostScoped.addHeader": "Thêm header",
  "connectServices1.hostScoped.connecting": "Đang kết nối…",
  "connectServices1.hostScoped.connect": "Kết nối",

  "connectServices1.userPassword.nameRequired": "Cần nhập tên",
  "connectServices1.userPassword.nameMax": "Tên tối đa 100 ký tự",
  "connectServices1.userPassword.usernameRequired":
    "Cần nhập tên đăng nhập",
  "connectServices1.userPassword.passwordRequired": "Cần nhập mật khẩu",
  "connectServices1.userPassword.savedTitle":
    "Đã lưu thông tin xác thực",
  "connectServices1.userPassword.saveFailed":
    "Không lưu được thông tin xác thực",
  "connectServices1.userPassword.name": "Tên",
  "connectServices1.userPassword.accountPlaceholder":
    "Tài khoản {provider} của tôi",
  "connectServices1.userPassword.username": "Tên đăng nhập",
  "connectServices1.userPassword.password": "Mật khẩu",

  "connectServices1.form.planNeeded":
    "Kết nối dịch vụ cần gói đang hoạt động",
  "connectServices1.form.unexpected": "Lỗi không mong muốn",

  "connectServices1.apiKeyForm.saved": "Đã lưu khoá API",
  "connectServices1.apiKeyForm.saveFailed": "Không lưu được khoá API",
  "connectServices1.apiKeyForm.name": "Tên",
  "connectServices1.apiKeyForm.keyPlaceholder": "Khoá {provider} của tôi",
  "connectServices1.apiKeyForm.apiKey": "Khoá API",
  "connectServices1.apiKeyForm.expires": "Hết hạn (tuỳ chọn)",
  "connectServices1.apiKeyForm.expiresHint":
    "Để trống nếu muốn giữ khoá vô thời hạn",
  "connectServices1.apiKeyForm.save": "Lưu khoá API",
  "connectServices1.apiKeyForm.nameRequired": "Cần nhập tên",
  "connectServices1.apiKeyForm.nameMax": "Tên tối đa 100 ký tự",
  "connectServices1.apiKeyForm.keyRequired": "Cần nhập khoá API",
  "connectServices1.apiKeyForm.dateInvalid": "Chọn ngày hợp lệ",
  "connectServices1.apiKeyForm.dateFuture": "Ngày hết hạn phải ở tương lai",

  "connectServices1.gpt.what": "Nó làm gì.",
  "connectServices1.gpt.whatBody":
    "Cuộc trò chuyện được chuyển tới ChatGPT sẽ chạy trên gói ChatGPT của bạn thay vì tín dụng AutoGPT. Mọi cuộc trò chuyện mới bắt đầu bằng kết nối bạn chọn trong Cài đặt, và bạn có thể đổi theo từng cuộc — không gì tự chuyển.",
  "connectServices1.gpt.cost": "Chi phí thế nào.",
  "connectServices1.gpt.costBody":
    "Mức dùng tính vào giới hạn của gói ChatGPT. Những lượt chạy đó không tốn tín dụng AutoGPT, và AutoGPT không cộng thêm phí.",
  "connectServices1.gpt.get": "Bạn nhận được gì.",
  "connectServices1.gpt.getBody":
    "Các model mà gói ChatGPT của bạn đã có, không tốn thêm phí từ AutoGPT.",
  "connectServices1.gpt.getBodyModels":
    "{models}, không tốn thêm phí từ AutoGPT.",
  "connectServices1.gpt.control": "Giữ quyền kiểm soát.",
  "connectServices1.gpt.controlBody":
    "Cuộc trò chuyện ở lại kết nối ban đầu, nên lượt chạy không tự chuyển sang tín dụng AutoGPT khi chưa hỏi. Ngắt kết nối bất cứ lúc nào trong Cài đặt.",

  "connectServices1.detail.back": "Quay lại danh sách dịch vụ",

  "connectServices1.tab.oauth": "OAuth",
  "connectServices1.tab.apiKey": "Khoá API",
  "connectServices1.tab.userPassword": "Người dùng / mật khẩu",
  "connectServices1.tab.host": "Máy chủ",
  "connectServices1.tab.deviceAuth": "Xác thực thiết bị",
  "connectServices1.tab.chatgpt": "ChatGPT",
  "connectServices1.tab.signInChatGpt": "Đăng nhập bằng ChatGPT",
  "connectServices1.tab.notWired":
    "Đăng nhập {method} cho {provider} chưa được nối trong hộp thoại này.",

  "connectServices1.mcpPreset.none": "Không đăng nhập",
  "connectServices1.mcpPreset.oauth": "Đăng nhập",
  "connectServices1.mcpPreset.bearer": "Token API",
  "connectServices1.mcpPreset.basic": "Xác thực cơ bản",
  "connectServices1.mcpPreset.docs": "Tài liệu chính thức",
  "connectServices1.mcpPreset.connectionMethod": "Cách kết nối",

  "connectServices1.mcpUrl.region": "Khu vực máy chủ",
  "connectServices1.mcpUrl.chooseRegion": "Chọn khu vực tài khoản của bạn",
  "connectServices1.mcpUrl.custom": "URL tuỳ chỉnh",
  "connectServices1.mcpUrl.serverUrl": "URL máy chủ",

  "connectServices1.mcp.enterUrl":
    "Nhập URL máy chủ từ hướng dẫn thiết lập của dịch vụ.",
  "connectServices1.mcp.allowChanges": "Cho phép thay đổi",
  "connectServices1.mcp.readOnly":
    "Không bật thì chỉ đọc được, không tạo hay sửa.",
  "connectServices1.mcp.useCredential":
    "Dùng thông tin xác thực mô tả trong hướng dẫn thiết lập ở trên.",
  "connectServices1.mcp.useApiCredential":
    "Chỉ dùng thông tin xác thực API nếu máy chủ hỗ trợ. Xem tài liệu của máy chủ để biết đúng loại xác thực.",
  "connectServices1.mcp.useApiToken": "Dùng token API thay thế",
  "connectServices1.mcp.tryOAuth": "Thử OAuth",
  "connectServices1.mcp.connect": "Kết nối",
  "connectServices1.mcp.saveToken": "Lưu token",
  "connectServices1.mcp.noOAuth":
    "Máy chủ này không hỗ trợ đăng nhập OAuth. Chọn cách gửi thông tin xác thực API.",
  "connectServices1.mcp.signInUnavailable":
    "Kết nối này không đăng nhập được. Kiểm tra hướng dẫn thiết lập và thử lại.",
  "connectServices1.mcp.timedOut":
    "Đăng nhập OAuth quá thời gian. Vui lòng thử lại.",
  "connectServices1.mcp.basicUnsupported":
    "Kết nối này không hỗ trợ xác thực cơ bản.",
  "connectServices1.mcp.bearerUnsupported":
    "Kết nối này không hỗ trợ token Bearer.",

  "connectServices1.mcpFirst.moreWays": "Cách kết nối khác",
  "connectServices1.mcpFirst.back": "Quay lại",

  "connectServices1.publicMCP.noAccount":
    "Máy chủ này dùng được mà không cần kết nối tài khoản.",
  "connectServices1.publicMCP.noTools":
    "Đã kết nối nhưng máy chủ không trả về công cụ nào.",
  "connectServices1.publicMCP.toolsOne": "1 công cụ khả dụng.",
  "connectServices1.publicMCP.tools": "{count} công cụ khả dụng.",
  "connectServices1.publicMCP.nothingSaved":
    "Dịch vụ này không cần đăng nhập nên không lưu gì. Thêm vào workflow hoặc nhờ expert dùng nó.",
  "connectServices1.publicMCP.checkConnection": "Kiểm tra kết nối",

  "connectServices1.unsupported.title": "Không có cách kết nối",
  "connectServices1.unsupported.bodyDefault":
    "{provider} hiện chưa có luồng kết nối quản lý được từ cài đặt. Thêm một block dùng {provider} để bật.",

  "connectServices1.oauth.popupBlocked": "Popup bị chặn",
  "connectServices1.oauth.connected": "Đã kết nối qua OAuth",
  "connectServices1.oauth.failed": "Kết nối OAuth thất bại",

  "connectServices1.error.generic": "Đã xảy ra lỗi. Vui lòng thử lại.",

  "connectServices1.list.searchPlaceholder": "Tìm dịch vụ...",
  "connectServices1.list.searchAria": "Tìm dịch vụ",
  "connectServices1.list.noMatch": "Không có dịch vụ khớp \"{query}\"",
  "connectServices1.list.noServices": "Không có dịch vụ nào",

  "connectServices1.row.setupRequired": "Cần thiết lập",
};
