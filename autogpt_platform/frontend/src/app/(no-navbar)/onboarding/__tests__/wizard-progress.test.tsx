import { LocaleProvider } from "@/lib/i18n";
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readLocalProgress, writeLocalProgress } from "../progress";
import { PAYWALL_LAST_STEPS, useOnboardingWizardStore } from "../store";
import { useWizardProgress } from "../useWizardProgress";
import { makeProgress as makeBaseProgress } from "./progress-fixture";

const { getState, patchState } = vi.hoisted(() => ({
  getState: vi.fn(),
  patchState: vi.fn(),
}));
vi.mock("@/app/api/__generated__/endpoints/onboarding/onboarding", () => ({
  getV1OnboardingState: getState,
  patchV1UpdateOnboardingState: patchState,
}));
let params = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => params,
}));

function makeProgress(overrides: Parameters<typeof makeBaseProgress>[0] = {}) {
  const draft = makeBaseProgress(overrides);
  return {
    ...draft,
    completedSteps: [
      "team",
      "autopilot",
      ...draft.completedSteps,
    ] as typeof draft.completedSteps,
  };
}
function response(progress = makeProgress(), revision = 4, userID = "u1") {
  return {
    status: 200,
    data: {
      userId: userID,
      completedSteps: [],
      wizardProgress: progress,
      wizardRevision: revision,
    },
  };
}

function mountWizard(userID = "u1") {
  return renderHook(
    ({ userID }) =>
      useWizardProgress({
        userID,
        ready: true,
        steps: PAYWALL_LAST_STEPS,
      }),
    { initialProps: { userID } },
  );
}

function mountWizardVi(userID = "u1") {
  return renderHook(
    ({ userID }) =>
      useWizardProgress({
        userID,
        ready: true,
        steps: PAYWALL_LAST_STEPS,
      }),
    {
      initialProps: { userID },
      wrapper: ({ children }) => (
        <LocaleProvider locale="vi">{children}</LocaleProvider>
      ),
    },
  );
}

async function settle() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(250);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.resetAllMocks();
  params = new URLSearchParams();
  localStorage.clear();
  useOnboardingWizardStore.getState().reset();
  getState.mockResolvedValue(response());
  patchState.mockImplementation(({ wizardRevision, wizardUserId }) =>
    Promise.resolve({
      status: 200,
      data: { userId: wizardUserId, wizardRevision: wizardRevision + 1 },
    }),
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("restores a server draft without saving or depending on property order", async () => {
  const reordered = Object.fromEntries(
    Object.entries(makeProgress()).reverse(),
  );
  getState.mockResolvedValue({
    ...response(),
    data: { ...response().data, wizardProgress: reordered },
  });
  const { result } = mountWizard();
  await settle();
  expect(result.current.isReady).toBe(true);
  expect(patchState).not.toHaveBeenCalled();
  expect(readLocalProgress("u1")).toEqual({
    progress: makeProgress(),
    revision: 4,
    pending: false,
  });
});

it("does not save an empty wizard until its first edit", async () => {
  getState.mockResolvedValue({
    ...response(),
    data: { ...response().data, wizardProgress: null, wizardRevision: 0 },
  });
  mountWizard();
  await settle();
  expect(patchState).not.toHaveBeenCalled();
  act(() => useOnboardingWizardStore.getState().setRole("Founder"));
  await settle();
  expect(patchState).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      wizardProgress: expect.objectContaining({ role: "Founder" }),
      wizardRevision: 0,
      wizardUserId: "u1",
    }),
    expect.anything(),
  );
});

it("saves the first edit after a clean restore with the loaded revision", async () => {
  mountWizard();
  await settle();
  act(() => useOnboardingWizardStore.getState().setOtherRole("Founder"));
  await settle();
  expect(patchState).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      wizardProgress: makeProgress({ otherRole: "Founder" }),
      wizardRevision: 4,
    }),
    expect.anything(),
  );
});

it.each([false, true])(
  "replays pending changes when offline=%s",
  async (offline) => {
    const changed = makeProgress({ role: "Founder" });
    writeLocalProgress("u1", changed, true, 4);
    if (offline) getState.mockRejectedValue(new Error("Offline"));
    mountWizard();
    await settle();
    expect(patchState).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ wizardProgress: changed, wizardRevision: 4 }),
      expect.anything(),
    );
  },
);

it("acknowledges an uncertain save already present on the server without another write", async () => {
  writeLocalProgress("u1", makeProgress(), true, 3);
  mountWizard();
  await settle();
  expect(patchState).not.toHaveBeenCalled();
  expect(readLocalProgress("u1")).toEqual({
    progress: makeProgress(),
    revision: 4,
    pending: false,
  });
});

it("keeps saving after a timed-out save that the server applied", async () => {
  let server = { progress: makeProgress(), revision: 4 };
  getState.mockImplementation(async () =>
    response(server.progress, server.revision),
  );
  patchState.mockImplementation(
    ({ wizardProgress, wizardRevision, wizardUserId }) => {
      if (wizardRevision !== server.revision)
        return Promise.resolve({ status: 409, data: { detail: "Conflict" } });
      const answers = server.revision > 4;
      server = { progress: wizardProgress, revision: server.revision + 1 };
      if (!answers) return new Promise(() => {});
      return Promise.resolve({
        status: 200,
        data: { userId: wizardUserId, wizardRevision: server.revision },
      });
    },
  );
  const { result } = mountWizard();
  await settle();
  act(() => useOnboardingWizardStore.getState().setRole("Founder"));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(10_250);
  });
  expect(result.current.error).toMatch(/couldn't save/i);
  act(() => useOnboardingWizardStore.getState().setOtherRole("Solo"));
  await settle();
  const latest = makeProgress({ role: "Founder", otherRole: "Solo" });
  expect(result.current.conflict).toBe(false);
  expect(result.current.error).toBeNull();
  expect(server).toEqual({ progress: latest, revision: 6 });
  expect(readLocalProgress("u1")).toEqual({
    progress: latest,
    revision: 6,
    pending: false,
  });
});

