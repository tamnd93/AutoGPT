import { expect, test } from "./coverage-fixture";
import { LoginPage } from "./pages/login.page";

test("ai provider catalogue happy path: renders dynamic providers, legacy fallback, empty list, and unsupported methods across en and vi", async ({
  page,
}) => {
  test.setTimeout(180000);

  await new LoginPage(page).loginAsSeededUser("smokeSettings");

  let mode: "dynamic" | "legacy" | "empty" = "dynamic";
  let connectRequests = 0;

  await page.route("**/api/integrations/**/login**", async (route) => {
    connectRequests += 1;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        login_url: "https://example.com/oauth",
        state_token: "state-1",
      }),
    });
  });

  await page.route("**/api/chat/connections", async (route) => {
    const baseOffers = [
      {
        offer_id: "platform:deployment",
        auth_provider: "platform",
        provider_family: "autogpt",
        display_name: "Self-hosted chat",
        auth_method: "deployment",
        credential_id: null,
        backed_by_label: "This server's chat provider",
        description:
          "New chats are backed by the chat provider configured on this server.",
        state: "ready",
        selectable: true,
        is_default: true,
        tiers: [],
        limitations: [],
      },
    ];

    if (mode === "legacy") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ offers: baseOffers, providers: null }),
      });
      return;
    }

    if (mode === "empty") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ offers: baseOffers, providers: [] }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        offers: baseOffers,
        providers: [
          {
            id: "claude_max",
            display_name: "Claude Max",
            logo_src: "/integrations/openai.png",
            description: {
              en: "Connect your Claude Max plan.",
              vi: "Kết nối gói Claude Max của bạn.",
            },
            status: "available",
            connect_method: "oauth",
            credential_provider: "anthropic_oauth",
          },
          {
            id: "quantum_ai",
            display_name: "Quantum AI",
            logo_src: "/integrations/openai.png",
            description: {
              en: "Requires hardware key.",
              vi: "Cần khoá phần cứng.",
            },
            status: "available",
            connect_method: "quantum_handshake",
            credential_provider: "quantum",
          },
          {
            id: "xai",
            display_name: "Grok",
            logo_src: "/integrations/xai.webp",
            description: {
              en: "Grok by xAI integration coming soon.",
              vi: "Tích hợp Grok của xAI sắp ra mắt.",
            },
            status: "coming-soon",
            connect_method: null,
            credential_provider: null,
          },
        ],
      }),
    });
  });

  // 1. Dynamic catalogue in English
  await page.goto("/settings/integrations");
  const enGroup = page.getByRole("group", {
    name: "Available AI subscriptions",
  });
  await expect(enGroup).toBeVisible({ timeout: 20000 });
  await expect(
    enGroup.getByRole("button", { name: "Claude Max" }),
  ).toBeVisible();
  await expect(enGroup.getByText("Quantum AI")).toBeVisible();
  await expect(enGroup.getByText("Unsupported")).toBeVisible();
  await expect(enGroup.getByText("Grok")).toBeVisible();
  await expect(enGroup.getByText("Coming soon")).toBeVisible();
  expect(connectRequests).toBe(0);

  // Switch to Vietnamese
  await page.goto("/settings/account");
  const langCombo = page.getByRole("combobox", { name: "Language" });
  await expect(langCombo).toBeVisible({ timeout: 15000 });
  await langCombo.click();
  await page.getByRole("option", { name: "Tiếng Việt" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "vi", {
    timeout: 15000,
  });

  // 2. Dynamic catalogue in Vietnamese
  await page.goto("/settings/integrations");
  const viGroup = page.getByRole("group", {
    name: "Gói AI có thể kết nối",
  });
  await expect(viGroup).toBeVisible({ timeout: 20000 });
  await expect(
    viGroup.getByRole("button", { name: "Claude Max" }),
  ).toHaveAttribute("title", "Kết nối gói Claude Max của bạn.");
  await expect(viGroup.getByText("Không hỗ trợ")).toBeVisible();
  await expect(viGroup.getByText("Sắp ra mắt")).toBeVisible();

  // 3. Legacy fallback (providers: null)
  mode = "legacy";
  await page.reload();
  await expect(viGroup).toBeVisible({ timeout: 20000 });
  await expect(viGroup.getByRole("button", { name: "ChatGPT" })).toBeVisible();
  await expect(
    viGroup.getByRole("button", { name: "Microsoft 365 Copilot" }),
  ).toBeVisible();
  await expect(viGroup.getByRole("button", { name: "OpenCode" })).toBeVisible();
  await expect(viGroup.getByText("GitHub Copilot")).toBeVisible();

  // 4. Explicit empty array (providers: [])
  mode = "empty";
  await page.reload();
  await expect(viGroup).toBeVisible({ timeout: 20000 });
  await expect(viGroup.getByRole("button")).toHaveCount(0);

  // Switch back to English
  await page.goto("/settings/account");
  const viCombo = page.getByRole("combobox", { name: "Ngôn ngữ" });
  await expect(viCombo).toBeVisible({ timeout: 15000 });
  await viCombo.click();
  await page.getByRole("option", { name: "English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en", {
    timeout: 15000,
  });
});
