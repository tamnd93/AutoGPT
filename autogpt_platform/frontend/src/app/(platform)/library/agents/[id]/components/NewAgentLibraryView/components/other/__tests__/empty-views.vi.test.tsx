import { describe, expect, test } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";

import { EmptySchedules } from "../EmptySchedules";
import { EmptyTemplates } from "../EmptyTemplates";
import { EmptyTriggers } from "../EmptyTriggers";

function renderVi(ui: React.ReactElement) {
  return render(<LocaleProvider locale="vi">{ui}</LocaleProvider>);
}

describe("library empty views in Vietnamese", () => {
  test("reads the schedules empty state in Vietnamese", () => {
    renderVi(<EmptySchedules />);

    expect(screen.getByText("Chưa có lịch chạy nào")).toBeDefined();
    expect(screen.getByText(/Tạo một lượt chạy mới/)).toBeDefined();
  });

  test("reads the templates empty state in Vietnamese", () => {
    renderVi(<EmptyTemplates />);

    expect(screen.getByText("Chưa có template nào")).toBeDefined();
    expect(screen.getByText(/Tạo một tác vụ trước/)).toBeDefined();
  });

  test("reads the triggers empty state in Vietnamese", () => {
    renderVi(<EmptyTriggers />);

    expect(screen.getByText("Chưa có trigger nào")).toBeDefined();
    expect(screen.getByText(/Thiết lập trigger tự động/)).toBeDefined();
  });
});
