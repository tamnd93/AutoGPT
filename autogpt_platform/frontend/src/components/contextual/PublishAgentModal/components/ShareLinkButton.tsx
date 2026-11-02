"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { toast } from "@/components/molecules/Toast/use-toast";
import { Link01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  url: string;
}

export function ShareLinkButton({ url }: Props) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const shareUrl =
      typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: t("marketplace4.share.copiedToast") });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: t("marketplace4.share.copyFailedToast"),
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      variant="ghost"
      size="small"
      onClick={handleCopy}
      leftIcon={
        copied ? (
          <Icon icon={Tick02Icon} size={14} />
        ) : (
          <Icon icon={Link01Icon} size={14} />
        )
      }
      className="w-full sm:w-auto"
      data-testid="copy-share-link-button"
    >
      {copied
        ? t("marketplace4.share.copiedLabel")
        : t("marketplace4.share.copy")}
    </Button>
  );
}
