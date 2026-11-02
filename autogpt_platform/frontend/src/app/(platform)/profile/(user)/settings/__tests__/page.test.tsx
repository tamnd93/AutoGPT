import type { ReactNode } from "react";

import { LocaleProvider } from "@/lib/i18n";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@/tests/integrations/test-utils";
import {
  getGetV1GetNotificationPreferencesMockHandler,
  getGetV1GetUserTimezoneMockHandler,
  getPostV1UpdateNotificationPreferencesMockHandler,
} from "@/app/api/__generated__/endpoints/auth/auth.msw";
import type { NotificationPreference } from "@/app/api/__generated__/models/notificationPreference";
import type { NotificationPreferenceDTO } from "@/app/api/__generated__/models/notificationPreferenceDTO";
import { server } from "@/mocks/mock-server";
import SettingsPage from "../page";
import { beforeEach, describe, expect, test, vi } from "vitest";

const mockUseAuth = vi.hoisted(() => vi.fn());

vi.mock("@/providers/onboarding/onboarding-provider", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/lib/auth/hooks/useAuth", () => ({
  useAuth: mockUseAuth,
}));

const testUser = {
  id: "user-1",
  email: "user@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "2026-01-01T00:00:00.000Z",
};

const defaultPreferences = {
  user_id: "user-1",
  email: "user@example.com",
  briefing_frequency: "WEEKLY" as const,
  alerts_enabled: true,
  store_verdicts_enabled: true,
  daily_limit: 0,
} satisfies NotificationPreference;

describe("SettingsPage", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: testUser,
      isLoggedIn: true,
      isUserLoading: false,
    });
  });

  test("renders the account actions", async () => {
    server.use(
      getGetV1GetNotificationPreferencesMockHandler(defaultPreferences),
      getGetV1GetUserTimezoneMockHandler({ timezone: "Asia/Kolkata" }),
      getPostV1UpdateNotificationPreferencesMockHandler(defaultPreferences),
    );

    render(<SettingsPage />);

    const emailInput = await screen.findByLabelText("Email");
    expect((emailInput as HTMLInputElement).value).toBe("user@example.com");
    expect(
      screen.getByRole("link", { name: "Reset password" }).getAttribute("href"),
    ).toBe("/reset-password");
  });

  test("renders the settings page chrome in vietnamese", async () => {
    server.use(
      getGetV1GetNotificationPreferencesMockHandler(defaultPreferences),
      getGetV1GetUserTimezoneMockHandler({ timezone: "Asia/Kolkata" }),
    );

    render(
      <LocaleProvider locale="vi">
        <SettingsPage />
      </LocaleProvider>,
    );

    expect(await screen.findByText("Tài khoản của tôi")).toBeDefined();
    expect(
      screen.getByText("Quản lý cài đặt và tuỳ chọn tài khoản của bạn."),
    ).toBeDefined();
  });

  test("renders the notification settings chrome in vietnamese", async () => {
    server.use(
      getGetV1GetNotificationPreferencesMockHandler(defaultPreferences),
      getGetV1GetUserTimezoneMockHandler({ timezone: "Asia/Kolkata" }),
    );

    render(
      <LocaleProvider locale="vi">
        <SettingsPage />
      </LocaleProvider>,
    );

    expect(await screen.findByText("Thông báo")).toBeDefined();
    expect(screen.getByRole("button", { name: "Lưu tuỳ chọn" })).toBeDefined();
    expect(screen.getByRole("switch", { name: "Cảnh báo" })).toBeDefined();
    expect(
      screen.getByRole("combobox", { name: "Tần suất bản tin" }),
    ).toBeDefined();
  });

  test("saves notification preference changes", async () => {
    let submitted: NotificationPreferenceDTO | undefined;

    server.use(
      getGetV1GetNotificationPreferencesMockHandler(defaultPreferences),
      getGetV1GetUserTimezoneMockHandler({ timezone: "Asia/Kolkata" }),
      getPostV1UpdateNotificationPreferencesMockHandler(async ({ request }) => {
        submitted = (await request.json()) as NotificationPreferenceDTO;
        return { ...defaultPreferences, ...submitted };
      }),
    );

    render(<SettingsPage />);

    fireEvent.click(
      await screen.findByRole("combobox", { name: "Briefing frequency" }),
    );
    fireEvent.click(await screen.findByRole("option", { name: "Monthly" }));
    fireEvent.click(await screen.findByRole("switch", { name: "Alerts" }));
    fireEvent.click(
      screen.getByRole("switch", { name: "Marketplace reviews" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    await waitFor(() => {
      expect(submitted).toMatchObject({
        briefing_frequency: "MONTHLY",
        alerts_enabled: false,
        store_verdicts_enabled: false,
      });
    });
  });
});
