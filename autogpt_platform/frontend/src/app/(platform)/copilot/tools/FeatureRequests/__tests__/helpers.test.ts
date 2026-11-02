import { describe, expect, it } from "vitest";
import { getAccordionTitle, getAnimationText } from "../helpers";

describe("FeatureRequests in Vietnamese", () => {
  it("words the search and create progress in Vietnamese", () => {
    expect(
      getAnimationText(
        {
          type: "tool-search_feature_requests",
          state: "input-available",
          input: { query: "dark mode" },
        },
        "vi",
      ),
    ).toBe('Đang tìm yêu cầu tính năng cho "dark mode"');
    expect(
      getAnimationText(
        { type: "tool-create_feature_request", state: "input-available" },
        "vi",
      ),
    ).toBe("Đang tạo yêu cầu tính năng");
  });

  it("words the accordion titles in Vietnamese", () => {
    expect(
      getAccordionTitle(
        "tool-search_feature_requests",
        {
          type: "feature_request_search",
          message: "",
          results: [],
          count: 2,
          query: "dark mode",
        },
        "vi",
      ),
    ).toBe("Yêu cầu tính năng");
    expect(
      getAccordionTitle(
        "tool-search_feature_requests",
        { type: "no_results", message: "" },
        "vi",
      ),
    ).toBe("Không tìm thấy yêu cầu tính năng");
    expect(
      getAccordionTitle(
        "tool-create_feature_request",
        {
          type: "feature_request_created",
          message: "",
          issue_id: "i",
          issue_identifier: "1",
          issue_title: "t",
          issue_url: "u",
          is_new_issue: false,
          customer_name: "c",
        },
        "vi",
      ),
    ).toBe("Đã thêm vào yêu cầu tính năng");
  });
});
