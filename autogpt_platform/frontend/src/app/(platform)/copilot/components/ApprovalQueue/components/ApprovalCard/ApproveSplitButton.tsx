"use client";

import { useState } from "react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu/DropdownMenu";
import { AUTOPILOT_NAME } from "@/components/molecules/AutopilotAvatar/helpers";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import type { MessageValues } from "@/lib/i18n/translate";
import type { ChatRule, RuleScope } from "../../helpers";

interface Props {
  label: string;
  subjectName: string;
  expertName: string | null;
  rules: ChatRule[];
  loading: boolean;
  disabled: boolean;
  onApprove: (rule?: ChatRule, scope?: RuleScope) => void;
}

export function ApproveSplitButton({
  label,
  subjectName,
  expertName,
  rules,
  loading,
  disabled,
  onApprove,
}: Props) {
  const t = useT();
  const [scope, setScope] = useState<RuleScope>("expert");
  const who = expertName ?? AUTOPILOT_NAME;
  const main = (
    <Button
      size="small"
      variant="primary"
      loading={loading}
      disabled={disabled}
      onClick={() => onApprove()}
      className={
        rules.length > 0 ? "min-w-0 flex-1 rounded-r-none pr-2.5" : "min-w-0"
      }
    >
      {loading ? t("chatTools1.approving") : label}
    </Button>
  );
  if (rules.length === 0) return main;

  return (
    <div className="inline-flex">
      {main}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="small"
            variant="primary"
            disabled={disabled}
            aria-label={t("chatTools1.moreWays")}
            withTooltip={false}
            // TODO(tokens): no fitting role for border-l-zinc-600 #68686F; #68686F is foreground-secondary (a text colour)
            className="min-w-0 rounded-l-none border-l-zinc-600 px-2"
          >
            <Icon icon={ArrowDown01Icon} size={14} aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-80">
          {rules.map((rule) => {
            const [title, detail] = ruleCopy(rule, scope, subjectName, who, t);
            return (
              <DropdownMenuItem
                key={rule}
                onSelect={() => onApprove(rule, scope)}
                className="flex flex-col items-start gap-0.5 py-2"
              >
                <span className="text-sm text-foreground-strong">{title}</span>
                <span className="text-xs text-foreground-tertiary">
                  {detail}
                </span>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs font-normal text-foreground-tertiary">
            {t("chatTools1.appliesTo")}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={scope}
            onValueChange={(value) => setScope(value as RuleScope)}
          >
            {SCOPES.map((option) => (
              <DropdownMenuRadioItem
                key={option}
                value={option}
                // Picking a scope keeps the menu open so the action can follow.
                onSelect={(event) => event.preventDefault()}
                className="text-sm text-foreground-strong"
              >
                {scopeLabel(option, who, t)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const SCOPES: RuleScope[] = ["chat", "expert", "team"];

type Translate = (key: MessageKey, values?: MessageValues) => string;

function scopeLabel(scope: RuleScope, who: string, t: Translate) {
  if (scope === "chat") return t("chatTools1.scope.chat");
  if (scope === "expert") return t("chatTools1.scope.expert", { who });
  return t("chatTools1.scope.team");
}

// The supervisor is always Otto, whichever Expert's chat the card is in.
const ALLOW_DETAILS: Record<RuleScope, MessageKey> = {
  chat: "chatTools1.rule.allowDetail.chat",
  expert: "chatTools1.rule.allowDetail.expert",
  team: "chatTools1.rule.allowDetail.team",
};

const JUDGE_RUNS: Record<RuleScope, MessageKey> = {
  chat: "chatTools1.rule.judgeRuns.chat",
  expert: "chatTools1.rule.judgeRuns.expert",
  team: "chatTools1.rule.judgeRuns.team",
};

function ruleCopy(
  rule: ChatRule,
  scope: RuleScope,
  subject: string,
  who: string,
  t: Translate,
): [string, string] {
  if (rule === "allow") {
    return [
      t("chatTools1.rule.allowTitle", { subject }),
      t(ALLOW_DETAILS[scope], { who }),
    ];
  }
  return [
    t("chatTools1.rule.judgeTitle", { otto: AUTOPILOT_NAME, subject }),
    t("chatTools1.rule.judgeDetail", { runs: t(JUDGE_RUNS[scope], { who }) }),
  ];
}
