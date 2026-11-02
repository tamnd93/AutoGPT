import { marketplace4En } from "./marketplace-4.en";

export const marketplace4Vi: Partial<
  Record<keyof typeof marketplace4En, string>
> = {
  "marketplace4.select.title": "Chọn một workflow",
  "marketplace4.select.description":
    "Chọn phiên bản workflow đã lưu mà bạn muốn gửi đi duyệt trên Marketplace.",
  "marketplace4.select.loadFailedTitle": "Không tải được workflow của bạn",
  "marketplace4.select.loadFailedBody":
    "Tải lại danh sách và thử lại. Các bài đăng Marketplace hiện có không bị ảnh hưởng.",
  "marketplace4.select.retry": "Thử lại",
  "marketplace4.select.emptyTitle": "Chưa có workflow nào đăng được",
  "marketplace4.select.emptyBody":
    "Tạo và lưu một workflow trong builder. Workflow sẽ xuất hiện ở đây khi có phiên bản sẵn sàng gửi.",
  "marketplace4.select.openBuilder": "Mở builder",
  "marketplace4.select.searchPlaceholder": "Tìm workflow của bạn",
  "marketplace4.select.sortLabel": "Sắp xếp workflow",
  "marketplace4.select.sortMostRecent": "Sắp xếp: Mới nhất",
  "marketplace4.select.sortAlphabetical": "Sắp xếp: Theo bảng chữ cái",
  "marketplace4.select.listHeading": "Danh sách workflow",
  "marketplace4.select.scrollableList": "Danh sách workflow cuộn được",
  "marketplace4.select.noMatches": "Không có workflow khớp “{query}”",
  "marketplace4.select.noMatchesHint": "Thử tên khác hoặc xoá tìm kiếm.",
  "marketplace4.select.clearSearch": "Xoá tìm kiếm",
  "marketplace4.select.edited": "Đã sửa {date}",
  "marketplace4.select.cancel": "Huỷ",
  "marketplace4.select.continue": "Tiếp tục",
  "marketplace4.select.range": "{start}–{end} trên {total}",
  "marketplace4.select.previousPage": "Trang trước",
  "marketplace4.select.nextPage": "Trang sau",

  "marketplace4.auth.title": "Chia sẻ sáng tạo AI của bạn",
  "marketplace4.auth.body":
    "Đăng nhập hoặc tạo tài khoản để đăng workflow lên Marketplace và tham gia cộng đồng người sáng tạo",
  "marketplace4.auth.login": "Đăng nhập",
  "marketplace4.auth.createAccount": "Tạo tài khoản",

  "marketplace4.rejection.title": "Phản hồi duyệt",

  "marketplace4.reviewFooter.editDetails": "Sửa thông tin",
  "marketplace4.reviewFooter.done": "Xong",
  "marketplace4.reviewFooter.viewOnMarketplace": "Xem trên Marketplace",
  "marketplace4.reviewFooter.goToDashboard": "Tới Creator Dashboard",

  "marketplace4.stepper.heading": "Điều gì diễn ra tiếp theo",
  "marketplace4.stepper.submittedTitle": "Đã gửi để duyệt",
  "marketplace4.stepper.submittedBody":
    "Bài đăng của bạn đang xếp hàng trong quy trình duyệt Marketplace.",
  "marketplace4.stepper.inReviewTitle": "Đang duyệt",
  "marketplace4.stepper.inReviewBody":
    "Đội ngũ của chúng tôi kiểm tra thông tin, phương tiện và độ an toàn của workflow.",
  "marketplace4.stepper.inReviewNote": "Thường được duyệt trong 2–3 ngày.",
  "marketplace4.stepper.liveTitle": "Được đăng",
  "marketplace4.stepper.liveBody":
    "Bạn sẽ nhận email khi được duyệt. Bài bị từ chối sẽ nhận phản hồi kèm theo.",

  "marketplace4.share.copiedToast": "Đã sao chép liên kết",
  "marketplace4.share.copyFailedToast": "Không sao chép được liên kết",
  "marketplace4.share.copiedLabel": "Đã sao chép",
  "marketplace4.share.copy": "Sao chép liên kết chia sẻ",

  "marketplace4.strip.heading": "Đăng workflow",
  "marketplace4.strip.progressAria": "Tiến trình đăng",
  "marketplace4.strip.workflow": "Workflow",
  "marketplace4.strip.listing": "Thông tin",
  "marketplace4.strip.review": "Duyệt",

  "marketplace4.summary.inReview": "Đang duyệt",
  "marketplace4.hero.approvedTitle": "Workflow đã được duyệt",
  "marketplace4.hero.approvedBody":
    "Workflow của bạn đã được duyệt và đang hiển thị trên Marketplace của AutoGPT.",
  "marketplace4.hero.rejectedTitle": "Workflow cần chỉnh sửa",
  "marketplace4.hero.rejectedBody":
    "Bài đăng của bạn chưa được duyệt. Xem phản hồi và gửi lại.",
  "marketplace4.hero.draftTitle": "Đã lưu bản nháp",
  "marketplace4.hero.draftBody":
    "Workflow này chưa được gửi. Hoàn tất thông tin rồi gửi để duyệt.",
  "marketplace4.hero.pendingTitle": "Đã nhận bài đăng",
  "marketplace4.hero.pendingBodyDashboard":
    "Chúng tôi sẽ thông báo khi duyệt xong. Workflow được duyệt sẽ hiển thị trên Marketplace.",
  "marketplace4.hero.pendingBody":
    "Chúng tôi sẽ thông báo khi duyệt xong. Theo dõi tiến trình trong Creator Dashboard.",

  "marketplace4.meta.version": "Phiên bản",
  "marketplace4.meta.category": "Danh mục",
  "marketplace4.meta.liveSince": "Hiển thị từ",
  "marketplace4.meta.runs": "Lượt chạy",
  "marketplace4.meta.reviewed": "Đã duyệt",
  "marketplace4.meta.submitted": "Đã gửi",
  "marketplace4.meta.status": "Trạng thái",
  "marketplace4.meta.notSubmitted": "Chưa gửi",
  "marketplace4.meta.today": "hôm nay",
  "marketplace4.meta.yesterday": "hôm qua",
  "marketplace4.meta.daysAgo": "{count} ngày trước",
  "marketplace4.meta.weekAgo": "1 tuần trước",
  "marketplace4.meta.weeksAgo": "{count} tuần trước",
  "marketplace4.meta.monthAgo": "1 tháng trước",
  "marketplace4.meta.monthsAgo": "{count} tháng trước",
  "marketplace4.meta.yearAgo": "1 năm trước",
  "marketplace4.meta.yearsAgo": "{count} năm trước",
};
