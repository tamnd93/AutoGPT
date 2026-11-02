import { render, screen } from "@/tests/integrations/test-utils";
import { LocaleProvider } from "@/lib/i18n";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/artifacts",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

import { InsetHeaderTitle } from "../InsetHeaderTitle";

describe("InsetHeaderTitle", () => {
  it("names the Files page on its own routes", () => {
    render(<InsetHeaderTitle />);
    expect(screen.getByText("Files")).toBeDefined();
  });

  it("reads the page title in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <InsetHeaderTitle />
      </LocaleProvider>,
    );
    expect(screen.getByText("Tệp")).toBeDefined();
  });
});
