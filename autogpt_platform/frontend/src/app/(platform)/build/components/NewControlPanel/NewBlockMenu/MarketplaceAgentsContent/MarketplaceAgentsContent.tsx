import React from "react";
import { MarketplaceAgentBlock } from "../MarketplaceAgentBlock";
import { useMarketplaceAgentsContent } from "./useMarketplaceAgentsContent";
import { scrollbarStyles } from "@/components/styles/scrollbars";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { cn } from "@/lib/utils";
import { InfiniteScroll } from "@/components/contextual/InfiniteScroll/InfiniteScroll";
import { blockMenuContainerStyle } from "../style";
import { useT } from "@/lib/i18n";

export const MarketplaceAgentsContent = () => {
  const t = useT();
  const {
    handleAddStoreAgent,
    addingAgent,
    isListStoreAgentsLoading,
    isListStoreAgentsError,
    listStoreAgentsError,
    listStoreAgents,
    refetchListStoreAgents,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useMarketplaceAgentsContent();

  if (isListStoreAgentsLoading) {
    return (
      <div
        className={cn(
          scrollbarStyles,
          "h-full overflow-y-auto pt-4 transition-all duration-200",
        )}
      >
        <div className="w-full space-y-3 px-4 pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <MarketplaceAgentBlock.Skeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isListStoreAgentsError) {
    return (
      <div className="h-full p-4">
        <ErrorCard
          isSuccess={false}
          context={t("build3.errors.contextBlockMenu")}
          httpError={{
            status: status,
            statusText: t("build3.errors.statusRequestFailed"),
            message:
              (listStoreAgentsError?.detail as unknown as string) ||
              t("build3.errors.messageDefault"),
          }}
          responseError={listStoreAgentsError || undefined}
          onRetry={() => refetchListStoreAgents()}
        />
      </div>
    );
  }

  return (
    <InfiniteScroll
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      className={blockMenuContainerStyle}
    >
      {listStoreAgents?.map((agent, index) => (
        <MarketplaceAgentBlock
          key={agent.slug + index}
          slug={agent.slug}
          title={agent.agent_name}
          image_url={agent.agent_image}
          creator_name={agent.creator}
          number_of_runs={agent.runs}
          loading={addingAgent === agent.slug}
          onClick={() =>
            handleAddStoreAgent({
              creator_name: agent.creator,
              slug: agent.slug,
            })
          }
        />
      ))}
    </InfiniteScroll>
  );
};
