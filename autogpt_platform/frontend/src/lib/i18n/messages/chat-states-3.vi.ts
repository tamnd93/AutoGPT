import { ChatStates3En } from "./chat-states-3.en";

export const ChatStates3Vi: Partial<Record<keyof typeof ChatStates3En, string>> = {
  "chatStates3.sharing.title": "Chia sẻ trò chuyện này",
  "chatStates3.sharing.warning1":
    "Ai có liên kết cũng sẽ thấy cuộc trò chuyện này. Đừng chia sẻ nếu nó chứa bí mật bạn đã dán, thông tin cá nhân hoặc thông tin xác thực bạn không muốn công khai.",
  "chatStates3.sharing.livePrefix": "Chia sẻ ở chế độ",
  "chatStates3.sharing.liveWord": "trực tiếp",
  "chatStates3.sharing.liveSuffix":
    ": tin nhắn mới, lượt chạy workflow và tệp thêm sau khi bật chia sẻ cũng sẽ hiển thị. Dừng chia sẻ để thu hồi quyền truy cập.",
  "chatStates3.sharing.currentlySharing": "Đang chia sẻ",
  "chatStates3.sharing.aboutToShare": "Sắp chia sẻ",
  "chatStates3.sharing.messageOne": "tin nhắn",
  "chatStates3.sharing.messages": "tin nhắn",
  "chatStates3.sharing.runOne": "{count} lượt chạy workflow",
  "chatStates3.sharing.runs": "{count} lượt chạy workflow",
  "chatStates3.sharing.fileOne": "{count} tệp trong workspace",
  "chatStates3.sharing.files": "{count} tệp trong workspace",
  "chatStates3.sharing.toggleTitle":
    "Chia sẻ lượt chạy workflow trong trò chuyện này",
  "chatStates3.sharing.toggleBody":
    "Bao gồm mọi lượt chạy của cuộc trò chuyện này, kể cả các lượt chạy sau khi bạn chia sẻ.",
  "chatStates3.sharing.toggleAria":
    "Chia sẻ lượt chạy workflow trong trò chuyện này",
  "chatStates3.sharing.shareLink": "Liên kết chia sẻ",
  "chatStates3.sharing.copied": "Đã sao chép",
  "chatStates3.sharing.copy": "Sao chép",
  "chatStates3.sharing.confirmStop": "Xác nhận dừng chia sẻ",
  "chatStates3.sharing.stop": "Dừng chia sẻ",
  "chatStates3.sharing.enable": "Bật chia sẻ",
  "chatStates3.sharing.toastFailedEnable": "Bật chia sẻ thất bại",
  "chatStates3.sharing.toastTryAgain": "Vui lòng thử lại.",
  "chatStates3.sharing.toastEnabled": "Đã bật chia sẻ trò chuyện",
  "chatStates3.sharing.toastEnabledBody":
    "Ai có liên kết đều có thể xem cuộc trò chuyện này. Có thể thu hồi bất cứ lúc nào.",
  "chatStates3.sharing.toastDisabled": "Đã tắt chia sẻ trò chuyện",
  "chatStates3.sharing.toastDisabledBody":
    "Liên kết chia sẻ không còn truy cập được.",
  "chatStates3.sharing.toastFailedDisable": "Tắt chia sẻ thất bại",
  "chatStates3.sharing.toastFailedCopy": "Sao chép liên kết thất bại",

  "chatStates3.pause.paused": "Tạm dừng",
  "chatStates3.pause.notStarted": "Chưa bắt đầu",
  "chatStates3.pause.budgetToday": "ngân sách hôm nay",
  "chatStates3.pause.budgetWeek": "ngân sách tuần này",
  "chatStates3.pause.titleOutOfBudget": "{lead} · hết ngân sách",
  "chatStates3.pause.titleOutOfBudgetNamed": "{lead} · hết {budget}",
  "chatStates3.pause.titleTrial": "{lead} · đã dùng hết gói dùng thử",
  "chatStates3.pause.titleSizeLimit":
    "Tạm dừng · tác vụ này đã tới giới hạn kích thước",
  "chatStates3.pause.titleLongRun":
    "Tạm dừng · kiểm tra sau một lượt chạy dài",
  "chatStates3.pause.saved": "{name} đã lưu tiến độ ở trên.",
  "chatStates3.pause.stopped": "{name} đã bị dừng trước khi kịp tóm tắt tiến độ.",
  "chatStates3.pause.budgetReset": "{saved} Ngân sách của bạn đã được đặt lại.",
  "chatStates3.pause.budgetResets":
    "{saved} Ngân sách của bạn đặt lại {reset}.",
  "chatStates3.pause.stepsDone": "đã chạy {steps} bước cho việc này",
  "chatStates3.pause.stepsWhile": "đã làm việc này khá lâu",
  "chatStates3.pause.stepsSaved":
    "{name} {done} và đã tóm tắt tiến độ ở trên.",
  "chatStates3.pause.stepsStopped":
    "{name} {done} và đã bị dừng trước khi kịp tóm tắt tiến độ.",
  "chatStates3.pause.notStartedTrial":
    "{name} không bắt đầu vì bạn đã dùng hết gói dùng thử.",
  "chatStates3.pause.notStartedGeneric": "{name} không bắt đầu việc này.",
  "chatStates3.pause.notStartedNoBudget":
    "{name} không bắt đầu vì bạn đã hết ngân sách.",
  "chatStates3.pause.notStartedBudgetBack":
    "{name} không bắt đầu vì bạn đã hết {budget}. Ngân sách đã được đặt lại.",
  "chatStates3.pause.notStartedBudgetLead":
    "{name} không bắt đầu vì bạn đã hết {budget}.",
  "chatStates3.pause.resetSuffix": "{lead} Đặt lại {reset}.",
  "chatStates3.pause.resetAtTime": "lúc {time}",
  "chatStates3.pause.resetAtDay": "{day} lúc {time}",
  "chatStates3.pause.resetInMinutes": "sau {minutes} phút",
  "chatStates3.pause.resetInHours": "sau {hours} giờ",
  "chatStates3.pause.resetInHoursMin": "sau {hours} giờ {rest} phút",
  "chatStates3.pause.resetInDay": "sau 1 ngày",
  "chatStates3.pause.resetInDays": "sau {days} ngày",
  "chatStates3.pause.resumeAt": "Chạy tiếp {at}",
  "chatStates3.pause.resumeAtReset": "Chạy tiếp khi đặt lại",
  "chatStates3.pause.noteStopped": "Dừng ở đây",
  "chatStates3.pause.notePickedBackUp": "Đã chạy tiếp",
  "chatStates3.pause.keepGoing": "Chạy tiếp",
  "chatStates3.pause.stopHere": "Dừng ở đây",
  "chatStates3.pause.upgrade": "Nâng cấp",
  "chatStates3.pause.continueOn": "Tiếp tục trên {name}",
  "chatStates3.pause.resumes": "Chạy tiếp {at}",
  "chatStates3.pause.continueUnsupported":
    "Trò chuyện này giờ chạy trên Microsoft 365 Copilot, không thể tiếp tục tác vụ đã tạm dừng. Chuyển kết nối về lại để chạy tiếp.",
  "chatStates3.pause.choosePlan": "Chọn gói để chạy tiếp.",
  "chatStates3.pause.tryAgain": "Thử lại sau giây lát.",
  "chatStates3.pause.allowanceDoesntReset": "Hạn mức này không đặt lại",
  "chatStates3.pause.upgradeToKeepGoing": "Nâng cấp để chạy tiếp.",
  "chatStates3.pause.couldntCheckBudget": "Không kiểm tra được ngân sách",
  "chatStates3.pause.couldntSetResume": "Không đặt được lịch chạy tiếp",
  "chatStates3.pause.couldntPickBackUp": "Không thể chạy tiếp việc này",
  "chatStates3.pause.couldntCancelResume": "Không huỷ được lịch chạy tiếp",
};
