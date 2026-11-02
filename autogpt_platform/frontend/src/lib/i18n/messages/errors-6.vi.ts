import { Errors6En } from "./errors-6.en";

export const Errors6Vi: Partial<Record<keyof typeof Errors6En, string>> = {
  "errors6.blockMenu.addToLibraryFailed":
    "Không thêm được workflow vào thư viện",
  "errors6.blockMenu.unexpected": "Đã xảy ra lỗi không mong muốn.",
  "errors6.inputs.enabled": "Đã bật",
  "errors6.inputs.disabled": "Đã tắt",
  "errors6.inputs.addRow": "Thêm dòng",
  "errors6.inputs.column": "Cột {number}",
};
export const errors6Vi = Errors6Vi;
