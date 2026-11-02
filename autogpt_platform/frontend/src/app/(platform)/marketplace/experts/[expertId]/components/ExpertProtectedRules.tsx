import { Icon } from "@/components/atoms/Icon/Icon";
import { LockIcon, SecurityCheckIcon } from "@hugeicons/core-free-icons";
import { ExpertSection } from "./ExpertSection";
import { useT } from "@/lib/i18n";

interface Props {
  rules: string[];
}

/** The rules baked into every expert's soul, quoted verbatim — the same
 *  strings the backend injects, so the promise on the profile and the
 *  instruction the model receives can never drift apart. Each one gets its
 *  own tile: a shield, the rule, and a quiet "Locked" note. */
export function ExpertProtectedRules({ rules }: Props) {
  const t = useT();
  if (rules.length === 0) return null;

  return (
    <ExpertSection
      title={t("marketplace2.expert.rulesTitle")}
      description={t("marketplace2.expert.rulesDescription")}
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {rules.map((rule) => (
          <li
            key={rule}
            className="flex gap-3.5 rounded-2xl bg-surface p-4 smooth-shadow-ring-sm"
          >
            <span
              aria-hidden="true"
              // TODO(tokens): no exact role: from-emerald-50 #ECFDF5, to-emerald-100/70 #D1FAE5, text-emerald-600 #059669, ring-emerald-200/70 #A7F3D0
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100/70 text-emerald-600 ring-1 ring-inset ring-emerald-200/70"
            >
              <Icon icon={SecurityCheckIcon} size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-body-md leading-6 text-foreground-emphasis">
                {rule}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-foreground-tertiary">
                <Icon icon={LockIcon} size={12} aria-hidden="true" />
                {t("marketplace2.expert.locked")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </ExpertSection>
  );
}
