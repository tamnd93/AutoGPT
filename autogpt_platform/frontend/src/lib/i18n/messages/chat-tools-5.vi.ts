import { chatTools5En } from "./chat-tools-5.en";

export const chatTools5Vi: Partial<Record<keyof typeof chatTools5En, string>> =
  {
    "chatTools5.setupTrigger.animation.settingUp": "Đang thiết lập trigger",
    "chatTools5.setupTrigger.animation.triggerSetUp":
      'Đã thiết lập trigger "{name}"',
    "chatTools5.setupTrigger.animation.setupNeeded":
      'Cần thiết lập cho "{name}"',
    "chatTools5.setupTrigger.animation.configNeeded": "Cần cấu hình trigger",
    "chatTools5.setupTrigger.animation.signInRequired":
      "Cần đăng nhập để thiết lập trigger",
    "chatTools5.setupTrigger.animation.wentWrong": "Đã xảy ra lỗi",
    "chatTools5.setupTrigger.credentialsLabel": "Tài khoản",
    "chatTools5.setupTrigger.copyWebhookUrl": "Sao chép URL webhook",
    "chatTools5.setupTrigger.copied": "Đã sao chép",

    "chatTools5.viewAgentOutput.animation.retrieving":
      "Đang lấy kết quả workflow",
    "chatTools5.viewAgentOutput.animation.retrievingNamed":
      'Đang lấy kết quả workflow "{name}"',
    "chatTools5.viewAgentOutput.animation.retrievedWithStatus":
      "Đã lấy kết quả ({status})",
    "chatTools5.viewAgentOutput.animation.retrieved": "Đã lấy kết quả workflow",
    "chatTools5.viewAgentOutput.animation.noOutputs": "Không có kết quả nào",
    "chatTools5.viewAgentOutput.animation.error":
      "Lỗi khi tải kết quả workflow",
    "chatTools5.viewAgentOutput.identifier.libraryWorkflow":
      "Workflow trong thư viện {id}",
    "chatTools5.viewAgentOutput.status": "Trạng thái: {status}",
    "chatTools5.viewAgentOutput.noResults": "Không có kết quả",
    "chatTools5.viewAgentOutput.errorTitle": "Lỗi",
    "chatTools5.viewAgentOutput.open": "Mở",
    "chatTools5.viewAgentOutput.execution": "Lượt chạy",
    "chatTools5.viewAgentOutput.inputsSummary": "Tóm tắt thông tin đầu vào",
    "chatTools5.viewAgentOutput.itemOne": "{count} mục",
    "chatTools5.viewAgentOutput.itemMany": "{count} mục",
    "chatTools5.viewAgentOutput.noExecutionSelected":
      "Chưa chọn lượt chạy nào.",
    "chatTools5.viewAgentOutput.noExecutionHint":
      "Hãy hỏi một lượt chạy cụ thể hoặc execution_id.",
  };
