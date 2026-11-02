import { Shared5En } from "./shared-5.en";

export const Shared5Vi: Partial<Record<keyof typeof Shared5En, string>> = {
  "shared5.voice.title": "{name} nên viết như thế nào?",
  "shared5.voice.titleNoName": "Chuyên gia này nên viết như thế nào?",
  "shared5.voice.description":
    "Chọn giọng văn bạn thấy phù hợp. Bạn có thể chỉnh lại bất cứ lúc nào trong trình sửa Soul.",
  "shared5.voice.legend": "Giọng văn",
  "shared5.voice.skip": "Bỏ qua lúc này",
  "shared5.voice.use": "Dùng giọng này",
  "shared5.voice.pasteOwn": "Dán mẫu của bạn",
  "shared5.voice.customSampleLabel": "Mẫu giọng văn tuỳ chỉnh",
  "shared5.voice.customPlaceholder":
    "Dán vài câu viết theo giọng bạn muốn chuyên gia này dùng.",
  "shared5.voice.characterCount": "{count} / {max} ký tự",
  "shared5.upload.deleteFailedTitle": "Không xoá được tệp",
  "shared5.upload.deleteFailedBody": "Không xoá được tệp khỏi kho lưu trữ.",
};
