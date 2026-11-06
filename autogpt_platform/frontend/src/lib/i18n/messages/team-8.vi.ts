import { team8En } from "./team-8.en";

export const team8Vi: Partial<Record<keyof typeof team8En, string>> = {
  "team8.common.chat": "Trò chuyện",

  "team8.autopilot.blurb":
    "Chuyên gia tổng quát có sẵn của bạn. Nó trả lời câu hỏi, chạy workflow và giao việc cho các chuyên gia bạn đã tuyển.",

  "team8.about.bio": "Tiểu sử",
  "team8.about.identity": "Danh tính",
  "team8.about.worksWith": "Làm việc với",
  "team8.about.boundaries": "Giới hạn",
  "team8.about.identityValue":
    "Otto là chuyên gia tổng quát đứng đầu đội của bạn. Nó trao đổi trực tiếp với bạn, trả lời câu hỏi và chạy workflow khi bạn yêu cầu.",
  "team8.about.worksWithValue":
    "Mọi chuyên gia bạn tuyển. Otto biết từng người làm được gì, giao việc cho đúng chuyên gia rồi báo lại cho bạn.",
  "team8.about.boundariesValue":
    "Otto hỏi trước khi thực hiện hành động ra bên ngoài thay bạn và không bao giờ tự sửa Soul của chuyên gia.",

  "team8.header.builtIn": "Có sẵn",

  "team8.skills.heading": "Kỹ năng của Otto",
  "team8.skills.empty":
    "Chưa có kỹ năng nào. Kỹ năng trong thư viện mà chưa chuyên gia nào nhận sẽ hiện ở đây.",
  "team8.skills.noMatch": "Không có kỹ năng phù hợp.",
  "team8.skills.listAria": "Kỹ năng của Otto",

  "team8.page.errorHint": "Không tải được đội của bạn.",
  "team8.page.subtitle": "Có sẵn, luôn ở trong đội của bạn.",
  "team8.page.tabBasics": "Cơ bản",
  "team8.page.tabSchedules": "Lịch",
  "team8.page.tabWorkflows": "Workflow",
  "team8.page.tabSkills": "Kỹ năng",
  "team8.page.teamSchedules": "Lịch của đội",
  "team8.page.expertNameYourTeam": "đội của bạn",
  "team8.page.workflowsEmpty":
    "Workflow trong thư viện mà chưa chuyên gia nào sở hữu sẽ hiện ở đây.",

  "team8.card.viewAria": "Xem {name}",
  "team8.card.singularSchedule": "lịch",
  "team8.card.singularSkill": "kỹ năng",
  "team8.card.singularWorkflow": "workflow",

  "team8.backToTeam": "Về Đội",

  "team8.empty.title": "Chưa tuyển chuyên gia nào",
  "team8.empty.body":
    "Tuyển một chuyên gia từ marketplace và họ sẽ hiện ở đây, sẵn sàng làm việc cùng Otto.",
  "team8.empty.browse": "Xem marketplace",
  "team8.empty.create": "Tạo chuyên gia",

  "team8.teamCard.editSoulAria": "Sửa Soul",
  "team8.teamCard.viewAria": "Xem {name}",
  "team8.teamCard.budget": "Ngân sách",
  "team8.teamCard.noBudget": "Chưa có ngân sách",
  "team8.teamCard.unsupervised": "Không giám sát",
  "team8.teamCard.schedulesPaused": "Lịch đã tạm dừng",
  "team8.teamCard.resumeSchedules": "Tiếp tục lịch",
  "team8.teamCard.installWorkflow": "Cài workflow",
  "team8.teamCard.resumeFailedTitle": "Không tiếp tục được lịch",
  "team8.teamCard.retrySetupFailedTitle": "Không thử lại được thiết lập",

  "team8.cover.working": "Đang làm việc",

  "team8.status.settingUp": "Đang thiết lập kỹ năng và workflow cho {name}…",
  "team8.status.couldNotInstall": "Không cài được: {failures}",
  "team8.status.setupDidntFinish": "Thiết lập chưa xong",
  "team8.status.retry": "Thử thiết lập lại",

  "team8.spend.aria": "Chi tiêu hằng tuần",
  "team8.spend.value": "{spent} trên {budget} đã chi trong tuần này",
  "team8.spend.valueOverBudget":
    "{spent} trên {budget} đã chi trong tuần này (vượt ngân sách)",

  "team8.integrationIcons.aria": "Tích hợp",
  "team8.integrationIcons.access":
    "{name} có quyền dùng tài khoản {service} của bạn",
  "team8.integrationIcons.more": "+{count} nữa",

  "team8.setupNeeded.aria": "Cần thiết lập",
  "team8.setupNeeded.heading": "Cần thiết lập ({count})",
  "team8.setupNeeded.itemsAria": "Mục cần thiết lập",

  "team8.setupRow.allow": "Cho phép",
  "team8.setupRow.connect": "Kết nối",
  "team8.setupRow.needsPlatformKey": "Cần key nền tảng",
  "team8.setupRow.openWorkflow": "Mở workflow",
  "team8.setupRow.workflowFallback": "một workflow",
  "team8.setupRow.serviceFallback": "Một dịch vụ",
  "team8.setupRow.credentialTitle": "{provider} cho {expert}",
  "team8.setupRow.credentialDetail":
    "{workflow} cần thông tin này để chạy theo lịch.",
  "team8.setupRow.scheduleTitle": "Lên lịch {workflow} cho {expert}",
  "team8.setupRow.inputsDetail": "Cần {list} trước khi có thể chạy theo lịch.",
  "team8.setupRow.readyDetail":
    "Mọi kết nối đã sẵn sàng; vẫn cần tạo lịch chạy.",
  "team8.setupRow.inputsFallback": "vài thông tin từ bạn",
  "team8.setupRow.inputsJoiner": "{rest} và {last}",

  "team8.common.cancel": "Huỷ",

  "team8.drawer.chatWithAria": "Chat với {name}",
  "team8.drawer.closeLabel": "Đóng bảng chat",
  "team8.drawer.newTask": "Tác vụ mới",
  "team8.drawer.openInChat": "Mở trong Chat",
  "team8.drawer.opening": "Đang mở chat…",
  "team8.drawer.whatCanIDo": "Tôi có thể giúp gì cho bạn?",
  "team8.drawer.placeholder": "Nhắn cho {name}…",
  "team8.drawer.startFailedTitle": "Không bắt đầu được chat",
  "team8.drawer.messageNotSent": "Tin nhắn chưa gửi",
  "team8.drawer.unsentNewTask":
    "Bạn đã bắt đầu tác vụ mới trước khi tin nhắn được gửi.",
  "team8.drawer.unsentStopped":
    "Bạn đã dừng phản hồi trước khi tin nhắn được gửi.",
  "team8.drawer.unsentWithFiles":
    "{reason} Nội dung đã trở lại ô nhập; hãy đính kèm lại các tệp.",
  "team8.drawer.unsentNoFiles": "{reason} Hãy đính kèm lại các tệp để gửi.",
  "team8.drawer.sendFailedTitle": "Không gửi được tin nhắn",
  "team8.drawer.sendRecoveryText": "tin nhắn của bạn đã trở lại ô nhập",
  "team8.drawer.sendRecoveryFiles": "các tệp của bạn chưa được gửi",

  "team8.fire.title": "Cho {name} rời đội?",
  "team8.fire.checking": "Đang kiểm tra những gì sẽ tạm dừng…",
  "team8.fire.previewFailed":
    "Không xem trước được những gì sẽ tạm dừng, nhưng bạn vẫn có thể cho chuyên gia rời đội.",
  "team8.fire.intro":
    "Đây là chính xác những gì xảy ra khi bạn cho {name} rời đội.",
  "team8.fire.lineWorkflows": "Workflow đã cài vẫn ở trong thư viện của bạn.",
  "team8.fire.lineHistory": "Lịch sử chat vẫn xem được nhưng chỉ đọc.",
  "team8.fire.lineWork": "Công việc của họ vẫn thuộc về bạn.",
  "team8.fire.retryPreview": "Thử lại xem trước",
  "team8.fire.pausingNow": "Đang tạm dừng",
  "team8.fire.keepName": "Giữ {name}",
  "team8.fire.fireName": "Cho {name} rời đội",
  "team8.fire.automationNone": "Không có tự động hoá nào bị tạm dừng.",
  "team8.fire.automationOne": "{count} tự động hoá sẽ tạm dừng.",
  "team8.fire.automationMany": "{count} tự động hoá sẽ tạm dừng.",

  "team8.newPod.title": "Pod mới",
  "team8.newPod.nameLabel": "Tên pod",
  "team8.newPod.namePlaceholder": "ví dụ: Growth",
  "team8.newPod.create": "Tạo pod",

  "team8.pods.title": "Pod",
  "team8.pods.podAria": "Pod {name}",
  "team8.pods.back": "Về danh sách pod",
  "team8.pods.openPod": "Mở pod {name}",
  "team8.pods.expertOne": "{count} chuyên gia",
  "team8.pods.expertMany": "{count} chuyên gia",
  "team8.pods.emptyOpen":
    "Chưa có chuyên gia trong pod này. Chuyển một chuyên gia vào từ menu trên thẻ.",
  "team8.pods.emptyFolder": "Chưa có chuyên gia trong pod này.",
  "team8.pods.noPods": "Chưa có pod nào",
  "team8.pods.intro":
    "Nhóm các chuyên gia vào pod để công việc liên quan ở cạnh nhau.",
  "team8.pods.newPod": "Pod mới",
  "team8.pods.removedToast": "Đã gỡ khỏi pod",
  "team8.pods.movedToToast": "Đã chuyển sang {name}",
  "team8.pods.movedToast": "Đã chuyển chuyên gia",
};
