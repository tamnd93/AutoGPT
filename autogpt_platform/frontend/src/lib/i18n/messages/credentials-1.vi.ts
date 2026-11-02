import { credentials1En } from "./credentials-1.en";

export const credentials1Vi: Partial<
  Record<keyof typeof credentials1En, string>
> = {
  "credentials1.dialog.cancel": "Huỷ",
  "credentials1.dialog.addNew": "Thêm mới",
  "credentials1.dialog.granting": "Đang cấp quyền…",
  "credentials1.dialog.updateThisAccount": "Cập nhật tài khoản này",
  "credentials1.dialog.useThisAccount": "Dùng tài khoản này",
  "credentials1.dialog.useExisting": "Dùng tài khoản có sẵn",
  "credentials1.dialog.connecting": "Đang kết nối…",
  "credentials1.dialog.continue": "Tiếp tục",

  "credentials1.existing.titleGrant": "Cấp cho chuyên gia này quyền dùng {name}",
  "credentials1.existing.titleChoose": "Chọn một tài khoản {name}",
  "credentials1.existing.titleUpdate": "Cập nhật một tài khoản {name}",
  "credentials1.existing.descGrant":
    "Tài khoản của bạn đã được kết nối nhưng chuyên gia này chưa dùng được. Chọn một tài khoản để chia sẻ, hoặc thêm tài khoản mới.",
  "credentials1.existing.descChoose":
    "Bạn có nhiều tài khoản đã kết nối. Chọn tài khoản chat này nên dùng, hoặc thêm tài khoản mới.",
  "credentials1.existing.descUpdate":
    "Không tài khoản nào trong các tài khoản đã kết nối có quyền cần thiết. Chọn tài khoản để đăng nhập lại, hoặc thêm tài khoản mới.",
  "credentials1.existing.accountLabel": "Tài khoản",
  "credentials1.existing.typeOAuth": "OAuth",
  "credentials1.existing.typeApiKey": "Khoá API",
};
