"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { InfiniteList } from "@/components/molecules/InfiniteList/InfiniteList";
import { useStoreCategories } from "@/hooks/useStoreCategories";
import { useT } from "@/lib/i18n";
import { ArrowLeft02Icon, BookOpen01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SkillCard } from "../../../components/SkillsSection/components/SkillCard";
import { SkillTopicChips } from "../../../components/SkillTopicChips/SkillTopicChips";
import { useSkillsBrowsePage } from "./useSkillsBrowsePage";

const GRID_CLASS = "grid grid-cols-1 gap-5 md:grid-cols-2";

export function SkillsBrowsePage() {
  const t = useT();
  const {
    search,
    category,
    skills,
    total,
    installedSlugs,
    isLoading,
    isError,
    refetch,
    hasMore,
    isFetchingMore,
    loadMore,
    setSearch,
    setCategory,
  } = useSkillsBrowsePage();
  const { categories } = useStoreCategories();

  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 pb-16 pt-8 md:px-10 lg:px-14">
      <Link
        href="/marketplace#skills"
        className="mb-6 inline-flex w-fit items-center gap-1.5 text-body-sm leading-inherit text-foreground-tertiary transition-colors hover:text-foreground-strong"
      >
        <Icon icon={ArrowLeft02Icon} size={14} aria-hidden />
        {t("marketplace2.expert.backToMarketplace")}
      </Link>

      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="flex items-center gap-2.5 text-3xl font-semibold tracking-heading text-foreground-strong">
            <Icon icon={BookOpen01Icon} size={30} aria-hidden />
            {t("marketplace2.expert.skillsTitle")}
          </h1>
          <p className="mt-2 text-base text-foreground-tertiary">
            {t("marketplace2.browse.subtitle")}
          </p>
        </div>
        <SearchBar
          placeholder={t("marketplace2.browse.searchPlaceholder")}
          height="h-[2.75rem]"
          width="w-full md:w-[439px]"
          defaultValue={search}
          onSubmit={setSearch}
        />
      </div>

      <div className="mb-8">
        <SkillTopicChips
          selected={category}
          onSelect={setCategory}
          size="default"
        />
      </div>

      {isLoading ? (
        <div
          role="status"
          aria-busy="true"
          aria-label={t("marketplace1.skills.loadingAria")}
          className={GRID_CLASS}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-[18rem] w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <ErrorCard
          isSuccess={false}
          responseError={{
            message: t("marketplace2.browse.loadFailed"),
          }}
          context="marketplace skills"
          onRetry={() => refetch()}
          className="max-w-md"
        />
      ) : skills.length === 0 ? (
        <EmptyResult
          category={category}
          categoryLabel={
            categories.find((entry) => entry.value === category)?.label
          }
          onShowAll={() => setCategory(null)}
        />
      ) : (
        <>
          <p className="mb-4 text-sm text-foreground-tertiary">
            {total === 1
              ? t("marketplace2.browse.skillOne")
              : t("marketplace2.browse.skills", {
                  count: total.toLocaleString(),
                })}
          </p>
          <InfiniteList
            items={skills}
            className={GRID_CLASS}
            hasMore={hasMore}
            isFetchingMore={isFetchingMore}
            onEndReached={loadMore}
            renderItem={(skill) => (
              <SkillCard
                key={skill.slug}
                skill={skill}
                isInstalled={installedSlugs.has(skill.slug)}
              />
            )}
          />
        </>
      )}
    </main>
  );
}

function EmptyResult({
  category,
  categoryLabel,
  onShowAll,
}: {
  category: string | null;
  categoryLabel: string | undefined;
  onShowAll: () => void;
}) {
  const t = useT();

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-large border border-dashed border-border-base px-6 py-16 text-center"
      data-testid="skills-browse-empty"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-surface">
        <Icon
          icon={BookOpen01Icon}
          size={24}
          className="text-accent-strong"
          aria-hidden
        />
      </div>
      <Text variant="h4" className="text-foreground-strong">
        {category
          ? t("marketplace2.browse.emptyCategory", {
              category: categoryLabel ?? category,
            })
          : t("marketplace2.browse.emptyNone")}
      </Text>
      {category ? (
        <button
          type="button"
          onClick={onShowAll}
          className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          {t("marketplace1.skills.showAll")}
        </button>
      ) : (
        <Link
          href="/library/skills"
          className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          {t("marketplace2.browse.goToSkills")}
        </Link>
      )}
    </div>
  );
}
