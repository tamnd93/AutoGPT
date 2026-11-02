import { act, renderHook } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { useNetworkStatus } from "../useNetworkStatus";

const toastMock = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
}));
vi.mock("sonner", () => ({ toast: toastMock }));

function wrapperFor(locale: "en" | "vi") {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
  };
}

describe("useNetworkStatus locale", () => {
  it("keeps the english toasts by default", () => {
    renderHook(() => useNetworkStatus());
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(toastMock.error).toHaveBeenCalledWith(
      "You're offline",
      expect.objectContaining({ description: "Check your internet connection" }),
    );
  });

  it("renders the vietnamese offline toast for the vi locale", () => {
    renderHook(() => useNetworkStatus(), { wrapper: wrapperFor("vi") });
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(toastMock.error).toHaveBeenCalledWith(
      "Bạn đang ngoại tuyến",
      expect.objectContaining({
        description: "Kiểm tra kết nối internet của bạn",
      }),
    );
  });

  it("renders the vietnamese restored toast for the vi locale", () => {
    renderHook(() => useNetworkStatus(), { wrapper: wrapperFor("vi") });
    act(() => {
      window.dispatchEvent(new Event("online"));
    });
    expect(toastMock.success).toHaveBeenCalledWith(
      "Đã có kết nối lại",
      expect.objectContaining({ description: "Bạn đã trực tuyến trở lại" }),
    );
  });
});
