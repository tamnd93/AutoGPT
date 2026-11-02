"use client";
import { Button } from "@/components/atoms/Button/Button";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import {
  TabsLine,
  TabsLineList,
  TabsLineTrigger,
} from "@/components/molecules/TabsLine/TabsLine";
import { useLibraryUploadAgentDialog } from "../LibraryUploadAgentDialog/useLibraryUploadAgentDialog";
import AgentUploadTab from "./components/AgentUploadTab/AgentUploadTab";
import ExternalWorkflowTab from "./components/ExternalWorkflowTab/ExternalWorkflowTab";
import { useExternalWorkflowTab } from "./components/ExternalWorkflowTab/useExternalWorkflowTab";
import { Upload03Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LibraryImportDialog({ isOpen, onOpenChange }: Props) {
  const t = useT();
  const importWorkflow = useExternalWorkflowTab();

  function handleClose() {
    onOpenChange(false);
    importWorkflow.setFileValue("");
    importWorkflow.setUrlValue("");
  }

  const upload = useLibraryUploadAgentDialog({ onSuccess: handleClose });

  return (
    <Dialog
      title={t("library5.importDialog.title")}
      styling={{ maxWidth: "32rem" }}
      controlled={{
        isOpen,
        set: onOpenChange,
      }}
      onClose={handleClose}
    >
      <Dialog.Trigger>
        <Button
          data-testid="import-button"
          variant="primary"
          className="h-[2.78rem] w-full md:w-[10rem]"
          size="small"
        >
          <Icon icon={Upload03Icon} width={18} height={18} />
          <span>{t("library5.importDialog.title")}</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <TabsLine defaultValue="agent">
          <TabsLineList>
            <TabsLineTrigger value="agent">
              {t("library5.importDialog.agentTab")}
            </TabsLineTrigger>
            <TabsLineTrigger value="platform">
              {t("library5.importDialog.platformTab")}
            </TabsLineTrigger>
          </TabsLineList>

          {/* Tab: Import from any platform (file upload + n8n URL) */}
          <ExternalWorkflowTab importWorkflow={importWorkflow} />

          {/* Tab: Upload AutoGPT agent JSON */}
          <AgentUploadTab upload={upload} />
        </TabsLine>
      </Dialog.Content>
    </Dialog>
  );
}
