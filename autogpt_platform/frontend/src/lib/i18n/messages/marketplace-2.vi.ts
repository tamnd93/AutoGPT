import { marketplace2En } from "./marketplace-2.en";

export const marketplace2Vi: Partial<
  Record<keyof typeof marketplace2En, string>
> = {
  "marketplace2.skill.added": "Đã thêm",
  "marketplace2.skill.by": "bởi {creator}",
  "marketplace2.skill.from": "Từ {source}",
  "marketplace2.skill.worksWith": "Dùng với",
  "marketplace2.skill.new": "Mới",
  "marketplace2.skill.installedCount": "{count} lượt cài",
  "marketplace2.skill.view": "Xem",

  "marketplace2.storeCard.aria": "Thẻ workflow {name}",
  "marketplace2.storeCard.previewAlt": "Ảnh xem trước của {name}",
  "marketplace2.storeCard.creatorAvatarAlt": "Ảnh đại diện của {creator}",
  "marketplace2.storeCard.noRuns": "Chưa có lượt chạy",
  "marketplace2.storeCard.runs": "{count} lượt chạy",
  "marketplace2.storeCard.rating": "Đánh giá: {rating} trên 5 sao",

  "marketplace2.workflowsShelf.heading": "Workflow",
  "marketplace2.workflowsShelf.subtitle":
    "Tự động hoá mà các expert của bạn có thể chạy — hoặc tự cài một cái.",
  "marketplace2.workflowsShelf.publish": "Đăng workflow của bạn",

  "marketplace2.shelf.showFewer": "Hiện ít hơn",
  "marketplace2.shelf.loadAll": "Tải tất cả {count} {noun}",
  "marketplace2.shelf.loadCount": "Tải {count} {noun}",
  "marketplace2.nouns.workflows": "workflow",
  "marketplace2.nouns.skills": "kỹ năng",

  "marketplace2.creator.goBack": "Quay lại",
  "marketplace2.creator.loadFailed": "Không tải được dữ liệu người sáng tạo",
  "marketplace2.creator.avatarAlt": "Ảnh đại diện của {name}",
  "marketplace2.creator.topCategories": "Danh mục chính",
  "marketplace2.creator.workflowsBy": "Workflow AI của {name}",

  "marketplace2.expert.about": "Giới thiệu",
  "marketplace2.expert.readMore": "Đọc thêm",
  "marketplace2.expert.showLess": "Thu gọn",
  "marketplace2.expert.getStarted": "Bắt đầu",
  "marketplace2.expert.onTeam": "Trong đội của bạn",
  "marketplace2.expert.chatWith": "Chat với {name}",
  "marketplace2.expert.hire": "Thuê {name}",
  "marketplace2.expert.noExtraCost": "Không tốn thêm phí",
  "marketplace2.expert.joinsInstantly": "Vào đội của bạn ngay",
  "marketplace2.expert.workflowPerkOne":
    "{count} workflow đã cài và sẵn sàng chạy",
  "marketplace2.expert.workflowPerkMany":
    "{count} workflow đã cài và sẵn sàng chạy",
  "marketplace2.expert.asksBefore": "Hỏi trước khi làm thay bạn",
  "marketplace2.expert.included": "Có trong gói của bạn",
  "marketplace2.expert.hireCosts":
    "Thuê {name} không tốn thêm phí. Công việc của họ dùng số dư hiện có của bạn",
  "marketplace2.expert.hireCostsCapped":
    ", tối đa {amount} mỗi tuần — bạn có thể đổi giới hạn này sau khi họ vào đội.",
  "marketplace2.expert.hireCostsEnd": ".",
  "marketplace2.expert.statsAria": "Expert này đi kèm gì",
  "marketplace2.expert.rulesTitle": "Các quy tắc expert này không thể phá",
  "marketplace2.expert.rulesDescription":
    "Là một phần soul của mọi expert, không ai có thể sửa.",
  "marketplace2.expert.locked": "Đã khoá",
  "marketplace2.expert.skillsTitle": "Kỹ năng",
  "marketplace2.expert.workflowsTitle": "Workflow",
  "marketplace2.expert.workflowsDescription":
    "Đã cài và sẵn sàng chạy ngay khi {name} vào đội của bạn.",
  "marketplace2.expert.unnamedWorkflow": "Workflow chưa đặt tên",
  "marketplace2.expert.cadenceSchedule": "Chạy theo lịch",
  "marketplace2.expert.cadenceRuns": "Chạy {phrase}",
  "marketplace2.expert.backToMarketplace": "Quay lại Marketplace",
  "marketplace2.expert.loadFailed": "Không tải được expert này.",
  "marketplace2.expert.statSkillOne": "1 kỹ năng",
  "marketplace2.expert.statSkills": "{count} kỹ năng",
  "marketplace2.expert.statWorkflowOne": "1 workflow",
  "marketplace2.expert.statWorkflows": "{count} workflow",
  "marketplace2.expert.statServiceOne": "1 dịch vụ",
  "marketplace2.expert.statServices": "{count} dịch vụ",

  "marketplace2.search.showingFor": "Kết quả cho:",
  "marketplace2.search.experts": "Expert",
  "marketplace2.search.noResults": "Không tìm thấy kết quả",
  "marketplace2.search.adjust": "Thử điều chỉnh từ khoá hoặc bộ lọc của bạn",

  "marketplace2.skillPage.loadFailed": "Hiện không tải được kỹ năng này",
  "marketplace2.skillPage.updated": "Cập nhật {ago}",
  "marketplace2.skillPage.from": "Từ",
  "marketplace2.skillPage.license": "Giấy phép: {license}",
  "marketplace2.skillPage.instructions": "Hướng dẫn",
  "marketplace2.skillPage.instructionsDescription":
    "Hướng dẫn các expert của bạn làm theo khi dùng kỹ năng này.",
  "marketplace2.skillPage.packageContents": "Nội dung gói",
  "marketplace2.skillPage.packageDescription":
    "Các tệp được cài cùng những hướng dẫn này.",
  "marketplace2.skillPage.triggers": "Kích hoạt",
  "marketplace2.skillPage.triggersDescription":
    "Các cụm từ giúp expert của bạn tìm thấy kỹ năng này.",
  "marketplace2.skillPage.moreSkills": "Kỹ năng khác",
  "marketplace2.skillPage.connectTitle": "Kết nối {providers}",
  "marketplace2.skillPage.connectDescription":
    "Các bước của {title} dùng {providers}.",
  "marketplace2.skillPage.installSkill": "Cài kỹ năng",
  "marketplace2.skillPage.installForExpert": "Cài cho một expert",
  "marketplace2.skillPage.installed": "Đã cài",
  "marketplace2.skillPage.yourSkills": "Kỹ năng của bạn",
  "marketplace2.skillPage.connectStep":
    "Các bước của nó dùng {providers}. Kết nối khi bạn cần lần đầu.",
  "marketplace2.skillPage.connect": "Kết nối",
  "marketplace2.skillPage.installedOn": "Đã cài trên {name}",
  "marketplace2.skillPage.installFailedOn":
    "Không thêm được kỹ năng này cho {name}",
  "marketplace2.skillPage.installFailed": "Không thêm được kỹ năng này",
  "marketplace2.skillPage.signIn": "Đăng nhập rồi thử lại.",
  "marketplace2.skillPage.tryAgain": "Vui lòng thử lại.",

  "marketplace2.browse.subtitle":
    "Playbook các expert của bạn làm theo. Dạy họ cách làm việc của bạn.",
  "marketplace2.browse.searchPlaceholder": "Tìm kỹ năng",
  "marketplace2.browse.loadFailed": "Hiện không tải được kỹ năng",
  "marketplace2.browse.skillOne": "1 kỹ năng",
  "marketplace2.browse.skills": "{count} kỹ năng",
  "marketplace2.browse.emptyCategory": "Chưa có kỹ năng {category} nào",
  "marketplace2.browse.emptyNone": "Chưa có gì được đăng",
  "marketplace2.browse.goToSkills": "Tới kỹ năng của bạn →",
};
