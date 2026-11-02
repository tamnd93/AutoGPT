import { useToast } from "@/components/molecules/Toast/use-toast";
import { uploadFileDirect } from "@/lib/direct-upload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchWorkflowFromUrl } from "./fetchWorkflowFromUrl";
import { useT } from "@/lib/i18n";

function decodeBase64Json(dataUrl: string, message: string): string {
  const match = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
  if (!match) throw new Error(message);
  const binary = atob(match[1]);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const json = new TextDecoder().decode(bytes);
  JSON.parse(json); // validate — throws SyntaxError if invalid
  return json;
}

async function uploadJsonAsFile(
  jsonString: string,
): Promise<{ fileId: string; fileName: string; mimeType: string }> {
  const file = new File(
    [new Blob([jsonString], { type: "application/json" })],
    `workflow-${crypto.randomUUID()}.json`,
    { type: "application/json" },
  );
  const uploaded = await uploadFileDirect(file);
  return {
    fileId: uploaded.file_id,
    fileName: uploaded.name,
    mimeType: uploaded.mime_type,
  };
}

function storeAndRedirect(
  fileInfo: { fileId: string; fileName: string; mimeType: string },
  router: ReturnType<typeof useRouter>,
  prompt: string,
) {
  sessionStorage.setItem("importWorkflowPrompt", prompt);
  sessionStorage.setItem("importWorkflowFile", JSON.stringify(fileInfo));
  router.push("/copilot?source=import&autosubmit=true");
}

export function useExternalWorkflowTab() {
  const t = useT();
  const { toast } = useToast();
  const router = useRouter();
  const [fileValue, setFileValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [submittingMode, setSubmittingMode] = useState<"url" | "file" | null>(
    null,
  );
  const isSubmitting = submittingMode !== null;

  async function submitWithMode(mode: "url" | "file") {
    setSubmittingMode(mode);
    try {
      const jsonString = await resolveJson(mode);
      if (!jsonString) return;
      storeAndRedirect(
        await uploadJsonAsFile(jsonString),
        router,
        t("library5.external.promptImport"),
      );
    } catch (err) {
      toast({
        title: t("library5.external.uploadFailed"),
        description:
          err instanceof Error
            ? err.message
            : t("library5.external.couldNotUpload"),
        variant: "destructive",
      });
    } finally {
      setSubmittingMode(null);
    }
  }

  async function resolveJson(mode: "url" | "file"): Promise<string | null> {
    if (mode === "url") {
      const result = await fetchWorkflowFromUrl(urlValue);
      if (!result.ok) {
        toast({
          title: t("library5.external.couldNotFetch"),
          description: result.error,
          variant: "destructive",
        });
        return null;
      }
      setUrlValue("");
      return result.json;
    }

    try {
      const json = decodeBase64Json(
        fileValue,
        t("library5.external.couldNotRead"),
      );
      setFileValue("");
      return json;
    } catch (err) {
      const isParseError = err instanceof SyntaxError;
      toast({
        title: isParseError
          ? t("library5.external.invalidJson")
          : t("library5.external.invalidFile"),
        description: isParseError
          ? t("library5.external.invalidJsonBody")
          : t("library5.external.couldNotRead"),
        variant: "destructive",
      });
      return null;
    }
  }

  return {
    submitWithMode,
    fileValue,
    setFileValue,
    urlValue,
    setUrlValue,
    isSubmitting,
    submittingMode,
  };
}
