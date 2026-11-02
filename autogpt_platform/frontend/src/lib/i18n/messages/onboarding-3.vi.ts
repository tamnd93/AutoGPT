import { onboarding3En } from "./onboarding-3.en";

export const onboarding3Vi: Partial<
  Record<keyof typeof onboarding3En, string>
> = {
  "onboarding3.page.completionFailed":
    "Chúng tôi không hoàn tất được việc thiết lập tài khoản của bạn. Tiến độ của bạn đã được lưu; vui lòng thử lại.",
  "onboarding3.profile.saveFailed":
    "Chúng tôi không lưu được hồ sơ của bạn. Câu trả lời của bạn đã được lưu; vui lòng thử lại trước khi tiếp tục.",
  "onboarding3.checkout.pending":
    "Thanh toán của bạn vẫn đang được xác nhận. Vui lòng thử lại để kiểm tra trạng thái.",
  "onboarding3.wizard.conflict":
    "Onboarding đã được cập nhật ở một phiên khác. Hãy tải lại tiến độ mới nhất để tiếp tục. Các câu trả lời chưa lưu trên thiết bị này sẽ bị thay thế.",
  "onboarding3.wizard.accountChanged":
    "Tài khoản đăng nhập của bạn đã thay đổi. Hãy tải lại trang để khôi phục tiến độ.",
  "onboarding3.wizard.restoreFailed":
    "Chúng tôi không khôi phục được tiến độ onboarding của bạn. Vui lòng thử lại.",
  "onboarding3.wizard.offline":
    "Tiến độ đã lưu của bạn có trên thiết bị này. Các thay đổi sẽ đồng bộ khi có kết nối trở lại.",
};
