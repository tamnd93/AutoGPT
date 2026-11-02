import { Skills1En } from "./skills-1.en";

export const Skills1Vi: Partial<Record<keyof typeof Skills1En, string>> = {
  "skills1.publish.aria": "Đăng skill lên marketplace",
  "skills1.publish.title": "Đăng lên marketplace",
  "skills1.publish.submitted":
    "Đã gửi để duyệt. Skill của bạn xuất hiện trên marketplace sau khi được duyệt; bản bạn đăng là một bản sao, nên sửa ở đây sẽ không đổi gì cho tới khi bạn đăng lại.",
  "skills1.publish.introPrefix": "Đăng sẽ gửi một bản sao của",
  "skills1.publish.introSuffix":
    " để duyệt. Cho biết skill thuộc nhóm nào và cần kết nối gì.",
  "skills1.publish.category": "Danh mục",
  "skills1.publish.categoryPlaceholder": "Chọn danh mục",
  "skills1.publish.worksWith": "Hoạt động với",
  "skills1.publish.worksWithHint":
    "Các tích hợp mà hướng dẫn của bạn giả định. Người cài đặt thấy chúng và kết nối khi cần lần đầu.",
  "skills1.publish.integrationsAria": "Các tích hợp skill này dùng",
  "skills1.publish.submit": "Gửi duyệt",
  "skills1.publish.toastFailed": "Không đăng được skill này",
  "skills1.publish.tryAgain": "Vui lòng thử lại.",

  "skills1.upload.button": "Tải skill lên",
  "skills1.upload.tooltip": "Nhập một SKILL.md, hoặc gói skill dạng zip",
  "skills1.uploadError.noFrontmatter":
    "Tệp không phải SKILL.md hợp lệ — cần YAML frontmatter (---) có name và description.",
  "skills1.uploadError.missingFields":
    "Tệp không phải SKILL.md hợp lệ — frontmatter phải có name và description không rỗng.",
  "skills1.uploadError.tooLong":
    "Mô tả dài {length}/{max} ký tự — cần cắt bớt ít nhất {over}. Mô tả xuất hiện trong chỉ mục skill mỗi lượt của copilot nên phải giữ ngắn.",
  "skills1.empty.title": "Chưa có skill nào",
  "skills1.empty.bodyPrefix":
    "Cho các expert của bạn một quy trình lặp lại để làm theo. Chọn",
  "skills1.empty.newSkill": "Skill mới",
  "skills1.empty.bodyMid": " để tạo trong chat, hoặc",
  "skills1.empty.uploadSkill": "Tải skill lên",
  "skills1.empty.bodySuffix": " để nhập một skill bạn đã lưu.",
  "skills1.fileList.executable": "có thể chạy",
  "skills1.viewer.tooLarge": "Tệp này quá lớn để xem trước ở đây.",
  "skills1.viewer.notText":
    "Tệp này không phải văn bản nên không xem trước được.",
  "skills1.viewer.loadFailed": "Không tải được tệp này.",
  "skills1.panel.heading": "Skill",
  "skills1.panel.description":
    "Playbook dùng lại để các expert của bạn làm theo. Xem lại skill, nhập skill mới, hoặc xoá skill không còn dùng.",
  "skills1.panel.newSkill": "Skill mới",
  "skills1.panel.newTooltip": "Tạo skill mới trong chat",
  "skills1.panel.loadFailed": "Không tải được skill",
  "skills1.panel.listAria": "Skill",
  "skills1.item.noBody": "(không có nội dung)",
  "skills1.item.packageFiles": "Tệp trong gói ({count}):",
  "skills1.item.deleteTitle": "Xoá skill",
  "skills1.item.deleteBodyPrefix": "Xoá skill",
  "skills1.item.deleteBodySuffix":
    " khỏi thư viện? Bạn có thể tạo hoặc tải lên lại sau nếu cần.",
  "skills1.item.keepIt": "Giữ lại",
  "skills1.item.yesDelete": "Xoá luôn",
  "skills1.item.loadSkillFailed": "Không tải được skill (HTTP {status})",
  "skills1.item.downloadSkillFailed":
    "Không tải xuống được skill (HTTP {status})",
  "skills1.item.downloadFailed": "Tải skill xuống thất bại",
  "skills1.item.skillDeleted": "Đã xoá skill",
  "skills1.item.deleteFailed": "Xoá skill thất bại",

  "skills1.upload.uploaded": 'Đã tải skill "{name}" lên',
  "skills1.upload.toastFailed": "Không tải được skill lên",
  "skills1.upload.cannotUpload": "Không thể tải skill này lên",
};
