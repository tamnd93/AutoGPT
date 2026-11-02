import { billing3En } from "./billing-3.en";

export const billing3Vi: Partial<Record<keyof typeof billing3En, string>> = {
  "billing3.trial.cadence.year": "năm",
  "billing3.trial.cadence.month": "tháng",
  "billing3.trial.dayOne": "{count} ngày",
  "billing3.trial.dayMany": "{count} ngày",
  "billing3.trial.endFallback": "thời điểm kết thúc bản dùng thử",
  "billing3.trial.cancelFailed": "Không thể huỷ bản dùng thử của bạn.",
  "billing3.trial.resumeFailed": "Không thể tiếp tục bản dùng thử của bạn.",
  "billing3.trialCard.aria": "Bản dùng thử AutoGPT",
  "billing3.trialCard.errorContext": "thông tin dùng thử",
  "billing3.trialCard.freeTrial": "Dùng thử miễn phí",
  "billing3.trialCard.yourPlan": "Gói của bạn",
  "billing3.trialOffer.title": "Dùng thử AutoGPT {plan} trong {days} ngày",
  "billing3.trialOffer.noChargePill": "Hôm nay không tính phí",
  "billing3.trialOffer.bodyPrefix":
    "Cần có thẻ. Hôm nay không tính phí đăng ký gói. Sau đó",
  "billing3.trialOffer.bodySuffix":
    "cộng thuế áp dụng, trừ khi bạn huỷ trước khi bản dùng thử kết thúc.",
  "billing3.trialOffer.note":
    "Mức dùng thử có giới hạn. Nếu huỷ, bạn vẫn giữ quyền truy cập đến khi bản dùng thử kết thúc. Bạn có thể quản lý gói trong phần thanh toán.",
  "billing3.trialOffer.start": "Bắt đầu dùng thử {days} ngày",
  "billing3.trialStatus.titleActive": "Bản dùng thử của bạn",
  "billing3.trialStatus.titleEnded": "Bản dùng thử đã kết thúc",
  "billing3.trialStatus.badgeCanceled": "Đã huỷ",
  "billing3.trialStatus.badgeFreeTrial": "Dùng thử miễn phí",
  "billing3.trialStatus.badgeEnded": "Đã kết thúc",
  "billing3.trialStatus.bodyCanceled":
    "Đã xác nhận huỷ. Quyền dùng thử đã kết thúc và bản dùng thử sẽ không chuyển thành gói trả phí.",
  "billing3.trialStatus.bodyCanceling":
    "Đã xác nhận huỷ. Bản dùng thử sẽ không chuyển thành gói trả phí. Quyền dùng thử kết thúc {end}.",
  "billing3.trialStatus.bodyActive":
    "Bản dùng thử kết thúc {end}. Thẻ đã lưu của bạn sau đó sẽ bị tính {price}, cộng thuế áp dụng.",
  "billing3.trialStatus.bodyEnded":
    "Quyền truy cập trả phí cần thanh toán thành công. Hãy xem lại phương thức thanh toán và gói bên dưới.",
  "billing3.trialStatus.cancelNote":
    "Huỷ trước khi bản dùng thử kết thúc để tránh bị tính phí.",
  "billing3.cancelTrial.title": "Huỷ bản dùng thử?",
  "billing3.cancelTrial.button": "Huỷ dùng thử",
  "billing3.cancelTrial.body":
    "Bản dùng thử sẽ không chuyển thành gói trả phí và thẻ của bạn sẽ không bị tính phí.",
  "billing3.cancelTrial.keepAccess": "Bạn giữ toàn bộ quyền truy cập đến",
  "billing3.cancelTrial.keepAccessSuffix":
    ", và có thể tiếp tục bản dùng thử bất cứ lúc nào trước đó.",
  "billing3.cancelTrial.keep": "Giữ dùng thử",
  "billing3.cancelPending.status": "Đang chờ huỷ",
  "billing3.cancelPending.body":
    "Đã xác nhận huỷ. Bản dùng thử sẽ không chuyển thành gói trả phí và thẻ của bạn sẽ không bị tính phí. Quyền dùng thử kết thúc",
  "billing3.cancelPending.resumeNote":
    "Tiếp tục để giữ bản dùng thử và bắt đầu {plan} vào {date} với {price}, cộng thuế áp dụng.",
  "billing3.cancelPending.resume": "Tiếp tục dùng thử",
  "billing3.canceled.title": "Đã xác nhận huỷ",
  "billing3.canceled.noCharge": "Thẻ của bạn sẽ không bị tính phí.",
  "billing3.canceled.resume": "Tiếp tục dùng thử",
  "billing3.canceled.subscribe": "Đăng ký ngay",
  "billing3.timeLeft.noEnd":
    "Bạn vẫn có toàn bộ quyền truy cập đến khi bản dùng thử kết thúc. Không có gì thay đổi cho đến lúc đó.",
  "billing3.timeLeft.ended": "Quyền dùng thử của bạn đã kết thúc.",
  "billing3.timeLeft.until": "Bạn vẫn có toàn bộ quyền truy cập đến",
  "billing3.timeLeft.today": "hôm nay",
  "billing3.timeLeft.tomorrow": "ngày mai",
  "billing3.timeLeft.tail": ". Không có gì thay đổi cho đến lúc đó.",
  "billing3.timeLeft.youStillHave": "Bạn vẫn còn",
  "billing3.timeLeft.ofFullAccess": "toàn bộ quyền truy cập, đến",
  "billing3.worthDoing.title": "Nên tận dụng trước đó",
  "billing3.worthDoing.row1Title": "Đặt chuyên gia chạy theo lịch",
  "billing3.worthDoing.row1Body":
    'Nói "làm việc này mỗi thứ Hai lúc 8 giờ" với bất kỳ chuyên gia nào. Nó chạy khi bạn vắng mặt và kết quả chờ sẵn trên Home.',
  "billing3.worthDoing.row2Title": "Công việc của bạn vẫn còn",
  "billing3.worthDoing.row2Body":
    "Các đoạn chat, chuyên gia và lịch chạy vẫn nằm trong tài khoản. Đăng ký sau và tiếp tục từ chỗ đã dừng.",
  "billing3.worthDoing.row3Title": "Đăng ký bất cứ lúc nào",
  "billing3.worthDoing.resumeNote":
    " Thay vào đó hãy tiếp tục bản dùng thử và gói của bạn bắt đầu {date}.",
  "billing3.worthDoing.row3Body":
    "{plan} là {price}, huỷ bất cứ lúc nào.{note}",
  "billing3.rejection.usedTitle":
    "Ưu đãi giới thiệu này đã được dùng",
  "billing3.rejection.verifyTitle":
    "Chúng tôi không xác minh được thẻ của bạn cho bản dùng thử này",
  "billing3.rejection.usedBody":
    "Thẻ hoặc tài khoản này đã đổi ưu đãi giới thiệu. Mỗi thẻ và tài khoản chỉ dùng được một ưu đãi giới thiệu.",
  "billing3.rejection.verifyBody":
    "Thẻ của bạn không xác minh được điều kiện dùng thử nên bản dùng thử chưa được kích hoạt.",
  "billing3.rejection.footnote":
    "Bản dùng thử này sẽ không chuyển thành gói trả phí. Bạn có thể chọn gói trả phí bên dưới. Nếu cho đây là nhầm lẫn, hãy liên hệ hỗ trợ.",
  "billing3.rejection.contactSupport": "Liên hệ hỗ trợ",
  "billing3.checkout.errorContext": "bản dùng thử của bạn",
  "billing3.checkout.confirming": "Đang xác nhận bản dùng thử và thiết lập thẻ…",
  "billing3.plans.aria": "Chọn gói AutoGPT của bạn",
  "billing3.plans.headerBefore": "Chọn gói phù hợp với ",
  "billing3.plans.headerAccent": "bạn",
  "billing3.plans.headerBody":
    "Nâng cấp, hạ cấp hoặc đổi gói bất cứ lúc nào. Mọi gói đều có tính năng cốt lõi để bạn bắt đầu.",
  "billing3.plans.billingAria": "Chu kỳ thanh toán",
  "billing3.plans.monthly": "Thanh toán hàng tháng",
  "billing3.plans.yearly": "Thanh toán hàng năm",
  "billing3.plans.save": "Tiết kiệm 15%",
  "billing3.plans.footerPrefix": "Cần gói riêng?",
  "billing3.plans.footerSales": "Liên hệ kinh doanh.",
  "billing3.plans.compare": "So sánh gói",
  "billing3.plans.teamFit": "Tìm gói phù hợp cho đội của bạn.",
  "billing3.plans.manageBilling":
    "Quản lý gói và thanh toán của bạn bất cứ lúc nào.",
  "billing3.plans.cardRequired":
    "Cần thẻ. Hôm nay chưa thu phí đăng ký.",
  "billing3.plans.trialDetails": "Chi tiết dùng thử",
  "billing3.plans.tryInstead": "Dùng thử {plan} {days} ngày thay thế",
  "billing3.plans.renewsAt": "Gia hạn ở {price} + thuế áp dụng.",
  "billing3.plans.compareTitle": "So sánh các gói",
  "billing3.plans.trialTitle": "Bản dùng thử của bạn. Không bất ngờ.",
  "billing3.plans.usage": "dùng {usage}",
  "billing3.plans.trialUsageNote":
    "Mức dùng thử có giới hạn. Hạn mức gói trả phí áp dụng sau bản dùng thử.",
  "billing3.plans.trialDaysIntro": "{days} ngày để đưa AutoGPT vào việc.",
  "billing3.plans.today": "Hôm nay",
  "billing3.plans.afterDays": "Sau {days} ngày",
  "billing3.plans.trialChargeNote":
    "Cần thẻ. Hôm nay chưa thu phí đăng ký. Gói trả phí của bạn tự động bắt đầu sau bản dùng thử, cộng thuế áp dụng, trừ khi bạn huỷ trước khi kết thúc.",
  "billing3.plans.trialLimitNote":
    "Mức dùng thử có giới hạn. Nếu huỷ, bạn vẫn giữ quyền truy cập tới khi hết bản dùng thử. Bạn có thể quản lý hoặc huỷ gói trong phần thanh toán.",

};
export const Billing3Vi = billing3Vi;
