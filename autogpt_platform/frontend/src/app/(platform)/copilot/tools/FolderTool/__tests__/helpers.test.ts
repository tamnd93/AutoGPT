import { describe, expect, it } from "vitest";
import { getAnimationText } from "../helpers";

describe("FolderTool getAnimationText", () => {
  it("says workflows are moving while they move into a folder", () => {
    expect(
      getAnimationText({
        type: "tool-move_agents_to_folder",
        state: "input-available",
      }),
    ).toBe("Moving workflows…");
  });
});

describe("FolderTool getAnimationText in Vietnamese", () => {
  it("words the folder progress and failure copy in Vietnamese", () => {
    expect(
      getAnimationText(
        { type: "tool-move_agents_to_folder", state: "input-available" },
        "vi",
      ),
    ).toBe("Đang di chuyển workflow…");
    expect(
      getAnimationText(
        { type: "tool-list_folders", state: "input-available" },
        "vi",
      ),
    ).toBe("Đang tải thư mục…");
    expect(
      getAnimationText(
        { type: "tool-create_folder", state: "output-available" },
        "vi",
      ),
    ).toBe("Xong");
    expect(
      getAnimationText(
        { type: "tool-create_folder", state: "output-error" },
        "vi",
      ),
    ).toBe("Thao tác thư mục thất bại");
  });
});
