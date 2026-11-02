import { Text } from "@/components/atoms/Text/Text";
import { BookOpen01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function EmptySkills() {
  const t = useT();

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-large border border-dashed border-border-base px-6 py-16 text-center"
      data-testid="skills-empty"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-surface">
        <Icon icon={BookOpen01Icon} size={24} className="text-accent-strong" />
      </div>
      <Text variant="h4" className="text-foreground-strong">
        {t("skills1.empty.title")}
      </Text>
      <Text variant="body" className="max-w-md !text-foreground-tertiary">
        {t("skills1.empty.bodyPrefix")}{" "}
        <strong>{t("skills1.empty.newSkill")}</strong>
        {t("skills1.empty.bodyMid")}{" "}
        <strong>{t("skills1.empty.uploadSkill")}</strong>
        {t("skills1.empty.bodySuffix")}
      </Text>
    </div>
  );
}
