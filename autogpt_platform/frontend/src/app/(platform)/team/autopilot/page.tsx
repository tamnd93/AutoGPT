"use client";

import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { AUTOPILOT_NAME } from "@/components/molecules/AutopilotAvatar/helpers";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { AUTOPILOT_HEX } from "@/components/molecules/ExpertAvatar/colors";
import {
  TabsLine,
  TabsLineContent,
  TabsLineList,
  TabsLineTrigger,
} from "@/components/molecules/TabsLine/TabsLine";
import {
  Calendar03Icon,
  SparklesIcon,
  UserIcon,
  WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons";
import { ExpertSchedulesSection } from "../[expertId]/components/ExpertSchedulesSection";
import { ExpertWorkflowsSection } from "../[expertId]/components/ExpertWorkflowsSection";
import { BackToTeamLink } from "../components/BackToTeamLink";
import {
  PROFILE_TABS_INDICATOR_CLASS,
  PROFILE_TABS_LIST_CLASS,
  PROFILE_TABS_TRIGGER_CLASS,
} from "../helpers";
import { AutopilotAboutSection } from "./components/AutopilotAboutSection";
import { AutopilotHeader } from "./components/AutopilotHeader";
import { AutopilotSkillsSection } from "./components/AutopilotSkillsSection";
import { useAutopilotPage } from "./useAutopilotPage";
import { useAutopilotTab } from "./useAutopilotTab";

const MAIN_CLASS =
  "container min-h-screen max-w-[1180px] space-y-5 px-4 pb-16 pt-6 sm:px-8 md:px-12";

const TABS = [
  { value: "basics", labelKey: "team8.page.tabBasics", icon: UserIcon },
  {
    value: "schedules",
    labelKey: "team8.page.tabSchedules",
    icon: Calendar03Icon,
  },
  {
    value: "workflows",
    labelKey: "team8.page.tabWorkflows",
    icon: WorkflowSquare01Icon,
  },
  { value: "skills", labelKey: "team8.page.tabSkills", icon: SparklesIcon },
] as const;

export default function AutopilotPage() {
  const t = useT();
  const { activeTab, onTabChange } = useAutopilotTab();
  const { schedules, workflows, skills, isLoading, isError, refetch } =
    useAutopilotPage();

  if (isLoading) {
    return (
      <main className={MAIN_CLASS}>
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className={MAIN_CLASS}>
        <BackToTeamLink />
        <ErrorCard
          context={AUTOPILOT_NAME}
          hint={t("team8.page.errorHint")}
          onRetry={() => refetch()}
        />
      </main>
    );
  }

  return (
    <main className={MAIN_CLASS}>
      <BackToTeamLink />
      <AutopilotHeader />

      <Text variant="body" tone="muted">
        {t("team8.page.subtitle")}
      </Text>

      <TabsLine variant="compact" value={activeTab} onValueChange={onTabChange}>
        <TabsLineList
          flush={false}
          className={PROFILE_TABS_LIST_CLASS}
          indicatorClassName={PROFILE_TABS_INDICATOR_CLASS}
        >
          {TABS.map((tab) => (
            <TabsLineTrigger
              className={PROFILE_TABS_TRIGGER_CLASS}
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
            >
              <span className="max-sm:sr-only">{t(tab.labelKey)}</span>
            </TabsLineTrigger>
          ))}
        </TabsLineList>

        <TabsLineContent value="basics">
          <AutopilotAboutSection />
        </TabsLineContent>

        <TabsLineContent value="schedules">
          <ExpertSchedulesSection
            title={t("team8.page.teamSchedules")}
            expertName={t("team8.page.expertNameYourTeam")}
            schedules={schedules}
            lastRunLabel={null}
          />
        </TabsLineContent>

        <TabsLineContent value="workflows">
          <ExpertWorkflowsSection
            expertName={AUTOPILOT_NAME}
            workflows={workflows}
            coverColor={AUTOPILOT_HEX}
            emptyMessage={t("team8.page.workflowsEmpty")}
          />
        </TabsLineContent>

        <TabsLineContent value="skills">
          <AutopilotSkillsSection skills={skills} />
        </TabsLineContent>
      </TabsLine>
    </main>
  );
}
