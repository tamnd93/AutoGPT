import { Team6En } from "./team-6.en";

export const Team6Vi: Partial<Record<keyof typeof Team6En, string>> = {
  "team6.overview.conversations": "Hội thoại",
  "team6.overview.workflowRuns": "Lượt chạy workflow",
  "team6.overview.outputs": "Kết quả",
  "team6.overview.last30": "30 ngày qua",
  "team6.overview.unavailable": "Không khả dụng",
  "team6.overview.showingLatest200": "Đang hiện 200 mục mới nhất",
  "team6.overview.allTime": "Tất cả thời gian",
  "team6.overview.chartError": "Không tải được 30 ngày qua.",
  "team6.overview.chartEmptyTitle": "Chưa có gì để vẽ",
  "team6.overview.chartEmptyBody":
    "Khi {name} bắt đầu trò chuyện và chạy workflow, mỗi ngày sẽ hiện ở đây.",
  "team6.overview.deltaSame": "Bằng 30 ngày trước",
  "team6.overview.deltaVs": "{delta} so với 30 ngày trước",

  "team6.chart.legend": "Chú giải",

  "team6.cardError.retry": "Thử lại",

  "team6.latest.title": "Kết quả mới nhất",
  "team6.latest.error": "Không tải được kết quả.",
  "team6.latest.emptyTitle": "Chưa có kết quả nào",
  "team6.latest.emptyBody":
    "Tài liệu và tệp {name} tạo sẽ xuất hiện ở đây.",

  "team6.recent.title": "Hội thoại gần đây",
  "team6.recent.error": "Không tải được hội thoại.",
  "team6.recent.emptyTitle": "Chưa có hội thoại nào",
  "team6.recent.emptyBody":
    "Hỏi {name} một việc và cuộc trò chuyện sẽ hiện ở đây.",
  "team6.recent.startChat": "Bắt đầu trò chuyện",
  "team6.recent.untitledChat": "Trò chuyện chưa đặt tên",
  "team6.recent.workingNow": "Đang xử lý",

  "team6.summary.glanceAria": "Tổng quan về {name}",
  "team6.summary.activityAria": "Hoạt động của {name}",
  "team6.summary.streakAria": "Chuỗi hoạt động của {name}",
  "team6.summary.activity": "Hoạt động",
  "team6.summary.activityUnavailable": "Không có dữ liệu hoạt động",
  "team6.summary.streakUnavailable": "Không có dữ liệu chuỗi",
  "team6.summary.dayStreak": "ngày liên tiếp",
  "team6.summary.activeThisWeek": "Hoạt động tuần này",
  "team6.summary.quietLately": "Gần đây im ắng",
};
