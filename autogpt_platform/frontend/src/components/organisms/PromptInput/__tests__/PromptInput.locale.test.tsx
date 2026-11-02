import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocaleProvider } from "@/lib/i18n";

import { PromptInputSubmit } from "../PromptInput";

describe("PromptInputSubmit locale", () => {
  it("keeps its English submit label without a provider", () => {
    render(<PromptInputSubmit />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
  });

  it("words the submit and loading labels in Vietnamese", () => {
    const { rerender } = render(
      <LocaleProvider locale="vi">
        <PromptInputSubmit />
      </LocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Gửi" })).toBeDefined();

    rerender(
      <LocaleProvider locale="vi">
        <PromptInputSubmit status="submitted" />
      </LocaleProvider>,
    );
    expect(screen.getByRole("status", { name: "Đang tải" })).toBeDefined();
  });
});
