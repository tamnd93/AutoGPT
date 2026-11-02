import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TypedFallback } from "../TypedFallback";

const LONG_VALUE = "a".repeat(20_000);

function renderComposer(isTooLong = false) {
  return render(
    <LocaleProvider locale="vi">
      <TypedFallback
        value={LONG_VALUE}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        isTooLong={isTooLong}
      />
    </LocaleProvider>,
  );
}

describe("TypedFallback — Vietnamese", () => {
  it("reads the composer's label, placeholder, limit and action in Vietnamese", () => {
    renderComposer(true);

    expect(
      screen.getByRole("textbox", { name: "Bản ghi suy nghĩ của bạn" }),
    ).toBeDefined();
    expect(
      screen.getByPlaceholderText(
        "Việc gì lặp lại mỗi tuần? Bạn muốn giao việc gì trước?",
      ),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Vượt quá giới hạn 20.000 ký tự; hãy rút gọn và thử lại.",
      ),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Xong rồi" })).toBeDefined();
  });

  it("reads the remaining-character hint in Vietnamese", () => {
    renderComposer(false);

    expect(screen.getByText("còn lại 0 ký tự")).toBeDefined();
  });
});
