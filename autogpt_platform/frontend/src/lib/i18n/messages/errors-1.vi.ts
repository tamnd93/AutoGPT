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
};
