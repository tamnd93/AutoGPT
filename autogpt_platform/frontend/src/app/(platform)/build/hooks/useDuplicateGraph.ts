import {
  useGetV2GetLibraryAgentByGraphId,
  usePostV2ForkLibraryAgent,
} from "@/app/api/__generated__/endpoints/library/library";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { useT } from "@/lib/i18n";

export function useDuplicateGraph() {
  const t = useT();
  const router = useRouter();
  const { toast } = useToast();

  const [{ flowID }] = useQueryStates({
    flowID: parseAsString,
  });

  const { data: libraryAgent, isLoading: isCheckingLibrary } =
    useGetV2GetLibraryAgentByGraphId(
      flowID ?? "",
      {},
      {
        query: {
          select: (res) => res.data as LibraryAgent,
          enabled: !!flowID,
        },
      },
    );

  const { mutateAsync: forkAgent, isPending: isDuplicating } =
    usePostV2ForkLibraryAgent();

  async function duplicate() {
    if (!libraryAgent) return;

    try {
      const result = await forkAgent({ libraryAgentId: libraryAgent.id });
      const forked = result.data as LibraryAgent;
      if (!forked?.graph_id) {
        throw new Error(t("build5.duplicate.forkError"));
      }
      router.push(`/build?flowID=${forked.graph_id}`);
    } catch (error) {
      toast({
        title: t("build5.duplicate.failedTitle"),
        description:
          error instanceof Error
            ? error.message
            : t("build5.loadError.unexpected"),
        variant: "destructive",
      });
    }
  }

  return {
    duplicate,
    isDuplicating,
    canDuplicate: !!libraryAgent,
    isCheckingLibrary,
  };
}
