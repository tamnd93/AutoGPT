import { home1En } from "./home-1.en";

export const home1Vi: Partial<Record<keyof typeof home1En, string>> = {
  "home1.greeting.hey": "Chào",
  "home1.greeting.there": "bạn",
  "home1.greeting.nameJoin": " ",
  "home1.greeting.loader": "Đang viết lời chào của bạn",

  "home1.hero.expertPrefix": "Tôi là",
  "home1.hero.ottoPrefix": "Cho",
  "home1.hero.ottoSuffix":
    "biết về công việc của bạn, và Otto sẽ tìm xem việc gì có thể tự động hoá.",

  "home1.intro.otto":
    "Cho tôi biết về công việc của bạn — tôi sẽ tìm xem việc gì có thể tự động hoá.",
  "home1.intro.expert": "Tôi là {name}{suffix}",
  "home1.intro.withRole": ", {role} của bạn. Tôi nên nhận việc gì?",
  "home1.intro.noRole": ". Tôi nên nhận việc gì?",

  "home1.placeholder.expert": "{name} nên làm gì?",
  "home1.placeholder.discovery":
    "Vai trò của bạn là gì và việc gì chiếm nhiều thời gian nhất?",
  "home1.placeholder.discoveryShort": "Tôi là đầu bếp và tôi ghét...",
  "home1.placeholder.discoveryLong":
    "Vai trò của bạn là gì và việc gì chiếm nhiều thời gian nhất? Ví dụ: 'Tôi là nhân viên tuyển dụng và tôi ghét...'",
  "home1.placeholder.team":
    "Đội của bạn nên làm gì? Ví dụ: 'Theo dõi khách hàng tiềm năng của hôm qua'",
  "home1.placeholder.afterDump": "Otto nên nhận việc gì trước?",

  "home1.kickoff.openingExpert": "Đang mở không gian làm việc của {name}",
  "home1.kickoff.opening": "Đang mở không gian làm việc",
  "home1.kickoff.starting": "Expert của bạn đang chuẩn bị bắt đầu.",

  "home1.suggested.label": "Việc nên làm trước",
  "home1.suggested.inProgress": "Đang thực hiện",
  "home1.suggested.starting": "Đang bắt đầu",
  "home1.suggested.hide": "Ẩn: {title}",
  "home1.suggested.hideAll": "Ẩn tất cả",
  "home1.suggested.hidden": "Đã ẩn gợi ý",
  "home1.suggested.hiddenAll": "Đã ẩn các gợi ý",
  "home1.suggested.undo": "Hoàn tác",
  "home1.suggested.updateFailed": "Không cập nhật được gợi ý",
  "home1.suggested.tryAgain": "Vui lòng thử lại.",
  "home1.suggested.startFailed": "Không bắt đầu được việc đó",

  "home1.introCard.copyFailed": "Không sao chép được bản ghi lời nói",
  "home1.introCard.clipboardBlocked":
    "Trình duyệt của bạn đã chặn quyền truy cập clipboard.",
  "home1.introCard.copyAria": "Sao chép bản ghi lời nói của bạn",
  "home1.introCard.copied": "Đã sao chép!",
  "home1.introCard.copyTooltip": "Sao chép mọi điều bạn đã kể",
  "home1.introCard.footerWithTasks":
    "Muốn làm việc khác? Chỉ cần viết vào ô bên dưới.",
  "home1.introCard.footerNoTasks":
    "Cho tôi biết bạn muốn bắt đầu việc gì trong ô bên dưới.",

  "home1.editName.title": "Sửa tên hiển thị",
  "home1.editName.label": "Tên hiển thị",
  "home1.editName.placeholder": "Tên của bạn",
  "home1.editName.save": "Lưu",
  "home1.editName.saved": "Đã cập nhật tên",
  "home1.editName.saveFailed": "Không cập nhật được tên",
  "home1.editName.unknownError": "Lỗi không xác định",
  "home1.editName.sessionFailed":
    "Đã lưu tên, nhưng làm mới phiên đăng nhập thất bại",

  "home1.header.title": "Tóm tắt của bạn",
  "home1.recap.error": "Không tải được bản tóm tắt Trang chủ",
  "home1.recap.loading": "Đang tải Trang chủ…",

  "home1.team.title": "Đội của bạn",
  "home1.team.statusWorking": "{working} đang làm · {ready} sẵn sàng",
  "home1.team.statusReady": "{ready} sẵn sàng nhận việc",
  "home1.team.emptyTitle": "Xây dựng đội của bạn",
  "home1.team.emptyBody": "Tuyển một expert để bắt đầu giao việc.",
  "home1.team.browse": "Xem các expert",
  "home1.team.viewAll": "Xem tất cả {total} expert",
  "home1.team.open": "Mở đội của bạn",

  "home1.agent.nextRun": "Lần chạy tới {when}",
  "home1.agent.noDetail": "Chưa có thông tin trạng thái.",
  "home1.agent.manageFailed": "Mở Quản lý để xem việc gần đây.",
  "home1.agent.manageSetup": "Mở Quản lý để hoàn tất cài đặt.",
  "home1.agent.managePaused": "Mở Quản lý để xem lại cài đặt.",
  "home1.agent.openChat": "Mở Đoạn chat để giao việc.",
  "home1.agent.chatAria": "Chat với {name}",
  "home1.agent.manageAria": "Quản lý {name}",

  "home1.status.working": "Đang làm",
  "home1.status.ready": "Sẵn sàng",
  "home1.status.needsSetup": "Hoàn tất cài đặt",
  "home1.status.paused": "Tạm dừng",
  "home1.status.failed": "Thất bại",
  "home1.status.unknown": "Không rõ",

  "home1.needsYou.title": "Cần bạn",
  "home1.needsYou.badgeOne": "{count} mục cần bạn xử lý",
  "home1.needsYou.badgeOther": "{count} mục cần bạn xử lý",
  "home1.needsYou.filterPrefix": "Lọc mục cần xử lý",
  "home1.needsYou.filter.all": "Tất cả",
  "home1.needsYou.filter.approval": "Phê duyệt",
  "home1.needsYou.filter.setup": "Cài đặt",
  "home1.needsYou.filter.paused": "Tạm dừng",
  "home1.needsYou.filter.credits": "Credit",
  "home1.needsYou.filter.question": "Câu hỏi",

  "home1.attention.waiting": "Đang chờ",
  "home1.attention.approve": "Duyệt",
  "home1.attention.decline": "Từ chối",
  "home1.attention.confirmDecline": "Xác nhận từ chối",
  "home1.attention.pressAgainDecline": "Nhấn lại để từ chối {title}",
  "home1.aria.action": "{action}: {title}",

  "home1.toast.approved": "Đã duyệt",
  "home1.toast.declined": "Đã từ chối",
  "home1.toast.approveFailed": "Không duyệt được",
  "home1.toast.declineFailed": "Không từ chối được",
  "home1.toast.reviewFailed": "Không xử lý được mục này.",
  "home1.toast.tryAgain": "Thử lại.",

  "home1.held.cantUndo": "Không thể hoàn tác",
  "home1.held.approve": "Duyệt",
  "home1.held.release": "Cho đọc",
  "home1.held.reject": "Từ chối",
  "home1.held.keepOut": "Giữ ngoài",
  "home1.held.review": "Xem xét",
  "home1.held.confirm": "Xác nhận {action}",
  "home1.held.confirmPrompt":
    "Nhấn lại để {action} {title}. {who} sẽ được báo là chưa chạy.",
  "home1.held.sendFailed":
    "Không gửi được câu trả lời. Không có gì đã chạy. Thử lại.",
  "home1.held.passageLabel": "Nội dung ghi",

  "home1.review.dialogLabel": "Mục đang chờ",
  "home1.review.allHeld": "Tất cả mục đang chờ",
  "home1.review.heldCalls": "Mục đang chờ",
  "home1.review.previous": "Trước",
  "home1.review.next": "Tiếp",
  "home1.review.position": "{position}/{total}",
  "home1.review.toReview": "Cần xem xét",
  "home1.review.left": "Còn {left}/{total}",
  "home1.review.new": "mới",
  "home1.review.jumpHint": "Chạm một mục để chuyển tới",
  "home1.review.keysHint": "← → di chuyển · Esc đóng",
  "home1.review.finished": "Đã xem xét tất cả {total}",
  "home1.review.done": "Xong",
  "home1.review.openChat": "Mở đoạn chat",
};
