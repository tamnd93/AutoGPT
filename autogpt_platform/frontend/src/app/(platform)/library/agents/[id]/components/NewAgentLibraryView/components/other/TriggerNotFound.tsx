"use client";

import type { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { RunDetailCard } from "../selected-views/RunDetailCard/RunDetailCard";
import { SelectedViewLayout } from "../selected-views/SelectedViewLayout";

interface Props {
  agent: LibraryAgent;
  banner?: React.ReactNode;
  onClearSelection?: () => void;
}

export function TriggerNotFound({ agent, banner, onClearSelection }: Props) {
  const t = useT();

  return (
    <SelectedViewLayout agent={agent} banner={banner}>
      <RunDetailCard title={t("library2.triggerNotFound.title")}>
        <div className="flex flex-col items-start gap-4">
          <Text variant="body" className="!text-foreground-tertiary">
            {t("library2.triggerNotFound.body")}
          </Text>
          {onClearSelection && (
            <Button variant="secondary" size="small" onClick={onClearSelection}>
              {t("library2.triggerNotFound.clearSelection")}
            </Button>
          )}
        </div>
      </RunDetailCard>
    </SelectedViewLayout>
  );
}
