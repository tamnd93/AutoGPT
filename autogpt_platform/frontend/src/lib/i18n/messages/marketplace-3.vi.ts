import { marketplace3En } from "./marketplace-3.en";

export const marketplace3Vi: Partial<
  Record<keyof typeof marketplace3En, string>
> = {
  "marketplace3.edit.title": "Chỉnh sửa bài đăng",
  "marketplace3.edit.updateNote": "Ghi chú cập nhật",
  "marketplace3.edit.updateNoteBody":
    "Người duyệt dùng thông tin này để hiểu vì sao bài đăng được chỉnh sửa.",
  "marketplace3.edit.whatChanged": "Đã thay đổi gì?",
  "marketplace3.edit.whatChangedTooltip":
    "Tóm tắt điểm mới hoặc cải thiện trong phiên bản này. Người duyệt xem mục này trước.",
  "marketplace3.edit.whatChangedPlaceholder":
    "Mô tả ngắn gọn những gì bạn đã thay đổi",
  "marketplace3.edit.listingBasics": "Thông tin cơ bản",
  "marketplace3.edit.titleLabel": "Tiêu đề",
  "marketplace3.edit.titleTooltip":
    "Tên công khai hiển thị trên bài đăng Marketplace.",
  "marketplace3.edit.titlePlaceholder": "Tên workflow",
  "marketplace3.edit.tagline": "Dòng giới thiệu",
  "marketplace3.edit.taglineTooltip":
    "Dòng phụ một câu hiển thị dưới tên workflow và trên thẻ xem trước. Bắt đầu bằng động từ và nêu kết quả cho người dùng.",
  "marketplace3.edit.taglinePlaceholder":
    "Tìm người ra quyết định ở mọi công ty trong vài giây",
  "marketplace3.edit.category": "Danh mục",
  "marketplace3.edit.categoryTooltip":
    "Danh mục chính giúp người dùng khám phá workflow.",
  "marketplace3.edit.thumbnails": "Hình thu nhỏ",
  "marketplace3.edit.experience": "Chi tiết trải nghiệm",
  "marketplace3.edit.description": "Mô tả",
  "marketplace3.edit.descriptionTooltip":
    "Workflow làm gì và người dùng nhận được kết quả gì.",
  "marketplace3.edit.descriptionPlaceholder":
    "Mô tả kết quả mà workflow này tạo ra",
  "marketplace3.edit.youtube": "Liên kết video YouTube",
  "marketplace3.edit.youtubeTooltip":
    "Video demo hoặc hướng dẫn đăng trên YouTube.",
  "marketplace3.edit.youtubePlaceholder": "https://youtube.com/watch?v=...",
  "marketplace3.edit.outputDemo": "Demo kết quả",
  "marketplace3.edit.outputDemoTooltip":
    "Liên kết tới ví dụ kết quả mà workflow tạo ra.",
  "marketplace3.edit.cancel": "Huỷ",
  "marketplace3.edit.saving": "Đang lưu",
  "marketplace3.edit.updateSubmission": "Cập nhật bài đăng",
  "marketplace3.edit.updatedTitle": "Đã cập nhật workflow",
  "marketplace3.edit.updatedBody":
    "Bài đăng workflow của bạn đã được cập nhật thành công.",
  "marketplace3.edit.errorTitle": "Lỗi chỉnh sửa workflow",
  "marketplace3.edit.errorBody":
    "Đã xảy ra lỗi khi chỉnh sửa workflow. Vui lòng thử lại.",
  "marketplace3.edit.failedUpdate": "Không cập nhật được bài đăng",
  "marketplace3.edit.imageRequired": "Cần ít nhất một hình ảnh",

  "marketplace3.zod.titleRequired": "Cần nhập tiêu đề",
  "marketplace3.zod.titleTooLong": "Tiêu đề phải dưới 100 ký tự",
  "marketplace3.zod.taglineRequired": "Cần nhập dòng giới thiệu",
  "marketplace3.zod.taglineTooLong":
    "Dòng giới thiệu phải từ {max} ký tự trở xuống",
  "marketplace3.zod.slugRequired": "Cần nhập slug",
  "marketplace3.zod.slugTooLong": "Slug phải dưới 50 ký tự",
  "marketplace3.zod.slugFormat": "Slug chỉ chứa chữ thường, số và dấu gạch nối",
  "marketplace3.zod.youtubeInvalid": "Vui lòng nhập URL YouTube hợp lệ",
  "marketplace3.zod.categoryRequired": "Cần chọn danh mục",
  "marketplace3.zod.descriptionRequired": "Cần nhập mô tả",
  "marketplace3.zod.descriptionTooLong": "Mô tả phải dưới 1000 ký tự",
  "marketplace3.zod.changesRequired": "Cần nhập tóm tắt thay đổi khi cập nhật",
  "marketplace3.zod.changesTooLong": "Tóm tắt thay đổi phải dưới 500 ký tự",
  "marketplace3.zod.instructionsTooLong": "Hướng dẫn phải dưới 2000 ký tự",

  "marketplace3.publish.title": "Đăng workflow",
  "marketplace3.publish.button": "Đăng workflow",
  "marketplace3.publish.selectionRequiredTitle": "Cần chọn workflow",
  "marketplace3.publish.selectionRequiredBody":
    "Vui lòng chọn một workflow trước khi gửi lên cửa hàng.",
  "marketplace3.publish.submitErrorTitle": "Lỗi gửi workflow",
  "marketplace3.publish.submitErrorBody":
    "Đã xảy ra lỗi khi gửi workflow. Vui lòng thử lại.",
  "marketplace3.publish.planPublishing": "Đăng cần gói đang hoạt động",
  "marketplace3.publish.planUploading":
    "Tải hình ảnh lên cần gói đang hoạt động",
  "marketplace3.publish.planGenerating": "Tạo hình ảnh cần gói đang hoạt động",
  "marketplace3.publish.buildListing": "Tạo bài đăng cửa hàng",
  "marketplace3.publish.buildListingBody":
    "Viết vài thông tin về workflow để người duyệt và người dùng biết sẽ nhận được gì.",
  "marketplace3.publish.describeUpdate": "Mô tả bản cập nhật",
  "marketplace3.publish.describeUpdateBody":
    "Giải thích những gì đã thay đổi, rồi điều chỉnh thông tin bài đăng cần đổi theo phiên bản này.",
  "marketplace3.publish.updateNoteBody":
    "Người duyệt dùng thông tin này để hiểu vì sao bài đăng Marketplace cần phiên bản mới.",
  "marketplace3.publish.slug": "Slug",
  "marketplace3.publish.slugTooltip":
    "Định danh thân thiện với URL dùng trong đường dẫn Marketplace. Chỉ chữ thường, số và dấu gạch nối.",
  "marketplace3.publish.slugPlaceholder": "Tên thân thiện với URL",
  "marketplace3.publish.instructions": "Hướng dẫn",
  "marketplace3.publish.instructionsTooltip":
    "Các bước người dùng cần làm để thiết lập và chạy workflow.",
  "marketplace3.publish.instructionsPlaceholder":
    "Giải thích đầu vào, cách thiết lập và điều sẽ xảy ra sau khi chạy",
  "marketplace3.publish.recommendedSchedule": "Lịch đề xuất",
  "marketplace3.publish.recommendedScheduleTooltip":
    "Lịch cron gợi ý để người dùng chạy workflow. Đặt nhịp chạy cho các trường hợp lặp lại.",
  "marketplace3.publish.setSchedule": "Đặt lịch",
  "marketplace3.publish.recommendedScheduleTitle": "Lịch đề xuất",
  "marketplace3.publish.back": "Quay lại",
  "marketplace3.publish.submitting": "Đang gửi",
  "marketplace3.publish.submitForReview": "Gửi để duyệt",

  "marketplace3.thumbnails.media": "Phương tiện",
  "marketplace3.thumbnails.count": "{count}/5 hình",
  "marketplace3.thumbnails.explainer":
    "Hình được chọn được gửi trước và hiển thị thành hình thu nhỏ trên Marketplace.",
  "marketplace3.thumbnails.uploading": "Đang tải lên",
  "marketplace3.thumbnails.addImage": "Thêm hình",
  "marketplace3.thumbnails.generating": "Đang tạo",
  "marketplace3.thumbnails.generate": "Tạo hình",
  "marketplace3.thumbnails.maxReached": "Đã đạt số hình tối đa",
  "marketplace3.thumbnails.selectAria": "Chọn hình thu nhỏ {index}",
  "marketplace3.thumbnails.alt": "Hình thu nhỏ {index}",
  "marketplace3.thumbnails.removeAria": "Xoá hình {index}",
  "marketplace3.thumbnails.thumbnailLabel": "Hình thu nhỏ",
  "marketplace3.thumbnails.uploadFailed": "Tải lên thất bại",
  "marketplace3.thumbnails.tryAgain": "Vui lòng thử lại.",
  "marketplace3.thumbnails.generateFailed": "Tạo hình thất bại",
  "marketplace3.thumbnails.generateFailedBody":
    "Không tạo được hình. Vui lòng thử lại.",
  "marketplace3.thumbnails.workflowIdRequired": "Cần có ID workflow",
};
