import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import type { SessionFile } from "../../../FilesTab/useSessionFiles";
import { ArtifactMiniCard } from "../ArtifactMiniCard";

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

function renderCard(onDownload = vi.fn()) {
  return render(
    <ArtifactMiniCard file={file} onOpen={vi.fn()} onDownload={onDownload} />,
  );
}

describe("ArtifactMiniCard", () => {
  it("names its download action in English by default", () => {
    renderCard();

    expect(screen.getByLabelText("Download report.md")).toBeDefined();
  });

  it("names its download action in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ArtifactMiniCard
          file={file}
          onOpen={vi.fn()}
          onDownload={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByLabelText("Tải report.md")).toBeDefined();
  });
});
