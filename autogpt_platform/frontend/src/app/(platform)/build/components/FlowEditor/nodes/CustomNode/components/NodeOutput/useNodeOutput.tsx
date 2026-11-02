import { useNodeStore } from "@/app/(platform)/build/stores/nodeStore";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { useT } from "@/lib/i18n";

export const useNodeOutput = (nodeId: string) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();
  const t = useT();

  const latestResult = useNodeStore(
    useShallow((state) => state.getLatestNodeExecutionResult(nodeId)),
  );

  const latestInputData = useNodeStore(
    useShallow((state) => state.getLatestNodeInputData(nodeId)),
  );

  const latestOutputData: Record<string, Array<any>> = useNodeStore(
    useShallow((state) => state.getLatestNodeOutputData(nodeId) || {}),
  );

  const handleCopy = async (key: string, value: any) => {
    try {
      const text = JSON.stringify(value, null, 2);
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast({
        title: t("build2.nodeOutput.copied"),
        duration: 2000,
      });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: t("build2.nodeOutput.copyFailed"),
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return {
    latestOutputData,
    latestInputData,
    copiedKey,
    handleCopy,
    executionResultId: latestResult?.node_exec_id,
  };
};
