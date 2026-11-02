import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

type Props = {
  reason?: string;
  onRetry: () => void;
};

export function SharedChatErrorState({ onRetry }: Props) {
  const t = useT();

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <div className="mx-auto w-full max-w-md p-6">
        <div className="space-y-4 rounded-lg border border-dashed border-border-strong p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-hover">
            <Icon
              icon={InformationCircleIcon}
              size={24}
              className="text-foreground-tertiary"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {t("sharing1.shareError.title")}
            </h3>
            <p className="text-sm text-foreground-tertiary">
              {t("sharing1.shareError.body")}
            </p>
          </div>
          <button
            onClick={onRetry}
            className="text-sm text-foreground-body underline hover:text-foreground-strong"
          >
            {t("sharing1.shareError.retry")}
          </button>
        </div>
        <p className="mt-8 text-center text-xs text-foreground-subtle">
          {t("sharing1.shareError.poweredBy")}
        </p>
      </div>
    </div>
  );
}
