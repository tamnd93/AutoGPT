import { BlockCost } from "@/app/api/__generated__/models/blockCost";
import { BlockCostType } from "@/app/api/__generated__/models/blockCostType";
import { Text } from "@/components/atoms/Text/Text";
import useCredits from "@/hooks/useCredits";
import { useIsBillingEnabled } from "@/hooks/useIsBillingEnabled";
import { isCostFilterMatch } from "../../../../helper";
import { useNodeStore } from "@/app/(platform)/build/stores/nodeStore";
import { useShallow } from "zustand/react/shallow";
import { Coins02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

type CostDisplay =
  | { kind: "free" }
  | {
      kind: "token-rate";
      input: number;
      output: number;
      cacheRead: number | null;
      cacheCreation: number | null;
    }
  | { kind: "by-usd" }
  | { kind: "fixed"; amountText: string; suffix: string; note?: string }
  | { kind: "per-unit"; amountText: string; suffix: string; note?: string };

function formatUsd(value: number): string {
  return `$${value.toFixed(2)}`;
}

function tokenRateTooltip(
  d: {
    input: number;
    output: number;
    cacheRead: number | null;
    cacheCreation: number | null;
  },
  t: ReturnType<typeof useT>,
): string {
  const parts = [
    t("build2.nodeCost.input", { amount: formatUsd(d.input) }),
    t("build2.nodeCost.output", { amount: formatUsd(d.output) }),
  ];
  if (d.cacheRead != null)
    parts.push(
      t("build2.nodeCost.cachedInput", {
        amount: formatUsd(d.cacheRead),
      }),
    );
  if (d.cacheCreation != null)
    parts.push(
      t("build2.nodeCost.cacheWrite", {
        amount: formatUsd(d.cacheCreation),
      }),
    );
  parts.push(t("build2.nodeCost.marginNote"));
  return parts.join(" · ");
}

function getDisplay(
  blockCost: BlockCost,
  formatCredits: (n: number | null) => string,
  t: ReturnType<typeof useT>,
): CostDisplay {
  // Token-rate pair takes precedence regardless of cost_type so that
  // OpenRouter (COST_USD)-billed models show the same "$X / $Y per 1M"
  // format as direct-billed providers when we have a published rate.
  // The internal billing path (TOKENS vs COST_USD) is not user-facing.
  if (blockCost.token_rate) {
    return {
      kind: "token-rate",
      input: blockCost.token_rate.input_usd_per_1m,
      output: blockCost.token_rate.output_usd_per_1m,
      cacheRead: blockCost.token_rate.cache_read_usd_per_1m ?? null,
      cacheCreation: blockCost.token_rate.cache_creation_usd_per_1m ?? null,
    };
  }

  if (blockCost.cost_type === BlockCostType.cost_usd) {
    return { kind: "by-usd" };
  }

  if (
    blockCost.cost_type === BlockCostType.run &&
    blockCost.cost_amount === 0
  ) {
    return { kind: "free" };
  }

  const divisor = blockCost.cost_divisor;
  const amountText = formatCredits(blockCost.cost_amount);

  switch (blockCost.cost_type) {
    case BlockCostType.run:
      return { kind: "fixed", amountText, suffix: t("build2.nodeCost.perRun") };
    case BlockCostType.byte:
      return {
        kind: "per-unit",
        amountText,
        suffix: t("build2.nodeCost.perByte"),
      };
    case BlockCostType.second:
      return {
        kind: "per-unit",
        amountText,
        suffix:
          divisor && divisor > 1
            ? t("build2.nodeCost.perNSeconds", { count: divisor })
            : t("build2.nodeCost.perSecond"),
      };
    case BlockCostType.items:
      return {
        kind: "per-unit",
        amountText,
        suffix:
          divisor && divisor > 1
            ? t("build2.nodeCost.perNItems", { count: divisor })
            : t("build2.nodeCost.perItem"),
      };
    case BlockCostType.tokens:
      return {
        kind: "fixed",
        amountText,
        suffix: t("build2.nodeCost.perRun"),
        note: t("build2.nodeCost.flatEstimateNote"),
      };
    default:
      return { kind: "fixed", amountText, suffix: `/${blockCost.cost_type}` };
  }
}

export const NodeCost = ({
  blockCosts,
  nodeId,
}: {
  blockCosts: BlockCost[];
  nodeId: string;
}) => {
  const { formatCredits } = useCredits();
  const t = useT();
  const isBillingEnabled = useIsBillingEnabled();
  const hardcodedValues = useNodeStore(
    useShallow((state) => state.getHardCodedValues(nodeId)),
  );

  const blockCost =
    blockCosts &&
    blockCosts.find((cost) =>
      isCostFilterMatch(cost.cost_filter, hardcodedValues),
    );

  if (!isBillingEnabled || !blockCost) return null;

  const display = getDisplay(blockCost, formatCredits, t);

  if (display.kind === "free") {
    return (
      <div className="mr-3 flex items-center gap-1">
        <Icon icon={Coins02Icon} className="h-3 w-3" />
        <Text variant="small-medium">{t("build2.nodeCost.free")}</Text>
      </div>
    );
  }

  if (display.kind === "token-rate") {
    return (
      <div
        className="mr-3 flex items-center gap-1"
        title={tokenRateTooltip(display, t)}
      >
        <Icon icon={Coins02Icon} className="h-3 w-3" />
        <Text variant="small-medium">
          {t("build2.nodeCost.tokenRate", {
            input: formatUsd(display.input),
            output: formatUsd(display.output),
          })}
        </Text>
        <Text variant="small">{t("build2.nodeCost.per1M")}</Text>
      </div>
    );
  }

  if (display.kind === "by-usd") {
    return (
      <div
        className="mr-3 flex items-center gap-1"
        title={t("build2.nodeCost.paygTitle")}
      >
        <Icon icon={Coins02Icon} className="h-3 w-3" />
        <Text variant="small">{t("build2.nodeCost.payg")}</Text>
      </div>
    );
  }

  return (
    <div className="mr-3 flex items-center gap-1" title={display.note}>
      <Icon icon={Coins02Icon} className="h-3 w-3" />
      <Text variant="small-medium">{display.amountText}</Text>
      <Text variant="small">{` ${display.suffix}`}</Text>
    </div>
  );
};
