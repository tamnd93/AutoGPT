"use client";

import {
  getGetV1ListGraphExecutionsQueryKey,
  usePostV1ExecuteGraphAgent,
  usePostV1StopGraphExecution,
} from "@/app/api/__generated__/endpoints/graphs/graphs";
import {
  getGetV2ListPresetsQueryKey,
  usePostV2CreateANewPreset,
} from "@/app/api/__generated__/endpoints/presets/presets";
import type { GraphExecution } from "@/app/api/__generated__/models/graphExecution";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { okData } from "@/app/api/helpers";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Params {
  agentGraphId: string;
  run?: GraphExecution;
  agent?: LibraryAgent;
  onSelectRun?: (id: string) => void;
}

export function useSelectedRunActions({
  agentGraphId,
  run,
  agent,
  onSelectRun,
}: Params) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const t = useT();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] =
    useState(false);

  const canStop = run?.status === "RUNNING" || run?.status === "QUEUED";

  const canRunManually = !agent?.trigger_setup_info;

  const { mutateAsync: stopRun, isPending: isStopping } =
    usePostV1StopGraphExecution();

  const { mutateAsync: executeRun, isPending: isRunningAgain } =
    usePostV1ExecuteGraphAgent();

  const { mutateAsync: createPreset, isPending: isCreatingTemplate } =
    usePostV2CreateANewPreset();

  async function handleStopRun() {
    try {
      await stopRun({
        graphId: run?.graph_id ?? "",
        graphExecId: run?.id ?? "",
      });

      toast({ title: t("library2.runActions.toast.stopped") });

      await queryClient.invalidateQueries({
        queryKey: getGetV1ListGraphExecutionsQueryKey(agentGraphId),
      });
    } catch (error: unknown) {
      toast({
        title: t("library2.runActions.toast.stopFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  async function handleRunAgain() {
    if (!run) {
      toast({
        title: t("library2.runActions.toast.runNotFound"),
        description: t("library2.runActions.toast.runNotFound"),
        variant: "destructive",
      });
      return;
    }

    try {
      toast({ title: t("library2.runActions.toast.started") });

      const res = await executeRun({
        graphId: run.graph_id,
        graphVersion: run.graph_version,
        data: {
          inputs: run.inputs || {},
          credentials_inputs: run.credential_inputs || {},
          source: "library",
        },
      });

      const newRunId = okData(res)?.id;

      await queryClient.invalidateQueries({
        queryKey: getGetV1ListGraphExecutionsQueryKey(agentGraphId),
      });

      if (newRunId && onSelectRun) onSelectRun(newRunId);
    } catch (error: unknown) {
      toast({
        title: t("library2.runActions.toast.startFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  function handleShowDeleteDialog(open: boolean) {
    setShowDeleteDialog(open);
  }

  async function handleCreateTemplate(name: string, description: string) {
    if (!run) {
      toast({
        title: t("library2.runActions.toast.runNotFound"),
        description: t("library2.runActions.toast.missingRunTemplate"),
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await createPreset({
        data: {
          name,
          description,
          graph_execution_id: run.id,
        },
      });

      if (res.status === 200) {
        toast({
          title: t("library2.runActions.toast.templateCreated"),
        });

        if (agent) {
          queryClient.invalidateQueries({
            queryKey: getGetV2ListPresetsQueryKey({
              graph_id: agent.graph_id,
            }),
          });
        }

        setIsCreateTemplateModalOpen(false);
      }
    } catch (error: unknown) {
      toast({
        title: t("library2.runActions.toast.templateFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    }
  }

  // Open in builder URL helper
  const openInBuilderHref = run
    ? `/build?flowID=${run.graph_id}&flowVersion=${run.graph_version}&flowExecutionID=${run.id}`
    : undefined;

  return {
    openInBuilderHref,
    showDeleteDialog,
    canStop,
    isStopping,
    canRunManually,
    isRunningAgain,
    handleShowDeleteDialog,
    handleStopRun,
    handleRunAgain,
    handleCreateTemplate,
    isCreatingTemplate,
    isCreateTemplateModalOpen,
    setIsCreateTemplateModalOpen,
  } as const;
}
