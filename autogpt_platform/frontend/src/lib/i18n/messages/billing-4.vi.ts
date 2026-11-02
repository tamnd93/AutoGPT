import { Billing4En } from "./billing-4.en";

export const Billing4Vi: Partial<Record<keyof typeof Billing4En, string>> = {
  "billing4.usage.qChat": "Gói chat bao gồm những gì?",
  "billing4.usage.aChat":
    "Cuộc trò chuyện với Otto và các expert của bạn, gồm cả nghiên cứu và viết lách họ làm cho bạn. {allowance}",
  "billing4.usage.qCredits": "Tín dụng tự động dùng để làm gì?",
  "billing4.usage.aCredits":
    "Các lượt chạy workflow và bước trả phí, như tạo ảnh. Một bước workflow nơi Otto làm việc sẽ dùng hạn mức chat trước, và tín dụng của bạn chỉ khi hạn mức chat hết. {more}",
  "billing4.usage.creditsMoreBuy":
    "Bạn có thể mua tín dụng, kiếm bằng cách hoàn thành các bước thiết lập hoặc bật tự nạp để bổ sung.",
  "billing4.usage.creditsMoreEarn":
    "Bạn có thể kiếm bằng cách hoàn thành các bước thiết lập.",
  "billing4.usage.qCard": "Khi nào thẻ của tôi bị tính tiền?",
  "billing4.usage.aCard":
    "Chat hay một bước chạy không bao giờ tính thẳng vào thẻ của bạn. Thẻ bị tính khi gói của bạn bắt đầu và mỗi lần gia hạn, khi bạn nâng cấp, và khi bạn mua tín dụng (kể cả tự nạp). Nếu thanh toán gia hạn thất bại, khoản đó được trừ từ tín dụng tự động của bạn khi đủ.",
  "billing4.usage.qMore": "Làm sao để có thêm?",
  "billing4.usage.moreCreditsBuy":
    "Để có thêm tín dụng tự động, chọn Thêm tín dụng trong ví.",
  "billing4.usage.moreCreditsEarn":
    "Để có thêm tín dụng tự động, hoàn thành các bước thiết lập trong ví.",
  "billing4.usage.moreChatChoose": "Để có thêm hạn mức chat, chọn một gói.",
  "billing4.usage.moreChatBigger":
    "Để có thêm hạn mức chat, chọn gói lớn hơn.",
  "billing4.usage.ownerTrial": "gói dùng thử của bạn",
  "billing4.usage.ownerPlan": "gói của bạn",
  "billing4.usage.allowancePlan": "Đi kèm một gói.",
  "billing4.usage.allowanceTrial":
    "Đi kèm gói dùng thử của bạn, một hạn mức cho cả gói dùng thử.",
  "billing4.usage.allowanceUnlimited":
    "Đi kèm gói của bạn, không có giới hạn ngày hay tuần.",
  "billing4.usage.allowanceDailyWeekly":
    "Đi kèm {owner} và đặt lại hằng ngày và hằng tuần.",
  "billing4.usage.allowanceDaily": "Đi kèm {owner} và đặt lại hằng ngày.",
  "billing4.usage.allowanceWeekly": "Đi kèm {owner} và đặt lại hằng tuần.",
  "billing4.usage.allowanceUnknown": "Đi kèm gói của bạn.",

  "billing4.helpers.proStartsDescDated":
    "Pro sẽ tự bắt đầu vào {date}. Bắt đầu ngay để tiếp tục làm việc hôm nay.",
  "billing4.helpers.proStartsDescUndated":
    "Pro sẽ tự bắt đầu khi gói dùng thử kết thúc. Bắt đầu ngay để tiếp tục làm việc hôm nay.",
  "billing4.helpers.proStartsTitleDated": "Pro bắt đầu vào {date}",
  "billing4.helpers.proStartsTitleUndated":
    "Pro bắt đầu khi gói dùng thử kết thúc",
  "billing4.helpers.resumeToday": "hôm nay",
  "billing4.helpers.resumeTomorrow": "ngày mai",
  "billing4.helpers.resumeAt": "{day} lúc {time}",
  "billing4.offer.upgradeMax": "Nâng cấp lên Max",
  "billing4.offer.startProNow": "Bắt đầu Pro ngay",
  "billing4.offer.startProNowAmount": "Bắt đầu Pro ngay · {amount}",
  "billing4.offer.subscribeNow": "Đăng ký ngay",
  "billing4.offer.upgradePro": "Nâng cấp lên Pro",
  "billing4.offer.startPro": "Bắt đầu Pro",
  "billing4.pres.paymentFailedTitle": "Thanh toán của bạn không thành công",
  "billing4.pres.trialCanceledTitle": "Gói dùng thử của bạn đã bị huỷ",
  "billing4.pres.trialEndedTitle": "Gói dùng thử của bạn đã kết thúc",
  "billing4.pres.paymentEyebrow": "Thanh toán cần xử lý",
  "billing4.pres.canceledEyebrow": "Dùng thử miễn phí · Đã huỷ",
  "billing4.pres.endedEyebrow": "Dùng thử miễn phí · Đã kết thúc",
  "billing4.pres.paymentDescription":
    "Xem lại thông tin thanh toán để tiếp tục. Chat, workflow và kết quả của bạn vẫn được lưu.",
  "billing4.pres.canceledDescription":
    "Gói dùng thử của bạn sẽ không chuyển thành gói trả phí. Chat, workflow và kết quả của bạn được lưu, sẵn sàng khi bạn chọn gói.",
  "billing4.pres.endedDescription":
    "Chat, workflow và kết quả của bạn vẫn được lưu. Chọn một gói để tiếp tục.",
  "billing4.pres.contactSupport": "Liên hệ hỗ trợ",
  "billing4.pres.backToWork": "Quay lại công việc",
  "billing4.pres.weekly": "Hằng tuần",
  "billing4.pres.daily": "Hằng ngày",
  "billing4.pres.continueAt": "Bạn có thể tiếp tục {time}",
  "billing4.pres.continueRefresh":
    "Bạn có thể tiếp tục khi hạn mức được đặt lại",
  "billing4.pres.trialSpentTitle": "Bạn đã dùng hết hạn mức dùng thử",
  "billing4.pres.weekLimit": "Bạn đã chạm giới hạn tuần này",
  "billing4.pres.dayLimit": "Bạn đã chạm giới hạn hôm nay",
  "billing4.pres.yourPlan": "Gói của bạn",
  "billing4.pres.trialUsed": "Đã dùng hết hạn mức dùng thử",
  "billing4.pres.usageReached": "Đã chạm giới hạn {window}",
  "billing4.pres.eyebrow": "{plan} · {status}",
  "billing4.pres.nextPlan":
    "Chọn gói tiếp theo để tiếp tục. Chat, workflow và kết quả của bạn được lưu.",
  "billing4.pres.saved": "Chat, workflow và kết quả của bạn được lưu.",
  "billing4.pres.choosePlanSaved":
    "Chọn một gói để tiếp tục. Chat, workflow và kết quả của bạn được lưu.",
  "billing4.pres.proUpgrade":
    "{resume}, hoặc nâng cấp lên Max để có {usage}.",
  "billing4.pres.timesUsage": "gấp {multiplier} lần hạn mức",
  "billing4.pres.moreUsage": "nhiều hạn mức hơn",
  "billing4.pres.basicUpgrade": "{resume}, hoặc nâng cấp lên Pro.",
  "billing4.pres.startPro": "{resume}, hoặc bắt đầu Pro.",
  "billing4.pres.contactAccountTeam": "Liên hệ đội phụ trách tài khoản",
  "billing4.pres.contactUs": "Liên hệ chúng tôi",
  "billing4.pres.waitUntil": "Đợi đến {date}",
  "billing4.pres.waitForReset": "Đợi đặt lại",

  "billing4.dialog.title": "Cách tính hạn mức và tín dụng",
  "billing4.dialog.billingSettings": "Đến cài đặt thanh toán",
  "billing4.trial.checkoutFailed": "Không bắt đầu được thanh toán dùng thử.",
  "billing4.trialCheckout.notConfirmed": "Không xác nhận được gói dùng thử.",
  "billing4.trialCheckout.notActive":
    "Gói dùng thử chưa hoạt động. Kiểm tra lại thẻ và thử lại.",
  "billing4.activation.loadDetailsFailed":
    "Không tải được chi tiết nâng cấp. Vui lòng thử lại trước khi xác nhận thanh toán.",
  "billing4.activation.reviewTerms":
    "Hãy xem điều khoản hiện tại trước khi xác nhận nâng cấp.",
  "billing4.activation.confirmStatusFailed":
    "Không xác nhận được trạng thái thanh toán. Kiểm tra thanh toán hiện có rồi thử lại.",
  "billing4.activation.checkPaymentFailed":
    "Chưa kiểm tra được thanh toán. Vui lòng thử lại.",
  "billing4.activation.noPayment":
    "Không tìm thấy thanh toán đang xử lý. Bạn có thể bắt đầu lại.",
  "billing4.activation.refreshing":
    "Thanh toán đã được xác nhận. Chúng tôi đang làm mới gói và hạn mức trước khi bạn tiếp tục.",

  "billing4.usageMeters.trialAllowance": "Hạn mức dùng thử",
  "billing4.usageMeters.today": "Hôm nay",
  "billing4.usageMeters.thisWeek": "Tuần này",
  "billing4.paymentRecovery.aria": "Thanh toán",
  "billing4.paymentRecovery.label": "Thanh toán",
  "billing4.paymentRecovery.heading": "Thanh toán của bạn không thành công",
  "billing4.planOffer.aria": "Gói {name}",
  "billing4.planOffer.billed": "Tính phí {cycle}",
  "billing4.planOffer.cycleMonthly": "hàng tháng",
  "billing4.planOffer.cycleYearly": "hàng năm",
  "billing4.planOffer.perMonthTax": "mỗi tháng + thuế",
  "billing4.planOffer.perYearTax": "mỗi năm + thuế",
  "billing4.planOffer.proFreshBenefit1": "Được cấp đầy đủ hạn mức ngày và tuần khi thanh toán xong",
  "billing4.planOffer.proFreshBenefit2": "Chat, workflow và tệp của bạn vẫn giữ nguyên",
  "billing4.planOffer.proBenefit1": "Chuyên gia cho nội dung, bán hàng và nghiên cứu, có Otto điều phối",
  "billing4.planOffer.proBenefit2": "Workflow chạy nền theo lịch",
  "billing4.planOffer.timesUsage": "{count}× mức dùng của Pro",
  "billing4.planOffer.maxUsageFallback": "Nhiều chỗ hơn cho công việc ngày và tuần của bạn",
  "billing4.planOffer.timesStorage": "{count}× dung lượng không gian làm việc",
  "billing4.planOffer.maxStorageFallback": "Nhiều dung lượng không gian làm việc hơn",
  "billing4.planOffer.prioritySupport": "Hỗ trợ ưu tiên",
  "billing4.planOffer.footnoteFresh": "Bạn sẽ thấy toàn bộ phí trước khi thanh toán.",
  "billing4.planOffer.footnoteMax": "Phần bạn đã dùng được tính vào hạn mức cao hơn của Max.",
  "billing4.planOffer.footnotePro": "Xem lại gói và thanh toán trước khi xác nhận.",
  "billing4.payment.dueNote": "Mở trang Stripe bảo mật. Bạn có thể dùng thẻ khác ở đó.",
};
