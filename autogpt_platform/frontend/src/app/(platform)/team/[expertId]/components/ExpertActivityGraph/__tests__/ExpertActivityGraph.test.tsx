import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import type { ExpertActivityDay } from "@/app/api/__generated__/models/expertActivityDay";
import { ExpertActivityGraph } from "../ExpertActivityGraph";

function days(count: number): ExpertActivityDay[] {
  return Array.from({ length: count }, (_, index) => ({
    day: `2026-01-${String((index % 28) + 1).padStart(2, "0")}`,
    sessions: 1,
    runs: 0,
  })) as unknown as ExpertActivityDay[];
}

describe("ExpertActivityGraph", () => {
  it("names the range in English by default", () => {
    render(<ExpertActivityGraph days={days(90)} />);

    expect(
      screen.getByRole("img", { name: "Activity over the last 3 months" }),
    ).toBeDefined();
  });

  it("names the range in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ExpertActivityGraph days={days(90)} />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("img", { name: "Hoạt động trong 3 tháng qua" }),
    ).toBeDefined();
  });
});
