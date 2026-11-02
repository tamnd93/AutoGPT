import { errors3En } from "./errors-3.en";

export const errors3Vi: Partial<Record<keyof typeof errors3En, string>> =
  {
    "errors3.mcpAuth.unencodedPassword": "Có vẻ đây là user:password chưa mã hoá. Xác thực Basic gửi Base64 của cặp đó — hãy mã hoá trước, hoặc dán nguyên header Authorization.",
    "errors3.mcpAuth.spaces": "Thông tin Basic là Base64 của user:password và không được chứa dấu cách.",
    "errors3.upload.tooLargeTitle": "Tệp quá lớn",
    "errors3.upload.tooLargeMessage": "Tệp quá lớn ({size}MB). Kích thước tối đa là {max}MB — hãy chọn tệp nhỏ hơn.",
    "errors3.upload.tooLarge": "Tệp quá lớn. Hãy chọn tệp nhỏ hơn.",
    "errors3.upload.authError": "Lỗi xác thực — hãy đăng nhập lại.",
    "errors3.upload.httpFailed": "Tải lên thất bại (HTTP {status})",
    "errors3.cron.everyMinute": "Mỗi phút",
    "errors3.cron.everyMinutes": "Mỗi {interval} phút",
    "errors3.cron.everyHourAt": "Mỗi giờ vào phút {minute}",
    "errors3.cron.everyHours": "Mỗi {interval} giờ",
    "errors3.cron.everyDayAt": "Mỗi ngày lúc {time}",
    "errors3.cron.everyDaysAt": "Mỗi {days} lúc {time}",
    "errors3.cron.everyNDaysAt": "Mỗi {interval} ngày lúc {time}",
    "errors3.cron.monthlyAt": "Vào ngày {days} hằng tháng lúc {time}",
    "errors3.cron.yearlyAt": "Hằng năm vào ngày 1 tháng {months} lúc {time}",
    "errors3.cron.rawExpression": "Biểu thức cron: {expression}",
    "errors3.cron.scheduled": "Theo lịch",
    "errors3.cron.unknownDay": "Không rõ({value})",
    "errors3.cron.unknownMonth": "Không rõ({value})",
  };
