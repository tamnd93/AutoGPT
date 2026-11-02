import { describe, expect, test, vi } from "vitest";
import { render, screen, within } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { AIAgentSafetyPopup } from "../AIAgentSafetyPopup";

vi.mock("@/lib/hooks/useBreakpoint", () => ({
  useBreakpoint: () => "lg",
  isLargeScreen: () => true,
}));

describe("AIAgentSafetyPopup", () => {
  test("renders dialog with accessible title when open", () => {
    render(
      <AIAgentSafetyPopup
        agentId="agent-1"
        onAcknowledge={vi.fn()}
        isOpen={true}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Safety Checks")).toBeDefined();
  });

  test("reads the safety popup in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <AIAgentSafetyPopup
          agentId="agent-1"
          onAcknowledge={vi.fn()}
          isOpen={true}
        />
      </LocaleProvider>,
    );

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Kiểm tra an toàn")).toBeDefined();
    expect(within(dialog).getByText("Đã bật kiểm tra an toàn")).toBeDefined();
    expect(within(dialog).getByText("Đã hiểu")).toBeDefined();
  });

  test("renders safety content when open", () => {
    render(
      <AIAgentSafetyPopup
        agentId="agent-1"
        onAcknowledge={vi.fn()}
        isOpen={true}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Safety Checks Enabled")).toBeDefined();
    expect(within(dialog).getByText("Got it")).toBeDefined();
  });

  test("does not render when isOpen is false", () => {
    render(
      <AIAgentSafetyPopup
        agentId="agent-1"
        onAcknowledge={vi.fn()}
        isOpen={false}
      />,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
