"use client";

import { useT } from "@/lib/i18n";
import type { BlockDetailsResponse } from "../../helpers";
import {
  ContentBadge,
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
  ContentGrid,
  ContentMessage,
} from "../../../../components/ToolAccordion/AccordionContent";

interface Props {
  output: BlockDetailsResponse;
}

function SchemaFieldList({
  title,
  properties,
  required,
}: {
  title: string;
  properties: Record<string, unknown>;
  required?: string[];
}) {
  const t = useT();
  const entries = Object.entries(properties);
  if (entries.length === 0) return null;

  const requiredSet = new Set(required ?? []);

  return (
    <ContentCard>
      <ContentCardTitle className="text-xs">{title}</ContentCardTitle>
      <div className="mt-2 grid gap-2">
        {entries.map(([name, schema]) => {
          const field = schema as Record<string, unknown> | undefined;
          const fieldTitle =
            typeof field?.title === "string" ? field.title : name;
          const fieldType =
            typeof field?.type === "string" ? field.type : "unknown";
          const description =
            typeof field?.description === "string"
              ? field.description
              : undefined;

          return (
            <div key={name} className="rounded-xl border p-2">
              <div className="flex items-center justify-between gap-2">
                <ContentCardTitle className="text-xs">
                  {fieldTitle}
                </ContentCardTitle>
                <div className="flex gap-1">
                  <ContentBadge>{fieldType}</ContentBadge>
                  {requiredSet.has(name) && (
                    <ContentBadge>
                      {t("chatTools4.runBlock.details.required")}
                    </ContentBadge>
                  )}
                </div>
              </div>
              {description && (
                <ContentCardDescription className="mt-1 text-xs">
                  {description}
                </ContentCardDescription>
              )}
            </div>
          );
        })}
      </div>
    </ContentCard>
  );
}

export function BlockDetailsCard({ output }: Props) {
  const t = useT();
  const inputs = output.block.inputs as {
    properties?: Record<string, unknown>;
    required?: string[];
  } | null;
  const outputs = output.block.outputs as {
    properties?: Record<string, unknown>;
    required?: string[];
  } | null;

  return (
    <ContentGrid>
      <ContentMessage>{output.message}</ContentMessage>

      {inputs?.properties && Object.keys(inputs.properties).length > 0 && (
        <SchemaFieldList
          title={t("chatTools4.runBlock.details.inputs")}
          properties={inputs.properties}
          required={inputs.required}
        />
      )}

      {outputs?.properties && Object.keys(outputs.properties).length > 0 && (
        <SchemaFieldList
          title={t("chatTools4.runBlock.details.outputs")}
          properties={outputs.properties}
          required={outputs.required}
        />
      )}
    </ContentGrid>
  );
}
