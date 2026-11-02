"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

interface Props {
  currentPage: number;
  totalPages: number;
  pathParam?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  pathParam = "page",
}: Props) {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageUrl(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set(pathParam, page.toString());
    return `${pathname}?${params.toString()}`;
  }

  function handlePageChange(page: number) {
    router.push(createPageUrl(page));
  }

  return (
    <div
      data-slot="pagination-controls"
      className="mt-4 flex items-center justify-center space-x-2"
    >
      <Button
        variant="legacy-outline"
        data-slot="pagination-controls-previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {t("shared3.pagination.previous")}
      </Button>
      <Text
        variant="body-tight"
        as="span"
        tone="inherit"
        data-slot="pagination-controls-label"
      >
        {t("shared3.pagination.page", {
          current: currentPage,
          total: totalPages,
        })}
      </Text>
      <Button
        variant="legacy-outline"
        data-slot="pagination-controls-next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {t("shared3.pagination.next")}
      </Button>
    </div>
  );
}
