import {
  getGetV2GetExpertComputerQueryKey,
  useGetV2GetExpertComputer,
  usePostV2StartExpertDesktop,
} from "@/app/api/__generated__/endpoints/experts/experts";
import type { DesktopStream } from "@/app/api/__generated__/models/desktopStream";
import { okData } from "@/app/api/helpers";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useT } from "@/lib/i18n";

interface Args {
  expertId: string;
}

export function useExpertComputerSection({ expertId }: Args) {
  const t = useT();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // Kept with the expert it was opened for: the section can be re-rendered
  // for another expert, whose page must not show this one's desktop.
  const [opened, setOpened] = useState<{
    expertId: string;
    stream: DesktopStream;
  } | null>(null);
  const stream = opened?.expertId === expertId ? opened.stream : null;

  const computerQuery = useGetV2GetExpertComputer(expertId, {
    query: {
      select: (res) => okData(res) ?? null,
      refetchInterval: 15_000,
    },
  });

  const { mutate: startDesktop, isPending: isOpening } =
    usePostV2StartExpertDesktop({
      mutation: {
        onSuccess: (res, variables) => {
          const next = okData(res);
          if (next) setOpened({ expertId: variables.expertId, stream: next });
          queryClient.invalidateQueries({
            queryKey: getGetV2GetExpertComputerQueryKey(expertId),
          });
        },
        onError: () => {
          toast({
            title: t("team2.computer.openFailedTitle"),
            description: t("team2.computer.openFailedBody"),
            variant: "destructive",
          });
        },
      },
    });

  function openDesktop() {
    startDesktop({ expertId });
  }

  return {
    computer: computerQuery.data ?? null,
    isLoading: computerQuery.isLoading,
    isError: computerQuery.isError,
    refetch: () => computerQuery.refetch(),
    stream,
    openDesktop,
    isOpening,
  };
}
