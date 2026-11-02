import { describe, expect, test, vi } from "vitest";
import { render, screen, within } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { CreateTemplateModal } from "../CreateTemplateModal";

vi.mock("@/lib/hooks/useBreakpoint", () => ({
  useBreakpoint: () => "lg",
  isLargeScreen: () => true,
}));

describe("CreateTemplateModal", () => {
  test("renders dialog with accessible title when open", () => {
    render(
      <CreateTemplateModal
        isOpen={true}
        onClose={vi.fn()}
        onCreate={vi.fn()}
      />,
    );

    const dialog = screen.getByRole("dialog");
    const allMatches = within(dialog).getAllByText("Create Template");
    expect(allMatches.length).toBeGreaterThanOrEqual(1);
  });

  test("reads the template form in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <CreateTemplateModal
          isOpen={true}
          onClose={vi.fn()}
          onCreate={vi.fn()}
        />
      </LocaleProvider>,
    );

    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getAllByText("Tạo template").length,
    ).toBeGreaterThanOrEqual(1);
    expect(within(dialog).getByLabelText("Tên")).toBeDefined();
    expect(within(dialog).getByLabelText("Mô tả")).toBeDefined();
  });

  test("renders form fields when open", () => {
    render(
      <CreateTemplateModal
        isOpen={true}
        onClose={vi.fn()}
        onCreate={vi.fn()}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByLabelText("Name")).toBeDefined();
    expect(within(dialog).getByLabelText("Description")).toBeDefined();
  });

  test("does not render dialog when closed", () => {
    render(
      <CreateTemplateModal
        isOpen={false}
        onClose={vi.fn()}
        onCreate={vi.fn()}
      />,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
