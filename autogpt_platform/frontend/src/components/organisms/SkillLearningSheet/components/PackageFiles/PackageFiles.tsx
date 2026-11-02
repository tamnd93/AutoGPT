import type { SkillVersionFileSummary } from "@/app/api/__generated__/models/skillVersionFileSummary";
import { Text } from "@/components/atoms/Text/Text";
import { FilePreview } from "./FilePreview";
import { packageFileChanges } from "./helpers";
import { useT } from "@/lib/i18n";

interface Props {
  before?: SkillVersionFileSummary[] | null;
  after?: SkillVersionFileSummary[] | null;
}

export function PackageFiles({ before, after }: Props) {
  const t = useT();
  const changes = packageFileChanges(before, after);
  if (changes.length === 0) return null;
  return (
    <section
      aria-label={t("skills1.package.aria")}
      data-slot="skill-learning-sheet-package-files"
      className="flex min-w-0 flex-col gap-2"
    >
      <Text variant="small-medium">{t("errors4.package.changes")}</Text>
      {changes.map((change) => (
        <details
          key={change.path}
          data-slot="skill-learning-sheet-package-files-item"
          className="min-w-0 rounded-lg border border-border-base p-3"
        >
          <summary
            data-slot="skill-learning-sheet-package-files-item-summary"
            className="cursor-pointer break-all text-sm"
          >
            <span data-slot="skill-learning-sheet-package-files-item-path">
              {change.path}
            </span>
            {" · "}
            {!change.after
              ? t("skills1.package.removed")
              : change.before
                ? t("skills1.package.updated")
                : t("skills1.package.added")}
          </summary>
          <div
            data-slot="skill-learning-sheet-package-files-item-previews"
            className="mt-3 flex min-w-0 flex-col gap-3"
          >
            <FilePreview
              file={change.before}
              label={t("skills1.package.previous")}
            />
            <FilePreview
              file={change.after}
              label={t("skills1.package.newFile")}
            />
          </div>
        </details>
      ))}
    </section>
  );
}
