import { chatFiles1En } from "./chat-files-1.en";

export const chatFiles1Vi: Partial<Record<keyof typeof chatFiles1En, string>> =
  {
    "chatFiles1.fileType.image": "Ảnh",
    "chatFiles1.fileType.video": "Video",
    "chatFiles1.fileType.pdf": "PDF",
    "chatFiles1.fileType.spreadsheet": "Bảng tính",
    "chatFiles1.fileType.html": "HTML",
    "chatFiles1.fileType.react": "React",
    "chatFiles1.fileType.document": "Tài liệu",
    "chatFiles1.fileType.data": "Dữ liệu",
    "chatFiles1.fileType.code": "Mã",
    "chatFiles1.fileType.text": "Văn bản",
    "chatFiles1.fileType.file": "Tệp",
    "chatFiles1.fileType.expert": "Chuyên gia",

    "chatFiles1.artifactCard.downloadFailedTitle": "Tải xuống thất bại",
    "chatFiles1.artifactCard.downloadFailedDescription": "Không lấy được tệp.",

    "chatFiles1.artifactContent.loadFailed": "Không tải được nội dung",
    "chatFiles1.artifactContent.loadImageFailed": "Không tải được ảnh",
    "chatFiles1.artifactContent.loadVideoFailed": "Không tải được video",
    "chatFiles1.artifactContent.tryAgain": "Thử lại",

    "chatFiles1.artifactError.unknownError": "Lỗi hiển thị không xác định",
    "chatFiles1.artifactError.title": "Không hiển thị được artifact này",
    "chatFiles1.artifactError.bodyPrefix": "Đã xảy ra lỗi trong",
    "chatFiles1.artifactError.bodySuffix":
      "khi hiển thị. Chat và thanh bên vẫn hoạt động bình thường.",
    "chatFiles1.artifactError.copyDetails": "Sao chép chi tiết lỗi",
    "chatFiles1.artifactError.pasteHint":
      "Dán nội dung này vào chat để tạo lại một bản chạy được.",

    "chatFiles1.panelHeader.back": "Quay lại",
    "chatFiles1.panelHeader.computer": "Máy tính",
    "chatFiles1.panelHeader.copy": "Sao chép",
    "chatFiles1.panelHeader.allFiles": "Tất cả tệp",
    "chatFiles1.panelHeader.download": "Tải xuống",
    "chatFiles1.panelHeader.enterFullscreen": "Toàn màn hình",
    "chatFiles1.panelHeader.exitFullscreen": "Thoát toàn màn hình",
    "chatFiles1.panelHeader.close": "Đóng",

    "chatFiles1.panelMode.groupLabel": "Chế độ xem bảng",
    "chatFiles1.panelMode.artifact": "Artifact",
    "chatFiles1.panelMode.computer": "Máy tính",

    "chatFiles1.sourceToggle.preview": "Xem trước",
    "chatFiles1.sourceToggle.source": "Nguồn",

    "chatFiles1.contextPanel.tabFiles": "Tệp",
    "chatFiles1.contextPanel.tabArtifacts": "Artifact",
    "chatFiles1.contextPanel.tabIntegrations": "Tích hợp",
    "chatFiles1.contextPanel.descFiles": "Các tệp từ chat này.",
    "chatFiles1.contextPanel.descArtifacts":
      "Các artifact từ chat này để xem trước.",
    "chatFiles1.contextPanel.descIntegrations":
      "Các công cụ mà chuyên gia của chat này có thể dùng.",

    "chatFiles1.toggle.hideFiles": "Ẩn tệp",
    "chatFiles1.toggle.openFiles": "Mở tệp",
    "chatFiles1.toggle.hideComputer": "Ẩn máy tính",
    "chatFiles1.toggle.openComputer": "Mở máy tính",
    "chatFiles1.toggle.computer": "Máy tính",
    "chatFiles1.toggle.documentOne": "{count} tài liệu",
    "chatFiles1.toggle.documentMany": "{count} tài liệu",

    "chatFiles1.artifactsTab.loadFailed": "Không tải được danh sách artifact.",
    "chatFiles1.artifactsTab.nothingToPreview": "Chưa có gì để xem trước.",
    "chatFiles1.artifactsTab.pickToPreview":
      "Chọn một artifact từ chat này để xem trước tại đây.",
    "chatFiles1.artifactsTab.openArtifacts": "Mở kho artifact",

    "chatFiles1.deleteFile.title": "Xoá tệp",
    "chatFiles1.deleteFile.bodyPrefix": "Xoá",
    "chatFiles1.deleteFile.bodySuffix":
      "? Thao tác này xoá tệp khỏi workspace và không thể hoàn tác.",
    "chatFiles1.deleteFile.cancel": "Huỷ",
    "chatFiles1.deleteFile.delete": "Xoá",

    "chatFiles1.filesContent.sectionTitle": "Tệp",
    "chatFiles1.filesContent.downloadAll": "Tải tất cả",
    "chatFiles1.filesContent.loadFailed": "Không tải được danh sách tệp.",
    "chatFiles1.filesContent.emptyDefault":
      "Chưa có tệp nào. Hãy tải lên hoặc nhờ một chuyên gia tạo.",
    "chatFiles1.filesContent.showLess": "Thu gọn",
    "chatFiles1.filesContent.viewMore": "Xem thêm ({count})",

    "chatFiles1.filesCard.title": "Tệp trong chat này",
    "chatFiles1.filesCard.expertDocuments": "Tất cả tài liệu của {name}",
    "chatFiles1.filesCard.expertEmpty": "{name} chưa tạo tài liệu nào.",
    "chatFiles1.filesEmpty.title": "Chưa có tệp nào",
    "chatFiles1.filesEmpty.description":
      "Tệp bạn đính kèm và tài liệu Otto tạo trong chat này sẽ hiện ở đây.",

    "chatFiles1.sessionActivity.runs": "Lượt chạy",
    "chatFiles1.sessionActivity.schedules": "Lịch chạy",

    "chatFiles1.artifactPanel.copied": "Đã sao chép vào clipboard",
    "chatFiles1.artifactPanel.copyFailedTitle": "Sao chép thất bại",
    "chatFiles1.artifactPanel.copyFailedDescription":
      "Không đọc được tệp hoặc không truy cập được clipboard.",
    "chatFiles1.artifactPanel.fullscreenFailed":
      "Không đổi được chế độ toàn màn hình",

    "chatFiles1.integrationsTab.grantableError":
      "Không tải được các dịch vụ đã kết nối nên không dùng được “Dùng dịch vụ sẵn có”.",
    "chatFiles1.integrationsTab.retry": "Thử lại",
    "chatFiles1.integrationsTab.errorHint":
      "Không tải được những gì chuyên gia này có thể dùng.",
    "chatFiles1.integrationsTab.emptyTitle": "Chưa có tích hợp nào",
    "chatFiles1.integrationsTab.emptyDescription":
      "Kết nối một công cụ để {name} dùng thay bạn.",
    "chatFiles1.integrationsTab.addIntegration": "Thêm tích hợp",
    "chatFiles1.integrationsTab.useExisting": "Dùng dịch vụ sẵn có",
    "chatFiles1.integrationsTab.sectionTitle": "Tích hợp của {name}",
    "chatFiles1.integrationsTab.ready": "Sẵn sàng",
    "chatFiles1.integrationsTab.remove": "Xoá {name}",
    "chatFiles1.integrationsTab.openExpertPage": "Mở trang của {name}",
    "chatFiles1.integrationsTab.logoAlt": "logo {name}",

    "chatFiles1.reactPreview.buildFailed":
      "Không dựng được bản xem trước artifact",
    "chatFiles1.reactPreview.renderFailed":
      "Không hiển thị được bản xem trước React",
    "chatFiles1.reactPreview.frameTitle": "Bản xem trước {name}",

    "chatFiles1.reactPreview.unsupportedImport":
      "Import không được hỗ trợ trong bản xem trước artifact: ",
    "chatFiles1.reactPreview.propsHelp":
      "Component này có vẻ cần props. Hãy export một object previewProps có giá trị mẫu để hiển thị trong bản xem trước artifact.",
    "chatFiles1.reactPreview.iframeNoRenderable":
      "Không tìm thấy component để hiển thị. Hãy export default component, export App hoặc export một component có tên.",

    "chatFiles1.artifactContent.fetchFailed": "Tải thất bại: {status}",
    "chatFiles1.artifactContent.fetchFailedGeneric": "Không tải được artifact",
    "chatFiles1.filesContent.zipEmpty": "Không tải được tệp nào.",

    "chatFiles1.computer.toastTitle": "Không mở được máy tính",
    "chatFiles1.computer.toastDescription":
      "Sandbox chưa khởi động. Hãy thử lại sau giây lát.",
    "chatFiles1.computer.machineNone": "Không có",
    "chatFiles1.computer.machineRunning": "Đang chạy",
    "chatFiles1.computer.machineSuspended": "Tạm dừng",
    "chatFiles1.computer.actionRefresh": "Làm mới",
    "chatFiles1.computer.actionOpenDesktop": "Mở máy tính",
    "chatFiles1.computer.actionTurnOnScreen": "Bật màn hình",
    "chatFiles1.computer.labelMachine": "Máy",
    "chatFiles1.computer.labelScreen": "Màn hình",
    "chatFiles1.computer.stateOn": "Bật",
    "chatFiles1.computer.stateOff": "Tắt",
    "chatFiles1.computer.screenOffTitle": "Màn hình chưa bật trên bảng này",
    "chatFiles1.computer.screenOffExpert":
      "Chat này chạy trên máy tính riêng của chuyên gia. Bật màn hình để xem nó làm việc trong trình duyệt thật, hoặc yêu cầu một máy trong chat.",
    "chatFiles1.computer.screenOffDefault":
      "Bật màn hình của chat này để xem nó làm việc trong trình duyệt thật, hoặc yêu cầu một máy trong chat. Đó cũng chính là máy chạy lệnh của bạn.",
    "chatFiles1.computer.sandboxNotConfigured":
      "Cloud sandbox chưa được cấu hình trên bản triển khai này.",

    "chatFiles1.expertArtifact.kindHire": "Tuyển từ danh sách chuyên gia",
    "chatFiles1.expertArtifact.kindRaise": "Tạo từ bản mô tả",
    "chatFiles1.expertArtifact.kindUpdate": "Cập nhật bản mô tả",
    "chatFiles1.expertArtifact.statusOnTeam": "Đang trong đội",
    "chatFiles1.expertArtifact.statusProposed": "Đề xuất — chưa tạo gì",
    "chatFiles1.expertArtifact.sectionStatus": "Trạng thái",
    "chatFiles1.expertArtifact.sectionKind": "Loại",
    "chatFiles1.expertArtifact.sectionIdentity": "Bản sắc và tính cách",
    "chatFiles1.expertArtifact.sectionVoice": "Giọng điệu",
    "chatFiles1.expertArtifact.sectionBoundaries": "Giới hạn",
    "chatFiles1.expertArtifact.sectionBudget": "Ngân sách tuần",
    "chatFiles1.expertArtifact.budgetDefault": "Mặc định",
    "chatFiles1.expertArtifact.budgetCredits": "{count} credit",
    "chatFiles1.expertArtifact.accent": "Màu nhấn",
    "chatFiles1.expertArtifact.expertId": "ID chuyên gia",
  };
