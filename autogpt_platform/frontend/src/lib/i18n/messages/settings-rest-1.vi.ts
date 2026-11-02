import { settingsRest1En } from "./settings-rest-1.en";

export const settingsRest1Vi: Partial<
  Record<keyof typeof settingsRest1En, string>
> = {
  "settingsRest1.info.key": "Khoá",
  "settingsRest1.info.description": "Mô tả",
  "settingsRest1.info.scopes": "Phạm vi quyền",
  "settingsRest1.info.created": "Ngày tạo",
  "settingsRest1.info.lastUsed": "Dùng lần cuối",
  "settingsRest1.info.noScopes": "Không có phạm vi quyền",
  "settingsRest1.info.v1Only": "· chỉ v1",
  "settingsRest1.info.neverUsed": "Chưa dùng lần nào",

  "settingsRest1.list.errorContext": "khoá API",
  "settingsRest1.empty.title": "Chưa có khoá API nào",
  "settingsRest1.empty.body":
    "Bạn chưa tạo khoá API nào. Hãy tạo một khoá để bắt đầu dùng API của Nền tảng AutoGPT.",
  "settingsRest1.skeleton.loading": "Đang tải khoá API",

  "settingsRest1.row.select": "Chọn {name}",
  "settingsRest1.row.viewDetails": "Xem chi tiết của {name}",
  "settingsRest1.row.viewKeyDetails": "Xem chi tiết khoá",
  "settingsRest1.row.delete": "Xoá {name}",
  "settingsRest1.selection.selected": "Đã chọn {count}",
  "settingsRest1.selection.selectAll": "Chọn tất cả",
  "settingsRest1.selection.deselect": "Bỏ chọn",
  "settingsRest1.selection.deleteSelected": "Xoá mục đã chọn",

  "settingsRest1.header.title": "Khoá API AutoGPT",
  "settingsRest1.header.bodyPrefix":
    "Quản lý khoá API cho phép công cụ bên ngoài truy cập tài khoản AutoGPT của bạn. Xem",
  "settingsRest1.header.apiDocs": "tài liệu API",
  "settingsRest1.header.bodySuffix": "để bắt đầu.",
  "settingsRest1.header.create": "Tạo khoá",

  "settingsRest1.create.titleSuccess": "Khoá API mới của bạn",
  "settingsRest1.create.title": "Tạo khoá API",
  "settingsRest1.form.name": "Tên",
  "settingsRest1.form.namePlaceholder": "Khoá tích hợp của tôi",
  "settingsRest1.form.description": "Mô tả (tuỳ chọn)",
  "settingsRest1.form.descriptionPlaceholder": "Mô tả khoá này dùng để làm gì",
  "settingsRest1.form.submit": "Tạo khoá",
  "settingsRest1.success.warning":
    "Hãy sao chép khoá ngay. Vì lý do bảo mật, chúng tôi sẽ không hiển thị lại.",
  "settingsRest1.success.copied": "Đã sao chép vào clipboard",
  "settingsRest1.success.copyFailed": "Không sao chép được vào clipboard",
  "settingsRest1.success.copyManually":
    "Vui lòng sao chép khoá theo cách thủ công.",
  "settingsRest1.success.copy": "Sao chép",
  "settingsRest1.success.close": "Đóng",
  "settingsRest1.permissions.title": "Quyền",

  "settingsRest1.schema.nameRequired": "Cần nhập tên",
  "settingsRest1.schema.nameTooLong": "Tên phải có 100 ký tự trở xuống",
  "settingsRest1.schema.descriptionTooLong":
    "Mô tả phải có 500 ký tự trở xuống",
  "settingsRest1.schema.permissionRequired": "Chọn ít nhất một quyền",

  "settingsRest1.delete.titleOne": "Thu hồi khoá API?",
  "settingsRest1.delete.titleMany": "Thu hồi {count} khoá API?",
  "settingsRest1.delete.bodyPrefix":
    "Hành động này không thể hoàn tác. Các tích hợp đang dùng",
  "settingsRest1.delete.thisKey": "khoá này",
  "settingsRest1.delete.theseKeys": "các khoá này",
  "settingsRest1.delete.bodySuffix": "sẽ mất quyền truy cập ngay lập tức.",
  "settingsRest1.delete.cancel": "Huỷ",
  "settingsRest1.delete.revokeMany": "Thu hồi các khoá",
  "settingsRest1.delete.revokeOne": "Thu hồi khoá",

  "settingsRest1.hooks.created": "Đã tạo khoá API",
  "settingsRest1.hooks.createFailed": "Không tạo được khoá API",
  "settingsRest1.hooks.revokedOne": "Đã thu hồi khoá API",
  "settingsRest1.hooks.revokedMany": "Đã thu hồi {count} khoá API",
  "settingsRest1.hooks.someFailed": "Một số khoá API không thu hồi được",
  "settingsRest1.hooks.failedCount": "{failed}/{total} thất bại.",
  "settingsRest1.list.used": "Đã dùng {relative}",

  "settingsRest1.bots.title": "Bot",
  "settingsRest1.bots.body":
    "Kết nối bot AutoGPT với các nền tảng chat của bạn. Thêm bot vào một máy chủ, liên kết kênh DM để bot trò chuyện trực tiếp với bạn, hoặc bỏ liên kết hiện có.",
  "settingsRest1.bots.errorContext": "bot",
  "settingsRest1.bots.emptyTitle": "Chưa bật bot nào",
  "settingsRest1.bots.emptyBody":
    "Hiện chưa có nền tảng chat-bot nào trên bản triển khai này.",
  "settingsRest1.notice.lead": "Các cuộc trò chuyện đến qua bot bắt đầu bằng",
  "settingsRest1.notice.bridge": ", kết nối bạn đã chọn trong",
  "settingsRest1.notice.link": "Gói AI",

  "settingsRest1.card.iconAlt": "Biểu tượng {name}",
  "settingsRest1.card.pending": "Đang chờ — hoàn tất trong {platform}",
  "settingsRest1.card.openIn": "Mở AutoGPT trong {platform}",
  "settingsRest1.card.messageBot": "Nhắn cho bot trên {platform}",
  "settingsRest1.card.addBotTo": "Thêm bot vào {platform}",
  "settingsRest1.card.addToServer": "Thêm vào {noun}",
  "settingsRest1.card.directMessages": "Tin nhắn trực tiếp",
  "settingsRest1.card.linkedServers": "{noun} đã liên kết",

  "settingsRest1.dm.userFallback": "Người dùng {id}",
  "settingsRest1.dm.pendingTitle": "{noun} “{name}” đã kết nối — còn một bước",
  "settingsRest1.dm.linkPrompt":
    "Nhắn trực tiếp cho bot trên {platform} để liên kết",
  "settingsRest1.dm.linkedSubtitle":
    "Kênh DM của bạn đã được liên kết với tài khoản này.",
  "settingsRest1.dm.pendingSubtitle":
    "Nhắn cho bot trong {platform} và nhấn Link Account để kết nối DM của bạn.",
  "settingsRest1.dm.idleSubtitle":
    "Gửi tin nhắn trực tiếp cho bot để bắt đầu quá trình liên kết.",
  "settingsRest1.dm.unlinkAria": "Bỏ liên kết DM trên {platform}",
  "settingsRest1.dm.unlink": "Bỏ liên kết",
  "settingsRest1.dm.notLinked": "Chưa liên kết",

  "settingsRest1.server.emptyLead": "Chưa liên kết {noun} nào. Dùng",
  "settingsRest1.server.emptyMid": "để mời bot — đã thêm rồi? Chạy",
  "settingsRest1.server.emptyTail": "ở đó để hoàn tất kết nối.",
  "settingsRest1.server.nameUnavailable": "Không có tên",
  "settingsRest1.server.nameTooltip":
    "{platform} không cung cấp tên cho {noun} này. Nó vẫn được liên kết và dùng được; hãy bỏ liên kết để xoá dòng này.",
  "settingsRest1.server.linkedByYou": "Bạn đã liên kết",
  "settingsRest1.server.unlinkAria": "Bỏ liên kết {label}",
  "settingsRest1.server.unlink": "Bỏ liên kết",

  "settingsRest1.botFail.title": "Không thể {action}",
  "settingsRest1.botFail.retry": "Vui lòng thử lại sau giây lát.",
  "settingsRest1.botFail.unlinkServer": "bỏ liên kết máy chủ",
  "settingsRest1.botFail.unlinkDm": "bỏ liên kết DM",

  "settingsRest1.creator.title": "Bảng điều khiển người sáng tạo",
  "settingsRest1.creator.body":
    "Theo dõi các bài gửi của bạn trên marketplace, xem hiệu suất và phát hành cập nhật cho các workflow bạn công bố.",
  "settingsRest1.creator.submit": "Gửi workflow",
};
