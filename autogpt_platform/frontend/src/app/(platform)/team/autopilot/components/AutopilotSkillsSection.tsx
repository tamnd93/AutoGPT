"use client";

import { CopilotSkillInfo } from "@/app/api/__generated__/models/copilotSkillInfo";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { useState } from "react";
import { ExpertSkillListItem } from "../../[expertId]/components/ExpertSkillListItem";
import { AUTOPILOT_PILL_CLASS } from "../../helpers";
import { ToolbarSearch } from "../../components/ToolbarSearch";

interface Props {
  skills: CopilotSkillInfo[];
}

export function AutopilotSkillsSection({ skills }: Props) {
  const t = useT();
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(needle) ||
          skill.description.toLowerCase().includes(needle),
      )
    : skills;

  return (
    <section>
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
        <Text variant="large-medium" tone="primary">
          {t("team8.skills.heading")}
        </Text>
        <ToolbarSearch
          textSize="body-md"
          id="otto-skills-search"
          label={t("team1.skills.searchLabel")}
          value={query}
          onChange={setQuery}
        />
      </div>
      {skills.length === 0 ? (
        <Text variant="body-md" tone="muted" className="pt-4">
          {t("team8.skills.empty")}
        </Text>
      ) : visible.length === 0 ? (
        <Text variant="body-md" tone="muted" className="pt-4">
          {t("team8.skills.noMatch")}
        </Text>
      ) : (
        <ul
          className="flex flex-col gap-3 pt-4"
          aria-label={t("team8.skills.listAria")}
        >
          {visible.map((skill) => (
            <li key={skill.name}>
              <ExpertSkillListItem
                entry={{ name: skill.name, skill, library: skill }}
                accentClassName={AUTOPILOT_PILL_CLASS}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
