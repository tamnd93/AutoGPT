import { marketplace1En } from "./marketplace-1.en";

export const marketplace1Vi: Partial<
  Record<keyof typeof marketplace1En, string>
> = {
  "marketplace1.addToLibrary.open": "Mở workflow",
  "marketplace1.addToLibrary.undoing": "Đang hoàn tác...",
  "marketplace1.addToLibrary.undo": "Hoàn tác",
  "marketplace1.addToLibrary.added":
    "Workflow {name} đã được thêm vào thư viện của bạn.",
  "marketplace1.addToLibrary.undone": "Đã hoàn tác thao tác.",
  "marketplace1.addToLibrary.undoFailed":
    "Hoàn tác thất bại. Vui lòng thử lại.",
  "marketplace1.addToLibrary.error": "Lỗi",
  "marketplace1.addToLibrary.addFailed":
    "Không thêm được workflow vào thư viện. Vui lòng thử lại.",
  "marketplace1.addToLibrary.aria": "Thêm {name} vào thư viện",
  "marketplace1.addToLibrary.adding": "Đang thêm...",
  "marketplace1.addToLibrary.add": "Thêm",
  "marketplace1.addToLibrary.fetchFailed": "Không lấy được thông tin workflow",

  "marketplace1.agentInfo.version": "Phiên bản {version}.0",
  "marketplace1.agentInfo.current": "Hiện tại",
  "marketplace1.agentInfo.by": "bởi",
  "marketplace1.agentInfo.avatarAlt": "Ảnh đại diện của {creator}",
  "marketplace1.agentInfo.adding": "Đang thêm...",
  "marketplace1.agentInfo.seeRuns": "Xem lượt chạy",
  "marketplace1.agentInfo.addToLibrary": "Thêm vào thư viện",
  "marketplace1.agentInfo.localQuestion":
    "Muốn dùng workflow này ngay trên máy bạn?",
  "marketplace1.agentInfo.downloading": "Đang tải...",
  "marketplace1.agentInfo.downloadHere": "Tải tại đây",
  "marketplace1.agentInfo.noRuns": "Chưa có lượt chạy",
  "marketplace1.agentInfo.runOne": "1 lượt chạy",
  "marketplace1.agentInfo.runs": "{count} lượt chạy",
  "marketplace1.agentInfo.description": "Mô tả",
  "marketplace1.agentInfo.categories": "Danh mục",
  "marketplace1.agentInfo.none": "Không có",
  "marketplace1.agentInfo.versionLabel": "Phiên bản",
  "marketplace1.agentInfo.changelog": "Nhật ký thay đổi",
  "marketplace1.agentInfo.changelogLink": "(Nhật ký thay đổi)",
  "marketplace1.agentInfo.lastUpdated": "Cập nhật lần cuối {ago}",
  "marketplace1.agentInfo.addedTitle": "Đã thêm workflow",
  "marketplace1.agentInfo.addedRedirect": "Đang chuyển tới thư viện của bạn...",
  "marketplace1.agentInfo.downloadComplete": "Tải xong",
  "marketplace1.agentInfo.downloadSuccess":
    "Workflow của bạn đã được tải xuống thành công.",
  "marketplace1.agentInfo.downloadFailed":
    "Không tải được workflow. Vui lòng thử lại.",

  "marketplace1.agentsSection.empty": "Không tìm thấy workflow nào",
  "marketplace1.becomeACreator.headingBefore":
    "Xây dựng workflow AI và chia sẻ ",
  "marketplace1.becomeACreator.headingHighlight": "tầm nhìn",
  "marketplace1.becomeACreator.headingAfter": " của bạn",
  "marketplace1.becomeACreator.description":
    "Tham gia cộng đồng nơi workflow của bạn có thể truyền cảm hứng, thu hút và được người dùng khắp thế giới cài đặt.",
  "marketplace1.becomeACreator.button": "Đăng workflow của bạn",
  "marketplace1.categoryFilter.label": "Duyệt chuyên gia theo danh mục",
  "marketplace1.creatorLinks.heading": "Liên kết",
  "marketplace1.experts.createExpert": "Tạo một Expert",
  "marketplace1.experts.viewTeam": "Xem đội của bạn",
  "marketplace1.experts.heading": "Gặp gỡ các Expert AI",
  "marketplace1.experts.subtitle":
    "Thuê chuyên gia làm sẵn — đủ năng lực ngay ngày đầu, làm việc cho bạn trong vài phút.",
  "marketplace1.expertCard.skills": "Kỹ năng:",
  "marketplace1.expertCard.moreSkills": "+{count} kỹ năng",
  "marketplace1.expertCard.view": "Xem",
  "marketplace1.expertHire.hire": "Thuê",
  "marketplace1.expertHire.onTeam": "Trong đội của bạn",

  "marketplace1.images.thumbnailAlt": "Ảnh thu nhỏ {index}",
  "marketplace1.images.youtubeVideo": "Video YouTube",
  "marketplace1.images.imageFromYouTube": "Ảnh từ YouTube",
  "marketplace1.images.video": "Video",
  "marketplace1.images.playDemo": "Phát bản demo",
  "marketplace1.images.imageAlt": "Hình ảnh",
  "marketplace1.images.videoTitle": "Video",
  "marketplace1.images.videoUnsupported":
    "Trình duyệt của bạn không hỗ trợ thẻ video.",

  "marketplace1.mainAgentPage.goBack": "Quay lại",
  "marketplace1.mainAgentPage.loadFailed": "Không tải được dữ liệu workflow",
  "marketplace1.mainAgentPage.notFound": "Không tìm thấy workflow",
  "marketplace1.mainAgentPage.similar": "Workflow AI tương tự",
  "marketplace1.mainAgentPage.othersBy": "Workflow AI khác của {creator}",
  "marketplace1.mainMarketplacePage.loadFailed":
    "Không tải được dữ liệu Marketplace",
  "marketplace1.mainMarketplacePage.publishWorkflows": "Đăng workflow của bạn",
  "marketplace1.mainMarketplacePage.joinCommunity":
    "Tham gia cộng đồng hacker và những người mày mò ngày càng đông của chúng tôi",
  "marketplace1.loading.searchResults": "Đang tải kết quả tìm kiếm",
  "marketplace1.search.placeholder": 'Tìm việc như "tối ưu SEO"',

  "marketplace1.all": "Tất cả",
  "marketplace1.skillChips.filterAria": "Lọc kỹ năng theo chủ đề",
  "marketplace1.skills.heading": "Kỹ năng",
  "marketplace1.skills.subtitle":
    "Playbook để các expert của bạn dùng trong lúc làm việc.",
  "marketplace1.skills.loadingAria": "Đang tải kỹ năng",
  "marketplace1.skills.loadFailed": "Hiện không tải được kỹ năng.",
  "marketplace1.skills.retry": "Thử lại",
  "marketplace1.skills.emptyTopic": "Chưa có kỹ năng {topic} nào.",
  "marketplace1.skills.empty": "Chưa có kỹ năng nào.",
  "marketplace1.skills.showAll": "Hiện tất cả",
  "marketplace1.skills.browseAll": "Xem tất cả kỹ năng",
  "marketplace1.skillDialog.title": "Kỹ năng",
  "marketplace1.skillDialog.loadFailed": "Hiện không tải được kỹ năng này.",
  "marketplace1.skillDialog.noInstructions": "Kỹ năng này chưa có hướng dẫn.",
};
