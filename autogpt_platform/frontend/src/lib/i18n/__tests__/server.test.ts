import { beforeEach, describe, expect, test, vi } from "vitest";

const cookieValue = vi.hoisted(() => ({
  current: undefined as string | undefined,
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      name === "agpt_locale" && cookieValue.current !== undefined
        ? { name, value: cookieValue.current }
        : undefined,
  }),
}));

import { readLocale } from "../server";

describe("readLocale", () => {
  beforeEach(() => {
    cookieValue.current = undefined;
  });

  test("reads vi from the locale cookie", async () => {
    cookieValue.current = "vi";
    expect(await readLocale()).toBe("vi");
  });

  test("reads en from the locale cookie", async () => {
    cookieValue.current = "en";
    expect(await readLocale()).toBe("en");
  });

  test("falls back to en when the cookie is missing", async () => {
    expect(await readLocale()).toBe("en");
  });

  test("falls back to en when the cookie holds something else", async () => {
    cookieValue.current = "fr";
    expect(await readLocale()).toBe("en");
  });
});
