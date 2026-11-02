"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Alert, AlertDescription } from "@/components/molecules/Alert/Alert";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useShareRunButton } from "./useShareRunButton";
import {
  Alert01Icon,
  Copy01Icon,
  Share08Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  graphId: string;
  executionId: string;
  isShared?: boolean;
  shareToken?: string | null;
}

export function ShareRunButton({
  graphId,
  executionId,
  isShared: initialIsShared = false,
  shareToken: initialShareToken,
}: Props) {
  const {
    isShared,
    shareUrl,
    copied,
    loading,
    handleShare,
    handleStopSharing,
    handleCopy,
  } = useShareRunButton({
    graphId,
    executionId,
    isShared: initialIsShared,
    shareToken: initialShareToken,
  });
  const t = useT();

  return (
    <Dialog
      title={t("library3.share.title")}
      styling={{ maxWidth: "36rem", minWidth: "auto" }}
    >
      <Dialog.Trigger>
        <Button
          variant="icon"
          size="icon"
          aria-label={t("library3.share.aria")}
          className={isShared ? "relative" : ""}
        >
          <Icon icon={Share08Icon} size={18} className="text-foreground-body" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="large">
            {isShared
              ? t("library3.share.sharedBody")
              : t("library3.share.generateBody")}
          </Text>

          {!isShared ? (
            <>
              <div className="!mb-4">
                <Alert>
                  <Icon icon={Alert01Icon} className="h-4 w-4" />
                  <Text variant="body">{t("library3.share.warning")}</Text>
                </Alert>
              </div>
              <Button
                onClick={handleShare}
                loading={loading}
                className="mt-6 w-full"
              >
                {t("library3.share.enable")}
              </Button>
            </>
          ) : (
            <>
              <div className="flex w-full items-center gap-4">
                <Input
                  type="text"
                  value={shareUrl}
                  readOnly
                  label={t("library3.share.url")}
                  id="share-url"
                  size="small"
                  className="!m-0"
                  wrapperClassName="flex-1"
                />
                <Button
                  variant="secondary"
                  onClick={handleCopy}
                  size="small"
                  className="mt-0.5 !min-w-0"
                >
                  {copied ? (
                    <Icon icon={Tick02Icon} size={16} />
                  ) : (
                    <Icon icon={Copy01Icon} size={16} />
                  )}
                </Button>
              </div>
              <Alert>
                <Icon icon={Alert01Icon} className="h-4 w-4" />
                <AlertDescription>
                  {t("library3.share.publicNote")}
                </AlertDescription>
              </Alert>
              <Button
                onClick={handleStopSharing}
                loading={loading}
                variant="destructive"
                className="mt-6 w-full"
              >
                {t("library3.share.stop")}
              </Button>
            </>
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
