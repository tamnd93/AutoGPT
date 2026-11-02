import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { LocaleProvider } from "@/lib/i18n";
import { createElement, type ReactNode } from "react";

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

import { useAgentInfoStep } from "../useAgentInfoStep";

describe("useAgentInfoStep", () => {
  const baseArgs = {
    onBack: vi.fn(),
    onSuccess: vi.fn(),
    selectedAgentId: "graph-1",
    selectedAgentVersion: 1,
  };

  // react-hook-form's formState is a subscription proxy: errors only update
  // when read during render, so expose them from the render callback.
  function renderInfoStepHook() {
    return renderHook(() => {
      const step = useAgentInfoStep(baseArgs);
      return { step, rootError: step.form.formState.errors.root };
    });
  }

  it("clears the image-required error once an image is added so submit re-enables", () => {
    const { result } = renderInfoStepHook();

    // Simulate submitting without a thumbnail: the form marks the root error.
    act(() => {
      result.current.step.form.setError("root", {
        type: "manual",
        message: "At least one image is required",
      });
    });
    expect(result.current.rootError).toBeDefined();

    // Adding an image must clear the stale error, otherwise the submit button
    // stays disabled forever and the user is stuck.
    act(() => {
      result.current.step.handleImagesChange(["https://example.com/thumb.png"]);
    });

    expect(result.current.rootError).toBeUndefined();
    expect(result.current.step.images).toEqual([
      "https://example.com/thumb.png",
    ]);
  });

  it("reads the image-required error in Vietnamese", async () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(LocaleProvider, { locale: "vi" }, children);
    const { result } = renderHook(
      () => {
        const step = useAgentInfoStep(baseArgs);
        return { step, rootError: step.form.formState.errors.root };
      },
      { wrapper },
    );

    act(() => {
      result.current.step.form.setValue("title", "My workflow");
      result.current.step.form.setValue("subheader", "A tagline");
      result.current.step.form.setValue("slug", "my-workflow");
      result.current.step.form.setValue("category", "productivity");
      result.current.step.form.setValue("description", "What it does");
      result.current.step.form.setValue(
        "youtubeLink",
        "https://www.youtube.com/watch?v=abc123",
      );
      result.current.step.form.setValue(
        "agentOutputDemo",
        "https://www.youtube.com/watch?v=abc123",
      );
    });

    await act(async () => {
      await result.current.step.handleSubmit();
    });

    expect(result.current.rootError?.message).toBe("Cần ít nhất một hình ảnh");
  });

  it("keeps the error while there are still no images", () => {
    const { result } = renderInfoStepHook();

    act(() => {
      result.current.step.form.setError("root", {
        type: "manual",
        message: "At least one image is required",
      });
    });

    act(() => {
      result.current.step.handleImagesChange([]);
    });

    expect(result.current.rootError).toBeDefined();
  });
});
