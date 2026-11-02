"use client";

import Link from "next/link";
import { Alert02Icon } from "@hugeicons/core-free-icons";

import { Icon } from "@/components/atoms/Icon/Icon";
import { AttentionCard } from "@/components/organisms/AttentionCard/AttentionCard";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SELF_HOSTED_MODELS_DOCS_URL } from "@/app/(platform)/copilot/helpers/reportedSendError";
import { useNoAIConnectionNotice } from "./useNoAIConnectionNotice";

interface Props {
  enabled: boolean;
  className?: string;
}

// Stays above the composer for as long as nothing can answer, so the fix is
// still on screen after any toast about a failed send has gone.
export function NoAIConnectionNotice({ enabled, className }: Props) {
  const t = useT();
  const { hasNoConnection } = useNoAIConnectionNotice(enabled);
  if (!hasNoConnection) return null;

  return (
    <AttentionCard.Root
      variant="warning-strong"
      density="snug"
      role="status"
      aria-label={t("chatInput2.noConnection.aria")}
      className={cn("mb-2 w-full", className)}
    >
      <AttentionCard.Row align="start">
        <AttentionCard.Icon nudge>
          <Icon icon={Alert02Icon} className="h-4 w-4" aria-hidden />
        </AttentionCard.Icon>
        <AttentionCard.Content asChild>
          <span>
            {t("chatInput2.noConnection.before")}{" "}
            <a
              href={SELF_HOSTED_MODELS_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              {t("chatInput2.noConnection.setupGuide")}
            </a>
            {t("chatInput2.noConnection.middle")}{" "}
            <Link
              href="/settings/integrations"
              className="font-medium underline underline-offset-2"
            >
              {t("chatInput2.noConnection.integrationsLink")}
            </Link>
            {t("chatInput2.noConnection.after")}
          </span>
        </AttentionCard.Content>
      </AttentionCard.Row>
    </AttentionCard.Root>
  );
}
