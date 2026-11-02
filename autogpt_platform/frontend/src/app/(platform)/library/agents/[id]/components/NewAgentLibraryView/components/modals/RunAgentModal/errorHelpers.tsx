import { ApiError } from "@/lib/autogpt-server-api/helpers";
import Link from "next/link";
import React from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

type ValidationErrorDetail = {
  type: string;
  message?: string;
  node_errors?: Record<string, Record<string, string>>;
};

type AgentInfo = {
  graph_id: string;
  graph_version: number;
};

export function formatValidationError(
  error: any,
  agentInfo?: AgentInfo,
  locale: Locale = DEFAULT_LOCALE,
): string | React.ReactNode {
  const say = (key: string) => getMessage(locale, key);
  if (
    !(error instanceof ApiError) ||
    !error.isGraphValidationError() ||
    !error.response?.detail
  ) {
    return error.message || say("library1.error.unexpected");
  }

  const detail: ValidationErrorDetail = error.response.detail;

  // Format validation errors nicely
  if (detail.type === "validation_error" && detail.node_errors) {
    const nodeErrors = detail.node_errors;
    const errorItems: React.ReactNode[] = [];

    // Collect all field errors
    Object.entries(nodeErrors).forEach(([nodeId, fields]) => {
      if (fields && typeof fields === "object") {
        Object.entries(fields).forEach(([fieldName, fieldError]) => {
          errorItems.push(
            <div key={`${nodeId}-${fieldName}`} className="mt-1">
              <span className="font-medium">{fieldName}:</span>{" "}
              {String(fieldError)}
            </div>,
          );
        });
      }
    });

    if (errorItems.length > 0) {
      return (
        <div className="space-y-1">
          <div className="font-medium text-action-foreground">
            {detail.message || say("library1.error.validationFailed")}
          </div>
          <div className="mt-2 space-y-1 text-xs">{errorItems}</div>
          {agentInfo && (
            <div className="mt-3 text-xs">
              {say("library1.error.openBuilderNote")}{" "}
              <Link
                href={`/build?flowID=${agentInfo.graph_id}&flowVersion=${agentInfo.graph_version}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer underline hover:no-underline"
              >
                {say("library1.error.openBuilder")}
              </Link>
            </div>
          )}
        </div>
      );
    } else {
      return detail.message || say("library1.error.validationFailed");
    }
  }

  return detail.message || error.message || say("library1.error.unexpected");
}

export function showExecutionErrorToast(
  toast: (options: {
    title: string;
    description: string | React.ReactNode;
    variant: "destructive";
    duration: number;
    dismissable: boolean;
  }) => void,
  error: any,
  agentInfo?: AgentInfo,
  locale: Locale = DEFAULT_LOCALE,
) {
  const errorMessage = formatValidationError(error, agentInfo, locale);

  toast({
    title: getMessage(locale, "library1.error.toastTitle"),
    description: errorMessage,
    variant: "destructive",
    duration: 10000, // 10 seconds - long enough to read and close
    dismissable: true,
  });
}
