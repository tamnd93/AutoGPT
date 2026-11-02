import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

vi.mock("@/hooks/useCredentials", () => ({
  default: () => ({
    isLoading: false,
    supportsHostScoped: true,
    provider: "http",
    providerName: "HTTP",
    discriminatorValue: null,
    savedCredentials: [],
    createHostScopedCredentials: vi.fn(),
    deleteCredentials: vi.fn(),
  }),
}));

import { HostScopedCredentialsModal } from "../HotScopedCredentialsModal";

afterEach(cleanup);

describe("HotScopedCredentialsModal in Vietnamese", () => {
  it("words its title, host field and actions in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <HostScopedCredentialsModal
          schema={{ description: "Sensitive headers" } as never}
          open
          onClose={vi.fn()}
          onCredentialsCreate={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Thêm header nhạy cảm cho HTTP")).toBeDefined();
    expect(screen.getByLabelText("Mẫu host")).toBeDefined();
    expect(
      screen.getByPlaceholderText("Nhập host (ví dụ: api.example.com)"),
    ).toBeDefined();
    expect(screen.getByText("Header")).toBeDefined();
    expect(
      screen.getByRole("button", { name: /Thêm header khác/ }),
    ).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: "Lưu và dùng thông tin kết nối này",
      }),
    ).toBeDefined();
  });
});
