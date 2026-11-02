import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, test } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { OutputActions } from "../OutputActions";

describe("OutputActions", () => {
  test("names the actions in english", () => {
    render(<OutputActions items={[]} isPrimary />);
    expect(screen.getByLabelText("Copy all text outputs")).toBeDefined();
    expect(screen.getByLabelText("Download outputs")).toBeDefined();
    expect(screen.getByText("Copy All")).toBeDefined();
    expect(screen.getByText("Download All")).toBeDefined();
  });

  test("names them in vietnamese with a provider", () => {
    render(
      <LocaleProvider locale="vi">
        <OutputActions items={[]} isPrimary />
      </LocaleProvider>,
    );
    expect(
      screen.getByLabelText("Sao chép tất cả đầu ra văn bản"),
    ).toBeDefined();
    expect(screen.getByLabelText("Tải các đầu ra")).toBeDefined();
    expect(screen.getByText("Sao chép tất cả")).toBeDefined();
    expect(screen.getByText("Tải tất cả")).toBeDefined();
  });
});
