import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

import { Dialog } from "../Dialog";
import {
  Dialog as DialogRoot,
  DialogContent,
} from "../components/DialogPrimitives";

describe("dialog accessibility labels in Vietnamese", () => {
  it("words the fallback title, description and close label of the dialog", () => {
    render(
      <LocaleProvider locale="vi">
        <Dialog controlled={{ isOpen: true, set: () => {} }}>
          <Dialog.Content>
            <p>body</p>
          </Dialog.Content>
        </Dialog>
      </LocaleProvider>,
    );

    expect(screen.getAllByText("Hộp thoại").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("button", { name: "Đóng" })).toBeDefined();
  });

  it("words the primitive dialog's close label in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <DialogRoot open>
          <DialogContent>
            <p>body</p>
          </DialogContent>
        </DialogRoot>
      </LocaleProvider>,
    );

    expect(screen.getByRole("button", { name: "Đóng" })).toBeDefined();
    expect(screen.getAllByText("Hộp thoại").length).toBeGreaterThanOrEqual(1);
  });
});
