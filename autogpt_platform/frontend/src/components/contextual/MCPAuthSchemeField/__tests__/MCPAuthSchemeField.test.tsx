import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { MCPAuthSchemeField } from "../MCPAuthSchemeField";
import {
  mcpAuthTokenHint,
  mcpAuthTokenLabel,
  mcpAuthTokenPlaceholder,
} from "../helpers";

describe("MCPAuthSchemeField", () => {
  it("renders a plain label with the given class by default", () => {
    render(
      <MCPAuthSchemeField
        value="bearer"
        onChange={vi.fn()}
        labelClassName="mt-1"
      />,
    );

    const label = screen.getByText("Authentication type");
    expect(label.tagName).toBe("LABEL");
    expect(label.getAttribute("data-slot")).toBeNull();
    expect(label.className).toBe("mt-1");
  });

  it("renders the label through Text when given a variant, still naming the select", () => {
    const onChange = vi.fn();
    render(
      <MCPAuthSchemeField
        value="bearer"
        onChange={onChange}
        labelVariant="body-medium-tight"
      />,
    );

    const label = screen.getByText("Authentication type");
    expect(label.tagName).toBe("LABEL");
    expect(label.getAttribute("data-slot")).toBe("text");
    expect(label.className).toContain("font-medium");
    expect(label.className).toContain("text-inherit");

    const select = screen.getByLabelText("Authentication type");
    fireEvent.change(select, { target: { value: "basic" } });
    expect(onChange).toHaveBeenCalledWith("basic");
  });

  it("words its label, options and accessible name in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <MCPAuthSchemeField
          value="bearer"
          onChange={vi.fn()}
          nameSuffix="GitHub"
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Kiểu xác thực")).toBeDefined();
    expect(
      screen.getByRole("combobox", { name: "Kiểu xác thực cho GitHub" }),
    ).toBeDefined();
    expect(
      screen.getByRole("option", { name: "API token (Bearer)" }),
    ).toBeDefined();
    expect(
      screen.getByRole("option", { name: "Xác thực Basic" }),
    ).toBeDefined();
  });

  it("words the token label, hint and placeholder in Vietnamese", () => {
    expect(mcpAuthTokenLabel("basic", "vi")).toBe("Token xác thực Basic");
    expect(mcpAuthTokenPlaceholder("bearer", "vi")).toBe("Dán API token");
    expect(mcpAuthTokenHint("bearer", "vi")).toContain(
      "AutoGPT gửi token bằng xác thực Bearer",
    );
    expect(mcpAuthTokenLabel("bearer")).toBe("API token");
  });
});
