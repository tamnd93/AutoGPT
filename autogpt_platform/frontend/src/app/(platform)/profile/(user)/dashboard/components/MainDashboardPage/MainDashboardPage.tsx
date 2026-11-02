import { useMainDashboardPage } from "./useMainDashboardPage";
import { Separator } from "@/components/atoms/Separator/Separator";
import { AgentTable } from "../AgentTable/AgentTable";
import { PublishAgentModal } from "@/components/contextual/PublishAgentModal/PublishAgentModal";
import { EditAgentModal } from "@/components/contextual/EditAgentModal/EditAgentModal";
import { Button } from "@/components/atoms/Button/Button";
import { EmptySubmissions } from "./components/EmptySubmissions";
import { SubmissionLoadError } from "./components/SumbmissionLoadError";
import { SubmissionsLoading } from "./components/SubmissionsLoading";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

export const MainDashboardPage = () => {
  const t = useT();
  const {
    onDeleteSubmission,
    onViewSubmission,
    onEditSubmission,
    onEditSuccess,
    onEditClose,
    onOpenSubmitModal,
    onPublishStateChange,
    publishState,
    editState,
    // API data
    submissions,
    isLoading,
    error,
  } = useMainDashboardPage();

  return (
    <main className="flex-1 py-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-6">
          <Text variant="h1" size="h3">
            {t("profile4.dashboard.title")}
          </Text>
          <div className="space-y-2">
            <Text
              variant="h2"
              size="large-medium"
              // TODO(tokens): no exact role (text-neutral-900 #171717, dark:text-neutral-100)
              className="text-neutral-900 dark:text-neutral-100"
            >
              {t("profile4.dashboard.submitTitle")}
            </Text>
            <Text variant="body" size="small">
              {t("profile4.dashboard.submitBody")}
            </Text>
          </div>
        </div>
        <PublishAgentModal
          targetState={publishState}
          onStateChange={onPublishStateChange}
          trigger={
            <Button
              data-testid="submit-agent-button"
              size="small"
              onClick={onOpenSubmitModal}
            >
              {t("profile4.dashboard.submitButton")}
            </Button>
          }
        />
      </div>

      <Separator className="mb-8" />

      {/* Agents Section */}
      <div>
        <Text
          variant="h2"
          size="large-medium"
          // TODO(tokens): no exact role (text-neutral-900 #171717, dark:text-neutral-100)
          className="mb-4 text-neutral-900 dark:text-neutral-100"
        >
          {t("profile4.dashboard.uploadedTitle")}
        </Text>

        {error ? (
          <SubmissionLoadError />
        ) : isLoading ? (
          <SubmissionsLoading />
        ) : submissions && submissions.submissions.length > 0 ? (
          <AgentTable
            storeAgentSubmissions={submissions.submissions}
            onViewSubmission={onViewSubmission}
            onDeleteSubmission={onDeleteSubmission}
            onEditSubmission={onEditSubmission}
          />
        ) : (
          <EmptySubmissions />
        )}
      </div>

      <EditAgentModal
        isOpen={editState.isOpen}
        onClose={onEditClose}
        submission={editState.submission}
        onSuccess={onEditSuccess}
      />
    </main>
  );
};
