import { describe, expect, test } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { server } from "@/mocks/mock-server";
import { getGetV1GetAutoTopUpMockHandler } from "@/app/api/__generated__/endpoints/credits/credits.msw";

import { WalletRefill } from "../WalletRefill";

describe("WalletRefill", () => {
  test("renders the shared top-up form in the one-time top-up tab", async () => {
    server.use(getGetV1GetAutoTopUpMockHandler({ amount: 0, threshold: 0 }));

    render(<WalletRefill />);

    // The "top-up" tab is the default, so the extracted TopUpForm (with its
    // single "Amount" field) must render after the WalletRefill extraction.
    expect(await screen.findByLabelText("Amount")).toBeDefined();
    expect(screen.getByRole("button", { name: /top up/i })).toBeDefined();
  });

  test("reads the refill tabs and actions in Vietnamese", async () => {
    server.use(getGetV1GetAutoTopUpMockHandler({ amount: 0, threshold: 0 }));

    render(
      <LocaleProvider locale="vi">
        <WalletRefill />
      </LocaleProvider>,
    );

    expect(
      await screen.findByRole("tab", { name: "Nạp một lần" }),
    ).toBeDefined();
    expect(screen.getByRole("tab", { name: "Nạp tự động" })).toBeDefined();
    expect(screen.getByText("Nạp credit vào số dư")).toBeDefined();
    expect(screen.getByRole("button", { name: "Nạp tiền" })).toBeDefined();
  });
});
