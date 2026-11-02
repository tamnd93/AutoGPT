import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./coverage-fixture";
import { LoginPage } from "./pages/login.page";

// Copy asserted below is the Vietnamese catalogue's own wording
// (src/lib/i18n/messages/*.vi.ts); the English run asserts the same spots
// before and after the switch so a missing translation or a leaked vi label
// fails the journey.
const SIDEBAR = '[data-sidebar="sidebar"]';

function sidebar(page: Page): Locator {
  return page.locator(SIDEBAR);
}

async function chooseLanguage(
  page: Page,
  comboboxName: "Language" | "Ngôn ngữ",
  optionName: "English" | "Tiếng Việt",
  expectedLang: "en" | "vi",
): Promise<void> {
  await page.goto("/settings/account");
  const combobox = page.getByRole("combobox", { name: comboboxName });
  await expect(combobox).toBeVisible({ timeout: 15000 });
  await combobox.click();
  await page.getByRole("option", { name: optionName }).click();
  // The language card reloads the page while writing the locale cookie.
  await expect(page.locator("html")).toHaveAttribute("lang", expectedLang, {
    timeout: 15000,
  });
}

test("vietnamese localization happy path: switch the app to Vietnamese, walk the main screens, switch back", async ({
  page,
}) => {
  test.setTimeout(180000);

  await new LoginPage(page).loginAsSeededUser("smokeSettings");

  // English first: the account page and the nav read as before.
  await page.goto("/settings/account");
  await expect(page.getByRole("heading", { name: "Account" })).toBeVisible({
    timeout: 15000,
  });
  await expect(
    sidebar(page).getByRole("link", { name: "Build", exact: true }),
  ).toBeVisible({ timeout: 15000 });

  await chooseLanguage(page, "Language", "Tiếng Việt", "vi");

  // Account page, in Vietnamese, and the language picker itself.
  await expect(page.getByRole("heading", { name: "Tài khoản" })).toBeVisible({
    timeout: 15000,
  });
  await expect(page.getByRole("combobox", { name: "Ngôn ngữ" })).toBeVisible();

  // Sidebar labels and the global search.
  await expect(
    sidebar(page).getByRole("link", { name: "Trang chủ", exact: true }),
  ).toBeVisible();
  await expect(
    sidebar(page).getByRole("link", { name: "Marketplace", exact: true }),
  ).toBeVisible();
  await expect(
    sidebar(page).getByRole("link", { name: "Tạo workflow", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Tìm kiếm" }).click();
  await expect(
    page.getByPlaceholder("Tìm workflow, tệp, đoạn chat..."),
  ).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByRole("textbox", { name: "Tìm kiếm toàn cục" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");

  // Home and the chat composer.
  await page.goto("/home");
  await expect(page).toHaveURL(/\/home$/);
  await expect(
    sidebar(page).getByRole("link", { name: "Trang chủ", exact: true }),
  ).toBeVisible();
  await page.goto("/copilot");
  await expect(page.getByPlaceholder("Nhập tin nhắn...")).toBeVisible({
    timeout: 20000,
  });

  // Marketplace.
  await page.goto("/marketplace");
  await expect(
    page
      .getByRole("heading", { name: /Gặp gỡ các Expert AI|Workflow/ })
      .first(),
  ).toBeVisible({ timeout: 20000 });

  // Library.
  await page.goto("/library");
  await expect(page.getByRole("textbox", { name: "Tìm workflow" })).toBeVisible(
    { timeout: 15000 },
  );

  // Build.
  await sidebar(page)
    .getByRole("link", { name: "Tạo workflow", exact: true })
    .click();
  await expect(page).toHaveURL(/\/build$/, { timeout: 20000 });
  const skipTutorial = page.getByRole("button", {
    name: "Bỏ qua hướng dẫn",
    exact: true,
  });
  if (await skipTutorial.isVisible().catch(() => false)) {
    await skipTutorial.click();
  }
  await expect(page.locator(".react-flow").first()).toBeVisible({
    timeout: 20000,
  });

  // Team.
  await page.goto("/team");
  await expect(page.getByRole("heading", { name: "Đội ngũ" })).toBeVisible({
    timeout: 20000,
  });
  await expect(
    page.getByText("Otto và những chuyên gia bạn đã thuê, sẵn sàng làm việc."),
  ).toBeVisible();

  // Files.
  await page.goto("/artifacts");
  await expect(
    page.getByText(
      "Tại đây có mọi tệp do đội của bạn tạo ra hoặc do bạn tải lên.",
    ),
  ).toBeVisible({ timeout: 20000 });

  // Settings -> Integrations.
  await page.goto("/settings/integrations");
  await expect(page.getByRole("heading", { name: "Tích hợp" })).toBeVisible({
    timeout: 20000,
  });
  await expect(
    page.getByRole("heading", { name: "Gói AI (đã đăng ký)" }),
  ).toBeVisible();

  // Back to English: the picker reloads, the catalogue switches back.
  await chooseLanguage(page, "Ngôn ngữ", "English", "en");
  await expect(page.getByRole("heading", { name: "Account" })).toBeVisible({
    timeout: 15000,
  });
  await expect(
    sidebar(page).getByRole("link", { name: "Build", exact: true }),
  ).toBeVisible({ timeout: 15000 });
});
