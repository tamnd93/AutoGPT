import { afterEach, describe, expect, test, vi } from "vitest";

import { cleanup, render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { SharedChatErrorState } from "../SharedChatErrorState";

afterEach(() => {
  cleanup();
});

describe("SharedChatErrorState", () => {
  test("renders the not-found copy", () => {
    render(<SharedChatErrorState onRetry={vi.fn()} />);
    expect(screen.getByText(/share link not found/i)).toBeDefined();
    expect(screen.getByText(/invalid or has been disabled/i)).toBeDefined();
  });

  test("reads the error copy in Vietnamese when the app is set to Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <SharedChatErrorState onRetry={vi.fn()} />
      </LocaleProvider>,
    );
    expect(
      screen.getByText("Không tìm thấy liên kết chia sẻ"),
    ).toBeDefined();
    expect(screen.getByText(/Liên kết này không hợp lệ/)).toBeDefined();
    expect(screen.getByRole("button", { name: "Thử lại" })).toBeDefined();
  });

  test("invokes onRetry when the user clicks 'Try again'", () => {
    const onRetry = vi.fn();
    render(<SharedChatErrorState onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    retryButton.click();

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
