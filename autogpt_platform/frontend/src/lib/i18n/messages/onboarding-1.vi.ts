import { onboarding1En } from "./onboarding-1.en";

export const onboarding1Vi: Partial<
  Record<keyof typeof onboarding1En, string>
> = {
  "onboarding1.page.errorPaymentContext": "thanh toán của bạn",
  "onboarding1.page.confirmingSubscription":
    "Đang xác nhận gói đăng ký của bạn…",
  "onboarding1.page.confirmingTrial":
    "Đang xác nhận bản dùng thử và thẻ của bạn…",
  "onboarding1.page.loading": "Đang tải thiết lập của bạn…",
  "onboarding1.page.errorAccountContext": "thiết lập tài khoản của bạn",
  "onboarding1.page.errorTrialContext": "bản dùng thử của bạn",
  "onboarding1.page.back": "Quay lại",
  "onboarding1.page.logout": "Đăng xuất",

  "onboarding1.progress.errorContext": "tiến độ onboarding của bạn",
  "onboarding1.progress.reload": "Tải lại tiến độ mới nhất",
  "onboarding1.saver.localFailed":
    "Tiến độ của bạn chưa được lưu. Vui lòng giữ trang này mở trong khi chúng tôi thử lại.",
  "onboarding1.saver.remoteFailed":
    "Chúng tôi không lưu được tiến độ vào tài khoản của bạn. Chúng tôi sẽ tiếp tục thử lại; bạn có thể tiếp tục tại đây.",

  "onboarding1.checklist.done": "Đã xong",
  "onboarding1.checklist.active": "Đang thực hiện",
  "onboarding1.checklist.pending": "Chưa làm",

  "onboarding1.dump.micUnavailable":
    "Chúng tôi không mở được micro của bạn. Bạn có thể viết thay vào đây.",
  "onboarding1.dump.timeLimit":
    "Đó là 30 phút, mức tối đa chúng tôi ghi trong một lần. Đang lưu tất cả…",
  "onboarding1.dump.processing": "Đã hiểu. Chờ một chút…",

  "onboarding1.typed.label": "Bản ghi suy nghĩ của bạn",
  "onboarding1.typed.placeholder":
    "Việc gì lặp lại mỗi tuần? Bạn muốn giao việc gì trước?",
  "onboarding1.typed.done": "Xong rồi",
  "onboarding1.typed.tooLong":
    "Vượt quá giới hạn {max} ký tự; hãy rút gọn và thử lại.",
  "onboarding1.typed.charsLeftOne": "còn lại {left} ký tự",
  "onboarding1.typed.charsLeftOther": "còn lại {left} ký tự",

  "onboarding1.recording.encouragement.gold": "Cứ kể tiếp, rất đáng giá",
  "onboarding1.recording.encouragement.share":
    "Bạn càng chia sẻ nhiều, Otto càng hiểu bạn hơn",
  "onboarding1.recording.encouragement.memory":
    "Bạn đang xây dựng ký ức cho Otto",
  "onboarding1.recording.encouragement.great": "Bạn làm tốt lắm. Cứ kể tiếp",
  "onboarding1.recording.encouragement.detail":
    "Mỗi chi tiết đều làm Otto hữu ích hơn",
  "onboarding1.recording.encouragement.next": "Kể điều tiếp theo bạn nghĩ tới",
  "onboarding1.recording.feedback.duration":
    "Một phút cũng quý. Cứ kể tiếp nếu bạn còn nhiều điều muốn nói.",
  "onboarding1.recording.silenceNudge":
    "Bắt đầu từ đâu cũng được. Hôm qua bạn làm gì mà thấy chán?",
  "onboarding1.recording.offline":
    "Bạn đang ngoại tuyến. Chúng tôi sẽ gửi khi bạn kết nối lại.",
  "onboarding1.recording.elapsedAria": "{seconds} giây đã ghi",
  "onboarding1.recording.download": "Tải bản ghi",

  "onboarding1.failure.storageFailed":
    "Chúng tôi không lưu được bản ghi của bạn.",
  "onboarding1.failure.noAudio": "Bản ghi của bạn không đến được chúng tôi.",
  "onboarding1.failure.uploadFailed":
    "Một phần bản ghi của bạn không đến được chúng tôi.",
  "onboarding1.failure.transcriptionFailed":
    "Chúng tôi không chuyển được bản ghi thành văn bản.",
  "onboarding1.failure.transcriptionUnavailable":
    "Dịch vụ chuyển giọng nói thành văn bản đang không khả dụng.",
  "onboarding1.failure.qualityCheck":
    "Chúng tôi không kiểm tra được điều bạn vừa kể.",
  "onboarding1.failure.superseded":
    "Một bản mới hơn bạn đã gửi, có thể từ tab khác, đã thay thế bản này.",
  "onboarding1.failure.rateLimited":
    "Bạn đã thử vài lần rồi. Hãy chờ một chút.",
  "onboarding1.failure.unavailable":
    "Tính năng cá nhân hoá tạm thời không khả dụng.",
  "onboarding1.failure.network":
    "Chúng tôi không kết nối được máy chủ. Hãy kiểm tra kết nối của bạn.",
  "onboarding1.failure.voiceSafe": "Bản ghi của bạn vẫn an toàn. Hãy thử lại.",
  "onboarding1.failure.typedSafe":
    "Nội dung bạn viết vẫn an toàn. Hãy thử lại.",
  "onboarding1.common.continueWithout": "Tiếp tục mà không có nó",

  "onboarding1.ambient.exampleLabel": "Ví dụ",
  "onboarding1.ambient.pause": "Tạm dừng đổi gợi ý",

  "onboarding1.insufficient.voiceBody":
    "Chúng tôi nghe được bạn, nhưng chưa đủ thông tin về công việc để cá nhân hoá. Chỉ cần vài câu về việc bạn làm — bằng bất kỳ ngôn ngữ nào.",
  "onboarding1.insufficient.typedBody":
    "Chưa đủ thông tin về công việc của bạn để cá nhân hoá. Chỉ cần vài câu về việc bạn làm — bằng bất kỳ ngôn ngữ nào.",
  "onboarding1.insufficient.recordAgain": "Ghi lại",
  "onboarding1.insufficient.addMore": "Thêm chi tiết",
  "onboarding1.insufficient.typeInstead": "Viết thay",

  "onboarding1.mic.blocked.reason":
    "Trình duyệt của bạn đã chặn micro, nên hãy viết ở đây.",
  "onboarding1.mic.blocked.howTo":
    "Để nói, hãy cho phép micro trong phần cài đặt trang của trình duyệt (biểu tượng ổ khóa hoặc micro cạnh thanh địa chỉ), sau đó",
  "onboarding1.mic.dismissed.reason":
    "Hộp thoại xin quyền micro đã bị đóng, nên hãy viết ở đây.",
  "onboarding1.mic.dismissed.howTo": "Để nói,",
  "onboarding1.mic.unavailable.reason":
    "Chúng tôi không mở được micro của bạn, nên hãy viết ở đây.",
  "onboarding1.mic.unavailable.howTo":
    "Để nói, hãy kiểm tra micro đã kết nối và không ứng dụng nào khác đang dùng, sau đó",
  "onboarding1.mic.system.reason":
    "Máy tính của bạn đã chặn micro, nên hãy viết ở đây.",
  "onboarding1.mic.system.howTo":
    "Để nói, hãy cho trình duyệt dùng micro trong phần cài đặt quyền riêng tư của máy, sau đó",
  "onboarding1.mic.retry": "thử lại micro",

  "onboarding1.mode.editText": "sửa nội dung đã viết",
  "onboarding1.mode.typeInstead": "viết thay",
  "onboarding1.mode.recordInstead": "ghi âm thay",

  "onboarding1.prompt.label": "Otto có thể sẽ hỏi",
  "onboarding1.prompt.another": "Câu hỏi khác",
  "onboarding1.prompt.announce": "Otto có thể sẽ hỏi: {question}",

  "onboarding1.privacy.note":
    "Chỉ mình bạn thấy · Lưu làm ký ức của Otto · Tải xuống bất cứ lúc nào",

  "onboarding1.recording.pending.cancel": "Đang xoá bản ghi này…",
  "onboarding1.recording.pending.send": "Đang gửi bản ghi của bạn…",
  "onboarding1.recording.pending.retry": "Đang bắt đầu bản ghi mới…",
  "onboarding1.recording.cancel": "Huỷ ghi âm",
  "onboarding1.recording.cancelPending": "Đang huỷ ghi âm",
  "onboarding1.recording.send": "Gửi bản ghi",
  "onboarding1.recording.sendPending": "Đang gửi bản ghi",
  "onboarding1.recording.retry": "Ghi lại",
  "onboarding1.recording.retryPending": "Đang ghi lại",
  "onboarding1.recording.discard.title": "Xoá bản ghi?",
  "onboarding1.recording.discard.body":
    "Bản ghi hiện tại sẽ bị xoá vĩnh viễn. Bạn có thể tiếp tục ghi hoặc xoá và bắt đầu lại.",
  "onboarding1.recording.discard.keep": "Tiếp tục ghi",
  "onboarding1.recording.discard.confirm": "Xoá bản ghi",

  "onboarding1.recovery.title": "Tiếp tục từ chỗ đã dừng?",
  "onboarding1.recovery.keptPrefix": "Chúng tôi đã giữ phần",
  "onboarding1.recovery.keptSuffix": "bạn đã ghi.",
  "onboarding1.recovery.use": "Dùng bản ghi đó",
  "onboarding1.recovery.startOver": "Bắt đầu lại",

  "onboarding1.rest.talk": "Nói",
  "onboarding1.rest.write": "Viết",
  "onboarding1.skip": "Bỏ qua",

  "onboarding1.header.failure": "Không gửi được.",
  "onboarding1.header.typing": "Viết cho tôi về công việc của bạn",
  "onboarding1.header.insufficientVoice": "Chúng tôi chưa nghe đủ.",
  "onboarding1.header.insufficientTyped": "Hãy kể thêm một chút.",
  "onboarding1.rest.lead":
    "Kể tôi nghe bạn làm gì và việc gì ngốn thời gian của bạn.",
  "onboarding1.rest.mid":
    "Otto dùng thông tin đó để chọn expert và lên kế hoạch cho tuần đầu của bạn.",
  "onboarding1.rest.tail": "Một phút là đủ, và bạn có thể viết thay.",
  "onboarding1.typing.lead":
    "Việc gì lặp lại mỗi tuần, và bạn muốn giao việc gì trước?",
  "onboarding1.typing.tail": "Vài câu là đủ.",

  "onboarding1.orb.start": "Bắt đầu nói",
  "onboarding1.orb.retry": "Thử lại",
};
