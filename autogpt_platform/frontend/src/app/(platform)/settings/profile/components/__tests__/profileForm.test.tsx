import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, test, vi } from "vitest";
import { LinksSection } from "../LinksSection/LinksSection";
import { ProfileForm } from "../ProfileForm/ProfileForm";

const FORM_STATE = {
  name: "",
  username: "",
  description: "",
  avatar_url: "",
  links: [],
};

describe("profile form chrome in Vietnamese", () => {
  test("reads the links section in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <LinksSection
          links={[]}
          onChange={vi.fn()}
          onAdd={vi.fn()}
          onRemove={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Liên kết của bạn")).toBeDefined();
    expect(
      screen.getByText(
        "Thêm tối đa 5 liên kết. Trang web, GitHub, X, bất cứ thứ gì bạn muốn hiển thị.",
      ),
    ).toBeDefined();
    expect(screen.getByText("Chưa có liên kết nào.")).toBeDefined();
    expect(screen.getByRole("button", { name: "Thêm liên kết" })).toBeDefined();
  });

  test("reads the bio editor in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ProfileForm formState={FORM_STATE} errors={{}} onChange={vi.fn()} />
      </LocaleProvider>,
    );

    expect(screen.getByText("Giới thiệu")).toBeDefined();
    expect(screen.getByText("còn 280 ký tự")).toBeDefined();
    expect(screen.getByRole("button", { name: "Xem trước" })).toBeDefined();
    expect(
      screen.getByPlaceholderText(
        "Cho mọi người biết bạn xây gì, những workflow bạn gửi, và điều bạn quan tâm.",
      ),
    ).toBeDefined();
  });
});
