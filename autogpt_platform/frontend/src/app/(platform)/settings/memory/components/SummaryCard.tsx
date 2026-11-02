"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

interface Props {
  scopeExpertID: string | null;
  scopeName: string;
  onViewSummary: () => void;
}

export function SummaryCard({
  scopeExpertID,
  scopeName,
  onViewSummary,
}: Props) {
  const t = useT();
  const isAutoPilot = scopeExpertID === null;
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-border-base bg-surface px-4 py-4 shadow-[0_1px_2px_rgba(15,15,20,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col">
        <Text variant="body-medium" as="span" className="text-textBlack">
          {t("settingsRest2.memory.summary.title")}
        </Text>
        <Text variant="small" as="span" className="text-foreground-tertiary">
          {isAutoPilot
            ? t("settingsRest2.memory.summary.bodyAutopilot")
            : t("settingsRest2.memory.summary.bodyExpert", {
                name: scopeName,
              })}
        </Text>
      </div>
      <Button variant="primary" size="small" onClick={onViewSummary}>
        {isAutoPilot
          ? t("settingsRest2.memory.summary.viewMine")
          : t("settingsRest2.memory.summary.viewExpert", {
              name: scopeName,
            })}
      </Button>
    </div>
  );
}
