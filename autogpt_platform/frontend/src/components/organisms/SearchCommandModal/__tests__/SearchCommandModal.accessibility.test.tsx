import { render, screen } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n";
import { describe, expect, it, vi } from "vitest";
import { SearchCommandModal } from "../SearchCommandModal";

describe("SearchCommandModal accessibility", () => {
  it("describes the dialog content for assistive technology", () => {
    render(
      <SearchCommandModal
        isOpen
        onClose={vi.fn()}
        query=""
        onQueryChange={vi.fn()}
        buckets={[]}
        onSelectItem={vi.fn()}
      />,
    );

    const dialog = screen.getByRole("dialog", { name: "Search" });
    const descriptionId = dialog.getAttribute("aria-describedby");

    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId ?? "")?.textContent).toBe(
      "Search commands and results.",
    );
  });

  it("describes the dialog content in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <SearchCommandModal
          isOpen
          onClose={vi.fn()}
          query=""
          onQueryChange={vi.fn()}
          buckets={[]}
          onSelectItem={vi.fn()}
        />
      </LocaleProvider>,
    );

    const dialog = screen.getByRole("dialog", { name: "Tìm kiếm" });
    const descriptionId = dialog.getAttribute("aria-describedby");

    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId ?? "")?.textContent).toBe(
      "Tìm lệnh và kết quả.",
    );
  });
});
