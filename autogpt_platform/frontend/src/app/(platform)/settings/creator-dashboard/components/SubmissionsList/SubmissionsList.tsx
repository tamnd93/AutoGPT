"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Pagination as PaginationModel } from "@/app/api/__generated__/models/pagination";
import type { StoreSubmission } from "@/app/api/__generated__/models/storeSubmission";
import type { StoreSubmissionEditRequest } from "@/app/api/__generated__/models/storeSubmissionEditRequest";
import type { SubmissionStatus } from "@/app/api/__generated__/models/submissionStatus";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { SearchInput } from "@/components/molecules/SearchInput/SearchInput";
import { useT } from "@/lib/i18n";

import {
  EASE_OUT,
  type FilterState,
  type SortDir,
  type SortKey,
} from "../../helpers";
import { Pagination } from "../Pagination/Pagination";
import { SubmissionItem } from "../SubmissionItem/SubmissionItem";
import { ColumnHeader } from "./columns/ColumnHeader";
import { SortColumnFilter } from "./columns/SortColumnFilter";
import { StatusColumnFilter } from "./columns/StatusColumnFilter";

interface EditPayload extends StoreSubmissionEditRequest {
  store_listing_version_id: string;
  graph_id: string;
}

interface Props {
  submissions: StoreSubmission[];
  totalCount: number;
  pagination?: PaginationModel;
  onPageChange?: (page: number) => void;
  isFetching?: boolean;
  filterState: FilterState;
  onFilterChange: (next: FilterState) => void;
  onResetFilters: () => void;
  searchInput: string;
  onSearchChange: (next: string) => void;
  debouncedSearch: string;
  onView: (submission: StoreSubmission) => void;
  onEdit: (payload: EditPayload) => void;
  onDelete: (submissionId: string) => Promise<void>;
  creatorUsername?: string;
  index?: number;
}

const COLUMN_COUNT = 5;

export function SubmissionsList({
  submissions,
  totalCount,
  pagination,
  onPageChange,
  isFetching,
  filterState,
  onFilterChange,
  onResetFilters,
  searchInput,
  onSearchChange,
  debouncedSearch,
  onView,
  onEdit,
  onDelete,
  creatorUsername,
  index = 0,
}: Props) {
  const t = useT();
  const reduceMotion = useReducedMotion();

  function setStatuses(statuses: SubmissionStatus[]) {
    onFilterChange({ ...filterState, statuses });
  }

  function setSort(sortKey: SortKey | null, sortDir: SortDir) {
    onFilterChange({ ...filterState, sortKey, sortDir });
  }

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 0.28, ease: EASE_OUT, delay: 0.04 + index * 0.05 }
      }
      className="flex w-full flex-col gap-3"
      data-testid="submissions-list"
    >
      <div className="flex items-center justify-between pl-4 pr-1">
        <div className="flex items-center gap-2">
          <Text variant="body-medium" as="span" className="text-textBlack">
            {t("settingsRest2.list.title")}
          </Text>
        </div>
        <Text variant="small" className="text-foreground-tertiary">
          {t("settingsRest2.list.count", {
            count: submissions.length,
            total: totalCount,
          })}
        </Text>
      </div>

      <div className="pr-1 sm:max-w-md">
        <SearchInput
          value={searchInput}
          onChange={onSearchChange}
          placeholder={t("settingsRest2.list.searchPlaceholder")}
          aria-label={t("settingsRest2.list.searchAria")}
          maxLength={100}
          loading={isFetching}
          size="medium"
        />
      </div>

      <div className="overflow-hidden rounded-[18px] border border-border-base bg-surface shadow-[0_1px_2px_rgba(15,15,20,0.04)]">
        <div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-separator bg-surface-muted/60">
                label={t("settingsRest2.list.workflow")}
                <ColumnHeader
                  label={t("settingsRest2.list.status")}
                  width="140px"
                  filter={
                    <StatusColumnFilter
                      value={filterState.statuses}
                      onChange={setStatuses}
                    />
                  }
                />
                <ColumnHeader
                  label={t("settingsRest2.list.submitted")}
                  width="160px"
                  filter={
                    <SortColumnFilter
                      sortKey="submitted"
                      activeKey={filterState.sortKey}
                      activeDir={filterState.sortDir}
                      onChange={setSort}
                      ascLabel={t("settingsRest2.list.sortSubmittedAsc")}
                      descLabel={t("settingsRest2.list.sortSubmittedDesc")}
                    />
                  }
                />
                <ColumnHeader
                  label={t("settingsRest2.list.runsColumn")}
                  align="right"
                  width="110px"
                  filter={
                    <SortColumnFilter
                      sortKey="runs"
                      activeKey={filterState.sortKey}
                      activeDir={filterState.sortDir}
                      onChange={setSort}
                      ascLabel={t("settingsRest2.list.sortRunsAsc")}
                      descLabel={t("settingsRest2.list.sortRunsDesc")}
                    />
                  }
                />
                <th
                  scope="col"
                  className="w-[60px] px-2 py-3"
                  aria-label={t("settingsRest2.list.actions")}
                />
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? (
                submissions.map((submission, rowIndex) => (
                  <SubmissionItem
                    key={submission.listing_version_id}
                    submission={submission}
                    rowIndex={rowIndex}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    creatorUsername={creatorUsername}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={COLUMN_COUNT} className="px-4 py-12">
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <Text variant="body-medium" className="text-textBlack">
                        {debouncedSearch
                          ? t("settingsRest2.list.noMatchSearch", {
                              query: debouncedSearch,
                            })
                          : t("settingsRest2.list.noMatchFilters")}
                      </Text>
                      {debouncedSearch ? (
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => onSearchChange("")}
                        >
                          {t("settingsRest2.list.clearSearch")}
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={onResetFilters}
                        >
                          {t("settingsRest2.list.clearFilters")}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {pagination && onPageChange ? (
          <div className="border-t border-separator">
            <Pagination
              pagination={pagination}
              onPageChange={onPageChange}
              disabled={isFetching}
            />
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}
