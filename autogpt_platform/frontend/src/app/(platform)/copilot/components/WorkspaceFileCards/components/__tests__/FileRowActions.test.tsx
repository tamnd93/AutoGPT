import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import type { SessionFile } from "../../../ContextPanel/components/FilesTab/useSessionFiles";
import { FileRowActions } from "../FileRowActions";

const file = {
  item: {
    id: "file-1",
    name: "report.md",
    size_bytes: 1200,
    created_at: "2026-01-02T03:04:05Z",
    mime_type: "text/markdown",
  },
  messageID: null,
} as unknown as SessionFile;

function renderActions() {
  return render(
    <FileRowActions
      file={file}
      onDownload={vi.fn()}
      onRequestDelete={vi.fn()}
    />,
  );
}

describe("FileRowActions", () => {
  it("names its download and delete actions in English by default", () => {
    renderActions();

    expect(screen.getByLabelText("Download report.md")).toBeDefined();
    expect(screen.getByLabelText("Delete report.md")).toBeDefined();
  });

  it("names its actions in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <FileRowActions
          file={file}
          onDownload={vi.fn()}
          onRequestDelete={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByLabelText("Tải report.md")).toBeDefined();
    expect(screen.getByLabelText("Xoá report.md")).toBeDefined();
  });
});
