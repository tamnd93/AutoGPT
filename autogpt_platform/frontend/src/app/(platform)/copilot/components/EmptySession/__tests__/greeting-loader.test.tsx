import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it } from "vitest";

import { GreetingLoader } from "../components/GreetingLoader";

describe("GreetingLoader", () => {
  it("announces the wait to assistive tech", () => {
    // The orb is decorative and the composer is withheld while this
    // renders, so the status region and its label are the only signal a
    // screen reader user gets that something is coming.
    render(<GreetingLoader />);

    const status = screen.getByRole("status");
    expect(status).toBeDefined();
    expect(status.textContent).toContain("Writing your greeting");
  });

  it("announces the wait in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <GreetingLoader />
      </LocaleProvider>,
    );

    expect(screen.getByRole("status").textContent).toContain(
      "Đang viết lời chào của bạn",
    );
  });
});
