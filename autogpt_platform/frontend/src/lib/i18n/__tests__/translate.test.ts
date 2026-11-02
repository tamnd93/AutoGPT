import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "vitest";

import { en } from "../messages/en";
import { getMessage } from "../translate";

describe("getMessage interpolation", () => {
  test("fills a named value", () => {
    expect(getMessage("en", "common.planSuffix", { plan: "Plus" })).toBe(
      "Plus plan",
    );
    expect(getMessage("vi", "common.planSuffix", { plan: "Plus" })).toBe(
      "gói Plus",
    );
  });

  test("renders a number value", () => {
    expect(getMessage("en", "common.planSuffix", { plan: 0 })).toBe("0 plan");
  });

  test("keeps a placeholder whose value is missing", () => {
    expect(getMessage("en", "common.planSuffix", {})).toBe("{plan} plan");
    expect(getMessage("en", "common.planSuffix", { other: "x" })).toBe(
      "{plan} plan",
    );
  });

  test("does not interpolate braces introduced by a value", () => {
    expect(getMessage("en", "common.planSuffix", { plan: "{other}" })).toBe(
      "{other} plan",
    );
  });

  test("keeps dollar signs in a value literal", () => {
    expect(getMessage("en", "common.planSuffix", { plan: "$& $1" })).toBe(
      "$& $1 plan",
    );
  });

  test("falls back to english, then to the key itself", () => {
    expect(getMessage("vi", "no.such.key", { x: 1 })).toBe("no.such.key");
    expect(getMessage("vi", "integrations.title")).toBe("Tích hợp");
    expect(getMessage("en", "integrations.title")).toBe("Integrations");
  });

  test("keeps the phase-one catalogue", () => {
    for (const key of [
      "integrations.title",
      "integrations.manage.disconnect",
      "integrations.opencode.connect",
      "nav.home",
      "nav.recentChats",
    ] as const) {
      expect(en[key]).toBeTruthy();
    }
  });
});

describe("translate module boundaries", () => {
  test("stays usable on the server: no react, no next/headers, no client directive", () => {
    const source = readFileSync(
      join(process.cwd(), "src/lib/i18n/translate.ts"),
      "utf8",
    );
    expect(source).not.toMatch(/from "react"|next\/headers|"use client"/);
  });
});
