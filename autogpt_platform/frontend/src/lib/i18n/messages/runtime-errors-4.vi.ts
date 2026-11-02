import { runtimeErrors4En } from "./runtime-errors-4.en";

export const runtimeErrors4Vi: Partial<
  Record<keyof typeof runtimeErrors4En, string>
> = {
  "runtimeErrors4.skill.notYetReused": "Chưa được dùng lại",
  "runtimeErrors4.skill.restored": "Đã khôi phục",
  "runtimeErrors4.skill.added": "Đã thêm",
  "runtimeErrors4.skill.updated": "Đã cập nhật",
  "runtimeErrors4.skill.otherText": "Nội dung khác",
  "runtimeErrors4.skill.step": "Bước {number}",
};
