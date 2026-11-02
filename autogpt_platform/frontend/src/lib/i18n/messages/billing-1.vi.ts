import { billing1En } from "./billing-1.en";

export const billing1Vi: Partial<Record<keyof typeof billing1En, string>> = {
  "billing1.title.recovery": "Gói của bạn",
  "billing1.title.choose": "Chọn gói của bạn",
  "billing1.logout": "Đăng xuất",
  "billing1.recoveryFallback":
    "Cập nhật phương thức thanh toán trong phần thanh toán để tiếp tục. Các đoạn chat, workflow và kết quả của bạn vẫn được lưu.",
  "billing1.unavailable":
    "Tạm thời chưa thể đăng ký gói. Vui lòng thử lại sau ít phút.",
  "billing1.retry": "Thử lại",
  "billing1.backToBilling": "Quay lại thanh toán",
  "billing1.checkout.failedTitle": "Không bắt đầu được thanh toán",
  "billing1.checkout.failedDescription":
    "Stripe không chấp nhận yêu cầu. Vui lòng thử lại.",
  "billing1.switch.title": "Chuyển sang {tier}?",
  "billing1.switch.confirm": "Chuyển sang {tier}",
  "billing1.switch.body":
    "Gói đăng ký Stripe hiện tại của bạn sẽ được thay đổi — bạn có thể bị tính thêm hoặc được hoàn lại phần chênh lệch theo tỷ lệ. Tiếp tục?",

  "billing1.header.title": "Chọn gói để tiếp tục làm việc",
  "billing1.header.body":
    "Các đoạn chat, workflow và tệp của bạn vẫn được lưu.",
  "billing1.header.demo": "Xem bản demo nhanh",

  "billing1.choices.sectionAria": "Chọn gói AutoGPT của bạn",
  "billing1.choices.periodAria": "Chu kỳ thanh toán",
  "billing1.choices.monthly": "Hằng tháng",
  "billing1.choices.yearly": "Hằng năm",
  "billing1.choices.save": "Tiết kiệm {percent}%",
  "billing1.choices.team": "Nhóm",
  "billing1.choices.teamBody": "Năng lực tuỳ chỉnh cho tổ chức của bạn.",
  "billing1.choices.talkToSales": "Liên hệ kinh doanh",
  "billing1.choices.footnote":
    "Các đoạn hội thoại và workflow của bạn vẫn được lưu. Huỷ bất cứ lúc nào.",
  "billing1.choices.planAria": "Gói {name}",
  "billing1.choices.proTagline": "Dành cho công việc hằng ngày của bạn.",
  "billing1.choices.maxTagline": "Cho ý tưởng lớn hơn và khối lượng nặng hơn.",
  "billing1.choices.proFeature1":
    "Chuyên gia cho nội dung, kinh doanh và nghiên cứu, do Otto điều phối",
  "billing1.choices.proFeature2": "Workflow tiếp tục chạy nền theo lịch",
  "billing1.choices.maxUsage": "Gấp {usage} lần mức dùng của Pro",
  "billing1.choices.maxFeature": "Nhiều năng lực hơn cho công việc đòi hỏi cao",
  "billing1.choices.storage": "Nhiều dung lượng lưu trữ hơn và hỗ trợ ưu tiên",
  "billing1.choices.unavailablePrice": "Không khả dụng",
  "billing1.choices.perYear": "năm",
  "billing1.choices.perMonth": "tháng",
  "billing1.choices.start": "Bắt đầu {name}",

  "billing1.helpers.pausedOne":
    "Workflow theo lịch của bạn đang tạm dừng cho đến khi bạn đăng ký gói.",
  "billing1.helpers.pausedMany":
    "{count} workflow theo lịch của bạn đang tạm dừng cho đến khi bạn đăng ký gói.",
  "billing1.helpers.reset": "Đặt lại",
  "billing1.helpers.resetIn": "Đặt lại sau",
  "billing1.helpers.soon": "sắp tới",

  "billing1.autoRefill.title": "Tự động nạp tiền",
  "billing1.autoRefill.enabledBody":
    "Nạp ${amount} khi số dư xuống dưới ${threshold}.",
  "billing1.autoRefill.disabledBody":
    "Tự động nạp khi số dư của bạn xuống thấp.",
  "billing1.autoRefill.edit": "Sửa",
  "billing1.autoRefill.setUp": "Thiết lập tự động nạp",
  "billing1.autoRefill.dialogBody":
    "Tự động nạp số dư khi xuống dưới ngưỡng bạn đặt.",
  "billing1.autoRefill.thresholdLabel": "Khi số dư xuống dưới:",
  "billing1.autoRefill.amountLabel": "Tự động nạp với:",
  "billing1.autoRefill.warning":
    "Như một cơ chế an toàn, tự động nạp chỉ kích hoạt một lần cho mỗi tác vụ. Hãy cân nhắc khi lập ngân sách để số dư không về 0 và tác vụ của bạn không bị dừng giữa chừng.",
  "billing1.autoRefill.disable": "Tắt",
  "billing1.autoRefill.cancel": "Huỷ",
  "billing1.autoRefill.saveChanges": "Lưu thay đổi",
  "billing1.autoRefill.enable": "Bật tự động nạp",
  "billing1.autoRefill.minPlaceholder": "tối thiểu $5",
  "billing1.autoRefill.saveFailedTitle": "Không lưu được tự động nạp",
  "billing1.autoRefill.saveFailedBody":
    "Cài đặt tự động nạp chưa được lưu. Vui lòng thử lại.",
  "billing1.autoRefill.disableFailedTitle": "Không tắt được tự động nạp",
  "billing1.autoRefill.disableFailedBody":
    "Không thể tắt tự động nạp. Vui lòng thử lại.",

  "billing1.balance.title": "Tín dụng tự động hoá",
  "billing1.balance.explainer":
    "Tín dụng tự động hoá là tín dụng nền tảng dùng cho các lần chạy tự động hoá. Đây không phải tiền mặt, không thể rút và không thể đổi thành phí đăng ký gói.",
  "billing1.balance.errorContext": "số dư",
  "billing1.balance.errorHint": "Không tải được số dư tín dụng của bạn.",
  "billing1.balance.addTitle": "Thêm tín dụng",
  "billing1.balance.addButton": "Thêm tín dụng",
  "billing1.balance.stripeNote":
    "Chúng tôi sẽ chuyển bạn đến Stripe để hoàn tất giao dịch.",
  "billing1.balance.amountLabel": "Số tiền (USD, chỉ đô nguyên, tối thiểu $5)",
  "billing1.balance.amountPlaceholder": "Số tiền",
  "billing1.balance.cancel": "Huỷ",
  "billing1.balance.continue": "Tiếp tục thanh toán",
  "billing1.balance.serverReturned": "Máy chủ trả về {status}.",
  "billing1.balance.noCheckoutUrl":
    "Stripe không trả về liên kết thanh toán. Hãy kiểm tra log backend để biết lỗi Stripe gốc.",
  "billing1.balance.checkoutFailedTitle": "Không bắt đầu được thanh toán",
  "billing1.balance.checkoutFailedBody":
    "Đã xảy ra lỗi khi liên hệ Stripe. Vui lòng thử lại.",

  "billing1.history.aria": "Lịch sử giao dịch",
  "billing1.history.title": "Lịch sử giao dịch",
  "billing1.history.subtitle": "Thay đổi số dư tín dụng tự động hoá của bạn.",
  "billing1.history.currencyNote": "USD · Giờ địa phương của bạn",
  "billing1.history.errorContext": "lịch sử giao dịch",
  "billing1.history.errorHint":
    "Không tải được giao dịch của bạn. Vui lòng thử lại.",
  "billing1.history.refreshError":
    "Không làm mới được lịch sử. Đang hiển thị hoạt động đã tải trước đó.",
  "billing1.history.tryAgain": "Thử lại",
  "billing1.history.footnote":
    "Mỗi lần chạy workflow gộp các khoản phí và điều chỉnh đã ghi. Chỉ những lần chạy có hoạt động tín dụng mới xuất hiện ở đây.",
  "billing1.history.loadingAria": "Đang tải lịch sử giao dịch",
  "billing1.history.emptyTitle": "Chưa có giao dịch nào.",
  "billing1.history.emptyBody":
    "Các giao dịch mua tín dụng và hoạt động trả phí sẽ xuất hiện ở đây.",
  "billing1.history.dateUnavailable": "Không khả dụng",
  "billing1.history.dateUnavailableFull": "Không có ngày",
  "billing1.history.workflowUnavailable": "Workflow không khả dụng",
  "billing1.history.expertToolUse": "Chuyên gia dùng công cụ",
  "billing1.history.directBlockUsage": "Dùng block trực tiếp",
  "billing1.history.creditUsage": "Dùng tín dụng",
  "billing1.history.balanceChange": "Thay đổi số dư tín dụng",
  "billing1.history.partOf": "Thuộc {name}",
  "billing1.history.workflowRun": "Lần chạy workflow",
  "billing1.history.paidBlockTools": "Công cụ block trả phí",
  "billing1.history.outsideWorkflowRun": "Ngoài một lần chạy workflow",
  "billing1.history.creditPurchase": "Mua tín dụng",
  "billing1.history.creditPurchaseRefunded": "Hoàn tiền mua tín dụng",
  "billing1.history.paidFromBalance": "Thanh toán từ số dư tín dụng",
  "billing1.history.creditBalance": "Số dư tín dụng",
  "billing1.history.unavailable": "Không khả dụng",
  "billing1.history.name.topUp": "Đã thêm tín dụng",
  "billing1.history.name.grant": "Tín dụng được tặng",
  "billing1.history.name.refund": "Hoàn tiền nạp",
  "billing1.history.name.subscription": "Thanh toán đăng ký gói",
  "billing1.history.name.cardCheck": "Xác minh thẻ",
  "billing1.history.status.queued": "Đang xếp hàng",
  "billing1.history.status.running": "Đang chạy",
  "billing1.history.status.review": "Cần xem lại",
  "billing1.history.status.incomplete": "Chưa hoàn tất",
  "billing1.history.status.completed": "Đã hoàn thành",
  "billing1.history.status.failed": "Thất bại",
  "billing1.history.status.terminated": "Đã dừng",
  "billing1.history.receipt.runActive":
    "Lần chạy này vẫn đang hoạt động. Các khoản phí và điều chỉnh có thể tiếp tục.",
  "billing1.history.receipt.noNetChange":
    "Không thay đổi ròng số dư tín dụng của bạn.",
  "billing1.history.receipt.runRecorded":
    "Các khoản phí và điều chỉnh đã ghi cho lần chạy này.",
  "billing1.history.receipt.copilotTools":
    "Công cụ block trả phí trong đoạn hội thoại này. Mức dùng đăng ký gói được theo dõi riêng.",
  "billing1.history.receipt.blockUsage":
    "Một lần gọi block trả phí không thuộc lần chạy workflow nào.",
  "billing1.history.receipt.refunded":
    "Tín dụng bị trừ khỏi số dư sau khi khoản thanh toán được hoàn.",
  "billing1.history.receipt.subscription":
    "Khoản thanh toán này được trừ từ số dư tín dụng của bạn.",
  "billing1.history.receipt.noChange": "Không thay đổi số dư tín dụng của bạn.",
  "billing1.history.charge.usage": "Dùng block",
  "billing1.history.charge.executionFee": "Phí thực thi",
  "billing1.history.charge.adjustment": "Điều chỉnh mức dùng",
  "billing1.history.charge.transaction": "Thay đổi số dư",
  "billing1.history.charge.fallback": "Thay đổi số dư",

  "billing1.table.aria": "Giao dịch tín dụng tự động hoá",
  "billing1.table.activity": "Hoạt động",
  "billing1.table.lastActivity": "Hoạt động gần nhất",
  "billing1.table.amount": "Số tiền",
  "billing1.table.details": "Chi tiết",
  "billing1.table.latestFirst": "Khoản phí và tín dụng mới nhất trước",
  "billing1.table.retryLoadMore": "Thử tải thêm lại",
  "billing1.table.loadMore": "Tải thêm",
  "billing1.table.endOfHistory": "Hết lịch sử",
  "billing1.table.loadMoreError":
    "Không tải được các giao dịch cũ hơn. Lịch sử đã tải của bạn vẫn khả dụng.",
  "billing1.table.loadingMore": "Đang tải các giao dịch cũ hơn",
  "billing1.table.loadedCount": "Đã tải {count} giao dịch",

  "billing1.receipt.blockUsage": "Dùng block",
  "billing1.receipt.executionFees": "Phí thực thi",
  "billing1.receipt.usageAdjustment": "Điều chỉnh mức dùng",
  "billing1.receipt.netChangeSoFar": "Thay đổi ròng đến hiện tại",
  "billing1.receipt.netChange": "Thay đổi ròng",
  "billing1.receipt.aria": "Biên lai tín dụng {name}",
  "billing1.receipt.chargesForRun": "Các khoản phí cho lần chạy này",
  "billing1.receipt.chargesForRunOnly": "Chỉ các khoản phí cho lần chạy này",
  "billing1.receipt.toolUsage": "Dùng công cụ trong hội thoại này",
  "billing1.receipt.balanceChange": "Thay đổi số dư tín dụng",

  "billing1.entries.hide": "Ẩn các mục phí",
  "billing1.entries.show": "Hiện các mục phí",
  "billing1.entries.hideReference": "Ẩn tham chiếu",
  "billing1.entries.showReference": "Tham chiếu",
  "billing1.entries.runId": "ID lần chạy",
  "billing1.entries.chatId": "ID đoạn chat",
  "billing1.entries.reference": "Tham chiếu",
  "billing1.entries.aria": "Các mục phí đã ghi",
  "billing1.entries.dateTime": "Ngày và giờ",
  "billing1.entries.charge": "Khoản phí",
  "billing1.entries.amount": "Số tiền",
  "billing1.entries.truncated":
    "Đang hiển thị {shown} trên {total} mục phí. Tổng số bao gồm mọi khoản phí và điều chỉnh.",

  "billing1.metadata.runStatus": "Trạng thái lần chạy",
  "billing1.metadata.started": "Bắt đầu",
  "billing1.metadata.version": "Phiên bản",
  "billing1.metadata.lastActivity": "Hoạt động gần nhất",
  "billing1.metadata.creditsAsOf": "Tín dụng tại thời điểm",
  "billing1.metadata.viewTask": "Xem tác vụ",
  "billing1.metadata.viewConversation": "Xem hội thoại",
  "billing1.metadata.runUnavailable": "Lần chạy không khả dụng",
  "billing1.metadata.notInLibrary": "Không có trong thư viện của bạn",
  "billing1.metadata.workflowRunUnavailable":
    "Workflow và lần chạy không khả dụng",
  "billing1.metadata.conversationUnavailable": "Hội thoại không khả dụng",

  "billing1.relations.startedBy": "Bắt đầu bởi",
  "billing1.relations.otherWorkflows":
    "Các workflow khác được lần chạy này dùng",
  "billing1.relations.note":
    "Mọi khoản phí tín dụng cho các lần chạy liên quan hiển thị riêng.",
  "billing1.relations.noteSuffix":
    " Trang tác vụ tính cả các lần chạy liên quan trong tổng của nó.",
  "billing1.relations.moreHidden":
    "Một số lần chạy liên quan khác không được hiển thị ở đây.",

  "billing1.row.soFar": "đến hiện tại",
  "billing1.row.openDetails": "Mở chi tiết cho {name}, {date} lúc {time}",
  "billing1.row.closeDetails": "Đóng chi tiết cho {name}, {date} lúc {time}",
  "billing1.row.details": "Chi tiết",

  "billing1.usage.title": "Mức dùng",
  "billing1.usage.runs": "· {runs} lượt chạy",
  "billing1.usage.last30": "30 ngày qua",
  "billing1.usage.barEmptyAria": "{date}: $0,00, 0 lượt chạy",
  "billing1.usage.barAria": "{date}: ${amount}, {runs} lượt chạy",

  "billing1.apUsage.aria": "Mức dùng",
  "billing1.apUsage.title": "Mức dùng",
  "billing1.apUsage.noLimit": "Không giới hạn mức dùng",
  "billing1.apUsage.choosePlan": "Chọn gói để tiếp tục làm việc",
  "billing1.apUsage.noLimitBody":
    "Gói của bạn không có giới hạn mức dùng hằng ngày hay hằng tuần.",
  "billing1.apUsage.choosePlanBody":
    "Chọn gói để tiếp tục làm việc với các đoạn hội thoại và workflow đã lưu.",
  "billing1.apUsage.lifetimeTitle":
    "Một hạn mức cho toàn bộ thời gian dùng thử",
  "billing1.apUsage.lifetimeBody":
    "Hạn mức này kéo dài suốt thời gian dùng thử. Nó không làm mới mỗi ngày hay mỗi tuần.",
  "billing1.apUsage.workSaved": "Công việc của bạn vẫn được lưu.",
  "billing1.apUsage.allowanceNote":
    "Yêu cầu lớn hơn dùng nhiều hạn mức hơn. Chạm giới hạn không bao giờ phát sinh thêm phí.",
  "billing1.apUsage.used": "đã dùng",
  "billing1.apUsage.usedAria": "đã dùng {percent}%",
  "billing1.apUsage.progressAria": "Mức dùng {label}",
  "billing1.apUsage.today": "Hôm nay",
  "billing1.apUsage.thisWeek": "Tuần này",
  "billing1.apUsage.trialUsage": "Mức dùng thử",
  "billing1.apUsage.trialEnds": "Dùng thử kết thúc",
  "billing1.apUsage.reached": "Đã đạt hạn mức",
  "billing1.apUsage.low": "Sắp hết",
  "billing1.apUsage.plenty": "Còn nhiều",

  "billing1.usageUnavailable.errorTitle": "Không tải được mức dùng của bạn",
  "billing1.usageUnavailable.errorBody":
    "Gói và công việc của bạn không bị ảnh hưởng. Hãy thử lại sau ít phút.",
  "billing1.usageUnavailable.tryAgain": "Thử lại",
  "billing1.usageUnavailable.contactSupport": "Liên hệ hỗ trợ",
};
