import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

vi.mock("@/hooks/useCredentials", () => ({
  default: () => ({
    isLoading: false,
    supportsApiKey: true,
    provider: "github",
    providerName: "GitHub",
    createAPIKeyCredentials: vi.fn(),
  }),
}));

import { APIKeyCredentialsModal } from "../APIKeyCredentialsModal/APIKeyCredentialsModal";
import { CredentialTypeSelector } from "../CredentialTypeSelector/CredentialTypeSelector";
import { CredentialsSelect } from "../CredentialsSelect/CredentialsSelect";
import { CredentialsFlatView } from "../CredentialsFlatView/CredentialsFlatView";

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverStub);

const schema = {
  description: "GitHub access",
  credentials_scopes: ["repo"],
} as never;

const credential = {
  id: "cred-1",
  title: "Work account",
  type: "api_key",
  provider: "github",
};

afterEach(cleanup);

describe("credential forms in Vietnamese", () => {
  it("words the API key modal in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <APIKeyCredentialsModal
          schema={schema}
          open
          onClose={vi.fn()}
          onCredentialsCreate={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Thêm API key mới cho GitHub")).toBeDefined();
    expect(screen.getByLabelText("Tên")).toBeDefined();
    expect(
      screen.getByPlaceholderText("Nhập tên cho API key này..."),
    ).toBeDefined();
    expect(screen.getByLabelText("API Key")).toBeDefined();
    expect(screen.getByPlaceholderText("Nhập API Key...")).toBeDefined();
    expect(screen.getByLabelText("Ngày hết hạn")).toBeDefined();
    expect(screen.getByText("Quyền bắt buộc cho khối này:")).toBeDefined();
    expect(screen.getByRole("button", { name: "Thêm API Key" })).toBeDefined();
  });

  it("words the credential type selector in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <CredentialTypeSelector
          schema={schema}
          open
          onClose={vi.fn()}
          provider="github"
          providerName="GitHub"
          supportedTypes={["user_password"]}
          onCredentialsCreate={vi.fn()}
          onOAuthLogin={vi.fn()}
          onOpenPasswordModal={vi.fn()}
          onOpenHostScopedModal={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Thêm thông tin kết nối cho GitHub")).toBeDefined();
    expect(
      screen.getByText("Thêm thông tin kết nối gồm tên đăng nhập và mật khẩu."),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Nhập thông tin kết nối" }),
    ).toBeDefined();
  });

  it("words the credential select in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <CredentialsSelect
          credentials={[credential]}
          provider="github"
          displayName="GitHub"
          onSelectCredential={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      screen.getByLabelText("Chọn thông tin kết nối GitHub"),
    ).toBeDefined();
    expect(
      screen.getByRole("option", {
        name: "Không có (bỏ qua thông tin kết nối này)",
      }),
    ).toBeDefined();
  });

  it("words the flat view's optional marker in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <CredentialsFlatView
          schema={schema}
          provider="github"
          displayName="GitHub"
          credentials={[credential]}
          actionButtonText="Thêm"
          isOptional
          showTitle
          readOnly
          variant="default"
          onSelectCredential={vi.fn()}
          onClearCredential={vi.fn()}
          onAddCredential={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText(/thông tin kết nối GitHub/)).toBeDefined();
    expect(screen.getByText("(không bắt buộc)")).toBeDefined();
  });
});
