import { Errors4En } from "./errors-4.en";

export const Errors4Vi: Partial<Record<keyof typeof Errors4En, string>> = {
  "errors4.pendingReviews.empty": "Chưa có mục chờ duyệt",
  "errors4.pendingReviews.noReviewsTitle": "Không có mục nào để xử lý",
  "errors4.pendingReviews.noReviewsBody": "Không tìm thấy mục nào để xử lý.",
  "errors4.pendingReviews.failedTitle": "Không xử lý được các mục chờ duyệt",
  "errors4.pendingReviews.unexpectedResponse": "Phản hồi bất thường từ máy chủ",
  "errors4.pendingReviews.partialTitle": "Chỉ xử lý được một phần",
  "errors4.pendingReviews.partialBody":
    "{succeeded} thành công, {failed} thất bại. {error}",
  "errors4.pendingReviews.partialFallback": "Một số mục không xử lý được.",
  "errors4.pendingReviews.successTitle": "Đã xử lý xong các mục chờ duyệt",
  "errors4.pendingReviews.successBody":
    "{approved} đã duyệt, {rejected} đã từ chối",
  "errors4.pendingReviews.invalidJsonTitle": "JSON không hợp lệ",
  "errors4.pendingReviews.invalidJsonBody":
    "Hãy sửa định dạng JSON của mục {node}: {error}",
  "errors4.pendingReviews.invalidSyntax": "Cú pháp không hợp lệ",
  "errors4.pendingReviews.errorOccurred": "Đã có lỗi xảy ra",
  "errors4.pendingReviews.emptyHint":
    "Khi workflow có các bước cần con người duyệt, chúng sẽ hiện ở đây để bạn xem và phê duyệt.",
  "errors4.pendingReviews.neededTitle": "Cần bạn xem xét",
  "errors4.pendingReviews.waitingGate":
    "Otto đang chờ bạn phê duyệt trước hành động bên dưới.",
  "errors4.pendingReviews.waitingWorkflow":
    "Workflow này tạm dừng cho tới khi bạn phê duyệt bước bên dưới. Hãy xem việc nó sẽ làm và sửa nếu cần.",
  "errors4.pendingReviews.reviewFallback": "Xem xét",
  "errors4.json.label": "Giá trị",
  "errors4.json.placeholder": "Sửa dữ liệu JSON",
  "errors4.package.changes": "Thay đổi tệp trong gói",
  "errors4.message.openExternalTitle": "Mở liên kết ngoài",
  "errors4.message.externalBody": "Bạn sắp truy cập một trang web bên ngoài:",
  "errors4.message.openLink": "Mở liên kết",
  "errors4.common.cancel": "Huỷ",
  "errors4.files.select": "Chọn {name}",
  "errors4.files.preview": "Xem trước {name}",
  "errors4.files.rename": "Đổi tên {name}",
  "errors4.files.open": "Mở {name}",
  "errors4.expert.from": "Từ {expert}",
  "errors4.library.editFolder": "Sửa thư mục",
  "errors4.library.deleteFolder": "Xoá thư mục",
  "errors4.library.noFavorites": "Chưa có workflow yêu thích nào",
  "errors4.library.uploadWorkflow": "Tải workflow lên",
  "errors4.library.invalidFileTitle": "Tệp workflow không hợp lệ",
  "errors4.library.invalidFileBody":
    "Hãy tải lên tệp agent.json hợp lệ đã xuất từ nền tảng AutoGPT. Tệp phải có các trường bắt buộc: name, description, nodes và links.",
  "errors4.library.fileRequired": "Cần chọn tệp workflow",
  "errors4.library.nameRequired": "Cần nhập tên workflow",
  "errors4.library.briefingTitle": "Tóm tắt workflow",
  "errors4.sitrep.waitingForTrigger": "Đang chờ sự kiện kích hoạt",
  "errors4.sitrep.executionFailed": "Lần chạy thất bại",
  "errors4.sitrep.completedWithErrors":
    "Hoàn thành nhưng có lỗi: {failedSteps}",
  "errors4.sitrep.completedSuccessfully": "Hoàn thành thành công",
  "errors4.import.invalidUrl":
    "URL không hợp lệ hoặc chưa được hỗ trợ. Nhập từ URL chỉ hỗ trợ mẫu workflow trên n8n.io (ví dụ https://n8n.io/workflows/1234). Với nền tảng khác, hãy tải tệp lên.",
  "errors4.import.fetchFailed": "Không tải được workflow.",
  "errors4.build.savingWorkflow": "Đang lưu workflow",
  "errors4.build.loadingFlow": "Đang tải workflow",
  "errors4.build.savingHint": "Vui lòng chờ trong khi lưu workflow...",
  "errors4.build.loadingHint": "Vui lòng chờ trong khi tải workflow...",
  "errors4.build.unexpectedError": "Đã có lỗi không mong muốn.",
  "errors4.budget.five": "$5 / tuần",
  "errors4.budget.ten": "$10 / tuần",
  "errors4.budget.noLimit": "Không giới hạn tuần",
};
