import { Icon } from "@/components/atoms/Icon/Icon";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/i18n";

interface Props {
  name: string;
  downloadUrl: string;
  message?: string;
}

export function DownloadOnly({ name, downloadUrl, message }: Props) {
  const t = useT();
  const copy = message ?? t("artifacts2.downloadOnly.message");
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <p className="text-sm text-foreground-tertiary">{copy}</p>
      <a
        href={downloadUrl}
        download={name}
        className="inline-flex items-center gap-1.5 rounded-md border border-border-base bg-surface px-3 py-1.5 text-sm font-medium text-foreground-body transition-colors hover:bg-surface-muted"
      >
        <Icon icon={Download04Icon} size={16} />
        {t("artifacts2.downloadOnly.download")}
      </a>
    </div>
  );
}
