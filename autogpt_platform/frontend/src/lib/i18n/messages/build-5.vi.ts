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

  "build5.save.tooltip": "Lưu",
  "build5.save.name": "Tên",
  "build5.save.namePlaceholder": "Nhập tên workflow của bạn",
  "build5.save.description": "Mô tả",
  "build5.save.descriptionPlaceholder": "Mô tả workflow của bạn",
  "build5.save.version": "Phiên bản",
  "build5.save.saveWorkflow": "Lưu workflow",
  "build5.save.nameRequired": "Cần nhập tên",
  "build5.save.successTitle": "Đã lưu workflow",
  "build5.save.successBody": "Workflow đã được lưu thành công.",
  "build5.save.noChangesTitle": "Không có thay đổi để lưu",
  "build5.save.noChangesBody": "Workflow giống bản đã lưu.",
  "build5.duplicate.failedTitle": "Nhân bản workflow thất bại",
  "build5.duplicate.forkError":
    "Bản sao không trả về workflow để mở.",
  "build5.marketplace.failedAddTitle":
    "Không thêm được workflow vào thư viện",
  "build5.marketplace.addedTitle": "Đã thêm workflow",
  "build5.marketplace.addedBody":
    "Workflow đã được thêm vào thư viện và builder của bạn",
  "build5.marketplace.versionNotFound":
    "Không tìm thấy phiên bản bài đăng cửa hàng",
  "build5.myAgents.failedAddTitle":
    "Không thêm được workflow vào builder",
  "build5.myAgents.errorContext": "menu block",
  "build5.myAgents.requestFailed": "Yêu cầu thất bại",
  "build5.myAgents.errorFallback": "Đã xảy ra lỗi",

  "build5.ugc.edited": "Đã sửa {ago}",
  "build5.addBlock.outsideView": "Block được thêm ngoài vùng xem hiện tại",
  "build5.addBlock.showBlock": "Xem block",
  "build5.suggestion.untitledSearch": "Tìm kiếm chưa đặt tên",
  "build5.addAgent.detailsFailed": "Không lấy được thông tin workflow",

};
