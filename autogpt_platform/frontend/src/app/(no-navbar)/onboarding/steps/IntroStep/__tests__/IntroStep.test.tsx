import { LocaleProvider } from "@/lib/i18n";
import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@/tests/integrations/test-utils";
import { useOnboardingWizardStore } from "../../../store";
import { IntroStep } from "../IntroStep";

beforeEach(() => useOnboardingWizardStore.getState().reset());

describe("IntroStep", () => {
  it("shows the team slide and advances the wizard on Next", () => {
    render(<IntroStep slide="team" />);
    expect(
      screen.getByRole("heading", { name: "Your own team of AI experts." }),
    ).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(useOnboardingWizardStore.getState().currentStep).toBe(2);
  });

  it("shows the Otto slide", () => {
    render(<IntroStep slide="autopilot" />);
    expect(
      screen.getByRole("heading", { name: "Meet Otto, your Head of AI." }),
    ).toBeDefined();
  });

  it("reads the team slide and its action in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <IntroStep slide="team" />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Đội ngũ chuyên gia AI của riêng bạn.",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Vượt xa trò chuyện. Có những chuyên gia nghiên cứu, sáng tạo và xử lý công việc thay bạn.",
      ),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Tiếp" })).toBeDefined();
  });

  it("reads the autopilot slide in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <IntroStep slide="autopilot" />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Gặp Otto, Giám đốc AI của bạn." }),
    ).toBeDefined();
    expect(
      screen.getByText("Khi một chuyên gia bị mắc kẹt, tôi sẽ vào cuộc."),
    ).toBeDefined();
  });

  it("shows the three approved identities without invented task states", () => {
    render(<IntroStep slide="team" />);
    expect(
      screen.getByRole("img", { name: "Otto, your personal Head of AI" }),
    ).toBeDefined();
    expect(screen.getByRole("img", { name: "Maria, AI Expert" })).toBeDefined();
    expect(screen.getByRole("img", { name: "Mina, AI Expert" })).toBeDefined();
    expect(screen.queryAllByTestId("status-dot")).toHaveLength(0);
  });
});
