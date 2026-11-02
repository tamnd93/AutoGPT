"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { WorkflowTile } from "./components/WorkflowTile";
import { INSTALL_WORKFLOW_SOURCES, workflowSubtitle } from "./helpers";
import { useInstallWorkflowPicker } from "./useInstallWorkflowPicker";
import { useLocale, useT } from "@/lib/i18n";

interface Props {
  mode: "pick-expert" | "pick-workflow";
  storeListingVersionId?: string;
  expertId?: string;
  open: boolean;
  onClose: () => void;
}

export function InstallWorkflowPicker({
  mode,
  storeListingVersionId,
  expertId,
  open,
  onClose,
}: Props) {
  const t = useT();
  const locale = useLocale();
  const {
    title,
    hiredExperts,
    source,
    setSource,
    searchQuery,
    setSearchQuery,
    libraryResults,
    hasMoreLibraryResults,
    loadMoreLibraryResults,
    isLoadingMore,
    marketplaceResults,
    isSearching,
    pendingKey,
    installOnExpert,
    installLibraryAgent,
    installFromListing,
  } = useInstallWorkflowPicker({
    mode,
    storeListingVersionId,
    expertId,
    open,
    onClose,
  });

  const isEmpty =
    source === "library"
      ? libraryResults.length === 0
      : marketplaceResults.length === 0;

  return (
    <Dialog
      title={title}
      variant="compact"
      styling={{ width: "480px", maxHeight: "70vh" }}
      controlled={{
        isOpen: open,
        set: (nextOpen) => {
          if (!nextOpen) onClose();
        },
      }}
    >
      <Dialog.Content>
        {mode === "pick-expert" ? (
          hiredExperts.length === 0 ? (
            <Text
              variant="body"
              data-slot="install-workflow-picker-empty"
              className="text-foreground-tertiary"
            >
              {t("shared6.install.noExperts")}
            </Text>
          ) : (
            <div
              data-slot="install-workflow-picker-list"
              className="divide-y divide-separator overflow-hidden rounded-lg border border-border-base/80"
            >
              {hiredExperts.map((expert) => (
                <div
                  key={expert.id}
                  data-slot="install-workflow-picker-option"
                  className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-surface-muted"
                >
                  <Avatar
                    data-slot="install-workflow-picker-option-avatar"
                    className="h-9 w-9"
                  >
                    {expert.avatar_url ? (
                      <AvatarImage
                        data-slot="install-workflow-picker-option-avatar-image"
                        src={expert.avatar_url}
                        alt={expert.name}
                      />
                    ) : null}
                    <AvatarFallback data-slot="install-workflow-picker-option-avatar-fallback">
                      {expert.name}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    data-slot="install-workflow-picker-option-text"
                    className="min-w-0 flex-1"
                  >
                    <Text
                      variant="body-medium"
                      data-slot="install-workflow-picker-option-title"
                      className="truncate"
                    >
                      {expert.name}
                    </Text>
                    <Text
                      variant="small"
                      data-slot="install-workflow-picker-option-subtitle"
                      className="!text-foreground-tertiary"
                    >
                      {expert.role}
                    </Text>
                  </div>
                  <Button
                    variant="secondary"
                    size="small"
                    data-slot="install-workflow-picker-option-install"
                    loading={pendingKey === expert.id}
                    onClick={() => installOnExpert(expert)}
                  >
                    {t("shared6.install.install")}
                  </Button>
                </div>
              ))}
            </div>
          )
        ) : (
          <div
            data-slot="install-workflow-picker"
            className="flex flex-col gap-3"
          >
            <div
              data-slot="install-workflow-picker-sources"
              className="flex gap-2"
              role="group"
              aria-label={t("shared6.install.sourceAria")}
            >
              {INSTALL_WORKFLOW_SOURCES.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant="toggle"
                  size="xs"
                  data-slot="install-workflow-picker-source"
                  aria-pressed={source === option.id}
                  onClick={() => setSource(option.id)}
                >
                  {t(option.labelKey)}
                </Button>
              ))}
            </div>
            <Input
              id="install-workflow-search"
              size="small"
              label={t("shared6.install.searchLabel")}
              hideLabel
              placeholder={
                source === "library"
                  ? t("shared6.install.searchLibrary")
                  : t("shared6.install.searchMarketplace")
              }
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              wrapperClassName="!mb-0"
              data-slot="install-workflow-picker-search"
            />
            {isSearching ? (
              <Text
                variant="small"
                data-slot="install-workflow-picker-status"
                className="py-2 text-center !text-foreground-tertiary"
              >
                {t("shared6.install.searching")}
              </Text>
            ) : isEmpty ? (
              <Text
                variant="small"
                data-slot="install-workflow-picker-empty"
                className="py-2 text-center !text-foreground-tertiary"
              >
                {source === "library"
                  ? t("shared6.install.emptyLibrary")
                  : t("shared6.install.emptyMarketplace")}
              </Text>
            ) : (
              <div
                data-slot="install-workflow-picker-list"
                className="divide-y divide-separator overflow-hidden rounded-lg border border-border-base/80"
              >
                {source === "library"
                  ? libraryResults.map((agent) => (
                      <div
                        key={agent.id}
                        data-testid="install-workflow-option"
                        data-slot="install-workflow-picker-option"
                        className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-surface-muted"
                      >
                        <WorkflowTile imageUrl={agent.image_url} />
                        <div
                          data-slot="install-workflow-picker-option-text"
                          className="min-w-0 flex-1"
                        >
                          <Text
                            variant="body-medium"
                            data-slot="install-workflow-picker-option-title"
                            className="truncate"
                          >
                            {agent.name}
                          </Text>
                          <Text
                            variant="small"
                            data-slot="install-workflow-picker-option-subtitle"
                            className="truncate !text-foreground-tertiary"
                          >
                            {workflowSubtitle(agent.description, locale)}
                          </Text>
                        </div>
                        <Button
                          variant="secondary"
                          size="small"
                          data-slot="install-workflow-picker-option-install"
                          loading={pendingKey === agent.id}
                          onClick={() => installLibraryAgent(agent)}
                        >
                          {t("shared6.install.install")}
                        </Button>
                      </div>
                    ))
                  : marketplaceResults.map((agent) => (
                      <div
                        key={agent.agent_graph_id}
                        data-testid="install-workflow-option"
                        data-slot="install-workflow-picker-option"
                        className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-surface-muted"
                      >
                        <WorkflowTile imageUrl={agent.agent_image} />
                        <div
                          data-slot="install-workflow-picker-option-text"
                          className="min-w-0 flex-1"
                        >
                          <Text
                            variant="body-medium"
                            data-slot="install-workflow-picker-option-title"
                            className="truncate"
                          >
                            {agent.agent_name}
                          </Text>
                          <Text
                            variant="small"
                            data-slot="install-workflow-picker-option-subtitle"
                            className="!text-foreground-tertiary"
                          >
                            {t("shared6.install.by", { name: agent.creator })}
                          </Text>
                        </div>
                        <Button
                          variant="secondary"
                          size="small"
                          data-slot="install-workflow-picker-option-install"
                          loading={pendingKey === agent.agent_graph_id}
                          onClick={() => installFromListing(agent)}
                        >
                          {t("shared6.install.install")}
                        </Button>
                      </div>
                    ))}
              </div>
            )}
            {source === "library" && hasMoreLibraryResults ? (
              <Button
                variant="secondary"
                size="small"
                loading={isLoadingMore}
                data-slot="install-workflow-picker-load-more"
                onClick={() => loadMoreLibraryResults()}
              >
                {t("shared6.install.loadMore")}
              </Button>
            ) : null}
          </div>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
