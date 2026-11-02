"use client";

import type { ToolUIPart } from "ai";
import { useLocale, useT } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { AgentSavedCard } from "../../components/AgentSavedCard/AgentSavedCard";
import { useCopilotChatActions } from "../../components/CopilotChatActionsProvider/useCopilotChatActions";
import { ToolErrorCard } from "../../components/ToolErrorCard/ToolErrorCard";
import { MorphingTextAnimation } from "../../components/MorphingTextAnimation/MorphingTextAnimation";
import {
  ContentCardDescription,
  ContentCodeBlock,
  ContentGrid,
  ContentMessage,
} from "../../components/ToolAccordion/AccordionContent";
import { ToolAccordion } from "../../components/ToolAccordion/ToolAccordion";
import { SuggestedGoalCard } from "./components/SuggestedGoalCard";
import {
  AccordionIcon,
  formatMaybeJson,
  getAnimationText,
  getCreateAgentToolOutput,
  isAgentPreviewOutput,
  isAgentSavedOutput,
  isErrorOutput,
  isSuggestedGoalOutput,
  ToolIcon,
  truncateText,
  type CreateAgentToolOutput,
} from "./helpers";

export interface CreateAgentToolPart {
  type: string;
  toolCallId: string;
  state: ToolUIPart["state"];
  input?: unknown;
  output?: unknown;
}

interface Props {
  part: CreateAgentToolPart;
}

function getAccordionMeta(
  output: CreateAgentToolOutput | null,
  locale: Locale,
) {
  const icon = <AccordionIcon />;

  if (output && isAgentPreviewOutput(output)) {
    return {
      icon,
      title: output.agent_name,
      description: getMessage(
        locale,
        output.node_count === 1
          ? "chatTools3.createAgent.blockOne"
          : "chatTools3.createAgent.blockMany",
        { count: output.node_count },
      ),
    };
  }
  if (output && isSuggestedGoalOutput(output)) {
    return {
      icon,
      title: getMessage(locale, "chatTools3.createAgent.goalRefinement"),
      expanded: true,
    };
  }
  return { icon, title: "" };
}

export function CreateAgentTool({ part }: Props) {
  const t = useT();
  const locale = useLocale();
  const text = getAnimationText(part, locale);
  const { onSend } = useCopilotChatActions();

  const isStreaming =
    part.state === "input-streaming" || part.state === "input-available";

  const output = getCreateAgentToolOutput(part);

  const isError =
    part.state === "output-error" || (!!output && isErrorOutput(output));

  const isOperating = !output;

  function handleUseSuggestedGoal(goal: string) {
    onSend(`Please create a workflow with this goal: ${goal}`);
  }

  return (
    <div className="py-2">
      {isOperating && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ToolIcon isStreaming={isStreaming} isError={isError} />
          <MorphingTextAnimation
            text={text}
            className={isError ? "text-error" : undefined}
          />
        </div>
      )}

      {isError && output && isErrorOutput(output) && (
        <ToolErrorCard
          message={output.message}
          fallbackMessage={t("chatTools3.createAgent.failed")}
          error={output.error ? formatMaybeJson(output.error) : undefined}
          details={output.details ? formatMaybeJson(output.details) : undefined}
          actions={[
            {
              label: t("chatInput3.card.tryAgain"),
              onClick: () => onSend("Please try creating the workflow again."),
            },
            {
              label: t("chatTools3.createAgent.simplifyGoal"),
              variant: "ghost",
              onClick: () => onSend("Can you help me simplify this goal?"),
            },
          ]}
        />
      )}

      {output &&
        !isError &&
        (isAgentPreviewOutput(output) || isSuggestedGoalOutput(output)) && (
          <ToolAccordion {...getAccordionMeta(output, locale)}>
            {isAgentPreviewOutput(output) && (
              <ContentGrid>
                <ContentMessage>{output.message}</ContentMessage>
                {output.description?.trim() && (
                  <ContentCardDescription>
                    {output.description}
                  </ContentCardDescription>
                )}
                <ContentCodeBlock>
                  {truncateText(formatMaybeJson(output.agent_json), 1600)}
                </ContentCodeBlock>
              </ContentGrid>
            )}

            {isSuggestedGoalOutput(output) && (
              <SuggestedGoalCard
                message={output.message}
                suggestedGoal={output.suggested_goal}
                reason={output.reason}
                goalType={output.goal_type ?? "vague"}
                onUseSuggestedGoal={handleUseSuggestedGoal}
              />
            )}
          </ToolAccordion>
        )}

      {output && isAgentSavedOutput(output) && (
        <AgentSavedCard
          agentName={output.agent_name}
          message={t("chatTools3.createAgent.savedMessage")}
          libraryAgentLink={output.library_agent_link}
          agentPageLink={output.agent_page_link}
        />
      )}
    </div>
  );
}
