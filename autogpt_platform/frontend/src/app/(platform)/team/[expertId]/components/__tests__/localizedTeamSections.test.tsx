import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

import { ExpertSoulSection } from "../ExpertSoulSection";
import { ProfileEntry } from "../ProfileEntry";
import { WorkflowCredentialStack } from "../WorkflowCredentialStack";

describe("team detail sections in Vietnamese", () => {
  it("words the Soul section and empty profile values in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ExpertSoulSection
          identity="Runs the inbox"
          voicePreferences={null}
          boundaries={null}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Danh tính")).toBeDefined();
    expect(screen.getByText("Giọng điệu")).toBeDefined();
    expect(screen.getByText("Giới hạn")).toBeDefined();
    expect(screen.getAllByText("Chưa thiết lập.")).toHaveLength(2);
  });

  it("words the profile entry label and its not-set value in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ProfileEntry label="Danh tính" value={null} />
      </LocaleProvider>,
    );

    expect(screen.getByText("Danh tính")).toBeDefined();
    expect(screen.getByText("Chưa thiết lập.")).toBeDefined();
  });

  it("words the credential stack's accessible names in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <WorkflowCredentialStack
          providers={["github", "notion", "google", "slack"]}
        />
      </LocaleProvider>,
    );

    expect(screen.getByRole("list", { name: "Thông tin kết nối đã dùng" })).toBeDefined();
    expect(screen.getByLabelText("1 nữa")).toBeDefined();
  });
});
