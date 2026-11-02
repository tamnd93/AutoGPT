import { library1En } from "./library-1.en";

export const library1Vi: Partial<Record<keyof typeof library1En, string>> = {
  "library1.view.myLibrary": "Thư viện của tôi",
  "library1.view.triggersError":
    "Không tải được trigger của workflow này. Kiểm tra kết nối và thử lại.",
  "library1.view.tasksHint": "Dùng Thử lại ở thanh bên để tải lại các tác vụ.",
  "library1.view.newTask": "Tác vụ workflow mới",

  "library1.changelog.title": "Lịch sử phiên bản - {name}",
  "library1.changelog.current": "Hiện tại",
  "library1.changelog.available": "Phiên bản có trên Marketplace",
  "library1.changelog.body":
    "Xem thay đổi và cập nhật giữa các phiên bản của workflow này.",
  "library1.changelog.empty": "Workflow này chưa có lịch sử phiên bản.",

  "library1.settings.title": "Cài đặt workflow",
  "library1.settings.hitl": "Phê duyệt human-in-the-loop",
  "library1.settings.hitlBody":
    "Workflow sẽ dừng ở các block human-in-the-loop và chờ bạn duyệt trước khi tiếp tục",
  "library1.settings.sensitive": "Phê duyệt hành động nhạy cảm",
  "library1.settings.sensitiveBody":
    "Workflow sẽ dừng ở các block hành động nhạy cảm và chờ bạn duyệt trước khi tiếp tục",

  "library1.inputsReadOnly.empty": "Lượt chạy này không có đầu vào.",

  "library1.safety.title": "Kiểm tra an toàn",
  "library1.safety.heading": "Đã bật kiểm tra an toàn",
  "library1.safety.body1":
    "Workflow do AI tạo có thể thực hiện hành động ảnh hưởng tới dữ liệu hoặc hệ thống bên ngoài của bạn.",
  "library1.safety.body2":
    "AutoGPT có kiểm tra an toàn để bạn luôn có cơ hội xem và duyệt các hành động nhạy cảm trước khi chúng xảy ra.",
  "library1.safety.gotIt": "Đã hiểu",

  "library1.header.newTask": "Tác vụ mới",
  "library1.header.by": "bởi {creator}",
  "library1.header.tip": "Mẹo",
  "library1.header.tipBody":
    "Để có kết quả tốt nhất, hãy chạy workflow này {schedule}.",
  "library1.header.instructions": "Hướng dẫn",

  "library1.runSection.triggerTitle": "Trigger của tác vụ",
  "library1.runSection.triggerSubtitle":
    "Thiết lập trigger để workflow tự động chạy tác vụ này",
  "library1.runSection.triggerName": "Tên trigger",
  "library1.runSection.triggerNameTooltip":
    "Tên của trigger bạn đang thiết lập",
  "library1.runSection.triggerNamePlaceholder": "Nhập tên trigger",
  "library1.runSection.triggerDescription": "Mô tả trigger",
  "library1.runSection.triggerDescriptionTooltip":
    "Mô tả của trigger bạn đang thiết lập",
  "library1.runSection.triggerDescriptionPlaceholder": "Nhập mô tả trigger",
  "library1.runSection.inputsTitle": "Đầu vào tác vụ",
  "library1.runSection.inputsSubtitle":
    "Nhập thông tin bạn muốn cung cấp cho workflow trong tác vụ này",
  "library1.runSection.credentialsTitle": "Thông tin xác thực tác vụ",
  "library1.runSection.credentialsSubtitle":
    "Đây là thông tin xác thực workflow dùng để thực hiện tác vụ này",

  "library1.actions.simulate": "Mô phỏng",
  "library1.actions.setTrigger": "Thiết lập Trigger",
  "library1.actions.startTask": "Bắt đầu tác vụ",

  "library1.webhook.title": "Trigger webhook",
  "library1.webhook.body":
    "Thao tác này tạo endpoint webhook tự động chạy workflow khi được kích hoạt bởi sự kiện bên ngoài.",

  "library1.error.unexpected": "Đã xảy ra lỗi không mong muốn.",
  "library1.error.validationFailed": "Kiểm tra dữ liệu thất bại",
  "library1.error.openBuilderNote":
    "Mở workflow trong builder và thử chạy ở đó để xem chi tiết.",
  "library1.error.openBuilder": "Mở trong builder",
  "library1.error.toastTitle": "Không chạy được workflow",
  "library1.error.fieldRequired": "Cần nhập {field}",
  "library1.error.credentialRequired": "Cần thông tin xác thực cho {field}",
  "library1.error.cronParts":
    "Biểu thức cron phải có đúng 5 phần: phút giờ ngày tháng thứ",
  "library1.error.cronHourly": "Mỗi giờ",
  "library1.error.cronDaily": "Hàng ngày lúc 9:00 SA",
  "library1.error.cronMonday": "Thứ Hai hàng tuần lúc 9:00 SA",
  "library1.error.cronWeekdays": "Các ngày trong tuần lúc 9:00 SA",
  "library1.error.cronMonthlyFirst": "Hàng tháng vào ngày 1 lúc 9:00 SA",

  "library1.modal.title": "Chạy workflow",
  "library1.modal.scheduleTask": "Lên lịch tác vụ",
  "library1.modal.schedulingHint":
    "Vui lòng thiết lập đủ đầu vào và thông tin xác thực trước khi lên lịch",

  "library1.toast.executionStarted": "Đã bắt đầu chạy workflow",
  "library1.toast.triggerComplete": "Đã thiết lập trigger",
  "library1.toast.triggerFailed": "❌ Thiết lập trigger thất bại",
  "library1.toast.missingInputs": "⚠️ Thiếu đầu vào bắt buộc",
  "library1.toast.provideFields": "Vui lòng cung cấp: {fields}",
  "library1.toast.triggerNameRequired": "⚠️ Cần tên trigger",
  "library1.toast.triggerNameBody": "Vui lòng đặt tên cho trigger của bạn.",
  "library1.toast.defaultTriggerDescription": "Trigger cho {name}",

  "library1.inputs.number": "Số",
  "library1.inputs.enterNumber": "Nhập số",
  "library1.inputs.text": "Văn bản",
  "library1.inputs.enterText": "Nhập văn bản",
  "library1.inputs.date": "Ngày",
  "library1.inputs.pickDate": "Chọn ngày",
  "library1.inputs.dateTime": "Ngày giờ",
  "library1.inputs.enterDateTime": "Nhập ngày và giờ",
  "library1.inputs.select": "Chọn",
  "library1.inputs.selectOption": "Chọn một tùy chọn",
  "library1.inputs.enterField": "Nhập {field}",

  "library1.schedule.title": "Lên lịch chạy",
  "library1.schedule.cancel": "Huỷ",
  "library1.schedule.schedule": "Lên lịch",
  "library1.schedule.name": "Tên lịch",
  "library1.schedule.namePlaceholder": "Nhập tên cho lịch này",
  "library1.schedule.recommendedNote":
    "💡 Workflow này có lịch đề xuất đã được điền sẵn bên dưới. Bạn có thể chỉnh lại nếu cần.",
  "library1.schedule.nameRequired": "Cần nhập tên lịch",
  "library1.schedule.timeFormat": "Dùng HH:MM (24h)",

  "library1.cron.every": "Mỗi",
  "library1.cron.interval": "Khoảng",
  "library1.cron.minutes": "Phút",
  "library1.cron.hours": "Giờ",
  "library1.cron.days": "Ngày",
  "library1.cron.repeats": "Lặp lại",
  "library1.cron.everyHour": "Mỗi giờ",
  "library1.cron.daily": "Hàng ngày",
  "library1.cron.weekly": "Hàng tuần",
  "library1.cron.monthly": "Hàng tháng",
  "library1.cron.yearly": "Hàng năm",
  "library1.cron.custom": "Tuỳ chỉnh",
  "library1.cron.atMinute": "Vào phút",
  "library1.cron.at": "Vào lúc",

  "library1.monthly.daysOfMonth": "Ngày trong tháng",
  "library1.monthly.allDays": "Tất cả ngày",
  "library1.monthly.customize": "Tuỳ chỉnh",
  "library1.monthly.fifteenth": "Ngày 15",
  "library1.monthly.lastDay": "Ngày cuối",
  "library1.monthly.selectDaysAria": "Chọn ngày trong tháng",

  "library1.weekly.repeatsOn": "Lặp lại vào",
  "library1.weekly.selectAll": "Chọn tất cả",
  "library1.weekly.weekdays": "Ngày thường",
  "library1.weekly.weekends": "Cuối tuần",
  "library1.weekly.selectDaysAria": "Chọn ngày trong tuần",
  "library1.weekly.sun": "CN",
  "library1.weekly.mon": "T2",
  "library1.weekly.tue": "T3",
  "library1.weekly.wed": "T4",
  "library1.weekly.thu": "T5",
  "library1.weekly.fri": "T6",
  "library1.weekly.sat": "T7",

  "library1.yearly.months": "Tháng",
  "library1.yearly.selectAll": "Chọn tất cả",
  "library1.yearly.deselectAll": "Bỏ chọn tất cả",
  "library1.yearly.selectMonthsAria": "Chọn tháng",
  "library1.yearly.jan": "Th1",
  "library1.yearly.feb": "Th2",
  "library1.yearly.mar": "Th3",
  "library1.yearly.apr": "Th4",
  "library1.yearly.may": "Th5",
  "library1.yearly.jun": "Th6",
  "library1.yearly.jul": "Th7",
  "library1.yearly.aug": "Th8",
  "library1.yearly.sep": "Th9",
  "library1.yearly.oct": "Th10",
  "library1.yearly.nov": "Th11",
  "library1.yearly.dec": "Th12",
};
