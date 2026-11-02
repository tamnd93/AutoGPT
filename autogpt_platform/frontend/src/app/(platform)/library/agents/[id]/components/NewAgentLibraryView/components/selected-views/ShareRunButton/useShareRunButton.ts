import { useState, useEffect } from "react";
import {
  usePostV1EnableExecutionSharing,
  useDeleteV1DisableExecutionSharing,
} from "@/app/api/__generated__/endpoints/default/default";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { executionShareUrl } from "@/lib/share/routes";

interface UseShareRunButtonProps {
  graphId: string;
  executionId: string;
  isShared?: boolean;
  shareToken?: string | null;
}

export function useShareRunButton({
  graphId,
  executionId,
  isShared: initialIsShared = false,
  shareToken: initialShareToken,
}: UseShareRunButtonProps) {
  const [isShared, setIsShared] = useState(initialIsShared);
  const [shareToken, setShareToken] = useState(initialShareToken || null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const t = useT();

  // Sync state when props change (e.g., after re-fetching run data)
  useEffect(() => {
    setIsShared(initialIsShared);
    setShareToken(initialShareToken || null);
  }, [initialIsShared, initialShareToken]);

  const shareUrl = shareToken ? executionShareUrl(shareToken) : "";

  const { mutateAsync: enableSharing, isPending: isEnabling } =
    usePostV1EnableExecutionSharing();
  const { mutateAsync: disableSharing, isPending: isDisabling } =
    useDeleteV1DisableExecutionSharing();

  const loading = isEnabling || isDisabling;

  async function handleShare() {
    try {
      const response = await enableSharing({
        graphId,
        graphExecId: executionId,
        data: {}, // Empty ExecutionShareRequest
      });

      if (response.status === 200) {
        setShareToken(response.data.share_token);
        setIsShared(true);
        toast({
          title: t("library3.share.enabledTitle"),
          description: t("library3.share.enabledBody"),
        });
      } else {
        toast({
          title: t("library3.common.error"),
          description: t("library3.share.enableFailed"),
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: t("library3.common.error"),
        description: t("library3.share.enableFailed"),
        variant: "destructive",
      });
    }
  }

  async function handleStopSharing() {
    try {
      await disableSharing({
        graphId,
        graphExecId: executionId,
      });

      setIsShared(false);
      setShareToken(null);
      toast({
        title: t("library3.share.disabledTitle"),
        description: t("library3.share.disabledBody"),
      });
    } catch {
      toast({
        title: t("library3.common.error"),
        description: t("library3.share.disableFailed"),
        variant: "destructive",
      });
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: t("library3.share.copiedTitle"),
        description: t("library3.share.copiedBody"),
      });
    } catch {
      toast({
        title: t("library3.common.error"),
        description: t("library3.share.copyFailed"),
        variant: "destructive",
      });
    }
  }

  return {
    isShared,
    shareToken,
    shareUrl,
    copied,
    loading,
    handleShare,
    handleStopSharing,
    handleCopy,
  };
}
