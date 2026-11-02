"use client";

import {
  getGetV2GetSessionComputerQueryKey,
  useGetV2GetSessionComputer,
  usePostV2StartSessionDesktop,
} from "@/app/api/__generated__/endpoints/chat/chat";
import { okData } from "@/app/api/helpers";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { desktopStreamRenderer } from "@/components/contextual/OutputRenderers/renderers/DesktopStreamRenderer";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useCopilotUIStore } from "../../../store";
import { useT } from "@/lib/i18n";

interface Props {
  sessionId: string;
}

interface PillProps {
  tone: "on" | "off" | "none";
  label: string;
}

function Pill({ tone, label }: PillProps) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        tone === "on"
          ? // TODO(tokens): no exact role for bg-emerald-50, text-emerald-700
            "bg-emerald-50 text-emerald-700"
          : tone === "off"
            ? "bg-surface-hover text-foreground-secondary"
            : "bg-surface-muted text-foreground-tertiary",
      )}
    >
      {label}
    </span>
  );
}

export function ComputerPanelContent({ sessionId }: Props) {
  const t = useT();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const stream = useCopilotUIStore((s) => s.artifactPanel.computer);
  const registerComputerStream = useCopilotUIStore(
    (s) => s.registerComputerStream,
  );

  const computerQuery = useGetV2GetSessionComputer(sessionId, {
    query: {
      select: (res) => okData(res) ?? null,
      refetchInterval: 15_000,
    },
  });
  const computer = computerQuery.data ?? null;

  const { mutate: startDesktop, isPending } = usePostV2StartSessionDesktop({
    mutation: {
      onSuccess: (res) => {
        const next = okData(res);
        if (next) {
          registerComputerStream({
            url: next.url,
            sandbox_id: next.sandbox_id,
            provider: next.provider ?? "e2b",
          });
        }
        queryClient.invalidateQueries({
          queryKey: getGetV2GetSessionComputerQueryKey(sessionId),
        });
      },
      onError: () => {
        toast({
          title: t("chatFiles1.computer.toastTitle"),
          description: t("chatFiles1.computer.toastDescription"),
          variant: "destructive",
        });
      },
    },
  });

  const isExpert = computer?.owner_kind === "expert";
  const box = computer?.box ?? null;
  const machineLabel = !box
    ? t("chatFiles1.computer.machineNone")
    : box.state === "running"
      ? t("chatFiles1.computer.machineRunning")
      : t("chatFiles1.computer.machineSuspended");
  const machineTone = !box ? "none" : box.state === "running" ? "on" : "off";
  const screenOn = computer?.screen_on === true;
  const actionLabel = stream
    ? t("chatFiles1.computer.actionRefresh")
    : screenOn
      ? t("chatFiles1.computer.actionOpenDesktop")
      : t("chatFiles1.computer.actionTurnOnScreen");

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border-base bg-surface px-3 py-2">
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="text-foreground-tertiary">
              {t("chatFiles1.computer.labelMachine")}
            </span>
            <Pill tone={machineTone} label={machineLabel} />
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-foreground-tertiary">
              {t("chatFiles1.computer.labelScreen")}
            </span>
            <Pill
              tone={!box ? "none" : screenOn ? "on" : "off"}
              label={
                !box
                  ? t("chatFiles1.computer.machineNone")
                  : screenOn
                    ? t("chatFiles1.computer.stateOn")
                    : t("chatFiles1.computer.stateOff")
              }
            />
          </span>
        </div>
        <Button
          variant="secondary"
          size="small"
          loading={isPending}
          disabled={computer != null && !computer.e2b_active}
          onClick={() => startDesktop({ sessionId })}
        >
          {actionLabel}
        </Button>
      </div>

      {stream ? (
        <div data-testid="session-desktop-stream">
          {desktopStreamRenderer.render({ kind: "desktop_stream", ...stream })}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border-base p-6 text-center">
          <Text variant="small-medium">
            {t("chatFiles1.computer.screenOffTitle")}
          </Text>
          <Text variant="small" className="max-w-xs text-foreground-tertiary">
            {isExpert
              ? t("chatFiles1.computer.screenOffExpert")
              : t("chatFiles1.computer.screenOffDefault")}
          </Text>
        </div>
      )}

      {computer && !computer.e2b_active ? (
        <Text variant="small" className="text-warning-foreground">
          {t("chatFiles1.computer.sandboxNotConfigured")}
        </Text>
      ) : null}
    </div>
  );
}
