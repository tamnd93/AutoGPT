import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const toast = vi.fn();
vi.mock("@/components/molecules/Toast/use-toast", () => ({
  toast: (...args: unknown[]) => toast(...args),
}));

import { LocaleProvider } from "@/lib/i18n";
import { ShareLinkButton } from "../ShareLinkButton";

function mockClipboard(writeText: () => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
}

describe("ShareLinkButton", () => {
  afterEach(() => {
    toast.mockClear();
  });

  it("copies the absolute URL and confirms with a toast", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);

    render(<ShareLinkButton url="/marketplace/agent/creator/test-agent" />);
    fireEvent.click(screen.getByTestId("copy-share-link-button"));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        `${window.location.origin}/marketplace/agent/creator/test-agent`,
      ),
    );
    expect(toast).toHaveBeenCalledWith({ title: "Link copied to clipboard" });
    expect(await screen.findByText("Copied")).toBeDefined();
  });

  it("reads the copied state in Vietnamese", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);

    render(
      <LocaleProvider locale="vi">
        <ShareLinkButton url="/marketplace/agent/creator/test-agent" />
      </LocaleProvider>,
    );
    fireEvent.click(screen.getByTestId("copy-share-link-button"));

    await waitFor(() =>
      expect(toast).toHaveBeenCalledWith({ title: "Đã sao chép liên kết" }),
    );
    expect(await screen.findByText("Đã sao chép")).toBeDefined();
  });

  it("shows a destructive toast when copying fails", async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error("denied")));

    render(<ShareLinkButton url="/marketplace/agent/creator/test-agent" />);
    fireEvent.click(screen.getByTestId("copy-share-link-button"));

    await waitFor(() =>
      expect(toast).toHaveBeenCalledWith({
        title: "Couldn't copy link",
        variant: "destructive",
      }),
    );
  });
});
