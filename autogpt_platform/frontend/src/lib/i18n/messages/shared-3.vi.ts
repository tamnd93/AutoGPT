import { Shared3En } from "./shared-3.en";

export const Shared3Vi: Partial<Record<keyof typeof Shared3En, string>> = {
  "shared3.pagination.previous": "Trước",
  "shared3.pagination.next": "Tiếp",
  "shared3.pagination.page": "Trang {current} / {total}",

  "shared3.errorCard.title": "Đã xảy ra lỗi",
  "shared3.errorCard.unknown": "Lỗi không xác định",
  "shared3.errorCard.unknownShort": "Lỗi không xác định",
  "shared3.errorCard.http500":
    "Máy chủ gặp sự cố. Vui lòng thử lại sau vài phút.",
  "shared3.errorCard.http404":
    "Không tìm thấy tài nguyên. Kiểm tra URL và thử lại.",
  "shared3.errorCard.http403":
    "Bạn không có quyền truy cập tài nguyên này. Kiểm tra quyền hoặc đăng nhập lại.",
  "shared3.errorCard.http429":
    "Có quá nhiều yêu cầu. Vui lòng chờ một chút rồi thử lại.",
  "shared3.errorCard.http400":
    "Không xử lý được yêu cầu. Kiểm tra dữ liệu nhập và thử lại.",
  "shared3.errorCard.unexpected":
    "Đã xảy ra lỗi không mong muốn. Đội ngũ của chúng tôi đã được thông báo và đang khắc phục.",
  "shared3.errorCard.reportSuccess": "Đã báo lỗi",
  "shared3.errorCard.reportSuccessBody":
    "Cảm ơn bạn đã giúp cải thiện sản phẩm! Đội ngũ đã được thông báo.",
  "shared3.errorCard.reportFailed": "Không báo được lỗi",
  "shared3.errorCard.reportFailedBody":
    "Vui lòng thử lại hoặc liên hệ hỗ trợ trực tiếp.",

  "shared3.tooltip.moreInfo": "Xem thêm thông tin",

  "shared3.runStatus.completed": "Hoàn thành",
  "shared3.runStatus.failed": "Thất bại",
  "shared3.runStatus.running": "Đang chạy",
  "shared3.runStatus.queued": "Đang xếp hàng",
  "shared3.runStatus.waitingForReview": "Chờ duyệt",
  "shared3.runStatus.stopped": "Đã dừng",
  "shared3.runStatus.incomplete": "Chưa hoàn đủ",

  "shared3.searchInput.placeholder": "Tìm kiếm",
  "shared3.searchInput.searching": "Đang tìm",
  "shared3.searchInput.clear": "Xoá tìm kiếm",  "shared3.sheet.close": "Đóng",
  "shared3.scrollArea.scrollToTop": "Cuộn lên đầu",
  "shared3.multiSelect.removeOption": "Xoá tuỳ chọn {item}",
  "shared3.multiSelect.removeRole": "nút xoá tuỳ chọn",
  "shared3.avatarStatus.idle": "Đang rảnh",
  "shared3.avatarStatus.idleHint": "không có việc nào đang chạy",
  "shared3.avatarStatus.thinking": "Đang nghĩ",
  "shared3.avatarStatus.thinkingHint": "đang xác định việc cần làm",
  "shared3.avatarStatus.working": "Đang làm",
  "shared3.avatarStatus.workingHint": "một lượt chạy đang diễn ra",
  "shared3.avatarStatus.waiting": "Cần bạn",
  "shared3.avatarStatus.waitingHint": "đang bị chặn, cần hỏi",
  "shared3.avatarStatus.done": "Xong",
  "shared3.avatarStatus.doneHint": "đã xong việc gần nhất",
  "shared3.avatarStatus.failed": "Thất bại",
  "shared3.avatarStatus.failedHint": "lượt chạy gần nhất bị lỗi",
  "shared3.avatarStatus.sleeping": "Tạm dừng",
  "shared3.avatarStatus.sleepingHint": "lịch chạy đang tắt",

};
