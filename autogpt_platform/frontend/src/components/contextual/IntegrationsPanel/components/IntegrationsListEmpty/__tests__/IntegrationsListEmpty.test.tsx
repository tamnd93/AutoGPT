import { describe, expect, test } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";

import { IntegrationsListEmpty } from "../IntegrationsListEmpty";

describe("IntegrationsListEmpty", () => {
  test("renders connect-a-service copy when there is no active query", () => {
    render(<IntegrationsListEmpty query="" />);
    expect(screen.getByText("No integration connected")).toBeDefined();
    expect(
      screen.getByText(
        /Connect a service to let your experts and workflows use third-party tools/i,
      ),
    ).toBeDefined();
  });

  test("treats whitespace-only queries as no query", () => {
    render(<IntegrationsListEmpty query="   " />);
    expect(screen.getByText("No integration connected")).toBeDefined();
  });

  test("renders its empty copy in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <IntegrationsListEmpty query="" />
      </LocaleProvider>,
    );
    expect(screen.getByText("Chưa kết nối tích hợp nào")).toBeDefined();
    expect(
      screen.getByText(/Kết nối một dịch vụ để expert và workflow của bạn/),
    ).toBeDefined();
  });

  test("renders its one-line miss in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <IntegrationsListEmpty query="  notion  " />
      </LocaleProvider>,
    );
    expect(
      screen.getByText(
        'Không có tích hợp nào bạn đã kết nối khớp với "notion".',
      ),
    ).toBeDefined();
  });

  test("renders a one-line miss that echoes the trimmed query", () => {
    render(<IntegrationsListEmpty query="  notion  " />);
    expect(
      screen.getByText('None of your connected integrations match "notion".'),
    ).toBeDefined();
    expect(screen.queryByText("No integration connected")).toBeNull();
  });
});
