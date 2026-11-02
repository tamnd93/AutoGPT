import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n";
import { StoppedTaskCard } from "../StoppedTaskCard";

describe("StoppedTaskCard", () => {
  afterEach(cleanup);

  it("words the stop note in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <StoppedTaskCard />
      </LocaleProvider>,
    );
    expect(screen.getByText("Tác vụ đã dừng")).toBeDefined();
    expect(
      screen.getByText(
        "Phản hồi ở trên chưa hoàn tất. Bạn có thể nhờ tiếp tục hoặc nhập nội dung mới.",
      ),
    ).toBeDefined();
    expect(
      screen.getByText("Thử “continue” hoặc nhập nội dung mới."),
    ).toBeDefined();
  });
});