it("keeps a clean offline cache clean and saves subsequent edits", async () => {
  writeLocalProgress("u1", makeProgress(), false, 4);
  getState.mockRejectedValue(new Error("Offline"));
  const { result } = mountWizard();
  await settle();
  expect(patchState).not.toHaveBeenCalled();
  expect(result.current.error).not.toMatch(/retrying/i);
  act(() => useOnboardingWizardStore.getState().setRole("Founder"));
  await settle();
  expect(patchState).toHaveBeenCalledOnce();
});

it("persists a requested-step correction", async () => {
  params = new URLSearchParams("step=role");
  getState.mockResolvedValue(
    response(
      makeProgress({
        currentStep: "subscription",
        completedSteps: ["role", "painPoints"],
      }),
    ),
  );
  mountWizard();
  await settle();
  expect(patchState).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      wizardProgress: makeProgress({
        currentStep: "role",
        completedSteps: ["role", "painPoints"],
      }),
      wizardRevision: 4,
    }),
    expect.anything(),
  );
});

it("does not acknowledge a different outbox written by another tab during restore", async () => {
  writeLocalProgress("u1", makeProgress(), true, 3);
  getState.mockImplementation(async () => {
    writeLocalProgress("u1", makeProgress({ role: "Newer tab" }), true, 4);
    return response();
  });
  mountWizard();
  await settle();
  expect(patchState).not.toHaveBeenCalled();
  expect(readLocalProgress("u1")).toEqual({
    progress: makeProgress({ role: "Newer tab" }),
    revision: 4,
    pending: true,
  });
});

it("retains stale-draft conflict handling and reloads without a redundant write", async () => {
  writeLocalProgress("u1", makeProgress({ role: "Stale" }), true, 3);
  const { result } = mountWizard();
  await settle();
  expect(result.current.conflict).toBe(true);
  expect(patchState).not.toHaveBeenCalled();
  act(() => result.current.retry());
  await settle();
  expect(result.current.isReady).toBe(true);
  expect(patchState).not.toHaveBeenCalled();
  expect(readLocalProgress("u1")?.pending).toBe(false);
});

it("rejects a restored draft belonging to another signed-in account", async () => {
  getState.mockResolvedValue(response(makeProgress(), 4, "u2"));
  const { result } = mountWizard();
  await settle();
  expect(result.current.isReady).toBe(false);
  expect(result.current.error).toMatch(/account changed/i);
  expect(readLocalProgress("u1")).toBeNull();
  expect(patchState).not.toHaveBeenCalled();
});

describe("onboarding progress copy in Vietnamese", () => {
  it("reads a stale-draft conflict in Vietnamese", async () => {
    writeLocalProgress("u1", makeProgress({ role: "Stale" }), true, 3);
    const { result } = mountWizardVi();
    await settle();

    expect(result.current.conflict).toBe(true);
    expect(result.current.error).toBe(
      "Onboarding đã được cập nhật ở một phiên khác. Hãy tải lại tiến độ mới nhất để tiếp tục. Các câu trả lời chưa lưu trên thiết bị này sẽ bị thay thế.",
    );
  });

  it("reads a changed signed-in account in Vietnamese", async () => {
    getState.mockResolvedValue(response(makeProgress(), 4, "u2"));
    const { result } = mountWizardVi();
    await settle();

    expect(result.current.error).toBe(
      "Tài khoản đăng nhập của bạn đã thay đổi. Hãy tải lại trang để khôi phục tiến độ.",
    );
  });

  it("reads a failed restore in Vietnamese", async () => {
    getState.mockRejectedValue(new Error("Offline"));
    const { result } = mountWizardVi();
    await settle();

    expect(result.current.error).toBe(
      "Chúng tôi không khôi phục được tiến độ onboarding của bạn. Vui lòng thử lại.",
    );
  });

  it("reads the offline sync notice in Vietnamese", async () => {
    writeLocalProgress("u1", makeProgress(), false, 3);
    getState.mockRejectedValue(new Error("Offline"));
    const { result } = mountWizardVi();
    await settle();

    expect(result.current.error).toBe(
      "Tiến độ đã lưu của bạn có trên thiết bị này. Các thay đổi sẽ đồng bộ khi có kết nối trở lại.",
    );
  });

  it("reads the save failure in Vietnamese", async () => {
    patchState.mockRejectedValue(new Error("offline"));
    const { result } = mountWizardVi();
    await settle();
    act(() => useOnboardingWizardStore.getState().setRole("Founder"));
    await settle();

    expect(result.current.error).toBe(
      "Chúng tôi không lưu được tiến độ vào tài khoản của bạn. Chúng tôi sẽ tiếp tục thử lại; bạn có thể tiếp tục tại đây.",
    );
  });
});

it("ignores a delayed restore after the account changes", async () => {
  let resolveFirst!: (value: ReturnType<typeof response>) => void;
  getState.mockReturnValueOnce(
    new Promise((resolve) => {
      resolveFirst = resolve;
    }),
  );
  getState.mockResolvedValueOnce(
    response(makeProgress({ role: "Other account" }), 6, "u2"),
  );
  const { rerender } = mountWizard();
  rerender({ userID: "u2" });
  await settle();
  await act(async () => {
    resolveFirst(response());
  });
  expect(useOnboardingWizardStore.getState()).toMatchObject({
    userID: "u2",
    role: "Other account",
  });
  expect(readLocalProgress("u1")).toBeNull();
  expect(patchState).not.toHaveBeenCalled();
});
