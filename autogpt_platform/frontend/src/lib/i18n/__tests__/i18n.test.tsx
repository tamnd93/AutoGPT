import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LocaleProvider,
  getMessage,
  useT,
  writeLocaleCookie,
} from "../index";
import { vi as messages } from "../messages/vi";

function Probe() {
  const t = useT();
  return <span>{t("integrations.title")}</span>;
}

function ValueProbe() {
  const t = useT();
  return <span>{t("common.planSuffix", { plan: "Plus" })}</span>;
}

describe("getMessage", () => {
  test("returns the vietnamese message", () => {
    expect(getMessage("vi", "integrations.title")).toBe("Tích hợp");
  });

  test("returns the english message for en", () => {
    expect(getMessage("en", "integrations.title")).toBe("Integrations");
  });

  test("falls back to english when vi has no entry for the key", () => {
    const key = "nav.files";
    const saved = messages[key];
    delete messages[key];
    expect(getMessage("vi", key)).toBe("Files");
    messages[key] = saved;
  });

  test("returns the key itself when neither locale has it", () => {
    expect(getMessage("en", "no.such.key")).toBe("no.such.key");
    expect(getMessage("vi", "no.such.key")).toBe("no.such.key");
  });
});

describe("LocaleProvider", () => {
  test("hands the vietnamese catalogue to useT", () => {
    render(
      <LocaleProvider locale="vi">
        <Probe />
      </LocaleProvider>,
    );
    expect(screen.getByText("Tích hợp")).toBeDefined();
  });

  test("hands the english catalogue to useT", () => {
    render(
      <LocaleProvider locale="en">
        <Probe />
      </LocaleProvider>,
    );
    expect(screen.getByText("Integrations")).toBeDefined();
  });

  test("reads english when no provider wraps the tree", () => {
    render(<Probe />);
    expect(screen.getByText("Integrations")).toBeDefined();
  });

  test("interpolates values through useT", () => {
    render(
      <LocaleProvider locale="vi">
        <ValueProbe />
      </LocaleProvider>,
    );
    expect(screen.getByText("gói Plus")).toBeDefined();
  });
});

describe("writeLocaleCookie", () => {
  test("stores the chosen locale for a year", () => {
    document.cookie = `${LOCALE_COOKIE}=; path=/; max-age=0`;
    writeLocaleCookie("vi");
    expect(document.cookie).toContain(`${LOCALE_COOKIE}=vi`);
  });
});

test("defaults to english", () => {
  expect(DEFAULT_LOCALE).toBe("en");
});
