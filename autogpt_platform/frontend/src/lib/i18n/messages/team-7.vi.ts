import { Team7En } from "./team-7.en";

export const Team7Vi: Partial<Record<keyof typeof Team7En, string>> = {
  "team7.tabs.overview": "Tổng quan",
  "team7.tabs.soul": "Soul",
  "team7.tabs.schedules": "Lịch chạy",
  "team7.tabs.workflows": "Workflow",
  "team7.tabs.files": "Tệp",
  "team7.tabs.computer": "Máy tính",
  "team7.tabs.integrations": "Tích hợp",
  "team7.tabs.skills": "Kỹ năng",
  "team7.tabs.settings": "Cài đặt",

  "team7.page.loadFailed": "Không tải được chuyên gia này.",
  "team7.page.errorContext": "chuyên gia này",
  "team7.page.schedulesPaused": "Đã tạm dừng lịch chạy",
  "team7.page.resumeSchedules": "Tiếp tục lịch chạy",
  "team7.page.schedulesTitle": "Lịch chạy của {name}",

  "team7.settings.fireAria": "Cho {name} nghỉ việc",
  "team7.settings.fireTitle": "Cho {name} nghỉ việc",
  "team7.settings.fireBody":
    "{name} rời đội của bạn và ngừng làm việc cho bạn. Dưới đây là những gì sẽ xảy ra với những gì bạn đã thiết lập.",
  "team7.settings.checking": "Đang kiểm tra lịch chạy và trigger…",
  "team7.settings.checkFailed":
    "Không kiểm tra được lịch chạy và trigger nào sẽ bị tạm dừng",
  "team7.settings.automationOne": "{count} tự động hoá sẽ tạm dừng",
  "team7.settings.automationMany": "{count} tự động hoá sẽ tạm dừng",
  "team7.settings.noPauses": "Không có lịch chạy hay trigger nào cần tạm dừng",
  "team7.settings.pausesTag": "Tạm dừng",
  "team7.settings.keptTag": "Giữ lại",
  "team7.settings.workflowOne": "{count} workflow ở lại trong thư viện",
  "team7.settings.workflowMany": "{count} workflow ở lại trong thư viện",
  "team7.settings.workflowsDefault": "Workflow đã cài vẫn ở trong thư viện",
  "team7.settings.fileOne":
    "{count} tệp từ các chat ở lại trong không gian làm việc",
  "team7.settings.fileMany":
    "{count} tệp từ các chat ở lại trong không gian làm việc",
  "team7.settings.fileManyPlus":
    "{count}+ tệp từ các chat ở lại trong không gian làm việc",
  "team7.settings.filesDefault":
    "Tệp từ các chat ở lại trong không gian làm việc",
  "team7.settings.chatHistory": "Lịch sử chat được giữ, chỉ đọc",
  "team7.settings.hireAgain":
    "Bạn có thể tuyển lại {name} bất cứ lúc nào từ marketplace",
  "team7.settings.retry": "Thử lại",
  "team7.settings.morePauses": "+{count} nữa",

  "team7.soul.identity": "Danh tính",
  "team7.soul.voice": "Giọng điệu",
  "team7.soul.boundaries": "Giới hạn",
  "team7.profile.notSet": "Chưa thiết lập.",

  "team7.skills.search": "Tìm kỹ năng",
  "team7.skills.noChanges":
    "Chưa có thay đổi qua đêm. Các quy trình đã xác minh từ chat được xem xét hàng đêm.",
  "team7.skills.learningPaused": "Đã tạm dừng học",
  "team7.skills.learningOn": "Đang học",
  "team7.skills.nightlyAria": "Học hàng đêm cho {name}",
  "team7.skills.noneTitle": "Chưa có kỹ năng",
  "team7.skills.ariaList": "Kỹ năng của chuyên gia",
  "team7.skills.detailsUnavailable": "Không có chi tiết kỹ năng.",
  "team7.skills.learningDetailsAria": "Chi tiết học của {name}",
  "team7.skills.openInLibrary": "Mở trong thư viện",
  "team7.skills.removeAria": "Xoá {name}",
  "team7.skills.updateFailed": "Không cập nhật được kỹ năng",
  "team7.skills.added": "Đã thêm {name}",
  "team7.skills.addFailed": "Không thêm được kỹ năng đó",

  "team7.schedules.search": "Tìm lịch chạy",
  "team7.schedules.filter": "Lọc lịch chạy",
  "team7.schedules.noneTitle": "Chưa có lịch chạy",
  "team7.schedules.ariaList": "Lịch chạy của chuyên gia",

  "team7.workflows.listView": "Dạng danh sách",
  "team7.workflows.gridView": "Dạng lưới",
  "team7.workflows.search": "Tìm workflow",
  "team7.workflows.filter": "Lọc workflow",
  "team7.workflows.noneTitle": "Chưa có workflow",
  "team7.workflows.status.needsSetup": "Cần thiết lập",
  "team7.workflows.status.scheduled": "Theo lịch",
  "team7.workflows.status.triggered": "Theo trigger",
  "team7.workflows.status.manual": "Thủ công",
  "team7.workflows.unnamed": "Workflow chưa có tên",
  "team7.workflows.actions.edit": "Sửa workflow",
  "team7.workflows.actions.ask": "Hỏi về workflow này",
  "team7.workflows.cardMenu.more": "Thao tác khác",
  "team7.workflows.cardMenu.setUp": "Thiết lập",
  "team7.workflows.cardMenu.openInLibrary": "Mở trong thư viện",
  "team7.workflows.cardMenu.removed": "Đã xoá workflow",
  "team7.workflows.cardMenu.removeFailed": "Không xoá được workflow",
  "team7.workflows.runButton.runWorkflow": "Chạy workflow",
  "team7.workflows.runButton.setUpTrigger": "Thiết lập trigger",
  "team7.workflows.runButton.run": "Chạy",
  "team7.workflows.credentialsAria": "Thông tin kết nối đã dùng",
  "team7.workflows.credentialsMore": "{count} nữa",

  "team7.learning.updateFailed": "Không cập nhật được chế độ học",
  "team7.detail.resumeFailed": "Không tiếp tục được lịch chạy",
  "team7.schedule.created": "Đã tạo lịch chạy",
  "team7.skills.title": "Kỹ năng của {name}",
  "team7.skills.add": "Thêm kỹ năng",
  "team7.skills.emptyDesc":
    "Thêm kỹ năng từ thư viện để {name} biết bạn muốn mọi việc được làm thế nào.",
  "team7.skills.noMatch": "Không có kỹ năng nào khớp.",
  "team7.skills.removed": "Đã xoá {name}",

  "team7.schedules.create": "Tạo lịch chạy",
  "team7.schedules.noMatch": "Không có lịch chạy nào khớp.",
  "team7.schedules.emptyDesc":
    "Đặt một workflow theo lịch và {name} sẽ chạy đúng giờ mỗi lần.",

  "team7.workflows.title": "Workflow của {name}",
  "team7.workflows.install": "Cài workflow",
  "team7.workflows.noMatch": "Không có workflow nào khớp.",
  "team7.workflows.emptyDesc": "Cài một workflow để {name} có việc để chạy.",
  "team7.workflows.cardMenu.removeFromExpert": "Xoá khỏi chuyên gia",
  "team7.workflows.cardMenu.removeTitle": "Xoá {name}?",
  "team7.workflows.cardMenu.removeBody":
    "Chuyên gia này sẽ ngừng chạy workflow và lịch chạy của nó sẽ bị xoá. Workflow vẫn ở trong thư viện của bạn.",
  "team7.workflows.cardMenu.keep": "Giữ",
  "team7.workflows.cardMenu.remove": "Xoá",

  "team7.learning.pausedTitle": "Đã tạm dừng học cho {name}",
  "team7.learning.resumedTitle": "Đã tiếp tục học cho {name}",
  "team7.learning.pausedBody":
    "Các kỹ năng hiện có vẫn được dùng; không có thay đổi tự động mới.",

  "team7.workflows.filterAll": "Tất cả workflow",
  "team7.schedules.filterAll": "Tất cả lịch chạy",
  "team7.schedules.filterToday": "24 giờ tới",
  "team7.schedules.filterWeek": "7 ngày tới",
  "team7.schedules.filterLater": "Sau đó",
  "team7.schedules.lastRunSucceeded": "Lần chạy trước thành công {when}",
  "team7.schedules.lastRunFailed": "Lần chạy trước thất bại {when}",
  "team7.schedules.lastRun": "Lần chạy trước {when}",
};
