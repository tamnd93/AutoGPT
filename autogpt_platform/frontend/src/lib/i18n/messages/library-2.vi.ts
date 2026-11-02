import { library2En } from "./library-2.en";

export const library2Vi: Partial<Record<keyof typeof library2En, string>> = {
  "library2.emptySchedules.title": "Chưa có lịch chạy nào",
  "library2.emptySchedules.body":
    "Tạo một lượt chạy mới, bạn sẽ có tuỳ chọn đặt lịch để workflow tự động chạy.",

  "library2.emptyTemplates.title": "Chưa có template nào",
  "library2.emptyTemplates.body":
    "Tạo một tác vụ trước, rồi lưu làm template để dùng lại sau — template sẽ hiện ở đây.",

  "library2.emptyTriggers.title": "Chưa có trigger nào",
  "library2.emptyTriggers.body":
    "Thiết lập trigger tự động để workflow tự chạy tác vụ — trigger sẽ hiện ở đây.",

  "library2.triggerNotFound.title": "Không tìm thấy trigger",
  "library2.triggerNotFound.body":
    "Trigger này không tồn tại hoặc không còn khả dụng.",
  "library2.triggerNotFound.clearSelection": "Bỏ chọn",

  "library2.loading.content": "Đang tải nội dung",

  "library2.createTemplate.title": "Tạo template",
  "library2.createTemplate.body":
    "Lưu tác vụ này thành template để dùng lại sau với cùng đầu vào và thông tin xác thực.",
  "library2.createTemplate.name": "Tên",
  "library2.createTemplate.namePlaceholder": "Nhập tên template",
  "library2.createTemplate.description": "Mô tả",
  "library2.createTemplate.descriptionPlaceholder": "Mô tả không bắt buộc",
  "library2.createTemplate.cancel": "Huỷ",
  "library2.createTemplate.submit": "Tạo template",

  "library2.schedule.deleteButton": "Xoá lịch chạy",
  "library2.schedule.deleted": "Đã xoá lịch chạy",
  "library2.schedule.deleteFailed": "Xoá lịch chạy thất bại",
  "library2.schedule.created": "Đã tạo lịch chạy",
  "library2.schedule.createFailed": "❌ Tạo lịch chạy thất bại",
  "library2.schedule.nameRequired": "⚠️ Cần đặt tên lịch chạy",
  "library2.schedule.nameRequiredBody": "Hãy đặt tên cho lịch chạy của bạn.",

  "library2.common.unexpectedError": "Đã xảy ra lỗi không mong muốn.",
  "library2.common.cancel": "Huỷ",

  "library2.timezone.none": "Chưa đặt múi giờ. Lịch chạy sẽ dùng UTC.",
  "library2.timezone.setLink": "Đặt múi giờ của bạn",
  "library2.timezone.inYour": "Lịch chạy sẽ dùng múi giờ của bạn:",

  "library2.emptyTasks.workflowDeleted": "Đã xoá workflow",
  "library2.emptyTasks.workflowDeleteFailed": "Xoá workflow thất bại",
  "library2.emptyTasks.workflowExported": "Đã xuất workflow",
  "library2.emptyTasks.workflowExportFailed": "Xuất workflow thất bại",
  "library2.emptyTasks.ready": "Sẵn sàng bắt đầu?",
  "library2.emptyTasks.runHint":
    "Chạy workflow của bạn và không gian này sẽ hiển thị hoạt động của workflow",
  "library2.emptyTasks.setupTask": "Thiết lập tác vụ của bạn",
  "library2.emptyTasks.about": "Về workflow này",
  "library2.emptyTasks.by": "bởi {creator}",
  "library2.emptyTasks.unpublished":
    'Workflow này chưa được xuất bản. Khi đã xuất bản, bạn có thể đăng workflow bằng cách bấm nút "Publish" trong trình chỉnh sửa workflow.',
  "library2.emptyTasks.createdOn": "Workflow được tạo ngày",
  "library2.emptyTasks.updatedOn": "Workflow được cập nhật ngày",
  "library2.emptyTasks.edit": "Chỉnh sửa workflow",
  "library2.emptyTasks.export": "Xuất workflow ra tệp",
  "library2.emptyTasks.delete": "Xoá workflow",
  "library2.emptyTasks.deleteTitle": "Xoá workflow",
  "library2.emptyTasks.deleteBody":
    "Bạn có chắc muốn xoá workflow này? Không thể hoàn tác hành động này.",
  "library2.emptyTasks.deleteConfirm": "Xoá workflow",

  "library2.banners.updateAvailable": "Có bản cập nhật",
  "library2.banners.updateBody":
    "Bạn nên cập nhật workflow để nhận kết quả mới nhất / tốt nhất",
  "library2.banners.updating": "Đang cập nhật...",
  "library2.banners.update": "Cập nhật workflow",
  "library2.banners.unpublished": "Thay đổi chưa xuất bản",
  "library2.banners.unpublishedBody":
    "Bạn đã thay đổi workflow này nhưng chưa xuất bản. Bạn có muốn xuất bản phiên bản mới nhất không?",
  "library2.banners.publish": "Xuất bản thay đổi",

  "library2.runStatus.completedWithErrors": "Hoàn tất với lỗi",
  "library2.failures.runFailed": "Lượt chạy này đã thất bại",
  "library2.failures.outputIncomplete":
    "Lượt chạy vẫn kết thúc nên đầu ra có thể chưa đầy đủ.",
  "library2.failures.unknownStep": "Bước không xác định",

  "library2.runDetail.simulated": "Mô phỏng",
  "library2.runDetail.scheduled": "Đã đặt lịch",
  "library2.runDetail.started": "Bắt đầu",
  "library2.runDetail.version": "Phiên bản: {version}",
  "library2.runDetail.steps": "Số bước: {count}",
  "library2.runDetail.duration": "Thời lượng: {duration}",
  "library2.runDetail.cost": "Chi phí: ${cost}",

  "library2.outputs.empty": "Lượt chạy này không có đầu ra.",

  "library2.summary.successEstimate": "Ước tính thành công:",
  "library2.summary.tooltip":
    "Đánh giá do AI tạo về mức độ hoàn thành mục tiêu của lượt chạy này. Điểm số cho biết",
  "library2.summary.suffixHigh": " workflow đã rất thành công.",
  "library2.summary.suffixMostly":
    " workflow chủ yếu thành công với vài vấn đề nhỏ.",
  "library2.summary.suffixPartial":
    " workflow thành công một phần với vài thiếu sót.",
  "library2.summary.suffixLimited":
    " workflow ít thành công và có vấn đề đáng kể.",

  "library2.runActions.rerun": "Chạy lại tác vụ",
  "library2.runActions.stop": "Dừng tác vụ",
  "library2.runActions.viewDetails": "Xem chi tiết tác vụ",
  "library2.runActions.saveAsTemplate": "Lưu tác vụ thành template",
  "library2.runActions.createTemplate": "Tạo template",
  "library2.runActions.toast.stopped": "Đã dừng lượt chạy",
  "library2.runActions.toast.stopFailed": "Dừng lượt chạy thất bại",
  "library2.runActions.toast.runNotFound": "Không tìm thấy lượt chạy",
  "library2.runActions.toast.started": "Đã bắt đầu lượt chạy",
  "library2.runActions.toast.startFailed": "Bắt đầu lượt chạy thất bại",
  "library2.runActions.toast.missingRunTemplate":
    "Không thể tạo template từ lượt chạy không tồn tại",
  "library2.runActions.toast.templateCreated": "Đã tạo template",
  "library2.runActions.toast.templateFailed": "Tạo template thất bại",

  "library2.webhook.title": "Trạng thái trigger",
  "library2.webhook.statusLabel": "Trạng thái",
  "library2.webhook.active": "Đang hoạt động",
  "library2.webhook.inactive": "Không hoạt động",
  "library2.webhook.broken": "Bị lỗi",
  "library2.webhook.notAttached":
    'Trigger này chưa gắn với webhook. Dùng "Set up trigger" để sửa.',
  "library2.webhook.ready":
    "Trigger này đã sẵn sàng. Dùng Webhook URL bên dưới để thiết lập kết nối trigger với dịch vụ bạn chọn.",
  "library2.webhook.urlLabel": "Webhook URL:",
  "library2.webhook.copyUrl": "Sao chép Webhook URL",
  "library2.webhook.workflowTriggerReady":
    "Trigger của workflow này đã sẵn sàng. Khi nhận trigger, workflow sẽ chạy với thiết lập đã cung cấp.",
  "library2.webhook.workflowTriggerDisabled":
    "Trigger của workflow này đang tắt. Nó sẽ không phản hồi trigger cho tới khi bạn bật lại.",

  "library2.scheduleView.loadFailed": "Không tải được lịch chạy",
  "library2.scheduleView.schedule": "Lịch chạy",
  "library2.scheduleView.name": "Tên",
  "library2.scheduleView.recurrence": "Chu kỳ lặp",
  "library2.scheduleView.nextRun": "Lượt chạy tiếp theo",
  "library2.scheduleView.yourInput": "Đầu vào của bạn",

  "library2.editSchedule.title": "Chỉnh sửa lịch chạy",
  "library2.editSchedule.editButton": "Chỉnh sửa lịch chạy",
  "library2.editSchedule.name": "Tên",
  "library2.editSchedule.repeats": "Lặp lại",
  "library2.editSchedule.selectDays": "Chọn ngày",
  "library2.editSchedule.at": "Lúc",
  "library2.editSchedule.timingLocked":
    "Lặp lại {recurrence}. Không thể đổi thời điểm ở đây, nên lưu chỉ đổi tên lịch chạy.",
  "library2.editSchedule.saving": "Đang lưu…",
  "library2.editSchedule.save": "Lưu",

  "library2.runView.reviewsTab": "Đánh giá ({count})",
  "library2.runView.summary": "Tóm tắt",
  "library2.runView.output": "Đầu ra",
  "library2.runView.yourInput": "Đầu vào của bạn",
  "library2.runView.noPendingReviews":
    "Không có đánh giá nào đang chờ cho lượt chạy này",
  "library2.runView.summaryTooltip":
    "Bản tóm tắt do AI tạo mô tả cách workflow xử lý tác vụ của bạn. Đây là tính năng thử nghiệm và có thể đôi khi không chính xác.",
  "library2.runView.inputTooltip":
    "Đây là đầu vào đã cung cấp cho workflow khi chạy tác vụ này.",

  "library2.actionsDropdown.more": "Thao tác khác",
  "library2.actionsDropdown.deleteThisTask": "Xoá tác vụ này",
  "library2.actionsDropdown.taskDeleted": "Đã xoá tác vụ",
  "library2.actionsDropdown.taskDeleteFailed": "Xoá tác vụ thất bại",
  "library2.actionsDropdown.deleteTaskTitle": "Xoá tác vụ",
  "library2.actionsDropdown.deleteTaskBody":
    "Bạn có chắc muốn xoá tác vụ này? Không thể hoàn tác hành động này.",
  "library2.actionsDropdown.deleteTaskConfirm": "Xoá tác vụ",
  "library2.actionsDropdown.deleteScheduleTitle": "Xoá lịch chạy",
  "library2.actionsDropdown.deleteScheduleBody":
    "Bạn có chắc muốn xoá lịch chạy này? Không thể hoàn tác hành động này.",
  "library2.actionsDropdown.deleteScheduleConfirm": "Xoá lịch chạy",
};
