"use client";

import { Input } from "@/components/atoms/Input/Input";
import { useLibrarySearchbar } from "./useLibrarySearchbar";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  setSearchTerm: (value: string) => void;
}

export function LibrarySearchBar({ setSearchTerm }: Props) {
  const t = useT();
  const { handleSearchInput } = useLibrarySearchbar({ setSearchTerm });

  return (
    <div
      data-testid="search-bar"
      className="relative z-[21] -mb-6 flex w-full items-center md:w-auto"
    >
      <Icon
        icon={Search01Icon}
        width={18}
        height={18}
        className="absolute left-4 top-[34%] z-20 -translate-y-1/2 text-foreground-emphasis"
      />

      <Input
        label={t("library5.search.label")}
        id="library-search-bar"
        hideLabel
        onChange={handleSearchInput}
        className="min-w-[18rem] pl-12 lg:min-w-[30rem]"
        type="text"
        data-testid="library-textbox"
        placeholder={t("library5.search.placeholder")}
      />
    </div>
  );
}
