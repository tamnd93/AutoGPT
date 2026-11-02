import { chatFiles2En } from "./chat-files-2.en";

export const chatFiles2Vi: Partial<Record<keyof typeof chatFiles2En, string>> =
  {
    "chatFiles2.workspaceFilesTrigger.open": "Mở tệp trong workspace",

    "chatFiles2.workspaceFileCards.fileDeleted": "Đã xoá tệp",
    "chatFiles2.workspaceFileCards.deleteFailed": "Xoá tệp thất bại",
    "chatFiles2.workspaceFileCards.downloadFailed": "Tải xuống thất bại",
    "chatFiles2.workspaceFileCards.downloadAllFailed": "Tải tất cả thất bại",
  };
