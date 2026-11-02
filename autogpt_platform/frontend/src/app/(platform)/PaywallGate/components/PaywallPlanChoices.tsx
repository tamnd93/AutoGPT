"use client";

import { SparklesIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import {
  YEARLY_PRICE_FACTOR,
  type PlanDef,
} from "@/components/molecules/PlanCard/plans";
import { useT } from "@/lib/i18n";

interface Props {
  plans: PlanDef[];
  cycle: "monthly" | "yearly";
  onCycle: (cycle: "monthly" | "yearly") => void;
  onSelect: (tier: string) => void;
  pending: boolean;
  selectedTier: string | null;
}

export function PaywallPlanChoices({
  plans,
  cycle,
  onCycle,
  onSelect,
  pending,
  selectedTier,
}: Props) {
  const t = useT();
  const team = plans.find((plan) => plan.key === "BUSINESS");
  return (
    <section
      aria-label={t("billing1.choices.sectionAria")}
      className="w-full space-y-5"
    >
      <div className="flex justify-center">
        <div
          role="group"
          aria-label={t("billing1.choices.periodAria")}
          className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 p-1"
        >
          {(["monthly", "yearly"] as const).map((value) => (
            <Button
              key={value}
              variant="ghost"
              size="small"
              aria-pressed={cycle === value}
              onClick={() => onCycle(value)}
              disabled={pending}
              className={
                cycle === value ? "bg-white shadow-sm" : "text-zinc-500"
              }
            >
              {value === "monthly"
                ? t("billing1.choices.monthly")
                : t("billing1.choices.yearly")}
              {value === "yearly" && (
                <span className="text-xs text-emerald-600">
                  {t("billing1.choices.save", {
                    percent: Math.round((1 - YEARLY_PRICE_FACTOR) * 100),
                  })}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {plans
          .filter((plan) => plan.key !== "BUSINESS")
          .map((plan) => (
            <PlanChoice
              key={plan.key}
              plan={plan}
              cycle={cycle}
              onSelect={onSelect}
              pending={pending}
              selectedTier={selectedTier}
            />
          ))}
      </div>
      {team && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-3">
          <div>
            <Text variant="small-medium">{t("billing1.choices.team")}</Text>
            <Text variant="small" tone="secondary">
              {t("billing1.choices.teamBody")}
            </Text>
          </div>
          <Button
            variant="secondary"
            size="small"
            onClick={() => onSelect(team.key)}
          >
            {t("billing1.choices.talkToSales")}
          </Button>
        </div>
      )}
      <Text variant="small" tone="secondary" className="text-center text-xs">
        {t("billing1.choices.footnote")}
      </Text>
    </section>
  );
}

function PlanChoice({
  plan,
  cycle,
  onSelect,
  pending,
  selectedTier,
}: { plan: PlanDef } & Omit<Props, "plans" | "onCycle">) {
  const t = useT();
  const amount = cycle === "yearly" ? plan.usdYearly : plan.usdMonthly;
  const formatted =
    amount == null
      ? null
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: amount % 1 ? 2 : 0,
        }).format(amount);
  const isPro = plan.key === "PRO";
  const features = isPro
    ? [t("billing1.choices.proFeature1"), t("billing1.choices.proFeature2")]
    : [
        plan.usage
          ? t("billing1.choices.maxUsage", {
              usage: plan.usage.replace(/x|×/, ""),
            })
          : t("billing1.choices.maxFeature"),
        t("billing1.choices.storage"),
      ];
  return (
    <section
      aria-label={t("billing1.choices.planAria", { name: plan.name })}
      className={`flex flex-col rounded-2xl border p-5 sm:p-6 ${isPro ? "border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50" : "border-zinc-200 bg-white"}`}
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon
          icon={SparklesIcon}
          size={18}
          className={isPro ? "text-purple-600" : "text-zinc-600"}
        />
        <Text variant="large-semibold" as="h2">
          {plan.name}
        </Text>
      </div>
      <Text variant="small" tone="secondary" className="mb-4">
        {isPro
          ? t("billing1.choices.proTagline")
          : t("billing1.choices.maxTagline")}
      </Text>
      <div className="mb-5">
        <Text variant="h3" as="span" className="tracking-tight">
          {formatted ?? t("billing1.choices.unavailablePrice")}
        </Text>
        {formatted && (
          <Text variant="small" as="span" tone="secondary">
            {" "}
            /{" "}
            {cycle === "yearly"
              ? t("billing1.choices.perYear")
              : t("billing1.choices.perMonth")}
          </Text>
        )}
      </div>
      <ul className="mb-6 space-y-2.5">
        {features.map((feature) => (
          <li className="flex gap-2" key={feature}>
            <Icon
              icon={Tick02Icon}
              size={15}
              className="mt-0.5 shrink-0 text-purple-600"
            />
            <Text variant="small" className="text-zinc-700">
              {feature}
            </Text>
          </li>
        ))}
      </ul>
      <Button
        className="mt-auto w-full"
        variant={isPro ? "primary" : "secondary"}
        onClick={() => onSelect(plan.key)}
        loading={pending && selectedTier === plan.key}
        disabled={pending || !formatted}
      >
        {t("billing1.choices.start", { name: plan.name })}
      </Button>
    </section>
  );
}
