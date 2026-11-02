import { Integrations1En } from "./integrations-1.en";

export const Integrations1Vi: Partial<
  Record<keyof typeof Integrations1En, string>
> = {
  "integrations1.panel.title": "Công cụ mà expert và workflow của bạn dùng",
  "integrations1.available.title": "Tích hợp có thể kết nối",
  "integrations1.available.description":
    "Kết nối dịch vụ của bạn, gồm cả tích hợp chính thức từ nhà cung cấp. Một số dịch vụ cần thiết lập thêm.",
  "integrations1.available.noMatch": "Không có dịch vụ nào khớp tìm kiếm.",
  "integrations1.available.empty": "Không có dịch vụ nào.",
  "integrations1.available.count": "{shown}/{total} dịch vụ",
  "integrations1.available.showMore": "Xem thêm dịch vụ",

  "integrations1.credential.forChats": "Dùng cho chat",
  "integrations1.credential.managed": "Do hệ thống quản lý",
  "integrations1.credential.managedHint": "AutoGPT quản lý — không thể xoá",
  "integrations1.credential.select": "Chọn {title}",
  "integrations1.credential.delete": "Xoá {title}",
  "integrations1.credential.blocksNote":
    "Block {service} trong workflow cần kết nối riêng.",
  "integrations1.credential.type.apiKey": "Khoá API",
  "integrations1.credential.type.oauth": "OAuth",
  "integrations1.credential.type.userPassword": "Tên đăng nhập/Mật khẩu",
  "integrations1.credential.type.hostScoped": "Theo máy chủ",
  "integrations1.credential.type.deviceAuth": "Xác thực thiết bị",
  "integrations1.credential.masked.username": "Tên đăng nhập: {username}",
  "integrations1.credential.masked.apiKey": "Đã cấu hình khoá API",
  "integrations1.credential.masked.oauth": "Đã kết nối qua OAuth",
  "integrations1.credential.masked.userPassword":
    "Đã đặt tên đăng nhập/mật khẩu",
  "integrations1.credential.masked.configured": "Đã cấu hình",

  "integrations1.delete.forceTitleOne": "Buộc xoá {name}?",
  "integrations1.delete.forceTitleMany": "Buộc xoá {count} tích hợp?",
  "integrations1.delete.removeTitleOne": "Xoá {name}?",
  "integrations1.delete.removeTitleMany": "Xoá {count} tích hợp?",
  "integrations1.delete.thisIntegration": "tích hợp này",
  "integrations1.delete.forceMessageOne":
    "Thông tin đăng nhập này đang được một webhook hoặc workflow hoạt động dùng. Buộc xoá có thể làm hỏng nó.",
  "integrations1.delete.forceMessageMany":
    "Những thông tin đăng nhập này đang được webhook hoặc workflow hoạt động dùng. Buộc xoá có thể làm hỏng chúng.",
  "integrations1.delete.removeMessageOne":
    "Không thể hoàn tác. Expert và workflow đang dùng thông tin đăng nhập này sẽ mất quyền truy cập ngay.",
  "integrations1.delete.removeMessageMany":
    "Không thể hoàn tác. Expert và workflow đang dùng những thông tin đăng nhập này sẽ mất quyền truy cập ngay.",
  "integrations1.delete.force": "Buộc xoá",
  "integrations1.delete.remove": "Xoá",
  "integrations1.delete.cancel": "Huỷ",
  "integrations1.delete.toast.removedOne": "Đã xoá {name}",
  "integrations1.delete.toast.removed": "Đã xoá tích hợp",
  "integrations1.delete.toast.removedMany": "Đã xoá {count} tích hợp",
  "integrations1.delete.toast.more": " +{count} mục nữa",
  "integrations1.delete.toast.failedOne": "Không xoá được tích hợp",
  "integrations1.delete.toast.failedMany": "Không xoá được {count} tích hợp",
  "integrations1.delete.toast.failedSome":
    "{failed}/{attemptable} mục không xoá được",
  "integrations1.delete.toast.failedBody":
    "{names}. Thử lại để thử lại các mục bị lỗi.",

  "integrations1.list.codexNotice":
    "Chat mới sẽ không chạy bằng gói ChatGPT của bạn nữa — chúng dùng kết nối do AutoGPT chọn. Lịch sử chat được giữ lại, các tích hợp khác không bị ảnh hưởng.",
  "integrations1.skeleton.loading": "Đang tải tích hợp",

  "integrations1.empty.noMatch":
    'Không có tích hợp nào bạn đã kết nối khớp với "{query}".',
  "integrations1.empty.title": "Chưa kết nối tích hợp nào",
  "integrations1.empty.description":
    "Kết nối một dịch vụ để expert và workflow của bạn dùng được các công cụ bên thứ ba như GitHub, Gmail hay Figma.",

  "integrations1.search.placeholder": "Tìm tích hợp...",
  "integrations1.search.label": "Tìm tích hợp",

  "integrations1.selection.selected": "Đã chọn {count}",
  "integrations1.selection.selectAll": "Chọn tất cả",
  "integrations1.selection.deselect": "Bỏ chọn",
  "integrations1.selection.delete": "Xoá mục đã chọn",
};
