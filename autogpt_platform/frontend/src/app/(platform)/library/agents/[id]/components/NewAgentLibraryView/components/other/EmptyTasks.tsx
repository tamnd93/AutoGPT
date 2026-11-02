"use client";

import { getV1GetGraphVersion } from "@/app/api/__generated__/endpoints/graphs/graphs";
import {
  getGetV2ListLibraryAgentsQueryKey,
  useDeleteV2DeleteLibraryAgent,
} from "@/app/api/__generated__/endpoints/library/library";
import { GraphExecutionJobInfo } from "@/app/api/__generated__/models/graphExecutionJobInfo";
import { GraphExecutionMeta } from "@/app/api/__generated__/models/graphExecutionMeta";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { LibraryAgentPreset } from "@/app/api/__generated__/models/libraryAgentPreset";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { ShowMoreText } from "@/components/molecules/ShowMoreText/ShowMoreText";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { exportAsJSONFile } from "@/lib/utils";
import { useLocale, useT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils/time";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RunAgentModal } from "../modals/RunAgentModal/RunAgentModal";
import { RunDetailCard } from "../selected-views/RunDetailCard/RunDetailCard";
import { EmptyTasksIllustration } from "./EmptyTasksIllustration";

type Props = {
  agent: LibraryAgent;
  onRun?: (run: GraphExecutionMeta) => void;
  onTriggerSetup?: (preset: LibraryAgentPreset) => void;
  onScheduleCreated?: (schedule: GraphExecutionJobInfo) => void;
};

export function EmptyTasks({
  agent,
  onRun,
  onTriggerSetup,
  onScheduleCreated,
}: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const locale = useLocale();
  const t = useT();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeletingAgent, setIsDeletingAgent] = useState(false);

  const { mutateAsync: deleteAgent } = useDeleteV2DeleteLibraryAgent();

  async function handleDeleteAgent() {
    if (!agent.id) return;

    setIsDeletingAgent(true);

    try {
      await deleteAgent({ libraryAgentId: agent.id });

      await queryClient.refetchQueries({
        queryKey: getGetV2ListLibraryAgentsQueryKey(),
      });

      toast({ title: t("library2.emptyTasks.workflowDeleted") });
      setShowDeleteDialog(false);
      router.push("/library");
    } catch (error: unknown) {
      toast({
        title: t("library2.emptyTasks.workflowDeleteFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("library2.common.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsDeletingAgent(false);
    }
  }

  async function handleExport() {
    try {
      const res = await getV1GetGraphVersion(
        agent.graph_id,
        agent.graph_version,
        { for_export: true },
      );
      if (res.status === 200) {
        const filename = `${agent.name}_v${agent.graph_version}.json`;
        exportAsJSONFile(res.data as any, filename);
        toast({ title: t("library2.emptyTasks.workflowExported") });
      } else {
        toast({
          title: t("library2.emptyTasks.workflowExportFailed"),
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: t("library2.emptyTasks.workflowExportFailed"),
        description: e?.message,
        variant: "destructive",
      });
    }
  }
  const isPublished = Boolean(agent.marketplace_listing);
  const createdAt = formatDate(agent.created_at, locale);
  const updatedAt = formatDate(agent.updated_at, locale);
  const isUpdated = updatedAt !== createdAt;

  return (
    <div className="my-4 flex min-h-0 flex-1 flex-col gap-2 px-2 lg:flex-row">
      <RunDetailCard className="relative flex min-h-0 flex-1 flex-col overflow-hidden border-none">
        <div className="flex flex-1 flex-col items-center justify-center gap-0">
          <EmptyTasksIllustration className="-mt-20" />
          <div className="flex flex-col items-center gap-12">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col items-center gap-2">
                <Text
                  variant="h3"
                  className="text-center text-heading-sm leading-inherit"
                >
                  {t("library2.emptyTasks.ready")}
                </Text>
                <Text variant="large" className="text-center">
                  {t("library2.emptyTasks.runHint")}
                </Text>
              </div>
            </div>
            <RunAgentModal
              triggerSlot={
                <Button
                  variant="primary"
                  size="large"
                  className="inline-flex w-[19.75rem]"
                >
                  {t("library2.emptyTasks.setupTask")}
                </Button>
              }
              agent={agent}
              onRunCreated={onRun}
              onTriggerSetup={onTriggerSetup}
              onScheduleCreated={onScheduleCreated}
            />
          </div>
        </div>
      </RunDetailCard>

      <div className="mt-4 flex flex-col gap-10 rounded-large border border-border-base p-6 lg:mt-0 lg:w-[29.5rem]">
        <Text variant="label" className="text-foreground-tertiary">
          {t("library2.emptyTasks.about")}
        </Text>
        <div className="flex flex-col gap-2">
          <Text variant="h4">{agent.name}</Text>
          {isPublished ? (
            <Text variant="body">
              {t("library2.emptyTasks.by", {
                creator: agent.marketplace_listing?.creator.name ?? "",
              })}
            </Text>
          ) : null}
        </div>
        <ShowMoreText
          previewLimit={170}
          variant="body"
          className="-mt-4 text-textGrey"
        >
          {agent.description || t("library2.emptyTasks.unpublished")}
        </ShowMoreText>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-20">
            <div className="flex flex-col gap-0">
              <Text variant="body-medium" className="text-foreground-base">
                {t("library2.emptyTasks.createdOn")}
              </Text>
              <Text variant="body" className="text-textGrey">
                {createdAt}
              </Text>
            </div>
            {isUpdated ? (
              <div className="flex flex-col gap-0">
                <Text variant="body-medium" className="text-foreground-base">
                  {t("library2.emptyTasks.updatedOn")}
                </Text>
                <Text variant="body" className="text-textGrey">
                  {updatedAt}
                </Text>
              </div>
            ) : null}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="secondary" size="small" asChild>
              <Link
                href={`/build?flowID=${agent.graph_id}&flowVersion=${agent.graph_version}`}
                target="_blank"
              >
                {t("library2.emptyTasks.edit")}
              </Link>
            </Button>
            <Button variant="secondary" size="small" onClick={handleExport}>
              {t("library2.emptyTasks.export")}
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setShowDeleteDialog(true)}
            >
              {t("library2.emptyTasks.delete")}
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        controlled={{
          isOpen: showDeleteDialog,
          set: setShowDeleteDialog,
        }}
        styling={{ maxWidth: "32rem" }}
        title={t("library2.emptyTasks.deleteTitle")}
      >
        <Dialog.Content>
          <div>
            <Text variant="large">{t("library2.emptyTasks.deleteBody")}</Text>
            <Dialog.Footer>
              <Button
                variant="secondary"
                disabled={isDeletingAgent}
                onClick={() => setShowDeleteDialog(false)}
              >
                {t("library2.common.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAgent}
                loading={isDeletingAgent}
              >
                {t("library2.emptyTasks.deleteConfirm")}
              </Button>
            </Dialog.Footer>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
