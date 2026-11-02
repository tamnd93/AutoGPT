import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import GlobalError from "../global-error";

const captureException = vi.fn();

vi.mock("@sentry/nextjs", () => ({
  captureException: (...args: unknown[]) => captureException(...args),
}));

describe("GlobalError", () => {
  afterEach(() => {
    document.cookie = "agpt_locale=; path=/; max-age=0";
    captureException.mockClear();
  });

  it("hydrates its copy in English when no locale cookie is set", async () => {
    render(<GlobalError error={new Error("")} reset={vi.fn()} />);

    expect(
      screen.queryByText(/An unexpected error occurred. Please try again/),
    ).not.toBeNull();
    expect(screen.queryByText(/Try Again/)).not.toBeNull();
  });

  it("switches its copy to Vietnamese after mounting with a vi cookie", async () => {
    document.cookie = "agpt_locale=vi; path=/";

    render(<GlobalError error={new Error("")} reset={vi.fn()} />);

    expect(
      await screen.findByText(/Đã xảy ra lỗi không mong muốn/),
    ).toBeDefined();
    expect(screen.queryByText(/Thử lại/)).not.toBeNull();
    expect(screen.queryByText(/Báo lỗi/)).not.toBeNull();
  });

  it("captures the error and still calls reset from Retry", () => {
    const reset = vi.fn();
    render(<GlobalError error={new Error("boom")} reset={reset} />);

    expect(captureException).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /Try Again/i }));

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
