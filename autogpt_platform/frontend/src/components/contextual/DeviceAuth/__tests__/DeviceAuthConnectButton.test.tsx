import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

import { DeviceAuthConnectButton } from "../DeviceAuthConnectButton";

const state = {
  connect: vi.fn(),
  cancel: vi.fn(),
  phase: "idle" as string,
  userCode: "",
  verificationUrl: "",
};

vi.mock("../useDeviceAuthConnect", () => ({
  useDeviceAuthConnect: () => state,
}));

function renderButton() {
  return render(
    <DeviceAuthConnectButton
      provider="stripe_link"
      providerName="Stripe Link"
      onSuccess={vi.fn()}
    />,
  );
}

describe("DeviceAuthConnectButton", () => {
  it("offers a connect action before the flow starts", () => {
    state.phase = "idle";
    state.userCode = "";
    renderButton();

    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("shows the code phrase and the approval link while waiting", () => {
    state.phase = "polling";
    state.userCode = "glow-relish-chaste-soft";
    state.verificationUrl = "https://app.link.com/device/setup?code=glow";
    renderButton();

    expect(screen.getByText("glow-relish-chaste-soft")).toBeTruthy();
    const link = screen.getByRole("link") as HTMLAnchorElement;
    expect(link.href).toContain("app.link.com/device/setup");
  });

  it("keeps the code phrase out of session replay", () => {
    // This is a live authorization code, so it must never be recorded.
    state.phase = "polling";
    state.userCode = "glow-relish-chaste-soft";
    state.verificationUrl =
      "https://app.link.com/device/setup?user_code=glow-relish-chaste-soft";
    renderButton();

    const code = screen.getByText("glow-relish-chaste-soft");
    const blocked = code.closest(".ph-no-capture");
    expect(blocked).not.toBeNull();
    // verification_uri_complete carries the code in the link's href.
    expect(blocked?.contains(screen.getByRole("link"))).toBe(true);
  });

  // Between clicking Connect and the initiate call returning there is no code
  // and no URL yet. Rendering the code panel then showed an empty box above an
  // "Open Stripe Link" link with href="" that just reloaded the builder.
  it("shows a starting state instead of an empty code and a dead link", () => {
    state.phase = "awaiting_user";
    state.userCode = "";
    state.verificationUrl = "";
    const { container } = renderButton();

    expect(screen.getByText(/Starting device authorization/)).toBeTruthy();
    expect(container.querySelector("a")).toBeNull();
  });

  it("words the connect prompt and button in Vietnamese", () => {
    state.phase = "idle";
    state.userCode = "";
    state.verificationUrl = "";
    render(
      <LocaleProvider locale="vi">
        <DeviceAuthConnectButton
          provider="stripe_link"
          providerName="Stripe Link"
          onSuccess={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      screen.getByText(
        "Stripe Link dùng xác thực thiết bị. Bấm nút bên dưới rồi mở liên kết để chấp thuận quyền truy cập.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Kết nối Stripe Link" }),
    ).toBeTruthy();
  });
});
