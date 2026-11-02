"use client";
import { LibraryAgentSort } from "@/app/api/__generated__/models/libraryAgentSort";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select/components/SelectPrimitives";
import { ArrowDownNarrowWideIcon } from "lucide-react";
import { useLibrarySortMenu } from "./useLibrarySortMenu";
import { useT } from "@/lib/i18n";

interface Props {
  setLibrarySort: (value: LibraryAgentSort) => void;
}

export function LibrarySortMenu({ setLibrarySort }: Props) {
  const t = useT();
  const { handleSortChange } = useLibrarySortMenu({ setLibrarySort });
  return (
    <div className="flex items-center" data-testid="sort-by-dropdown">
      <span className="hidden whitespace-nowrap text-sm text-foreground-tertiary sm:inline">
        {t("library5.sort.hint")}
      </span>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="!m-0 ml-1 w-fit space-x-1 border-none !bg-transparent px-[1rem] text-sm underline underline-offset-4 !shadow-none !ring-offset-transparent">
          <ArrowDownNarrowWideIcon className="h-4 w-4 sm:hidden" />
          <SelectValue placeholder={t("library5.sort.lastModified")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={LibraryAgentSort.createdAt}>
              {t("library5.sort.createdAt")}
            </SelectItem>
            <SelectItem value={LibraryAgentSort.updatedAt}>
              {t("library5.sort.lastModified")}
            </SelectItem>
            <SelectItem value={LibraryAgentSort.lastRunAt}>
              {t("library5.sort.lastRun")}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
