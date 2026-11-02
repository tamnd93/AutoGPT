import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n";
import { StepStrip } from "../StepStrip";

describe("StepStrip", () => {
  it.each([
    ["select" as const, 0],
    ["info" as const, 1],
    ["review" as const, 2],
  ])("marks step %s as current", (step, expectedIndex) => {
    render(<StepStrip currentStep={step} />);
    const list = screen.getByRole("list", { name: "Publish progress" });
    const items = list.querySelectorAll("li[aria-current='step']");
    expect(items).toHaveLength(1);
    const labels = ["Workflow", "Listing", "Review"];
    expect(items[0].textContent).toContain(labels[expectedIndex]);
  });

  it("reads the publish progress in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <StepStrip currentStep="select" />
      </LocaleProvider>,
    );

    expect(screen.getByText("Đăng workflow")).toBeDefined();
    expect(screen.getByRole("list", { name: "Tiến trình đăng" })).toBeDefined();
    expect(screen.getByText("Workflow")).toBeDefined();
    expect(screen.getByText("Thông tin")).toBeDefined();
    expect(screen.getByText("Duyệt")).toBeDefined();
  });

  it("renders all three steps", () => {
    render(<StepStrip currentStep="select" />);
    expect(screen.getByText("Workflow")).toBeDefined();
    expect(screen.getByText("Listing")).toBeDefined();
    expect(screen.getByText("Review")).toBeDefined();
    expect(screen.getByText("Publish workflow")).toBeDefined();
  });
});
