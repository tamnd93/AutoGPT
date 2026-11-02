import { render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { BudgetStep } from "./BudgetStep";

describe("BudgetStep", () => {
  test("shows Skipped when the budget step was skipped", () => {
    render(
      <BudgetStep
        color="rose-300"
        submittedBudget={{ credits: null }}
        onSubmit={vi.fn()}
        onSkip={vi.fn()}
      />,
    );

    expect(screen.getByText("Skipped")).toBeDefined();
    expect(screen.queryByRole("group", { name: "Weekly budget" })).toBeNull();
  });

  test("submits a preset immediately", async () => {
    const onSubmit = vi.fn();
    render(
      <BudgetStep
        color="rose-300"
        submittedBudget={null}
        onSubmit={onSubmit}
        onSkip={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "$5 / week" }));
    expect(onSubmit).toHaveBeenCalledWith(500);
  });

  test("submits a custom dollar amount as credits", async () => {
    const onSubmit = vi.fn();
    render(
      <BudgetStep
        color="rose-300"
        submittedBudget={null}
        onSubmit={onSubmit}
        onSkip={vi.fn()}
      />,
    );

    await userEvent.type(
      screen.getByRole("textbox", { name: "Custom weekly budget in dollars" }),
      "7.50",
    );
    await userEvent.click(screen.getByRole("button", { name: "That's it" }));
    expect(onSubmit).toHaveBeenCalledWith(750);
  });

  test("skip keeps the platform default", async () => {
    const onSkip = vi.fn();
    render(
      <BudgetStep
        color="rose-300"
        submittedBudget={null}
        onSubmit={vi.fn()}
        onSkip={onSkip}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Skip" }));
    expect(onSkip).toHaveBeenCalled();
  });

  test("words the budget labels, hint and buttons in Vietnamese", async () => {
    const onSubmit = vi.fn();
    render(
      <LocaleProvider locale="vi">
        <BudgetStep
          color="rose-300"
          submittedBudget={null}
          onSubmit={onSubmit}
          onSkip={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("group", { name: "Ngân sách hằng tuần" }),
    ).toBeDefined();
    expect(
      screen.getByRole("textbox", {
        name: "Ngân sách hằng tuần tuỳ chỉnh (USD)",
      }),
    ).toBeDefined();
    expect(
      screen.getByPlaceholderText("Số tiền tuỳ chỉnh, ví dụ $7.50…"),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Bỏ qua để dùng mức mặc định $5 mỗi tuần. $0 sẽ tắt giới hạn hằng tuần.",
      ),
    ).toBeDefined();

    await userEvent.type(
      screen.getByRole("textbox", {
        name: "Ngân sách hằng tuần tuỳ chỉnh (USD)",
      }),
      "7.50",
    );
    await userEvent.click(screen.getByRole("button", { name: "Xong" }));
    expect(onSubmit).toHaveBeenCalledWith(750);
    expect(screen.getByRole("button", { name: "Bỏ qua" })).toBeDefined();
  });
});
