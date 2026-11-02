import { build4En } from "./build-4.en";

export const build4Vi: Partial<Record<keyof typeof build4En, string>> = {
  "build4.tutorial.common.back": "Quay lại",
  "build4.tutorial.common.next": "Tiếp",
  "build4.tutorial.common.nextArrow": "Tiếp →",
  "build4.tutorial.common.skipConnected": "Bỏ qua (đã kết nối)",

  "build4.tutorial.blockMenu.openTitle": "Mở bảng chọn khối",
  "build4.tutorial.blockMenu.openLine":
    "Hãy bắt đầu bằng việc mở bảng chọn khối.",
  "build4.tutorial.blockMenu.openBanner": "Bấm nút này để mở bảng chọn",
  "build4.tutorial.blockMenu.overviewTitle": "Bảng chọn khối",
  "build4.tutorial.blockMenu.overviewLine":
    "Đây là <strong>bảng chọn khối</strong> — hộp công cụ để dựng workflow của bạn.",
  "build4.tutorial.blockMenu.overviewIntro": "Ở đây bạn sẽ thấy:",
  "build4.tutorial.blockMenu.overviewInput":
    "<strong>Khối đầu vào</strong> — Điểm khởi đầu cho dữ liệu",
  "build4.tutorial.blockMenu.overviewAction":
    "<strong>Khối hành động</strong> — Xử lý và thao tác AI",
  "build4.tutorial.blockMenu.overviewOutput":
    "<strong>Khối đầu ra</strong> — Kết quả và phản hồi",
  "build4.tutorial.blockMenu.overviewIntegrations":
    "<strong>Tích hợp</strong> — Khối của dịch vụ bên thứ ba",
  "build4.tutorial.blockMenu.overviewLibrary":
    "<strong>Workflow trong thư viện</strong> — Workflow cá nhân của bạn",
  "build4.tutorial.blockMenu.overviewMarketplace":
    "<strong>Workflow trên Marketplace</strong> — Workflow của cộng đồng",
  "build4.tutorial.blockMenu.searchTitle": "Tìm một khối",
  "build4.tutorial.blockMenu.searchLine":
    "Hãy thêm một khối Calculator để bắt đầu.",
  "build4.tutorial.blockMenu.searchBanner": "Gõ Calculator vào thanh tìm kiếm",
  "build4.tutorial.blockMenu.searchNote":
    "Kết quả sẽ lọc theo nội dung bạn gõ.",
  "build4.tutorial.blockMenu.addTitle": "Thêm khối Calculator",
  "build4.tutorial.blockMenu.addLine":
    "Bạn sẽ thấy khối <strong>Calculator</strong> trong kết quả.",
  "build4.tutorial.blockMenu.addBanner": "Bấm vào khối Calculator để thêm",
  "build4.tutorial.blockMenu.dragNote":
    "Bạn cũng có thể kéo khối thả lên canvas",

  "build4.tutorial.blockBasics.firstTitle": "Khối đầu tiên của bạn!",
  "build4.tutorial.blockBasics.firstLine":
    "Tuyệt vời! Đây là <strong>khối Calculator</strong> của bạn.",
  "build4.tutorial.blockBasics.firstExplore":
    "Hãy xem các khối hoạt động thế nào.",
  "build4.tutorial.blockBasics.showMe": "Cho tôi xem",
  "build4.tutorial.blockBasics.inputTitle": "Điểm nối đầu vào",
  "build4.tutorial.blockBasics.inputLine":
    "Ở <strong>bên trái</strong> khối là các <strong>điểm nối đầu vào</strong>.",
  "build4.tutorial.blockBasics.inputDetail":
    "Đây là nơi dữ liệu <em>chảy vào</em> khối từ các khối khác.",
  "build4.tutorial.blockBasics.outputTitle": "Điểm nối đầu ra",
  "build4.tutorial.blockBasics.outputLine":
    "Ở <strong>bên phải</strong> là <strong>điểm nối đầu ra</strong>.",
  "build4.tutorial.blockBasics.outputDetail":
    "Đây là nơi kết quả <em>chảy ra</em> để nối với các khối khác.",
  "build4.tutorial.blockBasics.dragBanner":
    "Bạn có thể kéo từ điểm nối đầu ra sang điểm nối đầu vào để nối các khối",

  "build4.tutorial.configure.title": "Nhập giá trị",
  "build4.tutorial.configure.line":
    "Bây giờ hãy cấu hình khối với giá trị thật.",
  "build4.tutorial.configure.banner": "Điền tất cả các trường bắt buộc ở trên",
  "build4.tutorial.configure.continue": "Tiếp tục",
  "build4.tutorial.configure.requirementsTitle": "⚠️ Bắt buộc để tiếp tục:",
  "build4.tutorial.configure.reqA":
    "Nhập một số vào trường <strong>A</strong> (ví dụ: 10)",
  "build4.tutorial.configure.reqB":
    "Nhập một số vào trường <strong>B</strong> (ví dụ: 5)",
  "build4.tutorial.configure.reqOp":
    "Chọn một <strong>Operation</strong> (Add, Multiply, ...)",
  "build4.tutorial.configure.successTitle":
    "🎉 Tuyệt vời! Đã điền đủ mọi giá trị!",

  "build4.tutorial.connections.connected": "✅ Đã kết nối!",
  "build4.tutorial.connections.waiting": "Đang chờ kết nối...",
  "build4.tutorial.connections.alreadyConnected": "✅ Kết nối đã tồn tại!",
  "build4.tutorial.connections.outputTitle": "Nối các khối: Đầu ra",
  "build4.tutorial.connections.outputLine":
    "Bây giờ hãy nối <strong>đầu ra Result</strong> của Calculator thứ nhất vào <strong>đầu vào (A)</strong> của Calculator thứ hai.",
  "build4.tutorial.connections.outputDragTitle": "Kéo từ đầu ra Result:",
  "build4.tutorial.connections.outputDragLine":
    "Bấm và kéo từ điểm nối <strong>Result</strong> (bên phải) của <strong>khối Calculator thứ nhất</strong>.",
  "build4.tutorial.connections.outputBanner": "Kéo từ điểm nối đầu ra Result",
  "build4.tutorial.connections.inputTitle": "Nối các khối: Đầu vào",
  "build4.tutorial.connections.inputLine":
    "Bây giờ, nối vào <strong>đầu vào (A)</strong> của khối Calculator thứ hai.",
  "build4.tutorial.connections.inputDropTitle": "Thả vào đầu vào A:",
  "build4.tutorial.connections.inputDragLine":
    "Kéo tới điểm nối <strong>A</strong> (bên trái) của <strong>khối Calculator thứ hai</strong>.",
  "build4.tutorial.connections.completeTitle": "Đã nối xong các khối! 🎉",
  "build4.tutorial.connections.completeLine":
    "Tuyệt vời! Các khối Calculator của bạn đã được nối:",
  "build4.tutorial.connections.completeNote":
    "Kết quả của Calculator 1 chảy vào đầu vào A của Calculator 2",
  "build4.tutorial.connections.completeNext":
    "Bây giờ hãy lưu và chạy workflow của bạn!",
  "build4.tutorial.connections.saveButton": "Lưu workflow của tôi",

  "build4.tutorial.run.title": "Chạy workflow của bạn",
  "build4.tutorial.run.line":
    "Workflow của bạn đã lưu và sẵn sàng! Giờ hãy <strong>chạy nó</strong> để xem hoạt động.",
  "build4.tutorial.run.banner": "Bấm nút Run",
  "build4.tutorial.run.outputTitle": "Xem kết quả",
  "build4.tutorial.run.outputLine":
    "Đây là <strong>kết quả</strong> của khối bạn vừa chạy!",
  "build4.tutorial.run.latestOutput": "Kết quả mới nhất:",
  "build4.tutorial.run.latestNote":
    "Sau mỗi lần chạy, bạn thấy kết quả của từng khối ở cuối khối đó.",
  "build4.tutorial.run.showsTitle": "Kết quả hiển thị:",
  "build4.tutorial.run.showsResult": "• Giá trị đã tính",
  "build4.tutorial.run.showsTimestamp": "• Thời điểm thực thi",
  "build4.tutorial.run.finishTutorial": "Kết thúc hướng dẫn",

  "build4.tutorial.completion.title": "Chúc mừng! 🎉",
  "build4.tutorial.completion.line":
    "Bạn đã tạo và chạy thành công workflow đầu tiên!",
  "build4.tutorial.completion.learnedTitle": "Bạn đã học được cách:",
  "build4.tutorial.completion.learnedAdd": "• Thêm khối từ bảng chọn khối",
  "build4.tutorial.completion.learnedHandles":
    "• Hiểu điểm nối đầu vào và đầu ra",
  "build4.tutorial.completion.learnedConfigure": "• Cấu hình giá trị cho khối",
  "build4.tutorial.completion.learnedConnect": "• Nối các khối với nhau",
  "build4.tutorial.completion.learnedSaveRun": "• Lưu và chạy workflow của bạn",
  "build4.tutorial.completion.learnedStatus":
    "• Xem trạng thái thực thi và kết quả",
  "build4.tutorial.completion.happy": "Chúc bạn dựng workflow vui vẻ! 🚀",
  "build4.tutorial.completion.restart": "Bắt đầu lại hướng dẫn",
  "build4.tutorial.completion.finish": "Hoàn tất",
};
