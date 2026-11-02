import type { ExpertCredentialRef } from "@/app/api/__generated__/models/expertCredentialRef";
import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";

import { ExpertIntegrationGroups } from "../ExpertIntegrationGroups";

const INTEGRATIONS = [
  {
    credential_id: "c-1",
    provider: "slack",
    title: "Slack",
    type: "oauth2",
    service_name: "Slack",
  },
] as unknown as ExpertCredentialRef[];

describe("ExpertIntegrationGroups in Vietnamese", () => {
  it("reads the integration row in Vietnamese when the app is set to Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ExpertIntegrationGroups
          integrations={INTEGRATIONS}
          isRemoving={false}
          onRemove={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Sẵn sàng")).toBeDefined();
    expect(screen.getByText("Đã kết nối qua OAuth")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Xoá Slack" }),
    ).toBeDefined();
  });
});
