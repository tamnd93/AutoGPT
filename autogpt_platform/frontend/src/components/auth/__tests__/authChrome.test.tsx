import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, test, vi } from "vitest";
import { CheckYourInbox } from "../CheckYourInbox/CheckYourInbox";
import { ExpiredLinkMessage } from "../ExpiredLinkMessage";
import { GoogleOAuthButton } from "../GoogleOAuthButton";
import { MobileWarningBanner } from "../MobileWarningBanner";

vi.mock("@/lib/hooks/useBreakpoint", () => ({
  useBreakpoint: () => "base",
  isLargeScreen: () => false,
}));

describe("auth chrome in Vietnamese", () => {
  test("reads the check-your-inbox screen in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <CheckYourInbox
          email="someone@example.com"
          reason="signup"
          onBack={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Kiểm tra hộp thư của bạn")).toBeDefined();
    expect(screen.getByText(/Chúng tôi đã gửi email tới/)).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Gửi lại email sau 60s" }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Bắt đầu lại" })).toBeDefined();
    expect(
      screen.getByText("Không thấy? Hãy kiểm tra thư mục spam."),
    ).toBeDefined();
  });

  test("reads the expired reset link in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ExpiredLinkMessage onRequestNewLink={vi.fn()} />
      </LocaleProvider>,
    );

    expect(
      screen.getByText(
        "Liên kết đặt lại mật khẩu của bạn đã hết hạn hoặc đã được dùng",
      ),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Yêu cầu liên kết mới" }),
    ).toBeDefined();
    expect(screen.getByText("Đã có quyền truy cập?")).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Đăng nhập tại đây" }),
    ).toBeDefined();
  });

  test("reads the Google action and the mobile banner in Vietnamese", () => {
    const { unmount } = render(
      <LocaleProvider locale="vi">
        <GoogleOAuthButton onClick={vi.fn()} />
      </LocaleProvider>,
    );
    expect(
      screen.getByRole("button", { name: /Tiếp tục với Google/ }),
    ).toBeDefined();
    unmount();

    render(
      <LocaleProvider locale="vi">
        <MobileWarningBanner />
      </LocaleProvider>,
    );
    expect(
      screen.getByText("Lưu ý: AutoGPT hoạt động tốt nhất trên máy tính"),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Một số tính năng có thể bị hạn chế trên điện thoại. Để có trải nghiệm tốt nhất, hãy chuyển sang máy tính.",
      ),
    ).toBeDefined();
  });
});
