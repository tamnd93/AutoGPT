"use client";

import { Expert } from "@/app/api/__generated__/models/expert";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Switch } from "@/components/atoms/Switch/Switch";
import { Text } from "@/components/atoms/Text/Text";
import { SkillLearningSheet } from "@/components/organisms/SkillLearningSheet/SkillLearningSheet";
import {
  BookOpen01Icon,
  BulbIcon,
  PlusSignIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { SectionEmptyState } from "../../components/SectionEmptyState";
import { ToolbarSearch } from "../../components/ToolbarSearch";
import { AddSkillDialog } from "./AddSkillDialog";
import { ExpertSkillListItem } from "./ExpertSkillListItem";
import { useExpertLearning } from "./useExpertLearning";
import { useExpertSkills } from "./useExpertSkills";
import { useT } from "@/lib/i18n";

interface Props {
  expert: Expert;
  accentClassName?: string;
  initialSkill?: string | null;
  initialVersionId?: string | null;
}

export function ExpertSkillsSection({
  expert,
  accentClassName,
  initialSkill = null,
  initialVersionId = null,
}: Props) {
  const t = useT();
  const {
    query,
    setQuery,
    visible,
    hasAny,
    available,
    isLibraryLoading,
    isAddOpen,
    openAdd,
    closeAdd,
    source,
    setSource,
    marketQuery,
    setMarketQuery,
    marketplaceSkills,
    isMarketplaceLoading,
    addSkill,
    addMarketplaceSkill,
    removeSkill,
    isSaving,
  } = useExpertSkills(expert);
  const learning = useExpertLearning(expert, initialSkill, initialVersionId);

  return (
    <section>
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
        <Text variant="large-medium" tone="primary">
          {t("team7.skills.title", { name: expert.name })}
        </Text>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <Button
            variant="secondary"
            size="small"
            textSize="body-md"
            leadingIcon={PlusSignIcon}
            onClick={openAdd}
          >
            {t("team7.skills.add")}
          </Button>
          <ToolbarSearch
            textSize="body-md"
            id="expert-skills-search"
            label={t("team7.skills.search")}
            value={query}
            onChange={setQuery}
          />
        </div>
      </div>
      {learning.enabled ? (
        <div
          className="mb-3 flex flex-col gap-2 rounded-2xl bg-surface p-3.5 smooth-shadow-ring-sm sm:flex-row sm:items-center sm:justify-between"
          data-testid="expert-learning-summary"
        >
          <Text variant="small" tone="secondary">
            {learning.recentChange
              ? `${learning.recentChange.summary} · ${learning.recentChange.origin_label ?? ""} · ${learning.recentChange.state_label}`
              : t("team7.skills.noChanges")}
          </Text>
          <label className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <Text variant="small" tone="primary">
              {learning.isLearningPaused
                ? t("team7.skills.learningPaused")
                : t("team7.skills.learningOn")}
            </Text>
            <Switch
              checked={!learning.isLearningPaused}
              disabled={learning.isTogglingLearning}
              aria-label={t("team7.skills.nightlyAria", {
                name: expert.name,
              })}
              onCheckedChange={(checked) =>
                learning.setLearningPaused(!checked)
              }
            />
          </label>
        </div>
      ) : null}
      {!hasAny ? (
        <SectionEmptyState
          tiles={[
            <Icon
              key="book"
              icon={BookOpen01Icon}
              size={22}
              // TODO(tokens): no exact role: text-sky-500 #0EA5E9
              className="text-sky-500"
            />,
            <Icon
              key="bulb"
              icon={BulbIcon}
              size={22}
              className="text-warning"
            />,
            <Icon
              key="sparkles"
              icon={SparklesIcon}
              size={22}
              // TODO(tokens): no exact role: text-violet-500 #8B5CF6
              className="text-violet-500"
            />,
          ]}
          title={t("team7.skills.noneTitle")}
          description={t("team7.skills.emptyDesc", { name: expert.name })}
        >
          <Button
            variant="primary"
            size="small"
            textSize="body-md"
            leadingIcon={PlusSignIcon}
            onClick={openAdd}
          >
            {t("team7.skills.add")}
          </Button>
        </SectionEmptyState>
      ) : visible.length === 0 ? (
        <Text variant="body-md" tone="muted" className="pt-4">
          {t("team7.skills.noMatch")}
        </Text>
      ) : (
        <ul
          className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-2"
          aria-label={t("team7.skills.ariaList")}
        >
          {visible.map((entry) => (
            <li key={entry.name}>
              <ExpertSkillListItem
                entry={entry}
                accentClassName={accentClassName}
                isSaving={isSaving}
                learning={
                  learning.enabled ? learning.learningLineFor(entry.name) : null
                }
                onRemove={removeSkill}
              />
            </li>
          ))}
        </ul>
      )}
      <AddSkillDialog
        open={isAddOpen}
        source={source}
        onSourceChange={setSource}
        skills={available}
        isLoading={isLibraryLoading}
        marketQuery={marketQuery}
        onMarketQueryChange={setMarketQuery}
        marketplaceSkills={marketplaceSkills}
        isMarketplaceLoading={isMarketplaceLoading}
        isSaving={isSaving}
        onAdd={addSkill}
        onAddMarketplace={addMarketplaceSkill}
        onClose={closeAdd}
      />
      {learning.enabled ? (
        <SkillLearningSheet
          scope={{
            expertId: expert.id,
            name: expert.name,
            avatarUrl: expert.avatar_url,
            color: expert.color,
          }}
          skillName={learning.openSkill?.name ?? null}
          initialVersionId={learning.openSkill?.versionId ?? null}
          onChanged={learning.refreshHistory}
          onClose={learning.closeSkill}
        />
      ) : null}
    </section>
  );
}
