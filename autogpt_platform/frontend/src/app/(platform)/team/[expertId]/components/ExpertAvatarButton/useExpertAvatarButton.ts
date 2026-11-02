import {
  getGetExpertQueryKey,
  getListExpertsQueryKey,
  getListExpertIdentitiesQueryKey,
  useUpdateExpertAvatar,
} from "@/app/api/__generated__/endpoints/experts/experts";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useT } from "@/lib/i18n";

export function useExpertAvatarButton(expertId: string) {
  const t = useT();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: updateAvatar, isPending } = useUpdateExpertAvatar();

  async function saveAvatar(url: string) {
    try {
      await updateAvatar({ expertId, data: { avatar_url: url } });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getGetExpertQueryKey(expertId),
        }),
        queryClient.invalidateQueries({ queryKey: getListExpertsQueryKey() }),
        queryClient.invalidateQueries({
          queryKey: getListExpertIdentitiesQueryKey(),
        }),
      ]);
      setIsOpen(false);
      toast({ title: t("team2.avatar.updated"), variant: "success" });
    } catch {
      toast({
        title: t("team2.avatar.failed"),
        description: t("team2.avatar.failedBody"),
        variant: "destructive",
      });
    }
  }

  return { isOpen, setIsOpen, saveAvatar, isPending };
}
