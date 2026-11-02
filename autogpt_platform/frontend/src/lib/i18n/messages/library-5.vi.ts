import { library5En } from "./library-5.en";

export const library5Vi: Partial<Record<keyof typeof library5En, string>> = {
  "library5.prompt.idHint":
    " Dùng find_library_agent với agent_id chính xác {id} để tra cứu.",

  "library5.prompt.error":
    'Đã xảy ra gì với {name}? Nó báo "{message}" — bạn kiểm tra nhật ký giúp tôi và cho biết cần sửa gì nhé?',
  "library5.prompt.running":
    "Cho tôi cập nhật trạng thái lượt chạy của {name} — tới giờ nó tìm được gì?",
  "library5.prompt.stale":
    "{name} lâu rồi chưa chạy. Tôi nên giữ hay cập nhật rồi chạy lại?",
  "library5.prompt.warning":
    'Lượt chạy trước của {name} đã xong nhưng nó báo "{message}". Bước nào lỗi, vì sao và tôi sửa thế nào?',
  "library5.prompt.success":
    "Cho tôi xem {name} tìm được gì trong lượt chạy trước — tóm tắt kết quả và các điểm chính.",
  "library5.prompt.listening":
    "{name} đang lắng nghe gì? Tóm tắt cấu hình trigger của nó giúp tôi.",
  "library5.prompt.scheduled": "Khi nào {name} chạy tiếp theo?",
  "library5.prompt.idle":
    "{name} đã nhàn rỗi. Tôi nên giữ hay cập nhật rồi chạy lại?",

  "library5.folderColor.blue": "Xanh dương",
  "library5.folderColor.purple": "Tím",
  "library5.folderColor.green": "Xanh lá",
  "library5.folderColor.orange": "Cam",
  "library5.folderColor.pink": "Hồng",

  "library5.folderCreate.created": "Đã tạo thư mục",
  "library5.folderCreate.createdBody":
    "Thư mục của bạn đã được tạo thành công.",
  "library5.folderCreate.failed": "Tạo thư mục thất bại. Vui lòng thử lại.",
  "library5.folderCreate.title": "Tạo thư mục",
  "library5.folderCreate.name": "Tên thư mục",
  "library5.folderCreate.namePlaceholder": "Nhập tên thư mục",
  "library5.folderCreate.color": "Màu thư mục",
  "library5.folderCreate.colorPlaceholder": "Chọn một màu",

  "library5.folderDelete.deleted": "Đã xoá thư mục",
  "library5.folderDelete.deletedBody": '"{name}" đã bị xoá.',
  "library5.folderDelete.failed": "Xoá thư mục thất bại. Vui lòng thử lại.",
  "library5.folderDelete.title": "Xoá thư mục",
  "library5.folderDelete.body":
    "Bạn có chắc muốn xoá “{name}”? Các workflow trong thư mục này sẽ được chuyển về thư viện của bạn.",
  "library5.folderDelete.confirm": "Xoá thư mục",

  "library5.folderEdit.exists": "Đã có thư mục trùng tên này",
  "library5.folderEdit.failed": "Cập nhật thư mục thất bại. Vui lòng thử lại.",
  "library5.folderEdit.updated": "Đã cập nhật thư mục",
  "library5.folderEdit.updatedBody":
    "Thư mục của bạn đã được cập nhật thành công.",
  "library5.folderEdit.title": "Chỉnh sửa thư mục",

  "library5.importDialog.title": "Nhập",
  "library5.importDialog.agentTab": "Workflow AutoGPT",
  "library5.importDialog.platformTab": "Nền tảng khác",

  "library5.upload.title": "Tải workflow lên",
  "library5.upload.workflowName": "Tên workflow",
  "library5.upload.workflowDescription": "Mô tả workflow",
  "library5.upload.workflowFile": "Tệp workflow",
  "library5.upload.uploading": "Đang tải lên...",
  "library5.upload.upload": "Tải lên",
  "library5.upload.successTitle": "Thành công",
  "library5.upload.successBody": "Tải workflow lên thành công",
  "library5.upload.errorUploading": "Lỗi khi tải workflow lên",
  "library5.upload.noWorkflow": "Không có workflow nào để lưu",

  "library5.external.filePlaceholder":
    "Tệp workflow (n8n, Make.com, Zapier, ...)",
  "library5.external.importing": "Đang nhập...",
  "library5.external.importToOtto": "Nhập vào Otto",
  "library5.external.url": "URL workflow",
  "library5.external.importFromUrl": "Nhập từ URL",
  "library5.external.promptImport":
    "Nhập workflow này và tạo lại thành workflow AutoGPT",
  "library5.external.uploadFailed": "Tải lên thất bại",
  "library5.external.couldNotUpload": "Không tải được tệp lên.",
  "library5.external.couldNotFetch": "Không lấy được workflow",
  "library5.external.invalidJson": "JSON không hợp lệ",
  "library5.external.invalidFile": "Tệp không hợp lệ",
  "library5.external.invalidJsonBody": "Tệp tải lên không phải JSON hợp lệ.",
  "library5.external.couldNotRead": "Không đọc được tệp đã tải lên.",

  "library5.search.label": "Tìm workflow",
  "library5.search.placeholder": "Tìm workflow",

  "library5.sort.hint": "sắp xếp theo",
  "library5.sort.lastModified": "Sửa đổi gần nhất",
  "library5.sort.createdAt": "Ngày tạo",
  "library5.sort.lastRun": "Lần chạy gần nhất",

  "library5.move.moved": "Đã chuyển workflow",
  "library5.move.title": "Chuyển vào thư mục",
  "library5.move.search": "Tìm thư mục",
  "library5.move.searchPlaceholder": "Tìm thư mục...",

  "library5.status.running": "Đang chạy",
  "library5.status.listening": "Đang lắng nghe",

  "library5.folderCreate.trigger": "Tạo thư mục",
  "library5.card.tasks": "{count} công việc",
  "library5.tabs.all": "Tất cả",
  "library5.tabs.favorites": "Yêu thích",
};
