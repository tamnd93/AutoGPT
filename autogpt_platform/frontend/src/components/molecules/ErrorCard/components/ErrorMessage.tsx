"use client";

import React from "react";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

interface Props {
  errorMessage: string;
  context: string;
  hint?: string;
  textSize?: "body" | "body-md";
}

export function ErrorMessage({
  errorMessage,
  context,
  hint,
  textSize = "body",
}: Props) {
  const t = useT();

  return (
    <div data-slot="error-card-message" className="space-y-2">
      <Text
        variant={textSize}
        data-slot="error-card-context"
        className="text-foreground-body"
      >
        {t("shared3.errorCard.retrieveFrame", {
          context: context ?? t("shared3.errorCard.dataFallback"),
        })}
      </Text>
      <div
        data-slot="error-card-detail"
        className="rounded-lg border border-separator bg-surface-muted p-3"
      >
        <Text
          variant={textSize}
          data-slot="error-card-detail-text"
          className="!text-error-foreground"
        >
          {errorMessage}
        </Text>
      </div>
      {hint && (
        <div data-slot="error-card-hint" className="!mt-4">
          <Text
            variant={textSize}
            data-slot="error-card-hint-text"
            className="text-foreground-body"
          >
            {hint}
          </Text>
        </div>
      )}
    </div>
  );
}
