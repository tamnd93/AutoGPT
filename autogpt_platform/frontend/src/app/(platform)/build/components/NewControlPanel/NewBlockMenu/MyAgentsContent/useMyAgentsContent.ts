import { getPaginationNextPageNumber, unpaginate } from "@/app/api/helpers";
import { useGetV2ListLibraryAgentsInfinite } from "@/app/api/__generated__/endpoints/library/library";
import { useState } from "react";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { useAddAgentToBuilder } from "../hooks/useAddAgentToBuilder";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";

export const useMyAgentsContent = () => {
  const t = useT();
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isGettingAgentDetails, setIsGettingAgentDetails] = useState(false);
  const { addLibraryAgentToBuilder } = useAddAgentToBuilder();
  const { toast } = useToast();

  const {
    data: agentsQueryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading: agentLoading,
    refetch,
    error,
  } = useGetV2ListLibraryAgentsInfinite(
    {
      page: 1,
      page_size: 10,
      is_hidden: false,
    },
    {
      query: { getNextPageParam: getPaginationNextPageNumber },
    },
  );

  const allAgents = agentsQueryData
    ? unpaginate(agentsQueryData, "agents")
    : [];
  const status = agentsQueryData?.pages[0]?.status;

  const handleAddBlock = async (agent: LibraryAgent) => {
    setSelectedAgentId(agent.id);
    setIsGettingAgentDetails(true);

    try {
      await addLibraryAgentToBuilder(agent);
    } catch (error) {
      toast({
        title: t("build5.myAgents.failedAddTitle"),
        description:
          ((error as any).message as string) ||
          t("build5.loadError.unexpected"),
        variant: "destructive",
      });
    } finally {
      setSelectedAgentId(null);
      setIsGettingAgentDetails(false);
    }
  };

  return {
    allAgents,
    agentLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    refetch,
    error,
    status,
    handleAddBlock,
    isGettingAgentDetails,
    selectedAgentId,
  };
};
