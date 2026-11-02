"use client";

import {
  File02Icon,
  Image01Icon,
  Table01Icon,
} from "@hugeicons/core-free-icons";
import { PanelEmptyState } from "@/app/(platform)/copilot/components/ContextPanel/components/PanelEmptyState/PanelEmptyState";
import type { WorkspaceFileItem } from "@/app/api/__generated__/models/workspaceFileItem";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { ExpertFileRow } from "../../ExpertFilesSection/ExpertFileRow";
import { CardError } from "./CardError";
import { OverviewCard } from "./OverviewCard";
import { useT } from "@/lib/i18n";

const VISIBLE_OUTPUTS = 5;

interface Props {
  expertName: string;
  outputs: WorkspaceFileItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => unknown;
}

export function LatestOutputs({
  expertName,
  outputs,
  isLoading,
  isError,
  onRetry,
}: Props) {
  const t = useT();

  return (
    <OverviewCard title={t("team6.latest.title")}>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ) : isError ? (
        <CardError
          message={t("team6.latest.error")}
          onRetry={onRetry}
        />
      ) : outputs.length === 0 ? (
        <PanelEmptyState
          textSize="body-md"
          tiles={[
            <Icon
              key="image"
              icon={Image01Icon}
              size={22}
              // TODO(tokens): no exact role: text-sky-500 #0EA5E9
              className="text-sky-500"
            />,
            <Icon
              key="table"
              icon={Table01Icon}
              size={22}
              // TODO(tokens): no exact role: text-emerald-500 #10B981
              className="text-emerald-500"
            />,
            <Icon
              key="doc"
              icon={File02Icon}
              size={22}
              // TODO(tokens): no exact role: text-violet-500 #8B5CF6
              className="text-violet-500"
            />,
          ]}
          title={t("team6.latest.emptyTitle")}
          description={t("team6.latest.emptyBody", { name: expertName })}
        />
      ) : (
        <ul className="-mx-2 flex flex-col">
          {outputs.slice(0, VISIBLE_OUTPUTS).map((file) => (
            <li key={file.id}>
              <ExpertFileRow file={file} />
            </li>
          ))}
        </ul>
      )}
    </OverviewCard>
  );
}
