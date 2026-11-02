import type { ActivationTerms } from "@/app/api/__generated__/models/activationTerms";
import type { RenewalDiscount } from "@/app/api/__generated__/models/renewalDiscount";
import { Text } from "@/components/atoms/Text/Text";
import { formatAmount } from "@/services/pro-activation/helpers";
import { useLocale, useT } from "@/lib/i18n";

function discountText(
  discount: RenewalDiscount,
  currency: string,
  t: ReturnType<typeof useT>,
  locale: ReturnType<typeof useLocale>,
) {
  const amount =
    discount.percent_off != null
      ? t("billing3.renewal.percentOff", { percent: discount.percent_off })
      : discount.amount_off != null
        ? t("billing3.renewal.amountOff", {
            amount: formatAmount(
              discount.amount_off,
              discount.currency ?? currency,
            ),
          })
        : t("billing3.renewal.offerDiscount");
  const duration =
    discount.duration === "once"
      ? t("billing3.renewal.firstInvoiceOnly")
      : discount.duration === "forever"
        ? t("billing3.renewal.everyRenewal")
        : discount.duration_in_months
          ? t("billing3.renewal.forMonths", {
              months: discount.duration_in_months,
            })
          : t("billing3.renewal.offerPeriod");
  const ends = discount.ends_at
    ? t("billing3.renewal.ends", {
        date: new Date(discount.ends_at * 1000).toLocaleDateString(locale),
      })
    : "";
  return `${amount} ${duration}${ends}`;
}

interface Props {
  terms: ActivationTerms;
}

export function RenewalDetails({ terms }: Props) {
  const t = useT();
  const locale = useLocale();

  return (
    <div data-slot="renewal-details" className="space-y-2">
      {terms.renewal_discounts?.map((discount, index) => (
        <Text key={index} variant="small" tone="secondary">
          {discountText(discount, terms.currency, t, locale)}
        </Text>
      ))}
      <details
        data-slot="renewal-details-terms"
        className="group text-sm text-foreground-tertiary"
      >
        <summary
          data-slot="renewal-details-terms-toggle"
          // TODO(tokens): no role for the violet-500 focus outline.
          className="w-fit cursor-pointer rounded-small underline decoration-border-strong underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
        >
          {t("billing3.renewal.fullTerms")}
        </summary>
        <Text variant="small" tone="secondary" className="mt-3 leading-relaxed">
          {terms.renewal_terms}
        </Text>
        {terms.renewal_tax?.rates?.map((rate, index) => (
          <Text key={index} variant="small" tone="secondary" className="mt-2">
            {rate.display_name}: {rate.percentage}%{" "}
            {rate.inclusive
              ? t("billing3.renewal.included")
              : t("billing3.renewal.additional")}
            {[rate.country, rate.state].filter(Boolean).length
              ? ` · ${[rate.country, rate.state].filter(Boolean).join(", ")}`
              : ""}
          </Text>
        ))}
      </details>
    </div>
  );
}
