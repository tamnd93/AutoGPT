import { Team2En } from "./team-2.en";

export const Team2Vi: Partial<Record<keyof typeof Team2En, string>> = {
  "team2.computer.title": "Máy tính của {name}",
  "team2.computer.body":
    "Một máy đám mây liên tục chỉ {name} dùng: shell để chạy lệnh và màn hình khi cần. Máy tạm dừng giữa các lượt và không tốn phí khi tạm dừng; công cụ đã cài và tệp vẫn giữ nguyên.",
  "team2.computer.errorContext": "máy tính của chuyên gia này",
  "team2.computer.errorHint": "Không tải được trạng thái sandbox.",
  "team2.computer.statusRunning": "Đang chạy",
  "team2.computer.statusSuspended": "Tạm dừng",
  "team2.computer.statusNone": "Chưa có",
  "team2.computer.sandboxesUnavailable":
    "Triển khai này chưa cấu hình sandbox đám mây.",
  "team2.computer.reconnectDesktop": "Kết nối lại màn hình",
  "team2.computer.machineLabel": "Máy",
  "team2.computer.machineEmpty":
    "Được tạo ở tin nhắn đầu tiên chạy lệnh.",
  "team2.computer.resourcesLabel": "Tài nguyên",
  "team2.computer.resourcesEmpty": "Được cấp khi máy được tạo.",
  "team2.computer.noVolumes": " · chưa gắn ổ đĩa",
  "team2.computer.volumes": "Ổ đĩa",
  "team2.computer.securityNote":
    "{name} có toàn quyền truy cập máy này, nên mọi thứ đăng nhập trên màn hình của nó đều hiển thị với AI. Đừng đăng nhập tài khoản cá nhân ở đó.",
  "team2.computer.notCreated": "Chưa được tạo",
  "team2.computer.runningSince": "Đang chạy từ {time}",
  "team2.computer.suspendedResume":
    "Đã tạm dừng. Sẽ tiếp tục sau khoảng một giây khi cần.",
  "team2.computer.screenNoBox":
    "Màn hình tắt. Màn hình bật ở lần đầu tác vụ cần trình duyệt hoặc ứng dụng GUI.",
  "team2.computer.screenOn":
    "Màn hình đang bật. Mở màn hình để xem hoặc tiếp quản.",
  "team2.computer.screenOff":
    "Màn hình tắt. Việc bật màn hình diễn ra ngay trong máy này.",
  "team2.computer.mountExpertHome":
    "Thư mục nhà riêng. Công cụ, ghi chú và cấu hình nằm ở đây.",
  "team2.computer.mountYourWorkspace": "Không gian làm việc của bạn.",
  "team2.computer.mountShared":
    "Không gian làm việc của bạn, được chia sẻ. Tệp bàn giao đặt ở đây sẽ đến màn hình của bạn.",
  "team2.computer.mountGeneric": "Ổ đĩa được gắn.",
  "team2.computer.turnOnScreen": "Bật màn hình",
  "team2.computer.openDesktop": "Mở màn hình",
  "team2.computer.resumeDesktop": "Tiếp tục màn hình",
  "team2.computer.openFailedTitle": "Không mở được màn hình",
  "team2.computer.openFailedBody":
    "Sandbox không khởi động. Hãy thử lại sau ít phút.",
};
export const team2Vi = Team2Vi;
