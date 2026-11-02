import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { HouseIcon } from "@hugeicons/core-free-icons";
import { describe, expect, it } from "vitest";

import { SectionMobileNav } from "../SectionMobileNav";

const items = [
  { label: "All", href: "/library", Icon: HouseIcon, isActive: true },
  { label: "Runs", href: "/library/runs", Icon: HouseIcon, isActive: false },
];

describe("SectionMobileNav", () => {
  it("labels the way back and the section menu in English", () => {
    render(
      <SectionMobileNav items={items} sectionName="Library" showBackLink />,
    );

    expect(screen.getByLabelText("Back to home")).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: "Library navigation, current: All",
      }),
    ).toBeDefined();
  });

  it("reads the way back and the section menu in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <SectionMobileNav items={items} sectionName="Thư viện" showBackLink />
      </LocaleProvider>,
    );

    expect(screen.getByLabelText("Về trang chủ")).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: "Thư viện điều hướng, hiện tại: All",
      }),
    ).toBeDefined();
  });
});
