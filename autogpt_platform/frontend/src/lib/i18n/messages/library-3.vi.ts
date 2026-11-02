import { library3En } from "./library-3.en";

export const library3Vi: Partial<Record<keyof typeof library3En, string>> = {
  "library3.actions.more": "Hành động khác",

  "library3.scheduleActions.running": "Đang chạy...",
  "library3.scheduleActions.runNow": "Chạy ngay",
  "library3.scheduleActions.delete": "Xoá lịch chạy",

  "library3.taskActions.saveAsTemplate": "Lưu thành template",
  "library3.taskActions.delete": "Xoá tác vụ",

  "library3.editSchedule.repeatDaily": "Hằng ngày",
  "library3.editSchedule.repeatWeekly": "Hằng tuần",
  "library3.editSchedule.daySun": "CN",
  "library3.editSchedule.dayMon": "T2",
  "library3.editSchedule.dayTue": "T3",
  "library3.editSchedule.dayWed": "T4",
  "library3.editSchedule.dayThu": "T5",
  "library3.editSchedule.dayFri": "T6",
  "library3.editSchedule.daySat": "T7",
  "library3.editSchedule.updateFailed": "Cập nhật lịch chạy thất bại",
  "library3.editSchedule.pickOneDay": "Chọn ít nhất một ngày",

  "library3.common.name": "Tên",
  "library3.common.description": "Mô tả",
  "library3.common.yourInput": "Đầu vào của bạn",
  "library3.common.taskCredentials": "Thông tin xác thực của tác vụ",
  "library3.common.saveChanges": "Lưu thay đổi",
  "library3.common.delete": "Xoá",
  "library3.common.notFound": "Không tìm thấy",
  "library3.common.noDescription": "Không có mô tả.",
  "library3.common.error": "Lỗi",
  "library3.common.openInBuilder": "Mở trong builder",

  "library3.sidebar.tasksTab": "Tác vụ",
  "library3.sidebar.scheduledTab": "Đã đặt lịch",
  "library3.sidebar.triggersTab": "Trigger",
  "library3.sidebar.templatesTab": "Template",
  "library3.sidebar.noScheduled": "Chưa có workflow nào được đặt lịch",
  "library3.sidebar.webhookTriggers": "Trigger webhook",
  "library3.sidebar.triggerWorkflows": "Workflow trigger",
  "library3.sidebar.noTriggers": "Chưa thiết lập trigger nào",
  "library3.sidebar.noTriggersHint":
    'Nhờ một expert thiết lập trigger cho workflow này (ví dụ: "chạy khi có email mới").',
  "library3.sidebar.noTemplates": "Chưa lưu template nào",

  "library3.scheduleActions.viewDetails": "Xem chi tiết tác vụ đã đặt lịch",
  "library3.scheduleActions.notLoaded": "Lịch chạy chưa được tải",
  "library3.scheduleActions.waitForLoad": "Vui lòng chờ lịch chạy tải xong.",

  "library3.templateView.loadFailed": "Không tải được template",
  "library3.templateView.trigger": "Trigger",
  "library3.templateView.template": "Template",
  "library3.templateView.details": "Chi tiết {kind}",
  "library3.templateView.namePlaceholder": "Nhập tên {kind}",
  "library3.templateView.descriptionPlaceholder": "Nhập mô tả {kind}",
  "library3.templateView.updated": "Đã cập nhật template",
  "library3.templateView.updateFailed": "Cập nhật template thất bại",
  "library3.templateView.started": "Đã bắt đầu tác vụ",
  "library3.templateView.startFailed": "Bắt đầu tác vụ thất bại",

  "library3.templateActions.deleted": "Đã xoá template",
  "library3.templateActions.deleteFailed": "Xoá template thất bại",
  "library3.templateActions.start": "Bắt đầu tác vụ từ template",
  "library3.templateActions.delete": "Xoá template",
  "library3.templateActions.deleteBody":
    "Bạn có chắc muốn xoá template này? Không thể hoàn tác hành động này.",

  "library3.triggerAgent.loadFailed": "Không tải được dữ liệu trigger",
  "library3.triggerAgent.notFoundBody":
    "Workflow trigger này không còn tồn tại.",
  "library3.triggerAgent.descriptionNote":
    "Workflow trigger chạy theo lịch và thực thi workflow này khi thoả điều kiện. Chỉnh sửa trong builder để đổi hành vi.",
  "library3.triggerAgent.versionWarn":
    "Lịch chạy này đang dùng phiên bản {current} của workflow trigger, nhưng phiên bản mới nhất là {latest}. Nhờ expert tạo lại lịch chạy để nhận các thay đổi mới nhất.",
  "library3.triggerAgent.noSchedule": "Workflow trigger này chưa có lịch chạy.",
  "library3.triggerAgent.viewInLibrary": "Xem trong thư viện",
  "library3.triggerAgent.remove": "Xoá trigger",

  "library3.triggerView.loadFailed": "Không tải được trigger",
  "library3.triggerView.details": "Chi tiết trigger",
  "library3.triggerView.namePlaceholder": "Nhập tên trigger",
  "library3.triggerView.descriptionPlaceholder": "Nhập mô tả trigger",
  "library3.triggerView.updated": "Đã cập nhật trigger",
  "library3.triggerView.updateFailed": "Cập nhật trigger thất bại",

  "library3.triggerActions.deleted": "Đã xoá trigger",
  "library3.triggerActions.deleteFailed": "Xoá trigger thất bại",
  "library3.triggerActions.delete": "Xoá trigger",
  "library3.triggerActions.deleteBody":
    "Bạn có chắc muốn xoá trigger này? Không thể hoàn tác hành động này.",

  "library3.share.title": "Chia sẻ lượt chạy workflow",
  "library3.share.aria": "Chia sẻ kết quả",
  "library3.share.sharedBody":
    "Lượt chạy workflow của bạn đang được chia sẻ. Ai có liên kết đều xem được kết quả.",
  "library3.share.generateBody":
    "Tạo liên kết công khai để chia sẻ kết quả lượt chạy này với người khác.",
  "library3.share.warning":
    "Khi bật chia sẻ, kết quả của lượt chạy này sẽ công khai với mọi người có liên kết. Trang sẽ có chỉ thị noindex để hạn chế công cụ tìm kiếm thu thập, nhưng không thể đảm bảo.",
  "library3.share.enable": "Bật chia sẻ",
  "library3.share.url": "URL chia sẻ",
  "library3.share.publicNote":
    "Liên kết này công khai. Chỉ chia sẻ với người bạn tin tưởng. Trang được chia sẻ có chỉ thị noindex để hạn chế công cụ tìm kiếm.",
  "library3.share.stop": "Dừng chia sẻ",
  "library3.share.enabledTitle": "Đã bật chia sẻ",
  "library3.share.enabledBody":
    "Lượt chạy workflow của bạn hiện công khai qua liên kết chia sẻ.",
  "library3.share.enableFailed": "Bật chia sẻ thất bại. Vui lòng thử lại.",
  "library3.share.disabledTitle": "Đã tắt chia sẻ",
  "library3.share.disabledBody": "Liên kết chia sẻ không còn truy cập được.",
  "library3.share.disableFailed": "Tắt chia sẻ thất bại. Vui lòng thử lại.",
  "library3.share.copiedTitle": "Đã sao chép!",
  "library3.share.copiedBody": "Đã sao chép liên kết chia sẻ.",
  "library3.share.copyFailed": "Sao chép liên kết thất bại. Vui lòng thử lại.",
};
