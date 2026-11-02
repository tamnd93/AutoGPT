import type { ComputerInfo } from "@/app/api/__generated__/models/computerInfo";
import type { SandboxSummary } from "@/app/api/__generated__/models/sandboxSummary";
import type { Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export function formatSandboxState(
  summary: SandboxSummary | null | undefined,
  locale: Locale = "en",
) {
  if (!summary) return getMessage(locale, "team2.computer.notCreated");
  if (summary.state === "running") {
    const since = new Date(summary.started_at);
    return getMessage(locale, "team2.computer.runningSince", {
      time: since.toLocaleTimeString(locale === "vi" ? "vi-VN" : [], {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  }
  return getMessage(locale, "team2.computer.suspendedResume");
}

export function formatResources(summary: SandboxSummary | null | undefined) {
  if (!summary) return null;
  const gib = summary.memory_mb / 1024;
  const memory =
    gib >= 1
      ? `${Number.isInteger(gib) ? gib : gib.toFixed(1)} GiB`
      : `${summary.memory_mb} MiB`;
  return `${summary.cpu_count} vCPU · ${memory}`;
}

export function formatScreen(
  computer: Pick<ComputerInfo, "box" | "screen_on">,
  locale: Locale = "en",
) {
  if (!computer.box) return getMessage(locale, "team2.computer.screenNoBox");
  return computer.screen_on
    ? getMessage(locale, "team2.computer.screenOn")
    : getMessage(locale, "team2.computer.screenOff");
}

export function describeMount(
  path: string,
  computer: Pick<ComputerInfo, "workspace_path" | "shared_path" | "owner_kind">,
  locale: Locale = "en",
) {
  if (path === computer.workspace_path) {
    return getMessage(
      locale,
      computer.owner_kind === "expert"
        ? "team2.computer.mountExpertHome"
        : "team2.computer.mountYourWorkspace",
    );
  }
  if (path === computer.shared_path) {
    return getMessage(locale, "team2.computer.mountShared");
  }
  return getMessage(locale, "team2.computer.mountGeneric");
}

export function desktopActionLabel(
  computer: ComputerInfo | null | undefined,
  locale: Locale = "en",
) {
  if (!computer?.box || !computer.screen_on)
    return getMessage(locale, "team2.computer.turnOnScreen");
  return getMessage(
    locale,
    computer.box.state === "running"
      ? "team2.computer.openDesktop"
      : "team2.computer.resumeDesktop",
  );
}
