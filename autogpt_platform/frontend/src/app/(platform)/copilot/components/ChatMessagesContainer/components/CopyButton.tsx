"use client";

import { credentialMentionDisplayText } from "../../CredentialMention/helpers";
import { MessageAction } from "@/components/organisms/Message/Message";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useState } from "react";
import { Copy02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  text: string;
}

export function CopyButton({ text }: Props) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  if (!text.trim()) return null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(credentialMentionDisplayText(text));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: t("chatRuntime1.copyButton.failedTitle"),
        description: t("chatRuntime1.copyButton.failedDescription"),
        variant: "destructive",
      });
    }
  }

  return (
    <MessageAction
      tooltip={
        copied
          ? t("chatRuntime1.copyButton.copied")
          : t("chatRuntime1.copyButton.copy")
      }
      onClick={handleCopy}
      variant="ghost"
      size="icon-sm"
    >
      {copied ? (
        <Icon icon={Tick02Icon} size={16} />
      ) : (
        <Icon icon={Copy02Icon} size={16} />
      )}
    </MessageAction>
  );
}
