import { build1En } from "./build-1.en";

export const build1Vi: Partial<Record<keyof typeof build1En, string>> = {
  "build1.publish.tooltip": "Đăng lên Marketplace",

  "build1.intro.title": "Tự tạo workflow của riêng bạn.",
  "build1.intro.body":
    "Nối các block thành workflow chạy đúng ý bạn — hoặc để Otto xây dựng.",
  "build1.intro.cta": "Nhờ Otto xây dựng",
  "build1.intro.altAction": "Học cách tự xây dựng",

  "build1.outputs.defaultName": "Đầu ra",
  "build1.outputs.description": "Đầu ra từ workflow",
  "build1.outputs.header": "Đầu ra workflow",
  "build1.outputs.unnamed": "Đầu ra chưa đặt tên",
  "build1.outputs.none": "Không có block đầu ra nào.",

  "build1.cron.nameLabel": "Tên lịch chạy",
  "build1.cron.namePlaceholder": "Nhập tên lịch chạy",
  "build1.cron.creating": "Đang tạo lịch chạy...",
  "build1.cron.done": "Xong",
  "build1.cron.created": "Đã tạo lịch chạy",
  "build1.cron.createdBody": "Tạo lịch chạy thành công",
  "build1.cron.failed": "Tạo lịch chạy thất bại",
  "build1.cron.nameRequiredError": "Cần nhập tên lịch chạy",
  "build1.cron.invalid": "Lịch chạy không hợp lệ",
  "build1.cron.nameRequiredBody": "Vui lòng nhập tên lịch chạy",
  "build1.cron.cronInvalid": "Vui lòng nhập biểu thức cron hợp lệ",

  "build1.run.validationFailed": "Kiểm tra workflow thất bại",
  "build1.run.fixValidation":
    "Vui lòng sửa lỗi ở các node được đánh dấu và thử lại.",
  "build1.runInput.runTitle": "Chạy workflow",
  "build1.runInput.scheduleTitle": "Đặt lịch chạy",
  "build1.runInput.errorRunning": "Lỗi khi chạy workflow",
  "build1.schedule.title": "Đặt lịch workflow",

  "build1.chat.startFailed": "Không bắt đầu được chat builder",
  "build1.chat.blankFailed": "Không tạo được workflow trống",
  "build1.chat.checkFailed": "Không kiểm tra được kết nối AI",
  "build1.chat.placeholder": "Yêu cầu builder sửa hoặc chạy workflow này…",
  "build1.chat.startFailedBody": "Vui lòng thử lại hoặc đóng rồi mở lại chat.",
  "build1.chat.tryAgain": "Vui lòng thử lại.",
  "build1.chat.reverted": "Đã quay lại phiên bản trước",
  "build1.chat.revertedBody": "Đang xem phiên bản {version}.",
  "build1.chat.revertFailed": "Quay lại thất bại",

  "build1.noModel.aria": "Chưa có kết nối AI",
  "build1.noModel.body":
    "Chưa kết nối model AI nào nên chat builder chưa trả lời được. Người vận hành server có thể thêm API key model hoặc dùng model chạy cục bộ",
  "build1.noModel.setupGuide": "(hướng dẫn cài đặt)",

  "build1.panelHeader.revertToVersion": "Quay lại phiên bản {version}",
  "build1.panelHeader.revertPrev": "Quay lại phiên bản trước",
  "build1.panelHeader.revertTooltip":
    "Quay lại phiên bản workflow đang dùng trước lần sửa gần nhất",

  "build1.draft.block": "khối",
  "build1.draft.blocks": "khối",
  "build1.draft.connections": "kết nối",
  "build1.draft.restore": "Khôi phục thay đổi",
  "build1.draft.discard": "Bỏ thay đổi",

  "build1.safeMode.on": "BẬT",
  "build1.safeMode.off": "TẮT",
  "build1.safeMode.hitlLabel": "Phê duyệt block human-in-the-loop",
  "build1.safeMode.hitlEnabled":
    "Workflow sẽ dừng ở các block human-in-the-loop và chờ bạn duyệt",
  "build1.safeMode.hitlDisabled":
    "Các block human-in-the-loop sẽ tự động tiếp tục",
  "build1.safeMode.sensitiveLabel": "Phê duyệt block hành động nhạy cảm",
  "build1.safeMode.sensitiveEnabled":
    "Workflow sẽ dừng ở các block hành động nhạy cảm và chờ bạn duyệt",
  "build1.safeMode.sensitiveDisabled":
    "Các block hành động nhạy cảm sẽ tự động tiếp tục",

  "build1.controls.zoomIn": "Phóng to",
  "build1.controls.zoomOut": "Thu nhỏ",
  "build1.controls.loadingTutorial": "Đang tải hướng dẫn...",
  "build1.controls.startTutorial": "Bắt đầu hướng dẫn",
  "build1.controls.fitView": "Vừa khung",
  "build1.controls.readOnlyLock": "Canvas bị khoá vì đây là workflow chỉ đọc",
  "build1.controls.toggleLock": "Bật/tắt khoá",

  "build1.triggerBanner.title": "Bạn đang xây dựng workflow trigger",
  "build1.triggerBanner.body":
    "Workflow của bạn sẽ lắng nghe trigger và chạy khi đến thời điểm.",
  "build1.triggerBanner.library": "Thư viện workflow",

  "build1.copyPaste.copied": "Đã sao chép",
  "build1.copyPaste.copiedBody": "{count} node đã được sao chép",
  "build1.draft.connection": "kết nối",
  "build1.panelHeader.title": "Chat với Builder",
  "build1.panelHeader.revert": "Hoàn tác",
  "build1.panelHeader.close": "Đóng",
  "build1.panelHeader.chatPanelAria": "Bảng chat của trình tạo workflow",
  "build1.output.infoAria": "Thông tin",
};
