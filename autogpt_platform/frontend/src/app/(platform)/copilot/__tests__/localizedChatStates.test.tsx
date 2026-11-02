import { describe, expect, it, vi } from "vitest";

const toastSendFailure = vi.hoisted(() => vi.fn());
vi.mock("../helpers/sendFailureToast", () => ({ toastSendFailure }));

import { anomalyToast, noticeText } from "../stream/turnRuntime";
import { recoverFailedDeferredSend } from "../useSendMessage";

describe("chat state copy in Vietnamese", () => {
  it("words the inline stream notices in Vietnamese", () => {
    expect(noticeText("reconnecting", "vi")).toBe("Đang kết nối lại…");
    expect(noticeText("catching-up", "vi")).toBe("Đang bắt kịp…");
    expect(noticeText("offline", "vi")).toBe("Ngoại tuyến — đang chờ mạng…");
    expect(noticeText(null, "vi")).toBeNull();
  });

  it("keeps the inline notices in English by default", () => {
    expect(noticeText("reconnecting")).toBe("Reconnecting…");
    expect(noticeText("offline")).toBe("Offline — waiting for the network…");
  });

  it("words the connection-anomaly toast in Vietnamese", () => {
    expect(anomalyToast("vi")).toEqual({
      title: "Mất kết nối",
      description:
        "Chúng tôi vẫn đang thử; chuyên gia của bạn có thể vẫn đang làm việc.",
    });
    expect(anomalyToast()).toEqual({
      title: "Connection lost",
      description: "We keep trying; your expert may still be working.",
    });
  });

  it("words the recovered-send toast in Vietnamese", () => {
    recoverFailedDeferredSend("draft text", [], new Error("boom"), "vi");

    expect(toastSendFailure).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Không gửi được tin nhắn",
        recovery: "tin nhắn của bạn đã trở lại ô soạn",
      }),
    );
  });

  it("words the recovered-files toast in Vietnamese", () => {
    recoverFailedDeferredSend(
      "",
      [{ type: "file", mediaType: "image/png", url: "x" } as never],
      new Error("boom"),
      "vi",
    );

    expect(toastSendFailure).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Không gửi được tin nhắn",
        recovery: "các tệp của bạn chưa được gửi",
      }),
    );
  });
});
