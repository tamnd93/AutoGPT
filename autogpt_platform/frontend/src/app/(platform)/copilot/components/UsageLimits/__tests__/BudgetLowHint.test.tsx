import { render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { describe, expect, it, vi } from "vitest";
import type { UsageSnapshot } from "@/services/usageExperience/useUsageExperience";

vi.mock("@/app/(platform)/components/ContextualTips/useTipMoment", () => ({
  useTipMoment: () => {},
}));
vi.mock("@/services/usageExperience/budget", () => ({
  budgetLowHint: () => "Allowance running low",
}));

import { BudgetLowHint } from "../BudgetLowHint";

const USAGE = {
  budget: { state: "low", window: "weekly", percentUsed: 85 },
  experience: { isLifetimeTrial: false, trialPercent: null },
} as unknown as UsageSnapshot;

describe("BudgetLowHint", () => {
  it("labels the running-low budget in English", () => {
    render(<BudgetLowHint usage={USAGE} />);

    expect(screen.getByLabelText("Budget running low")).toBeDefined();
    expect(
      screen.getByRole("progressbar", { name: "This week" }),
    ).toBeDefined();
    expect(screen.getByText("Allowance running low")).toBeDefined();
  });

  it("reads the hint in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <BudgetLowHint usage={USAGE} />
      </LocaleProvider>,
    );

    expect(screen.getByLabelText("Ngân sách sắp hết")).toBeDefined();
    expect(screen.getByRole("progressbar", { name: "Tuần này" })).toBeDefined();
  });
});
