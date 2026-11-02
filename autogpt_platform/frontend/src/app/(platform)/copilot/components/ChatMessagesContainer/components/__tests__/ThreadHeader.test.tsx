import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n";
import { ThreadHeader } from "../ThreadHeader";

vi.mock(
  "@/components/layout/AppSidebar/components/AppSidebarTrigger/AppSidebarTrigger",
  () => ({
    AppSidebarTrigger: () => null,
    useAppSidebarToggle: () => null,
  }),
);
vi.mock("@/services/experts/expert-role-label", () => ({
  getExpertRoleLabel: (role: string) => role,
}));
vi.mock(
  "@/components/molecules/ExpertIdentityDetails/ExpertIdentityDetails",
  () => ({
    ExpertIdentityDetails: ({ name, role }: { name: string; role: string }) => (
      <span>{`${name} — ${role}`}</span>
    ),
  }),
);
vi.mock("../ExpertAvatar/ExpertAvatar", () => ({
  ExpertAvatar: () => <span data-testid="expert-avatar" />,
}));
vi.mock("@/components/atoms/Tooltip/BaseTooltip", () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipContent: () => null,
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("ThreadHeader", () => {
  afterEach(cleanup);

  it("words the loading label and Otto's role in Vietnamese", () => {
    const loading = render(
      <LocaleProvider locale="vi">
        <ThreadHeader isResolvingExpertIdentity />
      </LocaleProvider>,
    );
    expect(screen.getByLabelText("Đang tải chuyên gia")).toBeDefined();
    loading.unmount();

    render(
      <LocaleProvider locale="vi">
        <ThreadHeader />
      </LocaleProvider>,
    );
    expect(screen.getByLabelText("Otto — Trưởng nhóm AI")).toBeDefined();
  });
});
