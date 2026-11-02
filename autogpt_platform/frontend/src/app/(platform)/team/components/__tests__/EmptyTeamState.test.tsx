import { render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { describe, expect, test } from "vitest";
import { EmptyTeamState } from "../EmptyTeamState";

describe("EmptyTeamState", () => {
  test("words the empty state and its actions in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <EmptyTeamState />
      </LocaleProvider>,
    );

    expect(screen.getByText("Chưa tuyển chuyên gia nào")).toBeDefined();
    expect(
      screen.getByText(
        "Tuyển một chuyên gia từ marketplace và họ sẽ hiện ở đây, sẵn sàng làm việc cùng Otto.",
      ),
    ).toBeDefined();
    const browse = screen.getByRole("link", { name: "Xem marketplace" });
    expect(browse.getAttribute("href")).toBe("/marketplace");
    const create = screen.getByRole("link", { name: "Tạo chuyên gia" });
    expect(create.getAttribute("href")).toBe("/raise");
  });
});
