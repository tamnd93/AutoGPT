import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

import { VoicePicker } from "../VoicePicker";

describe("VoicePicker in Vietnamese", () => {
  it("words its header, actions and custom sample field in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <VoicePicker
          name="Maria"
          samples={[]}
          onPick={vi.fn()}
          onSkip={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Maria nên viết như thế nào?")).toBeDefined();
    expect(
      screen.getByText(
        "Chọn giọng văn bạn thấy phù hợp. Bạn có thể chỉnh lại bất cứ lúc nào trong trình sửa Soul.",
      ),
    ).toBeDefined();
    expect(screen.getByText("Giọng văn")).toBeDefined();
    expect(screen.getByRole("button", { name: "Bỏ qua lúc này" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Dùng giọng này" })).toBeDefined();
    expect(screen.getByText("Dán mẫu của bạn")).toBeDefined();
    expect(
      screen.getByPlaceholderText(
        "Dán vài câu viết theo giọng bạn muốn chuyên gia này dùng.",
      ),
    ).toBeDefined();
  });
});
