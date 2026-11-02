import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";

import { MarketplaceAgentBlock } from "../MarketplaceAgentBlock";
import { UGCAgentBlock } from "../UGCAgentBlock";

describe("MarketplaceAgentBlock", () => {
  test("drops a dead image URL and keeps the title", () => {
    render(
      <MarketplaceAgentBlock
        title="Daily digest"
        image_url="https://cdn.test/dead.png"
        slug="digest"
        loading={false}
      />,
    );

    fireEvent.error(screen.getByAltText("integration-icon"));

    expect(screen.queryByAltText("integration-icon")).toBeNull();
    expect(screen.getByText("Daily digest")).toBeDefined();
  });
});

describe("UGCAgentBlock", () => {
  test("drops a dead image URL and keeps the title", () => {
    render(
      <UGCAgentBlock title="My agent" image_url="https://cdn.test/dead.png" />,
    );

    fireEvent.error(screen.getByAltText("integration-icon"));

    expect(screen.queryByAltText("integration-icon")).toBeNull();
    expect(screen.getByText("My agent")).toBeDefined();
  });
});

describe("MarketplaceAgentBlock in Vietnamese", () => {
  test("words its creator, runs and workflow page link in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <MarketplaceAgentBlock
          title="Daily digest"
          creator_name="OpenAI"
          number_of_runs={12}
          image_url="https://cdn.test/agent.png"
          slug="digest"
          loading={false}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Tạo bởi OpenAI")).toBeDefined();
    expect(screen.getByText("12 lượt chạy")).toBeDefined();
    expect(screen.getByText("Trang workflow")).toBeDefined();
    expect(screen.getByAltText("biểu tượng tích hợp")).toBeDefined();
  });
});
