import { render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { describe, expect, test } from "vitest";
import { AutopilotAboutSection } from "../AutopilotAboutSection";

describe("AutopilotAboutSection", () => {
  test("words the about entries in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <AutopilotAboutSection />
      </LocaleProvider>,
    );

    expect(screen.getByText("Tiểu sử")).toBeDefined();
    expect(screen.getByText("Danh tính")).toBeDefined();
    expect(screen.getByText("Làm việc với")).toBeDefined();
    expect(screen.getByText("Giới hạn")).toBeDefined();
    expect(
      screen.getByText(
        "Chuyên gia tổng quát có sẵn của bạn. Nó trả lời câu hỏi, chạy workflow và giao việc cho các chuyên gia bạn đã tuyển.",
      ),
    ).toBeDefined();
  });
});
