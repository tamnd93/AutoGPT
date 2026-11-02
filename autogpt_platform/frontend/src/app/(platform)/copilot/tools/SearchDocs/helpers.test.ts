import { describe, expect, it } from "vitest";
import {
  getAnimationText,
  getDocsToolTitle,
  getToolLabel,
  toDocsUrl,
} from "./helpers";

describe("toDocsUrl", () => {
  it("builds extension-less rendered-page URLs on the live host", () => {
    expect(toDocsUrl("platform/block-sdk-guide.md")).toBe(
      "https://agpt.co/docs/platform/block-sdk-guide",
    );
    expect(toDocsUrl("a/b.mdx")).toBe("https://agpt.co/docs/a/b");
  });

  it("canonicalizes underscores to hyphens like the site's edge worker", () => {
    expect(toDocsUrl("platform/new_blocks.md")).toBe(
      "https://agpt.co/docs/platform/new-blocks",
    );
  });

  it("only strips markdown extensions, not dots inside names", () => {
    expect(toDocsUrl("platform/v1.2-guide.md")).toBe(
      "https://agpt.co/docs/platform/v1.2-guide",
    );
  });
});

describe("documentation labels in vietnamese", () => {
  it("localizes the tool labels", () => {
    expect(getToolLabel("tool-search_docs", "vi")).toBe("Tài liệu");
    expect(getToolLabel("tool-get_doc_page", "vi")).toBe("Trang tài liệu");
  });

  it("localizes the accordion titles", () => {
    expect(
      getDocsToolTitle(
        "tool-search_docs",
        {
          type: "doc_search_results" as never,
          results: [],
          count: 0,
          query: "trigger",
        },
        "vi",
      ),
    ).toBe("Kết quả tài liệu");
  });

  it("localizes the search animation", () => {
    expect(
      getAnimationText(
        {
          type: "tool-search_docs",
          state: "input-available",
          input: { query: "trigger" },
        },
        "vi",
      ),
    ).toBe('Đang tìm trong tài liệu cho "trigger"');
    expect(
      getAnimationText(
        {
          type: "tool-search_docs",
          state: "input-available",
          input: { query: "trigger" },
        },
        "en",
      ),
    ).toBe('Searching documentation for "trigger"');
  });
});
