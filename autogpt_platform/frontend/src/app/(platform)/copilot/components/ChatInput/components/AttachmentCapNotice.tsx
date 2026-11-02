"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { MAX_ATTACHMENTS } from "../../../helpers/workspaceAttachments";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Alert02Icon } from "@hugeicons/core-free-icons";
import { AttentionCard } from "@/components/organisms/AttentionCard/AttentionCard";

interface Props {
  /** How many attachments the cap turned away on the last attach. */
  refusedCount: number;
  onDismiss: () => void;
  className?: string;
}

/**
 * Says what the cap refused, in the composer, so the draft the user is typing
 * is never interrupted and never outlived by a toast.
 */
export function AttachmentCapNotice({
  refusedCount,
  onDismiss,
  className,
}: Props) {
  const t = useT();

  return (
    <AttentionCard.Root
      variant="warning"
      density="compact"
      role="status"
      className={cn("w-full", className)}
    >
      <AttentionCard.Row align="center">
        <AttentionCard.Icon>
          <Icon icon={Alert02Icon} className="h-4 w-4" aria-hidden />
        </AttentionCard.Icon>
        <AttentionCard.Content asChild>
          <span>
            {t("chatInput1.attach.limit", {
              max: MAX_ATTACHMENTS,
              refused: refusedCount,
            })}
          </span>
        </AttentionCard.Content>
        <AttentionCard.Dismiss
          aria-label={t("chatInput1.attach.limitDismiss")}
          onClick={onDismiss}
        />
      </AttentionCard.Row>
    </AttentionCard.Root>
  );
}
