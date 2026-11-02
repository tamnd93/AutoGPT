import { library4En } from "./library-4.en";

export const library4Vi: Partial<Record<keyof typeof library4En, string>> = {
  "library4.summary.title": "Kỹ năng và nhắc hẹn",
  "library4.summary.skillOne": "1 kỹ năng",
  "library4.summary.skills": "{count} kỹ năng",
  "library4.summary.followupOne": "1 nhắc hẹn",
  "library4.summary.followups": "{count} nhắc hẹn",

  "library4.templateActions.confirmDelete": "Xoá template",
  "library4.triggerActions.confirmDelete": "Xoá trigger",

  "library4.marketplaceUpdate.failedTitle": "Cập nhật thất bại",
  "library4.marketplaceUpdate.failedBody":
    "Cập nhật workflow lên phiên bản mới nhất thất bại",
  "library4.marketplaceUpdate.updatedTitle": "Đã cập nhật workflow",
  "library4.marketplaceUpdate.updatedBody":
    "Đã cập nhật workflow lên phiên bản mới nhất",

  "library4.removeTrigger.removed": "Đã xoá trigger",
  "library4.removeTrigger.failed": "Xoá trigger thất bại",
  "library4.removeTrigger.body":
    "Bạn có chắc muốn xoá trigger này? Workflow trigger và lịch chạy của nó sẽ bị xoá. Không thể hoàn tác hành động này.",

  "library4.cardMenu.duplicated": "Đã nhân bản workflow",
  "library4.cardMenu.duplicatedBody": "{name} đã được tạo.",
  "library4.cardMenu.duplicateFailed": "Nhân bản workflow thất bại",
  "library4.cardMenu.removedFromFolder": "Đã xoá khỏi thư mục",
  "library4.cardMenu.removedFromFolderBody":
    "Workflow đã được chuyển về thư viện.",
  "library4.cardMenu.removeFromFolderFailed": "Xoá khỏi thư mục thất bại",
  "library4.cardMenu.duplicate": "Nhân bản workflow",
  "library4.cardMenu.moveToFolder": "Chuyển vào thư mục",
  "library4.cardMenu.removeFromFolder": "Xoá khỏi thư mục",

  "library4.card.previewAlt": "Ảnh xem trước {name}",
  "library4.card.seeTasks": "Xem tác vụ",
  "library4.card.chat": "Chat",
  "library4.libraryCard.favoriteFailed":
    "Cập nhật trạng thái yêu thích thất bại. Vui lòng thử lại.",
  "library4.libraryList.moveFailed":
    "Chuyển workflow thất bại. Vui lòng thử lại.",

  "library4.empty.title": "Thư viện của bạn đang trống",
  "library4.empty.body":
    "Tự tạo workflow của bạn từ đầu, hoặc lấy một cái từ marketplace để bắt đầu.",
  "library4.empty.build": "Tạo workflow",
  "library4.empty.browse": "Xem marketplace",

  "library4.intro.title": "Trung tâm điều khiển của bạn.",
  "library4.intro.body":
    "Đang chạy gì, đã đặt lịch gì, việc gì cần bạn, và chi phí bao nhiêu — tất cả ở một nơi.",
  "library4.intro.cta": "Xem workflow của tôi",

  "library4.filter.all": "Tất cả workflow",
  "library4.filter.running": "Đang chạy ({count})",
  "library4.filter.attention": "Cần chú ý ({count})",
  "library4.filter.listening": "Đang lắng nghe ({count})",
  "library4.filter.scheduled": "Đã đặt lịch ({count})",
  "library4.filter.idle": "Nhàn rỗi / Cũ ({count})",
  "library4.filter.healthy": "Khoẻ",
  "library4.filter.hint": "lọc",
  "library4.filter.label": "Lọc workflow",

  "library4.action.viewError": "Xem lỗi",
  "library4.action.reconnect": "Kết nối lại",
  "library4.action.watchLive": "Xem trực tiếp",
  "library4.action.view": "Xem",

  "library4.status.listening": "Đang chờ sự kiện trigger",
  "library4.status.scheduled": "Có lịch chạy",
  "library4.status.idle": "Không có hoạt động gần đây",
  "library4.status.soon": "Sắp chạy",
  "library4.status.minutes": "Sẽ chạy sau {minutes} phút",
  "library4.status.hours": "Sẽ chạy sau {hours} giờ",
  "library4.status.days": "Sẽ chạy sau {days} ngày",

  "library4.emptyMessage.running": "Không có workflow nào đang chạy",
  "library4.emptyMessage.attention": "Không có workflow nào cần chú ý",
  "library4.emptyMessage.completed": "Không có tác vụ nào vừa hoàn tất",
  "library4.emptyMessage.listening":
    "Không có workflow nào đang lắng nghe sự kiện",
  "library4.emptyMessage.scheduled": "Không có workflow nào có lịch chạy",
  "library4.emptyMessage.idle": "Không có workflow nào nhàn rỗi",
  "library4.emptyMessage.other": "Không có workflow nào trong nhóm này",

  "library4.costs.hide": "Ẩn chi tiết chi phí",
  "library4.costs.show": "Xem chi tiết chi phí",
  "library4.costs.noSpend": "Tháng này chưa có chi tiêu.",
  "library4.costs.monthRange": "Tháng dương lịch đến nay · {range}",
  "library4.costs.todayRange": "{date} – hôm nay (UTC)",
  "library4.costs.total": "Tổng tháng này",
  "library4.costs.tasks": "Tác vụ",
  "library4.costs.avgPerTask": "TB / tác vụ",
  "library4.costs.wasted": "Lãng phí do lỗi",
  "library4.costs.spendByWorkflow": "Chi tiêu theo workflow",
  "library4.costs.percentMonthly": "% chi tiêu tháng",
  "library4.costs.workflowFallback": "Workflow {id}",
  "library4.costs.runOne": "1 lượt chạy",
  "library4.costs.runs": "{count} lượt chạy",
  "library4.costs.avgPerRun": " · TB {amount}",
  "library4.costs.collapse": "Thu gọn",
  "library4.costs.showAll": "Xem tất cả ({count})",
  "library4.costs.mostExpensive": "Tác vụ tốn kém nhất",
  "library4.costs.errorOne": " · 1 lỗi",
  "library4.costs.errors": " · {count} lỗi",

  "library4.stats.spent": "Chi tiêu tháng này",
  "library4.stats.running": "Đang chạy",
  "library4.stats.completed": "Hoàn tất gần đây",
  "library4.stats.attention": "Cần chú ý",
  "library4.stats.scheduled": "Đã đặt lịch",
  "library4.stats.idle": "Nhàn rỗi",
};
