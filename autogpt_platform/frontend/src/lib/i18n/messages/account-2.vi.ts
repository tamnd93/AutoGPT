import { account2En } from "./account-2.en";

export const account2Vi: Partial<Record<keyof typeof account2En, string>> = {
  "account2.profile.title": "Hồ sơ",
  "account2.profile.body":
    "Quản lý cách bạn xuất hiện trên Marketplace — ảnh, handle, giới thiệu và liên kết.",
  "account2.profile.errorContext": "hồ sơ",

  "account2.header.changePhotoAria": "Đổi ảnh hồ sơ",
  "account2.header.avatarAlt": "Hồ sơ",
  "account2.header.displayName": "Tên hiển thị",
  "account2.header.namePlaceholder": "Nguyễn Văn A",
  "account2.header.handle": "Tên người dùng",
  "account2.header.handlePlaceholder": "nguyen_van_a",

  "account2.saveBar.discard": "Bỏ thay đổi",
  "account2.saveBar.save": "Lưu thay đổi",

  "account2.validation.nameRequired": "Cần nhập tên hiển thị",
  "account2.validation.nameTooLong": "Tên hiển thị phải dưới 50 ký tự",
  "account2.validation.handleRequired": "Cần nhập tên người dùng",
  "account2.validation.handleInvalid":
    "Dùng 2–30 chữ cái, số, dấu gạch dưới hoặc gạch ngang",
  "account2.validation.bioTooLong": "Phần giới thiệu phải dưới {max} ký tự",

  "account2.use.uploadFailed": "Không tải được ảnh lên",
  "account2.use.planRequired": "Tải ảnh lên cần một gói đang hoạt động",
  "account2.use.saved": "Đã lưu hồ sơ",
  "account2.use.saveFailed": "Không lưu được hồ sơ",
};
