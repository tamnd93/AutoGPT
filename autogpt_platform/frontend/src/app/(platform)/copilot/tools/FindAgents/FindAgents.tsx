"use client";

import { ToolUIPart } from "ai";
import { useLocale, useT } from "@/lib/i18n";
import { MorphingTextAnimation } from "../../components/MorphingTextAnimation/MorphingTextAnimation";
import {
  ContentBadge,
  ContentCard,
  ContentCardDescription,
  ContentCardHeader,
  ContentCardTitle,
  ContentGrid,
  ContentLink,
} from "../../components/ToolAccordion/AccordionContent";
import { ToolAccordion } from "../../components/ToolAccordion/ToolAccordion";
import {
  AccordionIcon,
  getAgentHref,
  getAnimationText,
  getFindAgentsOutput,
  getSourceLabelFromToolType,
  isAgentsFoundOutput,
  isErrorOutput,
  ToolIcon,
} from "./helpers";

export interface FindAgentsToolPart {
  type: string;
  toolCallId: string;
  state: ToolUIPart["state"];
  input?: unknown;
  output?: unknown;
}

interface Props {
  part: FindAgentsToolPart;
}

export function FindAgentsTool({ part }: Props) {
  const locale = useLocale();
  const t = useT();
  const text = getAnimationText(part, locale);
  const output = getFindAgentsOutput(part);
  const isStreaming =
    part.state === "input-streaming" || part.state === "input-available";
  const isError =
    part.state === "output-error" || (!!output && isErrorOutput(output));

  const query =
    typeof part.input === "object" && part.input !== null
      ? String((part.input as { query?: unknown }).query ?? "").trim()
      : "";

  const agentsFoundOutput =
    part.state === "output-available" && output && isAgentsFoundOutput(output)
      ? output
      : null;

  const hasAgents =
    !!agentsFoundOutput &&
    agentsFoundOutput.agents.length > 0 &&
    (typeof agentsFoundOutput.count !== "number" ||
      agentsFoundOutput.count > 0);
  const totalCount = agentsFoundOutput ? agentsFoundOutput.count : 0;
  const { source } = getSourceLabelFromToolType(part.type, locale);
  const scopeText =
    source === "library"
      ? t("chatTools4.findAgents.scopeLibrary")
      : source === "marketplace"
        ? t("chatTools4.findAgents.scopeMarketplace")
        : "";
  const accordionDescription = `${t("chatTools4.findAgents.found", {
    count: totalCount,
  })}${scopeText ? ` ${scopeText}` : ""}${
    query ? ` ${t("chatTools4.find.forQuery", { query })}` : ""
  }`;

  return (
    <div className="py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ToolIcon
          toolType={part.type}
          isStreaming={isStreaming}
          isError={isError}
        />
        <MorphingTextAnimation
          text={text}
          className={isError ? "text-error" : undefined}
        />
      </div>

      {hasAgents && agentsFoundOutput && (
        <ToolAccordion
          icon={<AccordionIcon toolType={part.type} />}
          title={t("chatTools4.findAgents.title")}
          description={accordionDescription}
        >
          <ContentGrid className="sm:grid-cols-2">
            {agentsFoundOutput.agents.map((agent) => {
              const href = getAgentHref(agent);
              const agentSource =
                agent.source === "library"
                  ? t("chatTools4.findAgents.badgeLibrary")
                  : agent.source === "marketplace"
                    ? t("chatTools4.findAgents.badgeMarketplace")
                    : null;
              return (
                <ContentCard key={agent.id}>
                  <ContentCardHeader
                    action={
                      href ? (
                        <ContentLink href={href}>
                          {t("chatTools4.find.open")}
                        </ContentLink>
                      ) : null
                    }
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <ContentCardTitle className="min-w-0 flex-1">
                        {agent.name}
                      </ContentCardTitle>
                      {agentSource && (
                        <ContentBadge>{agentSource}</ContentBadge>
                      )}
                    </div>
                    <ContentCardDescription className="mt-1 line-clamp-2 break-words">
                      {agent.description}
                    </ContentCardDescription>
                  </ContentCardHeader>
                </ContentCard>
              );
            })}
          </ContentGrid>
        </ToolAccordion>
      )}
    </div>
  );
}
