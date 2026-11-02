"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Alert02Icon } from "@hugeicons/core-free-icons";
import { AttentionCard } from "@/components/organisms/AttentionCard/AttentionCard";

interface Props {
  className?: string;
}

/** Why Send at reset is off while files are attached: a message set for the
 *  reset carries text only. */
export function AtResetFilesNotice({ className }: Props) {
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
          <span>{t("chatInput1.atReset.filesOnlyText")}</span>
        </AttentionCard.Content>
      </AttentionCard.Row>
    </AttentionCard.Root>
  );
}
