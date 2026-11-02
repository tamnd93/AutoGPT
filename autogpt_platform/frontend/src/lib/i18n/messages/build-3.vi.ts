import { build3En } from "./build-3.en";

export const build3Vi: Partial<Record<keyof typeof build3En, string>> = {
  "build3.tutorial.common.back": "Quay lại",
  "build3.tutorial.common.continue": "Tiếp tục",

  "build3.tutorial.welcome.title": "Chào mừng tới AutoGPT Builder! 👋🏻",
  "build3.tutorial.welcome.intro":
    "Hướng dẫn tương tác này sẽ dạy bạn cách dựng workflow AI đầu tiên.",
  "build3.tutorial.welcome.learnTitle": "Bạn sẽ học cách:",
  "build3.tutorial.welcome.learnAdd": "- Thêm khối vào workflow",
  "build3.tutorial.welcome.learnIo": "- Hiểu đầu vào và đầu ra của khối",
  "build3.tutorial.welcome.learnSaveRun": "- Lưu và chạy workflow của bạn",
  "build3.tutorial.welcome.learnMore": "- và nhiều thứ khác...",
  "build3.tutorial.welcome.estimated": "Thời gian ước tính: 3-4 phút",
  "build3.tutorial.welcome.skip": "Bỏ qua hướng dẫn",
  "build3.tutorial.welcome.begin": "Bắt đầu",

  "build3.tutorial.save.openTitle": "Lưu workflow của bạn",
  "build3.tutorial.save.openLine":
    "Trước khi chạy, chúng ta cần <strong>lưu</strong> workflow của bạn.",
  "build3.tutorial.save.openBanner": "Bấm nút Save",
  "build3.tutorial.save.nameTitle": "Đặt tên cho workflow",
  "build3.tutorial.save.nameLine":
    "Đặt <strong>tên</strong> cho workflow và mô tả nếu muốn.",
  "build3.tutorial.save.nameBanner": 'Nhập tên rồi bấm "Save Workflow"',
  "build3.tutorial.save.example": 'Ví dụ: "Workflow máy tính của tôi"',

  "build3.tutorial.secondCalc.requiredTitle": "⚠️ Bắt buộc để tiếp tục:",
  "build3.tutorial.secondCalc.reqB":
    "Nhập một số vào trường <strong>B</strong> (ví dụ: 2)",
  "build3.tutorial.secondCalc.reqOp":
    "Chọn một <strong>Operation</strong> (ví dụ: Multiply)",
  "build3.tutorial.secondCalc.note":
    "Lưu ý: trường A sẽ được nối từ đầu ra của Calculator thứ nhất",
  "build3.tutorial.secondCalc.successTitle":
    "🎉 Tuyệt vời! Đã điền đủ mọi giá trị!",
  "build3.tutorial.secondCalc.addTitle": "Thêm Calculator thứ hai",
  "build3.tutorial.secondCalc.addLine1":
    "Bạn đã cấu hình xong Calculator đầu tiên!",
  "build3.tutorial.secondCalc.addLine2":
    "Bây giờ hãy thêm <strong>khối Calculator thứ hai</strong> và nối chúng với nhau.",
  "build3.tutorial.secondCalc.chainTitle": "Chúng ta sẽ tạo một chuỗi:",
  "build3.tutorial.secondCalc.chainNote":
    "Đầu ra của khối thứ nhất sẽ chảy vào khối thứ hai!",
  "build3.tutorial.secondCalc.addButton": "Thêm Calculator thứ hai",
  "build3.tutorial.secondCalc.addedTitle": "Đã thêm Calculator thứ hai! ✅",
  "build3.tutorial.secondCalc.addedLine1":
    "Đã thêm <strong>khối Calculator thứ hai</strong> vào canvas của bạn.",
  "build3.tutorial.secondCalc.addedLine2":
    "Bây giờ hãy cấu hình và nối chúng với nhau.",
  "build3.tutorial.secondCalc.addedLine3": "Bạn đã có 2 khối Calculator!",
  "build3.tutorial.secondCalc.configureButton": "Cấu hình khối này",
  "build3.tutorial.secondCalc.configureTitle": "Cấu hình Calculator thứ hai",
  "build3.tutorial.secondCalc.configureLine":
    "Bây giờ hãy cấu hình <strong>khối Calculator thứ hai</strong>.",
  "build3.tutorial.secondCalc.configureBanner":
    "Điền trường B và chọn một Operation",

  "build3.blockMenu.triggerTooltip": "Khối",
  "build3.blockMenu.searchResults": "Kết quả tìm kiếm",
  "build3.blockMenu.searchPlaceholder":
    "Khối, workflow, tích hợp hoặc từ khoá...",

  "build3.filters.categoryBlocks": "Khối",
  "build3.filters.categoryIntegrations": "Tích hợp",
  "build3.filters.categoryMarketplace": "Workflow trên Marketplace",
  "build3.filters.categoryMine": "Workflow của tôi",
  "build3.filters.createdByChip": "Tạo bởi {creator}...",
  "build3.filters.edit": "Sửa bộ lọc",
  "build3.filters.all": "Tất cả bộ lọc",
  "build3.filters.title": "Bộ lọc",
  "build3.filters.categories": "Danh mục",
  "build3.filters.createdBy": "Tạo bởi",
  "build3.filters.more": "Thêm",
  "build3.filters.less": "Bớt",
  "build3.filters.clear": "Xoá",
  "build3.filters.apply": "Áp dụng bộ lọc",

  "build3.sidebar.suggestion": "Gợi ý",
  "build3.sidebar.allBlocks": "Tất cả khối",
  "build3.sidebar.inputBlocks": "Khối đầu vào",
  "build3.sidebar.actionBlocks": "Khối hành động",
  "build3.sidebar.outputBlocks": "Khối đầu ra",
  "build3.sidebar.integrations": "Tích hợp",
  "build3.sidebar.marketplace": "Workflow trên Marketplace",
  "build3.sidebar.mine": "Workflow của tôi",

  "build3.errors.contextBlockMenu": "bảng chọn khối",
  "build3.errors.contextBlocks": "khối",
  "build3.errors.statusServerError": "Lỗi máy chủ nội bộ",
  "build3.errors.statusRequestFailed": "Yêu cầu thất bại",
  "build3.errors.messageDefault": "Đã xảy ra lỗi",
  "build3.errors.loadingBlocks": "Lỗi khi tải khối",
  "build3.errors.tryLater": "Vui lòng thử lại sau",

  "build3.toast.addWorkflowFailed": "Không thêm được workflow vào thư viện",
  "build3.toast.unexpected": "Đã xảy ra lỗi không mong đợi.",
  "build3.toast.workflowAdded": "Đã thêm workflow",
  "build3.toast.workflowAddedBody":
    "Workflow đã được thêm vào thư viện và builder của bạn",

  "build3.integration.iconAlt": "biểu tượng tích hợp",
  "build3.marketplace.by": "Tạo bởi {creator}",
  "build3.marketplace.runs": "{count} lượt chạy",
  "build3.marketplace.workflowPage": "Trang workflow",
  "build3.allBlocks.seeAll": "xem tất cả",

  "build3.scroll.left": "Cuộn sang trái",
  "build3.scroll.right": "Cuộn sang phải",

  "build3.mobile.title": "Builder hoạt động tốt nhất trên máy tính",
  "build3.mobile.body":
    "Trình dựng workflow dựa trên các thao tác canvas không hoạt động tốt ở kích thước màn hình này. Để có trải nghiệm tốt nhất, hãy chuyển sang trình duyệt trên máy tính.",
  "build3.mobile.continueAnyway": "Vẫn tiếp tục",
  "build3.mobile.dontShow": "Không hiện lại",

  "build3.mcp.urlTitle": "Kết nối tới máy chủ MCP",
  "build3.mcp.toolTitle": "Chọn một công cụ",
  "build3.mcp.toolTitleWithServer": "Chọn một công cụ — {server}",
  "build3.mcp.urlDescription":
    "Nhập URL của máy chủ MCP để xem các công cụ khả dụng.",
  "build3.mcp.foundOne":
    "Tìm thấy 1 công cụ. Chọn một công cụ để thêm vào workflow.",
  "build3.mcp.foundMany":
    "Tìm thấy {count} công cụ. Chọn một công cụ để thêm vào workflow.",
  "build3.mcp.serverUrl": "URL máy chủ",
  "build3.mcp.manualCredential": "hoặc nhập thông tin xác thực API thủ công",
  "build3.mcp.cancel": "Huỷ",
  "build3.mcp.waitingSignIn": "Đang chờ đăng nhập...",
  "build3.mcp.connecting": "Đang kết nối...",
  "build3.mcp.signInConnect": "Đăng nhập và kết nối",
  "build3.mcp.connectDiscover": "Kết nối và khám phá",
  "build3.mcp.discoverTools": "Khám phá công cụ",
  "build3.mcp.addBlock": "Thêm khối",
  "build3.mcp.failedConnect": "Không kết nối được tới máy chủ MCP",
  "build3.mcp.failedCredential":
    "Không kết nối được bằng thông tin xác thực này",
  "build3.mcp.failedSignIn": "Không hoàn tất được đăng nhập",
  "build3.mcp.signInTimedOut":
    "Đăng nhập OAuth quá thời gian. Vui lòng thử lại.",
  "build3.mcp.rejectedAfterAuth":
    "Đã xác thực thành công nhưng máy chủ vẫn từ chối yêu cầu. Có thể audience của token không khớp. Vui lòng thử lại.",
  "build3.mcp.paramOne": "1 tham số",
  "build3.mcp.paramMany": "{count} tham số",
  "build3.mcp.moreParams": "+{count} nữa",
  "build3.mcp.parameter": "Tham số",
  "build3.mcp.type": "Kiểu",
  "build3.mcp.description": "Mô tả",
  "build3.mcp.showDetails": "Hiện chi tiết",
  "build3.mcp.hideDetails": "Ẩn chi tiết",
};
