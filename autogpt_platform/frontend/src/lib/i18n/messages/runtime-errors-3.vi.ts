import { runtimeErrors3En } from "./runtime-errors-3.en";

export const runtimeErrors3Vi: Partial<
  Record<keyof typeof runtimeErrors3En, string>
> = {
  "runtimeErrors3.onboarding.initFailed": "Không khởi tạo được quá trình bắt đầu",
  "runtimeErrors3.onboarding.updateFailed":
    "Không cập nhật được trạng thái bắt đầu",
  "runtimeErrors3.onboarding.stepFailed":
    "Không hoàn tất được bước bắt đầu",

  "runtimeErrors3.network.restored": "Đã có kết nối lại",
  "runtimeErrors3.network.backOnline": "Bạn đã trực tuyến trở lại",
  "runtimeErrors3.network.offline": "Bạn đang ngoại tuyến",
  "runtimeErrors3.network.checkConnection": "Kiểm tra kết nối internet của bạn",

  "runtimeErrors3.mcp.genericError": "Đã xảy ra lỗi. Hãy thử lại.",
};
