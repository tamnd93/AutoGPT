import { Expert } from "@/app/api/__generated__/models/expert";
import { Icon } from "@/components/atoms/Icon/Icon";
import { creditsToUsdLabel } from "@/lib/credits";
import { useLocale, useT } from "@/lib/i18n";
import { CheckmarkCircle02Icon, Coins01Icon } from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";

interface Props {
  expert: Expert;
  firstName: string;
  actions: ReactNode;
}

/** The page's call to action, kept in view: sticky beside the content on
 *  wide screens, straight under the hero on phones. It carries the price
 *  terms so the decision and its cost sit together. */
export function ExpertHireCard({ expert, firstName, actions }: Props) {
  const t = useT();
  const locale = useLocale();
  const weeklyBudget = expert.weekly_budget ?? null;
  const workflowCount = expert.workflows.length;

  return (
    <aside className="rounded-2xl bg-surface p-5 smooth-shadow-ring-sm">
      <div className="[&_a]:w-full [&_button]:w-full">{actions}</div>

      <ul className="mt-5 flex flex-col gap-2.5">
        <Perk icon={CheckmarkCircle02Icon}>
          {t("marketplace2.expert.noExtraCost")}
        </Perk>
        <Perk icon={CheckmarkCircle02Icon}>
          {t("marketplace2.expert.joinsInstantly")}
        </Perk>
        {workflowCount > 0 ? (
          <Perk icon={CheckmarkCircle02Icon}>
            {workflowCount === 1
              ? t("marketplace2.expert.workflowPerkOne", {
                  count: workflowCount,
                })
              : t("marketplace2.expert.workflowPerkMany", {
                  count: workflowCount,
                })}
          </Perk>
        ) : null}
        <Perk icon={CheckmarkCircle02Icon}>
          {t("marketplace2.expert.asksBefore")}
        </Perk>
      </ul>

      <div className="mt-5 border-t border-separator pt-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground-strong">
          <Icon
            icon={Coins01Icon}
            size={16}
            className="text-foreground-tertiary"
          />
          {t("marketplace2.expert.included")}
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
          {t("marketplace2.expert.hireCosts", { name: firstName })}
          {weeklyBudget
            ? t("marketplace2.expert.hireCostsCapped", {
                amount: creditsToUsdLabel(weeklyBudget, locale),
              })
            : t("marketplace2.expert.hireCostsEnd")}
        </p>
      </div>
    </aside>
  );
}

function Perk({
  icon,
  children,
}: {
  icon: typeof CheckmarkCircle02Icon;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-foreground-body">
      <Icon
        icon={icon}
        size={16}
        // TODO(tokens): no exact role: text-emerald-600 #059669
        className="mt-0.5 shrink-0 text-emerald-600"
        aria-hidden
      />
      <span>{children}</span>
    </li>
  );
}
