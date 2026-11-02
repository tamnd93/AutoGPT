import type { SubscriptionUpgradePreview } from "@/app/api/__generated__/models/subscriptionUpgradePreview";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import { formatAmount } from "@/services/pro-activation/helpers";

interface Props {
  preview: SubscriptionUpgradePreview;
}

export function formatUpgradeAmount(amount: number, currency: string) {
  return formatAmount(amount, currency);
}

function dateLabel(timestamp: number, locale?: string) {
  return new Date(timestamp * 1000).toLocaleDateString(
    locale === "vi" ? "vi-VN" : undefined,
    {
      month: "short",
      day: "numeric",
    },
  );
}

export function MaxUpgradeSummary({ preview }: Props) {
  const t = useT();
  const locale = useLocale();
  const amount = (cents: number) =>
    formatUpgradeAmount(cents, preview.currency);
  const unit =
    preview.billing_cycle === "yearly"
      ? t("billing2.offer.perYear")
      : t("billing2.offer.perMonth");
  const recurringTax = preview.recurring_tax_included
    ? t("billing2.maxSummary.includingTax")
    : t("billing2.maxSummary.plusTax");
  return (
    <div className="overflow-hidden rounded-2xl border border-border-base">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border-base bg-surface-muted px-5 py-4">
        <Text variant="body-medium">
          Max{" "}
          <span className="font-normal text-foreground-tertiary">
            ·{" "}
            {preview.billing_cycle === "yearly"
              ? t("billing2.cycle.yearly")
              : t("billing2.cycle.monthly")}
          </span>
        </Text>
        <Text variant="small" tone="secondary">
          {amount(preview.recurring_amount)} / {unit}
        </Text>
      </div>
      <div className="space-y-3.5 p-5">
        {preview.lines.map((line, index) => (
          <SummaryRow
            key={index}
            label={
              line.proration
                ? line.amount < 0
                  ? t("billing2.maxSummary.unusedPro")
                  : `Max, ${dateLabel(line.period_start, locale)} to ${dateLabel(line.period_end, locale)}`
                : line.description
            }
            value={amount(line.amount)}
          />
        ))}
        <SummaryRow
          label={
            preview.tax_included
              ? t("billing2.maxSummary.taxIncluded")
              : t("billing2.maxSummary.tax")
          }
          value={
            preview.tax_amount == null
              ? t("billing2.maxSummary.seeInvoice")
              : amount(preview.tax_amount)
          }
        />
        {preview.adjustment_amount !== 0 && (
          <SummaryRow
            label={t("billing2.maxSummary.otherAdjustments")}
            value={amount(preview.adjustment_amount)}
          />
        )}
        <div className="border-t border-border-base pt-4">
          <SummaryRow
            label={t("billing2.maxSummary.dueToday")}
            value={amount(preview.amount_due)}
            emphasized
          />
        </div>
        <Text variant="small" tone="secondary" className="pt-2 leading-5">
          {t("billing2.maxSummary.renewalLead", {
            date: dateLabel(preview.period_end, locale),
          })}{" "}
          {amount(preview.recurring_amount)} {recurringTax}{" "}
          {t("billing2.maxSummary.per", { unit })},{" "}
          {t("billing2.maxSummary.tail")}
        </Text>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <Text
        variant={emphasized ? "body-medium" : "small"}
        className={
          emphasized ? "text-foreground-strong" : "text-foreground-secondary"
        }
      >
        {label}
      </Text>
      <Text
        variant={emphasized ? "body-medium" : "small"}
        className={`shrink-0 tabular-nums ${emphasized ? "text-foreground-strong" : "text-foreground-secondary"}`}
      >
        {value}
      </Text>
    </div>
  );
}
