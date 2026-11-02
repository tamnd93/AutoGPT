import { Schedule1En } from "./schedule-1.en";

export const Schedule1Vi: Partial<Record<keyof typeof Schedule1En, string>> = {
  "schedule1.repeat": "Lặp lại",
  "schedule1.selectFrequency": "Chọn tần suất",
  "schedule1.everyHour": "Mỗi giờ",
  "schedule1.daily": "Hằng ngày",
  "schedule1.weekly": "Hằng tuần",
  "schedule1.monthly": "Hằng tháng",
  "schedule1.yearly": "Hằng năm",
  "schedule1.custom": "Tuỳ chỉnh",
  "schedule1.atMinute": "Vào phút",
  "schedule1.selectMinute": "Chọn phút",
  "schedule1.every": "Mỗi",
  "schedule1.minutes": "Phút",
  "schedule1.hours": "Giờ",
  "schedule1.days": "Ngày",
  "schedule1.on": "Vào",
  "schedule1.selectAll": "Chọn tất cả",
  "schedule1.deselectAll": "Bỏ chọn tất cả",
  "schedule1.weekdays": "Ngày trong tuần",
  "schedule1.weekends": "Cuối tuần",
  "schedule1.errorWeekday": "Vui lòng chọn ít nhất một ngày trong tuần",
  "schedule1.daysOfMonth": "Ngày trong tháng",
  "schedule1.allDays": "Tất cả các ngày",
  "schedule1.customize": "Tuỳ chỉnh",
  "schedule1.day15": "Ngày 15",
  "schedule1.lastDay": "Ngày cuối",
  "schedule1.errorMonthDay": "Vui lòng chọn ít nhất một ngày trong tháng",
  "schedule1.months": "Tháng",
  "schedule1.errorMonth": "Vui lòng chọn ít nhất một tháng",
  "schedule1.at": "Lúc",

  "schedule1.dialog.defaultTitle": "Lên lịch tác vụ",
  "schedule1.dialog.setScheduleTitle": "Đặt lịch",
  "schedule1.dialog.nameRequired": "Vui lòng nhập tên lịch",
  "schedule1.dialog.invalidTitle": "Lịch không hợp lệ",
  "schedule1.dialog.invalidBody": "Vui lòng nhập biểu thức cron hợp lệ",
  "schedule1.dialog.scheduleName": "Tên lịch",
  "schedule1.dialog.namePlaceholder": "Nhập tên cho lịch này",
  "schedule1.dialog.noTimezone":
    "Chưa đặt múi giờ. Lịch sẽ chạy theo UTC.",
  "schedule1.dialog.setTimezone": "Đặt múi giờ của bạn",
  "schedule1.dialog.timezoneLead": "Lịch sẽ chạy theo múi giờ của bạn:",
  "schedule1.dialog.cancel": "Huỷ",
  "schedule1.dialog.done": "Xong",

  "schedule1.panel.title": "Đã lên lịch",
  "schedule1.panel.body":
    "Mọi tác vụ tự động ở một nơi — follow-up theo lịch của chuyên gia và các lần chạy workflow định kỳ từ builder. Mở một mục để xem chat hoặc workflow, hoặc huỷ mục bạn không còn cần.",
  "schedule1.panel.newTask": "Tác vụ đã lên lịch mới",
  "schedule1.panel.partialError":
    "Không tải được một số mục đã lên lịch — đang hiển thị những mục tải được. Làm mới để thử lại.",
  "schedule1.panel.pausedAria": "Chat đã lên lịch bị tạm dừng",
  "schedule1.panel.itemsAria": "Các mục đã lên lịch",
  "schedule1.panel.loadFailed": "Không tải được lịch chạy",
  "schedule1.panel.errorContext": "các mục đã lên lịch",

  "schedule1.empty.title": "Chưa có gì được lên lịch",
  "schedule1.empty.body":
    "Follow-up theo lịch của chuyên gia và các lần chạy workflow định kỳ sẽ hiện ở đây. Chọn Tác vụ đã lên lịch mới để thiết lập, hoặc lên lịch workflow từ builder.",
};
export const schedule1Vi = Schedule1Vi;
