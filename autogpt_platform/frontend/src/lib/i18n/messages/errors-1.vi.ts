import { errors1En } from "./errors-1.en";

export const errors1Vi: Partial<Record<keyof typeof errors1En, string>> = {
  "errors1.error.userCreation.message":
    "Không tạo được tài khoản người dùng của bạn trong hệ thống. Có thể do sự cố máy chủ tạm thời hoặc vấn đề với việc thiết lập tài khoản.",
  "errors1.error.userCreation.context": "tạo tài khoản người dùng",
  "errors1.error.authToken.message":
    "Token xác thực của bạn bị thiếu hoặc không hợp lệ. Hãy thử đăng nhập lại.",
  "errors1.error.authToken.context": "token xác thực",
  "errors1.error.server.message":
    "Máy chủ của chúng tôi đang gặp sự cố. Hãy thử lại sau vài phút, hoặc liên hệ hỗ trợ nếu vẫn lỗi.",
  "errors1.error.server.context": "lỗi máy chủ",
  "errors1.error.rateLimited.message":
    "Đã có quá nhiều yêu cầu. Hãy chờ một lát rồi thử lại.",
  "errors1.error.rateLimited.context": "giới hạn tần suất",
  "errors1.error.network.message":
    "Không kết nối được tới máy chủ. Hãy kiểm tra kết nối internet và thử lại.",
  "errors1.error.network.context": "kết nối mạng",
  "errors1.error.authFailed.message":
    "Xác thực thất bại. Hãy thử đăng nhập lại.",
  "errors1.error.authFailed.context": "xác thực",
  "errors1.error.sessionExpired.message":
    "Phiên của bạn đã hết hạn. Hãy đăng nhập lại để tiếp tục.",
  "errors1.error.sessionExpired.context": "phiên",
  "errors1.error.unexpected.message":
    "Đã xảy ra lỗi không mong muốn. Hãy thử lại hoặc liên hệ hỗ trợ nếu vẫn lỗi.",
  "errors1.error.unexpected.context": "ứng dụng",
  "errors1.error.loading": "Đang tải...",
  "errors1.appError.title": "Ối, đã có lỗi xảy ra!",
  "errors1.appError.body":
    "Xin lỗi, đã xảy ra lỗi không mong muốn. Hãy thử lại sau hoặc liên hệ hỗ trợ nếu vẫn lỗi.",
  "errors1.appError.retry": "Thử lại",
  "errors1.appError.home": "Về trang chủ",
  "errors1.unauthorized.title": "Không có quyền truy cập",
  "errors1.unauthorized.body": "Bạn không có quyền xem trang này.",
  "errors1.safeMode.hitlOnTitle": "Đã bật chế độ an toàn HITL",
  "errors1.safeMode.hitlOffTitle": "Đã tắt chế độ an toàn HITL",
  "errors1.safeMode.hitlOnDetail":
    "Khối human-in-the-loop sẽ cần được duyệt thủ công",
  "errors1.safeMode.hitlOffDetail": "Khối human-in-the-loop sẽ chạy tự động",
  "errors1.safeMode.sensitiveOnTitle":
    "Đã bật chế độ an toàn cho hành động nhạy cảm",
  "errors1.safeMode.sensitiveOffTitle":
    "Đã tắt chế độ an toàn cho hành động nhạy cảm",
  "errors1.safeMode.sensitiveOnDetail":
    "Khối hành động nhạy cảm sẽ cần được duyệt thủ công",
  "errors1.safeMode.sensitiveOffDetail":
    "Khối hành động nhạy cảm sẽ chạy tự động",
  "errors1.safeMode.notAvailableTitle": "Chế độ an toàn chưa khả dụng",
  "errors1.safeMode.notAvailableBody":
    "Để thiết lập chế độ an toàn, hãy lưu workflow này vào thư viện trước.",
  "errors1.safeMode.updateFailedTitle": "Không cập nhật được chế độ an toàn",
  "errors1.safeMode.unexpectedError": "Đã xảy ra lỗi không mong muốn.",
  "errors1.credits.checkoutFailed":
    "Chưa bắt đầu được thanh toán. Hãy thử lại sau.",
  "errors1.storeCategories.loading": "Đang tải danh mục…",
  "errors1.storeCategories.unavailable": "Danh mục không khả dụng",
  "errors1.storeCategories.select": "Chọn một danh mục",
  "errors1.apiKey.group.v2": "API v2",
  "errors1.apiKey.group.both": "API v1 và v2",
  "errors1.apiKey.group.v1": "Chỉ API v1 (ngừng hoạt động 01/02/2027)",
  "errors1.apiKey.scope.IDENTITY": "Xem ID người dùng, e-mail và múi giờ của bạn",
  "errors1.apiKey.scope.EXECUTE_GRAPH": "Chạy workflow của bạn",
  "errors1.apiKey.scope.READ_GRAPH": "Xem workflow và cấu hình của chúng",
  "errors1.apiKey.scope.WRITE_GRAPH": "Tạo và sửa workflow, đồng thời chọn phiên bản được chạy",
  "errors1.apiKey.scope.WRITE_LIBRARY": "Thêm, sắp xếp, fork và xoá workflow trong thư viện, kể cả lịch chạy và trigger",
  "errors1.apiKey.scope.EXECUTE_BLOCK": "Chạy từng block riêng lẻ",
  "errors1.apiKey.scope.READ_BLOCK": "Xem các block có sẵn",
  "errors1.apiKey.scope.READ_STORE": "Truy cập Marketplace",
  "errors1.apiKey.scope.WRITE_STORE": "Tạo, cập nhật và xoá bài đăng trên Marketplace",
  "errors1.apiKey.scope.READ_LIBRARY": "Xem workflow và thư mục trong thư viện của bạn",
  "errors1.apiKey.scope.RUN_AGENT": "Chạy workflow từ thư viện của bạn",
  "errors1.apiKey.scope.READ_RUN": "Xem chi tiết và lịch sử lượt chạy",
  "errors1.apiKey.scope.WRITE_RUN": "Dừng và xoá lượt chạy",
  "errors1.apiKey.scope.SHARE_RUN": "Chia sẻ và ngừng chia sẻ lượt chạy workflow",
  "errors1.apiKey.scope.READ_RUN_REVIEW": "Xem các lượt duyệt human-in-the-loop đang chờ",
  "errors1.apiKey.scope.WRITE_RUN_REVIEW": "Gửi phản hồi duyệt human-in-the-loop",
  "errors1.apiKey.scope.READ_SCHEDULE": "Xem lịch chạy của bạn",
  "errors1.apiKey.scope.WRITE_SCHEDULE": "Tạo và xoá lịch chạy",
  "errors1.apiKey.scope.READ_CREDITS": "Xem số dư credit, giao dịch, hoá đơn và gói đăng ký",
  "errors1.apiKey.scope.READ_FILES": "Liệt kê và tải tệp trong workspace",
  "errors1.apiKey.scope.WRITE_FILES": "Tải lên và xoá tệp trong workspace",
  "errors1.apiKey.scope.USE_TOOLS": "Tìm kiếm và tải trang web giúp bạn; lượt tìm kiếm được tính vào hạn mức sử dụng",
  "errors1.apiKey.scope.MANAGE_INTEGRATIONS": "Thiết lập tích hợp mới",
  "errors1.apiKey.scope.READ_INTEGRATIONS": "Xem các tích hợp đã kết nối",
  "errors1.apiKey.scope.DELETE_INTEGRATIONS": "Xoá các tích hợp đã kết nối",

};
