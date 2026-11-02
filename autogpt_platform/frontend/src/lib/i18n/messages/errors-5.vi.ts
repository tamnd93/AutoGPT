import { Errors5En } from "./errors-5.en";

export const Errors5Vi: Partial<Record<keyof typeof Errors5En, string>> = {
  "errors5.fileActions.download": "Tải {name}",
  "errors5.fileActions.delete": "Xoá {name}",
  "errors5.chatOrigin.from": "Từ {name}",
  "errors5.chatMinimap.jumpTo": "Chuyển tới: {title}",
  "errors5.mcpOutput.resultFrom": "Kết quả từ {name}",
  "errors5.understanding.body":
    "Từ phần giới thiệu và các cuộc trò chuyện của bạn. Mỗi cuộc trò chuyện mới với Otto đều bắt đầu với thông tin này.",
  "errors5.understanding.forgetTitle":
    "Xoá những gì Otto biết về công việc của bạn",
  "errors5.understanding.forgetTrigger": "Xoá thông tin này",
  "errors5.understanding.forgetBody":
    "Otto sẽ không bắt đầu cuộc trò chuyện mới với thông tin này. Các ký ức gần đây của bạn vẫn được giữ.",
  "errors5.understanding.cancel": "Huỷ",
  "errors5.understanding.forget": "Xoá",
  "errors5.understanding.errorTitle": "Không xoá được thông tin này",
  "errors5.understanding.errorBody": "Vui lòng thử lại.",
  "errors5.avatar.changeAria": "Đổi diện mạo của {name}",
  "errors5.avatar.changeTitle": "Đổi ảnh đại diện của {name}",
  "errors5.activity.aria": "Hoạt động trong {range}",
  "errors5.workflow.openTasks": "Mở tác vụ của {name}",
  "errors5.access.servicesTitle": "Dịch vụ {name} có thể dùng",
  "errors5.access.servicesBody":
    "{name} sẽ hỏi bạn kết nối những dịch vụ này ở lần dùng đầu tiên — chưa có gì được chia sẻ cho tới khi bạn làm vậy.",
  "errors5.range.lastYear": "năm qua",
  "errors5.range.lastThreeMonths": "3 tháng qua",
  "errors5.range.lastMonth": "tháng qua",
  "errors5.range.lastWeeks": "{weeks} tuần qua",
  "errors5.dayOne.title": "Những gì {name} thiết lập ngay ngày đầu",
  "errors5.activity.sessionsOne": "{count} phiên",
  "errors5.activity.sessionsMany": "{count} phiên",
  "errors5.activity.runsOne": "{count} lượt chạy",
  "errors5.activity.runsMany": "{count} lượt chạy",
  "errors5.activity.onDate": "{parts} vào {date}",
  "errors5.activity.noActivity": "Không có hoạt động vào {date}",
  "errors5.activity.totals": "{sessions} · {runs}",
};
