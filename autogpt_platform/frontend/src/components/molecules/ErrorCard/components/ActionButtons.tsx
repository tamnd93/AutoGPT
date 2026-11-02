"use client";

import React from "react";
import { useLocale, useT } from "@/lib/i18n";
import { handleReportError } from "../helpers";
import { ErrorCardProps } from "../ErrorCard";
import { Button } from "@/components/atoms/Button/Button";
import {
  Bug01Icon,
  DiscordIcon,
  Refresh01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface ActionButtonsProps {
  onRetry?: () => void;
  responseError?: ErrorCardProps["responseError"];
  httpError?: ErrorCardProps["httpError"];
  context: string;
  textSize?: "body" | "body-md";
}

export function ActionButtons({
  onRetry,
  responseError,
  httpError,
  context,
  textSize = "body",
}: ActionButtonsProps) {
  const t = useT();
  const locale = useLocale();

  return (
    <div
      data-slot="error-card-actions"
      className="flex flex-col flex-wrap gap-3 pt-2 sm:flex-row"
    >
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="small"
          textSize={textSize}
          data-slot="error-card-retry"
        >
          <Icon
            data-slot="error-card-retry-icon"
            icon={Refresh01Icon}
            size={16}
          />
          {t("shared3.errorCard.retry")}
        </Button>
      )}

      <Button
        onClick={() =>
          handleReportError(responseError, httpError, context, locale)
        }
        variant="ghost"
        size="small"
        textSize={textSize}
        data-slot="error-card-report"
      >
        <Icon data-slot="error-card-report-icon" icon={Bug01Icon} size={16} />
        {t("shared3.errorCard.report")}
      </Button>

      <Button
        as="NextLink"
        variant="ghost"
        size="small"
        textSize={textSize}
        href="https://discord.gg/autogpt"
        target="_blank"
        rel="noopener noreferrer"
        data-slot="error-card-help"
      >
        <Icon data-slot="error-card-help-icon" icon={DiscordIcon} size={16} />
        {t("shared3.errorCard.getHelp")}
      </Button>
    </div>
  );
}
