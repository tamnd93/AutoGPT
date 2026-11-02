import {
  getGetV2ListLibraryAgentsQueryKey,
  usePostV2AddMarketplaceAgent,
} from "@/app/api/__generated__/endpoints/library/library";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { useGetV2DownloadAgentFile } from "@/app/api/__generated__/endpoints/store/store";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { agentGraphExportFilename, exportAsJSONFile } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useT } from "@/lib/i18n";

interface UseAgentInfoProps {
  storeListingVersionId: string;
}

export const useAgentInfo = ({ storeListingVersionId }: UseAgentInfoProps) => {
  const { toast } = useToast();
  const t = useT();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutateAsync: addMarketplaceAgentToLibrary,
    isPending: isAddingAgentToLibrary,
  } = usePostV2AddMarketplaceAgent();

  const { refetch: downloadAgent, isFetching: isDownloadingAgent } =
    useGetV2DownloadAgentFile(storeListingVersionId, {
      query: {
        enabled: false,
        select: (data) => {
          return data.data;
        },
      },
    });

  const handleLibraryAction = async ({
    isAddingAgentFirstTime,
  }: {
    isAddingAgentFirstTime: boolean;
  }) => {
    try {
      const { data: response } = await addMarketplaceAgentToLibrary({
        data: { store_listing_version_id: storeListingVersionId },
      });

      const data = response as LibraryAgent;

      if (isAddingAgentFirstTime) {
        await queryClient.invalidateQueries({
          queryKey: getGetV2ListLibraryAgentsQueryKey(),
        });
      }

      router.push(`/library/agents/${data.id}`);

      toast({
        title: t("marketplace1.agentInfo.addedTitle"),
        description: t("marketplace1.agentInfo.addedRedirect"),
        duration: 2000,
      });
    } catch (error) {
      Sentry.captureException(error);

      toast({
        title: t("marketplace1.addToLibrary.error"),
        description: t("marketplace1.addToLibrary.addFailed"),
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (agentName: string) => {
    try {
      const { data: file } = await downloadAgent();

      exportAsJSONFile(
        file as object,
        agentGraphExportFilename(file, agentName),
      );

      toast({
        title: t("marketplace1.agentInfo.downloadComplete"),
        description: t("marketplace1.agentInfo.downloadSuccess"),
      });
    } catch (error) {
      Sentry.captureException(error);
      toast({
        title: t("marketplace1.addToLibrary.error"),
        description: t("marketplace1.agentInfo.downloadFailed"),
        variant: "destructive",
      });
    }
  };

  return {
    isAddingAgentToLibrary,
    handleLibraryAction,
    handleDownload,
    isDownloadingAgent,
  };
};
