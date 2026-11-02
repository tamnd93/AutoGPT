import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";

import { PlanOffer } from "../PlanOffer";

describe("PlanOffer locale", () => {
  it("renders the english offer chrome by default", () => {
    render(<PlanOffer tier="PRO" onUpgrade={vi.fn()} />);

    expect(screen.getByText("Start Pro")).toBeDefined();
    expect(
      screen.getByText("Review your plan and payment before confirming."),
    ).toBeDefined();
  });

  it("renders the vietnamese offer chrome for the vi locale", () => {
    render(
      <LocaleProvider locale="vi">
        <PlanOffer tier="PRO" onUpgrade={vi.fn()} />
      </LocaleProvider>,
    );

    expect(screen.getByText("Bắt đầu Pro")).toBeDefined();
    expect(
      screen.getByText("Xem lại gói và thanh toán trước khi xác nhận."),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Chuyên gia cho nội dung, bán hàng và nghiên cứu, có Otto điều phối",
      ),
    ).toBeDefined();
  });
});
