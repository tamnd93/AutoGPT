import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TooltipProvider } from "@/components/atoms/Tooltip/BaseTooltip";
import { LocaleProvider } from "@/lib/i18n";

import { RecordingButton } from "../RecordingButton";

function renderButton(locale: "en" | "vi", isRecording = false, disableProvider = false) {
  const button = (
    <RecordingButton
      isRecording={isRecording}
      isTranscribing={false}
      isStreaming={false}
      disabled={false}
      onClick={vi.fn()}
    />
  );
  render(
    <TooltipProvider>
      {disableProvider ? button : <LocaleProvider locale={locale}>{button}</LocaleProvider>}
    </TooltipProvider>,
  );
}

describe("RecordingButton locale", () => {
  it("keeps its English label without a provider", () => {
    renderButton("en", false, true);
    expect(screen.getByRole("button", { name: "Start recording" })).toBeDefined();
  });

  it("words the start and stop labels in Vietnamese", () => {
    renderButton("vi");
    expect(screen.getByRole("button", { name: "Bắt đầu ghi âm" })).toBeDefined();
  });

  it("words the stop label in Vietnamese while recording", () => {
    renderButton("vi", true);
    expect(screen.getByRole("button", { name: "Dừng ghi âm" })).toBeDefined();
  });
});
