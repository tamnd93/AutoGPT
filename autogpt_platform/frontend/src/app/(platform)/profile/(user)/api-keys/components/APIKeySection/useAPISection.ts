"use client";
import {
  getGetV1ListUserApiKeysQueryKey,
  useDeleteV1RevokeApiKey,
  useGetV1ListUserApiKeys,
} from "@/app/api/__generated__/endpoints/api-keys/api-keys";
import { okData } from "@/app/api/helpers";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { getQueryClient } from "@/lib/react-query/queryClient";

export const useAPISection = () => {
  const t = useT();
  const queryClient = getQueryClient();
  const { toast } = useToast();

  const { data: apiKeys, isLoading } = useGetV1ListUserApiKeys({
    query: {
      select: (res) => okData(res)?.filter((key) => key.status === "ACTIVE"),
    },
  });

  const { mutateAsync: revokeAPIKey, isPending: isDeleting } =
    useDeleteV1RevokeApiKey({
      mutation: {
        onSettled: () => {
          return queryClient.invalidateQueries({
            queryKey: getGetV1ListUserApiKeysQueryKey(),
          });
        },
      },
    });

  const handleRevokeKey = async (keyId: string) => {
    try {
      await revokeAPIKey({
        keyId: keyId,
      });

      toast({
        title: t("profile1.common.success"),
        description: t("profile1.apiKeys.toast.revoked"),
      });
    } catch {
      toast({
        title: t("profile1.common.error"),
        description: t("profile1.apiKeys.toast.revokeFailed"),
        variant: "destructive",
      });
    }
  };

  return {
    apiKeys,
    isLoading,
    isDeleting,
    handleRevokeKey,
  };
};
