import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

import { InputExpanderModal } from "../TextInput/TextInputExpanderModal";
import TextWidget from "../TextInput/TextWidget";

const registry = {
  formContext: { size: "small", uiType: "Standard" },
} as never;

function widget(schema: Record<string, unknown>) {
  return {
    id: "id",
    name: "field",
    label: "Field",
    schema,
    registry,
    formContext: {},
    onChange: vi.fn(),
    value: "",
  } as never;
}

describe("input widgets in Vietnamese", () => {
  it("words the text widget placeholders and expand control in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <TextWidget {...widget({ type: "string" })} />
      </LocaleProvider>,
    );

    expect(screen.getByPlaceholderText("Nhập giá trị chuỗi...")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Mở rộng ô nhập" }),
    ).toBeDefined();
  });

  it("words the text expander dialog in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <InputExpanderModal
          isOpen
          onClose={vi.fn()}
          onSave={vi.fn()}
          defaultValue=""
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Sửa văn bản")).toBeDefined();
    expect(screen.getByPlaceholderText("Nhập văn bản...")).toBeDefined();
    expect(screen.getByRole("button", { name: "Huỷ" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Lưu" })).toBeDefined();
  });
});
