import { fireEvent, render, screen } from "@/tests/integrations/test-utils";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { LanguageCard } from "../LanguageCard";

const mocks = vi.hoisted(() => ({
  writeLocaleCookie: vi.fn(),
  locale: { current: "en" as "en" | "vi" },
}));

vi.mock("@/lib/i18n", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/i18n")>()),
  useLocale: () => mocks.locale.current,
  writeLocaleCookie: mocks.writeLocaleCookie,
}));

beforeEach(() => {
  mocks.writeLocaleCookie.mockClear();
  mocks.locale.current = "en";
  vi.spyOn(window.location, "reload").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LanguageCard", () => {
  test("offers English and Tiếng Việt", async () => {
    render(<LanguageCard />);

    fireEvent.click(screen.getByRole("combobox", { name: "Language" }));

    expect(
      await screen.findByRole("option", { name: "English" }),
    ).toBeDefined();
    expect(screen.getByRole("option", { name: "Tiếng Việt" })).toBeDefined();
  });

  test("shows the locale the provider hands it", () => {
    mocks.locale.current = "vi";
    render(<LanguageCard />);

    expect(
      screen.getByRole("combobox", { name: "Language" }).textContent,
    ).toContain("Tiếng Việt");
  });

  test("stores Tiếng Việt and reloads when it is chosen", async () => {
    render(<LanguageCard />);

    fireEvent.click(screen.getByRole("combobox", { name: "Language" }));
    fireEvent.click(await screen.findByRole("option", { name: "Tiếng Việt" }));

    expect(mocks.writeLocaleCookie).toHaveBeenCalledWith("vi");
    expect(window.location.reload).toHaveBeenCalledOnce();
  });
});
