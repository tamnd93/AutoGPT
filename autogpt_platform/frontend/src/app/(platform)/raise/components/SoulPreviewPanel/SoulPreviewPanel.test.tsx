import { render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { describe, expect, test } from "vitest";
import { SoulPreviewPanel } from "./SoulPreviewPanel";

const baseProps = {
  category: null,
  avatarUrl: null,
  color: null,
  about: null,
  voiceLabel: null,
  kit: null,
};

describe("SoulPreviewPanel", () => {
  test("keeps a heading in the outline before a name is picked", () => {
    render(<SoulPreviewPanel {...baseProps} name="" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "No name yet" }),
    ).toBeDefined();
  });

  test("keeps the same heading element once a name is picked", () => {
    render(<SoulPreviewPanel {...baseProps} name="Maria" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Maria" }),
    ).toBeDefined();
  });

  test("words the placeholder heading and detail labels in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <SoulPreviewPanel {...baseProps} name="" about="Thích SEO" />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Chưa có tên" }),
    ).toBeDefined();
    expect(screen.getByText("Giới thiệu")).toBeDefined();
    expect(screen.getByText("Thích SEO")).toBeDefined();
  });
});
