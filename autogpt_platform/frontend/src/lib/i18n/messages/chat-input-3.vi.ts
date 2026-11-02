import { chatInput3En } from "./chat-input-3.en";

export const chatInput3Vi: Partial<Record<keyof typeof chatInput3En, string>> =
  {
    "chatInput3.window.today": "Hôm nay",
    "chatInput3.window.week": "Tuần này",
    "chatInput3.window.trial": "Hạn mức dùng thử",

    "chatInput3.budgetLowHint.aria": "Ngân sách sắp hết",

    "chatInput3.storage.title": "Dung lượng tệp",
    "chatInput3.storage.percentUsed": "đã dùng {percent}%",
    "chatInput3.storage.underOne": "dưới 1%",
    "chatInput3.storage.aria": "Mức dùng dung lượng tệp",
    "chatInput3.storage.fileOne": "1 tệp",
    "chatInput3.storage.fileMany": "{count} tệp",
    "chatInput3.storage.summary": "{used} trên {limit} · {files}",

    "chatInput3.card.aria": "Thông báo mức dùng",
    "chatInput3.card.checkingEyebrow": "Đang kiểm tra hạn mức",
    "chatInput3.card.unavailableEyebrow": "Tạm thời không xem được mức dùng",
    "chatInput3.card.reviewBilling": "Xem thanh toán",
    "chatInput3.card.viewUsage": "Xem mức dùng",
    "chatInput3.card.checkingTitle": "Đang kiểm tra mức dùng",
    "chatInput3.card.unavailableTitle":
      "Chúng tôi không kiểm tra được mức dùng của bạn.",
    "chatInput3.card.refreshing": "Đang làm mới gói và mức dùng…",
    "chatInput3.card.unavailableBody":
      "Công việc của bạn đã được lưu. Hãy thử lại để kiểm tra hạn mức.",
    "chatInput3.card.taxNote": "+ thuế. Xem lại trước khi trả tiền.",
    "chatInput3.card.draftEditable": "Bạn vẫn có thể sửa bản nháp.",
    "chatInput3.card.checkingButton": "Đang kiểm tra…",
    "chatInput3.card.tryAgain": "Thử lại",
    "chatInput3.card.usageLimitMessage": "Đã chạm giới hạn sử dụng",

    "chatInput3.popover.title": "Giới hạn sử dụng",
    "chatInput3.popover.trialEnds": "Bản dùng thử kết thúc {date}",
    "chatInput3.popover.trialNoEnd": "Hạn mức của bạn cho bản dùng thử này",
    "chatInput3.popover.manageBilling": "Quản lý thanh toán",
  };
