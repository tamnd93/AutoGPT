import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  creditsToUsdLabel,
  parseUsdToCredits,
  usdToCredits,
} from "@/lib/credits";
import { getMessage } from "@/lib/i18n/translate";
import {
  formatInTimezone,
  formatScheduleTime,
  getTimezoneDisplayName,
} from "@/lib/timezone-utils";
import { formatDate, formatTimeAgo } from "@/lib/utils/time";

// A fixed instant so the presentation is pinned in every timezone the tests use.
const INSTANT = new Date("2024-01-15T12:34:00Z");

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

describe("formatInTimezone", () => {
  test("keeps the english output byte for byte", () => {
    expect(formatInTimezone(INSTANT, "UTC")).toBe("Jan 15, 2024, 12:34 PM");
    expect(formatInTimezone(INSTANT, "Asia/Ho_Chi_Minh")).toBe(
      "Jan 15, 2024, 07:34 PM",
    );
    expect(formatInTimezone(INSTANT, "UTC", undefined, "en")).toBe(
      "Jan 15, 2024, 12:34 PM",
    );
  });

  test("renders the vietnamese date order", () => {
    expect(formatInTimezone(INSTANT, "UTC", undefined, "vi")).toBe(
      "12:34 15 thg 1, 2024",
    );
    expect(formatInTimezone(INSTANT, "Asia/Ho_Chi_Minh", undefined, "vi")).toBe(
      "19:34 15 thg 1, 2024",
    );
  });

  test("keeps the caller options in vietnamese", () => {
    expect(
      formatInTimezone(
        INSTANT,
        "UTC",
        { year: "numeric", month: "long", day: "numeric" },
        "vi",
      ),
    ).toBe("lúc 12:34 15 tháng 1, 2024");
  });

  test("falls back to the local timezone for an invalid zone, as before", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(formatInTimezone(INSTANT, "Not/AZone")).toBe(
      new Intl.DateTimeFormat("en-US", DEFAULT_OPTIONS).format(INSTANT),
    );
    expect(formatInTimezone(INSTANT, "Not/AZone", undefined, "vi")).toBe(
      new Intl.DateTimeFormat("vi-VN", DEFAULT_OPTIONS).format(INSTANT),
    );
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe("formatScheduleTime", () => {
  test("keeps the english schedule text", () => {
    expect(formatScheduleTime(INSTANT, "UTC")).toBe(
      "Jan 15, 2024, 12:34 PM UTC",
    );
  });

  test("renders the vietnamese schedule text", () => {
    expect(formatScheduleTime(INSTANT, "UTC", "vi")).toBe(
      "12:34 UTC 15 thg 1, 2024",
    );
    expect(formatScheduleTime(INSTANT, "Asia/Ho_Chi_Minh", "vi")).toBe(
      "19:34 GMT+7 15 thg 1, 2024",
    );
  });
});

describe("getTimezoneDisplayName", () => {
  test("keeps the english not-set label and the technical abbreviation", () => {
    expect(getTimezoneDisplayName("not-set")).toBe("Not set");
    const english = getTimezoneDisplayName("Asia/Tokyo");
    expect(english).toBe("Tokyo (GMT+9)");
    expect(getTimezoneDisplayName("Asia/Tokyo", "vi")).toBe(english);
  });

  test("translates the not-set label", () => {
    expect(getTimezoneDisplayName("not-set", "vi")).toBe("Chưa đặt");
    expect(getTimezoneDisplayName("UTC", "vi")).toBe("UTC");
  });
});

describe("formatTimeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function minutesAgo(minutes: number): string {
    return new Date(Date.now() - minutes * 60_000).toISOString();
  }

  test("keeps the english wording", () => {
    expect(formatTimeAgo(new Date().toISOString())).toBe("just now");
    expect(formatTimeAgo(minutesAgo(5))).toBe("5m ago");
    expect(formatTimeAgo(minutesAgo(180))).toBe("3h ago");
    expect(formatTimeAgo(minutesAgo(2880))).toBe("2d ago");
  });

  test("renders the vietnamese wording", () => {
    expect(formatTimeAgo(new Date().toISOString(), "vi")).toBe("vừa xong");
    expect(formatTimeAgo(minutesAgo(5), "vi")).toBe("5 phút trước");
    expect(formatTimeAgo(minutesAgo(180), "vi")).toBe("3 giờ trước");
    expect(formatTimeAgo(minutesAgo(2880), "vi")).toBe("2 ngày trước");
  });

  test("interpolates a zero count", () => {
    expect(getMessage("vi", "format.minutesAgo", { count: 0 })).toBe(
      "0 phút trước",
    );
    expect(getMessage("en", "format.minutesAgo", { count: 0 })).toBe("0m ago");
  });
});

describe("formatDate", () => {
  test("keeps the english format", () => {
    expect(formatDate(INSTANT)).toBe(
      new Intl.DateTimeFormat("en-US", DEFAULT_OPTIONS).format(INSTANT),
    );
    expect(formatDate(INSTANT, "en")).toBe(formatDate(INSTANT));
  });

  test("renders the vietnamese format", () => {
    expect(formatDate(INSTANT, "vi")).toBe(
      new Intl.DateTimeFormat("vi-VN", DEFAULT_OPTIONS).format(INSTANT),
    );
    expect(formatDate(INSTANT, "vi")).toMatch(/thg 1, 2024$/);
  });
});

describe("creditsToUsdLabel", () => {
  test("keeps the english dollar label", () => {
    expect(creditsToUsdLabel(1200)).toBe("$12");
    expect(creditsToUsdLabel(8025)).toBe("$80.25");
    expect(creditsToUsdLabel(99900, "en")).toBe("$999");
  });

  test("renders vietnamese number separators with the dollar symbol", () => {
    expect(creditsToUsdLabel(1200, "vi")).toBe("$12");
    expect(creditsToUsdLabel(8025, "vi")).toBe("$80,25");
    expect(creditsToUsdLabel(12345600, "vi")).toBe("$123.456");
  });

  test("leaves the usd parser and the credit maths untouched", () => {
    expect(usdToCredits(5.25)).toBe(525);
    expect(parseUsdToCredits("$1,000", 200000)).toBe(100000);
    expect(parseUsdToCredits("1,2", 200000)).toBeNull();
    expect(parseUsdToCredits("5.25", 200000)).toBe(525);
  });
});

describe("presentation messages", () => {
  test("renders the presentation keys in both locales", () => {
    expect(getMessage("en", "format.justNow")).toBe("just now");
    expect(getMessage("vi", "format.justNow")).toBe("vừa xong");
    expect(getMessage("en", "format.minutesAgo", { count: 5 })).toBe("5m ago");
    expect(getMessage("vi", "format.minutesAgo", { count: 5 })).toBe(
      "5 phút trước",
    );
    expect(getMessage("en", "format.notSet")).toBe("Not set");
    expect(getMessage("vi", "format.notSet")).toBe("Chưa đặt");
  });
});
