import {
  getGetMyBusinessUnderstandingQueryKey,
  useForgetMyBusinessUnderstanding,
  useGetMyBusinessUnderstanding,
} from "@/app/api/__generated__/endpoints/memory/memory";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUnderstandingRows } from "./helpers";

export function useUnderstandingCard() {
  const t = useT();
  const queryClient = useQueryClient();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const query = useGetMyBusinessUnderstanding();
  const rows = getUnderstandingRows(
    query.data?.status === 200 ? query.data.data : undefined,
  );

  const forget = useForgetMyBusinessUnderstanding({
    mutation: {
      onSuccess() {
        setIsConfirmOpen(false);
        queryClient.invalidateQueries({
          queryKey: getGetMyBusinessUnderstandingQueryKey(),
        });
        toast({ title: t("settingsRest2.memory.understanding.forgotten") });
      },
      onError() {
        toast({
          title: t("errors5.understanding.errorTitle"),
          description: t("errors5.understanding.errorBody"),
          variant: "destructive",
        });
      },
    },
  });

  return {
    rows,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isConfirmOpen,
    setIsConfirmOpen,
    forget: () => forget.mutate(),
    isForgetting: forget.isPending,
  };
}
