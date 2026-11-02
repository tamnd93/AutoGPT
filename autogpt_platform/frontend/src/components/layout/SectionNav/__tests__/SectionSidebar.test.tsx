import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { HouseIcon } from "@hugeicons/core-free-icons";
import { describe, expect, it } from "vitest";

import { SectionSidebar } from "../SectionSidebar";

const items = [
  { label: "All", href: "/library", Icon: HouseIcon, isActive: true },
  { label: "Runs", href: "/library/runs", Icon: HouseIcon, isActive: false },
];

describe("SectionSidebar", () => {
  it("labels the way back in English", () => {
    render(<SectionSidebar items={items} className="" />);

    expect(screen.getByLabelText("Back to home")).toBeDefined();
    expect(screen.getByText("Back")).toBeDefined();
  });

  it("reads the way back in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <SectionSidebar items={items} className="" />
      </LocaleProvider>,
    );

    expect(screen.getByLabelText("Về trang chủ")).toBeDefined();
    expect(screen.getByText("Quay lại")).toBeDefined();
  });
});
