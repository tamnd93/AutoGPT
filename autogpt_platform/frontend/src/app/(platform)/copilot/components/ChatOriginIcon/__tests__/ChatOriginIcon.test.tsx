import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it } from "vitest";

import { LocaleProvider } from "@/lib/i18n";
import { ChatOriginIcon } from "../ChatOriginIcon";

describe("ChatOriginIcon", () => {
  it("credits the source platform in English by default", () => {
    render(<ChatOriginIcon sourcePlatform="slack" />);

    expect(screen.getByTitle("From Slack")).toBeDefined();
  });

  it("credits the source platform in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ChatOriginIcon sourcePlatform="slack" />
      </LocaleProvider>,
    );

    expect(screen.getByTitle("Từ Slack")).toBeDefined();
  });
});
