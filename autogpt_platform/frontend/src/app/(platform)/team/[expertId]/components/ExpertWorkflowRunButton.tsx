"use client";
import { GraphExecutionMeta } from "@/app/api/__generated__/models/graphExecutionMeta";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { RunAgentModal } from "@/app/(platform)/library/agents/[id]/components/NewAgentLibraryView/components/modals/RunAgentModal/RunAgentModal";
import { Button } from "@/components/atoms/Button/Button";
import { PlayIcon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/i18n";

interface Props {
  agent: LibraryAgent;
  isTriggerWorkflow: boolean;
  variant?: "primary" | "secondary";
  onRunCreated: (execution: GraphExecutionMeta) => void;
  onTriggerSetup: () => void;
}

export function ExpertWorkflowRunButton({
  agent,
  isTriggerWorkflow,
  onRunCreated,
  onTriggerSetup,
  variant = "secondary",
}: Props) {
  const t = useT();
  return (
    <RunAgentModal
      agent={agent}
      title={
        isTriggerWorkflow
          ? t("team7.workflows.runButton.setUpTrigger")
          : t("team7.workflows.runButton.runWorkflow")
      }
      dialogVariant="compact"
      onRunCreated={onRunCreated}
      onTriggerSetup={onTriggerSetup}
      triggerSlot={
        <Button
          type="button"
          variant={variant}
          size="small"
          textSize="body-md"
          leadingIcon={PlayIcon}
        >
          {isTriggerWorkflow
            ? t("team7.workflows.runButton.setUpTrigger")
            : t("team7.workflows.runButton.run")}
        </Button>
      }
    />
  );
}
