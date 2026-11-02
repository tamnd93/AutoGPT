import { toast } from "@/components/molecules/Toast/use-toast";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  validateAttachments,
  type OutgoingMessage,
} from "../sendWithAttachments";
import { MAX_ATTACHMENTS } from "../workspaceAttachments";

vi.mock("@/components/molecules/Toast/use-toast", () => ({ toast: vi.fn() }));

function message(over: Partial<OutgoingMessage>): OutgoingMessage {
  return { text: "", files: [], parts: [], ...over };
}

function fakeFiles(count: number, size = 1): File[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `file-${i}.txt`,
    size,
    type: "text/plain",
  })) as unknown as File[];
}

describe("validateAttachments in Vietnamese", () => {
  beforeEach(() => {
    vi.mocked(toast).mockClear();
  });

  it("writes the too-many warning in Vietnamese", () => {
    const result = validateAttachments(
      message({ files: fakeFiles(MAX_ATTACHMENTS + 1) }),
      "vi",
    );

    expect(result).toBe(false);
    expect(vi.mocked(toast).mock.calls[0][0]).toMatchObject({
      title: "Quá nhiều tệp đính kèm",
    });
  });

  it("writes the too-large warning in Vietnamese", () => {
    const result = validateAttachments(
      message({ files: fakeFiles(1, 101 * 1024 * 1024) }),
      "vi",
    );

    expect(result).toBe(false);
    expect(vi.mocked(toast).mock.calls[0][0]).toMatchObject({
      title: "Tệp quá lớn",
    });
  });
});
