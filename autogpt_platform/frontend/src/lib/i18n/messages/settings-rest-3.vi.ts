import { settingsRest3En } from "./settings-rest-3.en";

export const settingsRest3Vi: Partial<
  Record<keyof typeof settingsRest3En, string>
> = {
  "settingsRest3.page.title": "Ký ức – Nền tảng AutoGPT",
  "settingsRest3.page.header": "Ký ức",
  "settingsRest3.page.body":
    "Những gì AutoGPT nhớ về bạn — và ai là người nhớ.",
  "settingsRest3.page.errorContext": "ký ức",

  "settingsRest3.scope.fallback": "chuyên gia này",

  "settingsRest3.filters.origin.all": "Tất cả nguồn",
  "settingsRest3.filters.origin.savedOvernight": "Lưu qua đêm",
  "settingsRest3.filters.origin.savedDuringWork": "Lưu trong lúc làm việc",
  "settingsRest3.filters.origin.requested": "Được yêu cầu",
  "settingsRest3.filters.origin.edited": "Đã chỉnh sửa",
  "settingsRest3.filters.origin.restored": "Đã khôi phục",
  "settingsRest3.filters.origin.imported": "Đã nhập",
  "settingsRest3.filters.state.all": "Tất cả trạng thái",
  "settingsRest3.filters.state.ready": "Sẵn sàng dùng",
  "settingsRest3.filters.state.needsDecision": "Cần bạn quyết định",
  "settingsRest3.filters.state.blockedContent": "Bị chặn bởi kiểm tra nội dung",
  "settingsRest3.filters.state.archived": "Đã lưu trữ",
  "settingsRest3.filters.state.invalidated":
    "Đã lưu trữ (nguồn không khả dụng)",

  "settingsRest3.learning.decisionRecorded": "Đã ghi nhận quyết định",
  "settingsRest3.learning.decisionFailed": "Không ghi nhận được quyết định",

  "settingsRest3.memory.forgotten": "Đã quên",
  "settingsRest3.memory.forgetFailedTitle": "Không thể quên ký ức đó",
  "settingsRest3.memory.tryAgain": "Vui lòng thử lại.",
  "settingsRest3.memory.erased": "Đã xoá ký ức",
  "settingsRest3.memory.eraseFailedTitle": "Không xoá được ký ức",
};
