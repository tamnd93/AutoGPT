import { RuntimeErrors2En } from "./runtime-errors-2.en";

export const RuntimeErrors2Vi: Partial<
  Record<keyof typeof RuntimeErrors2En, string>
> = {
  "runtimeErrors2.undeliverableTitle": "Không gửi được email tới địa chỉ này",
  "runtimeErrors2.undeliverableHint": "Kiểm tra lại, hoặc dùng địa chỉ khác.",
};
