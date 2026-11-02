import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export function getFileLabel(
  filename: string,
  contentType?: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  if (contentType) {
    const mimeParts = contentType.split("/");
    if (mimeParts.length > 1) {
      return getMessage(locale, "shared1.fileInput.subtypeFile", {
        type: mimeParts[1].toUpperCase(),
      });
    }
    return getMessage(locale, "shared1.fileInput.subtypeFile", {
      type: contentType,
    });
  }

  const pathParts = filename.split(".");
  if (pathParts.length > 1) {
    const ext = pathParts.pop();
    if (ext)
      return getMessage(locale, "shared1.fileInput.subtypeFile", {
        type: ext.toUpperCase(),
      });
  }
  return getMessage(locale, "shared1.fileInput.file");
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${bytes} B`;
  }
}
