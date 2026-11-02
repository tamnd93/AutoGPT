import { render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { describe, expect, it, vi } from "vitest";

vi.mock("../useWorkspaceStorage", () => ({
  useWorkspaceStorage: () => ({
    data: {
      used_bytes: 5 * 1024 * 1024,
      limit_bytes: 10 * 1024 * 1024,
      file_count: 2,
    },
  }),
}));

import { StorageBar } from "../StorageBar";

describe("StorageBar", () => {
  it("labels the workspace storage in English", () => {
    render(<StorageBar />);

    expect(screen.getByText("File storage")).toBeDefined();
    expect(screen.getByText("50% used")).toBeDefined();
    expect(
      screen.getByRole("progressbar", { name: "File storage usage" }),
    ).toBeDefined();
    expect(screen.getByText("5 MB of 10 MB · 2 files")).toBeDefined();
  });

  it("reads the storage row in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <StorageBar />
      </LocaleProvider>,
    );

    expect(screen.getByText("Dung lượng tệp")).toBeDefined();
    expect(screen.getByText("đã dùng 50%")).toBeDefined();
    expect(
      screen.getByRole("progressbar", { name: "Mức dùng dung lượng tệp" }),
    ).toBeDefined();
    expect(screen.getByText("5 MB trên 10 MB · 2 tệp")).toBeDefined();
  });
});
