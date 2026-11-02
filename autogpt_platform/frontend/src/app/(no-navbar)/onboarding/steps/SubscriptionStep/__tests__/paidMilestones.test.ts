import { getMessage } from "@/lib/i18n/translate";
import { describe, expect, test } from "vitest";
import {
  getPaidMilestones,
  getRenewalDate,
} from "../components/paidMilestones";
import { formatDay } from "../components/TrialWelcome/helpers";

const tVi = (key: string, values?: Record<string, string | number>) =>
  getMessage("vi", key, values);

function day(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

describe("getRenewalDate", () => {
  test("renews on the same day next month", () => {
    expect(day(getRenewalDate(new Date(2026, 9, 23), "month"))).toEqual([
      2026, 11, 23,
    ]);
  });

  test("clamps a month-end signup to the last day of a shorter month", () => {
    expect(day(getRenewalDate(new Date(2027, 0, 31), "month"))).toEqual([
      2027, 2, 28,
    ]);
    expect(day(getRenewalDate(new Date(2028, 0, 31), "month"))).toEqual([
      2028, 2, 29,
    ]);
  });

  test("rolls December into January of the next year", () => {
    expect(day(getRenewalDate(new Date(2026, 11, 15), "month"))).toEqual([
      2027, 1, 15,
    ]);
  });

  test("clamps a leap-day yearly signup to 28 February", () => {
    expect(day(getRenewalDate(new Date(2028, 1, 29), "year"))).toEqual([
      2029, 2, 28,
    ]);
  });
});

describe("paid milestones in Vietnamese", () => {
  test("reads the timeline, its dates and its amounts in Vietnamese", () => {
    const now = new Date(2026, 9, 23);
    const [today, renew, cancel] = getPaidMilestones({
      price: "$20",
      cadence: "month",
      now,
      t: tVi,
      locale: "vi",
    });

    expect(today.when).toBe("Hôm nay");
    expect(today.title).toBe("Bạn thanh toán $20");
    expect(today.detail).toBe(
      "Cộng thuế áp dụng (nếu có). Quyền truy cập đầy đủ có ngay.",
    );
    expect(renew.when).toBe(formatDay(new Date(2026, 10, 23), "vi"));
    expect(renew.title).toBe("Gói của bạn sẽ gia hạn");
    expect(renew.detail).toBe("$20 mỗi tháng cho đến khi bạn huỷ.");
    expect(cancel.when).toBe("Bất cứ lúc nào");
    expect(cancel.title).toBe("Huỷ trong Cài đặt");
    expect(cancel.detail).toBe(
      "Bạn giữ quyền truy cập đến hết kỳ đã thanh toán.",
    );
  });
});
