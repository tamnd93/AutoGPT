"use client";

import { SkillLearningDetail } from "@/app/api/__generated__/models/skillLearningDetail";
import { SkillVersionSummary } from "@/app/api/__generated__/models/skillVersionSummary";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Switch } from "@/components/atoms/Switch/Switch";
import { Text } from "@/components/atoms/Text/Text";
import { reuseLabel, versionLabel } from "@/services/skill-learning/helpers";
import { formatDistanceToNow } from "date-fns";
import { OutcomeReportRequestOutcome } from "@/app/api/__generated__/models/outcomeReportRequestOutcome";
import { SkillPolicyRequest } from "@/app/api/__generated__/models/skillPolicyRequest";
import { SourceRemovedNotice } from "./SourceRemovedNotice";
import { useLocale, useT } from "@/lib/i18n";

interface Props {
  detail: SkillLearningDetail;
  version: SkillVersionSummary | null;
  isBusy: boolean;
  onPolicy: (data: SkillPolicyRequest) => void;
  onEdit: () => void;
  onReport: (versionId: string, outcome: OutcomeReportRequestOutcome) => void;
}

function stateVariant(state: string) {
  if (state === "ready") return "success" as const;
  if (state === "blocked_content" || state === "invalidated")
    return "error" as const;
  if (state === "needs_decision" || state === "paused")
    return "warning" as const;
  return "info" as const;
}

export function SummaryView({
  detail,
  version,
  isBusy,
  onPolicy,
  onEdit,
  onReport,
}: Props) {
  const t = useT();
  const locale = useLocale();
  const isCurrent =
    version != null && version.id === detail.current_version?.id;
  const badgeState = version && !isCurrent ? version.state : detail.state;
  const badgeLabel =
    version && !isCurrent ? version.state_label : detail.state_label;
  return (
    <div
      data-slot="skill-learning-sheet-summary"
      className="flex flex-col gap-5"
    >
      <div
        data-slot="skill-learning-sheet-summary-header"
        className="flex flex-wrap items-center gap-2"
      >
        <span
          data-slot="skill-learning-sheet-summary-state"
          data-testid="version-state"
        >
          <Badge variant={stateVariant(badgeState)}>{badgeLabel}</Badge>
        </span>
        {version ? (
          <Text variant="small" tone="muted" as="span">
            {versionLabel(version)} ·{" "}
            {formatDistanceToNow(new Date(version.created_at), {
              addSuffix: true,
            })}
            {isCurrent ? "" : " · not the current version"}
          </Text>
        ) : null}
      </div>
      {version && !isCurrent ? (
        <Text variant="small" tone="muted">
          Skill now: {detail.state_label}. The controls below apply to the skill
          as a whole, not to this historical version.
        </Text>
      ) : null}
      {isCurrent && version?.state === "invalidated" ? (
        <SourceRemovedNotice usePaused={detail.policy.use_paused} />
      ) : null}
      {version ? (
        <>
          <Text variant="body" tone="primary">
            {version.summary || version.description}
          </Text>
          <section
            data-slot="skill-learning-sheet-summary-evidence"
            aria-label={t("skills1.summary.evidence")}
          >
            <Text variant="small-medium" tone="primary">
              Evidence
            </Text>
            <ul
              data-slot="skill-learning-sheet-summary-evidence-list"
              className="mt-1 flex flex-col gap-1"
            >
              {(version.evidence ?? []).map((item) => (
                <li
                  key={`${item.kind}-${item.ref}-${item.label}`}
                  data-slot="skill-learning-sheet-summary-evidence-item"
                >
                  <Text variant="small" tone="secondary">
                    {item.label}
                  </Text>
                </li>
              ))}
              <li data-slot="skill-learning-sheet-summary-evidence-reuse">
                <Text
                  variant="small"
                  tone="secondary"
                  data-testid="reuse-label"
                >
                  {reuseLabel(version, locale)}
                </Text>
              </li>
            </ul>
          </section>
          {(version.limits ?? []).length > 0 ? (
            <section
              data-slot="skill-learning-sheet-summary-limits"
              aria-label={t("skills1.summary.limits")}
            >
              <Text variant="small-medium" tone="primary">
                Limits
              </Text>
              <ul
                data-slot="skill-learning-sheet-summary-limits-list"
                className="mt-1 list-disc pl-4"
              >
                {(version.limits ?? []).map((limit) => (
                  <li
                    key={limit}
                    data-slot="skill-learning-sheet-summary-limits-item"
                  >
                    <Text variant="small" tone="secondary">
                      {limit}
                    </Text>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {version.blocked_pattern_class ? (
            <Text variant="small" tone="danger">
              {t("skills1.summary.blockedBy", {
                block: version.blocked_pattern_class,
                step: version.blocked_step ?? "",
              })}
            </Text>
          ) : null}
        </>
      ) : (
        <Text variant="small" tone="muted">
          {t("skills1.summary.noVersion")}
        </Text>
      )}
      <section
        aria-label={t("skills1.summary.controls")}
        data-slot="skill-learning-sheet-summary-controls"
        className="flex flex-col gap-3"
      >
        <label
          data-slot="skill-learning-sheet-summary-auto-improve"
          className="flex items-center justify-between gap-3"
        >
          <Text variant="small" tone="primary">
            {t("skills1.summary.autoImprovementsLabel")}
          </Text>
          <Switch
            checked={detail.policy.auto_improve}
            disabled={isBusy}
            aria-label={t("skills1.summary.autoImprovements")}
            onCheckedChange={(checked) => onPolicy({ auto_improve: checked })}
          />
        </label>
        <div
          data-slot="skill-learning-sheet-summary-pause-actions"
          className="flex flex-wrap gap-2"
        >
          <Button
            variant="secondary"
            size="small"
            disabled={isBusy}
            onClick={() =>
              onPolicy({ learning_paused: !detail.policy.learning_paused })
            }
          >
            {detail.policy.learning_paused
              ? t("skills1.summary.resumeLearning")
              : t("skills1.summary.pauseLearning")}
          </Button>
          <Button
            variant="secondary"
            size="small"
            disabled={isBusy}
            onClick={() => onPolicy({ use_paused: !detail.policy.use_paused })}
          >
            {detail.policy.use_paused
              ? t("skills1.summary.resumeUsing")
              : t("skills1.summary.stopUsing")}
          </Button>
        </div>
        <Text variant="small" tone="muted">
          {t("skills1.summary.pauseExplain")}
        </Text>
        <div
          data-slot="skill-learning-sheet-summary-edit-actions"
          className="flex flex-wrap gap-2"
        >
          <Button
            variant="secondary"
            size="small"
            disabled={isBusy || !isCurrent}
            title={
              !version
                ? t("skills1.summary.editingNeedsPublish")
                : isCurrent
                  ? undefined
                  : t("skills1.summary.editingFromCurrent")
            }
            onClick={onEdit}
          >
            {t("skills1.summary.editSkill")}
          </Button>
          {version ? (
            <>
              <Button
                variant="ghost"
                size="small"
                disabled={isBusy}
                onClick={() => onReport(version.id, "succeeded")}
              >
                Report: it worked
              </Button>
              <Button
                variant="ghost"
                size="small"
                disabled={isBusy}
                onClick={() => onReport(version.id, "failed")}
              >
                Report: it failed
              </Button>
            </>
          ) : null}
        </div>
        <Text variant="small" tone="muted">
          Edit skill applies your correction now
          {isCurrent ? "" : " (available on the current version)"}. Report an
          outcome adds evidence for a later review without changing the skill.
        </Text>
      </section>
    </div>
  );
}
