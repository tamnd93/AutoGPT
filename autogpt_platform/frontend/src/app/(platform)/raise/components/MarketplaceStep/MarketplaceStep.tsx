"use client";

import { useT } from "@/lib/i18n";
import type { RaiseAttachmentDraft } from "../../helpers";
import { AttachmentStep } from "../KitStep/AttachmentStep";

interface Props {
  name: string;
  color: string | null;
  submitted: RaiseAttachmentDraft[] | null;
  isFinal: boolean;
  isSubmitting: boolean;
  onSubmit: (attachments: RaiseAttachmentDraft[]) => void;
  onSkip: () => void;
}

export function MarketplaceStep({
  name,
  color,
  submitted,
  isFinal,
  isSubmitting,
  onSubmit,
  onSkip,
}: Props) {
  const t = useT();
  return (
    <AttachmentStep
      color={color}
      submitted={submitted}
      isSubmitting={isSubmitting}
      scope="marketplace"
      searchLabel={t("team1.marketplace.searchLabel")}
      searchPlaceholder={t("team1.marketplace.searchPlaceholder")}
      emptyQueryHint={t("team1.marketplace.emptyQuery")}
      emptyResultsHint={t("team1.marketplace.emptyResults")}
      primaryLabel={
        isFinal
          ? t("team1.common.bringToLife", {
              name: name || t("team1.common.them"),
            })
          : t("team1.common.thatsIt")
      }
      onSubmit={onSubmit}
      onSkip={onSkip}
    />
  );
}
