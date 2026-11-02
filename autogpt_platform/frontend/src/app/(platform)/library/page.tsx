"use client";

import { useEffect, useState, useCallback } from "react";
import { useQueryState } from "nuqs";
import { AgentsTabIntro } from "./components/AgentsTabIntro/AgentsTabIntro";
import { LibraryActionHeader } from "./components/LibraryActionHeader/LibraryActionHeader";
import { LibraryAgentList } from "./components/LibraryAgentList/LibraryAgentList";
import { useLibraryListPage } from "./components/useLibraryListPage";
import { FavoriteAnimationProvider } from "./context/FavoriteAnimationContext";
import type { LibraryTab, AgentStatusFilter } from "./types";
import { useLibraryFleetSummary } from "./hooks/useLibraryFleetSummary";
import { useLibraryAgents } from "@/hooks/useLibraryAgents/useLibraryAgents";
import { FavouriteIcon, Menu01Icon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/i18n";


export default function LibraryPage() {
  const { searchTerm, setSearchTerm, librarySort, setLibrarySort } =
    useLibraryListPage();
  // In the URL, so a link can open a folder (the approval card links one).
  const [selectedFolderId, setSelectedFolderId] = useQueryState("folder");
  const t = useT();
  const tabs: LibraryTab[] = [
    { id: "all", title: t("library5.tabs.all"), icon: Menu01Icon },
    { id: "favorites", title: t("library5.tabs.favorites"), icon: FavouriteIcon },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [statusFilter, setStatusFilter] = useState<AgentStatusFilter>("all");
  const [isImportOpen, setIsImportOpen] = useState(false);
  const { agents } = useLibraryAgents();
  const fleetSummary = useLibraryFleetSummary(agents);

  useEffect(() => {
    document.title = "Library – AutoGPT Platform";
  }, []);

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
    setSelectedFolderId(null);
  }

  const handleFavoriteAnimationComplete = useCallback(() => {
    setActiveTab("favorites");
    setSelectedFolderId(null);
  }, []);

  return (
    <FavoriteAnimationProvider
      onAnimationComplete={handleFavoriteAnimationComplete}
    >
      <main className="pt-160 container min-h-screen space-y-4 pb-20 pt-16 sm:px-8 md:px-12">
        <LibraryActionHeader
          setSearchTerm={setSearchTerm}
          isImportOpen={isImportOpen}
          onImportOpenChange={setIsImportOpen}
        />
        <LibraryAgentList
          searchTerm={searchTerm}
          librarySort={librarySort}
          setLibrarySort={setLibrarySort}
          selectedFolderId={selectedFolderId}
          onFolderSelect={setSelectedFolderId}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          fleetSummary={fleetSummary}
          briefingAgents={agents}
        />
      </main>
      <AgentsTabIntro canShow={!isImportOpen} />
    </FavoriteAnimationProvider>
  );
}
