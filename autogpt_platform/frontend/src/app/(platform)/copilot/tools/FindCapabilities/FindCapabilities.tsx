"use client";

import { HorizontalScroll } from "@/app/(platform)/build/components/NewControlPanel/NewBlockMenu/HorizontalScroll";
import { useLocale, useT } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { MorphingTextAnimation } from "../../components/MorphingTextAnimation/MorphingTextAnimation";
import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from "../../components/ToolAccordion/AccordionContent";
import { ToolAccordion } from "../../components/ToolAccordion/ToolAccordion";
import { AccordionIcon, ToolIcon } from "../FindBlocks/helpers";
import {
  type CapabilityListing,
  type FindCapabilityToolPart,
  connectionBadge,
  getAnimationText,
  kindLabel,
  parseOutput,
  queryOf,
} from "./helpers";

interface Props {
  part: FindCapabilityToolPart;
}

function CapabilityCard({
  item,
  locale,
}: {
  item: CapabilityListing;
  locale: Locale;
}) {
  const badge = connectionBadge(item, locale);
  return (
    <ContentCard className="w-52 shrink-0">
      <div className="flex items-start justify-between gap-2">
        <ContentCardTitle className="truncate">{item.name}</ContentCardTitle>
        {badge && (
          <span
            className={
              "shrink-0 rounded-full px-2 py-0.5 text-caption-sm leading-inherit " +
              badge.className
            }
          >
            {badge.label}
          </span>
        )}
      </div>
      <ContentCardDescription className="mt-1 line-clamp-2">
        {item.purpose}
      </ContentCardDescription>
      <p className="mt-1 text-caption-sm leading-inherit text-foreground-tertiary">
        {kindLabel(item, locale)}
      </p>
    </ContentCard>
  );
}

export function FindCapabilitiesTool({ part }: Props) {
  const locale = useLocale();
  const t = useT();
  const text = getAnimationText(part, locale);
  const isStreaming =
    part.state === "input-streaming" || part.state === "input-available";
  const isError = part.state === "output-error";
  const parsed =
    part.state === "output-available" ? parseOutput(part.output) : null;
  const items = parsed
    ? [...parsed.capabilities, ...(parsed.fallback ?? [])]
    : [];
  const query = queryOf(part);
  const description = parsed
    ? `${t(
        parsed.count === 1
          ? "chatTools4.findCapabilities.resultOne"
          : "chatTools4.findCapabilities.resultMany",
        { count: parsed.count },
      )}${query ? ` ${t("chatTools4.find.forQuery", { query })}` : ""}`
    : undefined;

  return (
    <div className="py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ToolIcon isStreaming={isStreaming} isError={isError} />
        <MorphingTextAnimation
          text={text}
          className={isError ? "text-error" : undefined}
        />
      </div>

      {items.length > 0 && (
        <ToolAccordion
          icon={<AccordionIcon />}
          title={t("chatTools4.findCapabilities.title")}
          description={description}
        >
          <HorizontalScroll dependencyList={[items.length]}>
            {items.map((item) => (
              <CapabilityCard key={item.id} item={item} locale={locale} />
            ))}
          </HorizontalScroll>
        </ToolAccordion>
      )}
    </div>
  );
}
