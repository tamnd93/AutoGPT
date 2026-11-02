import { Build5En } from "./build-5.en";

export const Build5Vi: Partial<Record<keyof typeof Build5En, string>> = {
  "build5.graphContent.foundOne": "Tìm thấy {count} node",
  "build5.graphContent.foundMany": "Tìm thấy {count} node",
  "build5.graphContent.noMatch": "Không tìm thấy node nào khớp tìm kiếm",
  "build5.graphContent.startTyping": "Bắt đầu nhập để tìm node",
  "build5.searchBar.placeholder":
    "Tìm block, đầu vào, đầu ra trong workflow này...",

  "build5.noSearchResult.title": "Không có kết quả phù hợp",
  "build5.noSearchResult.body": "Thử điều chỉnh từ khoá tìm kiếm",

  "build5.readOnly.viewing":
    "Bạn đang xem bản sao chỉ đọc của workflow này.",
  "build5.readOnly.duplicateHint": "Nhân bản để chỉnh sửa.",
  "build5.readOnly.libraryHint":
    "Thêm vào thư viện của bạn để bật nhân bản.",
  "build5.readOnly.duplicate": "Nhân bản",
  "build5.readOnly.dismiss": "Bỏ qua",

  "build5.undoRedo.undo": "Hoàn tác",
  "build5.undoRedo.redo": "Làm lại",

  "build5.loadError.notFound": "Không tìm thấy workflow",
  "build5.loadError.notAuthorized":
    "Không có quyền xem workflow này",
  "build5.loadError.failed": "Không tải được workflow",
  "build5.loadError.unexpected": "Đã xảy ra lỗi không mong muốn.",

  "build5.saveError.validationTitle": "Không lưu được workflow",
  "build5.saveError.validationBody":
    "{message}. Sửa các trường được đánh dấu rồi lưu lại.",
  "build5.saveError.title": "Lỗi khi lưu workflow",

  "build5.skipped.singleTitle": "Một preset trigger cần cấu hình lại",
  "build5.skipped.manyTitle": "Một số preset trigger cần cấu hình lại",
  "build5.skipped.singleBody":
    "{names} được giữ ở phiên bản trước vì phiên bản mới dùng trigger khác. Cấu hình lại trigger của nó trên phiên bản mới để tiếp tục chạy.",
  "build5.skipped.manyBody":
    "{names} được giữ ở phiên bản trước vì phiên bản mới dùng trigger khác. Cấu hình lại trigger của chúng trên phiên bản mới để tiếp tục chạy.",
};
