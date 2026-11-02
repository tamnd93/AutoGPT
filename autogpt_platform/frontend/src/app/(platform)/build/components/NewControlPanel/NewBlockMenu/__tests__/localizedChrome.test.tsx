import { render, screen } from "@/tests/integrations/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { Integration } from "../Integration";
import { IntegrationChip } from "../IntegrationChip";
import { BlockMenuSearchBar } from "../BlockMenuSearchBar/BlockMenuSearchBar";
import { HorizontalScroll } from "../HorizontalScroll";
import { MobileWarning } from "../../../MobileWarning/MobileWarning";

describe("block menu chrome in Vietnamese", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.innerWidth = 1024;
  });

  it("words the integration icon alt and chip title in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <Integration
          title="Google Maps"
          description="Maps and places"
          icon_url="/integrations/google_maps.png"
        />
        <IntegrationChip name="GitHub" icon_url="/integrations/github.png" />
      </LocaleProvider>,
    );

    expect(screen.getAllByAltText("biểu tượng tích hợp")).toHaveLength(2);
    expect(screen.getByText("Google Maps")).toBeDefined();
    expect(screen.getByText(/Git/)).toBeDefined();
  });

  it("words the search placeholder in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <BlockMenuSearchBar />
      </LocaleProvider>,
    );

    expect(
      screen.getByPlaceholderText("Khối, workflow, tích hợp hoặc từ khoá..."),
    ).toBeDefined();
  });

  it("words the horizontal scroll buttons in Vietnamese", () => {
    const scrollWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "scrollWidth",
    );
    const clientWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientWidth",
    );
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      get: () => 900,
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      get: () => 300,
    });

    try {
      render(
        <LocaleProvider locale="vi">
          <HorizontalScroll>
            <div>lane</div>
          </HorizontalScroll>
        </LocaleProvider>,
      );

      expect(
        screen.getByRole("button", { name: "Cuộn sang phải" }),
      ).toBeDefined();
    } finally {
      if (scrollWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "scrollWidth",
          scrollWidth,
        );
      }
      if (clientWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "clientWidth",
          clientWidth,
        );
      }
    }
  });

  it("words the mobile warning in Vietnamese", async () => {
    window.innerWidth = 500;

    render(
      <LocaleProvider locale="vi">
        <MobileWarning />
      </LocaleProvider>,
    );

    expect(
      await screen.findByText("Builder hoạt động tốt nhất trên máy tính"),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Trình dựng workflow dựa trên các thao tác canvas không hoạt động tốt ở kích thước màn hình này. Để có trải nghiệm tốt nhất, hãy chuyển sang trình duyệt trên máy tính.",
      ),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Vẫn tiếp tục" })).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Không hiện lại" }),
    ).toBeDefined();
  });
});
