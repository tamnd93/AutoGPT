"use client";

import { Button } from "@/components/atoms/Button/Button";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { Text } from "@/components/atoms/Text/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip/BaseTooltip";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { NEW_SKILL_PROMPT } from "../guidedPrompts";
import { EmptySkills } from "./components/EmptySkills/EmptySkills";
import { SkillListItem } from "./components/SkillListItem/SkillListItem";
import { UploadSkillButton } from "./components/UploadSkillButton/UploadSkillButton";
import { useSkillsPanel } from "./useSkillsPanel";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  onGuidedPrompt: (prompt: string) => void;
  withHeading?: boolean;
}

export function SkillsPanel({ onGuidedPrompt, withHeading = true }: Props) {
  const t = useT();
  const { skills, isLoading, error, newSkillName, handleSkillUploaded } =
    useSkillsPanel();

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          {withHeading && (
            <Text variant="h2">{t("skills1.panel.heading")}</Text>
          )}
          <Text variant="body" className="!text-foreground-tertiary">
            {t("skills1.panel.description")}
          </Text>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <UploadSkillButton onUploaded={handleSkillUploaded} />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="primary"
                size="small"
                onClick={() => onGuidedPrompt(NEW_SKILL_PROMPT)}
                data-testid="skill-new-button"
              >
                <Icon icon={PlusSignIcon} className="mr-1 h-4 w-4" />
                {t("skills1.panel.newSkill")}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {t("skills1.panel.newTooltip")}
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      {error ? (
        <ErrorCard
          responseError={{
            message:
              error instanceof Error
                ? error.message
                : t("skills1.panel.loadFailed"),
          }}
          context={t("errors2.context.skills")}
        />
      ) : isLoading ? (
        <div
          className="flex items-center justify-center py-16"
          data-testid="skills-loading"
        >
          <LoadingSpinner />
        </div>
      ) : skills.length === 0 ? (
        <EmptySkills />
      ) : (
        <ul
          className="flex flex-col gap-3"
          data-testid="skills-list"
          aria-label={t("skills1.panel.listAria")}
        >
          {skills.map((skill) => (
            <li key={skill.name}>
              <SkillListItem
                skill={skill}
                isNew={skill.name === newSkillName}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
