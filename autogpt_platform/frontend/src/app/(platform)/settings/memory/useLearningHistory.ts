import {
  getListSkillLearningDecisionsQueryKey,
  getListSkillLearningHistoryQueryKey,
  useDecideSkillLearningProposal,
  useListSkillLearningDecisions,
  useListSkillLearningHistory,
} from "@/app/api/__generated__/endpoints/skill-learning/skill-learning";
import { DecisionRequestAction } from "@/app/api/__generated__/models/decisionRequestAction";
import { SkillVersionSummary } from "@/app/api/__generated__/models/skillVersionSummary";
import { okData } from "@/app/api/helpers";
import { toast } from "@/components/molecules/Toast/use-toast";
import type { Locale } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";
import { Flag, useGetFlag } from "@/services/feature-flags/use-get-flag";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useT } from "@/lib/i18n";

export const HISTORY_LIMIT = 30;

const ORIGIN_FILTER_KEYS: { value: string; labelKey: MessageKey }[] = [
  { value: "all", labelKey: "settingsRest3.filters.origin.all" },
  {
    value: "saved_overnight",
    labelKey: "settingsRest3.filters.origin.savedOvernight",
  },
  {
    value: "saved_during_work",
    labelKey: "settingsRest3.filters.origin.savedDuringWork",
  },
  { value: "requested", labelKey: "settingsRest3.filters.origin.requested" },
  { value: "edited", labelKey: "settingsRest3.filters.origin.edited" },
  { value: "restored", labelKey: "settingsRest3.filters.origin.restored" },
  { value: "imported", labelKey: "settingsRest3.filters.origin.imported" },
];

const STATE_FILTER_KEYS: { value: string; labelKey: MessageKey }[] = [
  { value: "all", labelKey: "settingsRest3.filters.state.all" },
  { value: "ready", labelKey: "settingsRest3.filters.state.ready" },
  {
    value: "needs_decision",
    labelKey: "settingsRest3.filters.state.needsDecision",
  },
  {
    value: "blocked_content",
    labelKey: "settingsRest3.filters.state.blockedContent",
  },
  { value: "archived", labelKey: "settingsRest3.filters.state.archived" },
  {
    value: "invalidated",
    labelKey: "settingsRest3.filters.state.invalidated",
  },
];

export function originFilters(locale: Locale = "en") {
  return ORIGIN_FILTER_KEYS.map(({ value, labelKey }) => ({
    value,
    label: getMessage(locale, labelKey),
  }));
}

export function stateFilters(locale: Locale = "en") {
  return STATE_FILTER_KEYS.map(({ value, labelKey }) => ({
    value,
    label: getMessage(locale, labelKey),
  }));
}

export const ORIGIN_FILTERS = [
  { value: "all", label: "All origins" },
  { value: "saved_overnight", label: "Saved overnight" },
  { value: "saved_during_work", label: "Saved during work" },
  { value: "requested", label: "Requested" },
  { value: "edited", label: "Edited" },
  { value: "restored", label: "Restored" },
  { value: "imported", label: "Imported" },
];

export const STATE_FILTERS = [
  { value: "all", label: "All states" },
  { value: "ready", label: "Ready to use" },
  { value: "needs_decision", label: "Needs your decision" },
  { value: "blocked_content", label: "Blocked by content check" },
  { value: "archived", label: "Archived" },
  { value: "invalidated", label: "Archived (source unavailable)" },
];

export interface OpenLearningRecord {
  expertId: string | null;
  skillName: string;
  versionId: string | null;
}

/** The Expert page and chat chip link here with ?skill=<name>&version=<id>
 *  (and ?expert=<id> for an Expert scope). Read once; the page owns it after. */
export function readOpenRecordFromUrl(): OpenLearningRecord | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const skillName = params.get("skill");
  if (!skillName) return null;
  return {
    expertId: params.get("expert") || null,
    skillName,
    versionId: params.get("version") || null,
  };
}

export function useLearningHistory(scopeExpertID: string | null) {
  const t = useT();
  const enabled = Boolean(useGetFlag(Flag.DREAM_SKILL_LEARNING_ENABLED));
  const queryClient = useQueryClient();
  const [origin, setOrigin] = useState("all");
  const [state, setState] = useState("all");
  const [openRecord, setOpenRecord] = useState<OpenLearningRecord | null>(
    readOpenRecordFromUrl,
  );

  const params = {
    expert_id: scopeExpertID ?? undefined,
    origin: origin === "all" ? undefined : origin,
    state: state === "all" ? undefined : state,
    limit: HISTORY_LIMIT,
  };
  const historyQuery = useListSkillLearningHistory(params, {
    query: { enabled, select: (res) => okData(res)?.items ?? [] },
  });
  const decisionsQuery = useListSkillLearningDecisions({
    query: { enabled, select: (res) => okData(res)?.items ?? [] },
  });

  const { mutate: decide, isPending: isDeciding } =
    useDecideSkillLearningProposal({
      mutation: {
        onSuccess: (res) => {
          const data = okData(res);
          toast({
            title:
              data?.status_label ??
              t("settingsRest3.learning.decisionRecorded"),
            description: data?.reason || undefined,
          });
          queryClient.invalidateQueries({
            queryKey: getListSkillLearningDecisionsQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getListSkillLearningHistoryQueryKey(params),
          });
        },
        onError: () =>
          toast({
            title: t("settingsRest3.learning.decisionFailed"),
            variant: "destructive",
          }),
      },
    });

  function decideProposal(
    proposal: SkillVersionSummary,
    action: DecisionRequestAction,
  ) {
    decide({
      name: proposal.skill_name,
      versionId: proposal.id,
      data: { action, edited_body: null },
      params: { expert_id: proposal.expert_id ?? undefined },
    });
  }

  function refreshHistory() {
    queryClient.invalidateQueries({
      queryKey: getListSkillLearningHistoryQueryKey(params),
    });
    queryClient.invalidateQueries({
      queryKey: getListSkillLearningDecisionsQueryKey(),
    });
  }

  return {
    enabled,
    origin,
    setOrigin,
    state,
    setState,
    openRecord,
    openRecordFor: (item: {
      expert_id?: string | null;
      skill_name?: string | null;
      version_id?: string | null;
    }) =>
      item.skill_name
        ? setOpenRecord({
            expertId: item.expert_id ?? null,
            skillName: item.skill_name,
            versionId: item.version_id ?? null,
          })
        : undefined,
    closeRecord: () => setOpenRecord(null),
    refreshHistory,
    items: historyQuery.data ?? [],
    isLoading: historyQuery.isLoading,
    decisions: decisionsQuery.data ?? [],
    isDecisionsLoading: decisionsQuery.isLoading,
    decideProposal,
    isDeciding,
  };
}
