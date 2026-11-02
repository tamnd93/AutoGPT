import { Artifacts2En } from "./artifacts-2.en";

export const Artifacts2Vi: Partial<Record<keyof typeof Artifacts2En, string>> = {
  "artifacts2.upload.retry": "Vui lòng thử lại.",
  "artifacts2.upload.uploadedOne": "Đã tải tệp lên",
  "artifacts2.upload.uploadedMany": "Đã tải {count} tệp lên",
  "artifacts2.upload.leftAtRootTitle": "Đã tải lên thư mục gốc thay thế",
  "artifacts2.upload.leftAtRootBody":
    "Không thể chuyển {files} vào thư mục này.",
  "artifacts2.upload.failedTitle": "Không tải được {name} lên",

  "artifacts2.newMenu.new": "Mới",
  "artifacts2.newMenu.uploading": "Đang tải lên…",
  "artifacts2.newMenu.uploadFile": "Tải tệp lên",
  "artifacts2.newMenu.newFolder": "Thư mục mới",

  "artifacts2.selection.selected": "Đã chọn {count}",
  "artifacts2.selection.selectAll": "Chọn tất cả {count}",
  "artifacts2.selection.moveToFolder": "Chuyển vào thư mục",
  "artifacts2.selection.delete": "Xoá",
  "artifacts2.selection.deleting": "Đang xoá…",
  "artifacts2.selection.clearAria": "Bỏ chọn",
  "artifacts2.selection.deleteFailedCount":
    "Không xoá được {failed} trên {total} tệp.",
  "artifacts2.selection.deletedOne": "Đã xoá tệp",
  "artifacts2.selection.deletedMany": "Đã xoá {count} tệp",
  "artifacts2.selection.deleteFailedTitle": "Không xoá được tệp",
  "artifacts2.selection.retry": "Vui lòng thử lại.",
  "artifacts2.selection.confirmOne": "Xoá \"{name}\"?",
  "artifacts2.selection.confirmMany": "Xoá {count} tệp?",
  "artifacts2.selection.moveSubjectMany": "{count} tệp",

  "artifacts2.viewer.downloadFailedTitle": "Không tải được tệp xuống",
  "artifacts2.viewer.retry": "Vui lòng thử lại.",
  "artifacts2.viewer.preview": "Xem trước",
  "artifacts2.viewer.source": "Mã nguồn",
  "artifacts2.viewer.download": "Tải xuống",
  "artifacts2.viewer.downloading": "Đang tải xuống…",

  "artifacts2.downloadOnly.message": "Không thể xem trước loại tệp này.",
  "artifacts2.downloadOnly.download": "Tải xuống",

  "artifacts2.office.slide":
    "Đang hiển thị trang chiếu đầu tiên. Tải xuống để mở toàn bộ bài trình bày.",
  "artifacts2.office.page":
    "Đang hiển thị trang đầu tiên. Tải xuống để mở toàn bộ tệp.",

  "artifacts2.rename.title": "Đổi tên tệp",
  "artifacts2.rename.label": "Tên tệp",
  "artifacts2.rename.placeholder": "Nhập tên tệp",
  "artifacts2.rename.save": "Lưu",
};
export const artifacts2Vi = Artifacts2Vi;
