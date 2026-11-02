import { credentials2En } from "./credentials-2.en";

export const credentials2Vi: Partial<Record<keyof typeof credentials2En, string>> =
  {
    "credentials2.failed.completeOAuth":
      "Không hoàn tất được đăng nhập OAuth",
    "credentials2.failed.completeMcpOAuth":
      "Không hoàn tất được đăng nhập OAuth MCP",
    "credentials2.failed.createApiKey":
      "Không tạo được thông tin kết nối API key",
    "credentials2.failed.createPassword":
      "Không tạo được thông tin kết nối tên/mật khẩu",
    "credentials2.failed.createHostScoped":
      "Không tạo được thông tin kết nối theo host",
    "credentials2.failed.deleteCredentials":
      "Không xoá được thông tin kết nối",
    "credentials2.failed.loadCredentials":
      "Không tải được thông tin kết nối",
    "credentials2.failed.loadProviderNames":
      "Không tải được tên nhà cung cấp",
    "credentials2.genericError": "Đã xảy ra lỗi",
  };
