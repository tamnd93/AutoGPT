"use client";

import { CopilotSkillInfo } from "@/app/api/__generated__/models/copilotSkillInfo";
import { MarketplaceSkill } from "@/app/api/__generated__/models/marketplaceSkill";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { SearchInput } from "@/components/molecules/SearchInput/SearchInput";
import {
  TabsLine,
  TabsLineList,
  TabsLineTrigger,
} from "@/components/molecules/TabsLine/TabsLine";
import {
  BookOpen01Icon,
  PlusSignIcon,
  Store01Icon,
} from "@hugeicons/core-free-icons";
import NextLink from "next/link";
import { useT } from "@/lib/i18n";
import { useState } from "react";
import { useFitListToDialog } from "./useFitListToDialog";

type Source = "library" | "marketplace";

interface Props {
  open: boolean;
  source: Source;
  onSourceChange: (source: Source) => void;
  skills: CopilotSkillInfo[];
  isLoading: boolean;
  marketQuery: string;
  onMarketQueryChange: (query: string) => void;
  marketplaceSkills: MarketplaceSkill[];
  isMarketplaceLoading: boolean;
  isSaving: boolean;
  onAdd: (name: string) => void;
  onAddMarketplace: (skill: MarketplaceSkill) => void;
  onClose: () => void;
}

export function AddSkillDialog({
  open,
  source,
  onSourceChange,
  skills,
  isLoading,
  marketQuery,
  onMarketQueryChange,
  marketplaceSkills,
  isMarketplaceLoading,
  isSaving,
  onAdd,
  onAddMarketplace,
  onClose,
}: Props) {
  const t = useT();
  const [query, setQuery] = useState("");
  const { attachList } = useFitListToDialog<HTMLUListElement>();
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(needle) ||
          skill.description.toLowerCase().includes(needle),
      )
    : skills;

  return (
    <Dialog
      variant="compact"
      controlled={{
        isOpen: open,
        set: (next) => {
          if (!next) onClose();
        },
      }}
      styling={{ maxWidth: "30rem", maxHeight: "60vh" }}
      title={t("team5.addSkill.title")}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-3">
          <Text variant="body" tone="muted">
            {t("team5.addSkill.intro")}
          </Text>
          <TabsLine
            variant="compact"
            value={source}
            onValueChange={(next) => onSourceChange(next as Source)}
          >
            <TabsLineList>
              <TabsLineTrigger value="library" icon={BookOpen01Icon}>
                {t("team5.addSkill.library")}
              </TabsLineTrigger>
              <TabsLineTrigger value="marketplace" icon={Store01Icon}>
                {t("team5.addSkill.marketplace")}
              </TabsLineTrigger>
            </TabsLineList>
          </TabsLine>

          {source === "library" ? (
            <>
              <SearchInput
                size="small"
                value={query}
                onChange={setQuery}
                placeholder={t("team5.addSkill.searchLibrary")}
              />
              {isLoading ? (
                <Text variant="small" tone="muted">
                  {t("team5.addSkill.loading")}
                </Text>
              ) : visible.length === 0 ? (
                <Text variant="small" tone="muted">
                  {skills.length === 0
                    ? t("team5.addSkill.allInstalled")
                    : t("team5.addSkill.noMatch")}
                </Text>
              ) : (
                <ul
                  ref={attachList}
                  className="flex flex-col gap-2 overflow-y-auto pr-1"
                  aria-label={t("team5.addSkill.libraryAria")}
                >
                  {visible.map((skill) => (
                    <SkillOption
                      key={skill.name}
                      name={skill.name}
                      description={skill.description}
                      icon={BookOpen01Icon}
                      disabled={isSaving}
                      onAdd={() => onAdd(skill.name)}
                    />
                  ))}
                </ul>
              )}
              <NextLink href="/library/skills">
                <Text
                  variant="body"
                  as="span"
                  tone="muted"
                  className="underline underline-offset-2"
                >
                  {t("team5.addSkill.uploadNew")}
                </Text>
              </NextLink>
            </>
          ) : (
            <>
              <SearchInput
                size="small"
                value={marketQuery}
                onChange={onMarketQueryChange}
                placeholder={t("team5.addSkill.searchMarket")}
              />
              {isMarketplaceLoading ? (
                <Text variant="small" tone="muted">
                  {t("team5.addSkill.searchingMarket")}
                </Text>
              ) : marketplaceSkills.length === 0 ? (
                <Text variant="small" tone="muted">
                  {t("team5.addSkill.noMarketMatch")}
                </Text>
              ) : (
                <ul
                  ref={attachList}
                  className="flex flex-col gap-2 overflow-y-auto pr-1"
                  aria-label={t("team5.addSkill.marketAria")}
                >
                  {marketplaceSkills.map((skill) => (
                    <SkillOption
                      key={skill.slug}
                      name={skill.title}
                      description={skill.description}
                      icon={Store01Icon}
                      disabled={isSaving}
                      onAdd={() => onAddMarketplace(skill)}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
          <div className="flex justify-end pt-1">
            <Button variant="secondary" size="small" onClick={onClose}>
              {t("team5.common.cancel")}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

interface OptionProps {
  name: string;
  description: string;
  icon: typeof BookOpen01Icon;
  disabled: boolean;
  onAdd: () => void;
}

function SkillOption({
  name,
  description,
  icon,
  disabled,
  onAdd,
}: OptionProps) {
  const t = useT();

  return (
    <li className="flex items-center gap-3 rounded-lg border border-border-base px-3 py-2.5">
      <Icon
        icon={icon}
        size={18}
        className="shrink-0 text-foreground-tertiary"
      />
      <span className="min-w-0 flex-1">
        <Text
          variant="body-medium"
          as="span"
          tone="primary"
          className="block truncate"
        >
          {name}
        </Text>
        <Text variant="small" as="span" tone="muted" className="block truncate">
          {description}
        </Text>
      </span>
      <Button
        variant="secondary"
        size="small"
        disabled={disabled}
        onClick={onAdd}
        leadingIcon={PlusSignIcon}
      >
        {t("team5.addSkill.add")}
      </Button>
    </li>
  );
}
