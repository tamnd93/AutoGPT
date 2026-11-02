import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";

import {
  PaywallToastAction,
  PaywallToastDescription,
  PlanRequiredDescription,
} from "../PaywallToast";

vi.mock("@/hooks/useIsBillingEnabled", () => ({
  useIsBillingEnabled: () => true,
}));

describe("PaywallToast locale", () => {
  it("keeps the english copy by default", () => {
    render(
      <div>
        <PlanRequiredDescription />
        <PaywallToastAction />
      </div>,
    );
    expect(screen.getByText("Choose one to continue.")).toBeDefined();
    expect(screen.getByText("See plans")).toBeDefined();
  });

  it("renders the vietnamese copy for the vi locale", () => {
    render(
      <LocaleProvider locale="vi">
        <PaywallToastDescription recovery="Add credits" />
      </LocaleProvider>,
    );
    expect(
      screen.getByText("Chọn một gói để tiếp tục chat — Add credits."),
    ).toBeDefined();
  });

  it("renders the vietnamese plan-required copy", () => {
    render(
      <LocaleProvider locale="vi">
        <div>
          <PlanRequiredDescription />
          <PaywallToastAction />
        </div>
      </LocaleProvider>,
    );
    expect(screen.getByText("Chọn một gói để tiếp tục.")).toBeDefined();
    expect(screen.getByText("Xem các gói")).toBeDefined();
  });
});
