import { LocaleProvider } from "@/lib/i18n";
import { trialOffer } from "@/tests/integrations/trial-fixtures";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PaidWelcome } from "../PaidWelcome";
import { TrialWelcome } from "../TrialWelcome/TrialWelcome";

describe("SubscriptionStep welcomes in Vietnamese", () => {
  it("reads the paid welcome, its timeline and its action in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <PaidWelcome
          experts={[]}
          price="$20"
          cadence="month"
          isProcessing={false}
          isBlocked={false}
          onContinue={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Đưa thiết lập của bạn vào hoạt động",
      }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Không hợp đồng, và bạn có thể huỷ bất cứ lúc nào trong Cài đặt.",
      ),
    ).toBeDefined();
    expect(
      screen.getByRole("list", { name: "Cách gói của bạn hoạt động" }),
    ).toBeDefined();
    expect(screen.getByText("Bạn thanh toán $20")).toBeDefined();
    expect(screen.getByText("Gói của bạn sẽ gia hạn")).toBeDefined();
    expect(screen.getByText("Huỷ trong Cài đặt")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Tiếp tục thanh toán" }),
    ).toBeDefined();
    expect(screen.getByText("Thanh toán bảo mật qua Stripe")).toBeDefined();
    expect(screen.getByText("Otto đã sẵn sàng bắt đầu")).toBeDefined();
  });

  it("reads the trial welcome, its timeline and its action in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <TrialWelcome
          offer={trialOffer}
          experts={[]}
          isStarting={false}
          isBlocked={false}
          error={null}
          onStart={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "7 ngày đầu của bạn miễn phí" }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Hôm nay không phải trả gì, và bạn sẽ được nhắc trước khi bị tính phí.",
      ),
    ).toBeDefined();
    expect(
      screen.getByRole("list", { name: "Cách bản dùng thử hoạt động" }),
    ).toBeDefined();
    expect(
      screen.getByText("Bản dùng thử miễn phí của bạn bắt đầu"),
    ).toBeDefined();
    expect(screen.getByText("Chúng tôi gửi email nhắc bạn")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Bắt đầu dùng thử miễn phí" }),
    ).toBeDefined();
    expect(
      screen.getByText("Stripe sẽ yêu cầu thẻ. Hôm nay chưa bị tính phí."),
    ).toBeDefined();
  });
});
