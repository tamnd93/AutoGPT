import { describe, expect, test, vi } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import { fireEvent, render, screen } from "@/tests/integrations/test-utils";

import { CronExpressionDialog } from "../cron-scheduler-dialog";

describe("CronExpressionDialog", () => {
  test("reads the scheduler chrome in Vietnamese", async () => {
    render(
      <LocaleProvider locale="vi">
        <CronExpressionDialog open setOpen={vi.fn()} onSubmit={vi.fn()} />
      </LocaleProvider>,
    );

    expect(await screen.findByText("Đặt lịch")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Huỷ" }));
  });

  test("Cancel closes the dialog without submitting", async () => {
    const setOpen = vi.fn();
    const onSubmit = vi.fn();

    render(<CronExpressionDialog open setOpen={setOpen} onSubmit={onSubmit} />);
    fireEvent.click(await screen.findByRole("button", { name: "Cancel" }));

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
