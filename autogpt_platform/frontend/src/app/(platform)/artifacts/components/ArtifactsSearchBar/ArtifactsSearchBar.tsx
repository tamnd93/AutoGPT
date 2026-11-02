"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { Input } from "@/components/atoms/Input/Input";
import { Search01Icon } from "@hugeicons/core-free-icons";
import type { ChangeEvent } from "react";
import { useT } from "@/lib/i18n";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function ArtifactsSearchBar({ searchTerm, setSearchTerm }: Props) {
  const t = useT();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <div
      data-testid="artifacts-search-bar"
      className="relative flex w-full items-center md:w-auto"
    >
      <Icon
        icon={Search01Icon}
        width={16}
        height={16}
        className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 text-foreground-tertiary"
      />
      <Input
        label={t("artifacts1.search.label")}
        id="artifacts-search-bar"
        hideLabel
        type="text"
        size="small"
        value={searchTerm}
        onChange={handleChange}
        placeholder={t("artifacts1.search.placeholder")}
        className="min-w-[16rem] rounded-full pl-10 lg:min-w-[20rem]"
        wrapperClassName="!mb-0"
        data-testid="artifacts-search-input"
      />
    </div>
  );
}
