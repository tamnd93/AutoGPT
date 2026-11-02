import { Profile4En } from "./profile-4.en";

export const Profile4Vi: Partial<Record<keyof typeof Profile4En, string>> = {
  "profile4.dashboard.title": "Bảng điều khiển workflow",
  "profile4.dashboard.submitTitle": "Gửi workflow mới",
  "profile4.dashboard.submitBody":
    "Chọn từ danh sách workflow bạn đang có, hoặc tải lên từ máy của bạn.",
  "profile4.dashboard.submitButton": "Gửi workflow",
  "profile4.dashboard.uploadedTitle": "Workflow bạn đã tải lên",
  "profile4.dashboard.emptyTitle": "Chưa gửi workflow nào",
  "profile4.dashboard.emptyBody":
    'Bạn chưa gửi workflow nào lên store. Bấm "Gửi workflow" ở trên để bắt đầu.',
  "profile4.dashboard.errorTitle": "Không tải được workflow",
  "profile4.dashboard.errorBody": "Đã có lỗi khi tải các workflow bạn đã gửi.",
  "profile4.dashboard.tryAgain": "Thử lại",
  "profile4.dashboard.pageTitle":
    "Bảng điều khiển nhà sáng tạo – AutoGPT Platform",
  "profile4.table.workflowInfo": "Thông tin workflow",
  "profile4.table.dateSubmitted": "Ngày gửi",
  "profile4.table.status": "Trạng thái",
  "profile4.table.runs": "Lượt chạy",
  "profile4.table.reviews": "Đánh giá",
  "profile4.table.empty":
    "Chưa có workflow nào. Tạo workflow đầu tiên để bắt đầu!",
  "profile4.row.runs": "{count} lượt chạy",
  "profile4.row.noReviews": "Chưa có đánh giá",
  "profile4.row.edit": "Sửa",
  "profile4.row.view": "Xem",
  "profile4.row.delete": "Xoá",
  "profile4.refund.title": "Yêu cầu hoàn tiền",
  "profile4.refund.selectError": "Hãy chọn một giao dịch để hoàn tiền",
  "profile4.refund.reasonError": "Hãy nêu lý do hoàn tiền rõ ràng",
  "profile4.refund.noneEligible":
    "Không có giao dịch nào đủ điều kiện hoàn tiền.",
  "profile4.refund.selectLabel": "Chọn giao dịch",
  "profile4.refund.selectPlaceholder": "Chọn một giao dịch",
  "profile4.refund.reasonLabel": "Lý do hoàn tiền",
  "profile4.refund.reasonPlaceholder":
    "Hãy giải thích vì sao bạn yêu cầu hoàn tiền...",
  "profile4.common.cancel": "Huỷ",
  "profile4.tier.heading": "Gói đăng ký",
  "profile4.tier.enterprisePlan": "Gói Enterprise",
  "profile4.tier.enterpriseBody":
    "Gói Enterprise của bạn do quản trị viên quản lý. Liên hệ đội phụ trách tài khoản để thay đổi.",
  "profile4.tier.current": "Hiện tại",
  "profile4.tier.updating": "Đang cập nhật...",
  "profile4.tier.scheduled": "Đã lên lịch",
  "profile4.tier.upgradeTo": "Nâng lên {tier}",
  "profile4.tier.downgradeTo": "Hạ xuống {tier}",
  "profile4.tier.switchTo": "Chuyển sang {tier}",
  "profile4.tier.stripeNote":
    "Gói của bạn được quản lý qua Stripe. Nâng cấp có hiệu lực ngay. Hạ cấp có hiệu lực vào cuối kỳ thanh toán hiện tại.",
  "profile4.tier.cancelSubscription": "Huỷ đăng ký",
  "profile4.tier.pickPlan": "Chọn một gói để tiếp tục dùng AutoGPT.",
  "profile4.tier.pickPlanBody":
    "Tài khoản của bạn chưa có gói đang hoạt động. Chọn một gói bên dưới để bắt đầu làm việc với expert và chạy workflow.",
  "profile4.tier.confirmDowngradeTitle": "Xác nhận hạ gói",
  "profile4.tier.confirmDowngrade": "Xác nhận hạ gói",
  "profile4.tier.replaceTitle": "Thay thế thay đổi đang chờ?",
  "profile4.tier.replace": "Thay thế thay đổi đang chờ",
  "profile4.tier.confirmUpgradeTitle": "Xác nhận nâng gói",
  "profile4.tier.continueCheckout": "Tiếp tục thanh toán",
  "profile4.tier.loadError": "Không tải được thông tin gói đăng ký",
  "profile4.hook.upgradedTitle": "Đã nâng gói",
  "profile4.hook.upgradedBody":
    "Gói của bạn đã được cập nhật. Có thể cần một chút thời gian để hiển thị.",
  "profile4.hook.updatedTitle": "Đã cập nhật gói",
  "profile4.hook.cancelledBody":
    "Gói của bạn sẽ được huỷ vào cuối kỳ thanh toán hiện tại; không phát sinh thêm phí.",
  "profile4.hook.downgradedTo":
    "Gói của bạn sẽ được hạ xuống {tier} vào cuối kỳ thanh toán hiện tại; từ đó thẻ đã lưu được tính theo mức giá thấp hơn.",
  "profile4.hook.upgradedTo":
    "Đã nâng lên {tier}. Hoá đơn tiếp theo sẽ tính phần chênh lệch nâng cấp cộng tháng tiếp theo theo giá mới.",
  "profile4.hook.changeFailed": "Không đổi được gói đăng ký",
  "profile4.hook.pendingCancelled": "Đã huỷ thay đổi gói đang chờ.",
  "profile4.hook.cancelFailed": "Không huỷ được thay đổi gói đang chờ",
  "profile4.hook.cancelFailedTitle": "Không huỷ được thay đổi đang chờ",
};
