"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu/DropdownMenu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useT, type MessageKey } from "@/lib/i18n";

const sortOptions: SortOption[] = [
  { labelKey: "shared1.sortDropdown.mostRuns", value: "runs" },
  { labelKey: "shared1.sortDropdown.highestRated", value: "rating" },
  { labelKey: "shared1.sortDropdown.nameAZ", value: "name" },
  { labelKey: "shared1.sortDropdown.recentlyUpdated", value: "updated_at" },
];

interface SortOption {
  labelKey: MessageKey;
  value: string;
}

export const SortDropdown: React.FC<{
  onSort: (sortValue: string) => void;
}> = ({ onSort }) => {
  const t = useT();
  const [selected, setSelected] = React.useState(sortOptions[0]);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onSort(option.value);
    console.log(`Sorting by: ${option.value}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 focus:outline-none">
        <span className="text-base text-neutral-800 dark:text-neutral-200">
          {t("shared1.sortDropdown.sortBy")}
        </span>
        <span className="text-base text-neutral-800 dark:text-neutral-200">
          {t(selected.labelKey)}
        </span>
        <ChevronDownIcon className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] rounded-lg bg-white shadow-lg dark:bg-neutral-800"
      >
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`cursor-pointer px-4 py-2 text-base hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
              selected.value === option.value
                ? "font-medium text-neutral-800 dark:text-neutral-200"
                : "text-neutral-600 dark:text-neutral-400"
            }`}
            onClick={() => handleSelect(option)}
          >
            {t(option.labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
