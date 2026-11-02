"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Folder01Icon } from "@hugeicons/core-free-icons";
import { useCopilotUIStore } from "../../store";
import { useT } from "@/lib/i18n";

interface Props {
  className?: string;
}

// Sits next to the sidebar toggle in the chrome's inset header and mirrors
// SidebarTrigger's ghost styling (no border, no shadow).
export function WorkspaceFilesTrigger({ className }: Props) {
  const t = useT();
  const toggleContextPanelTab = useCopilotUIStore(
    (s) => s.toggleContextPanelTab,
  );

  return (
    <Button
      variant="compact-ghost"
      size="compact-icon"
      className={className}
      onClick={() => toggleContextPanelTab("files")}
      aria-label={t("chatFiles2.workspaceFilesTrigger.open")}
    >
      <Icon icon={Folder01Icon} className="!size-5" />
    </Button>
  );
}
