import { settingsRest2En } from "./settings-rest-2.en";

export const settingsRest2Vi: Partial<
  Record<keyof typeof settingsRest2En, string>
> = {
  "settingsRest2.pagination.showing": "Hiển thị {start}–{end} trong {total}",
  "settingsRest2.pagination.previous": "Trang trước",
  "settingsRest2.pagination.previousShort": "Trước",
  "settingsRest2.pagination.next": "Trang sau",
  "settingsRest2.pagination.nextShort": "Sau",
  "settingsRest2.pagination.goTo": "Tới trang {page}",

  "settingsRest2.empty.title": "Chưa có bài gửi nào",
  "settingsRest2.empty.body":
    "Sau khi bạn gửi workflow lên store, nó sẽ xuất hiện ở đây cùng trạng thái, lượt chạy và đánh giá.",

  "settingsRest2.stats.aria": "Thống kê bài gửi",
  "settingsRest2.stats.total": "Tổng số bài gửi",
  "settingsRest2.stats.approved": "Đã duyệt",
  "settingsRest2.stats.inReview": "Đang xét duyệt",
  "settingsRest2.stats.totalRuns": "Tổng lượt chạy",
  "settingsRest2.stats.averageRating": "Điểm đánh giá trung bình",
  "settingsRest2.stats.averageDesc": "Trên tất cả bài gửi có đánh giá.",

  "settingsRest2.submission.actionsAria": "Thao tác bài gửi",
  "settingsRest2.submission.edit": "Sửa chi tiết",
  "settingsRest2.submission.view": "Xem bài gửi",
  "settingsRest2.submission.viewMarketplace": "Xem trên marketplace",
  "settingsRest2.submission.delete": "Xoá",
  "settingsRest2.submission.deleteTitle": "Xoá bài gửi?",
  "settingsRest2.submission.deleteBodyPrefix": "Thao tác này sẽ xoá",
  "settingsRest2.submission.deleteBodySuffix":
    "khỏi store. Hành động này không thể hoàn tác.",
  "settingsRest2.submission.cancel": "Huỷ",
  "settingsRest2.submission.deleting": "Đang xoá",
  "settingsRest2.submission.deleteSubmit": "Xoá bài gửi",
  "settingsRest2.submission.deleteFailed": "Không xoá được bài gửi",
  "settingsRest2.submission.runs": "{runs} lượt chạy",

  "settingsRest2.list.title": "Bài gửi",
  "settingsRest2.list.count": "{count}/{total}",
  "settingsRest2.list.searchPlaceholder": "Tìm theo tên workflow hoặc listing",
  "settingsRest2.list.searchAria": "Tìm bài gửi",
  "settingsRest2.list.filterStatus": "Trạng thái",
  "settingsRest2.list.filterDate": "Ngày",
  "settingsRest2.list.filterRuns": "Lượt chạy",
  "settingsRest2.list.noMatchSearch": 'Không có bài gửi nào khớp "{query}"',
  "settingsRest2.list.noMatchFilters": "Không có bài gửi nào khớp bộ lọc này",
  "settingsRest2.list.clearSearch": "Xoá tìm kiếm",
  "settingsRest2.list.clearFilters": "Xoá bộ lọc",
  "settingsRest2.list.workflow": "Workflow",
  "settingsRest2.list.status": "Trạng thái",
  "settingsRest2.list.submitted": "Đã gửi",
  "settingsRest2.list.runsColumn": "Lượt chạy",
  "settingsRest2.list.actions": "Thao tác",
  "settingsRest2.list.sortSubmittedAsc": "Cũ nhất trước",
  "settingsRest2.list.sortSubmittedDesc": "Mới nhất trước",
  "settingsRest2.list.sortRunsAsc": "Thấp nhất trước",
  "settingsRest2.list.sortRunsDesc": "Cao nhất trước",

  "settingsRest2.sort.label": "Sắp xếp",
  "settingsRest2.sort.clear": "Xoá",
  "settingsRest2.statusFilter.label": "Trạng thái",
  "settingsRest2.statusFilter.heading": "Lọc theo trạng thái",
  "settingsRest2.statusFilter.clear": "Xoá",

  "settingsRest2.status.draft": "Bản nháp",
  "settingsRest2.status.inReview": "Đang xét duyệt",
  "settingsRest2.status.approved": "Đã duyệt",
  "settingsRest2.status.needsChanges": "Cần chỉnh sửa",
  "settingsRest2.status.all": "Tất cả",
  "settingsRest2.status.drafts": "Bản nháp",
  "settingsRest2.helpers.updateSubmission": "Cập nhật bài gửi",

  "settingsRest2.page.title":
    "Bảng điều khiển người sáng tạo – Nền tảng AutoGPT",
  "settingsRest2.page.errorContext": "bảng điều khiển người sáng tạo",

  "settingsRest2.memory.erase.title": "Xoá ký ức của {name}",
  "settingsRest2.memory.erase.body":
    "Xoá vĩnh viễn mọi thứ ký ức này lưu giữ. Không thể hoàn tác.",
  "settingsRest2.memory.erase.button": "Xoá ký ức",
  "settingsRest2.memory.erase.dialogTitle": "Xoá toàn bộ ký ức của {name}",
  "settingsRest2.memory.erase.withCount":
    "Mọi ký ức trong phạm vi này sẽ bị xoá vĩnh viễn — {count} {noun}, kể cả hội thoại gốc. Các phạm vi khác không bị ảnh hưởng.",
  "settingsRest2.memory.erase.memoryOne": "ký ức",
  "settingsRest2.memory.erase.memoryMany": "ký ức",
  "settingsRest2.memory.erase.withoutCount":
    "Mọi ký ức trong phạm vi này sẽ bị xoá vĩnh viễn, kể cả hội thoại gốc. Các phạm vi khác không bị ảnh hưởng.",
  "settingsRest2.memory.erase.typeToConfirm": "Nhập {name} để xác nhận.",
  "settingsRest2.memory.erase.typeToConfirmPrefix": "Nhập",
  "settingsRest2.memory.erase.typeToConfirmSuffix": "để xác nhận.",
  "settingsRest2.memory.erase.inputLabel": "Nhập {name} để xác nhận",
  "settingsRest2.memory.erase.cancel": "Huỷ",
  "settingsRest2.memory.erase.eraseAll": "Xoá tất cả",

  "settingsRest2.memory.learning.title": "Lịch sử học",
  "settingsRest2.memory.learning.body":
    "Những gì quá trình học qua đêm đã thay đổi, nguồn gốc, và những gì nó chưa học.",
  "settingsRest2.memory.learning.origin": "Nguồn",
  "settingsRest2.memory.learning.state": "Trạng thái",
  "settingsRest2.memory.learning.empty":
    "Chưa học được gì. Một đêm yên ắng nghĩa là không có gì cần thay đổi.",
  "settingsRest2.memory.learning.review": "Xem lại",
  "settingsRest2.memory.learning.expertFallback": "Chuyên gia",
  "settingsRest2.memory.learning.otto": "Otto",

  "settingsRest2.memory.recent.title": "Ký ức gần đây",
  "settingsRest2.memory.recent.body":
    "Những điều mới nhất ký ức này đã học. Bạn có thể quên bất kỳ điều nào.",
  "settingsRest2.memory.recent.empty":
    "Chưa ghi nhớ gì. Ký ức sẽ xuất hiện ở đây khi bạn trò chuyện.",
  "settingsRest2.memory.recent.forget": "Quên",
  "settingsRest2.memory.recent.forgetTopic": "Quên một chủ đề…",

  "settingsRest2.memory.summary.title": "Tóm tắt ký ức",
  "settingsRest2.memory.summary.bodyAutopilot":
    "Hỏi Otto những gì nó biết về bạn. Mở một đoạn chat — bạn có thể sửa hoặc quên bất cứ điều gì từ đó.",
  "settingsRest2.memory.summary.bodyExpert":
    "Hỏi {name} những gì họ biết về bạn và công việc của họ. Mở một đoạn chat.",
  "settingsRest2.memory.summary.viewMine": "Xem tóm tắt của tôi",
  "settingsRest2.memory.summary.viewExpert": "Xem tóm tắt của {name}",

  "settingsRest2.memory.scope.title": "Phạm vi ký ức",
  "settingsRest2.memory.scope.body":
    "Chọn ký ức bạn đang xem. Mỗi chuyên gia giữ ký ức riêng.",

  "settingsRest2.memory.chat.aria": "Bảng chat ký ức",
  "settingsRest2.memory.chat.header": "Ký ức của {name}",
  "settingsRest2.memory.chat.closeAria": "Đóng chat ký ức",
  "settingsRest2.memory.chat.startErrorTitle": "Không bắt đầu được chat ký ức",
  "settingsRest2.memory.chat.startErrorBody": "Đã xảy ra lỗi. Hãy thử lại.",
  "settingsRest2.memory.chat.retry": "Thử lại",
  "settingsRest2.memory.chat.starting": "Đang bắt đầu chat ký ức…",
  "settingsRest2.memory.chat.placeholder": "Hỏi hoặc cập nhật…",

  "settingsRest2.memory.decisions.title": "Cần bạn quyết định",
  "settingsRest2.memory.decisions.body":
    "Đề xuất thay đổi cho những kỹ năng bạn kiểm soát. Việc học không liên quan vẫn tiếp tục.",
  "settingsRest2.memory.decisions.keep": "Giữ hiện tại",
  "settingsRest2.memory.decisions.apply": "Áp dụng thay đổi",

  "settingsRest2.memory.scopeSelect.aria": "Phạm vi ký ức",
  "settingsRest2.memory.scopeSelect.ottoDesc":
    "Ký ức tài khoản của bạn — mọi thứ bạn làm cùng nhau",
  "settingsRest2.memory.scopeSelect.experts": "Chuyên gia của bạn",

  "settingsRest2.memory.understanding.errorContext":
    "những gì Otto biết về công việc của bạn",
  "settingsRest2.memory.understanding.title":
    "Những gì Otto biết về công việc của bạn",
  "settingsRest2.memory.understanding.body":
    "Từ quá trình onboarding và các đoạn chat của bạn. Mỗi đoạn chat mới với Otto đều bắt đầu bằng những điều này.",
  "settingsRest2.memory.understanding.dialogTitle":
    "Quên những gì Otto biết về công việc của bạn",
  "settingsRest2.memory.understanding.forget": "Quên điều này",
  "settingsRest2.memory.understanding.dialogBody":
    "Otto sẽ không dùng những điều này để bắt đầu chat mới nữa. Ký ức gần đây của bạn vẫn được giữ.",
  "settingsRest2.memory.understanding.cancel": "Huỷ",
  "settingsRest2.memory.understanding.forgotten": "Đã quên",
  "settingsRest2.memory.understanding.forgetFailed": "Không thể quên điều này",
  "settingsRest2.memory.understanding.forgetRetry": "Vui lòng thử lại.",
  "settingsRest2.memory.understanding.forgetConfirm": "Quên",
  "settingsRest2.memory.understanding.showLess": "Thu gọn",
  "settingsRest2.memory.understanding.showAll": "Hiện tất cả",

  "settingsRest2.memory.field.name": "Tên",
  "settingsRest2.memory.field.jobTitle": "Chức danh",
  "settingsRest2.memory.field.role": "Vai trò",
  "settingsRest2.memory.field.business": "Doanh nghiệp",
  "settingsRest2.memory.field.industry": "Ngành",
  "settingsRest2.memory.field.teamSize": "Quy mô nhóm",
  "settingsRest2.memory.field.keyWorkflows": "Workflow chính",
  "settingsRest2.memory.field.dailyWork": "Công việc hằng ngày",
  "settingsRest2.memory.field.painPoints": "Điểm đau",
  "settingsRest2.memory.field.bottlenecks": "Nút thắt",
  "settingsRest2.memory.field.manualTasks": "Việc thủ công",
  "settingsRest2.memory.field.goals": "Mục tiêu",
  "settingsRest2.memory.field.tools": "Công cụ bạn dùng",
  "settingsRest2.memory.field.existingAutomation": "Tự động hoá hiện có",
  "settingsRest2.memory.field.notes": "Ghi chú",
};
