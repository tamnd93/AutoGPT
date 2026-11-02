import { LocaleProvider } from "@/lib/i18n";
import { Toaster } from "@/components/molecules/Toast/toaster";
import { fireEvent, render, screen } from "@/tests/integrations/test-utils";
import { expect, test, vi } from "vitest";
import ResetPasswordPage from "../page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/reset-password",
}));

// The request answers alike whether or not an account exists, or its address
// takes mail (email-verification-flow.test.ts), so the page can't say more.
vi.mock("../actions", () => ({
  sendResetEmail: vi.fn(async () => undefined),
  changePassword: vi.fn(),
}));

test("reads the request form in Vietnamese", () => {
  render(
    <LocaleProvider locale="vi">
      <ResetPasswordPage />
    </LocaleProvider>,
  );

  expect(screen.getByText("Đặt lại mật khẩu")).toBeDefined();
  expect(
    screen.getByRole("button", { name: "Gửi email đặt lại" }),
  ).toBeDefined();
});

test("says a reset link went out only if an account exists", async () => {
  render(
    <>
      <ResetPasswordPage />
      <Toaster />
    </>,
  );

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "someone@example.com" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send reset email" }));

  expect(
    await screen.findByText(
      "If an account exists for this address, we've sent a reset link.",
    ),
  ).toBeDefined();
  expect(screen.queryByText("Email Sent")).toBeNull();
});
