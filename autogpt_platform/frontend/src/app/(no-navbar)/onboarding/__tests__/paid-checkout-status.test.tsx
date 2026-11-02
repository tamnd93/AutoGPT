import { LocaleProvider } from "@/lib/i18n";
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { usePaidCheckoutStatus } from "../usePaidCheckoutStatus";

const { subscriptionStatus } = vi.hoisted(() => ({
  subscriptionStatus: { refetch: vi.fn() },
}));

vi.mock("@/app/api/__generated__/endpoints/credits/credits", () => ({
  getGetSubscriptionStatusQueryKey: () => ["/api/credits/subscription"],
  useGetSubscriptionStatus: () => ({
    data: "NO_TIER",
    isLoading: false,
    refetch: subscriptionStatus.refetch,
  }),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("subscription=success"),
}));

beforeEach(() => {
  vi.useFakeTimers();
  subscriptionStatus.refetch.mockReset();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

async function waitForTimeout() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(15_000);
  });
}

it("explains a still-unconfirmed payment in English by default", async () => {
  const { result } = renderHook(() => usePaidCheckoutStatus("u1", true));

  expect(result.current.pending).toBe(true);
  await waitForTimeout();

  expect(result.current.error).toBe(
    "Your payment is still being confirmed. Please retry to check its status.",
  );
});

it("reads the still-unconfirmed payment in Vietnamese", async () => {
  const { result } = renderHook(() => usePaidCheckoutStatus("u1", true), {
    wrapper: ({ children }) => (
      <LocaleProvider locale="vi">{children}</LocaleProvider>
    ),
  });

  await waitForTimeout();

  expect(result.current.pending).toBe(false);
  expect(result.current.error).toBe(
    "Thanh toán của bạn vẫn đang được xác nhận. Vui lòng thử lại để kiểm tra trạng thái.",
  );
});
