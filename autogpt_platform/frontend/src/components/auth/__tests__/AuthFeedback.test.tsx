import { LocaleProvider } from "@/lib/i18n";
import { BehaveAs } from "@/services/environment";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, test } from "vitest";
import AuthFeedback from "../AuthFeedback";

describe("AuthFeedback", () => {
  test("falls back to the generic error in English by default", () => {
    render(<AuthFeedback type="login" isError behaveAs={BehaveAs.CLOUD} />);

    expect(
      screen.getByText("Something went wrong. Please try again."),
    ).toBeDefined();
    expect(screen.getByText("Having trouble logging in?")).toBeDefined();
  });

  test("reads its fallback and its help in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <AuthFeedback type="login" isError behaveAs={BehaveAs.CLOUD} />
      </LocaleProvider>,
    );

    expect(screen.getByText("Đã xảy ra lỗi. Vui lòng thử lại.")).toBeDefined();
    expect(screen.getByText("Gặp khó khăn khi đăng nhập?")).toBeDefined();
  });
});
