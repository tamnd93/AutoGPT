import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import type { ExpertActivityDay } from "@/app/api/__generated__/models/expertActivityDay";
import { ExpertActivityGraph } from "../ExpertActivityGraph";
import { describeActivityDay, getActivitySummary } from "../helpers";

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

  it("words a busy and a quiet day in Vietnamese, keeping English unchanged", () => {
    const busy = {
      day: "2026-08-12",
      sessions: 1,
      runs: 2,
    } as unknown as ExpertActivityDay;
    const quiet = {
      day: "2026-08-12",
      sessions: 0,
      runs: 0,
    } as unknown as ExpertActivityDay;

    expect(describeActivityDay(busy, "vi")).toBe(
      "1 phiên, 2 lượt chạy vào 12 thg 8",
    );
    expect(describeActivityDay(quiet, "vi")).toBe(
      "Không có hoạt động vào 12 thg 8",
    );
    expect(describeActivityDay(busy)).toBe("1 session, 2 runs on Aug 12");
    expect(describeActivityDay(quiet)).toBe("No activity on Aug 12");
  });

  it("words the totals line in Vietnamese, keeping English unchanged", () => {
    const days = [
      { day: "2026-08-12", sessions: 1, runs: 2 },
      { day: "2026-08-13", sessions: 0, runs: 0 },
    ] as unknown as ExpertActivityDay[];

    expect(getActivitySummary(days, "vi").totalsLabel).toBe(
      "1 phiên · 2 lượt chạy",
    );
    expect(getActivitySummary(days).totalsLabel).toBe("1 session · 2 runs");
  });
});
