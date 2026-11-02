import { Shared7En } from "./shared-7.en";

export const Shared7Vi: Partial<Record<keyof typeof Shared7En, string>> = {
  "shared7.sheet.description": "Đầu ra của lượt chạy này.",
  "shared7.sheet.exportCsv": "Xuất CSV",
  "shared7.sheet.truncatedBody":
    "Đang hiện {rows}/{totalRows} dòng và {columns}/{totalColumns} cột đầu tiên. Tệp CSV xuất ra khớp với bản xem trước này",
  "shared7.sheet.truncatedLink": "mở lượt chạy đầy đủ",
  "shared7.sheet.truncatedSuffix": " để xem toàn bộ",
  "shared7.sheet.noPreview": "Lượt chạy này chưa có bản xem trước.",
  "shared7.sheet.openFullRun":
    "Mở lượt chạy đầy đủ để xem đầu ra của nó.",
  "shared7.sheet.openRunDetails": "Mở chi tiết lượt chạy",
  "shared7.airtable.chooseLabel": "Chọn một base Airtable",
  "shared7.airtable.chooseBase": "Chọn một base",
  "shared7.airtable.searchLabel": "Tìm base của bạn",
  "shared7.airtable.searchPlaceholder": "Tìm base của bạn",
  "shared7.airtable.lockedViewOnly": "Chỉ xem",
  "shared7.airtable.lockedNeedsCreator": "Cần quyền người tạo",
  "shared7.airtable.hintRead":
    "Base là từ Airtable để chỉ một nhóm bảng, giống một tệp bảng tính có nhiều trang. Otto chỉ đọc từ base bạn chọn; không có gì trong đó bị thay đổi.",
  "shared7.airtable.hintEdit":
    "Base là từ Airtable để chỉ một nhóm bảng, giống một tệp bảng tính có nhiều trang. Otto thay đổi bản ghi trong base bạn chọn.",
  "shared7.airtable.hintCreate":
    "Base là từ Airtable để chỉ một nhóm bảng, giống một tệp bảng tính có nhiều trang. Otto thêm những gì cần vào base bạn chọn, và bạn sẽ thấy trước khi có gì thay đổi.",
  "shared7.airtable.noUsableCreator":
    "Bước này cần quyền người tạo base, mà Airtable chỉ cấp cho người thiết lập base. Hãy nhờ chủ sở hữu cấp quyền người tạo, hoặc tạo base mới.",
  "shared7.airtable.noUsableViewOnly":
    "Bạn chỉ có thể xem các base này nên Otto không thể thay đổi bản ghi. Hãy nhờ chủ sở hữu cấp quyền người chỉnh sửa, hoặc tạo base mới.",
  "shared7.airtable.loadFailed":
    "Không tải được các base Airtable của bạn. Hãy thử lại.",
  "shared7.airtable.truncated": "Đang hiện {count} base đầu tiên của bạn.",
  "shared7.airtable.wantNew": "Muốn tạo một base mới, trống?",
  "shared7.airtable.loadingAria": "Đang tải các base Airtable của bạn",
  "shared7.airtable.noMatch": 'Không có base nào khớp "{search}".',
  "shared7.airtable.tryAgain": "Thử lại",
  "shared7.airtable.noBases":
    "Airtable của bạn chưa có base nào. Hãy tạo một base trống trong Airtable, rồi quay lại làm mới danh sách.",
  "shared7.airtable.openAirtable": "Mở Airtable",
  "shared7.airtable.opensNewTab": " (mở trong tab mới)",
  "shared7.airtable.refreshList": "Làm mới danh sách",
  "shared7.credential.unsupported":
    "Lựa chọn này không còn được hỗ trợ. Hãy chọn model hoặc transport khác.",
  "shared7.credential.unavailable": "Không khả dụng trên tài khoản của bạn.",
  "shared7.credential.optionalToggle":
    "Không bắt buộc - bỏ qua block nếu chưa cấu hình",
  "shared7.drive.inputOnly": "Chọn tệp khi bạn chạy workflow",
  "shared7.json.defaultTitle": "Giá trị JSON",
  "shared7.json.expandAria": "Mở rộng đầu vào JSON",
  "shared7.json.expandTooltip": "Mở rộng đầu vào",
  "shared7.json.editTitle": "Chỉnh sửa {title}",
  "shared7.json.descriptionFallback": "Nhập JSON hợp lệ",
  "shared7.json.placeholderFallback": "Nhập giá trị JSON...",
  "shared7.llm.unavailable": "{name} (không khả dụng)",
  "shared7.llm.selectModel": "Chọn model",
  "shared7.llm.recommended": "Đề xuất",
};
