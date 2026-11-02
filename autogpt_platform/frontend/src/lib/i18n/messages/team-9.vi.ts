import { Team9En } from "./team-9.en";

export const Team9Vi: Partial<Record<keyof typeof Team9En, string>> = {
  "team9.page.title": "Đội ngũ",
  "team9.page.subtitle":
    "Otto và những chuyên gia bạn đã thuê, sẵn sàng làm việc.",
  "team9.page.errorContext": "đội ngũ của bạn",
  "team9.page.errorHint": "Không tải được danh sách chuyên gia đã thuê.",

  "team9.header.createExpert": "Tạo một chuyên gia",
  "team9.header.hireExpert": "Thuê chuyên gia",

  "team9.filter.all": "Tất cả chuyên gia",
  "team9.filter.scheduled": "Theo lịch",
  "team9.filter.needsSetup": "Cần thiết lập",
  "team9.filter.paused": "Tạm dừng",
  "team9.filter.label": "Lọc chuyên gia",

  "team9.toolbar.search": "Tìm chuyên gia",

  "team9.roster.aria": "Chuyên gia",
  "team9.roster.noMatches":
    "Không có chuyên gia nào khớp tìm kiếm hoặc bộ lọc.",

  "team9.soul.title": "Soul của {name}",
  "team9.soul.closeAria": "Đóng bảng Soul",
  "team9.soul.intro": "Một tài liệu sống định hình mọi câu trả lời.",
  "team9.soul.cancel": "Huỷ",
  "team9.soul.save": "Lưu Soul",
  "team9.soul.name": "Tên",
  "team9.soul.identity": "Danh tính và tính cách",
  "team9.soul.voice": "Giọng văn",
  "team9.soul.voicePlaceholder": "Chuyên gia này nên nói như thế nào?",
  "team9.soul.boundaries": "Giới hạn",
  "team9.soul.boundariesPlaceholder":
    "Chuyên gia này nên tránh gì hoặc hỏi trước điều gì?",
  "team9.soul.protectedRules": "Quy tắc được bảo vệ",
  "team9.soul.protectedRulesNote":
    "Những quy tắc này thuộc soul của mọi chuyên gia và không thể sửa.",
  "team9.soul.saved": "Đã lưu Soul",
  "team9.soul.saveFailedTitle": "Không lưu được Soul",
  "team9.soul.saveFailedBody":
    "Các chỉnh sửa của bạn vẫn còn ở đây. Vui lòng thử lại.",

  "team9.learnedNotes.title": "Những gì tôi đã học",
  "team9.learnedNotes.error":
    "Không tải được những gì chuyên gia này đã học.",
  "team9.learnedNotes.empty":
    "Chưa ghi nhận gì. Những gì chuyên gia này học sẽ xuất hiện ở đây.",
  "team9.learnedNotes.intro":
    "Ghi nhận từ các cuộc hội thoại của bạn. Hãy quên những gì không nên giữ lại.",
  "team9.learnedNotes.forget": "Quên",
  "team9.learnedNotes.seeAll": "Xem tất cả trong cài đặt ký ức",
  "team9.learnedNotes.forgotten": "Đã quên",
  "team9.learnedNotes.forgetFailedTitle": "Không thể quên ký ức đó",
  "team9.learnedNotes.retry": "Vui lòng thử lại.",

  "team9.setup.grantFailed": "Không thêm được tích hợp",
  "team9.setup.granted": "{name} giờ có thể dùng {service}",

  "team9.hire.joined": "{name} đã gia nhập đội của bạn",
  "team9.hire.installing": "Kỹ năng và workflow của họ đang được cài đặt.",
  "team9.hire.viewTeam": "Xem đội ngũ",
  "team9.hire.failed": "Không thuê được {name}",
  "team9.hire.failedBody": "Đã xảy ra lỗi. Vui lòng thử lại.",
  "team9.hire.voiceFailedTitle": "Không lưu được giọng văn",
  "team9.hire.voiceFailedBody":
    "Bạn có thể đặt sau trong trình chỉnh sửa Soul.",
};
export const team9Vi = Team9Vi;
