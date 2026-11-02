import { LocaleProvider } from "@/lib/i18n";
import { render, screen, waitFor } from "@/tests/integrations/test-utils";
import { afterEach, describe, expect, test, vi } from "vitest";
import LogoutPage from "../page";

const mockReplace = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/logout",
}));

vi.mock("@/lib/auth/hooks/useAuth", () => ({
  useAuth: () => ({ logOut: vi.fn().mockResolvedValue(undefined) }),
}));

describe("LogoutPage", () => {
  afterEach(() => {
    mockReplace.mockReset();
    window.history.replaceState({}, "", "/");
  });

  test("reads its status in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <LogoutPage />
      </LocaleProvider>,
    );

    expect(screen.getByText("Đang đăng xuất...")).toBeDefined();
  });

  test.each([
    ["/logout?reason=banned", "/login?account=banned"],
    ["/logout", "/login"],
  ])("from %s it lands on %s", async (from, to) => {
    window.history.replaceState({}, "", from);

    render(<LogoutPage />);

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith(to), {
      timeout: 3000,
    });
  });
});
