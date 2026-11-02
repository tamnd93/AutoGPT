"use client";

import { toast } from "@/components/molecules/Toast/use-toast";
import { useEffect, useState } from "react";
import { useCopilotUIStore } from "../../store";
import { getCachedArtifactContent } from "./components/useArtifactContent";
import { downloadArtifact } from "./downloadArtifact";
import { classifyArtifactRef } from "./helpers";
import { useLocale, useT } from "@/lib/i18n";

export function useArtifactPanel() {
  const locale = useLocale();
  const t = useT();
  const artifactPanel = useCopilotUIStore((s) => s.artifactPanel);
  const closeArtifactPanel = useCopilotUIStore((s) => s.closeArtifactPanel);
  const clearArtifactPreview = useCopilotUIStore((s) => s.clearArtifactPreview);
  const goBackArtifact = useCopilotUIStore((s) => s.goBackArtifact);
  const showFilesTab = useCopilotUIStore((s) => s.showFilesTab);
  const artifactPanelWidth = useCopilotUIStore((s) => s.artifactPanelWidth);
  const setArtifactPanelWidth = useCopilotUIStore(
    (s) => s.setArtifactPanelWidth,
  );
  const setArtifactPanelMode = useCopilotUIStore((s) => s.setArtifactPanelMode);

  const [isSourceView, setIsSourceView] = useState(false);

  const { activeArtifact } = artifactPanel;

  const classification = activeArtifact
    ? classifyArtifactRef(activeArtifact, locale)
    : null;

  // Reset source view when switching artifacts
  useEffect(() => {
    setIsSourceView(false);
  }, [activeArtifact?.id]);

  // Escape-to-close is owned by the vaul Drawer.Root in ArtifactPanel — its
  // onOpenChange already routes to clearArtifactPreview. A manual document
  // listener here would self-block on the drawer's own [role="dialog"].

  const canCopy =
    classification != null &&
    classification.type !== "image" &&
    classification.type !== "video" &&
    classification.type !== "download-only" &&
    classification.type !== "pdf" &&
    classification.type !== "expert";

  function handleCopy() {
    if (!activeArtifact || !canCopy) return;
    // Reuse content already fetched by the preview pane when available —
    // Copy should feel instant, not trigger a second network round-trip.
    const cached = getCachedArtifactContent(activeArtifact.id);
    const textPromise = cached
      ? Promise.resolve(cached)
      : fetch(activeArtifact.sourceUrl).then((res) => {
          if (!res.ok) throw new Error(`Copy failed: ${res.status}`);
          return res.text();
        });
    textPromise
      .then((text) => navigator.clipboard.writeText(text))
      .then(() => {
        toast({ title: t("chatFiles1.artifactPanel.copied") });
      })
      .catch(() => {
        toast({
          title: t("chatFiles1.artifactPanel.copyFailedTitle"),
          description: t("chatFiles1.artifactPanel.copyFailedDescription"),
          variant: "destructive",
        });
      });
  }

  function handleDownload() {
    if (!activeArtifact) return;
    downloadArtifact(activeArtifact).catch(() => {
      toast({
        title: t("chatFiles1.artifactCard.downloadFailedTitle"),
        description: t("chatFiles1.artifactCard.downloadFailedDescription"),
        variant: "destructive",
      });
    });
  }

  return {
    activeArtifact,
    history: artifactPanel.history,
    isSourceView,
    classification,
    setIsSourceView,
    closeArtifactPanel,
    clearArtifactPreview,
    goBackArtifact,
    showFilesTab,
    canCopy,
    handleCopy,
    handleDownload,
    artifactPanelWidth,
    setArtifactPanelWidth,
    mode: artifactPanel.mode,
    isComputerOpen: artifactPanel.isComputerOpen,
    setArtifactPanelMode,
  };
}
