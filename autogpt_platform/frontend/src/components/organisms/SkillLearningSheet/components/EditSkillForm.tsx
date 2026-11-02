"use client";

import { SkillVersionSummary } from "@/app/api/__generated__/models/skillVersionSummary";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Switch } from "@/components/atoms/Switch/Switch";
import { Text } from "@/components/atoms/Text/Text";
import { lineDiff } from "@/services/skill-learning/helpers";
import { SkillEditDraft } from "../useSkillReviewState";
import { useT } from "@/lib/i18n";

interface Props {
  currentVersion: SkillVersionSummary | null;
  draft: SkillEditDraft;
  isBusy: boolean;
  onDraftChange: (patch: Partial<SkillEditDraft>) => void;
  onReviewCurrent: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditSkillForm({
  currentVersion,
  draft,
  isBusy,
  onDraftChange,
  onReviewCurrent,
  onSave,
  onCancel,
}: Props) {
  const t = useT();
  const hasNewerVersion = draft.baseVersionId !== (currentVersion?.id ?? null);
  return (
    <form
      data-slot="edit-skill-form"
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!hasNewerVersion && !isBusy) onSave();
      }}
      aria-label={t("skills1.edit.aria")}
    >
      <Text variant="small" tone="muted">
        {t("skills1.edit.intro")}
      </Text>
      {hasNewerVersion && currentVersion ? (
        <section
          aria-label={t("skills1.edit.newerAvailable")}
          data-slot="edit-skill-form-conflict"
          className="rounded-lg border border-warning-border bg-warning-surface p-3"
        >
          <Text variant="small" tone="primary">
            {t("skills1.edit.conflict", { version: currentVersion.version })}
          </Text>
          <details
            data-slot="edit-skill-form-conflict-details"
            className="mt-2"
          >
            <summary
              data-slot="edit-skill-form-conflict-summary"
              className="cursor-pointer text-sm font-medium"
            >
              {t("skills1.edit.reviewAgainst", {
                version: currentVersion.version,
              })}
            </summary>
            {draft.description !== currentVersion.description ? (
              <Text variant="small" tone="secondary" className="mt-2">
                {t("skills1.edit.currentDescription", {
                  description: currentVersion.description,
                })}
              </Text>
            ) : null}
            <pre
              data-slot="edit-skill-form-conflict-diff"
              // TODO(tokens): no foreground role for zinc-100 (#EFEFF0) on the
              // dark code surface.
              className="my-3 overflow-x-auto rounded-lg bg-action-hover p-3 text-xs text-zinc-100"
            >
              {lineDiff(currentVersion.body ?? "", draft.body) ||
                t("skills1.edit.matchesCurrent")}
            </pre>
            <Button
              type="button"
              variant="secondary"
              size="small"
              disabled={isBusy}
              onClick={onReviewCurrent}
            >
              {t("skills1.edit.continueFrom", {
                version: currentVersion.version,
              })}
            </Button>
          </details>
        </section>
      ) : null}
      <Input
        id="skill-edit-description"
        label={t("skills1.edit.description")}
        labelVariant="small-medium"
        value={draft.description}
        maxLength={1024}
        required
        disabled={isBusy}
        onChange={(event) => onDraftChange({ description: event.target.value })}
      />
      <Input
        id="skill-edit-body"
        label={t("skills1.edit.procedure")}
        labelVariant="small-medium"
        type="textarea"
        rows={12}
        value={draft.body}
        required
        disabled={isBusy}
        onChange={(event) => onDraftChange({ body: event.target.value })}
      />
      <label
        data-slot="edit-skill-form-auto-improve"
        className="flex items-center justify-between gap-3"
      >
        <span
          data-slot="edit-skill-form-auto-improve-text"
          className="flex flex-col"
        >
          <Text variant="small" tone="primary">
            {t("skills1.summary.keepAutoOn")}
          </Text>
          <Text variant="small" tone="muted">
            {t("skills1.edit.keepAutoBody")}
          </Text>
        </span>
        <Switch
          checked={draft.keepAutoImprove}
          disabled={isBusy}
          aria-label={t("skills1.summary.keepAutoOn")}
          onCheckedChange={(checked) =>
            onDraftChange({ keepAutoImprove: checked })
          }
        />
      </label>
      <div
        data-slot="edit-skill-form-actions"
        className="flex justify-end gap-2"
      >
        <Button
          type="button"
          variant="ghost"
          size="small"
          disabled={isBusy}
          onClick={onCancel}
        >
          {t("skills1.edit.cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="small"
          loading={isBusy}
          disabled={hasNewerVersion}
        >
          Save edit
        </Button>
      </div>
    </form>
  );
}
