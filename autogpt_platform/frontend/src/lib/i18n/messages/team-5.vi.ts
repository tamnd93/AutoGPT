import { Team5En } from "./team-5.en";

export const Team5Vi: Partial<Record<keyof typeof Team5En, string>> = {
  "team5.common.cancel": "Huỷ",
  "team5.common.tryAgain": "Vui lòng thử lại.",

  "team5.addSkill.title": "Thêm kỹ năng",
  "team5.addSkill.intro":
    "Kỹ năng là những chỉ dẫn dùng lại được mà expert này tuân theo cho một việc cụ thể. Chọn một kỹ năng trong thư viện của bạn hoặc cài từ marketplace.",
  "team5.addSkill.library": "Thư viện",
  "team5.addSkill.marketplace": "Marketplace",
  "team5.addSkill.searchLibrary": "Tìm trong thư viện của bạn",
  "team5.addSkill.loading": "Đang tải kỹ năng của bạn…",
  "team5.addSkill.allInstalled": "Expert này đã có mọi kỹ năng trong thư viện.",
  "team5.addSkill.noMatch": "Không có kỹ năng nào khớp.",
  "team5.addSkill.libraryAria": "Kỹ năng trong thư viện",
  "team5.addSkill.uploadNew": "Tải kỹ năng mới lên thư viện",
  "team5.addSkill.searchMarket": "Tìm trên marketplace",
  "team5.addSkill.searchingMarket": "Đang tìm trên marketplace…",
  "team5.addSkill.noMarketMatch": "Không có kỹ năng nào trên marketplace khớp.",
  "team5.addSkill.marketAria": "Kỹ năng trên marketplace",
  "team5.addSkill.add": "Thêm",

  "team5.chain.kind.integration": "Tích hợp",
  "team5.chain.kind.input": "Đầu vào workflow",
  "team5.chain.kind.output": "Đầu ra workflow",
  "team5.chain.kind.trigger": "Kích hoạt",
  "team5.chain.kind.agent": "Workflow",
  "team5.chain.kind.ai": "Mô hình AI",
  "team5.chain.kind.mcp": "Công cụ MCP",
  "team5.chain.kind.human": "Người duyệt",

  "team5.schedule.title": "Tạo lịch chạy",
  "team5.schedule.noWorkflows":
    "Hãy cài một workflow trước, rồi đặt lịch tại đây.",
  "team5.schedule.listAria": "Workflow có thể đặt lịch",
  "team5.schedule.unnamed": "Workflow chưa có tên",

  "team5.budget.title": "Ngân sách tuần",
  "team5.budget.placeholder": "ví dụ: 25",
  "team5.budget.invalid": "Nhập số tiền USD, ví dụ 25 hoặc 12.50",
  "team5.budget.note":
    "Số tiền {name} được chi mỗi tuần, tính bằng USD. Để trống để dùng mặc định, hoặc nhập 0 để bỏ giới hạn.",
  "team5.budget.save": "Lưu ngân sách",
  "team5.budget.updated": "Đã cập nhật ngân sách",
  "team5.budget.updateFailed": "Không cập nhật được ngân sách",

  "team5.raise.partialTitle":
    "Đã tạo {name}, nhưng một số công cụ chưa được gắn",
  "team5.raise.defaultName": "expert của bạn",
  "team5.raise.limitTitle": "Đã đạt giới hạn tạo expert",
  "team5.raise.limitBody":
    "Tài khoản này đã đạt giới hạn trọn đời số expert được tạo. Liên hệ hỗ trợ nếu bạn cần thêm.",
  "team5.raise.teamFullTitle": "Đội của bạn đã đầy",
  "team5.raise.teamFullBody":
    "Bạn đã đạt giới hạn số expert đang hoạt động. Lưu trữ một expert trong trang đội để tạo thêm.",
  "team5.raise.createFailed": "Không tạo được {name}",
  "team5.raise.genericError": "Đã có lỗi xảy ra. Vui lòng thử lại.",
};
