import { billing2En } from "./billing-2.en";

export const billing2Vi: Partial<Record<keyof typeof billing2En, string>> = {
  "billing2.activation.manage": "Quản lý",
  "billing2.activation.manageAria":
    "Quản lý phương thức thanh toán trong tab mới",
  "billing2.activation.paymentMethod": "Phương thức thanh toán",

  "billing2.confirmBank.body":
    "Ngân hàng của bạn muốn xác nhận khoản thanh toán {price} cho {name}. Hãy thanh toán trên trang bảo mật của Stripe và {name} sẽ bắt đầu ngay. Cho đến lúc đó, bản dùng thử của bạn vẫn giữ nguyên.",
  "billing2.confirmBank.done": "Xong",
  "billing2.confirmBank.pay": "Thanh toán trên Stripe",
  "billing2.confirmBank.title": "Xác nhận với ngân hàng",

  "billing2.confirmTrial.body":
    "Bản dùng thử của bạn kết thúc ngay bây giờ và thẻ đã lưu sẽ bị tính {price}, cộng thuế áp dụng.",
  "billing2.confirmTrial.keep": "Giữ bản dùng thử",
  "billing2.confirmTrial.subscribe": "Đăng ký {name}",
  "billing2.confirmTrial.title": "Bắt đầu {name} hôm nay?",

  "billing2.cycle.aria": "Chu kỳ thanh toán",
  "billing2.cycle.cancel": "Huỷ",
  "billing2.cycle.monthly": "Hằng tháng",
  "billing2.cycle.save": "Tiết kiệm 15%",
  "billing2.cycle.switchAction": "Chuyển sang {cycle}",
  "billing2.cycle.switchTitle": "Chuyển chu kỳ thanh toán sang {cycle}?",
  "billing2.cycle.yearly": "Hằng năm",

  "billing2.invoices.columnAmount": "Số tiền",
  "billing2.invoices.columnDate": "Ngày",
  "billing2.invoices.columnDescription": "Mô tả",
  "billing2.invoices.columnInvoice": "Hoá đơn",
  "billing2.invoices.columnStatus": "Trạng thái",
  "billing2.invoices.download": "Tải xuống",
  "billing2.invoices.downloadAria": "Tải hoá đơn {number}",
  "billing2.invoices.empty": "Chưa có hoá đơn nào.",
  "billing2.invoices.errorContext": "hoá đơn",
  "billing2.invoices.errorHint": "Không tải được hoá đơn của bạn.",
  "billing2.invoices.title": "Hoá đơn",

  "billing2.lowCredit.body":
    "Bạn đã hết tín dụng tự động hoá. Hãy nạp thêm để workflow tiếp tục chạy.",
  "billing2.lowCredit.dismiss": "Bỏ qua",
  "billing2.lowCredit.topUp": "Nạp tiền",

  "billing2.maxReview.retry": "Thử xem lại",
  "billing2.maxReview.reviewing": "Đang xem lại khoản phí…",

  "billing2.maxSummary.dueToday": "Đến hạn hôm nay",
  "billing2.maxSummary.includingTax": "đã gồm thuế",
  "billing2.maxSummary.otherAdjustments": "Điều chỉnh hoá đơn khác",
  "billing2.maxSummary.per": "mỗi {unit}",
  "billing2.maxSummary.plusTax": "cộng thuế áp dụng",
  "billing2.maxSummary.renewalLead":
    "Gia hạn tiếp theo: {date}. Giá thường của Max là",
  "billing2.maxSummary.seeInvoice": "Xem hoá đơn",
  "billing2.maxSummary.tail":
    "trước mọi khoản giảm giá hoặc tín dụng tài khoản áp dụng.",
  "billing2.maxSummary.tax": "Thuế",
  "billing2.maxSummary.taxIncluded": "Thuế (đã gồm)",
  "billing2.maxSummary.unusedPro": "Thời gian Pro chưa dùng",

  "billing2.offer.actionWithPrice": "{title} · {price}",
  "billing2.offer.backToWork": "Quay lại công việc của bạn",
  "billing2.offer.capacityDefault":
    "Khi công việc cần thêm năng lực, hãy trao đổi với chúng tôi về nhu cầu của bạn.",
  "billing2.offer.capacityEnterprise":
    "Để có thêm năng lực hoặc thay đổi gói, đội ngũ phụ trách tài khoản sẵn sàng hỗ trợ.",
  "billing2.offer.capacityTitle": "Cần thêm năng lực?",
  "billing2.offer.contactAccountTeam": "Liên hệ đội tài khoản",
  "billing2.offer.contactUs": "Liên hệ chúng tôi",
  "billing2.offer.defaultCaption": "Xem lại lựa chọn trước khi thanh toán.",
  "billing2.offer.maxBenefit1": "Nhiều chỗ hơn cho công việc đòi hỏi cao",
  "billing2.offer.maxBenefit2":
    "Nhiều dung lượng lưu trữ hơn và hỗ trợ ưu tiên",
  "billing2.offer.maxCaption":
    "Những gì bạn đã dùng được tính vào giới hạn cao hơn của Max.",
  "billing2.offer.perMonth": "tháng",
  "billing2.offer.perYear": "năm",
  "billing2.offer.planEyebrow": "Gói của bạn",
  "billing2.offer.proBenefit1":
    "Chuyên gia cho nội dung, kinh doanh và nghiên cứu, do Otto điều phối",
  "billing2.offer.proBenefit2": "Workflow tiếp tục chạy nền theo lịch",
  "billing2.offer.proBody":
    "Pro đang hoạt động. Tiếp tục công việc với các đoạn hội thoại và workflow của bạn.",
  "billing2.offer.proEyebrow": "AutoGPT Pro",
  "billing2.offer.proTitle": "Pro đang hoạt động",
  "billing2.offer.startProNow": "Bắt đầu Pro ngay",
  "billing2.offer.startTier": "Bắt đầu {tier}",
  "billing2.offer.trialBenefit1":
    "Hạn mức đầy đủ theo ngày và tuần khi thanh toán hoàn tất",
  "billing2.offer.trialBenefit2":
    "Các đoạn chat, workflow và tệp của bạn vẫn giữ nguyên",
  "billing2.offer.trialCaption":
    "Bắt đầu ngay sẽ kết thúc sớm bản dùng thử. Bạn sẽ xem lại khoản phí trước.",
  "billing2.offer.trialQuietBody":
    "Bản dùng thử của bạn tiếp tục đến lúc đó. Bạn cũng có thể bắt đầu hôm nay.",
  "billing2.offer.upgradeToTier": "Nâng lên {tier}",

  "billing2.page.checkoutCancelledBody": "Gói của bạn không bị thay đổi.",
  "billing2.page.checkoutCancelledTitle": "Đã huỷ thanh toán",
  "billing2.page.confirmingBody":
    "Gói mới của bạn đang được áp dụng. Có thể cần một chút thời gian để hiển thị.",
  "billing2.page.confirmingTitle": "Đang xác nhận đăng ký gói",
  "billing2.page.explainerAria": "Cách mức dùng và tín dụng hoạt động",
  "billing2.page.header": "Thanh toán & mức dùng",
  "billing2.page.paymentCancelledBody":
    "Phương thức thanh toán của bạn không bị trừ tiền.",
  "billing2.page.paymentCancelledTitle": "Đã huỷ thanh toán",
  "billing2.page.paymentSuccessBody":
    "Tín dụng của bạn sẽ xuất hiện sớm. Hãy làm mới nếu chưa thấy.",
  "billing2.page.paymentSuccessTitle": "Thanh toán thành công",
  "billing2.page.subtitle": "Mọi thứ bạn cần để quản lý gói.",
  "billing2.page.tabCredits": "Tín dụng tự động hoá",
  "billing2.page.tabSubscription": "Đăng ký gói",
  "billing2.page.title": "Thanh toán – Nền tảng AutoGPT",

  "billing2.paymentMethod.aria": "Phương thức thanh toán",
  "billing2.paymentMethod.body":
    "Mở cổng Stripe để cập nhật thẻ hoặc tải hoá đơn.",
  "billing2.paymentMethod.openPortal": "Mở cổng thanh toán",
  "billing2.paymentMethod.title": "Quản lý phương thức thanh toán",

  "billing2.plan.activeUntil": " · Hoạt động đến {date}",
  "billing2.plan.aria": "Gói của bạn",
  "billing2.plan.badge.active": "Đang hoạt động",
  "billing2.plan.badge.cancellationScheduled": "Đã lên lịch huỷ",
  "billing2.plan.badge.cycleSwitchScheduled": "Đã lên lịch đổi chu kỳ",
  "billing2.plan.badge.downgradeScheduled": "Đã lên lịch hạ gói",
  "billing2.plan.badge.inactive": "Không hoạt động",
  "billing2.plan.cancelCycleSwitch": "Huỷ đổi chu kỳ",
  "billing2.plan.cancelDowngrade": "Huỷ hạ gói",
  "billing2.plan.contactUs": "Liên hệ chúng tôi",
  "billing2.plan.downgradeAction": "Hạ xuống {tier}",
  "billing2.plan.downgradeTitle": "Hạ xuống {tier}?",
  "billing2.plan.downgradeTo": "Hạ xuống {tier}",
  "billing2.plan.endsOn": " · Kết thúc vào {date}",
  "billing2.plan.errorContext": "đăng ký gói của bạn",
  "billing2.plan.forChanges": "để thay đổi.",
  "billing2.plan.manageSubscription": "Quản lý đăng ký gói",
  "billing2.plan.managed": "Được đội ngũ tài khoản AutoGPT quản lý.",
  "billing2.plan.noChargeToday": " · Không tính phí hôm nay",
  "billing2.plan.pendingSwitch": "Chuyển sang {cycle} {name} vào {date}",
  "billing2.plan.perMonth": " / tháng",
  "billing2.plan.perYear": " / năm",
  "billing2.plan.pickPlan": "Chọn gói để tiếp tục dùng AutoGPT.",
  "billing2.plan.renewsOn": " · Gia hạn vào {date}",
  "billing2.plan.resumeSubscription": "Tiếp tục đăng ký gói",
  "billing2.plan.startTier": "Bắt đầu {tier}",
  "billing2.plan.switchesTo": " · Chuyển sang {tier} vào {date}",
  "billing2.plan.talkToSales": "Liên hệ kinh doanh — {tier}",
  "billing2.plan.upgradeTo": "Nâng lên {tier}",

  "billing2.planHook.chargeToday":
    "Stripe sẽ tính phần chênh lệch theo tỷ lệ hôm nay.",
  "billing2.planHook.chargeTodayBody":
    "Bạn sẽ bị tính phần chênh lệch theo tỷ lệ hôm nay.",
  "billing2.planHook.chargedToday": "Tính phí hôm nay:",
  "billing2.planHook.cycleCancelled": "Đã huỷ đổi chu kỳ",
  "billing2.planHook.downgradeBody":
    "Bạn sẽ giữ {name} ({cycle}) đến {date}, sau đó chuyển sang {tier}. Không tính phí hôm nay.",
  "billing2.planHook.downgradeCancelled": "Đã huỷ hạ gói",
  "billing2.planHook.downgradeScheduled": "Đã lên lịch hạ gói",
  "billing2.planHook.newPrice": "Giá mới:",
  "billing2.planHook.newPriceValue": "{amount}/tháng.",
  "billing2.planHook.noChargeToday": "Không tính phí hôm nay.",
  "billing2.planHook.paymentIncomplete":
    "Thanh toán chưa hoàn tất. Hãy kiểm tra phương thức thanh toán rồi xem lại khoản phí.",
  "billing2.planHook.proratedImmediately":
    "Bạn sẽ bị tính phần chênh lệch theo tỷ lệ ngay cho phần còn lại của chu kỳ {cycle}.",
  "billing2.planHook.renews": "Gia hạn",
  "billing2.planHook.renewsAfter": "ở mức {amount}/năm sau chu kỳ này.",
  "billing2.planHook.renewsLine":
    "Sau chu kỳ này, gói của bạn gia hạn ở mức {amount} mỗi {unit}.",
  "billing2.planHook.renewsOnDate": "{amount}/năm vào {date}.",
  "billing2.planHook.renewsYearlyCadence":
    "Gia hạn theo chu kỳ năm mới sau chu kỳ này.",
  "billing2.planHook.resumed": "Đã tiếp tục đăng ký gói",
  "billing2.planHook.switchMonthlyEnd":
    "Gói của bạn sẽ chuyển sang hằng tháng vào cuối chu kỳ hiện tại.",
  "billing2.planHook.switchMonthlyEndYearly":
    "Chuyển sang hằng tháng vào cuối chu kỳ năm hiện tại.",
  "billing2.planHook.switchMonthlyTitle":
    "Chuyển chu kỳ thanh toán sang Hằng tháng?",
  "billing2.planHook.switchYearlyTitle":
    "Chuyển chu kỳ thanh toán sang Hằng năm?",
  "billing2.planHook.switchedYearly": "Đã chuyển sang thanh toán hằng năm",
  "billing2.planHook.switchingMonthly":
    "Chuyển sang hằng tháng vào cuối chu kỳ",
  "billing2.planHook.tierYearly": "{tier} hằng năm:",
  "billing2.planHook.updateFailedBody":
    "Stripe không chấp nhận thay đổi. Vui lòng thử lại.",
  "billing2.planHook.updateFailedTitle": "Không cập nhật được gói của bạn",
  "billing2.planHook.usageCarriesOver":
    "Mức dùng hiện tại của bạn được chuyển sang hạn mức cao hơn.",
  "billing2.planHook.yearlyLabel": "Hằng năm:",
  "billing2.planHook.yearlyUnavailableBody": "Vui lòng liên hệ hỗ trợ.",
  "billing2.planHook.yearlyUnavailableTitle":
    "Gói của bạn chưa hỗ trợ thanh toán hằng năm.",

  "billing2.subscription.finishingPlan": "Đang hoàn tất gói mới của bạn…",
  "billing2.subscription.recoveryFallback":
    "Cập nhật phương thức thanh toán bên dưới để tiếp tục. Các đoạn chat, workflow và kết quả của bạn vẫn được lưu.",
  "billing2.support.readyAria": "Gói của bạn đã sẵn sàng",
  "billing2.support.supportAria": "Hỗ trợ gói",

  "billing2.switchTier.cancel": "Huỷ",
  "billing2.switchTier.carryOver":
    "Gấp {multiple} lần mức dùng của Pro và hỗ trợ ưu tiên.",
  "billing2.switchTier.carryOverBodyLead":
    "Bạn có thể tiếp tục ngay khi thanh toán hoàn tất. Những gì bạn đã dùng được tính vào giới hạn của Max",
  "billing2.switchTier.carryOverBodyMultiple": ", cao gấp {multiple} lần Pro.",
  "billing2.switchTier.carryOverDefault":
    "Nhiều chỗ hơn cho công việc đòi hỏi cao và hỗ trợ ưu tiên.",
  "billing2.switchTier.eyebrow": "Đăng ký gói của bạn",
  "billing2.switchTier.keepPro": "Giữ Pro",
  "billing2.switchTier.pay": "Thanh toán {amount} và nâng cấp",
  "billing2.switchTier.planTitle": "AutoGPT {name}",
  "billing2.switchTier.upgradeAction": "Nâng lên {name}",

  "billing2.topUp.addCreditsBody":
    "Tín dụng dùng để chạy workflow và chuyên gia. Bạn cũng có thể ",
  "billing2.topUp.addCreditsTitle": "Thêm tín dụng tự động hoá",
  "billing2.topUp.amountLabel": "Số tiền",
  "billing2.topUp.autoRefillLink": "bật tự động nạp trong cài đặt thanh toán",
  "billing2.topUp.enterAmount": "Nhập số tiền cần nạp",
  "billing2.topUp.minimum":
    "Nạp tiền bắt đầu từ $5. Vui lòng nhập số tiền cao hơn.",
  "billing2.topUp.outOfCreditsBody":
    "Hãy nạp thêm để workflow và chuyên gia tiếp tục chạy. Bạn cũng có thể ",
  "billing2.topUp.outOfCreditsTitle": "Bạn đã hết tín dụng tự động hoá",
  "billing2.topUp.redirecting": "Đang chuyển hướng…",
  "billing2.topUp.submit": "Nạp tiền",
  "billing2.topUp.wholeDollars": "Nhập số tiền đô nguyên",

  "billing2.trialChoices.aria": "Lựa chọn gói",
  "billing2.trialChoices.moreUsage":
    "Nhiều mức dùng hơn {name} cho người chạy nhiều.",
  "billing2.trialChoices.multipleUsage":
    "Gấp {multiple} lần mức dùng của {name} cho người chạy nhiều.",
  "billing2.trialChoices.onPlan": "Bạn đang dùng {name}",
  "billing2.trialChoices.ownDescription":
    "Bắt đầu hôm nay. Bản dùng thử kết thúc và gói tiếp quản.",
  "billing2.trialChoices.paymentReceived": "Đã nhận thanh toán",
  "billing2.trialChoices.planStartsToday":
    "Bản dùng thử đã kết thúc và gói của bạn bắt đầu hôm nay.",
  "billing2.trialChoices.settingUp":
    "Gói của bạn vẫn đang được thiết lập. Trang này sẽ cập nhật khi sẵn sàng.",
  "billing2.trialChoices.subscribe": "Đăng ký {name}",
  "billing2.trialChoices.upgrade": "Nâng lên {name}",

  "billing2.trialRequest.planChanged": "Gói của bạn đã thay đổi",
  "billing2.trialRequest.reviewPlan": "Xem lại gói hiện tại bên dưới.",
  "billing2.trialRequest.tryAgain": "Vui lòng thử lại.",
  "billing2.trialRequest.unable": "Không bắt đầu được {name}",

  "billing2.upgradePreview.changed":
    "Thông tin thanh toán của bạn đã thay đổi. Hãy xem lại khoản phí cập nhật trước khi thanh toán.",
  "billing2.upgradePreview.expired":
    "Lần xem lại này đã hết hạn. Hãy xem lại khoản phí trước khi thanh toán.",
  "billing2.upgradePreview.loadFailed":
    "Không tải được khoản phí của bạn. Hãy thử lại trước khi nâng cấp.",
};
