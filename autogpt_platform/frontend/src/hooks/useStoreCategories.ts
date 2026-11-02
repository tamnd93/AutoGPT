import { useGetV2ListStoreCategories } from "@/app/api/__generated__/endpoints/store/store";
import { StoreCategoryInfo } from "@/app/api/__generated__/models/storeCategoryInfo";
import { getMessage, useLocale } from "@/lib/i18n";

export function useStoreCategories() {
  const locale = useLocale();
  const { data, isLoading, isError } = useGetV2ListStoreCategories({
    query: {
      // The canonical set only changes with a deploy.
      staleTime: Infinity,
      select: (x) => x.data as StoreCategoryInfo[],
    },
  });

  return {
    categories: data ?? [],
    isLoading,
    isUnavailable: isLoading || isError,
    // The two publish forms render the same required select; keeping the copy
    // here is what stops them drifting apart.
    placeholder: isLoading
      ? getMessage(locale, "errors1.storeCategories.loading")
      : isError
        ? getMessage(locale, "errors1.storeCategories.unavailable")
        : getMessage(locale, "errors1.storeCategories.select"),
  };
}
