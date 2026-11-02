"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import {
  CollapsibleRoot,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/molecules/Collapsible/Collapsible";
import { useLocale, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  ArrowDown01Icon,
  CheckmarkBadge01Icon,
  CircleIcon,
} from "@hugeicons/core-free-icons";
import { useId, useState } from "react";
import { EarnGroup, EarnRow, getEarnGroups, TaskGroup } from "../helpers";

interface Props {
  groups: TaskGroup[];
  completedSteps: string[] | undefined;
}

export function WalletEarnCredits({ groups, completedSteps }: Props) {
  const locale = useLocale();
  const headingID = useId();
  const [open, setOpen] = useState(true);
  const earnGroups = getEarnGroups(groups, completedSteps, locale);
  const available = earnGroups.reduce(
    (total, group) => total + group.amount,
    0,
  );

  return (
    <CollapsibleRoot asChild open={open} onOpenChange={setOpen}>
      <section
        aria-labelledby={headingID}
        className="border-t border-separator"
      >
        <EarnCreditsHeader
          headingID={headingID}
          open={open}
          available={available}
        />
        <CollapsibleContent forceMount hidden={!open} className="px-2 pb-3">
          {earnGroups.map((group) => (
            <EarnGroupSection
              key={`${group.key}:${group.defaultOpen}`}
              group={group}
            />
          ))}
        </CollapsibleContent>
      </section>
    </CollapsibleRoot>
  );
}

function EarnCreditsHeader({
  headingID,
  open,
  available,
}: {
  headingID: string;
  open: boolean;
  available: number;
}) {
  const t = useT();

  return (
    <h2 id={headingID}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          // TODO(tokens): no fitting role for focus-visible:ring-zinc-400 #ADADB3; #ADADB3 is foreground-subtle (a text colour), not a focus ring
          className="flex w-full flex-col gap-1 px-5 py-3 text-left outline-none transition-colors hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-400"
        >
          <span className="flex w-full items-baseline justify-between gap-3">
            <Text as="span" variant="large-medium" tone="primary">
              {t("nav2.wallet.earnCredits")}
            </Text>
            <Text
              as="span"
              variant="small"
              tone="secondary"
              className="tabular-nums"
            >
              {available > 0
                ? t("nav2.wallet.available", { amount: available.toFixed(2) })
                : t("nav2.wallet.allClaimed")}
            </Text>
          </span>
          <span className="flex w-full items-center justify-between gap-3">
            <Text as="span" variant="small" tone="secondary">
              {open ? t("nav2.wallet.hideTasks") : t("nav2.wallet.showTasks")}
            </Text>
            <Icon
              icon={ArrowDown01Icon}
              size={16}
              aria-hidden
              className={cn(
                "shrink-0 text-foreground-tertiary transition-transform motion-reduce:transition-none",
                open && "rotate-180",
              )}
            />
          </span>
        </button>
      </CollapsibleTrigger>
    </h2>
  );
}

function EarnGroupSection({ group }: { group: EarnGroup }) {
  const t = useT();
  const [open, setOpen] = useState(group.defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 rounded-large px-3 py-1.5 text-left transition-colors hover:bg-surface-muted"
      >
        <span className="flex min-w-0 items-start gap-2.5">
          <StatusIcon done={group.done} />
          <Text variant="body-medium">{group.label}</Text>
          <Icon
            icon={ArrowDown01Icon}
            size={14}
            className={cn(
              "mt-1 shrink-0 text-foreground-subtle transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </span>
        <Text variant="body-tight" as="span" tone="muted" className="shrink-0">
          {group.done ? t("nav2.wallet.done") : `$${group.amount.toFixed(2)}`}
        </Text>
      </button>

      {open && group.rows.map((row) => <EarnTaskRow key={row.key} row={row} />)}
    </div>
  );
}

function EarnTaskRow({ row }: { row: EarnRow }) {
  const t = useT();

  return (
    <div className="flex items-start justify-between gap-3 py-1.5 pl-8 pr-3">
      <div className="flex min-w-0 items-start gap-2.5">
        <StatusIcon done={row.done} />
        <Text variant="body">{row.label}</Text>
      </div>
      <Text variant="body-tight" as="span" tone="muted" className="shrink-0">
        {row.done ? t("nav2.wallet.done") : `$${row.amount.toFixed(2)}`}
      </Text>
    </div>
  );
}

function StatusIcon({ done }: { done: boolean }) {
  const t = useT();

  return (
    <span className="mt-0.5 shrink-0">
      {done ? (
        <Icon
          icon={CheckmarkBadge01Icon}
          size={18}
          // TODO(tokens): no exact role for text-[#00a656] (#00A656)
          className="text-[#00a656]"
          aria-label={t("nav2.wallet.completedStatus")}
        />
      ) : (
        <Icon
          icon={CircleIcon}
          size={16}
          className="text-foreground-subtle"
          aria-label={t("nav2.wallet.pendingStatus")}
        />
      )}
    </span>
  );
}
