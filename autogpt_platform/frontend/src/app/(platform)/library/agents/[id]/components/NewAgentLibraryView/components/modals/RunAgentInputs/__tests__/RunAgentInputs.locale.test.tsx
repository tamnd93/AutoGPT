import type { BlockIOSubSchema } from "@/lib/autogpt-server-api/types";
import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";

import { RunAgentInputs } from "../RunAgentInputs";

describe("RunAgentInputs locale", () => {
  it("reads the boolean state and table actions in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <RunAgentInputs
          schema={{ type: "boolean", title: "Notify me" }}
          value={false}
          onChange={vi.fn()}
        />
        <RunAgentInputs
          schema={
            {
              anyOf: [{ type: "array" }, { type: "null" }],
              format: "table",
              title: "Rows",
              items: { properties: {} },
            } as unknown as BlockIOSubSchema
          }
          value={[]}
          onChange={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Đã tắt")).toBeDefined();
    expect(screen.getByRole("button", { name: "Thêm dòng" })).toBeDefined();
  });
});
