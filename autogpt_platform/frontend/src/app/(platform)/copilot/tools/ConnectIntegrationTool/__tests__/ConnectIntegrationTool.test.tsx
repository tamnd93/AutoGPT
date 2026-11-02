import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@sentry/nextjs", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@sentry/nextjs")>()),
  captureMessage: vi.fn(),
}));

vi.mock(
  "../../../components/SetupRequirementsCard/SetupRequirementsCard",
  () => ({
    SetupRequirementsCard: ({
      credentialsLabel,
      retryInstruction,
    }: {
      credentialsLabel?: string;
      retryInstruction?: string;
    }) => (
      <div>
        <span>{credentialsLabel}</span>
        <span>{retryInstruction}</span>
      </div>
    ),
  }),
);

import * as Sentry from "@sentry/nextjs";
import type { ToolUIPart } from "ai";
import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { CopilotChatActionsProvider } from "../../../components/CopilotChatActionsProvider/CopilotChatActionsProvider";
import { ConnectIntegrationTool } from "../ConnectIntegrationTool";

function makePart(overrides: Record<string, unknown> = {}): ToolUIPart {
  return {
    type: "tool-connect_integration",
    toolCallId: "call-connect-1",
    state: "input-streaming",
    input: { provider: "github" },
    ...overrides,
  } as ToolUIPart;
}

describe("ConnectIntegrationTool", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("styles the label as an error and reports when output is corrupted", () => {
    const { container } = render(
      <ConnectIntegrationTool
        part={makePart({
          state: "output-available",
          output: '{"setup_info":{"agent_name":"GitHub"',
        })}
      />,
    );
    expect(
      screen.getByText(/sign-in card data arrived corrupted/i),
    ).not.toBeNull();
    // isError now includes isCorrupted, so the label switches to the error
    // copy. MorphingTextAnimation splits chars and uses NBSP for spaces.
    const normalized = (container.textContent ?? "").replace(/ /g, " ");
    expect(normalized).toContain("Failed to connect");
    expect(vi.mocked(Sentry.captureMessage)).toHaveBeenCalledTimes(1);
  });

  it("shows the failure message on a genuine error without corrupted telemetry", () => {
    render(
      <ConnectIntegrationTool
        part={makePart({
          state: "output-error",
          output: '{"message":"OAuth denied"}',
        })}
      />,
    );
    expect(screen.getByText("OAuth denied")).not.toBeNull();
    expect(
      screen.queryByText(/sign-in card data arrived corrupted/i),
    ).toBeNull();
    expect(vi.mocked(Sentry.captureMessage)).not.toHaveBeenCalled();
  });

  it("words its running, ready and credential labels in Vietnamese", () => {
    const streaming = render(
      <LocaleProvider locale="vi">
        <ConnectIntegrationTool part={makePart()} />
      </LocaleProvider>,
    );
    expect(streaming.container.textContent).toContain("Đang kết nối github…");
    streaming.unmount();

    const ready = render(
      <LocaleProvider locale="vi">
        <CopilotChatActionsProvider onSend={vi.fn()}>
          <ConnectIntegrationTool
            part={makePart({
              state: "output-available",
              output: JSON.stringify({ setup_info: { agent_name: "GitHub" } }),
            })}
          />
        </CopilotChatActionsProvider>
      </LocaleProvider>,
    );
    expect(ready.container.textContent).toContain("Kết nối GitHub");
    expect(ready.container.textContent).toContain(
      "Thông tin kết nối của GitHub",
    );
  });

  it("words its failure label and corrupted notice in Vietnamese", () => {
    const failed = render(
      <LocaleProvider locale="vi">
        <CopilotChatActionsProvider onSend={vi.fn()}>
          <ConnectIntegrationTool
            part={makePart({
              state: "output-error",
              output: '{"message":"OAuth denied"}',
            })}
          />
        </CopilotChatActionsProvider>
      </LocaleProvider>,
    );
    expect(failed.container.textContent).toContain("Không kết nối được github");
    // The backend's own message stays in English.
    expect(failed.container.textContent).toContain("OAuth denied");
    failed.unmount();

    const corrupted = render(
      <LocaleProvider locale="vi">
        <CopilotChatActionsProvider onSend={vi.fn()}>
          <ConnectIntegrationTool
            part={makePart({
              state: "output-available",
              output: '{"setup_info":{"agent_name":"GitHub"',
            })}
          />
        </CopilotChatActionsProvider>
      </LocaleProvider>,
    );
    expect(corrupted.container.textContent).toContain(
      "Dữ liệu thẻ đăng nhập đến bị hỏng",
    );
  });
});
