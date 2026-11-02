import { describe, expect, it } from "vitest";
import type { ToolUIPart } from "ai";
import { getAnimationText } from "../helpers";

type Part = {
  state: ToolUIPart["state"];
  input?: unknown;
  output?: unknown;
};

const LOADING = "Creating workflow, this might take a minute";

describe("CreateAgent getAnimationText", () => {
  it("returns the loading copy while streaming input", () => {
    expect(getAnimationText({ state: "input-streaming" })).toBe(LOADING);
    expect(getAnimationText({ state: "input-available" })).toBe(LOADING);
  });

  it("returns the loading copy when output is unparseable", () => {
    expect(
      getAnimationText({ state: "output-available", output: "not json" }),
    ).toBe(LOADING);
  });

  it("falls back to the loading copy for unknown states", () => {
    expect(
      getAnimationText({ state: "partial-output" } as unknown as Part),
    ).toBe(LOADING);
  });

  it("describes recognized outputs", () => {
    expect(
      getAnimationText({
        state: "output-available",
        output: { type: "agent_builder_saved", agent_name: "Bot" },
      }),
    ).toBe("Saved Bot");
    expect(
      getAnimationText({
        state: "output-available",
        output: { type: "agent_builder_preview", agent_name: "Bot" },
      }),
    ).toBe('Preview "Bot"');
    expect(
      getAnimationText({
        state: "output-available",
        output: { type: "suggested_goal", suggested_goal: "x" },
      }),
    ).toBe("Goal needs refinement");
  });

  it("returns the error copy on error states", () => {
    expect(getAnimationText({ state: "output-error" })).toBe(
      "Error creating workflow",
    );
  });

  it("returns the error copy when the tool answers with an error", () => {
    expect(
      getAnimationText({
        state: "output-available",
        output: { type: "error", error: "boom", message: "boom" },
      }),
    ).toBe("Error creating workflow");
  });
});

describe("CreateAgent getAnimationText in Vietnamese", () => {
  it("words the loading, saved, preview and error copy in Vietnamese", () => {
    expect(getAnimationText({ state: "input-available" }, "vi")).toBe(
      "Đang tạo workflow, có thể mất một phút",
    );
    expect(
      getAnimationText(
        {
          state: "output-available",
          output: { type: "agent_builder_saved", agent_name: "Bot" },
        },
        "vi",
      ),
    ).toBe("Đã lưu Bot");
    expect(
      getAnimationText(
        {
          state: "output-available",
          output: { type: "agent_builder_preview", agent_name: "Bot" },
        },
        "vi",
      ),
    ).toBe('Xem trước "Bot"');
    expect(getAnimationText({ state: "output-error" }, "vi")).toBe(
      "Lỗi tạo workflow",
    );
  });
});
