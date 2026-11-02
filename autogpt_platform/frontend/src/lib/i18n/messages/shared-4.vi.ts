import { Shared4En } from "./shared-4.en";

export const Shared4Vi: Partial<Record<keyof typeof Shared4En, string>> = {
  "shared4.needsAttention.heading": "Cần bạn xử lý ({count})",
  "shared4.needsAttention.errorContext": "mục chờ duyệt",
  "shared4.needsAttention.loadFailed": "Không tải được các mục chờ duyệt",
  "shared4.needsAttention.approveAria": "Duyệt: {title}",
  "shared4.needsAttention.declineAria": "Từ chối: {title}",
  "shared4.needsAttention.confirmDeclineAria": "Xác nhận từ chối: {title}",
  "shared4.needsAttention.approve": "Duyệt",
  "shared4.needsAttention.decline": "Từ chối",
  "shared4.needsAttention.confirm": "Xác nhận",
  "shared4.needsAttention.tapAgain": "Nhấn lại để từ chối: {title}",
  "shared4.needsAttention.approved": "Đã duyệt",
  "shared4.needsAttention.declined": "Đã từ chối",
  "shared4.needsAttention.failedApprove": "Không duyệt được mục này",
  "shared4.needsAttention.failedDecline": "Không từ chối được mục này",
  "shared4.needsAttention.unexpected": "Phản hồi bất thường từ máy chủ",
  "shared4.needsAttention.reviewFailed": "Không xử lý được mục này.",
  "shared4.needsAttention.errorFallback": "Đã có lỗi xảy ra",
  "shared4.showMore.more": "thêm",
  "shared4.showMore.less": "bớt",
};
