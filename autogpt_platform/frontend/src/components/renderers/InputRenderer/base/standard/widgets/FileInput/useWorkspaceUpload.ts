import { useDeleteWorkspaceFile } from "@/app/api/__generated__/endpoints/workspace/workspace";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { uploadFileDirect } from "@/lib/direct-upload";
import { useT } from "@/lib/i18n";
import { parseWorkspaceFileID, buildWorkspaceURI } from "@/lib/workspace-uri";

export function useWorkspaceUpload() {
  const t = useT();
  const { toast } = useToast();

  const { mutate: deleteMutation } = useDeleteWorkspaceFile({
    mutation: {
      onError: () => {
        toast({
          title: t("shared5.upload.deleteFailedTitle"),
          description: t("shared5.upload.deleteFailedBody"),
          variant: "destructive",
        });
      },
    },
  });

  async function handleUploadFile(file: File) {
    const d = await uploadFileDirect(file);
    return {
      file_name: d.name,
      size: d.size_bytes,
      content_type: d.mime_type,
      file_uri: buildWorkspaceURI(d.file_id, d.mime_type),
    };
  }

  function handleDeleteFile(fileURI: string) {
    const fileID = parseWorkspaceFileID(fileURI);
    if (!fileID) return;
    deleteMutation({ fileId: fileID });
  }

  return { handleUploadFile, handleDeleteFile };
}
