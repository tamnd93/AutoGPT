import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, test } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { UsageMeters } from "../UsageMeters";

describe("UsageMeters", () => {
  test("labels the trial allowance in english", () => {
    render(<UsageMeters trialPercent={40} />);
    expect(screen.getByText("Trial allowance")).toBeDefined();
  });

  test("labels the windows in vietnamese with a provider", () => {
    render(
      <LocaleProvider locale="vi">
        <UsageMeters daily={{ percent_used: 10 }} weekly={{ percent_used: 20 }} />
      </LocaleProvider>,
    );
    expect(screen.getByText("Hôm nay")).toBeDefined();
    expect(screen.getByText("Tuần này")).toBeDefined();
  });
});
