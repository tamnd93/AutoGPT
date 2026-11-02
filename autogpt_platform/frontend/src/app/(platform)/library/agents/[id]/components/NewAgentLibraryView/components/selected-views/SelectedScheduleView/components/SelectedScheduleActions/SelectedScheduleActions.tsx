"use client";

import type { GraphExecutionJobInfo } from "@/app/api/__generated__/models/graphExecutionJobInfo";
import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Button } from "@/components/atoms/Button/Button";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { AgentActionsDropdown } from "../../../AgentActionsDropdown";
import { SelectedActionsWrap } from "../../../SelectedActionsWrap";
import { EditScheduleModal } from "../EditScheduleModal/EditScheduleModal";
import { useSelectedScheduleActions } from "./useSelectedScheduleActions";
import { Delete02Icon, EyeIcon, PlayIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

type Props = {
  agent: LibraryAgent;
  scheduleId: string;
  schedule?: GraphExecutionJobInfo;
  onDeleted?: () => void;
  onSelectRun?: (id: string) => void;
};

export function SelectedScheduleActions({
  agent,
  scheduleId,
  schedule,
  onDeleted,
  onSelectRun,
}: Props) {
  const {
    openInBuilderHref,
    showDeleteDialog,
    setShowDeleteDialog,
    handleDelete,
    isDeleting,
    handleRunNow,
    isRunning,
  } = useSelectedScheduleActions({
    agent,
    scheduleId,
    schedule,
    onDeleted,
    onSelectRun,
  });
  const t = useT();

  return (
    <>
      <SelectedActionsWrap>
        <Button
          variant="icon"
          size="icon"
          aria-label={t("library3.scheduleActions.runNow")}
          onClick={handleRunNow}
          disabled={isRunning || !schedule}
        >
          {isRunning ? (
            <LoadingSpinner size="small" />
          ) : (
            <Icon icon={PlayIcon} size={18} className="text-foreground-body" />
          )}
        </Button>
        {openInBuilderHref && (
          <Button
            variant="icon"
            size="icon"
            as="NextLink"
            href={openInBuilderHref}
            target="_blank"
            aria-label={t("library3.scheduleActions.viewDetails")}
          >
            <Icon icon={EyeIcon} size={18} className="text-foreground-body" />
          </Button>
        )}
        {schedule && (
          <EditScheduleModal
            graphId={agent.graph_id}
            schedule={schedule}
            iconOnly
          />
        )}
        <Button
          variant="icon"
          size="icon"
          aria-label={t("library3.scheduleActions.delete")}
          onClick={() => setShowDeleteDialog(true)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <LoadingSpinner size="small" />
          ) : (
            <Icon icon={Delete02Icon} size={18} />
          )}
        </Button>
        <AgentActionsDropdown agent={agent} scheduleId={scheduleId} />
      </SelectedActionsWrap>

      <Dialog
        controlled={{
          isOpen: showDeleteDialog,
          set: setShowDeleteDialog,
        }}
        styling={{ maxWidth: "32rem" }}
        title={t("library2.actionsDropdown.deleteScheduleTitle")}
      >
        <Dialog.Content>
          <Text variant="large">
            {t("library2.actionsDropdown.deleteScheduleBody")}
          </Text>
          <Dialog.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              {t("library2.common.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              loading={isDeleting}
            >
              {t("library2.actionsDropdown.deleteScheduleConfirm")}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
