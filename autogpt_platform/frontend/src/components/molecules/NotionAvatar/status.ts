import type { useT } from "@/lib/i18n";

export type AvatarStatus =
  | "idle"
  | "thinking"
  | "working"
  | "waiting"
  | "done"
  | "failed"
  | "sleeping";

export interface StatusOption {
  id: AvatarStatus;
  label: string;
  hint: string;
}

/** Localized status options. Keep the exported STATUSES below in sync for
 *  callers that read it directly. */
export function getAvatarStatuses(
  t: ReturnType<typeof useT>,
): StatusOption[] {
  return [
    {
      id: "idle",
      label: t("shared3.avatarStatus.idle"),
      hint: t("shared3.avatarStatus.idleHint"),
    },
    {
      id: "thinking",
      label: t("shared3.avatarStatus.thinking"),
      hint: t("shared3.avatarStatus.thinkingHint"),
    },
    {
      id: "working",
      label: t("shared3.avatarStatus.working"),
      hint: t("shared3.avatarStatus.workingHint"),
    },
    {
      id: "waiting",
      label: t("shared3.avatarStatus.waiting"),
      hint: t("shared3.avatarStatus.waitingHint"),
    },
    {
      id: "done",
      label: t("shared3.avatarStatus.done"),
      hint: t("shared3.avatarStatus.doneHint"),
    },
    {
      id: "failed",
      label: t("shared3.avatarStatus.failed"),
      hint: t("shared3.avatarStatus.failedHint"),
    },
    {
      id: "sleeping",
      label: t("shared3.avatarStatus.sleeping"),
      hint: t("shared3.avatarStatus.sleepingHint"),
    },
  ];
}

export const STATUSES: StatusOption[] = [
  { id: "idle", label: "Idle", hint: "nothing in flight" },
  { id: "thinking", label: "Thinking", hint: "working out what to do" },
  { id: "working", label: "Working", hint: "a run is in flight" },
  { id: "waiting", label: "Needs you", hint: "blocked, asking" },
  { id: "done", label: "Done", hint: "finished its last job" },
  { id: "failed", label: "Failed", hint: "the last run broke" },
  { id: "sleeping", label: "Paused", hint: "schedules off" },
];

export function isAvatarStatus(value: string): value is AvatarStatus {
  return STATUSES.some((status) => status.id === value);
}
