"use client";

import {
  File02Icon,
  Folder01Icon,
  Image01Icon,
  SparklesIcon,
  Table01Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { PillFilterMenu } from "../../../components/PillFilterMenu";
import { SectionEmptyState } from "../../../components/SectionEmptyState";
import { ToolbarSearch } from "../../../components/ToolbarSearch";
import { ExpertFileRow } from "./ExpertFileRow";
import { useExpertFilesSection } from "./useExpertFilesSection";
import { useT } from "@/lib/i18n";

interface Props {
  expertId: string;
  expertName: string;
}

/** Everything in the expert's chats: what it made and what you gave it. */
export function ExpertFilesSection({ expertId, expertName }: Props) {
  const t = useT();
  const filters = [
    { value: "all", label: t("team2.files.filterAll"), icon: Folder01Icon },
    { value: "generated", label: t("team2.files.created"), icon: SparklesIcon },
    { value: "uploaded", label: t("team2.files.uploaded"), icon: Upload04Icon },
  ] as const;
  const files = useExpertFilesSection(expertId);

  return (
    <section>
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
        <Text variant="large-medium" tone="primary">
          {t("team2.files.title", { name: expertName })}
        </Text>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <ToolbarSearch
            textSize="body-md"
            id="expert-files-search"
            label={t("team2.files.search")}
            value={files.query}
            onChange={files.setQuery}
          />
          <PillFilterMenu
            textSize="body-md"
            label={t("team2.files.filter")}
            value={files.filter}
            defaultValue="all"
            options={filters}
            onChange={files.setFilter}
          />
        </div>
      </div>

      {files.isLoading ? (
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      ) : files.isError ? (
        <ErrorCard
          textSize="body-md"
          context={t("team2.files.errorContext", { name: expertName })}
          hint={t("team2.files.errorHint")}
          onRetry={() => files.refetch()}
        />
      ) : files.files.length === 0 ? (
        <SectionEmptyState
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
          title={t("team2.files.emptyTitle")}
          description={t("team2.files.emptyBody", { name: expertName })}
        />
      ) : files.visible.length === 0 ? (
        <Text variant="body-md" tone="muted" className="pt-4">
          {t("team2.files.noMatch")}
        </Text>
      ) : (
        <div className="mt-4 rounded-2xl bg-surface p-2 smooth-shadow-ring-sm">
          <ul
            aria-label={t("team2.files.listAria", { name: expertName })}
            className="flex flex-col"
          >
            {files.visible.map((file) => (
              <li key={file.id}>
                <ExpertFileRow file={file} />
              </li>
            ))}
          </ul>
          {files.hasMore ? (
            <Text
              variant="small"
              className="px-2 pb-1 pt-2 !text-foreground-tertiary"
            >
              {t("team2.files.showingLatest")}
            </Text>
          ) : null}
        </div>
      )}
    </section>
  );
}
